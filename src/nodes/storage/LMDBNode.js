import assert from 'assert';

import BaseNode from '../BaseNode';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';
import LMDB from '../../data/io/LMDB';
import EventOutputStream from '../../streams/EventOutputStream';

class LMDBNode extends BaseNode {
    constructor() {
        super();

        this._lmdb = null;
    }

    openDataSet(datapath) {
        this._lmdb = new LMDB(datapath);
    }

    getTimeRange(db) {
        assert(this._lmdb !== null);

        const _self = this;
        _self._lmdb.begin(db);
        _self._lmdb.cursor(db);

        _self._lmdb.gotoFirst(db);
        let start = _self._lmdb.getCurrentKeyValue(db);

        _self._lmdb.gotoLast(db);
        let end = _self._lmdb.getCurrentKeyValue(db);

        let startTime = new Time(start.key, 'ms'),
            endTime = new Time(end.key, 'ms');

        _self._lmdb.closeCursor(db);
        _self._lmdb.abort(db);

        return { start: startTime, end: endTime };
    }

    getValueRanges(db) {
        assert(this._lmdb !== null);

        const _self = this;
        _self._lmdb.begin(db);
        _self._lmdb.cursor(db);

        let frameLength = _self._lmdb.meta.DataSet.DataChannels[db].type.length,
            units = _self._lmdb.meta.DataSet.DataChannels[db].units,
            max = new Array(frameLength).fill(Number.MIN_VALUE),
            min = new Array(frameLength).fill(Number.MAX_VALUE);

        for (var found = _self._lmdb.gotoFirst(db); found; found = _self._lmdb.gotoNext(db)) {
            let vals = _self._lmdb.getCurrentValue(db);
            for (let i in vals) {
                if (vals[i] > max[i]) {
                    max[i] = vals[i];
                }
                if (vals[i] < min[i]) {
                    min[i] = vals[i];
                }
            }
        }

        _self._lmdb.closeCursor(db);
        _self._lmdb.abort(db);

        return { min: min.map((val, i) => {
                return new Voltage(val, units[i]);
            }), max: max.map((val, i) => {
                return new Voltage(val, units[i]);
            })
        };
    }

    getOutputStream(db, startTime = new Time(0.0), convertFrames = true) {
        assert(this._lmdb !== null);

        const _self = this;

        _self._lmdb.begin(db);
        _self._lmdb.cursor(db);

        _self._lmdb.gotoRange(db, startTime);

        let hasNext = true,
            paused = false;

        const dataSource = {
            events: [],
            pauseOutput: function () {
                paused = true;
            },
            startOutput: function () {
                if (paused) {
                    paused = false;
                }
                while (!paused) {
                    if (this.events.length === 0 && hasNext) {
                        if (convertFrames) {
                            this.events = _self._lmdb.getCurrentEvents(db);
                        } else {
                            this.events = [_self._lmdb.getCurrentFrame(db)];
                        }
                        if (!_self._lmdb.gotoNext(db, startTime)) {
                            hasNext = false;
                        }
                    } else if (this.events.length === 0 && !hasNext) {
                        paused = true;
                        _self._lmdb.closeCursor(db);
                        _self._lmdb.abort(db);
                        output.EOF();
                    } else if (this.events.length > 0) {
                        output.addEvent(this.events.shift());
                    }
                }
            }
        },
        output = new EventOutputStream(dataSource);

        dataSource.startOutput();
        return output;
    }
}

export default LMDBNode;
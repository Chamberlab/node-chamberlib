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
        this._db = null;
        this._output = null;
        this._eventBuffer = [];
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

    createOutput(db, startTime = new Time(0.0), convertFrames = true) {
        assert(this._lmdb !== null);
        assert(this._output === null);
        assert(this._db === null);
        assert(typeof db === 'string');

        this._db = db;
        this._output = new EventOutputStream(this);
        this._convertFrames = convertFrames;
        this._hasNext = true;

        this._lmdb.begin(db);
        this._lmdb.cursor(db);
        this._db = db;
        this._lmdb.gotoRange(db, startTime);

        this.startOutput();

        return this._output;
    }

    startOutput() {
        if (this._paused) {
            this._paused = false;
        }
        while (!this._paused) {
            if (this._eventBuffer.length === 0 && this._hasNext) {
                if (this._convertFrames) {
                    this._eventBuffer = this._lmdb.getCurrentEvents(this._db);
                } else {
                    this._eventBuffer = [this._lmdb.getCurrentFrame(this._db)];
                }
                if (!this._lmdb.gotoNext(this._db)) {
                    this._hasNext = false;
                }
            } else if (this._eventBuffer.length === 0 && !this._hasNext) {
                this.endOutput(this._db);
            } else if (this._eventBuffer.length > 0) {
                this._output.addEvent(this._eventBuffer.shift());
            }
        }
    }

    pauseOutput() {
        this._paused = true;
    }

    endOutput() {
        this._paused = true;
        this._lmdb.closeCursor(this._db);
        this._lmdb.abort(this._db);
        this._db = null;
        this._output.EOF();
        this._output = null;
    }
}

export default LMDBNode;
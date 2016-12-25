import assert from 'assert';
import Promise from 'bluebird';

import BaseNode from '../BaseNode';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';
import LMDB from '../../data/io/LMDB';

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
        return Promise.coroutine(function* () {
            _self._lmdb.begin(db);
            _self._lmdb.cursor(db);

            _self._lmdb.gotoFirst(db);
            let start = yield _self._lmdb.getCurrentKeyValue(db);

            _self._lmdb.gotoLast(db);
            let end = yield _self._lmdb.getCurrentKeyValue(db);

            let startTime = new Time(start.key, 'ms'),
                endTime = new Time(end.key, 'ms');

            _self._lmdb.closeCursor(db);
            _self._lmdb.abort(db);

            return { start: startTime, end: endTime };
        })();
    }

    getValueRanges(db) {
        assert(this._lmdb !== null);

        const _self = this;
        return Promise.coroutine(function* () {
            _self._lmdb.begin(db);
            _self._lmdb.cursor(db);

            let frameLength = _self._lmdb.meta.DataSet.DataChannels[db].type.length,
                units = _self._lmdb.meta.DataSet.DataChannels[db].units,
                max = new Array(frameLength).fill(Number.MIN_VALUE),
                min = new Array(frameLength).fill(Number.MAX_VALUE);

            for (var found = _self._lmdb.gotoFirst(db); found; found = _self._lmdb.gotoNext(db)) {
                let vals = yield _self._lmdb.getCurrentValue(db);
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
        })();
    }
}

export default LMDBNode;
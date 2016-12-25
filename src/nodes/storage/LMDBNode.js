import assert from 'assert';
import Promise from 'bluebird';

import BaseNode from '../BaseNode';
import Time from '../../quantities/Time';
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

            return { start: startTime, end: endTime };
        })();
    }
}

export default LMDBNode;
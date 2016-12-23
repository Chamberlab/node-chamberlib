import * as lmdb from 'node-lmdb';

import BaseDB from './BaseDB';
import DataEvent from '../../events/DataEvent';
import Voltage from '../../quantities/Voltage';

class LMDB extends BaseDB {
    constructor(datapath, mapSize = Math.pow(1024, 3), maxDbs = 10) {
        super();

        this._env = new lmdb.Env();
        this._env.open({
            path: datapath,
            mapSize: mapSize,
            maxDbs: maxDbs
        });

        this._openDB = {};
        this._openTxn = {};
    }

    begin(db) {
        this._open(db);
        this._openTxn[db] = this._env.beginTxn();
    }

    commit(db) {
        this._openTxn[db].commit();
        delete this._openTxn[db];
    }

    abort(db) {
        this._openTxn[db].abort();
        delete this._openTxn[db];
    }

    get(db, time) {
        super.get(time);
        let key = this._getKey(time);
        let val = this._openTxn[db].getNumber(this._openDB[db], key);
        return typeof val === 'number' ? new DataEvent(time, new Voltage(val)) : null;
    }

    put(db, time, event) {
        let key = this._getKey(time);
        super.put(key, event);
        let val = event.normalized();
        this._openTxn[db].putNumber(this._openDB[db], key, val);
    }

    _open(dbname, create = true) {
        if (Object.keys(this._openDB) > 0) {
            Object.keys(this._openDB).map((name) => {
                if (name !== dbname) {
                    this._close(dbname);
                }
            });
        }
        if (!this._openDB[dbname]) {
            this._openDB[dbname] = this._env.openDbi({
                name: dbname,
                create: create
            });
        }
        return this._openDB[dbname];
    }

    _close(dbname) {
        if (this._openDB[dbname]) {
            this._openDB[dbname].close();
            delete this._openDB[dbname];
        }
        return this._openDB[dbname];
    }

    _getKey(time) {
        time = time.normalized().toFixed(6);
        return new Array(32 - time.length).fill(0).join() + time;
    }

    closeEnv() {
        this._env.close();
    }
}

export default LMDB;
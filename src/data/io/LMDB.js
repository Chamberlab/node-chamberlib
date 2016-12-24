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

    begin(db, readOnly = true) {
        this._open(db);
        this._openTxn[db] = this._env.beginTxn({ readOnly: readOnly });
    }

    commit(db) {
        this._openTxn[db].commit();
        this._openTxn[db] = null;
    }

    abort(db) {
        this._openTxn[db].abort();
        delete this._openTxn[db];
    }

    get(db, time) {
        let key = this._getKey(time.toObject()),
            val = this._openTxn[db].getNumber(this._openDB[db], key);
        return typeof val === 'number' ? new DataEvent(time, new Voltage(val)) : null;
    }

    put(db, channel, event) {
        let e = event.toObject(),
            key = this._getKey(e.t, channel);
        this._openTxn[db].putNumber(this._openDB[db], key, e.v);
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

    _getKey(time, channel) {
        let channelKey;
        time = time.toFixed(12);
        if (typeof channel === 'string') {
            channelKey = channel.substr(0,16) + new Array(16 - channel.substr(0,16).length).fill('_').join('');
        }
        return new Array(32 - time.length).fill(0).join('') + time + '-' + channelKey;
    }

    closeEnv() {
        this._env.close();
    }
}

export default LMDB;
import * as lmdb from 'node-lmdb';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import assert from 'assert';

import BaseDB from './BaseDB';
import JSONFile from './JSONFile';
import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';
import Voltage from '../../quantities/Voltage';

class LMDB extends BaseDB {
    constructor(datapath, readOnly = true, meta = undefined) {
        super();

        this._readOnly = readOnly;
        this._meta = meta;
        this._env = new lmdb.Env();

        if (!this._meta) {
            this._meta = JSON.parse(fs.readFileSync(path.join(datapath, 'meta.json')));
        }

        assert(this._meta instanceof Object);

        this._env.open({
            path: this._meta.dataDir,
            mapSize: this._meta.mapSize,
            maxDbs: this._meta.maxDbs
        });

        this._openDB = {};
        this._openTxn = {};
        this._cursors = {};

        this._updateMeta();
    }

    closeEnv() {
        if (this._readOnly) {
            return Promise.resolve(this._env.close());
        }
        return this._updateMeta()
            .then(() => {
                this._env.close();
            });
    }

    //
    //
    // Transactions

    begin(db, readOnly = true) {
        this._open(db);
        this._openTxn[db] = this._env.beginTxn({ readOnly: readOnly });
    }

    commit(db) {
        assert(this._openTxn[db], 'No Transaction instance');
        this._openTxn[db].commit();
        this._openTxn[db] = null;
    }

    abort(db) {
        assert(this._openTxn[db], 'No Transaction instance');
        this._openTxn[db].abort();
        this._openTxn[db] = null;
    }

    //
    //
    // Cursors

    cursor(db) {
        assert(this._openTxn[db], 'No Transaction instance');
        assert(this._openDB[db], 'No open DB instance');

        this._cursors[db] = new lmdb.Cursor(this._openTxn[db], this._openDB[db]);
    }

    getCurrentValue(db) {
        return this.getCurrentKeyValue(db, true);
    }

    getCurrentKeyValue(db, discardKey = false) {
        assert(this._cursors[db], 'No Cursor instance');

        const _self = this;
        return new Promise(function (resolve) {
            if (_self._meta.DataSet.DataChannels[db].type.class === 'DataFrame') {
                let arrayClass = _self._getArrayClass(_self._meta.DataSet.DataChannels[db].type.type);
                _self._cursors[db].getCurrentBinary((_key, _val) => {
                    if (discardKey) {
                        return new arrayClass(_val.buffer);
                    }
                    resolve({
                        key: _key.toString(),
                        val: new arrayClass(_val.buffer)
                    });
                });
            } else {
                _self._cursors[db].getCurrentNumber((_key, _val) => {
                    if (discardKey) {
                        return _val;
                    }
                    resolve({
                        key: _key.toString(),
                        val: _val
                    });
                });
            }
        });
    }

    //
    //
    // Cursor movements

    gotoFirst(db) {
        assert(this._cursors[db], 'No Cursor instance');
        this._cursors[db].goToFirst();
    }

    gotoPrev(db) {
        assert(this._cursors[db], 'No Cursor instance');
        this._cursors[db].goToPrev();
    }

    gotoNext(db) {
        assert(this._cursors[db], 'No Cursor instance');
        this._cursors[db].goToNext();
    }

    gotoLast(db) {
        assert(this._cursors[db], 'No Cursor instance');
        this._cursors[db].goToLast();
    }

    gotoKey(db, key) {
        assert(this._cursors[db], 'No Cursor instance');
        this._cursors[db].goToKey(key);
    }

    gotoRange(db, key) {
        assert(this._cursors[db], 'No Cursor instance');
        this._cursors[db].goToRange(key);
    }


    //
    //
    // CRU(D)

    get(db, time) {
        assert(this._openTxn[db], 'No Transaction instance');
        assert(this._openDB[db], 'No open DB instance');

        let key = this._getKey(db, time.toObject()),
            val = this._openTxn[db].getNumber(this._openDB[db], key);
        return typeof val === 'number' ? new DataEvent(time, new Voltage(val)) : null;
    }

    put(db, event) {
        assert(this._openTxn[db], 'No Transaction instance');
        assert(this._openDB[db], 'No open DB instance');
        assert(!this._meta.readOnly, 'DB is read-only');

        if (event instanceof DataFrame) {
            let key = this._getKey(db, event.time.normalized()),
                buffer = Buffer.from(event.value.buffer);
            this._openTxn[db].putBinary(this._openDB[db], key, buffer);
            return;
        }
        let e = event.toObject(),
            key = this._getKey(db, e.t);
        this._openTxn[db].putNumber(this._openDB[db], key, e.v);
    }

    _createDB(db, meta) {
        assert(meta instanceof Object, 'Meta object is required');

        const _self = this;
        this._meta.DataSet.DataChannels[db] = meta;
        return this._updateMeta()
            .then(() => {
                _self._open(db);
            });
    }


    //
    //
    // internals

    _open(dbname) {
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
                create: true,
                dupSort: true,
                reverseKey: false,
                integerKey: false,
                dupFixed: false,
                integerDup: false
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

    _updateMeta() {
        return new JSONFile(this._meta).write(path.join(this._meta.dataDir, 'meta.json'));
    }

    _getKey(db, time) {
        const channel = this._meta.DataSet.DataChannels[db];
        time = time.toFixed(channel.keyPrecision);
        return new Array(channel.keySize + channel.keyPrecision - time.length)
                .fill(0).join('') + time;
    }

    _getArrayClass(typeString) {
        switch (typeString) {
            case 'Float32':
                return Float32Array;
            case 'Float64':
                return Float32Array;
            case 'Int32':
                return Int32Array;
            case 'Uint32':
                return Uint32Array;
            case 'Int16':
                return Int32Array;
            case 'Uint16':
                return Uint32Array;
            case 'Int8':
                return Int8Array;
            case 'Uint8':
                return Uint8Array;
        }
    }
}

export default LMDB;
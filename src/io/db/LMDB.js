import * as lmdb from 'node-lmdb';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import uuid4 from 'uuid4';
import Qty from 'js-quantities';
import math from 'mathjs';

import BaseDB from './BaseDB';
import JSONFile from '../file/JSONFile';
import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';

const roundFormat = decimals => {
    return function(scalar) {
        const pow = math.pow(10, decimals),
            str = `${(math.round(scalar * pow) / pow).toFixed(decimals)}`;
        return str;
    };
};

class LMDB extends BaseDB {
    constructor(datapath, readOnly = true, meta = undefined) {
        super();

        this._readOnly = readOnly;
        this._datapath = datapath;
        this._meta = meta;
        this._env = new lmdb.Env();

        if (!this._meta) {
            this._meta = JSON.parse(fs.readFileSync(path.join(datapath, 'meta.json')));
        }

        assert(this._meta instanceof Object);

        this._env.open({
            path: datapath,
            mapSize: this._meta.mapSize,
            maxDbs: this._meta.maxDbs
        });

        this._openDB = {};
        this._openTxn = {};
        this._cursors = {};

        if (!readOnly) {
            this._updateMeta();
        }
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
        const uuid = uuid4();
        this._openTxn[uuid] = this._env.beginTxn({ readOnly: readOnly });
        return uuid;
    }

    commit(uuid) {
        assert(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        this._openTxn[uuid].commit();
        this._openTxn[uuid] = null;
    }

    abort(uuid) {
        assert(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        this._openTxn[uuid].abort();
        this._openTxn[uuid] = null;
    }

    //
    //
    // Cursors

    cursor(db, uuid) {
        assert(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        assert(this._openDB[db], `No open DB for ${db}`);

        let cursorUUID = uuid4();
        this._cursors[cursorUUID] = new lmdb.Cursor(this._openTxn[uuid], this._openDB[db]);
        return cursorUUID;
    }

    closeCursor(uuid) {
        if (!this._cursors[uuid]) {
            return;
        }

        this._cursors[uuid].close();
        this._cursors[uuid] = null;
    }

    getCurrentEvents(db, cursorUUID) {
        let res = this.getCurrentKeyValue(db, cursorUUID),
            key = res.key.substr(0, res.key.length - 1),
            events = [],
            _self = this;
        res.val.map((val, i) => {
            let evt = new DataEvent(
                Qty(math.number(key), _self._meta.DataSet.DataChannels[db].keyUnit),
                Qty(val, _self._meta.DataSet.DataChannels[db].units[i])
            );
            evt.parentUUID = _self._meta.DataSet.DataChannels[db].uuids[i];
            events.push(evt);
        });
        return events;
    }

    getCurrentFrame(db, cursorUUID) {
        let res = this.getCurrentKeyValue(db, cursorUUID),
            frame = new DataFrame(
                Qty(math.number(res.key), this._meta.DataSet.DataChannels[db].keyUnit),
                res.val
            );
        frame.parentUUID = this._meta.DataSet.DataChannels[db].uuid;
        return frame;
    }

    getCurrentValue(db, cursorUUID) {
        return this.getCurrentKeyValue(db, cursorUUID, true);
    }

    getCurrentKeyValue(db, cursorUUID, discardKey = false) {
        assert(this._cursors[cursorUUID], 'No Cursor instance');

        const _self = this;
        let res = null;

        if (_self._meta.DataSet.DataChannels[db].type.class === 'DataFrame') {
            let arrayClass = _self._getArrayClass(_self._meta.DataSet.DataChannels[db].type.type);
            _self._cursors[cursorUUID].getCurrentBinary((_key, _val) => {
                if (discardKey) {
                    res = new arrayClass(_val.buffer);
                } else {
                    res = {
                        key: _key.toString('ucs2'),
                        val: new arrayClass(_val.buffer)
                    };
                }
            });
        } else {
            _self._cursors[cursorUUID].getCurrentNumber((_key, _val) => {
                if (discardKey) {
                    res = _val;
                } else {
                    res = {
                        key: _key.toString('ucs2'),
                        val: math.number(_val)
                    };
                }
            });
        }

        return res;
    }

    //
    //
    // Cursor movements

    gotoFirst(uuid) {
        assert(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToFirst();
    }

    gotoPrev(uuid) {
        assert(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToPrev();
    }

    gotoNext(uuid) {
        assert(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToNext();
    }

    gotoLast(uuid) {
        assert(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToLast();
    }

    gotoKey(db, uuid, key) {
        assert(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToKey(this._checkAndConvertKey(db, key));
    }

    gotoRange(db, uuid, key) {
        assert(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToRange(this._checkAndConvertKey(db, key));
    }


    //
    //
    // CRU(D?)

    get(db, uuid, time, parentUUID = undefined) {
        assert(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        assert(this._openDB[db], `No open DB instance for ${db}`);

        let key = this._getKey(db, time, parentUUID),
            val = this._openTxn[uuid].getNumber(this._openDB[db], key);

        // FIXME: remove hardcoded mV
        return typeof val === 'number' ? new DataEvent(time, Qty(val, 'mV')) : null;
    }

    put(db, uuid, event) {
        assert(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        assert(this._openDB[db], 'No open DB instance');
        assert(!this._meta.readOnly, 'DB is read-only');

        if (event instanceof DataFrame) {
            let key = this._getKey(db, event.time),
                buffer = Buffer.from(event.value.buffer);
            this._openTxn[uuid].putBinary(this._openDB[db], key, buffer);
            return;
        }
        let e = event.toObject(),
            key = this._getKey(db, e.t, event.parentUUID);
        this._openTxn[uuid].putNumber(this._openDB[db], key, e.v.scalar);
    }


    //
    //
    // internals

    _createDB(db, meta) {
        assert(meta instanceof Object, 'Meta object is required');

        const _self = this;
        this._meta.DataSet.DataChannels[db] = meta;
        return this._updateMeta()
            .then(() => {
                _self._open(db);
            });
    }

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
        const _self = this,
            fpath = path.join(this._datapath, 'meta.json'),
            meta = this._meta;
        return new JSONFile(meta).write(fpath + '.bak')
            .then(() => {
                return new JSONFile(meta).write(fpath);
            })
            .then(() => {
                _self.emit('updated');
            });
    }

    _getKey(db, time, channelUUID = undefined) {
        const channel = this._meta.DataSet.DataChannels[db];

        if (typeof time === 'number') {
            time = Qty(time, channel.keyUnit);
        }

        assert(time instanceof Qty, `Key time must be Qty or number, is ${typeof time}`);

        const timeStr = time.format(roundFormat(channel.keyPrecision));
        return new Array(channel.keySize - timeStr.length).fill(0).join('') + timeStr + channelUUID || '';
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

    _checkAndConvertKey(db, key) {
        if (typeof key === 'number') {
            return this._getKey(db, key);
        } else if (key instanceof Qty) {
            return this._getKey(db, key.to('s').scalar);
        } else if (typeof key === 'string') {
            return this._getKey(db, Qty(key).to('s').scalar);
        }
        return key;
    }

    //
    //
    // Getters / Setters

    get meta() {
        return this._meta;
    }
}

export default LMDB;
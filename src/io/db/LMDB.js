import * as lmdb from 'node-lmdb';
import Promise from 'bluebird';
import fs from 'fs';
import path from 'path';
import assert from 'assert';
import uuid4 from 'uuid4';
import Qty from 'js-quantities';
import math from 'mathjs';

import BaseDB from './BaseDB';
import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';

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
        let channel = this._meta.DataSet.DataChannels[db],
            res = this.getCurrentKeyValue(db, cursorUUID),
            keyTime = res.key.length === channel.keySize + 12 ? res.key.substr(12) : res.key,
            events = [];
        res.val.map((val, i) => {
            let evt = new DataEvent(
                Qty(math.number(keyTime), channel.keyUnit),
                Qty(val, channel.units[i])
            );
            evt.parentUUID = channel.uuids[i];
            events.push(evt);
        });
        return events;
    }

    getCurrentFrame(db, cursorUUID) {
        let channel = this._meta.DataSet.DataChannels[db],
            res = this.getCurrentKeyValue(db, cursorUUID),
            frame = new DataFrame(
                Qty(math.number(res.key), channel.keyUnit),
                res.val
            );
        frame.parentUUID = channel.uuid;
        return frame;
    }

    getCurrentValue(db, cursorUUID) {
        return this.getCurrentKeyValue(db, cursorUUID, true);
    }

    getCurrentKeyValue(db, cursorUUID, discardKey = false) {
        assert(this._cursors[cursorUUID], 'No Cursor instance');

        let res = null;

        // TODO: simplify this, remove redundancies

        if (this._meta.DataSet.DataChannels[db].type.class === 'DataFrame') {
            let arrayClass = this._getArrayClass(this._meta.DataSet.DataChannels[db].type.type);
            this._cursors[cursorUUID].getCurrentBinary((_key, _val) => {
                let keystr = _key.toString('ucs2');
                keystr = keystr.substr(0, keystr.length - 1);
                if (discardKey) {
                    res = new arrayClass(_val.buffer);
                } else {
                    res = {
                        key: keystr,
                        val: new arrayClass(_val.buffer)
                    };
                }
            });
        } else {
            this._cursors[cursorUUID].getCurrentNumber((_key, _val) => {
                let keystr = _key.toString('ucs2');
                keystr = keystr.substr(0, keystr.length - 1);
                if (discardKey) {
                    res = _val;
                } else {
                    res = {
                        key: keystr,
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
}

export default LMDB;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _nodeLmdb = require('node-lmdb');

var lmdb = _interopRequireWildcard(_nodeLmdb);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _BaseDB = require('./BaseDB');

var _BaseDB2 = _interopRequireDefault(_BaseDB);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class LMDB extends _BaseDB2.default {
    constructor(datapath, readOnly = true, meta = undefined) {
        super();

        this._readOnly = readOnly;
        this._datapath = datapath;
        this._meta = meta;
        this._env = new lmdb.Env();

        if (!this._meta) {
            this._meta = JSON.parse(_fs2.default.readFileSync(_path2.default.join(datapath, 'meta.json')));
        }

        (0, _assert2.default)(this._meta instanceof Object);

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
            return _bluebird2.default.resolve(this._env.close());
        }
        return this._updateMeta().then(() => {
            this._env.close();
        });
    }

    //
    //
    // Transactions

    begin(db, readOnly = true) {
        this._open(db);
        const uuid = (0, _uuid2.default)();
        this._openTxn[uuid] = this._env.beginTxn({ readOnly: readOnly });
        return uuid;
    }

    commit(uuid) {
        (0, _assert2.default)(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        this._openTxn[uuid].commit();
        this._openTxn[uuid] = null;
    }

    abort(uuid) {
        (0, _assert2.default)(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        this._openTxn[uuid].abort();
        this._openTxn[uuid] = null;
    }

    //
    //
    // Cursors

    cursor(db, uuid) {
        (0, _assert2.default)(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        (0, _assert2.default)(this._openDB[db], `No open DB for ${db}`);

        let cursorUUID = (0, _uuid2.default)();
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
            let evt = new _DataEvent2.default((0, _jsQuantities2.default)(_mathjs2.default.number(keyTime), channel.keyUnit), (0, _jsQuantities2.default)(val, channel.units[i]));
            evt.parentUUID = channel.uuids[i];
            events.push(evt);
        });
        return events;
    }

    getCurrentFrame(db, cursorUUID) {
        let channel = this._meta.DataSet.DataChannels[db],
            res = this.getCurrentKeyValue(db, cursorUUID),
            frame = new _DataFrame2.default((0, _jsQuantities2.default)(_mathjs2.default.number(res.key), channel.keyUnit), res.val);
        frame.parentUUID = channel.uuid;
        return frame;
    }

    getCurrentValue(db, cursorUUID) {
        return this.getCurrentKeyValue(db, cursorUUID, true);
    }

    getCurrentKeyValue(db, cursorUUID, discardKey = false) {
        (0, _assert2.default)(this._cursors[cursorUUID], 'No Cursor instance');

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
                        val: _mathjs2.default.number(_val)
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
        (0, _assert2.default)(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToFirst();
    }

    gotoPrev(uuid) {
        (0, _assert2.default)(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToPrev();
    }

    gotoNext(uuid) {
        (0, _assert2.default)(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToNext();
    }

    gotoLast(uuid) {
        (0, _assert2.default)(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToLast();
    }

    gotoKey(db, uuid, key) {
        (0, _assert2.default)(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToKey(this._checkAndConvertKey(db, key));
    }

    gotoRange(db, uuid, key) {
        (0, _assert2.default)(this._cursors[uuid], `No Cursor instance for ${uuid}`);
        return this._cursors[uuid].goToRange(this._checkAndConvertKey(db, key));
    }

    //
    //
    // CRU(D?)

    get(db, uuid, time, parentUUID = undefined) {
        (0, _assert2.default)(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        (0, _assert2.default)(this._openDB[db], `No open DB instance for ${db}`);

        let key = this._getKey(db, time, parentUUID),
            val = this._openTxn[uuid].getNumber(this._openDB[db], key);

        // FIXME: remove hardcoded mV
        return typeof val === 'number' ? new _DataEvent2.default(time, (0, _jsQuantities2.default)(val, 'mV')) : null;
    }

    put(db, uuid, event) {
        (0, _assert2.default)(this._openTxn[uuid], `No Transaction instance for ${uuid}`);
        (0, _assert2.default)(this._openDB[db], 'No open DB instance');
        (0, _assert2.default)(!this._meta.readOnly, 'DB is read-only');

        if (event instanceof _DataFrame2.default) {
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

exports.default = LMDB;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _uuidValidate = require('uuid-validate');

var _uuidValidate2 = _interopRequireDefault(_uuidValidate);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _JSONFile = require('../../io/file/JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatKey = decimals => {
    return function (scalar) {
        const pow = _mathjs2.default.pow(10, decimals);
        return `${(_mathjs2.default.round(scalar * pow) / pow).toFixed(decimals)}`;
    };
};

class BaseDB extends _tinyEmitter2.default {
    constructor() {
        super();

        this._datapath = undefined;
        this._meta = undefined;
    }

    get(key) {
        (0, _assert2.default)(key instanceof _jsQuantities2.default);
    }

    put(key, val) {
        (0, _assert2.default)(key instanceof _jsQuantities2.default);
        (0, _assert2.default)(val instanceof _DataEvent2.default);
    }

    //
    //
    // internals

    _createDB(db, meta) {
        (0, _assert2.default)(meta instanceof Object, 'Meta object is required');

        const _self = this;
        this._meta.DataSet.DataChannels[db] = meta;
        return this._updateMeta().then(() => {
            _self._open(db);
        });
    }

    _open(dbname) {
        if (Object.keys(this._openDB) > 0) {
            Object.keys(this._openDB).map(name => {
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
              fpath = _path2.default.join(this._datapath, 'meta.json'),
              meta = this._meta;
        return new _JSONFile2.default(meta).write(fpath + '.bak').then(() => {
            return new _JSONFile2.default(meta).write(fpath);
        }).then(() => {
            _self.emit('updated');
        });
    }

    _getKey(db, time, channelUUID = undefined) {
        const channel = this._meta.DataSet.DataChannels[db];

        if (typeof time === 'number') {
            time = (0, _jsQuantities2.default)(time, channel.keyUnit);
        }

        (0, _assert2.default)(time instanceof _jsQuantities2.default, `Key time must be Qty or number, is ${typeof time}`);

        const timeStr = time.format(formatKey(channel.keyPrecision));
        return ((0, _uuidValidate2.default)(channelUUID, 4) ? channelUUID.split('-').pop() : '') + new Array(channel.keySize - timeStr.length + 1).fill(0).join('') + timeStr;
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
        } else if (key instanceof _jsQuantities2.default) {
            return this._getKey(db, key.to('s').scalar);
        } else if (typeof key === 'string') {
            return this._getKey(db, (0, _jsQuantities2.default)(key).to('s').scalar);
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

exports.default = BaseDB;
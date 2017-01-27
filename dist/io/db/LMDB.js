'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var _BaseDB2 = require('./BaseDB');

var _BaseDB3 = _interopRequireDefault(_BaseDB2);

var _JSONFile = require('../file/JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LMDB = function (_BaseDB) {
    (0, _inherits3.default)(LMDB, _BaseDB);

    function LMDB(datapath) {
        var readOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        (0, _classCallCheck3.default)(this, LMDB);

        var _this = (0, _possibleConstructorReturn3.default)(this, (LMDB.__proto__ || (0, _getPrototypeOf2.default)(LMDB)).call(this));

        _this._readOnly = readOnly;
        _this._datapath = datapath;
        _this._meta = meta;
        _this._env = new lmdb.Env();

        if (!_this._meta) {
            _this._meta = JSON.parse(_fs2.default.readFileSync(_path2.default.join(datapath, 'meta.json')));
        }

        (0, _assert2.default)(_this._meta instanceof Object);

        _this._env.open({
            path: datapath,
            mapSize: _this._meta.mapSize,
            maxDbs: _this._meta.maxDbs
        });

        _this._openDB = {};
        _this._openTxn = {};
        _this._cursors = {};

        if (!readOnly) {
            _this._updateMeta();
        }
        return _this;
    }

    (0, _createClass3.default)(LMDB, [{
        key: 'closeEnv',
        value: function closeEnv() {
            var _this2 = this;

            if (this._readOnly) {
                return _bluebird2.default.resolve(this._env.close());
            }
            return this._updateMeta().then(function () {
                _this2._env.close();
            });
        }

        //
        //
        // Transactions

    }, {
        key: 'begin',
        value: function begin(db) {
            var readOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._open(db);
            var uuid = (0, _uuid2.default)();
            this._openTxn[uuid] = this._env.beginTxn({ readOnly: readOnly });
            return uuid;
        }
    }, {
        key: 'commit',
        value: function commit(uuid) {
            (0, _assert2.default)(this._openTxn[uuid], 'No Transaction instance for ' + uuid);
            this._openTxn[uuid].commit();
            this._openTxn[uuid] = null;
        }
    }, {
        key: 'abort',
        value: function abort(uuid) {
            (0, _assert2.default)(this._openTxn[uuid], 'No Transaction instance for ' + uuid);
            this._openTxn[uuid].abort();
            this._openTxn[uuid] = null;
        }

        //
        //
        // Cursors

    }, {
        key: 'cursor',
        value: function cursor(db, uuid) {
            (0, _assert2.default)(this._openTxn[uuid], 'No Transaction instance for ' + uuid);
            (0, _assert2.default)(this._openDB[db], 'No open DB for ' + db);

            var cursorUUID = (0, _uuid2.default)();
            this._cursors[cursorUUID] = new lmdb.Cursor(this._openTxn[uuid], this._openDB[db]);
            return cursorUUID;
        }
    }, {
        key: 'closeCursor',
        value: function closeCursor(uuid) {
            if (!this._cursors[uuid]) {
                return;
            }

            this._cursors[uuid].close();
            this._cursors[uuid] = null;
        }
    }, {
        key: 'getCurrentEvents',
        value: function getCurrentEvents(db, cursorUUID) {
            var res = this.getCurrentKeyValue(db, cursorUUID),
                events = [],
                _self = this;
            res.val.map(function (val, i) {
                var evt = new _DataEvent2.default(new _Time2.default(res.key, _self._meta.DataSet.DataChannels[db].keyUnit), new _Voltage2.default(val, _self._meta.DataSet.DataChannels[db].units[i]));
                evt.parentUUID = _self._meta.DataSet.DataChannels[db].uuids[i];
                events.push(evt);
            });
            return events;
        }
    }, {
        key: 'getCurrentFrame',
        value: function getCurrentFrame(db, cursorUUID) {
            var res = this.getCurrentKeyValue(db, cursorUUID),
                frame = new _DataFrame2.default(new _Time2.default(res.key, this._meta.DataSet.DataChannels[db].keyUnit), res.val);
            frame.parentUUID = this._meta.DataSet.DataChannels[db].uuid;
            return frame;
        }
    }, {
        key: 'getCurrentValue',
        value: function getCurrentValue(db, cursorUUID) {
            return this.getCurrentKeyValue(db, cursorUUID, true);
        }
    }, {
        key: 'getCurrentKeyValue',
        value: function getCurrentKeyValue(db, cursorUUID) {
            var discardKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            (0, _assert2.default)(this._cursors[cursorUUID], 'No Cursor instance');

            var _self = this;
            var res = null;

            if (_self._meta.DataSet.DataChannels[db].type.class === 'DataFrame') {
                (function () {
                    var arrayClass = _self._getArrayClass(_self._meta.DataSet.DataChannels[db].type.type);
                    _self._cursors[cursorUUID].getCurrentBinary(function (_key, _val) {
                        if (discardKey) {
                            res = new arrayClass(_val.buffer);
                        } else {
                            res = {
                                key: _key.toString('ucs2'),
                                val: new arrayClass(_val.buffer)
                            };
                        }
                    });
                })();
            } else {
                _self._cursors[cursorUUID].getCurrentNumber(function (_key, _val) {
                    if (discardKey) {
                        res = _val;
                    } else {
                        res = {
                            key: _key.toString('ucs2'),
                            val: _val
                        };
                    }
                });
            }

            return res;
        }

        //
        //
        // Cursor movements

    }, {
        key: 'gotoFirst',
        value: function gotoFirst(uuid) {
            (0, _assert2.default)(this._cursors[uuid], 'No Cursor instance for ' + uuid);
            return this._cursors[uuid].goToFirst();
        }
    }, {
        key: 'gotoPrev',
        value: function gotoPrev(uuid) {
            (0, _assert2.default)(this._cursors[uuid], 'No Cursor instance for ' + uuid);
            return this._cursors[uuid].goToPrev();
        }
    }, {
        key: 'gotoNext',
        value: function gotoNext(uuid) {
            (0, _assert2.default)(this._cursors[uuid], 'No Cursor instance for ' + uuid);
            return this._cursors[uuid].goToNext();
        }
    }, {
        key: 'gotoLast',
        value: function gotoLast(uuid) {
            (0, _assert2.default)(this._cursors[uuid], 'No Cursor instance for ' + uuid);
            return this._cursors[uuid].goToLast();
        }
    }, {
        key: 'gotoKey',
        value: function gotoKey(db, uuid, key) {
            (0, _assert2.default)(this._cursors[uuid], 'No Cursor instance for ' + uuid);
            return this._cursors[uuid].goToKey(this._checkAndConvertKey(db, key));
        }
    }, {
        key: 'gotoRange',
        value: function gotoRange(db, uuid, key) {
            (0, _assert2.default)(this._cursors[uuid], 'No Cursor instance for ' + uuid);
            return this._cursors[uuid].goToRange(this._checkAndConvertKey(db, key));
        }

        //
        //
        // CRU(D?)

    }, {
        key: 'get',
        value: function get(db, uuid, time) {
            var parentUUID = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

            (0, _assert2.default)(this._openTxn[uuid], 'No Transaction instance for ' + uuid);
            (0, _assert2.default)(this._openDB[db], 'No open DB instance for ' + db);

            var key = this._getKey(db, time.toObject(), parentUUID),
                val = this._openTxn[uuid].getNumber(this._openDB[db], key);
            return typeof val === 'number' ? new _DataEvent2.default(time, new _Voltage2.default(val)) : null;
        }
    }, {
        key: 'put',
        value: function put(db, uuid, event) {
            (0, _assert2.default)(this._openTxn[uuid], 'No Transaction instance for ' + uuid);
            (0, _assert2.default)(this._openDB[db], 'No open DB instance');
            (0, _assert2.default)(!this._meta.readOnly, 'DB is read-only');

            if (event instanceof _DataFrame2.default) {
                var _key2 = this._getKey(db, event.time.normalized()),
                    buffer = Buffer.from(event.value.buffer);
                this._openTxn[uuid].putBinary(this._openDB[db], _key2, buffer);
                return;
            }
            var e = event.toObject(),
                key = this._getKey(db, e.t, event.parentUUID);
            this._openTxn[uuid].putNumber(this._openDB[db], key, e.v);
        }

        //
        //
        // internals

    }, {
        key: '_createDB',
        value: function _createDB(db, meta) {
            (0, _assert2.default)(meta instanceof Object, 'Meta object is required');

            var _self = this;
            this._meta.DataSet.DataChannels[db] = meta;
            return this._updateMeta().then(function () {
                _self._open(db);
            });
        }
    }, {
        key: '_open',
        value: function _open(dbname) {
            var _this3 = this;

            if ((0, _keys2.default)(this._openDB) > 0) {
                (0, _keys2.default)(this._openDB).map(function (name) {
                    if (name !== dbname) {
                        _this3._close(dbname);
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
    }, {
        key: '_close',
        value: function _close(dbname) {
            if (this._openDB[dbname]) {
                this._openDB[dbname].close();
                delete this._openDB[dbname];
            }
            return this._openDB[dbname];
        }
    }, {
        key: '_updateMeta',
        value: function _updateMeta() {
            var _self = this,
                fpath = _path2.default.join(this._datapath, 'meta.json'),
                meta = this._meta;
            return new _JSONFile2.default(meta).write(fpath + '.bak').then(function () {
                return new _JSONFile2.default(meta).write(fpath);
            }).then(function () {
                _self.emit('updated');
            });
        }
    }, {
        key: '_getKey',
        value: function _getKey(db, time) {
            var channelUUID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var channel = this._meta.DataSet.DataChannels[db];
            time = time.toFixed(channel.keyPrecision);
            return new Array(channel.keySize + channel.keyPrecision - time.length).fill(0).join('') + time + (channelUUID ? '-' + channelUUID : '');
        }
    }, {
        key: '_getArrayClass',
        value: function _getArrayClass(typeString) {
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
    }, {
        key: '_checkAndConvertKey',
        value: function _checkAndConvertKey(db, key) {
            if (typeof key === 'number') {
                return this._getKey(db, key);
            } else if (key instanceof _Time2.default) {
                return this._getKey(db, key.normalized());
            }
            return key;
        }

        //
        //
        // Getters / Setters

    }, {
        key: 'meta',
        get: function get() {
            return this._meta;
        }
    }]);
    return LMDB;
}(_BaseDB3.default);

exports.default = LMDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2RiL0xNREIuanMiXSwibmFtZXMiOlsibG1kYiIsIkxNREIiLCJkYXRhcGF0aCIsInJlYWRPbmx5IiwibWV0YSIsInVuZGVmaW5lZCIsIl9yZWFkT25seSIsIl9kYXRhcGF0aCIsIl9tZXRhIiwiX2VudiIsIkVudiIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImpvaW4iLCJPYmplY3QiLCJvcGVuIiwicGF0aCIsIm1hcFNpemUiLCJtYXhEYnMiLCJfb3BlbkRCIiwiX29wZW5UeG4iLCJfY3Vyc29ycyIsIl91cGRhdGVNZXRhIiwicmVzb2x2ZSIsImNsb3NlIiwidGhlbiIsImRiIiwiX29wZW4iLCJ1dWlkIiwiYmVnaW5UeG4iLCJjb21taXQiLCJhYm9ydCIsImN1cnNvclVVSUQiLCJDdXJzb3IiLCJyZXMiLCJnZXRDdXJyZW50S2V5VmFsdWUiLCJldmVudHMiLCJfc2VsZiIsInZhbCIsIm1hcCIsImkiLCJldnQiLCJrZXkiLCJEYXRhU2V0IiwiRGF0YUNoYW5uZWxzIiwia2V5VW5pdCIsInVuaXRzIiwicGFyZW50VVVJRCIsInV1aWRzIiwicHVzaCIsImZyYW1lIiwiZGlzY2FyZEtleSIsInR5cGUiLCJjbGFzcyIsImFycmF5Q2xhc3MiLCJfZ2V0QXJyYXlDbGFzcyIsImdldEN1cnJlbnRCaW5hcnkiLCJfa2V5IiwiX3ZhbCIsImJ1ZmZlciIsInRvU3RyaW5nIiwiZ2V0Q3VycmVudE51bWJlciIsImdvVG9GaXJzdCIsImdvVG9QcmV2IiwiZ29Ub05leHQiLCJnb1RvTGFzdCIsImdvVG9LZXkiLCJfY2hlY2tBbmRDb252ZXJ0S2V5IiwiZ29Ub1JhbmdlIiwidGltZSIsIl9nZXRLZXkiLCJ0b09iamVjdCIsImdldE51bWJlciIsImV2ZW50Iiwibm9ybWFsaXplZCIsIkJ1ZmZlciIsImZyb20iLCJ2YWx1ZSIsInB1dEJpbmFyeSIsImUiLCJ0IiwicHV0TnVtYmVyIiwidiIsImRibmFtZSIsIm5hbWUiLCJfY2xvc2UiLCJvcGVuRGJpIiwiY3JlYXRlIiwiZHVwU29ydCIsInJldmVyc2VLZXkiLCJpbnRlZ2VyS2V5IiwiZHVwRml4ZWQiLCJpbnRlZ2VyRHVwIiwiZnBhdGgiLCJ3cml0ZSIsImVtaXQiLCJjaGFubmVsVVVJRCIsImNoYW5uZWwiLCJ0b0ZpeGVkIiwia2V5UHJlY2lzaW9uIiwiQXJyYXkiLCJrZXlTaXplIiwibGVuZ3RoIiwiZmlsbCIsInR5cGVTdHJpbmciLCJGbG9hdDMyQXJyYXkiLCJJbnQzMkFycmF5IiwiVWludDMyQXJyYXkiLCJJbnQ4QXJyYXkiLCJVaW50OEFycmF5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNQyxJOzs7QUFDRixrQkFBWUMsUUFBWixFQUF5RDtBQUFBLFlBQW5DQyxRQUFtQyx1RUFBeEIsSUFBd0I7QUFBQSxZQUFsQkMsSUFBa0IsdUVBQVhDLFNBQVc7QUFBQTs7QUFBQTs7QUFHckQsY0FBS0MsU0FBTCxHQUFpQkgsUUFBakI7QUFDQSxjQUFLSSxTQUFMLEdBQWlCTCxRQUFqQjtBQUNBLGNBQUtNLEtBQUwsR0FBYUosSUFBYjtBQUNBLGNBQUtLLElBQUwsR0FBWSxJQUFJVCxLQUFLVSxHQUFULEVBQVo7O0FBRUEsWUFBSSxDQUFDLE1BQUtGLEtBQVYsRUFBaUI7QUFDYixrQkFBS0EsS0FBTCxHQUFhRyxLQUFLQyxLQUFMLENBQVcsYUFBR0MsWUFBSCxDQUFnQixlQUFLQyxJQUFMLENBQVVaLFFBQVYsRUFBb0IsV0FBcEIsQ0FBaEIsQ0FBWCxDQUFiO0FBQ0g7O0FBRUQsOEJBQU8sTUFBS00sS0FBTCxZQUFzQk8sTUFBN0I7O0FBRUEsY0FBS04sSUFBTCxDQUFVTyxJQUFWLENBQWU7QUFDWEMsa0JBQU1mLFFBREs7QUFFWGdCLHFCQUFTLE1BQUtWLEtBQUwsQ0FBV1UsT0FG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QixjQUFjLE1BQU1BLFdBQXBCLEdBQWtDLEVBRC9ELENBQVA7QUFFSDs7O3VDQUVjUSxVLEVBQVk7QUFDdkIsb0JBQVFBLFVBQVI7QUFDQSxxQkFBSyxTQUFMO0FBQ0ksMkJBQU9DLFlBQVA7QUFDSixxQkFBSyxTQUFMO0FBQ0ksMkJBQU9BLFlBQVA7QUFDSixxQkFBSyxPQUFMO0FBQ0ksMkJBQU9DLFVBQVA7QUFDSixxQkFBSyxRQUFMO0FBQ0ksMkJBQU9DLFdBQVA7QUFDSixxQkFBSyxPQUFMO0FBQ0ksMkJBQU9ELFVBQVA7QUFDSixxQkFBSyxRQUFMO0FBQ0ksMkJBQU9DLFdBQVA7QUFDSixxQkFBSyxNQUFMO0FBQ0ksMkJBQU9DLFNBQVA7QUFDSixxQkFBSyxPQUFMO0FBQ0ksMkJBQU9DLFVBQVA7QUFoQko7QUFrQkg7Ozs0Q0FFbUJuRixFLEVBQUlnQixHLEVBQUs7QUFDekIsZ0JBQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCO0FBQ3pCLHVCQUFPLEtBQUs0QixPQUFMLENBQWE1QyxFQUFiLEVBQWlCZ0IsR0FBakIsQ0FBUDtBQUNILGFBRkQsTUFFTyxJQUFJQSw2QkFBSixFQUF5QjtBQUM1Qix1QkFBTyxLQUFLNEIsT0FBTCxDQUFhNUMsRUFBYixFQUFpQmdCLElBQUlnQyxVQUFKLEVBQWpCLENBQVA7QUFDSDtBQUNELG1CQUFPaEMsR0FBUDtBQUNIOztBQUVEO0FBQ0E7QUFDQTs7Ozs0QkFFVztBQUNQLG1CQUFPLEtBQUtuQyxLQUFaO0FBQ0g7Ozs7O2tCQUdVUCxJIiwiZmlsZSI6ImlvL2RiL0xNREIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBsbWRiIGZyb20gJ25vZGUtbG1kYic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgdXVpZDQgZnJvbSAndXVpZDQnO1xuXG5pbXBvcnQgQmFzZURCIGZyb20gJy4vQmFzZURCJztcbmltcG9ydCBKU09ORmlsZSBmcm9tICcuLi9maWxlL0pTT05GaWxlJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgRGF0YUZyYW1lIGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRnJhbWUnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5cbmNsYXNzIExNREIgZXh0ZW5kcyBCYXNlREIge1xuICAgIGNvbnN0cnVjdG9yKGRhdGFwYXRoLCByZWFkT25seSA9IHRydWUsIG1ldGEgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZWFkT25seSA9IHJlYWRPbmx5O1xuICAgICAgICB0aGlzLl9kYXRhcGF0aCA9IGRhdGFwYXRoO1xuICAgICAgICB0aGlzLl9tZXRhID0gbWV0YTtcbiAgICAgICAgdGhpcy5fZW52ID0gbmV3IGxtZGIuRW52KCk7XG5cbiAgICAgICAgaWYgKCF0aGlzLl9tZXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9tZXRhID0gSlNPTi5wYXJzZShmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKGRhdGFwYXRoLCAnbWV0YS5qc29uJykpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydCh0aGlzLl9tZXRhIGluc3RhbmNlb2YgT2JqZWN0KTtcblxuICAgICAgICB0aGlzLl9lbnYub3Blbih7XG4gICAgICAgICAgICBwYXRoOiBkYXRhcGF0aCxcbiAgICAgICAgICAgIG1hcFNpemU6IHRoaXMuX21ldGEubWFwU2l6ZSxcbiAgICAgICAgICAgIG1heERiczogdGhpcy5fbWV0YS5tYXhEYnNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fb3BlbkRCID0ge307XG4gICAgICAgIHRoaXMuX29wZW5UeG4gPSB7fTtcbiAgICAgICAgdGhpcy5fY3Vyc29ycyA9IHt9O1xuXG4gICAgICAgIGlmICghcmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZU1ldGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlRW52KCkge1xuICAgICAgICBpZiAodGhpcy5fcmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fZW52LmNsb3NlKCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVNZXRhKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbnYuY2xvc2UoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBUcmFuc2FjdGlvbnNcblxuICAgIGJlZ2luKGRiLCByZWFkT25seSA9IHRydWUpIHtcbiAgICAgICAgdGhpcy5fb3BlbihkYik7XG4gICAgICAgIGNvbnN0IHV1aWQgPSB1dWlkNCgpO1xuICAgICAgICB0aGlzLl9vcGVuVHhuW3V1aWRdID0gdGhpcy5fZW52LmJlZ2luVHhuKHsgcmVhZE9ubHk6IHJlYWRPbmx5IH0pO1xuICAgICAgICByZXR1cm4gdXVpZDtcbiAgICB9XG5cbiAgICBjb21taXQodXVpZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fb3BlblR4blt1dWlkXSwgYE5vIFRyYW5zYWN0aW9uIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0uY29tbWl0KCk7XG4gICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0gPSBudWxsO1xuICAgIH1cblxuICAgIGFib3J0KHV1aWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX29wZW5UeG5bdXVpZF0sIGBObyBUcmFuc2FjdGlvbiBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICB0aGlzLl9vcGVuVHhuW3V1aWRdLmFib3J0KCk7XG4gICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0gPSBudWxsO1xuICAgIH1cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBDdXJzb3JzXG5cbiAgICBjdXJzb3IoZGIsIHV1aWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX29wZW5UeG5bdXVpZF0sIGBObyBUcmFuc2FjdGlvbiBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICBhc3NlcnQodGhpcy5fb3BlbkRCW2RiXSwgYE5vIG9wZW4gREIgZm9yICR7ZGJ9YCk7XG5cbiAgICAgICAgbGV0IGN1cnNvclVVSUQgPSB1dWlkNCgpO1xuICAgICAgICB0aGlzLl9jdXJzb3JzW2N1cnNvclVVSURdID0gbmV3IGxtZGIuQ3Vyc29yKHRoaXMuX29wZW5UeG5bdXVpZF0sIHRoaXMuX29wZW5EQltkYl0pO1xuICAgICAgICByZXR1cm4gY3Vyc29yVVVJRDtcbiAgICB9XG5cbiAgICBjbG9zZUN1cnNvcih1dWlkKSB7XG4gICAgICAgIGlmICghdGhpcy5fY3Vyc29yc1t1dWlkXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY3Vyc29yc1t1dWlkXS5jbG9zZSgpO1xuICAgICAgICB0aGlzLl9jdXJzb3JzW3V1aWRdID0gbnVsbDtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50RXZlbnRzKGRiLCBjdXJzb3JVVUlEKSB7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLmdldEN1cnJlbnRLZXlWYWx1ZShkYiwgY3Vyc29yVVVJRCksXG4gICAgICAgICAgICBldmVudHMgPSBbXSxcbiAgICAgICAgICAgIF9zZWxmID0gdGhpcztcbiAgICAgICAgcmVzLnZhbC5tYXAoKHZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgbGV0IGV2dCA9IG5ldyBEYXRhRXZlbnQoXG4gICAgICAgICAgICAgICAgbmV3IFRpbWUocmVzLmtleSwgX3NlbGYuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJdLmtleVVuaXQpLFxuICAgICAgICAgICAgICAgIG5ldyBWb2x0YWdlKHZhbCwgX3NlbGYuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJdLnVuaXRzW2ldKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGV2dC5wYXJlbnRVVUlEID0gX3NlbGYuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJdLnV1aWRzW2ldO1xuICAgICAgICAgICAgZXZlbnRzLnB1c2goZXZ0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBldmVudHM7XG4gICAgfVxuXG4gICAgZ2V0Q3VycmVudEZyYW1lKGRiLCBjdXJzb3JVVUlEKSB7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLmdldEN1cnJlbnRLZXlWYWx1ZShkYiwgY3Vyc29yVVVJRCksXG4gICAgICAgICAgICBmcmFtZSA9IG5ldyBEYXRhRnJhbWUoXG4gICAgICAgICAgICAgICAgbmV3IFRpbWUocmVzLmtleSwgdGhpcy5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0ua2V5VW5pdCksXG4gICAgICAgICAgICAgICAgcmVzLnZhbFxuICAgICAgICAgICAgKTtcbiAgICAgICAgZnJhbWUucGFyZW50VVVJRCA9IHRoaXMuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJdLnV1aWQ7XG4gICAgICAgIHJldHVybiBmcmFtZTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50VmFsdWUoZGIsIGN1cnNvclVVSUQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q3VycmVudEtleVZhbHVlKGRiLCBjdXJzb3JVVUlELCB0cnVlKTtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50S2V5VmFsdWUoZGIsIGN1cnNvclVVSUQsIGRpc2NhcmRLZXkgPSBmYWxzZSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fY3Vyc29yc1tjdXJzb3JVVUlEXSwgJ05vIEN1cnNvciBpbnN0YW5jZScpO1xuXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHJlcyA9IG51bGw7XG5cbiAgICAgICAgaWYgKF9zZWxmLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2RiXS50eXBlLmNsYXNzID09PSAnRGF0YUZyYW1lJykge1xuICAgICAgICAgICAgbGV0IGFycmF5Q2xhc3MgPSBfc2VsZi5fZ2V0QXJyYXlDbGFzcyhfc2VsZi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0udHlwZS50eXBlKTtcbiAgICAgICAgICAgIF9zZWxmLl9jdXJzb3JzW2N1cnNvclVVSURdLmdldEN1cnJlbnRCaW5hcnkoKF9rZXksIF92YWwpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZGlzY2FyZEtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBuZXcgYXJyYXlDbGFzcyhfdmFsLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBfa2V5LnRvU3RyaW5nKCd1Y3MyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWw6IG5ldyBhcnJheUNsYXNzKF92YWwuYnVmZmVyKVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgX3NlbGYuX2N1cnNvcnNbY3Vyc29yVVVJRF0uZ2V0Q3VycmVudE51bWJlcigoX2tleSwgX3ZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IF92YWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAga2V5OiBfa2V5LnRvU3RyaW5nKCd1Y3MyJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWw6IF92YWxcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIEN1cnNvciBtb3ZlbWVudHNcblxuICAgIGdvdG9GaXJzdCh1dWlkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9jdXJzb3JzW3V1aWRdLCBgTm8gQ3Vyc29yIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JzW3V1aWRdLmdvVG9GaXJzdCgpO1xuICAgIH1cblxuICAgIGdvdG9QcmV2KHV1aWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2N1cnNvcnNbdXVpZF0sIGBObyBDdXJzb3IgaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvcnNbdXVpZF0uZ29Ub1ByZXYoKTtcbiAgICB9XG5cbiAgICBnb3RvTmV4dCh1dWlkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9jdXJzb3JzW3V1aWRdLCBgTm8gQ3Vyc29yIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JzW3V1aWRdLmdvVG9OZXh0KCk7XG4gICAgfVxuXG4gICAgZ290b0xhc3QodXVpZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fY3Vyc29yc1t1dWlkXSwgYE5vIEN1cnNvciBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yc1t1dWlkXS5nb1RvTGFzdCgpO1xuICAgIH1cblxuICAgIGdvdG9LZXkoZGIsIHV1aWQsIGtleSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fY3Vyc29yc1t1dWlkXSwgYE5vIEN1cnNvciBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yc1t1dWlkXS5nb1RvS2V5KHRoaXMuX2NoZWNrQW5kQ29udmVydEtleShkYiwga2V5KSk7XG4gICAgfVxuXG4gICAgZ290b1JhbmdlKGRiLCB1dWlkLCBrZXkpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2N1cnNvcnNbdXVpZF0sIGBObyBDdXJzb3IgaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvcnNbdXVpZF0uZ29Ub1JhbmdlKHRoaXMuX2NoZWNrQW5kQ29udmVydEtleShkYiwga2V5KSk7XG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gQ1JVKEQ/KVxuXG4gICAgZ2V0KGRiLCB1dWlkLCB0aW1lLCBwYXJlbnRVVUlEID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9vcGVuVHhuW3V1aWRdLCBgTm8gVHJhbnNhY3Rpb24gaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX29wZW5EQltkYl0sIGBObyBvcGVuIERCIGluc3RhbmNlIGZvciAke2RifWApO1xuXG4gICAgICAgIGxldCBrZXkgPSB0aGlzLl9nZXRLZXkoZGIsIHRpbWUudG9PYmplY3QoKSwgcGFyZW50VVVJRCksXG4gICAgICAgICAgICB2YWwgPSB0aGlzLl9vcGVuVHhuW3V1aWRdLmdldE51bWJlcih0aGlzLl9vcGVuREJbZGJdLCBrZXkpO1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcicgPyBuZXcgRGF0YUV2ZW50KHRpbWUsIG5ldyBWb2x0YWdlKHZhbCkpIDogbnVsbDtcbiAgICB9XG5cbiAgICBwdXQoZGIsIHV1aWQsIGV2ZW50KSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9vcGVuVHhuW3V1aWRdLCBgTm8gVHJhbnNhY3Rpb24gaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX29wZW5EQltkYl0sICdObyBvcGVuIERCIGluc3RhbmNlJyk7XG4gICAgICAgIGFzc2VydCghdGhpcy5fbWV0YS5yZWFkT25seSwgJ0RCIGlzIHJlYWQtb25seScpO1xuXG4gICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIERhdGFGcmFtZSkge1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuX2dldEtleShkYiwgZXZlbnQudGltZS5ub3JtYWxpemVkKCkpLFxuICAgICAgICAgICAgICAgIGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGV2ZW50LnZhbHVlLmJ1ZmZlcik7XG4gICAgICAgICAgICB0aGlzLl9vcGVuVHhuW3V1aWRdLnB1dEJpbmFyeSh0aGlzLl9vcGVuREJbZGJdLCBrZXksIGJ1ZmZlcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGUgPSBldmVudC50b09iamVjdCgpLFxuICAgICAgICAgICAga2V5ID0gdGhpcy5fZ2V0S2V5KGRiLCBlLnQsIGV2ZW50LnBhcmVudFVVSUQpO1xuICAgICAgICB0aGlzLl9vcGVuVHhuW3V1aWRdLnB1dE51bWJlcih0aGlzLl9vcGVuREJbZGJdLCBrZXksIGUudik7XG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gaW50ZXJuYWxzXG5cbiAgICBfY3JlYXRlREIoZGIsIG1ldGEpIHtcbiAgICAgICAgYXNzZXJ0KG1ldGEgaW5zdGFuY2VvZiBPYmplY3QsICdNZXRhIG9iamVjdCBpcyByZXF1aXJlZCcpO1xuXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0gPSBtZXRhO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlTWV0YSgpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgX3NlbGYuX29wZW4oZGIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX29wZW4oZGJuYW1lKSB7XG4gICAgICAgIGlmIChPYmplY3Qua2V5cyh0aGlzLl9vcGVuREIpID4gMCkge1xuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5fb3BlbkRCKS5tYXAoKG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSAhPT0gZGJuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nsb3NlKGRibmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl9vcGVuREJbZGJuYW1lXSkge1xuICAgICAgICAgICAgdGhpcy5fb3BlbkRCW2RibmFtZV0gPSB0aGlzLl9lbnYub3BlbkRiaSh7XG4gICAgICAgICAgICAgICAgbmFtZTogZGJuYW1lLFxuICAgICAgICAgICAgICAgIGNyZWF0ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBkdXBTb3J0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHJldmVyc2VLZXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGludGVnZXJLZXk6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGR1cEZpeGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpbnRlZ2VyRHVwOiBmYWxzZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5EQltkYm5hbWVdO1xuICAgIH1cblxuICAgIF9jbG9zZShkYm5hbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuX29wZW5EQltkYm5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuREJbZGJuYW1lXS5jbG9zZSgpO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29wZW5EQltkYm5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9vcGVuREJbZGJuYW1lXTtcbiAgICB9XG5cbiAgICBfdXBkYXRlTWV0YSgpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzLFxuICAgICAgICAgICAgZnBhdGggPSBwYXRoLmpvaW4odGhpcy5fZGF0YXBhdGgsICdtZXRhLmpzb24nKSxcbiAgICAgICAgICAgIG1ldGEgPSB0aGlzLl9tZXRhO1xuICAgICAgICByZXR1cm4gbmV3IEpTT05GaWxlKG1ldGEpLndyaXRlKGZwYXRoICsgJy5iYWsnKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgSlNPTkZpbGUobWV0YSkud3JpdGUoZnBhdGgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBfc2VsZi5lbWl0KCd1cGRhdGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfZ2V0S2V5KGRiLCB0aW1lLCBjaGFubmVsVVVJRCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBjaGFubmVsID0gdGhpcy5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl07XG4gICAgICAgIHRpbWUgPSB0aW1lLnRvRml4ZWQoY2hhbm5lbC5rZXlQcmVjaXNpb24pO1xuICAgICAgICByZXR1cm4gbmV3IEFycmF5KGNoYW5uZWwua2V5U2l6ZSArIGNoYW5uZWwua2V5UHJlY2lzaW9uIC0gdGltZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgLmZpbGwoMCkuam9pbignJykgKyB0aW1lICsgKGNoYW5uZWxVVUlEID8gJy0nICsgY2hhbm5lbFVVSUQgOiAnJyk7XG4gICAgfVxuXG4gICAgX2dldEFycmF5Q2xhc3ModHlwZVN0cmluZykge1xuICAgICAgICBzd2l0Y2ggKHR5cGVTdHJpbmcpIHtcbiAgICAgICAgY2FzZSAnRmxvYXQzMic6XG4gICAgICAgICAgICByZXR1cm4gRmxvYXQzMkFycmF5O1xuICAgICAgICBjYXNlICdGbG9hdDY0JzpcbiAgICAgICAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ0ludDMyJzpcbiAgICAgICAgICAgIHJldHVybiBJbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdVaW50MzInOlxuICAgICAgICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdJbnQxNic6XG4gICAgICAgICAgICByZXR1cm4gSW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnVWludDE2JzpcbiAgICAgICAgICAgIHJldHVybiBVaW50MzJBcnJheTtcbiAgICAgICAgY2FzZSAnSW50OCc6XG4gICAgICAgICAgICByZXR1cm4gSW50OEFycmF5O1xuICAgICAgICBjYXNlICdVaW50OCc6XG4gICAgICAgICAgICByZXR1cm4gVWludDhBcnJheTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jaGVja0FuZENvbnZlcnRLZXkoZGIsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRLZXkoZGIsIGtleSk7XG4gICAgICAgIH0gZWxzZSBpZiAoa2V5IGluc3RhbmNlb2YgVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEtleShkYiwga2V5Lm5vcm1hbGl6ZWQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gR2V0dGVycyAvIFNldHRlcnNcblxuICAgIGdldCBtZXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExNREI7Il19
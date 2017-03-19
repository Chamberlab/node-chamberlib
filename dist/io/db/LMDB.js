'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LMDB = function (_BaseDB) {
    _inherits(LMDB, _BaseDB);

    function LMDB(datapath) {
        var readOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        var meta = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, LMDB);

        var _this = _possibleConstructorReturn(this, (LMDB.__proto__ || Object.getPrototypeOf(LMDB)).call(this));

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

    _createClass(LMDB, [{
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

            if (Object.keys(this._openDB) > 0) {
                Object.keys(this._openDB).map(function (name) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2RiL0xNREIuanMiXSwibmFtZXMiOlsibG1kYiIsIkxNREIiLCJkYXRhcGF0aCIsInJlYWRPbmx5IiwibWV0YSIsInVuZGVmaW5lZCIsIl9yZWFkT25seSIsIl9kYXRhcGF0aCIsIl9tZXRhIiwiX2VudiIsIkVudiIsIkpTT04iLCJwYXJzZSIsInJlYWRGaWxlU3luYyIsImpvaW4iLCJPYmplY3QiLCJvcGVuIiwicGF0aCIsIm1hcFNpemUiLCJtYXhEYnMiLCJfb3BlbkRCIiwiX29wZW5UeG4iLCJfY3Vyc29ycyIsIl91cGRhdGVNZXRhIiwicmVzb2x2ZSIsImNsb3NlIiwidGhlbiIsImRiIiwiX29wZW4iLCJ1dWlkIiwiYmVnaW5UeG4iLCJjb21taXQiLCJhYm9ydCIsImN1cnNvclVVSUQiLCJDdXJzb3IiLCJyZXMiLCJnZXRDdXJyZW50S2V5VmFsdWUiLCJldmVudHMiLCJfc2VsZiIsInZhbCIsIm1hcCIsImkiLCJldnQiLCJrZXkiLCJEYXRhU2V0IiwiRGF0YUNoYW5uZWxzIiwia2V5VW5pdCIsInVuaXRzIiwicGFyZW50VVVJRCIsInV1aWRzIiwicHVzaCIsImZyYW1lIiwiZGlzY2FyZEtleSIsInR5cGUiLCJjbGFzcyIsImFycmF5Q2xhc3MiLCJfZ2V0QXJyYXlDbGFzcyIsImdldEN1cnJlbnRCaW5hcnkiLCJfa2V5IiwiX3ZhbCIsImJ1ZmZlciIsInRvU3RyaW5nIiwiZ2V0Q3VycmVudE51bWJlciIsImdvVG9GaXJzdCIsImdvVG9QcmV2IiwiZ29Ub05leHQiLCJnb1RvTGFzdCIsImdvVG9LZXkiLCJfY2hlY2tBbmRDb252ZXJ0S2V5IiwiZ29Ub1JhbmdlIiwidGltZSIsIl9nZXRLZXkiLCJ0b09iamVjdCIsImdldE51bWJlciIsImV2ZW50Iiwibm9ybWFsaXplZCIsIkJ1ZmZlciIsImZyb20iLCJ2YWx1ZSIsInB1dEJpbmFyeSIsImUiLCJ0IiwicHV0TnVtYmVyIiwidiIsImRibmFtZSIsImtleXMiLCJuYW1lIiwiX2Nsb3NlIiwib3BlbkRiaSIsImNyZWF0ZSIsImR1cFNvcnQiLCJyZXZlcnNlS2V5IiwiaW50ZWdlcktleSIsImR1cEZpeGVkIiwiaW50ZWdlckR1cCIsImZwYXRoIiwid3JpdGUiLCJlbWl0IiwiY2hhbm5lbFVVSUQiLCJjaGFubmVsIiwidG9GaXhlZCIsImtleVByZWNpc2lvbiIsIkFycmF5Iiwia2V5U2l6ZSIsImxlbmd0aCIsImZpbGwiLCJ0eXBlU3RyaW5nIiwiRmxvYXQzMkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQzMkFycmF5IiwiSW50OEFycmF5IiwiVWludDhBcnJheSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7SUFBWUEsSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7OztJQUVNQyxJOzs7QUFDRixrQkFBWUMsUUFBWixFQUF5RDtBQUFBLFlBQW5DQyxRQUFtQyx1RUFBeEIsSUFBd0I7QUFBQSxZQUFsQkMsSUFBa0IsdUVBQVhDLFNBQVc7O0FBQUE7O0FBQUE7O0FBR3JELGNBQUtDLFNBQUwsR0FBaUJILFFBQWpCO0FBQ0EsY0FBS0ksU0FBTCxHQUFpQkwsUUFBakI7QUFDQSxjQUFLTSxLQUFMLEdBQWFKLElBQWI7QUFDQSxjQUFLSyxJQUFMLEdBQVksSUFBSVQsS0FBS1UsR0FBVCxFQUFaOztBQUVBLFlBQUksQ0FBQyxNQUFLRixLQUFWLEVBQWlCO0FBQ2Isa0JBQUtBLEtBQUwsR0FBYUcsS0FBS0MsS0FBTCxDQUFXLGFBQUdDLFlBQUgsQ0FBZ0IsZUFBS0MsSUFBTCxDQUFVWixRQUFWLEVBQW9CLFdBQXBCLENBQWhCLENBQVgsQ0FBYjtBQUNIOztBQUVELDhCQUFPLE1BQUtNLEtBQUwsWUFBc0JPLE1BQTdCOztBQUVBLGNBQUtOLElBQUwsQ0FBVU8sSUFBVixDQUFlO0FBQ1hDLGtCQUFNZixRQURLO0FBRVhnQixxQkFBUyxNQUFLVixLQUFMLENBQVdVLE9BRlQ7QUFHWEMsb0JBQVEsTUFBS1gsS0FBTCxDQUFXVztBQUhSLFNBQWY7O0FBTUEsY0FBS0MsT0FBTCxHQUFlLEVBQWY7QUFDQSxjQUFLQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0EsY0FBS0MsUUFBTCxHQUFnQixFQUFoQjs7QUFFQSxZQUFJLENBQUNuQixRQUFMLEVBQWU7QUFDWCxrQkFBS29CLFdBQUw7QUFDSDtBQTFCb0Q7QUEyQnhEOzs7O21DQUVVO0FBQUE7O0FBQ1AsZ0JBQUksS0FBS2pCLFNBQVQsRUFBb0I7QUFDaEIsdUJBQU8sbUJBQVFrQixPQUFSLENBQWdCLEtBQUtmLElBQUwsQ0FBVWdCLEtBQVYsRUFBaEIsQ0FBUDtBQUNIO0FBQ0QsbUJBQU8sS0FBS0YsV0FBTCxHQUNGRyxJQURFLENBQ0csWUFBTTtBQUNSLHVCQUFLakIsSUFBTCxDQUFVZ0IsS0FBVjtBQUNILGFBSEUsQ0FBUDtBQUlIOztBQUVEO0FBQ0E7QUFDQTs7Ozs4QkFFTUUsRSxFQUFxQjtBQUFBLGdCQUFqQnhCLFFBQWlCLHVFQUFOLElBQU07O0FBQ3ZCLGlCQUFLeUIsS0FBTCxDQUFXRCxFQUFYO0FBQ0EsZ0JBQU1FLE9BQU8scUJBQWI7QUFDQSxpQkFBS1IsUUFBTCxDQUFjUSxJQUFkLElBQXNCLEtBQUtwQixJQUFMLENBQVVxQixRQUFWLENBQW1CLEVBQUUzQixVQUFVQSxRQUFaLEVBQW5CLENBQXRCO0FBQ0EsbUJBQU8wQixJQUFQO0FBQ0g7OzsrQkFFTUEsSSxFQUFNO0FBQ1Qsa0NBQU8sS0FBS1IsUUFBTCxDQUFjUSxJQUFkLENBQVAsbUNBQTJEQSxJQUEzRDtBQUNBLGlCQUFLUixRQUFMLENBQWNRLElBQWQsRUFBb0JFLE1BQXBCO0FBQ0EsaUJBQUtWLFFBQUwsQ0FBY1EsSUFBZCxJQUFzQixJQUF0QjtBQUNIOzs7OEJBRUtBLEksRUFBTTtBQUNSLGtDQUFPLEtBQUtSLFFBQUwsQ0FBY1EsSUFBZCxDQUFQLG1DQUEyREEsSUFBM0Q7QUFDQSxpQkFBS1IsUUFBTCxDQUFjUSxJQUFkLEVBQW9CRyxLQUFwQjtBQUNBLGlCQUFLWCxRQUFMLENBQWNRLElBQWQsSUFBc0IsSUFBdEI7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7Ozs7K0JBRU9GLEUsRUFBSUUsSSxFQUFNO0FBQ2Isa0NBQU8sS0FBS1IsUUFBTCxDQUFjUSxJQUFkLENBQVAsbUNBQTJEQSxJQUEzRDtBQUNBLGtDQUFPLEtBQUtULE9BQUwsQ0FBYU8sRUFBYixDQUFQLHNCQUEyQ0EsRUFBM0M7O0FBRUEsZ0JBQUlNLGFBQWEscUJBQWpCO0FBQ0EsaUJBQUtYLFFBQUwsQ0FBY1csVUFBZCxJQUE0QixJQUFJakMsS0FBS2tDLE1BQVQsQ0FBZ0IsS0FBS2IsUUFBTCxDQUFjUSxJQUFkLENBQWhCLEVBQXFDLEtBQUtULE9BQUwsQ0FBYU8sRUFBYixDQUFyQyxDQUE1QjtBQUNBLG1CQUFPTSxVQUFQO0FBQ0g7OztvQ0FFV0osSSxFQUFNO0FBQ2QsZ0JBQUksQ0FBQyxLQUFLUCxRQUFMLENBQWNPLElBQWQsQ0FBTCxFQUEwQjtBQUN0QjtBQUNIOztBQUVELGlCQUFLUCxRQUFMLENBQWNPLElBQWQsRUFBb0JKLEtBQXBCO0FBQ0EsaUJBQUtILFFBQUwsQ0FBY08sSUFBZCxJQUFzQixJQUF0QjtBQUNIOzs7eUNBRWdCRixFLEVBQUlNLFUsRUFBWTtBQUM3QixnQkFBSUUsTUFBTSxLQUFLQyxrQkFBTCxDQUF3QlQsRUFBeEIsRUFBNEJNLFVBQTVCLENBQVY7QUFBQSxnQkFDSUksU0FBUyxFQURiO0FBQUEsZ0JBRUlDLFFBQVEsSUFGWjtBQUdBSCxnQkFBSUksR0FBSixDQUFRQyxHQUFSLENBQVksVUFBQ0QsR0FBRCxFQUFNRSxDQUFOLEVBQVk7QUFDcEIsb0JBQUlDLE1BQU0sd0JBQ04sbUJBQVNQLElBQUlRLEdBQWIsRUFBa0JMLE1BQU05QixLQUFOLENBQVlvQyxPQUFaLENBQW9CQyxZQUFwQixDQUFpQ2xCLEVBQWpDLEVBQXFDbUIsT0FBdkQsQ0FETSxFQUVOLHNCQUFZUCxHQUFaLEVBQWlCRCxNQUFNOUIsS0FBTixDQUFZb0MsT0FBWixDQUFvQkMsWUFBcEIsQ0FBaUNsQixFQUFqQyxFQUFxQ29CLEtBQXJDLENBQTJDTixDQUEzQyxDQUFqQixDQUZNLENBQVY7QUFJQUMsb0JBQUlNLFVBQUosR0FBaUJWLE1BQU05QixLQUFOLENBQVlvQyxPQUFaLENBQW9CQyxZQUFwQixDQUFpQ2xCLEVBQWpDLEVBQXFDc0IsS0FBckMsQ0FBMkNSLENBQTNDLENBQWpCO0FBQ0FKLHVCQUFPYSxJQUFQLENBQVlSLEdBQVo7QUFDSCxhQVBEO0FBUUEsbUJBQU9MLE1BQVA7QUFDSDs7O3dDQUVlVixFLEVBQUlNLFUsRUFBWTtBQUM1QixnQkFBSUUsTUFBTSxLQUFLQyxrQkFBTCxDQUF3QlQsRUFBeEIsRUFBNEJNLFVBQTVCLENBQVY7QUFBQSxnQkFDSWtCLFFBQVEsd0JBQ0osbUJBQVNoQixJQUFJUSxHQUFiLEVBQWtCLEtBQUtuQyxLQUFMLENBQVdvQyxPQUFYLENBQW1CQyxZQUFuQixDQUFnQ2xCLEVBQWhDLEVBQW9DbUIsT0FBdEQsQ0FESSxFQUVKWCxJQUFJSSxHQUZBLENBRFo7QUFLQVksa0JBQU1ILFVBQU4sR0FBbUIsS0FBS3hDLEtBQUwsQ0FBV29DLE9BQVgsQ0FBbUJDLFlBQW5CLENBQWdDbEIsRUFBaEMsRUFBb0NFLElBQXZEO0FBQ0EsbUJBQU9zQixLQUFQO0FBQ0g7Ozt3Q0FFZXhCLEUsRUFBSU0sVSxFQUFZO0FBQzVCLG1CQUFPLEtBQUtHLGtCQUFMLENBQXdCVCxFQUF4QixFQUE0Qk0sVUFBNUIsRUFBd0MsSUFBeEMsQ0FBUDtBQUNIOzs7MkNBRWtCTixFLEVBQUlNLFUsRUFBZ0M7QUFBQSxnQkFBcEJtQixVQUFvQix1RUFBUCxLQUFPOztBQUNuRCxrQ0FBTyxLQUFLOUIsUUFBTCxDQUFjVyxVQUFkLENBQVAsRUFBa0Msb0JBQWxDOztBQUVBLGdCQUFNSyxRQUFRLElBQWQ7QUFDQSxnQkFBSUgsTUFBTSxJQUFWOztBQUVBLGdCQUFJRyxNQUFNOUIsS0FBTixDQUFZb0MsT0FBWixDQUFvQkMsWUFBcEIsQ0FBaUNsQixFQUFqQyxFQUFxQzBCLElBQXJDLENBQTBDQyxLQUExQyxLQUFvRCxXQUF4RCxFQUFxRTtBQUNqRSxvQkFBSUMsYUFBYWpCLE1BQU1rQixjQUFOLENBQXFCbEIsTUFBTTlCLEtBQU4sQ0FBWW9DLE9BQVosQ0FBb0JDLFlBQXBCLENBQWlDbEIsRUFBakMsRUFBcUMwQixJQUFyQyxDQUEwQ0EsSUFBL0QsQ0FBakI7QUFDQWYsc0JBQU1oQixRQUFOLENBQWVXLFVBQWYsRUFBMkJ3QixnQkFBM0IsQ0FBNEMsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWdCO0FBQ3hELHdCQUFJUCxVQUFKLEVBQWdCO0FBQ1pqQiw4QkFBTSxJQUFJb0IsVUFBSixDQUFlSSxLQUFLQyxNQUFwQixDQUFOO0FBQ0gscUJBRkQsTUFFTztBQUNIekIsOEJBQU07QUFDRlEsaUNBQUtlLEtBQUtHLFFBQUwsQ0FBYyxNQUFkLENBREg7QUFFRnRCLGlDQUFLLElBQUlnQixVQUFKLENBQWVJLEtBQUtDLE1BQXBCO0FBRkgseUJBQU47QUFJSDtBQUNKLGlCQVREO0FBVUgsYUFaRCxNQVlPO0FBQ0h0QixzQkFBTWhCLFFBQU4sQ0FBZVcsVUFBZixFQUEyQjZCLGdCQUEzQixDQUE0QyxVQUFDSixJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDeEQsd0JBQUlQLFVBQUosRUFBZ0I7QUFDWmpCLDhCQUFNd0IsSUFBTjtBQUNILHFCQUZELE1BRU87QUFDSHhCLDhCQUFNO0FBQ0ZRLGlDQUFLZSxLQUFLRyxRQUFMLENBQWMsTUFBZCxDQURIO0FBRUZ0QixpQ0FBS29CO0FBRkgseUJBQU47QUFJSDtBQUNKLGlCQVREO0FBVUg7O0FBRUQsbUJBQU94QixHQUFQO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBOzs7O2tDQUVVTixJLEVBQU07QUFDWixrQ0FBTyxLQUFLUCxRQUFMLENBQWNPLElBQWQsQ0FBUCw4QkFBc0RBLElBQXREO0FBQ0EsbUJBQU8sS0FBS1AsUUFBTCxDQUFjTyxJQUFkLEVBQW9Ca0MsU0FBcEIsRUFBUDtBQUNIOzs7aUNBRVFsQyxJLEVBQU07QUFDWCxrQ0FBTyxLQUFLUCxRQUFMLENBQWNPLElBQWQsQ0FBUCw4QkFBc0RBLElBQXREO0FBQ0EsbUJBQU8sS0FBS1AsUUFBTCxDQUFjTyxJQUFkLEVBQW9CbUMsUUFBcEIsRUFBUDtBQUNIOzs7aUNBRVFuQyxJLEVBQU07QUFDWCxrQ0FBTyxLQUFLUCxRQUFMLENBQWNPLElBQWQsQ0FBUCw4QkFBc0RBLElBQXREO0FBQ0EsbUJBQU8sS0FBS1AsUUFBTCxDQUFjTyxJQUFkLEVBQW9Cb0MsUUFBcEIsRUFBUDtBQUNIOzs7aUNBRVFwQyxJLEVBQU07QUFDWCxrQ0FBTyxLQUFLUCxRQUFMLENBQWNPLElBQWQsQ0FBUCw4QkFBc0RBLElBQXREO0FBQ0EsbUJBQU8sS0FBS1AsUUFBTCxDQUFjTyxJQUFkLEVBQW9CcUMsUUFBcEIsRUFBUDtBQUNIOzs7Z0NBRU92QyxFLEVBQUlFLEksRUFBTWMsRyxFQUFLO0FBQ25CLGtDQUFPLEtBQUtyQixRQUFMLENBQWNPLElBQWQsQ0FBUCw4QkFBc0RBLElBQXREO0FBQ0EsbUJBQU8sS0FBS1AsUUFBTCxDQUFjTyxJQUFkLEVBQW9Cc0MsT0FBcEIsQ0FBNEIsS0FBS0MsbUJBQUwsQ0FBeUJ6QyxFQUF6QixFQUE2QmdCLEdBQTdCLENBQTVCLENBQVA7QUFDSDs7O2tDQUVTaEIsRSxFQUFJRSxJLEVBQU1jLEcsRUFBSztBQUNyQixrQ0FBTyxLQUFLckIsUUFBTCxDQUFjTyxJQUFkLENBQVAsOEJBQXNEQSxJQUF0RDtBQUNBLG1CQUFPLEtBQUtQLFFBQUwsQ0FBY08sSUFBZCxFQUFvQndDLFNBQXBCLENBQThCLEtBQUtELG1CQUFMLENBQXlCekMsRUFBekIsRUFBNkJnQixHQUE3QixDQUE5QixDQUFQO0FBQ0g7O0FBR0Q7QUFDQTtBQUNBOzs7OzRCQUVJaEIsRSxFQUFJRSxJLEVBQU15QyxJLEVBQThCO0FBQUEsZ0JBQXhCdEIsVUFBd0IsdUVBQVgzQyxTQUFXOztBQUN4QyxrQ0FBTyxLQUFLZ0IsUUFBTCxDQUFjUSxJQUFkLENBQVAsbUNBQTJEQSxJQUEzRDtBQUNBLGtDQUFPLEtBQUtULE9BQUwsQ0FBYU8sRUFBYixDQUFQLCtCQUFvREEsRUFBcEQ7O0FBRUEsZ0JBQUlnQixNQUFNLEtBQUs0QixPQUFMLENBQWE1QyxFQUFiLEVBQWlCMkMsS0FBS0UsUUFBTCxFQUFqQixFQUFrQ3hCLFVBQWxDLENBQVY7QUFBQSxnQkFDSVQsTUFBTSxLQUFLbEIsUUFBTCxDQUFjUSxJQUFkLEVBQW9CNEMsU0FBcEIsQ0FBOEIsS0FBS3JELE9BQUwsQ0FBYU8sRUFBYixDQUE5QixFQUFnRGdCLEdBQWhELENBRFY7QUFFQSxtQkFBTyxPQUFPSixHQUFQLEtBQWUsUUFBZixHQUEwQix3QkFBYytCLElBQWQsRUFBb0Isc0JBQVkvQixHQUFaLENBQXBCLENBQTFCLEdBQWtFLElBQXpFO0FBQ0g7Ozs0QkFFR1osRSxFQUFJRSxJLEVBQU02QyxLLEVBQU87QUFDakIsa0NBQU8sS0FBS3JELFFBQUwsQ0FBY1EsSUFBZCxDQUFQLG1DQUEyREEsSUFBM0Q7QUFDQSxrQ0FBTyxLQUFLVCxPQUFMLENBQWFPLEVBQWIsQ0FBUCxFQUF5QixxQkFBekI7QUFDQSxrQ0FBTyxDQUFDLEtBQUtuQixLQUFMLENBQVdMLFFBQW5CLEVBQTZCLGlCQUE3Qjs7QUFFQSxnQkFBSXVFLG9DQUFKLEVBQWdDO0FBQzVCLG9CQUFJL0IsUUFBTSxLQUFLNEIsT0FBTCxDQUFhNUMsRUFBYixFQUFpQitDLE1BQU1KLElBQU4sQ0FBV0ssVUFBWCxFQUFqQixDQUFWO0FBQUEsb0JBQ0lmLFNBQVNnQixPQUFPQyxJQUFQLENBQVlILE1BQU1JLEtBQU4sQ0FBWWxCLE1BQXhCLENBRGI7QUFFQSxxQkFBS3ZDLFFBQUwsQ0FBY1EsSUFBZCxFQUFvQmtELFNBQXBCLENBQThCLEtBQUszRCxPQUFMLENBQWFPLEVBQWIsQ0FBOUIsRUFBZ0RnQixLQUFoRCxFQUFxRGlCLE1BQXJEO0FBQ0E7QUFDSDtBQUNELGdCQUFJb0IsSUFBSU4sTUFBTUYsUUFBTixFQUFSO0FBQUEsZ0JBQ0k3QixNQUFNLEtBQUs0QixPQUFMLENBQWE1QyxFQUFiLEVBQWlCcUQsRUFBRUMsQ0FBbkIsRUFBc0JQLE1BQU0xQixVQUE1QixDQURWO0FBRUEsaUJBQUszQixRQUFMLENBQWNRLElBQWQsRUFBb0JxRCxTQUFwQixDQUE4QixLQUFLOUQsT0FBTCxDQUFhTyxFQUFiLENBQTlCLEVBQWdEZ0IsR0FBaEQsRUFBcURxQyxFQUFFRyxDQUF2RDtBQUNIOztBQUdEO0FBQ0E7QUFDQTs7OztrQ0FFVXhELEUsRUFBSXZCLEksRUFBTTtBQUNoQixrQ0FBT0EsZ0JBQWdCVyxNQUF2QixFQUErQix5QkFBL0I7O0FBRUEsZ0JBQU11QixRQUFRLElBQWQ7QUFDQSxpQkFBSzlCLEtBQUwsQ0FBV29DLE9BQVgsQ0FBbUJDLFlBQW5CLENBQWdDbEIsRUFBaEMsSUFBc0N2QixJQUF0QztBQUNBLG1CQUFPLEtBQUttQixXQUFMLEdBQ0ZHLElBREUsQ0FDRyxZQUFNO0FBQ1JZLHNCQUFNVixLQUFOLENBQVlELEVBQVo7QUFDSCxhQUhFLENBQVA7QUFJSDs7OzhCQUVLeUQsTSxFQUFRO0FBQUE7O0FBQ1YsZ0JBQUlyRSxPQUFPc0UsSUFBUCxDQUFZLEtBQUtqRSxPQUFqQixJQUE0QixDQUFoQyxFQUFtQztBQUMvQkwsdUJBQU9zRSxJQUFQLENBQVksS0FBS2pFLE9BQWpCLEVBQTBCb0IsR0FBMUIsQ0FBOEIsVUFBQzhDLElBQUQsRUFBVTtBQUNwQyx3QkFBSUEsU0FBU0YsTUFBYixFQUFxQjtBQUNqQiwrQkFBS0csTUFBTCxDQUFZSCxNQUFaO0FBQ0g7QUFDSixpQkFKRDtBQUtIO0FBQ0QsZ0JBQUksQ0FBQyxLQUFLaEUsT0FBTCxDQUFhZ0UsTUFBYixDQUFMLEVBQTJCO0FBQ3ZCLHFCQUFLaEUsT0FBTCxDQUFhZ0UsTUFBYixJQUF1QixLQUFLM0UsSUFBTCxDQUFVK0UsT0FBVixDQUFrQjtBQUNyQ0YsMEJBQU1GLE1BRCtCO0FBRXJDSyw0QkFBUSxJQUY2QjtBQUdyQ0MsNkJBQVMsSUFINEI7QUFJckNDLGdDQUFZLEtBSnlCO0FBS3JDQyxnQ0FBWSxLQUx5QjtBQU1yQ0MsOEJBQVUsS0FOMkI7QUFPckNDLGdDQUFZO0FBUHlCLGlCQUFsQixDQUF2QjtBQVNIO0FBQ0QsbUJBQU8sS0FBSzFFLE9BQUwsQ0FBYWdFLE1BQWIsQ0FBUDtBQUNIOzs7K0JBRU1BLE0sRUFBUTtBQUNYLGdCQUFJLEtBQUtoRSxPQUFMLENBQWFnRSxNQUFiLENBQUosRUFBMEI7QUFDdEIscUJBQUtoRSxPQUFMLENBQWFnRSxNQUFiLEVBQXFCM0QsS0FBckI7QUFDQSx1QkFBTyxLQUFLTCxPQUFMLENBQWFnRSxNQUFiLENBQVA7QUFDSDtBQUNELG1CQUFPLEtBQUtoRSxPQUFMLENBQWFnRSxNQUFiLENBQVA7QUFDSDs7O3NDQUVhO0FBQ1YsZ0JBQU05QyxRQUFRLElBQWQ7QUFBQSxnQkFDSXlELFFBQVEsZUFBS2pGLElBQUwsQ0FBVSxLQUFLUCxTQUFmLEVBQTBCLFdBQTFCLENBRFo7QUFBQSxnQkFFSUgsT0FBTyxLQUFLSSxLQUZoQjtBQUdBLG1CQUFPLHVCQUFhSixJQUFiLEVBQW1CNEYsS0FBbkIsQ0FBeUJELFFBQVEsTUFBakMsRUFDRnJFLElBREUsQ0FDRyxZQUFNO0FBQ1IsdUJBQU8sdUJBQWF0QixJQUFiLEVBQW1CNEYsS0FBbkIsQ0FBeUJELEtBQXpCLENBQVA7QUFDSCxhQUhFLEVBSUZyRSxJQUpFLENBSUcsWUFBTTtBQUNSWSxzQkFBTTJELElBQU4sQ0FBVyxTQUFYO0FBQ0gsYUFORSxDQUFQO0FBT0g7OztnQ0FFT3RFLEUsRUFBSTJDLEksRUFBK0I7QUFBQSxnQkFBekI0QixXQUF5Qix1RUFBWDdGLFNBQVc7O0FBQ3ZDLGdCQUFNOEYsVUFBVSxLQUFLM0YsS0FBTCxDQUFXb0MsT0FBWCxDQUFtQkMsWUFBbkIsQ0FBZ0NsQixFQUFoQyxDQUFoQjtBQUNBMkMsbUJBQU9BLEtBQUs4QixPQUFMLENBQWFELFFBQVFFLFlBQXJCLENBQVA7QUFDQSxtQkFBTyxJQUFJQyxLQUFKLENBQVVILFFBQVFJLE9BQVIsR0FBa0JKLFFBQVFFLFlBQTFCLEdBQXlDL0IsS0FBS2tDLE1BQXhELEVBQ0VDLElBREYsQ0FDTyxDQURQLEVBQ1UzRixJQURWLENBQ2UsRUFEZixJQUNxQndELElBRHJCLElBQzZCNEIsY0FBYyxNQUFNQSxXQUFwQixHQUFrQyxFQUQvRCxDQUFQO0FBRUg7Ozt1Q0FFY1EsVSxFQUFZO0FBQ3ZCLG9CQUFRQSxVQUFSO0FBQ0EscUJBQUssU0FBTDtBQUNJLDJCQUFPQyxZQUFQO0FBQ0oscUJBQUssU0FBTDtBQUNJLDJCQUFPQSxZQUFQO0FBQ0oscUJBQUssT0FBTDtBQUNJLDJCQUFPQyxVQUFQO0FBQ0oscUJBQUssUUFBTDtBQUNJLDJCQUFPQyxXQUFQO0FBQ0oscUJBQUssT0FBTDtBQUNJLDJCQUFPRCxVQUFQO0FBQ0oscUJBQUssUUFBTDtBQUNJLDJCQUFPQyxXQUFQO0FBQ0oscUJBQUssTUFBTDtBQUNJLDJCQUFPQyxTQUFQO0FBQ0oscUJBQUssT0FBTDtBQUNJLDJCQUFPQyxVQUFQO0FBaEJKO0FBa0JIOzs7NENBRW1CcEYsRSxFQUFJZ0IsRyxFQUFLO0FBQ3pCLGdCQUFJLE9BQU9BLEdBQVAsS0FBZSxRQUFuQixFQUE2QjtBQUN6Qix1QkFBTyxLQUFLNEIsT0FBTCxDQUFhNUMsRUFBYixFQUFpQmdCLEdBQWpCLENBQVA7QUFDSCxhQUZELE1BRU8sSUFBSUEsNkJBQUosRUFBeUI7QUFDNUIsdUJBQU8sS0FBSzRCLE9BQUwsQ0FBYTVDLEVBQWIsRUFBaUJnQixJQUFJZ0MsVUFBSixFQUFqQixDQUFQO0FBQ0g7QUFDRCxtQkFBT2hDLEdBQVA7QUFDSDs7QUFFRDtBQUNBO0FBQ0E7Ozs7NEJBRVc7QUFDUCxtQkFBTyxLQUFLbkMsS0FBWjtBQUNIOzs7Ozs7a0JBR1VQLEkiLCJmaWxlIjoiaW8vZGIvTE1EQi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGxtZGIgZnJvbSAnbm9kZS1sbWRiJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB1dWlkNCBmcm9tICd1dWlkNCc7XG5cbmltcG9ydCBCYXNlREIgZnJvbSAnLi9CYXNlREInO1xuaW1wb3J0IEpTT05GaWxlIGZyb20gJy4uL2ZpbGUvSlNPTkZpbGUnO1xuaW1wb3J0IERhdGFFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUV2ZW50JztcbmltcG9ydCBEYXRhRnJhbWUgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFGcmFtZSc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcblxuY2xhc3MgTE1EQiBleHRlbmRzIEJhc2VEQiB7XG4gICAgY29uc3RydWN0b3IoZGF0YXBhdGgsIHJlYWRPbmx5ID0gdHJ1ZSwgbWV0YSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3JlYWRPbmx5ID0gcmVhZE9ubHk7XG4gICAgICAgIHRoaXMuX2RhdGFwYXRoID0gZGF0YXBhdGg7XG4gICAgICAgIHRoaXMuX21ldGEgPSBtZXRhO1xuICAgICAgICB0aGlzLl9lbnYgPSBuZXcgbG1kYi5FbnYoKTtcblxuICAgICAgICBpZiAoIXRoaXMuX21ldGEpIHtcbiAgICAgICAgICAgIHRoaXMuX21ldGEgPSBKU09OLnBhcnNlKGZzLnJlYWRGaWxlU3luYyhwYXRoLmpvaW4oZGF0YXBhdGgsICdtZXRhLmpzb24nKSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXNzZXJ0KHRoaXMuX21ldGEgaW5zdGFuY2VvZiBPYmplY3QpO1xuXG4gICAgICAgIHRoaXMuX2Vudi5vcGVuKHtcbiAgICAgICAgICAgIHBhdGg6IGRhdGFwYXRoLFxuICAgICAgICAgICAgbWFwU2l6ZTogdGhpcy5fbWV0YS5tYXBTaXplLFxuICAgICAgICAgICAgbWF4RGJzOiB0aGlzLl9tZXRhLm1heERic1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9vcGVuREIgPSB7fTtcbiAgICAgICAgdGhpcy5fb3BlblR4biA9IHt9O1xuICAgICAgICB0aGlzLl9jdXJzb3JzID0ge307XG5cbiAgICAgICAgaWYgKCFyZWFkT25seSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlTWV0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VFbnYoKSB7XG4gICAgICAgIGlmICh0aGlzLl9yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9lbnYuY2xvc2UoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZU1ldGEoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2Vudi5jbG9zZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIFRyYW5zYWN0aW9uc1xuXG4gICAgYmVnaW4oZGIsIHJlYWRPbmx5ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9vcGVuKGRiKTtcbiAgICAgICAgY29uc3QgdXVpZCA9IHV1aWQ0KCk7XG4gICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0gPSB0aGlzLl9lbnYuYmVnaW5UeG4oeyByZWFkT25seTogcmVhZE9ubHkgfSk7XG4gICAgICAgIHJldHVybiB1dWlkO1xuICAgIH1cblxuICAgIGNvbW1pdCh1dWlkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9vcGVuVHhuW3V1aWRdLCBgTm8gVHJhbnNhY3Rpb24gaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgdGhpcy5fb3BlblR4blt1dWlkXS5jb21taXQoKTtcbiAgICAgICAgdGhpcy5fb3BlblR4blt1dWlkXSA9IG51bGw7XG4gICAgfVxuXG4gICAgYWJvcnQodXVpZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fb3BlblR4blt1dWlkXSwgYE5vIFRyYW5zYWN0aW9uIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0uYWJvcnQoKTtcbiAgICAgICAgdGhpcy5fb3BlblR4blt1dWlkXSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIEN1cnNvcnNcblxuICAgIGN1cnNvcihkYiwgdXVpZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fb3BlblR4blt1dWlkXSwgYE5vIFRyYW5zYWN0aW9uIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIGFzc2VydCh0aGlzLl9vcGVuREJbZGJdLCBgTm8gb3BlbiBEQiBmb3IgJHtkYn1gKTtcblxuICAgICAgICBsZXQgY3Vyc29yVVVJRCA9IHV1aWQ0KCk7XG4gICAgICAgIHRoaXMuX2N1cnNvcnNbY3Vyc29yVVVJRF0gPSBuZXcgbG1kYi5DdXJzb3IodGhpcy5fb3BlblR4blt1dWlkXSwgdGhpcy5fb3BlbkRCW2RiXSk7XG4gICAgICAgIHJldHVybiBjdXJzb3JVVUlEO1xuICAgIH1cblxuICAgIGNsb3NlQ3Vyc29yKHV1aWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jdXJzb3JzW3V1aWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9jdXJzb3JzW3V1aWRdLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2N1cnNvcnNbdXVpZF0gPSBudWxsO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRFdmVudHMoZGIsIGN1cnNvclVVSUQpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMuZ2V0Q3VycmVudEtleVZhbHVlKGRiLCBjdXJzb3JVVUlEKSxcbiAgICAgICAgICAgIGV2ZW50cyA9IFtdLFxuICAgICAgICAgICAgX3NlbGYgPSB0aGlzO1xuICAgICAgICByZXMudmFsLm1hcCgodmFsLCBpKSA9PiB7XG4gICAgICAgICAgICBsZXQgZXZ0ID0gbmV3IERhdGFFdmVudChcbiAgICAgICAgICAgICAgICBuZXcgVGltZShyZXMua2V5LCBfc2VsZi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0ua2V5VW5pdCksXG4gICAgICAgICAgICAgICAgbmV3IFZvbHRhZ2UodmFsLCBfc2VsZi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0udW5pdHNbaV0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZXZ0LnBhcmVudFVVSUQgPSBfc2VsZi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0udXVpZHNbaV07XG4gICAgICAgICAgICBldmVudHMucHVzaChldnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50RnJhbWUoZGIsIGN1cnNvclVVSUQpIHtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMuZ2V0Q3VycmVudEtleVZhbHVlKGRiLCBjdXJzb3JVVUlEKSxcbiAgICAgICAgICAgIGZyYW1lID0gbmV3IERhdGFGcmFtZShcbiAgICAgICAgICAgICAgICBuZXcgVGltZShyZXMua2V5LCB0aGlzLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2RiXS5rZXlVbml0KSxcbiAgICAgICAgICAgICAgICByZXMudmFsXG4gICAgICAgICAgICApO1xuICAgICAgICBmcmFtZS5wYXJlbnRVVUlEID0gdGhpcy5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYl0udXVpZDtcbiAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRWYWx1ZShkYiwgY3Vyc29yVVVJRCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50S2V5VmFsdWUoZGIsIGN1cnNvclVVSUQsIHRydWUpO1xuICAgIH1cblxuICAgIGdldEN1cnJlbnRLZXlWYWx1ZShkYiwgY3Vyc29yVVVJRCwgZGlzY2FyZEtleSA9IGZhbHNlKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9jdXJzb3JzW2N1cnNvclVVSURdLCAnTm8gQ3Vyc29yIGluc3RhbmNlJyk7XG5cbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgcmVzID0gbnVsbDtcblxuICAgICAgICBpZiAoX3NlbGYuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJdLnR5cGUuY2xhc3MgPT09ICdEYXRhRnJhbWUnKSB7XG4gICAgICAgICAgICBsZXQgYXJyYXlDbGFzcyA9IF9zZWxmLl9nZXRBcnJheUNsYXNzKF9zZWxmLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2RiXS50eXBlLnR5cGUpO1xuICAgICAgICAgICAgX3NlbGYuX2N1cnNvcnNbY3Vyc29yVVVJRF0uZ2V0Q3VycmVudEJpbmFyeSgoX2tleSwgX3ZhbCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkaXNjYXJkS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IG5ldyBhcnJheUNsYXNzKF92YWwuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF9rZXkudG9TdHJpbmcoJ3VjczInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogbmV3IGFycmF5Q2xhc3MoX3ZhbC5idWZmZXIpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfc2VsZi5fY3Vyc29yc1tjdXJzb3JVVUlEXS5nZXRDdXJyZW50TnVtYmVyKChfa2V5LCBfdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc2NhcmRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gX3ZhbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6IF9rZXkudG9TdHJpbmcoJ3VjczInKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbDogX3ZhbFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gQ3Vyc29yIG1vdmVtZW50c1xuXG4gICAgZ290b0ZpcnN0KHV1aWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2N1cnNvcnNbdXVpZF0sIGBObyBDdXJzb3IgaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvcnNbdXVpZF0uZ29Ub0ZpcnN0KCk7XG4gICAgfVxuXG4gICAgZ290b1ByZXYodXVpZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fY3Vyc29yc1t1dWlkXSwgYE5vIEN1cnNvciBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yc1t1dWlkXS5nb1RvUHJldigpO1xuICAgIH1cblxuICAgIGdvdG9OZXh0KHV1aWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2N1cnNvcnNbdXVpZF0sIGBObyBDdXJzb3IgaW5zdGFuY2UgZm9yICR7dXVpZH1gKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnNvcnNbdXVpZF0uZ29Ub05leHQoKTtcbiAgICB9XG5cbiAgICBnb3RvTGFzdCh1dWlkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9jdXJzb3JzW3V1aWRdLCBgTm8gQ3Vyc29yIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JzW3V1aWRdLmdvVG9MYXN0KCk7XG4gICAgfVxuXG4gICAgZ290b0tleShkYiwgdXVpZCwga2V5KSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9jdXJzb3JzW3V1aWRdLCBgTm8gQ3Vyc29yIGluc3RhbmNlIGZvciAke3V1aWR9YCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3JzW3V1aWRdLmdvVG9LZXkodGhpcy5fY2hlY2tBbmRDb252ZXJ0S2V5KGRiLCBrZXkpKTtcbiAgICB9XG5cbiAgICBnb3RvUmFuZ2UoZGIsIHV1aWQsIGtleSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fY3Vyc29yc1t1dWlkXSwgYE5vIEN1cnNvciBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICByZXR1cm4gdGhpcy5fY3Vyc29yc1t1dWlkXS5nb1RvUmFuZ2UodGhpcy5fY2hlY2tBbmRDb252ZXJ0S2V5KGRiLCBrZXkpKTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBDUlUoRD8pXG5cbiAgICBnZXQoZGIsIHV1aWQsIHRpbWUsIHBhcmVudFVVSUQgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX29wZW5UeG5bdXVpZF0sIGBObyBUcmFuc2FjdGlvbiBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICBhc3NlcnQodGhpcy5fb3BlbkRCW2RiXSwgYE5vIG9wZW4gREIgaW5zdGFuY2UgZm9yICR7ZGJ9YCk7XG5cbiAgICAgICAgbGV0IGtleSA9IHRoaXMuX2dldEtleShkYiwgdGltZS50b09iamVjdCgpLCBwYXJlbnRVVUlEKSxcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuX29wZW5UeG5bdXVpZF0uZ2V0TnVtYmVyKHRoaXMuX29wZW5EQltkYl0sIGtleSk7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyA/IG5ldyBEYXRhRXZlbnQodGltZSwgbmV3IFZvbHRhZ2UodmFsKSkgOiBudWxsO1xuICAgIH1cblxuICAgIHB1dChkYiwgdXVpZCwgZXZlbnQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX29wZW5UeG5bdXVpZF0sIGBObyBUcmFuc2FjdGlvbiBpbnN0YW5jZSBmb3IgJHt1dWlkfWApO1xuICAgICAgICBhc3NlcnQodGhpcy5fb3BlbkRCW2RiXSwgJ05vIG9wZW4gREIgaW5zdGFuY2UnKTtcbiAgICAgICAgYXNzZXJ0KCF0aGlzLl9tZXRhLnJlYWRPbmx5LCAnREIgaXMgcmVhZC1vbmx5Jyk7XG5cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUZyYW1lKSB7XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5fZ2V0S2V5KGRiLCBldmVudC50aW1lLm5vcm1hbGl6ZWQoKSksXG4gICAgICAgICAgICAgICAgYnVmZmVyID0gQnVmZmVyLmZyb20oZXZlbnQudmFsdWUuYnVmZmVyKTtcbiAgICAgICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0ucHV0QmluYXJ5KHRoaXMuX29wZW5EQltkYl0sIGtleSwgYnVmZmVyKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZSA9IGV2ZW50LnRvT2JqZWN0KCksXG4gICAgICAgICAgICBrZXkgPSB0aGlzLl9nZXRLZXkoZGIsIGUudCwgZXZlbnQucGFyZW50VVVJRCk7XG4gICAgICAgIHRoaXMuX29wZW5UeG5bdXVpZF0ucHV0TnVtYmVyKHRoaXMuX29wZW5EQltkYl0sIGtleSwgZS52KTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBpbnRlcm5hbHNcblxuICAgIF9jcmVhdGVEQihkYiwgbWV0YSkge1xuICAgICAgICBhc3NlcnQobWV0YSBpbnN0YW5jZW9mIE9iamVjdCwgJ01ldGEgb2JqZWN0IGlzIHJlcXVpcmVkJyk7XG5cbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2RiXSA9IG1ldGE7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVNZXRhKClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBfc2VsZi5fb3BlbihkYik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBfb3BlbihkYm5hbWUpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuX29wZW5EQikgPiAwKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9vcGVuREIpLm1hcCgobmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuYW1lICE9PSBkYm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY2xvc2UoZGJuYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuX29wZW5EQltkYm5hbWVdKSB7XG4gICAgICAgICAgICB0aGlzLl9vcGVuREJbZGJuYW1lXSA9IHRoaXMuX2Vudi5vcGVuRGJpKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBkYm5hbWUsXG4gICAgICAgICAgICAgICAgY3JlYXRlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGR1cFNvcnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgcmV2ZXJzZUtleTogZmFsc2UsXG4gICAgICAgICAgICAgICAgaW50ZWdlcktleTogZmFsc2UsXG4gICAgICAgICAgICAgICAgZHVwRml4ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGludGVnZXJEdXA6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fb3BlbkRCW2RibmFtZV07XG4gICAgfVxuXG4gICAgX2Nsb3NlKGRibmFtZSkge1xuICAgICAgICBpZiAodGhpcy5fb3BlbkRCW2RibmFtZV0pIHtcbiAgICAgICAgICAgIHRoaXMuX29wZW5EQltkYm5hbWVdLmNsb3NlKCk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fb3BlbkRCW2RibmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX29wZW5EQltkYm5hbWVdO1xuICAgIH1cblxuICAgIF91cGRhdGVNZXRhKCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBmcGF0aCA9IHBhdGguam9pbih0aGlzLl9kYXRhcGF0aCwgJ21ldGEuanNvbicpLFxuICAgICAgICAgICAgbWV0YSA9IHRoaXMuX21ldGE7XG4gICAgICAgIHJldHVybiBuZXcgSlNPTkZpbGUobWV0YSkud3JpdGUoZnBhdGggKyAnLmJhaycpXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBKU09ORmlsZShtZXRhKS53cml0ZShmcGF0aCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIF9zZWxmLmVtaXQoJ3VwZGF0ZWQnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9nZXRLZXkoZGIsIHRpbWUsIGNoYW5uZWxVVUlEID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IGNoYW5uZWwgPSB0aGlzLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2RiXTtcbiAgICAgICAgdGltZSA9IHRpbWUudG9GaXhlZChjaGFubmVsLmtleVByZWNpc2lvbik7XG4gICAgICAgIHJldHVybiBuZXcgQXJyYXkoY2hhbm5lbC5rZXlTaXplICsgY2hhbm5lbC5rZXlQcmVjaXNpb24gLSB0aW1lLmxlbmd0aClcbiAgICAgICAgICAgICAgICAuZmlsbCgwKS5qb2luKCcnKSArIHRpbWUgKyAoY2hhbm5lbFVVSUQgPyAnLScgKyBjaGFubmVsVVVJRCA6ICcnKTtcbiAgICB9XG5cbiAgICBfZ2V0QXJyYXlDbGFzcyh0eXBlU3RyaW5nKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZVN0cmluZykge1xuICAgICAgICBjYXNlICdGbG9hdDMyJzpcbiAgICAgICAgICAgIHJldHVybiBGbG9hdDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ0Zsb2F0NjQnOlxuICAgICAgICAgICAgcmV0dXJuIEZsb2F0MzJBcnJheTtcbiAgICAgICAgY2FzZSAnSW50MzInOlxuICAgICAgICAgICAgcmV0dXJuIEludDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ1VpbnQzMic6XG4gICAgICAgICAgICByZXR1cm4gVWludDMyQXJyYXk7XG4gICAgICAgIGNhc2UgJ0ludDE2JzpcbiAgICAgICAgICAgIHJldHVybiBJbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdVaW50MTYnOlxuICAgICAgICAgICAgcmV0dXJuIFVpbnQzMkFycmF5O1xuICAgICAgICBjYXNlICdJbnQ4JzpcbiAgICAgICAgICAgIHJldHVybiBJbnQ4QXJyYXk7XG4gICAgICAgIGNhc2UgJ1VpbnQ4JzpcbiAgICAgICAgICAgIHJldHVybiBVaW50OEFycmF5O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NoZWNrQW5kQ29udmVydEtleShkYiwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldEtleShkYiwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgaW5zdGFuY2VvZiBUaW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0S2V5KGRiLCBrZXkubm9ybWFsaXplZCgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ga2V5O1xuICAgIH1cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBHZXR0ZXJzIC8gU2V0dGVyc1xuXG4gICAgZ2V0IG1ldGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTE1EQjsiXX0=
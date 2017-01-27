'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _LMDB = require('../../io/db/LMDB');

var _LMDB2 = _interopRequireDefault(_LMDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LMDBNode = function (_BaseNode) {
    (0, _inherits3.default)(LMDBNode, _BaseNode);

    function LMDBNode() {
        (0, _classCallCheck3.default)(this, LMDBNode);

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (LMDBNode.__proto__ || (0, _getPrototypeOf2.default)(LMDBNode)).call(this));

        _this2._lmdb = null;
        _this2._channels = {};
        _this2._outputs = {};
        _this2._inputs = {};
        return _this2;
    }

    (0, _createClass3.default)(LMDBNode, [{
        key: 'openDataSet',
        value: function openDataSet(datapath) {
            var readOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._lmdb = new _LMDB2.default(datapath, readOnly);
            var _this = this;
            (0, _keys2.default)(_this._lmdb._meta.DataSet.DataChannels).forEach(function (key) {
                var channel = _this._lmdb._meta.DataSet.DataChannels[key];
                channel._isDirty = true;
                channel.timeRange = null;
                channel.valueRange = null;
                channel.uuid = key;
                _this._channels[key] = channel;
                _this._channels[key].timeRange = _this.getTimeRange(key);
            });
        }
    }, {
        key: 'createDataSet',
        value: function createDataSet(datapath) {
            var sizeGb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
            var dbname = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var _dbname = dbname || _path2.default.parse(datapath).name,
                meta = {
                mapSize: sizeGb * Math.pow(1024, 3),
                maxDbs: 10,
                DataSet: {
                    title: _dbname,
                    DataChannels: {}
                }
            };
            if (!_fs2.default.existsSync(datapath)) {
                _fs2.default.mkdirSync(datapath);
            }
            this._lmdb = new _LMDB2.default(datapath, false, meta);
        }
    }, {
        key: 'getTimeRange',
        value: function getTimeRange(channelKey) {
            (0, _assert2.default)(this._lmdb !== null);

            var channel = this._channels[channelKey];

            if (channel.timeRange && !channel._isDirty) {
                return channel.timeRange;
            }

            var _self = this;
            var txnUUID = _self._lmdb.begin(channelKey);
            var cursorUUID = _self._lmdb.cursor(channelKey, txnUUID);

            _self._lmdb.gotoFirst(cursorUUID);
            var start = _self._lmdb.getCurrentKeyValue(channelKey, cursorUUID);

            _self._lmdb.gotoLast(cursorUUID);
            var end = _self._lmdb.getCurrentKeyValue(channelKey, cursorUUID);

            var startTime = new _Time2.default(start.key, 'ms'),
                endTime = new _Time2.default(end.key, 'ms');

            _self._lmdb.closeCursor(cursorUUID);
            _self._lmdb.abort(txnUUID);

            channel.timeRange = { start: startTime, end: endTime };
            return channel.timeRange;
        }
    }, {
        key: 'getValueRanges',
        value: function getValueRanges(channelKey) {
            (0, _assert2.default)(this._lmdb !== null);

            var channel = this._channels[channelKey];

            if (channel.valueRange && !channel._isDirty) {
                return channel.valueRange;
            }

            var _self = this;
            var txnUUID = _self._lmdb.begin(channelKey);
            var cursorUUID = _self._lmdb.cursor(channelKey, txnUUID);

            var units = channel.units,
                max = new Array(channel.type.length).fill(Number.MIN_VALUE),
                min = new Array(channel.type.length).fill(Number.MAX_VALUE);

            for (var found = _self._lmdb.gotoFirst(cursorUUID); found; found = _self._lmdb.gotoNext(cursorUUID)) {
                var vals = _self._lmdb.getCurrentValue(channelKey, cursorUUID);
                for (var i in vals) {
                    if (vals[i] > max[i]) {
                        max[i] = vals[i];
                    }
                    if (vals[i] < min[i]) {
                        min[i] = vals[i];
                    }
                }
            }

            _self._lmdb.closeCursor(cursorUUID);
            _self._lmdb.abort(txnUUID);

            channel.valueRange = { min: min.map(function (val, i) {
                    return new _Voltage2.default(val, units[i]);
                }), max: max.map(function (val, i) {
                    return new _Voltage2.default(val, units[i]);
                })
            };

            return channel.valueRange;
        }
    }, {
        key: 'createInput',
        value: function createInput(dataLayout) {
            var _this3 = this;

            var storeFrames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            (0, _assert2.default)(this._lmdb !== null);
            (0, _assert2.default)((typeof dataLayout === 'undefined' ? 'undefined' : (0, _typeof3.default)(dataLayout)) === 'object');

            if (storeFrames) {
                (0, _assert2.default)((0, _keys2.default)(dataLayout).length === 1, 'Only create a single channel when storing frames.');
            }

            var _self = this;
            (0, _keys2.default)(dataLayout).map(function (channelKey) {
                _self._lmdb.meta.DataSet.DataChannels[channelKey] = {
                    type: {
                        class: storeFrames ? 'DataFrame' : 'DataEvent',
                        type: storeFrames ? 'Float32' : null,
                        length: storeFrames ? dataLayout[channelKey].labels.length : 0
                    },
                    keySize: 16,
                    keyPrecision: 6,
                    title: dataLayout[channelKey].title || channelKey,
                    keyUnit: dataLayout[channelKey].keyUnit,
                    units: storeFrames ? dataLayout[channelKey].units : [],
                    labels: storeFrames ? dataLayout[channelKey].labels : [],
                    uuids: []
                };
            });
            (0, _keys2.default)(this._lmdb._meta.DataSet.DataChannels).forEach(function (key) {
                var channel = _this3._lmdb._meta.DataSet.DataChannels[key];
                channel._isDirty = true;
                channel.timeRange = null;
                channel.valueRange = null;
                channel.uuid = key;
                _this3._channels[key] = channel;
            });

            var input = {
                uuid: (0, _uuid2.default)(),
                db: this._lmdb._meta.DataSet.title,
                stream: (0, _through2.default)(),
                paused: false,
                position: 0
            };

            input.txnUUID = this._lmdb.begin(input.db, false);

            input.stream.on('data', function (data) {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                data.map(function (event) {

                    if (event instanceof _DataFrame2.default && storeFrames) {
                        _self._lmdb.put(_self._lmdb._meta.DataSet.title, input.txnUUID, event);
                    } else if (event instanceof _DataEvent2.default && !storeFrames) {
                        _self._lmdb.put(_self._lmdb._meta.DataSet.title, input.txnUUID, event);
                    }
                    _this3.addStats('in', event.constructor.name);
                });
            });
            input.stream.once('end', function () {
                _self._lmdb.commit(input.txnUUID);
                return _self._lmdb._updateMeta().then(function () {
                    _self.emit('done');
                });
            });
            input.stream.once('error', function (err) {
                _self.emit('error', 'LMDB input error ' + err.message);
                _self._lmdb.commit(input.txnUUID);
            });

            this._inputs[input.uuid] = input;
            return input.uuid;
        }
    }, {
        key: 'createOutput',
        value: function createOutput(channelKey) {
            var startTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Time2.default(0.0);
            var endTime = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _Time2.default(0.0);
            var convertFrames = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

            (0, _assert2.default)(this._lmdb !== null);

            (0, _assert2.default)(typeof channelKey === 'string');
            (0, _assert2.default)(this._channels.hasOwnProperty(channelKey));

            var output = {
                uuid: (0, _uuid2.default)(),
                db: channelKey,
                stream: (0, _through2.default)(),
                convertFrames: convertFrames,
                hasNext: true,
                startTime: startTime,
                endTime: endTime,
                currentKey: null,
                paused: false,
                position: 0,
                eventBuffer: []
            };

            this._outputs[output.uuid] = output;

            output.txnUUID = this._lmdb.begin(output.db);
            output.cursorUUID = this._lmdb.cursor(output.db, output.txnUUID);

            return output.uuid;
        }
    }, {
        key: 'startOutput',
        value: function startOutput(uuid) {
            if (!this._outputs[uuid]) {
                return;
            }
            (0, _assert2.default)(this._outputs[uuid] instanceof Object);
            var output = this._outputs[uuid],
                _self = this;

            if (output.currentKey) {
                this._lmdb.gotoKey(output.db, output.cursorUUID, output.currentKey);
            } else {
                this._lmdb.gotoRange(output.db, output.cursorUUID, output.startTime);
            }

            var lastType = void 0;
            while (!output.stream.paused) {
                if (output.eventBuffer.length === 0 && output.hasNext) {
                    if (output.convertFrames) {
                        output.eventBuffer = this._lmdb.getCurrentEvents(output.db, output.cursorUUID);
                    } else {
                        output.eventBuffer = [this._lmdb.getCurrentFrame(output.db, output.cursorUUID)];
                    }
                    output.currentKey = this._lmdb.gotoNext(output.cursorUUID);
                    if (!output.currentKey) {
                        output.hasNext = false;
                    }
                } else if (output.eventBuffer.length === 0 && !output.hasNext) {
                    return this.endOutput(uuid);
                }
                if (output.eventBuffer.length > 0) {
                    var event = output.eventBuffer.shift();
                    if (output.endTime.normalized() > 0 && event.time.normalized() >= output.endTime.normalized()) {
                        return this.endOutput(uuid);
                    }
                    output.stream.queue(event);
                    lastType = event.constructor.name;
                    this.addStats('out', lastType);
                }
            }

            setTimeout(function () {
                _self.startOutput(uuid);
            }, 10);
        }
    }, {
        key: 'endOutput',
        value: function endOutput(uuid) {
            var output = this._outputs[uuid];
            (0, _assert2.default)(output instanceof Object);

            output.stream.queue(null);
            this.addStats('out', 'null', 0);

            this._lmdb.closeCursor(output.cursorUUID);
            this._lmdb.abort(output.txnUUID);

            this._outputs[uuid] = null;
            output = null;
        }
    }, {
        key: 'outputs',
        get: function get() {
            return this._outputs;
        }
    }, {
        key: 'inputs',
        get: function get() {
            return this._inputs;
        }
    }, {
        key: 'meta',
        get: function get() {
            return this._lmdb.meta;
        }
    }]);
    return LMDBNode;
}(_BaseNode3.default);

exports.default = LMDBNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL3N0b3JhZ2UvTE1EQk5vZGUuanMiXSwibmFtZXMiOlsiTE1EQk5vZGUiLCJfbG1kYiIsIl9jaGFubmVscyIsIl9vdXRwdXRzIiwiX2lucHV0cyIsImRhdGFwYXRoIiwicmVhZE9ubHkiLCJfdGhpcyIsIl9tZXRhIiwiRGF0YVNldCIsIkRhdGFDaGFubmVscyIsImZvckVhY2giLCJrZXkiLCJjaGFubmVsIiwiX2lzRGlydHkiLCJ0aW1lUmFuZ2UiLCJ2YWx1ZVJhbmdlIiwidXVpZCIsImdldFRpbWVSYW5nZSIsInNpemVHYiIsImRibmFtZSIsInVuZGVmaW5lZCIsIl9kYm5hbWUiLCJwYXJzZSIsIm5hbWUiLCJtZXRhIiwibWFwU2l6ZSIsIk1hdGgiLCJwb3ciLCJtYXhEYnMiLCJ0aXRsZSIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJjaGFubmVsS2V5IiwiX3NlbGYiLCJ0eG5VVUlEIiwiYmVnaW4iLCJjdXJzb3JVVUlEIiwiY3Vyc29yIiwiZ290b0ZpcnN0Iiwic3RhcnQiLCJnZXRDdXJyZW50S2V5VmFsdWUiLCJnb3RvTGFzdCIsImVuZCIsInN0YXJ0VGltZSIsImVuZFRpbWUiLCJjbG9zZUN1cnNvciIsImFib3J0IiwidW5pdHMiLCJtYXgiLCJBcnJheSIsInR5cGUiLCJsZW5ndGgiLCJmaWxsIiwiTnVtYmVyIiwiTUlOX1ZBTFVFIiwibWluIiwiTUFYX1ZBTFVFIiwiZm91bmQiLCJnb3RvTmV4dCIsInZhbHMiLCJnZXRDdXJyZW50VmFsdWUiLCJpIiwibWFwIiwidmFsIiwiZGF0YUxheW91dCIsInN0b3JlRnJhbWVzIiwiY2xhc3MiLCJsYWJlbHMiLCJrZXlTaXplIiwia2V5UHJlY2lzaW9uIiwia2V5VW5pdCIsInV1aWRzIiwiaW5wdXQiLCJkYiIsInN0cmVhbSIsInBhdXNlZCIsInBvc2l0aW9uIiwib24iLCJkYXRhIiwiaXNBcnJheSIsImV2ZW50IiwicHV0IiwiYWRkU3RhdHMiLCJjb25zdHJ1Y3RvciIsIm9uY2UiLCJjb21taXQiLCJfdXBkYXRlTWV0YSIsInRoZW4iLCJlbWl0IiwiZXJyIiwibWVzc2FnZSIsImNvbnZlcnRGcmFtZXMiLCJoYXNPd25Qcm9wZXJ0eSIsIm91dHB1dCIsImhhc05leHQiLCJjdXJyZW50S2V5IiwiZXZlbnRCdWZmZXIiLCJPYmplY3QiLCJnb3RvS2V5IiwiZ290b1JhbmdlIiwibGFzdFR5cGUiLCJnZXRDdXJyZW50RXZlbnRzIiwiZ2V0Q3VycmVudEZyYW1lIiwiZW5kT3V0cHV0Iiwic2hpZnQiLCJub3JtYWxpemVkIiwidGltZSIsInF1ZXVlIiwic2V0VGltZW91dCIsInN0YXJ0T3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFE7OztBQUNGLHdCQUFjO0FBQUE7O0FBQUE7O0FBR1YsZUFBS0MsS0FBTCxHQUFhLElBQWI7QUFDQSxlQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsZUFBS0MsUUFBTCxHQUFnQixFQUFoQjtBQUNBLGVBQUtDLE9BQUwsR0FBZSxFQUFmO0FBTlU7QUFPYjs7OztvQ0FFV0MsUSxFQUEyQjtBQUFBLGdCQUFqQkMsUUFBaUIsdUVBQU4sSUFBTTs7QUFDbkMsaUJBQUtMLEtBQUwsR0FBYSxtQkFBU0ksUUFBVCxFQUFtQkMsUUFBbkIsQ0FBYjtBQUNBLGdCQUFNQyxRQUFRLElBQWQ7QUFDQSxnQ0FBWUEsTUFBTU4sS0FBTixDQUFZTyxLQUFaLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBdEMsRUFBb0RDLE9BQXBELENBQTRELFVBQUNDLEdBQUQsRUFBUztBQUNqRSxvQkFBSUMsVUFBVU4sTUFBTU4sS0FBTixDQUFZTyxLQUFaLENBQWtCQyxPQUFsQixDQUEwQkMsWUFBMUIsQ0FBdUNFLEdBQXZDLENBQWQ7QUFDQUMsd0JBQVFDLFFBQVIsR0FBbUIsSUFBbkI7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QUwsQ0FBVzhDLEtBQVgsQ0FBaUIrQyxPQUFPM0QsT0FBeEI7O0FBRUEsaUJBQUtoQyxRQUFMLENBQWNjLElBQWQsSUFBc0IsSUFBdEI7QUFDQTZFLHFCQUFTLElBQVQ7QUFDSDs7OzRCQUVhO0FBQ1YsbUJBQU8sS0FBSzNGLFFBQVo7QUFDSDs7OzRCQUVZO0FBQ1QsbUJBQU8sS0FBS0MsT0FBWjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLSCxLQUFMLENBQVd3QixJQUFsQjtBQUNIOzs7OztrQkFHVXpCLFEiLCJmaWxlIjoibm9kZXMvc3RvcmFnZS9MTURCTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB1dWlkNCBmcm9tICd1dWlkNCc7XG5pbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcblxuaW1wb3J0IEJhc2VOb2RlIGZyb20gJy4uL0Jhc2VOb2RlJztcbmltcG9ydCBEYXRhRnJhbWUgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFGcmFtZSc7XG5pbXBvcnQgRGF0YUV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRXZlbnQnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5pbXBvcnQgTE1EQiBmcm9tICcuLi8uLi9pby9kYi9MTURCJztcblxuY2xhc3MgTE1EQk5vZGUgZXh0ZW5kcyBCYXNlTm9kZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fbG1kYiA9IG51bGw7XG4gICAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgICAgIHRoaXMuX291dHB1dHMgPSB7fTtcbiAgICAgICAgdGhpcy5faW5wdXRzID0ge307XG4gICAgfVxuXG4gICAgb3BlbkRhdGFTZXQoZGF0YXBhdGgsIHJlYWRPbmx5ID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9sbWRiID0gbmV3IExNREIoZGF0YXBhdGgsIHJlYWRPbmx5KTtcbiAgICAgICAgY29uc3QgX3RoaXMgPSB0aGlzO1xuICAgICAgICBPYmplY3Qua2V5cyhfdGhpcy5fbG1kYi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVscykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbCA9IF90aGlzLl9sbWRiLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2tleV07XG4gICAgICAgICAgICBjaGFubmVsLl9pc0RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoYW5uZWwudGltZVJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIGNoYW5uZWwudmFsdWVSYW5nZSA9IG51bGw7XG4gICAgICAgICAgICBjaGFubmVsLnV1aWQgPSBrZXk7XG4gICAgICAgICAgICBfdGhpcy5fY2hhbm5lbHNba2V5XSA9IGNoYW5uZWw7XG4gICAgICAgICAgICBfdGhpcy5fY2hhbm5lbHNba2V5XS50aW1lUmFuZ2UgPSBfdGhpcy5nZXRUaW1lUmFuZ2Uoa2V5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY3JlYXRlRGF0YVNldChkYXRhcGF0aCwgc2l6ZUdiID0gMiwgZGJuYW1lID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IF9kYm5hbWUgPSBkYm5hbWUgfHwgcGF0aC5wYXJzZShkYXRhcGF0aCkubmFtZSxcbiAgICAgICAgICAgIG1ldGEgPSB7XG4gICAgICAgICAgICAgICAgbWFwU2l6ZTogc2l6ZUdiICogTWF0aC5wb3coMTAyNCwgMyksXG4gICAgICAgICAgICAgICAgbWF4RGJzOiAxMCxcbiAgICAgICAgICAgICAgICBEYXRhU2V0OiB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfZGJuYW1lLFxuICAgICAgICAgICAgICAgICAgICBEYXRhQ2hhbm5lbHM6IHt9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKGRhdGFwYXRoKSkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKGRhdGFwYXRoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9sbWRiID0gbmV3IExNREIoZGF0YXBhdGgsIGZhbHNlLCBtZXRhKTtcbiAgICB9XG5cbiAgICBnZXRUaW1lUmFuZ2UoY2hhbm5lbEtleSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fbG1kYiAhPT0gbnVsbCk7XG5cbiAgICAgICAgbGV0IGNoYW5uZWwgPSB0aGlzLl9jaGFubmVsc1tjaGFubmVsS2V5XTtcblxuICAgICAgICBpZiAoY2hhbm5lbC50aW1lUmFuZ2UgJiYgIWNoYW5uZWwuX2lzRGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFubmVsLnRpbWVSYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgdHhuVVVJRCA9IF9zZWxmLl9sbWRiLmJlZ2luKGNoYW5uZWxLZXkpO1xuICAgICAgICBjb25zdCBjdXJzb3JVVUlEID0gX3NlbGYuX2xtZGIuY3Vyc29yKGNoYW5uZWxLZXksIHR4blVVSUQpO1xuXG4gICAgICAgIF9zZWxmLl9sbWRiLmdvdG9GaXJzdChjdXJzb3JVVUlEKTtcbiAgICAgICAgbGV0IHN0YXJ0ID0gX3NlbGYuX2xtZGIuZ2V0Q3VycmVudEtleVZhbHVlKGNoYW5uZWxLZXksIGN1cnNvclVVSUQpO1xuXG4gICAgICAgIF9zZWxmLl9sbWRiLmdvdG9MYXN0KGN1cnNvclVVSUQpO1xuICAgICAgICBsZXQgZW5kID0gX3NlbGYuX2xtZGIuZ2V0Q3VycmVudEtleVZhbHVlKGNoYW5uZWxLZXksIGN1cnNvclVVSUQpO1xuXG4gICAgICAgIGxldCBzdGFydFRpbWUgPSBuZXcgVGltZShzdGFydC5rZXksICdtcycpLFxuICAgICAgICAgICAgZW5kVGltZSA9IG5ldyBUaW1lKGVuZC5rZXksICdtcycpO1xuXG4gICAgICAgIF9zZWxmLl9sbWRiLmNsb3NlQ3Vyc29yKGN1cnNvclVVSUQpO1xuICAgICAgICBfc2VsZi5fbG1kYi5hYm9ydCh0eG5VVUlEKTtcblxuICAgICAgICBjaGFubmVsLnRpbWVSYW5nZSA9IHsgc3RhcnQ6IHN0YXJ0VGltZSwgZW5kOiBlbmRUaW1lIH07XG4gICAgICAgIHJldHVybiBjaGFubmVsLnRpbWVSYW5nZTtcbiAgICB9XG5cbiAgICBnZXRWYWx1ZVJhbmdlcyhjaGFubmVsS2V5KSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9sbWRiICE9PSBudWxsKTtcblxuICAgICAgICBsZXQgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxLZXldO1xuXG4gICAgICAgIGlmIChjaGFubmVsLnZhbHVlUmFuZ2UgJiYgIWNoYW5uZWwuX2lzRGlydHkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGFubmVsLnZhbHVlUmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGNvbnN0IHR4blVVSUQgPSBfc2VsZi5fbG1kYi5iZWdpbihjaGFubmVsS2V5KTtcbiAgICAgICAgY29uc3QgY3Vyc29yVVVJRCA9IF9zZWxmLl9sbWRiLmN1cnNvcihjaGFubmVsS2V5LCB0eG5VVUlEKTtcblxuICAgICAgICBsZXQgdW5pdHMgPSBjaGFubmVsLnVuaXRzLFxuICAgICAgICAgICAgbWF4ID0gbmV3IEFycmF5KGNoYW5uZWwudHlwZS5sZW5ndGgpLmZpbGwoTnVtYmVyLk1JTl9WQUxVRSksXG4gICAgICAgICAgICBtaW4gPSBuZXcgQXJyYXkoY2hhbm5lbC50eXBlLmxlbmd0aCkuZmlsbChOdW1iZXIuTUFYX1ZBTFVFKTtcblxuICAgICAgICBmb3IgKHZhciBmb3VuZCA9IF9zZWxmLl9sbWRiLmdvdG9GaXJzdChjdXJzb3JVVUlEKTsgZm91bmQ7IGZvdW5kID0gX3NlbGYuX2xtZGIuZ290b05leHQoY3Vyc29yVVVJRCkpIHtcbiAgICAgICAgICAgIGxldCB2YWxzID0gX3NlbGYuX2xtZGIuZ2V0Q3VycmVudFZhbHVlKGNoYW5uZWxLZXksIGN1cnNvclVVSUQpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB2YWxzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHNbaV0gPiBtYXhbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWF4W2ldID0gdmFsc1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZhbHNbaV0gPCBtaW5baV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbWluW2ldID0gdmFsc1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfc2VsZi5fbG1kYi5jbG9zZUN1cnNvcihjdXJzb3JVVUlEKTtcbiAgICAgICAgX3NlbGYuX2xtZGIuYWJvcnQodHhuVVVJRCk7XG5cbiAgICAgICAgY2hhbm5lbC52YWx1ZVJhbmdlID0geyBtaW46IG1pbi5tYXAoKHZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWb2x0YWdlKHZhbCwgdW5pdHNbaV0pO1xuICAgICAgICB9KSwgbWF4OiBtYXgubWFwKCh2YWwsIGkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgVm9sdGFnZSh2YWwsIHVuaXRzW2ldKTtcbiAgICAgICAgfSlcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gY2hhbm5lbC52YWx1ZVJhbmdlO1xuICAgIH1cblxuICAgIGNyZWF0ZUlucHV0KGRhdGFMYXlvdXQsIHN0b3JlRnJhbWVzID0gZmFsc2UpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2xtZGIgIT09IG51bGwpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGRhdGFMYXlvdXQgPT09ICdvYmplY3QnKTtcblxuICAgICAgICBpZiAoc3RvcmVGcmFtZXMpIHtcbiAgICAgICAgICAgIGFzc2VydChPYmplY3Qua2V5cyhkYXRhTGF5b3V0KS5sZW5ndGggPT09IDEsICdPbmx5IGNyZWF0ZSBhIHNpbmdsZSBjaGFubmVsIHdoZW4gc3RvcmluZyBmcmFtZXMuJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5rZXlzKGRhdGFMYXlvdXQpLm1hcCgoY2hhbm5lbEtleSkgPT4ge1xuICAgICAgICAgICAgX3NlbGYuX2xtZGIubWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tjaGFubmVsS2V5XSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzOiBzdG9yZUZyYW1lcyA/ICdEYXRhRnJhbWUnIDogJ0RhdGFFdmVudCcsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHN0b3JlRnJhbWVzID8gJ0Zsb2F0MzInIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBzdG9yZUZyYW1lcyA/IGRhdGFMYXlvdXRbY2hhbm5lbEtleV0ubGFiZWxzLmxlbmd0aCA6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGtleVNpemU6IDE2LFxuICAgICAgICAgICAgICAgIGtleVByZWNpc2lvbjogNixcbiAgICAgICAgICAgICAgICB0aXRsZTogZGF0YUxheW91dFtjaGFubmVsS2V5XS50aXRsZSB8fCBjaGFubmVsS2V5LFxuICAgICAgICAgICAgICAgIGtleVVuaXQ6IGRhdGFMYXlvdXRbY2hhbm5lbEtleV0ua2V5VW5pdCxcbiAgICAgICAgICAgICAgICB1bml0czogc3RvcmVGcmFtZXMgPyBkYXRhTGF5b3V0W2NoYW5uZWxLZXldLnVuaXRzIDogW10sXG4gICAgICAgICAgICAgICAgbGFiZWxzOiBzdG9yZUZyYW1lcyA/IGRhdGFMYXlvdXRbY2hhbm5lbEtleV0ubGFiZWxzIDogW10sXG4gICAgICAgICAgICAgICAgdXVpZHM6IFtdXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5fbG1kYi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVscykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICBsZXQgY2hhbm5lbCA9IHRoaXMuX2xtZGIuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNba2V5XTtcbiAgICAgICAgICAgIGNoYW5uZWwuX2lzRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgY2hhbm5lbC50aW1lUmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgY2hhbm5lbC52YWx1ZVJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIGNoYW5uZWwudXVpZCA9IGtleTtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5uZWxzW2tleV0gPSBjaGFubmVsO1xuICAgICAgICB9KTtcblxuICAgICAgICBsZXQgaW5wdXQgPSB7XG4gICAgICAgICAgICB1dWlkOiB1dWlkNCgpLFxuICAgICAgICAgICAgZGI6IHRoaXMuX2xtZGIuX21ldGEuRGF0YVNldC50aXRsZSxcbiAgICAgICAgICAgIHN0cmVhbTogdGhyb3VnaCgpLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgaW5wdXQudHhuVVVJRCA9IHRoaXMuX2xtZGIuYmVnaW4oaW5wdXQuZGIsIGZhbHNlKTtcblxuICAgICAgICBpbnB1dC5zdHJlYW0ub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEubWFwKChldmVudCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUZyYW1lICYmIHN0b3JlRnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLl9sbWRiLnB1dChfc2VsZi5fbG1kYi5fbWV0YS5EYXRhU2V0LnRpdGxlLCBpbnB1dC50eG5VVUlELCBldmVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIERhdGFFdmVudCAmJiAhc3RvcmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2xtZGIucHV0KF9zZWxmLl9sbWRiLl9tZXRhLkRhdGFTZXQudGl0bGUsIGlucHV0LnR4blVVSUQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTdGF0cygnaW4nLCBldmVudC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgaW5wdXQuc3RyZWFtLm9uY2UoJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgIF9zZWxmLl9sbWRiLmNvbW1pdChpbnB1dC50eG5VVUlEKTtcbiAgICAgICAgICAgIHJldHVybiBfc2VsZi5fbG1kYi5fdXBkYXRlTWV0YSgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5lbWl0KCdkb25lJyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbnB1dC5zdHJlYW0ub25jZSgnZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBfc2VsZi5lbWl0KCdlcnJvcicsIGBMTURCIGlucHV0IGVycm9yICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICBfc2VsZi5fbG1kYi5jb21taXQoaW5wdXQudHhuVVVJRCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2lucHV0c1tpbnB1dC51dWlkXSA9IGlucHV0O1xuICAgICAgICByZXR1cm4gaW5wdXQudXVpZDtcbiAgICB9XG5cbiAgICBjcmVhdGVPdXRwdXQoY2hhbm5lbEtleSwgc3RhcnRUaW1lID0gbmV3IFRpbWUoMC4wKSwgZW5kVGltZSA9IG5ldyBUaW1lKDAuMCksIGNvbnZlcnRGcmFtZXMgPSBmYWxzZSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fbG1kYiAhPT0gbnVsbCk7XG5cbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBjaGFubmVsS2V5ID09PSAnc3RyaW5nJyk7XG4gICAgICAgIGFzc2VydCh0aGlzLl9jaGFubmVscy5oYXNPd25Qcm9wZXJ0eShjaGFubmVsS2V5KSk7XG5cbiAgICAgICAgbGV0IG91dHB1dCA9IHtcbiAgICAgICAgICAgIHV1aWQ6IHV1aWQ0KCksXG4gICAgICAgICAgICBkYjogY2hhbm5lbEtleSxcbiAgICAgICAgICAgIHN0cmVhbTogdGhyb3VnaCgpLFxuICAgICAgICAgICAgY29udmVydEZyYW1lczogY29udmVydEZyYW1lcyxcbiAgICAgICAgICAgIGhhc05leHQ6IHRydWUsXG4gICAgICAgICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZSxcbiAgICAgICAgICAgIGVuZFRpbWU6IGVuZFRpbWUsXG4gICAgICAgICAgICBjdXJyZW50S2V5OiBudWxsLFxuICAgICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgZXZlbnRCdWZmZXI6IFtdXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fb3V0cHV0c1tvdXRwdXQudXVpZF0gPSBvdXRwdXQ7XG5cbiAgICAgICAgb3V0cHV0LnR4blVVSUQgPSB0aGlzLl9sbWRiLmJlZ2luKG91dHB1dC5kYik7XG4gICAgICAgIG91dHB1dC5jdXJzb3JVVUlEID0gdGhpcy5fbG1kYi5jdXJzb3Iob3V0cHV0LmRiLCBvdXRwdXQudHhuVVVJRCk7XG5cbiAgICAgICAgcmV0dXJuIG91dHB1dC51dWlkO1xuICAgIH1cblxuICAgIHN0YXJ0T3V0cHV0KHV1aWQpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9vdXRwdXRzW3V1aWRdKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYXNzZXJ0KHRoaXMuX291dHB1dHNbdXVpZF0gaW5zdGFuY2VvZiBPYmplY3QpO1xuICAgICAgICBjb25zdCBvdXRwdXQgPSB0aGlzLl9vdXRwdXRzW3V1aWRdLFxuICAgICAgICAgICAgX3NlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmIChvdXRwdXQuY3VycmVudEtleSkge1xuICAgICAgICAgICAgdGhpcy5fbG1kYi5nb3RvS2V5KG91dHB1dC5kYiwgb3V0cHV0LmN1cnNvclVVSUQsIG91dHB1dC5jdXJyZW50S2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xtZGIuZ290b1JhbmdlKG91dHB1dC5kYiwgb3V0cHV0LmN1cnNvclVVSUQsIG91dHB1dC5zdGFydFRpbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGxhc3RUeXBlO1xuICAgICAgICB3aGlsZSAoIW91dHB1dC5zdHJlYW0ucGF1c2VkKSB7XG4gICAgICAgICAgICBpZiAob3V0cHV0LmV2ZW50QnVmZmVyLmxlbmd0aCA9PT0gMCAmJiBvdXRwdXQuaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgIGlmIChvdXRwdXQuY29udmVydEZyYW1lcykge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZXZlbnRCdWZmZXIgPSB0aGlzLl9sbWRiLmdldEN1cnJlbnRFdmVudHMob3V0cHV0LmRiLCBvdXRwdXQuY3Vyc29yVVVJRCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0LmV2ZW50QnVmZmVyID0gW3RoaXMuX2xtZGIuZ2V0Q3VycmVudEZyYW1lKG91dHB1dC5kYiwgb3V0cHV0LmN1cnNvclVVSUQpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0LmN1cnJlbnRLZXkgPSB0aGlzLl9sbWRiLmdvdG9OZXh0KG91dHB1dC5jdXJzb3JVVUlEKTtcbiAgICAgICAgICAgICAgICBpZiAoIW91dHB1dC5jdXJyZW50S2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5oYXNOZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChvdXRwdXQuZXZlbnRCdWZmZXIubGVuZ3RoID09PSAwICYmICFvdXRwdXQuaGFzTmV4dCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZE91dHB1dCh1dWlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvdXRwdXQuZXZlbnRCdWZmZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGxldCBldmVudCA9IG91dHB1dC5ldmVudEJ1ZmZlci5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChvdXRwdXQuZW5kVGltZS5ub3JtYWxpemVkKCkgPiAwICYmIGV2ZW50LnRpbWUubm9ybWFsaXplZCgpID49IG91dHB1dC5lbmRUaW1lLm5vcm1hbGl6ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmRPdXRwdXQodXVpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG91dHB1dC5zdHJlYW0ucXVldWUoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGxhc3RUeXBlID0gZXZlbnQuY29uc3RydWN0b3IubmFtZTtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0YXRzKCdvdXQnLCBsYXN0VHlwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF9zZWxmLnN0YXJ0T3V0cHV0KHV1aWQpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgZW5kT3V0cHV0KHV1aWQpIHtcbiAgICAgICAgbGV0IG91dHB1dCA9IHRoaXMuX291dHB1dHNbdXVpZF07XG4gICAgICAgIGFzc2VydChvdXRwdXQgaW5zdGFuY2VvZiBPYmplY3QpO1xuXG4gICAgICAgIG91dHB1dC5zdHJlYW0ucXVldWUobnVsbCk7XG4gICAgICAgIHRoaXMuYWRkU3RhdHMoJ291dCcsICdudWxsJywgMCk7XG5cbiAgICAgICAgdGhpcy5fbG1kYi5jbG9zZUN1cnNvcihvdXRwdXQuY3Vyc29yVVVJRCk7XG4gICAgICAgIHRoaXMuX2xtZGIuYWJvcnQob3V0cHV0LnR4blVVSUQpO1xuXG4gICAgICAgIHRoaXMuX291dHB1dHNbdXVpZF0gPSBudWxsO1xuICAgICAgICBvdXRwdXQgPSBudWxsO1xuICAgIH1cblxuICAgIGdldCBvdXRwdXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb3V0cHV0cztcbiAgICB9XG5cbiAgICBnZXQgaW5wdXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRzO1xuICAgIH1cblxuICAgIGdldCBtZXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG1kYi5tZXRhO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTE1EQk5vZGU7Il19
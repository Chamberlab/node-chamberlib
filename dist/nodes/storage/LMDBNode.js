'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LMDBNode = function (_BaseNode) {
    _inherits(LMDBNode, _BaseNode);

    function LMDBNode() {
        _classCallCheck(this, LMDBNode);

        var _this2 = _possibleConstructorReturn(this, (LMDBNode.__proto__ || Object.getPrototypeOf(LMDBNode)).call(this));

        _this2._lmdb = null;
        _this2._channels = {};
        _this2._outputs = {};
        _this2._inputs = {};
        return _this2;
    }

    _createClass(LMDBNode, [{
        key: 'openDataSet',
        value: function openDataSet(datapath) {
            var readOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            this._lmdb = new _LMDB2.default(datapath, readOnly);
            var _this = this;
            Object.keys(_this._lmdb._meta.DataSet.DataChannels).forEach(function (key) {
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
            (0, _assert2.default)((typeof dataLayout === 'undefined' ? 'undefined' : _typeof(dataLayout)) === 'object');

            if (storeFrames) {
                (0, _assert2.default)(Object.keys(dataLayout).length === 1, 'Only create a single channel when storing frames.');
            }

            var _self = this;
            Object.keys(dataLayout).map(function (channelKey) {
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
            Object.keys(this._lmdb._meta.DataSet.DataChannels).forEach(function (key) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL3N0b3JhZ2UvTE1EQk5vZGUuanMiXSwibmFtZXMiOlsiTE1EQk5vZGUiLCJfbG1kYiIsIl9jaGFubmVscyIsIl9vdXRwdXRzIiwiX2lucHV0cyIsImRhdGFwYXRoIiwicmVhZE9ubHkiLCJfdGhpcyIsIk9iamVjdCIsImtleXMiLCJfbWV0YSIsIkRhdGFTZXQiLCJEYXRhQ2hhbm5lbHMiLCJmb3JFYWNoIiwia2V5IiwiY2hhbm5lbCIsIl9pc0RpcnR5IiwidGltZVJhbmdlIiwidmFsdWVSYW5nZSIsInV1aWQiLCJnZXRUaW1lUmFuZ2UiLCJzaXplR2IiLCJkYm5hbWUiLCJ1bmRlZmluZWQiLCJfZGJuYW1lIiwicGFyc2UiLCJuYW1lIiwibWV0YSIsIm1hcFNpemUiLCJNYXRoIiwicG93IiwibWF4RGJzIiwidGl0bGUiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwiY2hhbm5lbEtleSIsIl9zZWxmIiwidHhuVVVJRCIsImJlZ2luIiwiY3Vyc29yVVVJRCIsImN1cnNvciIsImdvdG9GaXJzdCIsInN0YXJ0IiwiZ2V0Q3VycmVudEtleVZhbHVlIiwiZ290b0xhc3QiLCJlbmQiLCJzdGFydFRpbWUiLCJlbmRUaW1lIiwiY2xvc2VDdXJzb3IiLCJhYm9ydCIsInVuaXRzIiwibWF4IiwiQXJyYXkiLCJ0eXBlIiwibGVuZ3RoIiwiZmlsbCIsIk51bWJlciIsIk1JTl9WQUxVRSIsIm1pbiIsIk1BWF9WQUxVRSIsImZvdW5kIiwiZ290b05leHQiLCJ2YWxzIiwiZ2V0Q3VycmVudFZhbHVlIiwiaSIsIm1hcCIsInZhbCIsImRhdGFMYXlvdXQiLCJzdG9yZUZyYW1lcyIsImNsYXNzIiwibGFiZWxzIiwia2V5U2l6ZSIsImtleVByZWNpc2lvbiIsImtleVVuaXQiLCJ1dWlkcyIsImlucHV0IiwiZGIiLCJzdHJlYW0iLCJwYXVzZWQiLCJwb3NpdGlvbiIsIm9uIiwiZGF0YSIsImlzQXJyYXkiLCJldmVudCIsInB1dCIsImFkZFN0YXRzIiwiY29uc3RydWN0b3IiLCJvbmNlIiwiY29tbWl0IiwiX3VwZGF0ZU1ldGEiLCJ0aGVuIiwiZW1pdCIsImVyciIsIm1lc3NhZ2UiLCJjb252ZXJ0RnJhbWVzIiwiaGFzT3duUHJvcGVydHkiLCJvdXRwdXQiLCJoYXNOZXh0IiwiY3VycmVudEtleSIsImV2ZW50QnVmZmVyIiwiZ290b0tleSIsImdvdG9SYW5nZSIsImxhc3RUeXBlIiwiZ2V0Q3VycmVudEV2ZW50cyIsImdldEN1cnJlbnRGcmFtZSIsImVuZE91dHB1dCIsInNoaWZ0Iiwibm9ybWFsaXplZCIsInRpbWUiLCJxdWV1ZSIsInNldFRpbWVvdXQiLCJzdGFydE91dHB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxROzs7QUFDRix3QkFBYztBQUFBOztBQUFBOztBQUdWLGVBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsZUFBS0MsU0FBTCxHQUFpQixFQUFqQjtBQUNBLGVBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxlQUFLQyxPQUFMLEdBQWUsRUFBZjtBQU5VO0FBT2I7Ozs7b0NBRVdDLFEsRUFBMkI7QUFBQSxnQkFBakJDLFFBQWlCLHVFQUFOLElBQU07O0FBQ25DLGlCQUFLTCxLQUFMLEdBQWEsbUJBQVNJLFFBQVQsRUFBbUJDLFFBQW5CLENBQWI7QUFDQSxnQkFBTUMsUUFBUSxJQUFkO0FBQ0FDLG1CQUFPQyxJQUFQLENBQVlGLE1BQU1OLEtBQU4sQ0FBWVMsS0FBWixDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQXRDLEVBQW9EQyxPQUFwRCxDQUE0RCxVQUFDQyxHQUFELEVBQVM7QUFDakUsb0JBQUlDLFVBQVVSLE1BQU1OLEtBQU4sQ0FBWVMsS0FBWixDQUFrQkMsT0FBbEIsQ0FBMEJDLFlBQTFCLENBQXVDRSxHQUF2QyxDQUFkO0FBQ0FDLHdCQUFRQyxRQUFSLEdBQW1CLElBQW5C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Q0FBVytDLFdBQVgsQ0FBdUJnRCxPQUFPekQsVUFBOUI7QUFDQSxpQkFBS3RDLEtBQUwsQ0FBV2dELEtBQVgsQ0FBaUIrQyxPQUFPM0QsT0FBeEI7O0FBRUEsaUJBQUtsQyxRQUFMLENBQWNnQixJQUFkLElBQXNCLElBQXRCO0FBQ0E2RSxxQkFBUyxJQUFUO0FBQ0g7Ozs0QkFFYTtBQUNWLG1CQUFPLEtBQUs3RixRQUFaO0FBQ0g7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUtDLE9BQVo7QUFDSDs7OzRCQUVVO0FBQ1AsbUJBQU8sS0FBS0gsS0FBTCxDQUFXMEIsSUFBbEI7QUFDSDs7Ozs7O2tCQUdVM0IsUSIsImZpbGUiOiJub2Rlcy9zdG9yYWdlL0xNREJOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHV1aWQ0IGZyb20gJ3V1aWQ0JztcbmltcG9ydCB0aHJvdWdoIGZyb20gJ3Rocm91Z2gnO1xuXG5pbXBvcnQgQmFzZU5vZGUgZnJvbSAnLi4vQmFzZU5vZGUnO1xuaW1wb3J0IERhdGFGcmFtZSBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUZyYW1lJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcbmltcG9ydCBMTURCIGZyb20gJy4uLy4uL2lvL2RiL0xNREInO1xuXG5jbGFzcyBMTURCTm9kZSBleHRlbmRzIEJhc2VOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9sbWRiID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY2hhbm5lbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fb3V0cHV0cyA9IHt9O1xuICAgICAgICB0aGlzLl9pbnB1dHMgPSB7fTtcbiAgICB9XG5cbiAgICBvcGVuRGF0YVNldChkYXRhcGF0aCwgcmVhZE9ubHkgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2xtZGIgPSBuZXcgTE1EQihkYXRhcGF0aCwgcmVhZE9ubHkpO1xuICAgICAgICBjb25zdCBfdGhpcyA9IHRoaXM7XG4gICAgICAgIE9iamVjdC5rZXlzKF90aGlzLl9sbWRiLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsID0gX3RoaXMuX2xtZGIuX21ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNba2V5XTtcbiAgICAgICAgICAgIGNoYW5uZWwuX2lzRGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgY2hhbm5lbC50aW1lUmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgY2hhbm5lbC52YWx1ZVJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIGNoYW5uZWwudXVpZCA9IGtleTtcbiAgICAgICAgICAgIF90aGlzLl9jaGFubmVsc1trZXldID0gY2hhbm5lbDtcbiAgICAgICAgICAgIF90aGlzLl9jaGFubmVsc1trZXldLnRpbWVSYW5nZSA9IF90aGlzLmdldFRpbWVSYW5nZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjcmVhdGVEYXRhU2V0KGRhdGFwYXRoLCBzaXplR2IgPSAyLCBkYm5hbWUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgX2RibmFtZSA9IGRibmFtZSB8fCBwYXRoLnBhcnNlKGRhdGFwYXRoKS5uYW1lLFxuICAgICAgICAgICAgbWV0YSA9IHtcbiAgICAgICAgICAgICAgICBtYXBTaXplOiBzaXplR2IgKiBNYXRoLnBvdygxMDI0LCAzKSxcbiAgICAgICAgICAgICAgICBtYXhEYnM6IDEwLFxuICAgICAgICAgICAgICAgIERhdGFTZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IF9kYm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIERhdGFDaGFubmVsczoge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGF0YXBhdGgpKSB7XG4gICAgICAgICAgICBmcy5ta2RpclN5bmMoZGF0YXBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xtZGIgPSBuZXcgTE1EQihkYXRhcGF0aCwgZmFsc2UsIG1ldGEpO1xuICAgIH1cblxuICAgIGdldFRpbWVSYW5nZShjaGFubmVsS2V5KSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9sbWRiICE9PSBudWxsKTtcblxuICAgICAgICBsZXQgY2hhbm5lbCA9IHRoaXMuX2NoYW5uZWxzW2NoYW5uZWxLZXldO1xuXG4gICAgICAgIGlmIChjaGFubmVsLnRpbWVSYW5nZSAmJiAhY2hhbm5lbC5faXNEaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWwudGltZVJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCB0eG5VVUlEID0gX3NlbGYuX2xtZGIuYmVnaW4oY2hhbm5lbEtleSk7XG4gICAgICAgIGNvbnN0IGN1cnNvclVVSUQgPSBfc2VsZi5fbG1kYi5jdXJzb3IoY2hhbm5lbEtleSwgdHhuVVVJRCk7XG5cbiAgICAgICAgX3NlbGYuX2xtZGIuZ290b0ZpcnN0KGN1cnNvclVVSUQpO1xuICAgICAgICBsZXQgc3RhcnQgPSBfc2VsZi5fbG1kYi5nZXRDdXJyZW50S2V5VmFsdWUoY2hhbm5lbEtleSwgY3Vyc29yVVVJRCk7XG5cbiAgICAgICAgX3NlbGYuX2xtZGIuZ290b0xhc3QoY3Vyc29yVVVJRCk7XG4gICAgICAgIGxldCBlbmQgPSBfc2VsZi5fbG1kYi5nZXRDdXJyZW50S2V5VmFsdWUoY2hhbm5lbEtleSwgY3Vyc29yVVVJRCk7XG5cbiAgICAgICAgbGV0IHN0YXJ0VGltZSA9IG5ldyBUaW1lKHN0YXJ0LmtleSwgJ21zJyksXG4gICAgICAgICAgICBlbmRUaW1lID0gbmV3IFRpbWUoZW5kLmtleSwgJ21zJyk7XG5cbiAgICAgICAgX3NlbGYuX2xtZGIuY2xvc2VDdXJzb3IoY3Vyc29yVVVJRCk7XG4gICAgICAgIF9zZWxmLl9sbWRiLmFib3J0KHR4blVVSUQpO1xuXG4gICAgICAgIGNoYW5uZWwudGltZVJhbmdlID0geyBzdGFydDogc3RhcnRUaW1lLCBlbmQ6IGVuZFRpbWUgfTtcbiAgICAgICAgcmV0dXJuIGNoYW5uZWwudGltZVJhbmdlO1xuICAgIH1cblxuICAgIGdldFZhbHVlUmFuZ2VzKGNoYW5uZWxLZXkpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2xtZGIgIT09IG51bGwpO1xuXG4gICAgICAgIGxldCBjaGFubmVsID0gdGhpcy5fY2hhbm5lbHNbY2hhbm5lbEtleV07XG5cbiAgICAgICAgaWYgKGNoYW5uZWwudmFsdWVSYW5nZSAmJiAhY2hhbm5lbC5faXNEaXJ0eSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWwudmFsdWVSYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgdHhuVVVJRCA9IF9zZWxmLl9sbWRiLmJlZ2luKGNoYW5uZWxLZXkpO1xuICAgICAgICBjb25zdCBjdXJzb3JVVUlEID0gX3NlbGYuX2xtZGIuY3Vyc29yKGNoYW5uZWxLZXksIHR4blVVSUQpO1xuXG4gICAgICAgIGxldCB1bml0cyA9IGNoYW5uZWwudW5pdHMsXG4gICAgICAgICAgICBtYXggPSBuZXcgQXJyYXkoY2hhbm5lbC50eXBlLmxlbmd0aCkuZmlsbChOdW1iZXIuTUlOX1ZBTFVFKSxcbiAgICAgICAgICAgIG1pbiA9IG5ldyBBcnJheShjaGFubmVsLnR5cGUubGVuZ3RoKS5maWxsKE51bWJlci5NQVhfVkFMVUUpO1xuXG4gICAgICAgIGZvciAodmFyIGZvdW5kID0gX3NlbGYuX2xtZGIuZ290b0ZpcnN0KGN1cnNvclVVSUQpOyBmb3VuZDsgZm91bmQgPSBfc2VsZi5fbG1kYi5nb3RvTmV4dChjdXJzb3JVVUlEKSkge1xuICAgICAgICAgICAgbGV0IHZhbHMgPSBfc2VsZi5fbG1kYi5nZXRDdXJyZW50VmFsdWUoY2hhbm5lbEtleSwgY3Vyc29yVVVJRCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIHZhbHMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsc1tpXSA+IG1heFtpXSkge1xuICAgICAgICAgICAgICAgICAgICBtYXhbaV0gPSB2YWxzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmFsc1tpXSA8IG1pbltpXSkge1xuICAgICAgICAgICAgICAgICAgICBtaW5baV0gPSB2YWxzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIF9zZWxmLl9sbWRiLmNsb3NlQ3Vyc29yKGN1cnNvclVVSUQpO1xuICAgICAgICBfc2VsZi5fbG1kYi5hYm9ydCh0eG5VVUlEKTtcblxuICAgICAgICBjaGFubmVsLnZhbHVlUmFuZ2UgPSB7IG1pbjogbWluLm1hcCgodmFsLCBpKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFZvbHRhZ2UodmFsLCB1bml0c1tpXSk7XG4gICAgICAgIH0pLCBtYXg6IG1heC5tYXAoKHZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBWb2x0YWdlKHZhbCwgdW5pdHNbaV0pO1xuICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBjaGFubmVsLnZhbHVlUmFuZ2U7XG4gICAgfVxuXG4gICAgY3JlYXRlSW5wdXQoZGF0YUxheW91dCwgc3RvcmVGcmFtZXMgPSBmYWxzZSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fbG1kYiAhPT0gbnVsbCk7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgZGF0YUxheW91dCA9PT0gJ29iamVjdCcpO1xuXG4gICAgICAgIGlmIChzdG9yZUZyYW1lcykge1xuICAgICAgICAgICAgYXNzZXJ0KE9iamVjdC5rZXlzKGRhdGFMYXlvdXQpLmxlbmd0aCA9PT0gMSwgJ09ubHkgY3JlYXRlIGEgc2luZ2xlIGNoYW5uZWwgd2hlbiBzdG9yaW5nIGZyYW1lcy4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgT2JqZWN0LmtleXMoZGF0YUxheW91dCkubWFwKChjaGFubmVsS2V5KSA9PiB7XG4gICAgICAgICAgICBfc2VsZi5fbG1kYi5tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2NoYW5uZWxLZXldID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M6IHN0b3JlRnJhbWVzID8gJ0RhdGFGcmFtZScgOiAnRGF0YUV2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogc3RvcmVGcmFtZXMgPyAnRmxvYXQzMicgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBsZW5ndGg6IHN0b3JlRnJhbWVzID8gZGF0YUxheW91dFtjaGFubmVsS2V5XS5sYWJlbHMubGVuZ3RoIDogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAga2V5U2l6ZTogMTYsXG4gICAgICAgICAgICAgICAga2V5UHJlY2lzaW9uOiA2LFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhTGF5b3V0W2NoYW5uZWxLZXldLnRpdGxlIHx8IGNoYW5uZWxLZXksXG4gICAgICAgICAgICAgICAga2V5VW5pdDogZGF0YUxheW91dFtjaGFubmVsS2V5XS5rZXlVbml0LFxuICAgICAgICAgICAgICAgIHVuaXRzOiBzdG9yZUZyYW1lcyA/IGRhdGFMYXlvdXRbY2hhbm5lbEtleV0udW5pdHMgOiBbXSxcbiAgICAgICAgICAgICAgICBsYWJlbHM6IHN0b3JlRnJhbWVzID8gZGF0YUxheW91dFtjaGFubmVsS2V5XS5sYWJlbHMgOiBbXSxcbiAgICAgICAgICAgICAgICB1dWlkczogW11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLl9sbWRiLl9tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBjaGFubmVsID0gdGhpcy5fbG1kYi5fbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1trZXldO1xuICAgICAgICAgICAgY2hhbm5lbC5faXNEaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICBjaGFubmVsLnRpbWVSYW5nZSA9IG51bGw7XG4gICAgICAgICAgICBjaGFubmVsLnZhbHVlUmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgY2hhbm5lbC51dWlkID0ga2V5O1xuICAgICAgICAgICAgdGhpcy5fY2hhbm5lbHNba2V5XSA9IGNoYW5uZWw7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBpbnB1dCA9IHtcbiAgICAgICAgICAgIHV1aWQ6IHV1aWQ0KCksXG4gICAgICAgICAgICBkYjogdGhpcy5fbG1kYi5fbWV0YS5EYXRhU2V0LnRpdGxlLFxuICAgICAgICAgICAgc3RyZWFtOiB0aHJvdWdoKCksXG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcG9zaXRpb246IDBcbiAgICAgICAgfTtcblxuICAgICAgICBpbnB1dC50eG5VVUlEID0gdGhpcy5fbG1kYi5iZWdpbihpbnB1dC5kYiwgZmFsc2UpO1xuXG4gICAgICAgIGlucHV0LnN0cmVhbS5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YS5tYXAoKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRnJhbWUgJiYgc3RvcmVGcmFtZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2xtZGIucHV0KF9zZWxmLl9sbWRiLl9tZXRhLkRhdGFTZXQudGl0bGUsIGlucHV0LnR4blVVSUQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUV2ZW50ICYmICFzdG9yZUZyYW1lcykge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5fbG1kYi5wdXQoX3NlbGYuX2xtZGIuX21ldGEuRGF0YVNldC50aXRsZSwgaW5wdXQudHhuVVVJRCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0YXRzKCdpbicsIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpbnB1dC5zdHJlYW0ub25jZSgnZW5kJywgKCkgPT4ge1xuICAgICAgICAgICAgX3NlbGYuX2xtZGIuY29tbWl0KGlucHV0LnR4blVVSUQpO1xuICAgICAgICAgICAgcmV0dXJuIF9zZWxmLl9sbWRiLl91cGRhdGVNZXRhKClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLmVtaXQoJ2RvbmUnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlucHV0LnN0cmVhbS5vbmNlKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgICAgIF9zZWxmLmVtaXQoJ2Vycm9yJywgYExNREIgaW5wdXQgZXJyb3IgJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIF9zZWxmLl9sbWRiLmNvbW1pdChpbnB1dC50eG5VVUlEKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faW5wdXRzW2lucHV0LnV1aWRdID0gaW5wdXQ7XG4gICAgICAgIHJldHVybiBpbnB1dC51dWlkO1xuICAgIH1cblxuICAgIGNyZWF0ZU91dHB1dChjaGFubmVsS2V5LCBzdGFydFRpbWUgPSBuZXcgVGltZSgwLjApLCBlbmRUaW1lID0gbmV3IFRpbWUoMC4wKSwgY29udmVydEZyYW1lcyA9IGZhbHNlKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9sbWRiICE9PSBudWxsKTtcblxuICAgICAgICBhc3NlcnQodHlwZW9mIGNoYW5uZWxLZXkgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX2NoYW5uZWxzLmhhc093blByb3BlcnR5KGNoYW5uZWxLZXkpKTtcblxuICAgICAgICBsZXQgb3V0cHV0ID0ge1xuICAgICAgICAgICAgdXVpZDogdXVpZDQoKSxcbiAgICAgICAgICAgIGRiOiBjaGFubmVsS2V5LFxuICAgICAgICAgICAgc3RyZWFtOiB0aHJvdWdoKCksXG4gICAgICAgICAgICBjb252ZXJ0RnJhbWVzOiBjb252ZXJ0RnJhbWVzLFxuICAgICAgICAgICAgaGFzTmV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lLFxuICAgICAgICAgICAgZW5kVGltZTogZW5kVGltZSxcbiAgICAgICAgICAgIGN1cnJlbnRLZXk6IG51bGwsXG4gICAgICAgICAgICBwYXVzZWQ6IGZhbHNlLFxuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICBldmVudEJ1ZmZlcjogW11cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9vdXRwdXRzW291dHB1dC51dWlkXSA9IG91dHB1dDtcblxuICAgICAgICBvdXRwdXQudHhuVVVJRCA9IHRoaXMuX2xtZGIuYmVnaW4ob3V0cHV0LmRiKTtcbiAgICAgICAgb3V0cHV0LmN1cnNvclVVSUQgPSB0aGlzLl9sbWRiLmN1cnNvcihvdXRwdXQuZGIsIG91dHB1dC50eG5VVUlEKTtcblxuICAgICAgICByZXR1cm4gb3V0cHV0LnV1aWQ7XG4gICAgfVxuXG4gICAgc3RhcnRPdXRwdXQodXVpZCkge1xuICAgICAgICBpZiAoIXRoaXMuX291dHB1dHNbdXVpZF0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnQodGhpcy5fb3V0cHV0c1t1dWlkXSBpbnN0YW5jZW9mIE9iamVjdCk7XG4gICAgICAgIGNvbnN0IG91dHB1dCA9IHRoaXMuX291dHB1dHNbdXVpZF0sXG4gICAgICAgICAgICBfc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKG91dHB1dC5jdXJyZW50S2V5KSB7XG4gICAgICAgICAgICB0aGlzLl9sbWRiLmdvdG9LZXkob3V0cHV0LmRiLCBvdXRwdXQuY3Vyc29yVVVJRCwgb3V0cHV0LmN1cnJlbnRLZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbG1kYi5nb3RvUmFuZ2Uob3V0cHV0LmRiLCBvdXRwdXQuY3Vyc29yVVVJRCwgb3V0cHV0LnN0YXJ0VGltZSk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFzdFR5cGU7XG4gICAgICAgIHdoaWxlICghb3V0cHV0LnN0cmVhbS5wYXVzZWQpIHtcbiAgICAgICAgICAgIGlmIChvdXRwdXQuZXZlbnRCdWZmZXIubGVuZ3RoID09PSAwICYmIG91dHB1dC5oYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKG91dHB1dC5jb252ZXJ0RnJhbWVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dC5ldmVudEJ1ZmZlciA9IHRoaXMuX2xtZGIuZ2V0Q3VycmVudEV2ZW50cyhvdXRwdXQuZGIsIG91dHB1dC5jdXJzb3JVVUlEKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQuZXZlbnRCdWZmZXIgPSBbdGhpcy5fbG1kYi5nZXRDdXJyZW50RnJhbWUob3V0cHV0LmRiLCBvdXRwdXQuY3Vyc29yVVVJRCldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBvdXRwdXQuY3VycmVudEtleSA9IHRoaXMuX2xtZGIuZ290b05leHQob3V0cHV0LmN1cnNvclVVSUQpO1xuICAgICAgICAgICAgICAgIGlmICghb3V0cHV0LmN1cnJlbnRLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0Lmhhc05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG91dHB1dC5ldmVudEJ1ZmZlci5sZW5ndGggPT09IDAgJiYgIW91dHB1dC5oYXNOZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kT3V0cHV0KHV1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG91dHB1dC5ldmVudEJ1ZmZlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50ID0gb3V0cHV0LmV2ZW50QnVmZmVyLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKG91dHB1dC5lbmRUaW1lLm5vcm1hbGl6ZWQoKSA+IDAgJiYgZXZlbnQudGltZS5ub3JtYWxpemVkKCkgPj0gb3V0cHV0LmVuZFRpbWUubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZE91dHB1dCh1dWlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgb3V0cHV0LnN0cmVhbS5xdWV1ZShldmVudCk7XG4gICAgICAgICAgICAgICAgbGFzdFR5cGUgPSBldmVudC5jb25zdHJ1Y3Rvci5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RhdHMoJ291dCcsIGxhc3RUeXBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3NlbGYuc3RhcnRPdXRwdXQodXVpZCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBlbmRPdXRwdXQodXVpZCkge1xuICAgICAgICBsZXQgb3V0cHV0ID0gdGhpcy5fb3V0cHV0c1t1dWlkXTtcbiAgICAgICAgYXNzZXJ0KG91dHB1dCBpbnN0YW5jZW9mIE9iamVjdCk7XG5cbiAgICAgICAgb3V0cHV0LnN0cmVhbS5xdWV1ZShudWxsKTtcbiAgICAgICAgdGhpcy5hZGRTdGF0cygnb3V0JywgJ251bGwnLCAwKTtcblxuICAgICAgICB0aGlzLl9sbWRiLmNsb3NlQ3Vyc29yKG91dHB1dC5jdXJzb3JVVUlEKTtcbiAgICAgICAgdGhpcy5fbG1kYi5hYm9ydChvdXRwdXQudHhuVVVJRCk7XG5cbiAgICAgICAgdGhpcy5fb3V0cHV0c1t1dWlkXSA9IG51bGw7XG4gICAgICAgIG91dHB1dCA9IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IG91dHB1dHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vdXRwdXRzO1xuICAgIH1cblxuICAgIGdldCBpbnB1dHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dHM7XG4gICAgfVxuXG4gICAgZ2V0IG1ldGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sbWRiLm1ldGE7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBMTURCTm9kZTsiXX0=
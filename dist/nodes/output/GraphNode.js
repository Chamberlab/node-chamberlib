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

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _DataSet = require('../../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _DataPlotter = require('../../graphs/DataPlotter');

var _DataPlotter2 = _interopRequireDefault(_DataPlotter);

var _LineChart = require('../../graphs/layouts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GraphNode = function (_BaseNode) {
    (0, _inherits3.default)(GraphNode, _BaseNode);

    function GraphNode(filepath) {
        (0, _classCallCheck3.default)(this, GraphNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GraphNode.__proto__ || (0, _getPrototypeOf2.default)(GraphNode)).call(this));

        var _self = _this;
        _this._dataSet = new _DataSet2.default([]);
        _this._channels = {};
        _this._dataPlotter = null;
        _this._input = (0, _through2.default)();
        _this._meta = {};

        _this._input.on('data', function (data) {
            if (Array.isArray(data)) {
                data.map(function (event) {
                    _self.processEvent(event);
                });
            } else {
                _self.processEvent(data);
            }
        });

        _this._input.once('end', function () {
            _self.addStats('out', 'null', 0);
            (0, _keys2.default)(_self._channels).forEach(function (key) {
                if (_self._channels[key].size > 0) {
                    _self._dataSet.push(_self._channels[key]);
                }
            });
            _self._dataPlotter = new _DataPlotter2.default(_self._dataSet, _path2.default.parse(filepath).dir, _path2.default.parse(filepath).name);
            return _self._dataPlotter.generateChart(_LineChart2.default).then(function () {
                _self.emit('done');
            }).catch(function (err) {
                _self.emit('error', err);
            });
        });

        _this._input.once('error', function (err) {
            throw new Error('graph stream error', err.message);
        });
        return _this;
    }

    (0, _createClass3.default)(GraphNode, [{
        key: 'processEvent',
        value: function processEvent(event) {
            var _this2 = this;

            var _self = this;
            _self.addStats('in', event.constructor.name);
            if (event instanceof _DataFrame2.default) {
                event.value.map(function (val, i) {
                    var meta = _this2.meta.DataSet.DataChannels[event.parentUUID],
                        uuid = meta.uuids[i];
                    if (!(_self._channels[uuid] instanceof _DataChannel2.default)) {
                        _self._channels[uuid] = new _DataChannel2.default([]);
                        _self._channels[uuid].title = meta.labels[i];
                        _self._channels[uuid].uuid = meta.units[i];
                    }
                    var evt = new _DataEvent2.default(new _Time2.default(event.time.normalized(), meta.keyUnit), new _Voltage2.default(val, meta.units[i]));
                    _self._channels[uuid].push(evt);
                    _self.addStats('in', evt.constructor.name);
                    _self._store += 1;
                });
                return true;
            }
            if (event instanceof _DataEvent2.default) {
                if (!(_self._channels[event.parentUUID] instanceof _DataChannel2.default)) {
                    _self._channels[event.parentUUID] = new _DataChannel2.default([]);
                    _self._channels[event.parentUUID].uuid = event.parentUUID;
                }
                _self._channels[event.parentUUID].push(event);
                _self._store += 1;
                return true;
            }
            return false;
        }
    }, {
        key: 'input',
        get: function get() {
            return this._input;
        }
    }, {
        key: 'meta',
        get: function get() {
            return this._meta;
        },
        set: function set(v) {
            this._meta = v;
        }
    }]);
    return GraphNode;
}(_BaseNode3.default);

exports.default = GraphNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL291dHB1dC9HcmFwaE5vZGUuanMiXSwibmFtZXMiOlsiR3JhcGhOb2RlIiwiZmlsZXBhdGgiLCJfc2VsZiIsIl9kYXRhU2V0IiwiX2NoYW5uZWxzIiwiX2RhdGFQbG90dGVyIiwiX2lucHV0IiwiX21ldGEiLCJvbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJldmVudCIsInByb2Nlc3NFdmVudCIsIm9uY2UiLCJhZGRTdGF0cyIsImZvckVhY2giLCJrZXkiLCJzaXplIiwicHVzaCIsInBhcnNlIiwiZGlyIiwibmFtZSIsImdlbmVyYXRlQ2hhcnQiLCJ0aGVuIiwiZW1pdCIsImNhdGNoIiwiZXJyIiwiRXJyb3IiLCJtZXNzYWdlIiwiY29uc3RydWN0b3IiLCJ2YWx1ZSIsInZhbCIsImkiLCJtZXRhIiwiRGF0YVNldCIsIkRhdGFDaGFubmVscyIsInBhcmVudFVVSUQiLCJ1dWlkIiwidXVpZHMiLCJ0aXRsZSIsImxhYmVscyIsInVuaXRzIiwiZXZ0IiwidGltZSIsIm5vcm1hbGl6ZWQiLCJrZXlVbml0IiwiX3N0b3JlIiwidiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFM7OztBQUNGLHVCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUE7O0FBR2xCLFlBQU1DLGFBQU47QUFDQSxjQUFLQyxRQUFMLEdBQWdCLHNCQUFZLEVBQVosQ0FBaEI7QUFDQSxjQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLGNBQUtDLE1BQUwsR0FBYyx3QkFBZDtBQUNBLGNBQUtDLEtBQUwsR0FBYSxFQUFiOztBQUVBLGNBQUtELE1BQUwsQ0FBWUUsRUFBWixDQUFlLE1BQWYsRUFBdUIsVUFBQ0MsSUFB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QndCLEdBQTNCO0FBQ0ExQywwQkFBTWMsUUFBTixDQUFlLElBQWYsRUFBcUI0QixJQUFJYixXQUFKLENBQWdCUixJQUFyQztBQUNBckIsMEJBQU04QyxNQUFOLElBQWdCLENBQWhCO0FBQ0gsaUJBZEQ7QUFlQSx1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBSW5DLG9DQUFKLEVBQWdDO0FBQzVCLG9CQUFJLEVBQUVYLE1BQU1FLFNBQU4sQ0FBZ0JTLE1BQU15QixVQUF0QixrQ0FBRixDQUFKLEVBQWlFO0FBQzdEcEMsMEJBQU1FLFNBQU4sQ0FBZ0JTLE1BQU15QixVQUF0QixJQUFvQywwQkFBZ0IsRUFBaEIsQ0FBcEM7QUFDQXBDLDBCQUFNRSxTQUFOLENBQWdCUyxNQUFNeUIsVUFBdEIsRUFBa0NDLElBQWxDLEdBQXlDMUIsTUFBTXlCLFVBQS9DO0FBQ0g7QUFDRHBDLHNCQUFNRSxTQUFOLENBQWdCUyxNQUFNeUIsVUFBdEIsRUFBa0NsQixJQUFsQyxDQUF1Q1AsS0FBdkM7QUFDQVgsc0JBQU04QyxNQUFOLElBQWdCLENBQWhCO0FBQ0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsbUJBQU8sS0FBUDtBQUNIOzs7NEJBRVc7QUFDUixtQkFBTyxLQUFLMUMsTUFBWjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLQyxLQUFaO0FBQ0gsUzswQkFFUTBDLEMsRUFBRztBQUNSLGlCQUFLMUMsS0FBTCxHQUFhMEMsQ0FBYjtBQUNIOzs7OztrQkFHVWpELFMiLCJmaWxlIjoibm9kZXMvb3V0cHV0L0dyYXBoTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0aHJvdWdoIGZyb20gJ3Rocm91Z2gnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBCYXNlTm9kZSBmcm9tICcuLi9CYXNlTm9kZSc7XG5pbXBvcnQgRGF0YVNldCBmcm9tICcuLi8uLi9kYXRhL0RhdGFTZXQnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5pbXBvcnQgRGF0YUV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRXZlbnQnO1xuaW1wb3J0IERhdGFGcmFtZSBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUZyYW1lJztcbmltcG9ydCBEYXRhQ2hhbm5lbCBmcm9tICcuLi8uLi9kYXRhL0RhdGFDaGFubmVsJztcbmltcG9ydCBEYXRhUGxvdHRlciBmcm9tICcuLi8uLi9ncmFwaHMvRGF0YVBsb3R0ZXInO1xuaW1wb3J0IExpbmVDaGFydCBmcm9tICcuLi8uLi9ncmFwaHMvbGF5b3V0cy9MaW5lQ2hhcnQnO1xuXG5jbGFzcyBHcmFwaE5vZGUgZXh0ZW5kcyBCYXNlTm9kZSB7XG4gICAgY29uc3RydWN0b3IoZmlsZXBhdGgpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2RhdGFTZXQgPSBuZXcgRGF0YVNldChbXSk7XG4gICAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgICAgIHRoaXMuX2RhdGFQbG90dGVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5wdXQgPSB0aHJvdWdoKCk7XG4gICAgICAgIHRoaXMuX21ldGEgPSB7fTtcblxuICAgICAgICB0aGlzLl9pbnB1dC5vbignZGF0YScsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgICAgIGRhdGEubWFwKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5wcm9jZXNzRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5wcm9jZXNzRXZlbnQoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2lucHV0Lm9uY2UoJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF9zZWxmLmFkZFN0YXRzKCdvdXQnLCAnbnVsbCcsIDApO1xuICAgICAgICAgICAgT2JqZWN0LmtleXMoX3NlbGYuX2NoYW5uZWxzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoX3NlbGYuX2NoYW5uZWxzW2tleV0uc2l6ZSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2RhdGFTZXQucHVzaChfc2VsZi5fY2hhbm5lbHNba2V5XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBfc2VsZi5fZGF0YVBsb3R0ZXIgPSBuZXcgRGF0YVBsb3R0ZXIoX3NlbGYuX2RhdGFTZXQsXG4gICAgICAgICAgICAgICAgcGF0aC5wYXJzZShmaWxlcGF0aCkuZGlyLCBwYXRoLnBhcnNlKGZpbGVwYXRoKS5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBfc2VsZi5fZGF0YVBsb3R0ZXIuZ2VuZXJhdGVDaGFydChMaW5lQ2hhcnQpXG4gICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5lbWl0KCdkb25lJyk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5lbWl0KCdlcnJvcicsIGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2lucHV0Lm9uY2UoJ2Vycm9yJywgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdncmFwaCBzdHJlYW0gZXJyb3InLCBlcnIubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb2Nlc3NFdmVudChldmVudCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIF9zZWxmLmFkZFN0YXRzKCdpbicsIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRnJhbWUpIHtcbiAgICAgICAgICAgIGV2ZW50LnZhbHVlLm1hcCgodmFsLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IG1ldGEgPSB0aGlzLm1ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZXZlbnQucGFyZW50VVVJRF0sXG4gICAgICAgICAgICAgICAgICAgIHV1aWQgPSBtZXRhLnV1aWRzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghKF9zZWxmLl9jaGFubmVsc1t1dWlkXSBpbnN0YW5jZW9mIERhdGFDaGFubmVsKSkge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5fY2hhbm5lbHNbdXVpZF0gPSBuZXcgRGF0YUNoYW5uZWwoW10pO1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5fY2hhbm5lbHNbdXVpZF0udGl0bGUgPSBtZXRhLmxhYmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW3V1aWRdLnV1aWQgPSBtZXRhLnVuaXRzW2ldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgZXZ0ID0gbmV3IERhdGFFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRpbWUoZXZlbnQudGltZS5ub3JtYWxpemVkKCksIG1ldGEua2V5VW5pdCksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBWb2x0YWdlKHZhbCwgbWV0YS51bml0c1tpXSkpO1xuICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1t1dWlkXS5wdXNoKGV2dCk7XG4gICAgICAgICAgICAgICAgX3NlbGYuYWRkU3RhdHMoJ2luJywgZXZ0LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgICAgIF9zZWxmLl9zdG9yZSArPSAxO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghKF9zZWxmLl9jaGFubmVsc1tldmVudC5wYXJlbnRVVUlEXSBpbnN0YW5jZW9mIERhdGFDaGFubmVsKSkge1xuICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1tldmVudC5wYXJlbnRVVUlEXSA9IG5ldyBEYXRhQ2hhbm5lbChbXSk7XG4gICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW2V2ZW50LnBhcmVudFVVSURdLnV1aWQgPSBldmVudC5wYXJlbnRVVUlEO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW2V2ZW50LnBhcmVudFVVSURdLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgX3NlbGYuX3N0b3JlICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQ7XG4gICAgfVxuXG4gICAgZ2V0IG1ldGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tZXRhO1xuICAgIH1cblxuICAgIHNldCBtZXRhKHYpIHtcbiAgICAgICAgdGhpcy5fbWV0YSA9IHY7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBHcmFwaE5vZGU7Il19
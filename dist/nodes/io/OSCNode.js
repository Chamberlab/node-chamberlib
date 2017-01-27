'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _OSC = require('../../io/net/OSC');

var _OSC2 = _interopRequireDefault(_OSC);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _BaseQuantity = require('../../quantities/base/BaseQuantity');

var _BaseQuantity2 = _interopRequireDefault(_BaseQuantity);

var _Unit = require('../../quantities/base/Unit');

var _Unit2 = _interopRequireDefault(_Unit);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OSCNode = function (_BaseNode) {
    (0, _inherits3.default)(OSCNode, _BaseNode);

    function OSCNode(localPort) {
        var localIp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '127.0.0.1';
        var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        (0, _classCallCheck3.default)(this, OSCNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OSCNode.__proto__ || (0, _getPrototypeOf2.default)(OSCNode)).call(this));

        _this._inputPort = new _OSC2.default();
        _this._inputPort.initUDP(localPort, localIp, broadcast);

        _this._channels = {};
        return _this;
    }

    (0, _createClass3.default)(OSCNode, [{
        key: 'enableMessageReceive',
        value: function enableMessageReceive() {
            var _this2 = this;

            var _self = this;
            this._inputPort.enableMessageReceive(function (data) {
                _this2.addStats('in', 'OSCMessage');
                var valueCount = data.args ? data.args.length : 0;
                if (!(_self._channels[data.address] instanceof Object)) {
                    _self._channels[data.address] = {
                        title: data.address,
                        uuid: (0, _uuid2.default)(),
                        events: []
                    };
                    _self.emit('addchannel', _self._channels[data.address]);
                }
                var time = new _Time2.default(Date.now() * 0.001, 's');
                if (valueCount === 1) {
                    var quantity = new _BaseQuantity2.default(data.args[0], new _Unit2.default()),
                        event = new _DataEvent2.default(time, quantity);
                    event.parentUUID = _self._channels[data.address].uuid;
                    _this2.addStats('out', event.constructor.name);
                    return event;
                } else {
                    // TODO: implement n-dimensional values
                }
            });
        }
    }, {
        key: 'disable',
        value: function disable() {
            this._inputPort.disable();
        }
    }, {
        key: 'input',
        get: function get() {
            return this._inputPort.stream;
        }
    }, {
        key: 'output',
        get: function get() {
            return this._inputPort.stream;
        }
    }]);
    return OSCNode;
}(_BaseNode3.default);

exports.default = OSCNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL2lvL09TQ05vZGUuanMiXSwibmFtZXMiOlsiT1NDTm9kZSIsImxvY2FsUG9ydCIsImxvY2FsSXAiLCJicm9hZGNhc3QiLCJfaW5wdXRQb3J0IiwiaW5pdFVEUCIsIl9jaGFubmVscyIsIl9zZWxmIiwiZW5hYmxlTWVzc2FnZVJlY2VpdmUiLCJkYXRhIiwiYWRkU3RhdHMiLCJ2YWx1ZUNvdW50IiwiYXJncyIsImxlbmd0aCIsImFkZHJlc3MiLCJPYmplY3QiLCJ0aXRsZSIsInV1aWQiLCJldmVudHMiLCJlbWl0IiwidGltZSIsIkRhdGUiLCJub3ciLCJxdWFudGl0eSIsImV2ZW50IiwicGFyZW50VVVJRCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImRpc2FibGUiLCJzdHJlYW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxPOzs7QUFDRixxQkFBWUMsU0FBWixFQUFpRTtBQUFBLFlBQTFDQyxPQUEwQyx1RUFBaEMsV0FBZ0M7QUFBQSxZQUFuQkMsU0FBbUIsdUVBQVAsS0FBTztBQUFBOztBQUFBOztBQUc3RCxjQUFLQyxVQUFMLEdBQWtCLG1CQUFsQjtBQUNBLGNBQUtBLFVBQUwsQ0FBZ0JDLE9BQWhCLENBQXdCSixTQUF4QixFQUFtQ0MsT0FBbkMsRUFBNENDLFNBQTVDOztBQUVBLGNBQUtHLFNBQUwsR0FBaUIsRUFBakI7QUFONkQ7QUFPaEU7Ozs7K0NBRXNCO0FBQUE7O0FBQ25CLGdCQUFNQyxRQUFRLElBQWQ7QUFDQSxpQkFBS0gsVUFBTCxDQUFnQkksb0JBQWhCLENBQXFDLFVBQUNDLElBQUQsRUFBVTtBQUMzQyx1QkFBS0MsUUFBTCxDQUFjLElBQWQsRUFBb0IsWUFBcEI7QUFDQSxvQkFBSUMsYUFBYUYsS0FBS0csSUFBTCxHQUFZSCxLQUFLRyxJQUFMLENBQVVDLE1BQXRCLEdBQStCLENBQWhEO0FBQ0Esb0JBQUksRUFBRU4sTUFBTUQsU0FBTixDQUFnQkcsS0FBS0ssT0FBckIsYUFBeUNDLE1BQTNDLENBQUosRUFBd0Q7QUFDcERSLDBCQUFNRCxTQUFOLENBQWdCRyxLQUFLSyxPQUFyQixJQUFnQztBQUM1QkUsK0JBQU9QLEtBQUtLLE9BRGdCO0FBRTVCRyw4QkFBTSxxQkFGc0I7QUFHNUJDLGdDQUFRO0FBSG9CLHFCQUFoQztBQUtBWCwwQkFBTVksSUFBTixDQUFXLFlBQVgsRUFBeUJaLE1BQU1ELFNBQU4sQ0FBZ0JHLEtBQUtLLE9BQXJCLENBQXpCO0FBQ0g7QUFDRCxvQkFBSU0sT0FBTyxtQkFBU0MsS0FBS0MsR0FBTCxLQUFhLEtBQXRCLEVBQTZCLEdBQTdCLENBQVg7QUFDQSxvQkFBSVgsZUFBZSxDQUFuQixFQUFzQjtBQUNsQix3QkFBSVksV0FBVywyQkFBaUJkLEtBQUtHLElBQUwsQ0FBVSxDQUFWLENBQWpCLEVBQStCLG9CQUEvQixDQUFmO0FBQUEsd0JBQ0lZLFFBQVEsd0JBQWNKLElBQWQsRUFBb0JHLFFBQXBCLENBRFo7QUFFQUMsMEJBQU1DLFVBQU4sR0FBbUJsQixNQUFNRCxTQUFOLENBQWdCRyxLQUFLSyxPQUFyQixFQUE4QkcsSUFBakQ7QUFDQSwyQkFBS1AsUUFBTCxDQUFjLEtBQWQsRUFBcUJjLE1BQU1FLFdBQU4sQ0FBa0JDLElBQXZDO0FBQ0EsMkJBQU9ILEtBQVA7QUFDSCxpQkFORCxNQU1PO0FBQ0g7QUFDSDtBQUNKLGFBckJEO0FBc0JIOzs7a0NBRVM7QUFDTixpQkFBS3BCLFVBQUwsQ0FBZ0J3QixPQUFoQjtBQUNIOzs7NEJBRVc7QUFDUixtQkFBTyxLQUFLeEIsVUFBTCxDQUFnQnlCLE1BQXZCO0FBQ0g7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUt6QixVQUFMLENBQWdCeUIsTUFBdkI7QUFDSDs7Ozs7a0JBSVU3QixPIiwiZmlsZSI6Im5vZGVzL2lvL09TQ05vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdXVpZDQgZnJvbSAndXVpZDQnO1xuXG5pbXBvcnQgQmFzZU5vZGUgZnJvbSAnLi4vQmFzZU5vZGUnO1xuaW1wb3J0IE9TQyBmcm9tICcuLi8uLi9pby9uZXQvT1NDJztcbmltcG9ydCBUaW1lIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVGltZSc7XG5pbXBvcnQgQmFzZVF1YW50aXR5IGZyb20gJy4uLy4uL3F1YW50aXRpZXMvYmFzZS9CYXNlUXVhbnRpdHknO1xuaW1wb3J0IFVuaXQgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9iYXNlL1VuaXQnO1xuaW1wb3J0IERhdGFFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUV2ZW50JztcblxuY2xhc3MgT1NDTm9kZSBleHRlbmRzIEJhc2VOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcihsb2NhbFBvcnQsIGxvY2FsSXAgPSAnMTI3LjAuMC4xJywgYnJvYWRjYXN0ID0gZmFsc2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9pbnB1dFBvcnQgPSBuZXcgT1NDKCk7XG4gICAgICAgIHRoaXMuX2lucHV0UG9ydC5pbml0VURQKGxvY2FsUG9ydCwgbG9jYWxJcCwgYnJvYWRjYXN0KTtcblxuICAgICAgICB0aGlzLl9jaGFubmVscyA9IHt9O1xuICAgIH1cblxuICAgIGVuYWJsZU1lc3NhZ2VSZWNlaXZlKCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2lucHV0UG9ydC5lbmFibGVNZXNzYWdlUmVjZWl2ZSgoZGF0YSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5hZGRTdGF0cygnaW4nLCAnT1NDTWVzc2FnZScpO1xuICAgICAgICAgICAgbGV0IHZhbHVlQ291bnQgPSBkYXRhLmFyZ3MgPyBkYXRhLmFyZ3MubGVuZ3RoIDogMDtcbiAgICAgICAgICAgIGlmICghKF9zZWxmLl9jaGFubmVsc1tkYXRhLmFkZHJlc3NdIGluc3RhbmNlb2YgT2JqZWN0KSkge1xuICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1tkYXRhLmFkZHJlc3NdID0ge1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogZGF0YS5hZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICB1dWlkOiB1dWlkNCgpLFxuICAgICAgICAgICAgICAgICAgICBldmVudHM6IFtdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBfc2VsZi5lbWl0KCdhZGRjaGFubmVsJywgX3NlbGYuX2NoYW5uZWxzW2RhdGEuYWRkcmVzc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IHRpbWUgPSBuZXcgVGltZShEYXRlLm5vdygpICogMC4wMDEsICdzJyk7XG4gICAgICAgICAgICBpZiAodmFsdWVDb3VudCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCBxdWFudGl0eSA9IG5ldyBCYXNlUXVhbnRpdHkoZGF0YS5hcmdzWzBdLCBuZXcgVW5pdCgpKSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRGF0YUV2ZW50KHRpbWUsIHF1YW50aXR5KTtcbiAgICAgICAgICAgICAgICBldmVudC5wYXJlbnRVVUlEID0gX3NlbGYuX2NoYW5uZWxzW2RhdGEuYWRkcmVzc10udXVpZDtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFN0YXRzKCdvdXQnLCBldmVudC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZlbnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IGltcGxlbWVudCBuLWRpbWVuc2lvbmFsIHZhbHVlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLl9pbnB1dFBvcnQuZGlzYWJsZSgpO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0UG9ydC5zdHJlYW07XG4gICAgfVxuXG4gICAgZ2V0IG91dHB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0UG9ydC5zdHJlYW07XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9TQ05vZGU7Il19
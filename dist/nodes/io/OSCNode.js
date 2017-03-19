'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OSCNode = function (_BaseNode) {
    _inherits(OSCNode, _BaseNode);

    function OSCNode(localPort) {
        var localIp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '127.0.0.1';
        var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        _classCallCheck(this, OSCNode);

        var _this = _possibleConstructorReturn(this, (OSCNode.__proto__ || Object.getPrototypeOf(OSCNode)).call(this));

        _this._inputPort = new _OSC2.default();
        _this._inputPort.initUDP(localPort, localIp, broadcast);

        _this._channels = {};
        return _this;
    }

    _createClass(OSCNode, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL2lvL09TQ05vZGUuanMiXSwibmFtZXMiOlsiT1NDTm9kZSIsImxvY2FsUG9ydCIsImxvY2FsSXAiLCJicm9hZGNhc3QiLCJfaW5wdXRQb3J0IiwiaW5pdFVEUCIsIl9jaGFubmVscyIsIl9zZWxmIiwiZW5hYmxlTWVzc2FnZVJlY2VpdmUiLCJkYXRhIiwiYWRkU3RhdHMiLCJ2YWx1ZUNvdW50IiwiYXJncyIsImxlbmd0aCIsImFkZHJlc3MiLCJPYmplY3QiLCJ0aXRsZSIsInV1aWQiLCJldmVudHMiLCJlbWl0IiwidGltZSIsIkRhdGUiLCJub3ciLCJxdWFudGl0eSIsImV2ZW50IiwicGFyZW50VVVJRCIsImNvbnN0cnVjdG9yIiwibmFtZSIsImRpc2FibGUiLCJzdHJlYW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxPOzs7QUFDRixxQkFBWUMsU0FBWixFQUFpRTtBQUFBLFlBQTFDQyxPQUEwQyx1RUFBaEMsV0FBZ0M7QUFBQSxZQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFBQTs7QUFBQTs7QUFHN0QsY0FBS0MsVUFBTCxHQUFrQixtQkFBbEI7QUFDQSxjQUFLQSxVQUFMLENBQWdCQyxPQUFoQixDQUF3QkosU0FBeEIsRUFBbUNDLE9BQW5DLEVBQTRDQyxTQUE1Qzs7QUFFQSxjQUFLRyxTQUFMLEdBQWlCLEVBQWpCO0FBTjZEO0FBT2hFOzs7OytDQUVzQjtBQUFBOztBQUNuQixnQkFBTUMsUUFBUSxJQUFkO0FBQ0EsaUJBQUtILFVBQUwsQ0FBZ0JJLG9CQUFoQixDQUFxQyxVQUFDQyxJQUFELEVBQVU7QUFDM0MsdUJBQUtDLFFBQUwsQ0FBYyxJQUFkLEVBQW9CLFlBQXBCO0FBQ0Esb0JBQUlDLGFBQWFGLEtBQUtHLElBQUwsR0FBWUgsS0FBS0csSUFBTCxDQUFVQyxNQUF0QixHQUErQixDQUFoRDtBQUNBLG9CQUFJLEVBQUVOLE1BQU1ELFNBQU4sQ0FBZ0JHLEtBQUtLLE9BQXJCLGFBQXlDQyxNQUEzQyxDQUFKLEVBQXdEO0FBQ3BEUiwwQkFBTUQsU0FBTixDQUFnQkcsS0FBS0ssT0FBckIsSUFBZ0M7QUFDNUJFLCtCQUFPUCxLQUFLSyxPQURnQjtBQUU1QkcsOEJBQU0scUJBRnNCO0FBRzVCQyxnQ0FBUTtBQUhvQixxQkFBaEM7QUFLQVgsMEJBQU1ZLElBQU4sQ0FBVyxZQUFYLEVBQXlCWixNQUFNRCxTQUFOLENBQWdCRyxLQUFLSyxPQUFyQixDQUF6QjtBQUNIO0FBQ0Qsb0JBQUlNLE9BQU8sbUJBQVNDLEtBQUtDLEdBQUwsS0FBYSxLQUF0QixFQUE2QixHQUE3QixDQUFYO0FBQ0Esb0JBQUlYLGVBQWUsQ0FBbkIsRUFBc0I7QUFDbEIsd0JBQUlZLFdBQVcsMkJBQWlCZCxLQUFLRyxJQUFMLENBQVUsQ0FBVixDQUFqQixFQUErQixvQkFBL0IsQ0FBZjtBQUFBLHdCQUNJWSxRQUFRLHdCQUFjSixJQUFkLEVBQW9CRyxRQUFwQixDQURaO0FBRUFDLDBCQUFNQyxVQUFOLEdBQW1CbEIsTUFBTUQsU0FBTixDQUFnQkcsS0FBS0ssT0FBckIsRUFBOEJHLElBQWpEO0FBQ0EsMkJBQUtQLFFBQUwsQ0FBYyxLQUFkLEVBQXFCYyxNQUFNRSxXQUFOLENBQWtCQyxJQUF2QztBQUNBLDJCQUFPSCxLQUFQO0FBQ0gsaUJBTkQsTUFNTztBQUNIO0FBQ0g7QUFDSixhQXJCRDtBQXNCSDs7O2tDQUVTO0FBQ04saUJBQUtwQixVQUFMLENBQWdCd0IsT0FBaEI7QUFDSDs7OzRCQUVXO0FBQ1IsbUJBQU8sS0FBS3hCLFVBQUwsQ0FBZ0J5QixNQUF2QjtBQUNIOzs7NEJBRVk7QUFDVCxtQkFBTyxLQUFLekIsVUFBTCxDQUFnQnlCLE1BQXZCO0FBQ0g7Ozs7OztrQkFJVTdCLE8iLCJmaWxlIjoibm9kZXMvaW8vT1NDTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB1dWlkNCBmcm9tICd1dWlkNCc7XG5cbmltcG9ydCBCYXNlTm9kZSBmcm9tICcuLi9CYXNlTm9kZSc7XG5pbXBvcnQgT1NDIGZyb20gJy4uLy4uL2lvL25ldC9PU0MnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBCYXNlUXVhbnRpdHkgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9iYXNlL0Jhc2VRdWFudGl0eSc7XG5pbXBvcnQgVW5pdCBmcm9tICcuLi8uLi9xdWFudGl0aWVzL2Jhc2UvVW5pdCc7XG5pbXBvcnQgRGF0YUV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRXZlbnQnO1xuXG5jbGFzcyBPU0NOb2RlIGV4dGVuZHMgQmFzZU5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGxvY2FsUG9ydCwgbG9jYWxJcCA9ICcxMjcuMC4wLjEnLCBicm9hZGNhc3QgPSBmYWxzZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2lucHV0UG9ydCA9IG5ldyBPU0MoKTtcbiAgICAgICAgdGhpcy5faW5wdXRQb3J0LmluaXRVRFAobG9jYWxQb3J0LCBsb2NhbElwLCBicm9hZGNhc3QpO1xuXG4gICAgICAgIHRoaXMuX2NoYW5uZWxzID0ge307XG4gICAgfVxuXG4gICAgZW5hYmxlTWVzc2FnZVJlY2VpdmUoKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5faW5wdXRQb3J0LmVuYWJsZU1lc3NhZ2VSZWNlaXZlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmFkZFN0YXRzKCdpbicsICdPU0NNZXNzYWdlJyk7XG4gICAgICAgICAgICBsZXQgdmFsdWVDb3VudCA9IGRhdGEuYXJncyA/IGRhdGEuYXJncy5sZW5ndGggOiAwO1xuICAgICAgICAgICAgaWYgKCEoX3NlbGYuX2NoYW5uZWxzW2RhdGEuYWRkcmVzc10gaW5zdGFuY2VvZiBPYmplY3QpKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW2RhdGEuYWRkcmVzc10gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiBkYXRhLmFkZHJlc3MsXG4gICAgICAgICAgICAgICAgICAgIHV1aWQ6IHV1aWQ0KCksXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50czogW11cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIF9zZWxmLmVtaXQoJ2FkZGNoYW5uZWwnLCBfc2VsZi5fY2hhbm5lbHNbZGF0YS5hZGRyZXNzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgdGltZSA9IG5ldyBUaW1lKERhdGUubm93KCkgKiAwLjAwMSwgJ3MnKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZUNvdW50ID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IHF1YW50aXR5ID0gbmV3IEJhc2VRdWFudGl0eShkYXRhLmFyZ3NbMF0sIG5ldyBVbml0KCkpLFxuICAgICAgICAgICAgICAgICAgICBldmVudCA9IG5ldyBEYXRhRXZlbnQodGltZSwgcXVhbnRpdHkpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnBhcmVudFVVSUQgPSBfc2VsZi5fY2hhbm5lbHNbZGF0YS5hZGRyZXNzXS51dWlkO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkU3RhdHMoJ291dCcsIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogaW1wbGVtZW50IG4tZGltZW5zaW9uYWwgdmFsdWVzXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuX2lucHV0UG9ydC5kaXNhYmxlKCk7XG4gICAgfVxuXG4gICAgZ2V0IGlucHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRQb3J0LnN0cmVhbTtcbiAgICB9XG5cbiAgICBnZXQgb3V0cHV0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXRQb3J0LnN0cmVhbTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgT1NDTm9kZTsiXX0=
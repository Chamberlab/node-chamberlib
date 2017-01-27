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

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chance = new _chance2.default();

var Random = function (_BaseNode) {
    (0, _inherits3.default)(Random, _BaseNode);

    function Random() {
        var eventCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        var channelCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -0.02;
        var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.02;
        var tstart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.0;
        var tend = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 20.0;
        (0, _classCallCheck3.default)(this, Random);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Random.__proto__ || (0, _getPrototypeOf2.default)(Random)).call(this));

        _this._eventCount = Math.max(eventCount, 0);
        _this._stream = (0, _through2.default)();
        _this._paused = false;

        _this._time = 0.0;
        _this._min = min;
        _this._max = max;
        _this._tstart = tstart;
        _this._tend = tend;

        _this._channelUUIDs = [];
        for (var i = 0; i < channelCount; i++) {
            _this._channelUUIDs.push((0, _uuid2.default)());
        }
        return _this;
    }

    (0, _createClass3.default)(Random, [{
        key: 'pauseOutput',
        value: function pauseOutput() {
            this._paused = true;
        }
    }, {
        key: 'startOutput',
        value: function startOutput() {
            var _self = this;
            while (!this._stream.paused && this._stream.readable) {
                var time = new _Time2.default(this._time, 's'),
                    value = new _Voltage2.default(chance.floating({ min: this._min, max: this._max }), 'V'),
                    event = new _DataEvent2.default(time, value);
                event.parentUUID = chance.pickone(this._channelUUIDs);

                this._time += chance.floating({ min: this._tstart, max: this._tend });
                this._eventCount -= 1;
                this._stream.queue(event);
                if (this._eventCount < 1) {
                    this._stream.end(null);
                }
            }
            if (this._stream.readable) {
                setTimeout(function () {
                    _self.startOutput();
                }, 10);
            }
        }
    }, {
        key: 'stream',
        get: function get() {
            return this._stream;
        }
    }]);
    return Random;
}(_BaseNode3.default);

exports.default = Random;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL2dlbmVyYXRvcnMvUmFuZG9tLmpzIl0sIm5hbWVzIjpbImNoYW5jZSIsIlJhbmRvbSIsImV2ZW50Q291bnQiLCJjaGFubmVsQ291bnQiLCJtaW4iLCJtYXgiLCJ0c3RhcnQiLCJ0ZW5kIiwiX2V2ZW50Q291bnQiLCJNYXRoIiwiX3N0cmVhbSIsIl9wYXVzZWQiLCJfdGltZSIsIl9taW4iLCJfbWF4IiwiX3RzdGFydCIsIl90ZW5kIiwiX2NoYW5uZWxVVUlEcyIsImkiLCJwdXNoIiwiX3NlbGYiLCJwYXVzZWQiLCJyZWFkYWJsZSIsInRpbWUiLCJ2YWx1ZSIsImZsb2F0aW5nIiwiZXZlbnQiLCJwYXJlbnRVVUlEIiwicGlja29uZSIsInF1ZXVlIiwiZW5kIiwic2V0VGltZW91dCIsInN0YXJ0T3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFQQSxJQUFNQSxTQUFTLHNCQUFmOztJQVNNQyxNOzs7QUFDRixzQkFBb0c7QUFBQSxZQUF4RkMsVUFBd0YsdUVBQTNFLEdBQTJFO0FBQUEsWUFBdEVDLFlBQXNFLHVFQUF2RCxDQUF1RDtBQUFBLFlBQXBEQyxHQUFvRCx1RUFBOUMsQ0FBQyxJQUE2QztBQUFBLFlBQXZDQyxHQUF1Qyx1RUFBakMsSUFBaUM7QUFBQSxZQUEzQkMsTUFBMkIsdUVBQWxCLEdBQWtCO0FBQUEsWUFBYkMsSUFBYSx1RUFBTixJQUFNO0FBQUE7O0FBQUE7O0FBR2hHLGNBQUtDLFdBQUwsR0FBbUJDLEtBQUtKLEdBQUwsQ0FBU0gsVUFBVCxFQUFxQixDQUFyQixDQUFuQjtBQUNBLGNBQUtRLE9BQUwsR0FBZSx3QkFBZjtBQUNBLGNBQUtDLE9BQUwsR0FBZSxLQUFmOztBQUVBLGNBQUtDLEtBQUwsR0FBYSxHQUFiO0FBQ0EsY0FBS0MsSUFBTCxHQUFZVCxHQUFaO0FBQ0EsY0FBS1UsSUFBTCxHQUFZVCxHQUFaO0FBQ0EsY0FBS1UsT0FBTCxHQUFlVCxNQUFmO0FBQ0EsY0FBS1UsS0FBTCxHQUFhVCxJQUFiOztBQUVBLGNBQUtVLGFBQUwsR0FBcUIsRUFBckI7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSWYsWUFBcEIsRUFBa0NlLEdBQWxDLEVBQXVDO0FBQ25DLGtCQUFLRCxhQUFMLENBQW1CRSxJQUFuQixDQUF3QixxQkFBeEI7QUFDSDtBQWhCK0Y7QUFpQm5HOzs7O3NDQUVhO0FBQ1YsaUJBQUtSLE9BQUwsR0FBZSxJQUFmO0FBQ0g7OztzQ0FFYTtBQUNWLGdCQUFNUyxRQUFRLElBQWQ7QUFDQSxtQkFBTyxDQUFDLEtBQUtWLE9BQUwsQ0FBYVcsTUFBZCxJQUF3QixLQUFLWCxPQUFMLENBQWFZLFFBQTVDLEVBQXNEO0FBQ2xELG9CQUFNQyxPQUFPLG1CQUFTLEtBQUtYLEtBQWQsRUFBcUIsR0FBckIsQ0FBYjtBQUFBLG9CQUNJWSxRQUFRLHNCQUFZeEIsT0FBT3lCLFFBQVAsQ0FBZ0IsRUFBRXJCLEtBQUssS0FBS1MsSUFBWixFQUFrQlIsS0FBSyxLQUFLUyxJQUE1QixFQUFoQixDQUFaLEVBQWlFLEdBQWpFLENBRFo7QUFBQSxvQkFFSVksUUFBUSx3QkFBY0gsSUFBZCxFQUFvQkMsS0FBcEIsQ0FGWjtBQUdBRSxzQkFBTUMsVUFBTixHQUFtQjNCLE9BQU80QixPQUFQLENBQWUsS0FBS1gsYUFBcEIsQ0FBbkI7O0FBRUEscUJBQUtMLEtBQUwsSUFBY1osT0FBT3lCLFFBQVAsQ0FBZ0IsRUFBRXJCLEtBQUssS0FBS1csT0FBWixFQUFxQlYsS0FBSyxLQUFLVyxLQUEvQixFQUFoQixDQUFkO0FBQ0EscUJBQUtSLFdBQUwsSUFBb0IsQ0FBcEI7QUFDQSxxQkFBS0UsT0FBTCxDQUFhbUIsS0FBYixDQUFtQkgsS0FBbkI7QUFDQSxvQkFBSSxLQUFLbEIsV0FBTCxHQUFtQixDQUF2QixFQUEwQjtBQUN0Qix5QkFBS0UsT0FBTCxDQUFhb0IsR0FBYixDQUFpQixJQUFqQjtBQUNIO0FBQ0o7QUFDRCxnQkFBSSxLQUFLcEIsT0FBTCxDQUFhWSxRQUFqQixFQUEyQjtBQUN2QlMsMkJBQVcsWUFBWTtBQUNuQlgsMEJBQU1ZLFdBQU47QUFDSCxpQkFGRCxFQUVHLEVBRkg7QUFHSDtBQUNKOzs7NEJBRVk7QUFDVCxtQkFBTyxLQUFLdEIsT0FBWjtBQUNIOzs7OztrQkFHVVQsTSIsImZpbGUiOiJub2Rlcy9nZW5lcmF0b3JzL1JhbmRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDaGFuY2UgZnJvbSAnY2hhbmNlJztcbmNvbnN0IGNoYW5jZSA9IG5ldyBDaGFuY2UoKTtcblxuaW1wb3J0IHRocm91Z2ggZnJvbSAndGhyb3VnaCc7XG5pbXBvcnQgdXVpZDQgZnJvbSAndXVpZDQnO1xuaW1wb3J0IEJhc2VOb2RlIGZyb20gJy4uL0Jhc2VOb2RlJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcblxuY2xhc3MgUmFuZG9tIGV4dGVuZHMgQmFzZU5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGV2ZW50Q291bnQgPSAxMDAsIGNoYW5uZWxDb3VudCA9IDEsIG1pbiA9IC0wLjAyLCBtYXggPSAwLjAyLCB0c3RhcnQgPSAwLjAsIHRlbmQgPSAyMC4wKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRDb3VudCA9IE1hdGgubWF4KGV2ZW50Q291bnQsIDApO1xuICAgICAgICB0aGlzLl9zdHJlYW0gPSB0aHJvdWdoKCk7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX3RpbWUgPSAwLjA7XG4gICAgICAgIHRoaXMuX21pbiA9IG1pbjtcbiAgICAgICAgdGhpcy5fbWF4ID0gbWF4O1xuICAgICAgICB0aGlzLl90c3RhcnQgPSB0c3RhcnQ7XG4gICAgICAgIHRoaXMuX3RlbmQgPSB0ZW5kO1xuXG4gICAgICAgIHRoaXMuX2NoYW5uZWxVVUlEcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5uZWxDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLl9jaGFubmVsVVVJRHMucHVzaCh1dWlkNCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHBhdXNlT3V0cHV0KCkge1xuICAgICAgICB0aGlzLl9wYXVzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0YXJ0T3V0cHV0KCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHdoaWxlICghdGhpcy5fc3RyZWFtLnBhdXNlZCAmJiB0aGlzLl9zdHJlYW0ucmVhZGFibGUpIHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWUgPSBuZXcgVGltZSh0aGlzLl90aW1lLCAncycpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gbmV3IFZvbHRhZ2UoY2hhbmNlLmZsb2F0aW5nKHsgbWluOiB0aGlzLl9taW4sIG1heDogdGhpcy5fbWF4IH0pLCAnVicpLFxuICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IERhdGFFdmVudCh0aW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICBldmVudC5wYXJlbnRVVUlEID0gY2hhbmNlLnBpY2tvbmUodGhpcy5fY2hhbm5lbFVVSURzKTtcblxuICAgICAgICAgICAgdGhpcy5fdGltZSArPSBjaGFuY2UuZmxvYXRpbmcoeyBtaW46IHRoaXMuX3RzdGFydCwgbWF4OiB0aGlzLl90ZW5kIH0pO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRDb3VudCAtPSAxO1xuICAgICAgICAgICAgdGhpcy5fc3RyZWFtLnF1ZXVlKGV2ZW50KTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ldmVudENvdW50IDwgMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0cmVhbS5lbmQobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3N0cmVhbS5yZWFkYWJsZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuc3RhcnRPdXRwdXQoKTtcbiAgICAgICAgICAgIH0sIDEwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzdHJlYW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSYW5kb207Il19
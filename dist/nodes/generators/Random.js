'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var chance = new _chance2.default();

var Random = function (_BaseNode) {
    _inherits(Random, _BaseNode);

    function Random() {
        var eventCount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
        var channelCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var min = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -0.02;
        var max = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.02;
        var tstart = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0.0;
        var tend = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 20.0;

        _classCallCheck(this, Random);

        var _this = _possibleConstructorReturn(this, (Random.__proto__ || Object.getPrototypeOf(Random)).call(this));

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

    _createClass(Random, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL2dlbmVyYXRvcnMvUmFuZG9tLmpzIl0sIm5hbWVzIjpbImNoYW5jZSIsIlJhbmRvbSIsImV2ZW50Q291bnQiLCJjaGFubmVsQ291bnQiLCJtaW4iLCJtYXgiLCJ0c3RhcnQiLCJ0ZW5kIiwiX2V2ZW50Q291bnQiLCJNYXRoIiwiX3N0cmVhbSIsIl9wYXVzZWQiLCJfdGltZSIsIl9taW4iLCJfbWF4IiwiX3RzdGFydCIsIl90ZW5kIiwiX2NoYW5uZWxVVUlEcyIsImkiLCJwdXNoIiwiX3NlbGYiLCJwYXVzZWQiLCJyZWFkYWJsZSIsInRpbWUiLCJ2YWx1ZSIsImZsb2F0aW5nIiwiZXZlbnQiLCJwYXJlbnRVVUlEIiwicGlja29uZSIsInF1ZXVlIiwiZW5kIiwic2V0VGltZW91dCIsInN0YXJ0T3V0cHV0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBR0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFQQSxJQUFNQSxTQUFTLHNCQUFmOztJQVNNQyxNOzs7QUFDRixzQkFBb0c7QUFBQSxZQUF4RkMsVUFBd0YsdUVBQTNFLEdBQTJFO0FBQUEsWUFBdEVDLFlBQXNFLHVFQUF2RCxDQUF1RDtBQUFBLFlBQXBEQyxHQUFvRCx1RUFBOUMsQ0FBQyxJQUE2QztBQUFBLFlBQXZDQyxHQUF1Qyx1RUFBakMsSUFBaUM7QUFBQSxZQUEzQkMsTUFBMkIsdUVBQWxCLEdBQWtCO0FBQUEsWUFBYkMsSUFBYSx1RUFBTixJQUFNOztBQUFBOztBQUFBOztBQUdoRyxjQUFLQyxXQUFMLEdBQW1CQyxLQUFLSixHQUFMLENBQVNILFVBQVQsRUFBcUIsQ0FBckIsQ0FBbkI7QUFDQSxjQUFLUSxPQUFMLEdBQWUsd0JBQWY7QUFDQSxjQUFLQyxPQUFMLEdBQWUsS0FBZjs7QUFFQSxjQUFLQyxLQUFMLEdBQWEsR0FBYjtBQUNBLGNBQUtDLElBQUwsR0FBWVQsR0FBWjtBQUNBLGNBQUtVLElBQUwsR0FBWVQsR0FBWjtBQUNBLGNBQUtVLE9BQUwsR0FBZVQsTUFBZjtBQUNBLGNBQUtVLEtBQUwsR0FBYVQsSUFBYjs7QUFFQSxjQUFLVSxhQUFMLEdBQXFCLEVBQXJCO0FBQ0EsYUFBSyxJQUFJQyxJQUFJLENBQWIsRUFBZ0JBLElBQUlmLFlBQXBCLEVBQWtDZSxHQUFsQyxFQUF1QztBQUNuQyxrQkFBS0QsYUFBTCxDQUFtQkUsSUFBbkIsQ0FBd0IscUJBQXhCO0FBQ0g7QUFoQitGO0FBaUJuRzs7OztzQ0FFYTtBQUNWLGlCQUFLUixPQUFMLEdBQWUsSUFBZjtBQUNIOzs7c0NBRWE7QUFDVixnQkFBTVMsUUFBUSxJQUFkO0FBQ0EsbUJBQU8sQ0FBQyxLQUFLVixPQUFMLENBQWFXLE1BQWQsSUFBd0IsS0FBS1gsT0FBTCxDQUFhWSxRQUE1QyxFQUFzRDtBQUNsRCxvQkFBTUMsT0FBTyxtQkFBUyxLQUFLWCxLQUFkLEVBQXFCLEdBQXJCLENBQWI7QUFBQSxvQkFDSVksUUFBUSxzQkFBWXhCLE9BQU95QixRQUFQLENBQWdCLEVBQUVyQixLQUFLLEtBQUtTLElBQVosRUFBa0JSLEtBQUssS0FBS1MsSUFBNUIsRUFBaEIsQ0FBWixFQUFpRSxHQUFqRSxDQURaO0FBQUEsb0JBRUlZLFFBQVEsd0JBQWNILElBQWQsRUFBb0JDLEtBQXBCLENBRlo7QUFHQUUsc0JBQU1DLFVBQU4sR0FBbUIzQixPQUFPNEIsT0FBUCxDQUFlLEtBQUtYLGFBQXBCLENBQW5COztBQUVBLHFCQUFLTCxLQUFMLElBQWNaLE9BQU95QixRQUFQLENBQWdCLEVBQUVyQixLQUFLLEtBQUtXLE9BQVosRUFBcUJWLEtBQUssS0FBS1csS0FBL0IsRUFBaEIsQ0FBZDtBQUNBLHFCQUFLUixXQUFMLElBQW9CLENBQXBCO0FBQ0EscUJBQUtFLE9BQUwsQ0FBYW1CLEtBQWIsQ0FBbUJILEtBQW5CO0FBQ0Esb0JBQUksS0FBS2xCLFdBQUwsR0FBbUIsQ0FBdkIsRUFBMEI7QUFDdEIseUJBQUtFLE9BQUwsQ0FBYW9CLEdBQWIsQ0FBaUIsSUFBakI7QUFDSDtBQUNKO0FBQ0QsZ0JBQUksS0FBS3BCLE9BQUwsQ0FBYVksUUFBakIsRUFBMkI7QUFDdkJTLDJCQUFXLFlBQVk7QUFDbkJYLDBCQUFNWSxXQUFOO0FBQ0gsaUJBRkQsRUFFRyxFQUZIO0FBR0g7QUFDSjs7OzRCQUVZO0FBQ1QsbUJBQU8sS0FBS3RCLE9BQVo7QUFDSDs7Ozs7O2tCQUdVVCxNIiwiZmlsZSI6Im5vZGVzL2dlbmVyYXRvcnMvUmFuZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENoYW5jZSBmcm9tICdjaGFuY2UnO1xuY29uc3QgY2hhbmNlID0gbmV3IENoYW5jZSgpO1xuXG5pbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcbmltcG9ydCB1dWlkNCBmcm9tICd1dWlkNCc7XG5pbXBvcnQgQmFzZU5vZGUgZnJvbSAnLi4vQmFzZU5vZGUnO1xuaW1wb3J0IERhdGFFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUV2ZW50JztcbmltcG9ydCBUaW1lIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVGltZSc7XG5pbXBvcnQgVm9sdGFnZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1ZvbHRhZ2UnO1xuXG5jbGFzcyBSYW5kb20gZXh0ZW5kcyBCYXNlTm9kZSB7XG4gICAgY29uc3RydWN0b3IoZXZlbnRDb3VudCA9IDEwMCwgY2hhbm5lbENvdW50ID0gMSwgbWluID0gLTAuMDIsIG1heCA9IDAuMDIsIHRzdGFydCA9IDAuMCwgdGVuZCA9IDIwLjApIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9ldmVudENvdW50ID0gTWF0aC5tYXgoZXZlbnRDb3VudCwgMCk7XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHRocm91Z2goKTtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fdGltZSA9IDAuMDtcbiAgICAgICAgdGhpcy5fbWluID0gbWluO1xuICAgICAgICB0aGlzLl9tYXggPSBtYXg7XG4gICAgICAgIHRoaXMuX3RzdGFydCA9IHRzdGFydDtcbiAgICAgICAgdGhpcy5fdGVuZCA9IHRlbmQ7XG5cbiAgICAgICAgdGhpcy5fY2hhbm5lbFVVSURzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hhbm5lbENvdW50OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuX2NoYW5uZWxVVUlEcy5wdXNoKHV1aWQ0KCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGF1c2VPdXRwdXQoKSB7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RhcnRPdXRwdXQoKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgd2hpbGUgKCF0aGlzLl9zdHJlYW0ucGF1c2VkICYmIHRoaXMuX3N0cmVhbS5yZWFkYWJsZSkge1xuICAgICAgICAgICAgY29uc3QgdGltZSA9IG5ldyBUaW1lKHRoaXMuX3RpbWUsICdzJyksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBuZXcgVm9sdGFnZShjaGFuY2UuZmxvYXRpbmcoeyBtaW46IHRoaXMuX21pbiwgbWF4OiB0aGlzLl9tYXggfSksICdWJyksXG4gICAgICAgICAgICAgICAgZXZlbnQgPSBuZXcgRGF0YUV2ZW50KHRpbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIGV2ZW50LnBhcmVudFVVSUQgPSBjaGFuY2UucGlja29uZSh0aGlzLl9jaGFubmVsVVVJRHMpO1xuXG4gICAgICAgICAgICB0aGlzLl90aW1lICs9IGNoYW5jZS5mbG9hdGluZyh7IG1pbjogdGhpcy5fdHN0YXJ0LCBtYXg6IHRoaXMuX3RlbmQgfSk7XG4gICAgICAgICAgICB0aGlzLl9ldmVudENvdW50IC09IDE7XG4gICAgICAgICAgICB0aGlzLl9zdHJlYW0ucXVldWUoZXZlbnQpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2V2ZW50Q291bnQgPCAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RyZWFtLmVuZChudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fc3RyZWFtLnJlYWRhYmxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5zdGFydE91dHB1dCgpO1xuICAgICAgICAgICAgfSwgMTApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHN0cmVhbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJhbmRvbTsiXX0=
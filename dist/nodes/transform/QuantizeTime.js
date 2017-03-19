'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _BaseTransformNode2 = require('./BaseTransformNode');

var _BaseTransformNode3 = _interopRequireDefault(_BaseTransformNode2);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var QuantizeTime = function (_BaseTransformNode) {
    _inherits(QuantizeTime, _BaseTransformNode);

    function QuantizeTime(options) {
        _classCallCheck(this, QuantizeTime);

        var _this = _possibleConstructorReturn(this, (QuantizeTime.__proto__ || Object.getPrototypeOf(QuantizeTime)).call(this));

        var lastFrameTime = 0.0,
            values = {},
            _self = _this;
        var transformFunction = function transformFunction(event) {
            _self.addStats('in', event.constructor.name);
            if (event.time.normalized() - lastFrameTime > options.steps.normalized()) {
                lastFrameTime += options.steps.normalized();
                var evt = void 0,
                    frameTime = new _Time2.default(lastFrameTime);
                if (event instanceof _DataEvent2.default) {
                    Object.keys(values).map(function (key) {
                        evt = new _DataEvent2.default(frameTime, new _Voltage2.default(values[key].length ? _mathjs2.default.mean(values[key]) : 0.0));
                        evt.parentUUID = key;
                        values[key] = [];
                    });
                } else if (event instanceof _DataFrame2.default) {
                    var arr = new Float32Array(event.value.length).fill(0.0);
                    evt = new _DataFrame2.default(frameTime, arr.map(function (v, i) {
                        return _mathjs2.default.mean(values[i]);
                    }));
                    evt.parentUUID = event.parentUUID;
                    values = [];
                }
                _self.stream.queue(evt);
                _self.addStats('out', event.constructor.name);
                return event;
            } else {
                if (event instanceof _DataEvent2.default) {
                    if (!Array.isArray(values[event.parentUUID])) {
                        values[event.parentUUID] = [];
                    }
                    values[event.parentUUID].push(event.value.normalized());
                } else if (event instanceof _DataFrame2.default) {
                    if (!Array.isArray(values)) {
                        values = new Array(event.value.length).fill([]);
                    }
                    event.value.map(function (v, i) {
                        values[i] = v;
                    });
                }
            }
        };
        _this.initStream(transformFunction);
        return _this;
    }

    return QuantizeTime;
}(_BaseTransformNode3.default);

exports.default = QuantizeTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL3RyYW5zZm9ybS9RdWFudGl6ZVRpbWUuanMiXSwibmFtZXMiOlsiUXVhbnRpemVUaW1lIiwib3B0aW9ucyIsImxhc3RGcmFtZVRpbWUiLCJ2YWx1ZXMiLCJfc2VsZiIsInRyYW5zZm9ybUZ1bmN0aW9uIiwiZXZlbnQiLCJhZGRTdGF0cyIsImNvbnN0cnVjdG9yIiwibmFtZSIsInRpbWUiLCJub3JtYWxpemVkIiwic3RlcHMiLCJldnQiLCJmcmFtZVRpbWUiLCJPYmplY3QiLCJrZXlzIiwibWFwIiwia2V5IiwibGVuZ3RoIiwibWVhbiIsInBhcmVudFVVSUQiLCJhcnIiLCJGbG9hdDMyQXJyYXkiLCJ2YWx1ZSIsImZpbGwiLCJ2IiwiaSIsInN0cmVhbSIsInF1ZXVlIiwiQXJyYXkiLCJpc0FycmF5IiwicHVzaCIsImluaXRTdHJlYW0iXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFk7OztBQUNGLDBCQUFZQyxPQUFaLEVBQXFCO0FBQUE7O0FBQUE7O0FBRWpCLFlBQUlDLGdCQUFnQixHQUFwQjtBQUFBLFlBQ0lDLFNBQVMsRUFEYjtBQUFBLFlBQ2lCQyxhQURqQjtBQUVBLFlBQU1DLG9CQUFvQixTQUFwQkEsaUJBQW9CLENBQVVDLEtBQVYsRUFBaUI7QUFDdkNGLGtCQUFNRyxRQUFOLENBQWUsSUFBZixFQUFxQkQsTUFBTUUsV0FBTixDQUFrQkMsSUFBdkM7QUFDQSxnQkFBSUgsTUFBTUksSUFBTixDQUFXQyxVQUFYLEtBQTBCVCxhQUExQixHQUEwQ0QsUUFBUVcsS0FBUixDQUFjRCxVQUFkLEVBQTlDLEVBQTBFO0FBQ3RFVCxpQ0FBaUJELFFBQVFXLEtBQVIsQ0FBY0QsVUFBZCxFQUFqQjtBQUNBLG9CQUFJRSxZQUFKO0FBQUEsb0JBQVNDLFlBQVksbUJBQVNaLGFBQVQsQ0FBckI7QUFDQSxvQkFBSUksb0NBQUosRUFBZ0M7QUFDNUJTLDJCQUFPQyxJQUFQLENBQVliLE1BQVosRUFBb0JjLEdBQXBCLENBQXdCLFVBQUNDLEdBQUQsRUFBUztBQUM3QkwsOEJBQU0sd0JBQ0ZDLFNBREUsRUFFRixzQkFBWVgsT0FBT2UsR0FBUCxFQUFZQyxNQUFaLEdBQXFCLGlCQUFLQyxJQUFMLENBQVVqQixPQUFPZSxHQUFQLENBQVYsQ0FBckIsR0FBOEMsR0FBMUQsQ0FGRSxDQUFOO0FBSUFMLDRCQUFJUSxVQUFKLEdBQWlCSCxHQUFqQjtBQUNBZiwrQkFBT2UsR0FBUCxJQUFjLEVBQWQ7QUFDSCxxQkFQRDtBQVFILGlCQVRELE1BU08sSUFBSVosb0NBQUosRUFBZ0M7QUFDbkMsd0JBQUlnQixNQUFNLElBQUlDLFlBQUosQ0FBaUJqQixNQUFNa0IsS0FBTixDQUFZTCxNQUE3QixFQUFxQ00sSUFBckMsQ0FBMEMsR0FBMUMsQ0FBVjtBQUNBWiwwQkFBTSx3QkFBY0MsU0FBZCxFQUF5QlEsSUFBSUwsR0FBSixDQUFRLFVBQUNTLENBQUQsRUFBSUMsQ0FBSixFQUFVO0FBQzdDLCtCQUFPLGlCQUFLUCxJQUFMLENBQVVqQixPQUFPd0IsQ0FBUCxDQUFWLENBQVA7QUFDSCxxQkFGOEIsQ0FBekIsQ0FBTjtBQUdBZCx3QkFBSVEsVUFBSixHQUFpQmYsTUFBTWUsVUFBdkI7QUFDQWxCLDZCQUFTLEVBQVQ7QUFDSDtBQUNEQyxzQkFBTXdCLE1BQU4sQ0FBYUMsS0FBYixDQUFtQmhCLEdBQW5CO0FBQ0FULHNCQUFNRyxRQUFOLENBQWUsS0FBZixFQUFzQkQsTUFBTUUsV0FBTixDQUFrQkMsSUFBeEM7QUFDQSx1QkFBT0gsS0FBUDtBQUNILGFBdkJELE1BdUJPO0FBQ0gsb0JBQUlBLG9DQUFKLEVBQWdDO0FBQzVCLHdCQUFJLENBQUN3QixNQUFNQyxPQUFOLENBQWM1QixPQUFPRyxNQUFNZSxVQUFiLENBQWQsQ0FBTCxFQUE4QztBQUMxQ2xCLCtCQUFPRyxNQUFNZSxVQUFiLElBQTJCLEVBQTNCO0FBQ0g7QUFDRGxCLDJCQUFPRyxNQUFNZSxVQUFiLEVBQXlCVyxJQUF6QixDQUE4QjFCLE1BQU1rQixLQUFOLENBQVliLFVBQVosRUFBOUI7QUFDSCxpQkFMRCxNQUtPLElBQUlMLG9DQUFKLEVBQWdDO0FBQ25DLHdCQUFJLENBQUN3QixNQUFNQyxPQUFOLENBQWM1QixNQUFkLENBQUwsRUFBNEI7QUFDeEJBLGlDQUFTLElBQUkyQixLQUFKLENBQVV4QixNQUFNa0IsS0FBTixDQUFZTCxNQUF0QixFQUE4Qk0sSUFBOUIsQ0FBbUMsRUFBbkMsQ0FBVDtBQUNIO0FBQ0RuQiwwQkFBTWtCLEtBQU4sQ0FBWVAsR0FBWixDQUFnQixVQUFDUyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUN0QnhCLCtCQUFPd0IsQ0FBUCxJQUFZRCxDQUFaO0FBQ0gscUJBRkQ7QUFHSDtBQUNKO0FBQ0osU0F4Q0Q7QUF5Q0EsY0FBS08sVUFBTCxDQUFnQjVCLGlCQUFoQjtBQTdDaUI7QUE4Q3BCOzs7OztrQkFHVUwsWSIsImZpbGUiOiJub2Rlcy90cmFuc2Zvcm0vUXVhbnRpemVUaW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1hdGggZnJvbSAnbWF0aGpzJztcblxuaW1wb3J0IEJhc2VUcmFuc2Zvcm1Ob2RlIGZyb20gJy4vQmFzZVRyYW5zZm9ybU5vZGUnO1xuaW1wb3J0IERhdGFFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUV2ZW50JztcbmltcG9ydCBEYXRhRnJhbWUgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFGcmFtZSc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcblxuY2xhc3MgUXVhbnRpemVUaW1lIGV4dGVuZHMgQmFzZVRyYW5zZm9ybU5vZGUge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgbGV0IGxhc3RGcmFtZVRpbWUgPSAwLjAsXG4gICAgICAgICAgICB2YWx1ZXMgPSB7fSwgX3NlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCB0cmFuc2Zvcm1GdW5jdGlvbiA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgX3NlbGYuYWRkU3RhdHMoJ2luJywgZXZlbnQuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICBpZiAoZXZlbnQudGltZS5ub3JtYWxpemVkKCkgLSBsYXN0RnJhbWVUaW1lID4gb3B0aW9ucy5zdGVwcy5ub3JtYWxpemVkKCkpIHtcbiAgICAgICAgICAgICAgICBsYXN0RnJhbWVUaW1lICs9IG9wdGlvbnMuc3RlcHMubm9ybWFsaXplZCgpO1xuICAgICAgICAgICAgICAgIGxldCBldnQsIGZyYW1lVGltZSA9IG5ldyBUaW1lKGxhc3RGcmFtZVRpbWUpO1xuICAgICAgICAgICAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIERhdGFFdmVudCkge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyh2YWx1ZXMpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQgPSBuZXcgRGF0YUV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyYW1lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVm9sdGFnZSh2YWx1ZXNba2V5XS5sZW5ndGggPyBtYXRoLm1lYW4odmFsdWVzW2tleV0pIDogMC4wKVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dC5wYXJlbnRVVUlEID0ga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2tleV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIERhdGFGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gbmV3IEZsb2F0MzJBcnJheShldmVudC52YWx1ZS5sZW5ndGgpLmZpbGwoMC4wKTtcbiAgICAgICAgICAgICAgICAgICAgZXZ0ID0gbmV3IERhdGFGcmFtZShmcmFtZVRpbWUsIGFyci5tYXAoKHYsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXRoLm1lYW4odmFsdWVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBldnQucGFyZW50VVVJRCA9IGV2ZW50LnBhcmVudFVVSUQ7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBfc2VsZi5zdHJlYW0ucXVldWUoZXZ0KTtcbiAgICAgICAgICAgICAgICBfc2VsZi5hZGRTdGF0cygnb3V0JywgZXZlbnQuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlc1tldmVudC5wYXJlbnRVVUlEXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1tldmVudC5wYXJlbnRVVUlEXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlc1tldmVudC5wYXJlbnRVVUlEXS5wdXNoKGV2ZW50LnZhbHVlLm5vcm1hbGl6ZWQoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudCBpbnN0YW5jZW9mIERhdGFGcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gbmV3IEFycmF5KGV2ZW50LnZhbHVlLmxlbmd0aCkuZmlsbChbXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudmFsdWUubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbaV0gPSB2O1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5pdFN0cmVhbSh0cmFuc2Zvcm1GdW5jdGlvbik7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBRdWFudGl6ZVRpbWU7Il19
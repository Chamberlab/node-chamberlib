'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _BaseEvent = require('../events/BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataChannel = function (_BaseCollection) {
    _inherits(DataChannel, _BaseCollection);

    function DataChannel(events) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, DataChannel);

        var _this = _possibleConstructorReturn(this, (DataChannel.__proto__ || Object.getPrototypeOf(DataChannel)).call(this, events, _BaseEvent2.default, uuid));

        if (title) {
            _this.title = title;
        }
        return _this;
    }

    _createClass(DataChannel, [{
        key: 'stats',
        get: function get() {
            var s = {
                avg: 0.0, duration: 0.0, items: 0,
                time: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
                value: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER }
            };
            this._items.map(function (item) {
                var time = item.time.normalized(),
                    value = item.value.normalized();

                s.avg += value;
                s.items++;

                if (time < s.time.min) {
                    s.time.min = time;
                } else if (time > s.time.max) {
                    s.time.max = time;
                }

                if (value < s.value.min) {
                    s.value.min = value;
                } else if (value > s.value.max) {
                    s.value.max = value;
                }
            });

            s.avg = s.avg / s.items;
            s.duration = new _Time2.default(s.time.max - s.time.min);
            s.time.min = new _Time2.default(s.time.min);
            s.time.max = new _Time2.default(s.time.max);
            s.value.min = new _Voltage2.default(s.value.min);
            s.value.max = new _Voltage2.default(s.value.max);

            return s;
        }
    }, {
        key: 'title',
        get: function get() {
            return this._title;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string');
            this._title = val;
        }
    }]);

    return DataChannel;
}(_BaseCollection3.default);

exports.default = DataChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvRGF0YUNoYW5uZWwuanMiXSwibmFtZXMiOlsiRGF0YUNoYW5uZWwiLCJldmVudHMiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInV1aWQiLCJzIiwiYXZnIiwiZHVyYXRpb24iLCJpdGVtcyIsInRpbWUiLCJtaW4iLCJOdW1iZXIiLCJNQVhfU0FGRV9JTlRFR0VSIiwibWF4IiwiTUlOX1NBRkVfSU5URUdFUiIsInZhbHVlIiwiX2l0ZW1zIiwibWFwIiwiaXRlbSIsIm5vcm1hbGl6ZWQiLCJfdGl0bGUiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFc7OztBQUNGLHlCQUFZQyxNQUFaLEVBQXlEO0FBQUEsWUFBckNDLEtBQXFDLHVFQUE3QkMsU0FBNkI7QUFBQSxZQUFsQkMsSUFBa0IsdUVBQVhELFNBQVc7O0FBQUE7O0FBQUEsOEhBQy9DRixNQUQrQyx1QkFDNUJHLElBRDRCOztBQUdyRCxZQUFJRixLQUFKLEVBQVc7QUFDUCxrQkFBS0EsS0FBTCxHQUFhQSxLQUFiO0FBQ0g7QUFMb0Q7QUFNeEQ7Ozs7NEJBRVc7QUFDUixnQkFBSUcsSUFBSTtBQUNKQyxxQkFBSyxHQURELEVBQ01DLFVBQVUsR0FEaEIsRUFDcUJDLE9BQU8sQ0FENUI7QUFFSkMsc0JBQU0sRUFBRUMsS0FBS0MsT0FBT0MsZ0JBQWQsRUFBZ0NDLEtBQUtGLE9BQU9HLGdCQUE1QyxFQUZGO0FBR0pDLHVCQUFPLEVBQUVMLEtBQUtDLE9BQU9DLGdCQUFkLEVBQWdDQyxLQUFLRixPQUFPRyxnQkFBNUM7QUFISCxhQUFSO0FBS0EsaUJBQUtFLE1BQUwsQ0FBWUMsR0FBWixDQUFnQixVQUFVQyxJQUFWLEVBQWdCO0FBQzVCLG9CQUFJVCxPQUFPUyxLQUFLVCxJQUFMLENBQVVVLFVBQVYsRUFBWDtBQUFBLG9CQUNJSixRQUFRRyxLQUFLSCxLQUFMLENBQVdJLFVBQVgsRUFEWjs7QUFHQWQsa0JBQUVDLEdBQUYsSUFBU1MsS0FBVDtBQUNBVixrQkFBRUcsS0FBRjs7QUFFQSxvQkFBSUMsT0FBT0osRUFBRUksSUFBRixDQUFPQyxHQUFsQixFQUF1QjtBQUNuQkwsc0JBQUVJLElBQUYsQ0FBT0MsR0FBUCxHQUFhRCxJQUFiO0FBQ0gsaUJBRkQsTUFFTyxJQUFJQSxPQUFPSixFQUFFSSxJQUFGLENBQU9JLEdBQWxCLEVBQXVCO0FBQzFCUixzQkFBRUksSUFBRixDQUFPSSxHQUFQLEdBQWFKLElBQWI7QUFDSDs7QUFFRCxvQkFBSU0sUUFBUVYsRUFBRVUsS0FBRixDQUFRTCxHQUFwQixFQUF5QjtBQUNyQkwsc0JBQUVVLEtBQUYsQ0FBUUwsR0FBUixHQUFjSyxLQUFkO0FBQ0gsaUJBRkQsTUFFTyxJQUFJQSxRQUFRVixFQUFFVSxLQUFGLENBQVFGLEdBQXBCLEVBQXlCO0FBQzVCUixzQkFBRVUsS0FBRixDQUFRRixHQUFSLEdBQWNFLEtBQWQ7QUFDSDtBQUNKLGFBbEJEOztBQW9CQVYsY0FBRUMsR0FBRixHQUFRRCxFQUFFQyxHQUFGLEdBQVFELEVBQUVHLEtBQWxCO0FBQ0FILGNBQUVFLFFBQUYsR0FBYSxtQkFBU0YsRUFBRUksSUFBRixDQUFPSSxHQUFQLEdBQWFSLEVBQUVJLElBQUYsQ0FBT0MsR0FBN0IsQ0FBYjtBQUNBTCxjQUFFSSxJQUFGLENBQU9DLEdBQVAsR0FBYSxtQkFBU0wsRUFBRUksSUFBRixDQUFPQyxHQUFoQixDQUFiO0FBQ0FMLGNBQUVJLElBQUYsQ0FBT0ksR0FBUCxHQUFhLG1CQUFTUixFQUFFSSxJQUFGLENBQU9JLEdBQWhCLENBQWI7QUFDQVIsY0FBRVUsS0FBRixDQUFRTCxHQUFSLEdBQWMsc0JBQVlMLEVBQUVVLEtBQUYsQ0FBUUwsR0FBcEIsQ0FBZDtBQUNBTCxjQUFFVSxLQUFGLENBQVFGLEdBQVIsR0FBYyxzQkFBWVIsRUFBRVUsS0FBRixDQUFRRixHQUFwQixDQUFkOztBQUVBLG1CQUFPUixDQUFQO0FBQ0g7Ozs0QkFFVztBQUNSLG1CQUFPLEtBQUtlLE1BQVo7QUFDSCxTOzBCQUVTQyxHLEVBQUs7QUFDWCxrQ0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEI7QUFDQSxpQkFBS0QsTUFBTCxHQUFjQyxHQUFkO0FBQ0g7Ozs7OztrQkFHVXJCLFciLCJmaWxlIjoiZGF0YS9EYXRhQ2hhbm5lbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gJy4uL2RhdGEvQmFzZUNvbGxlY3Rpb24nO1xuaW1wb3J0IEJhc2VFdmVudCBmcm9tICcuLi9ldmVudHMvQmFzZUV2ZW50JztcbmltcG9ydCBUaW1lIGZyb20gJy4uL3F1YW50aXRpZXMvVGltZSc7XG5pbXBvcnQgVm9sdGFnZSBmcm9tICcuLi9xdWFudGl0aWVzL1ZvbHRhZ2UnO1xuXG5jbGFzcyBEYXRhQ2hhbm5lbCBleHRlbmRzIEJhc2VDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihldmVudHMsIHRpdGxlID0gdW5kZWZpbmVkLCB1dWlkID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKGV2ZW50cywgQmFzZUV2ZW50LCB1dWlkKTtcblxuICAgICAgICBpZiAodGl0bGUpIHtcbiAgICAgICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzdGF0cygpIHtcbiAgICAgICAgbGV0IHMgPSB7XG4gICAgICAgICAgICBhdmc6IDAuMCwgZHVyYXRpb246IDAuMCwgaXRlbXM6IDAsXG4gICAgICAgICAgICB0aW1lOiB7IG1pbjogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIG1heDogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIgfSxcbiAgICAgICAgICAgIHZhbHVlOiB7IG1pbjogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIsIG1heDogTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVIgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pdGVtcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGxldCB0aW1lID0gaXRlbS50aW1lLm5vcm1hbGl6ZWQoKSxcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGl0ZW0udmFsdWUubm9ybWFsaXplZCgpO1xuXG4gICAgICAgICAgICBzLmF2ZyArPSB2YWx1ZTtcbiAgICAgICAgICAgIHMuaXRlbXMrKztcblxuICAgICAgICAgICAgaWYgKHRpbWUgPCBzLnRpbWUubWluKSB7XG4gICAgICAgICAgICAgICAgcy50aW1lLm1pbiA9IHRpbWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRpbWUgPiBzLnRpbWUubWF4KSB7XG4gICAgICAgICAgICAgICAgcy50aW1lLm1heCA9IHRpbWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IHMudmFsdWUubWluKSB7XG4gICAgICAgICAgICAgICAgcy52YWx1ZS5taW4gPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPiBzLnZhbHVlLm1heCkge1xuICAgICAgICAgICAgICAgIHMudmFsdWUubWF4ID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHMuYXZnID0gcy5hdmcgLyBzLml0ZW1zO1xuICAgICAgICBzLmR1cmF0aW9uID0gbmV3IFRpbWUocy50aW1lLm1heCAtIHMudGltZS5taW4pO1xuICAgICAgICBzLnRpbWUubWluID0gbmV3IFRpbWUocy50aW1lLm1pbik7XG4gICAgICAgIHMudGltZS5tYXggPSBuZXcgVGltZShzLnRpbWUubWF4KTtcbiAgICAgICAgcy52YWx1ZS5taW4gPSBuZXcgVm9sdGFnZShzLnZhbHVlLm1pbik7XG4gICAgICAgIHMudmFsdWUubWF4ID0gbmV3IFZvbHRhZ2Uocy52YWx1ZS5tYXgpO1xuXG4gICAgICAgIHJldHVybiBzO1xuICAgIH1cblxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICAgIH1cblxuICAgIHNldCB0aXRsZSh2YWwpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgdGhpcy5fdGl0bGUgPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhQ2hhbm5lbDsiXX0=
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _minSafeInteger = require('babel-runtime/core-js/number/min-safe-integer');

var _minSafeInteger2 = _interopRequireDefault(_minSafeInteger);

var _maxSafeInteger = require('babel-runtime/core-js/number/max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _BaseEvent = require('../events/BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataChannel = function (_BaseCollection) {
    (0, _inherits3.default)(DataChannel, _BaseCollection);

    function DataChannel(events) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        (0, _classCallCheck3.default)(this, DataChannel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataChannel.__proto__ || (0, _getPrototypeOf2.default)(DataChannel)).call(this, events, _BaseEvent2.default, uuid));

        if (title) {
            _this.title = title;
        }
        return _this;
    }

    (0, _createClass3.default)(DataChannel, [{
        key: 'stats',
        get: function get() {
            var s = {
                avg: 0.0, duration: 0.0, items: 0,
                time: { min: _maxSafeInteger2.default, max: _minSafeInteger2.default },
                value: { min: _maxSafeInteger2.default, max: _minSafeInteger2.default }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvRGF0YUNoYW5uZWwuanMiXSwibmFtZXMiOlsiRGF0YUNoYW5uZWwiLCJldmVudHMiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInV1aWQiLCJzIiwiYXZnIiwiZHVyYXRpb24iLCJpdGVtcyIsInRpbWUiLCJtaW4iLCJtYXgiLCJ2YWx1ZSIsIl9pdGVtcyIsIm1hcCIsIml0ZW0iLCJub3JtYWxpemVkIiwiX3RpdGxlIiwidmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFc7OztBQUNGLHlCQUFZQyxNQUFaLEVBQXlEO0FBQUEsWUFBckNDLEtBQXFDLHVFQUE3QkMsU0FBNkI7QUFBQSxZQUFsQkMsSUFBa0IsdUVBQVhELFNBQVc7QUFBQTs7QUFBQSxvSkFDL0NGLE1BRCtDLHVCQUM1QkcsSUFENEI7O0FBR3JELFlBQUlGLEtBQUosRUFBVztBQUNQLGtCQUFLQSxLQUFMLEdBQWFBLEtBQWI7QUFDSDtBQUxvRDtBQU14RDs7Ozs0QkFFVztBQUNSLGdCQUFJRyxJQUFJO0FBQ0pDLHFCQUFLLEdBREQsRUFDTUMsVUFBVSxHQURoQixFQUNxQkMsT0FBTyxDQUQ1QjtBQUVKQyxzQkFBTSxFQUFFQyw2QkFBRixFQUFnQ0MsNkJBQWhDLEVBRkY7QUFHSkMsdUJBQU8sRUFBRUYsNkJBQUYsRUFBZ0NDLDZCQUFoQztBQUhILGFBQVI7QUFLQSxpQkFBS0UsTUFBTCxDQUFZQyxHQUFaLENBQWdCLFVBQVVDLElBQVYsRUFBZ0I7QUFDNUIsb0JBQUlOLE9BQU9NLEtBQUtOLElBQUwsQ0FBVU8sVUFBVixFQUFYO0FBQUEsb0JBQ0lKLFFBQVFHLEtBQUtILEtBQUwsQ0FBV0ksVUFBWCxFQURaOztBQUdBWCxrQkFBRUMsR0FBRixJQUFTTSxLQUFUO0FBQ0FQLGtCQUFFRyxLQUFGOztBQUVBLG9CQUFJQyxPQUFPSixFQUFFSSxJQUFGLENBQU9DLEdBQWxCLEVBQXVCO0FBQ25CTCxzQkFBRUksSUFBRixDQUFPQyxHQUFQLEdBQWFELElBQWI7QUFDSCxpQkFGRCxNQUVPLElBQUlBLE9BQU9KLEVBQUVJLElBQUYsQ0FBT0UsR0FBbEIsRUFBdUI7QUFDMUJOLHNCQUFFSSxJQUFGLENBQU9FLEdBQVAsR0FBYUYsSUFBYjtBQUNIOztBQUVELG9CQUFJRyxRQUFRUCxFQUFFTyxLQUFGLENBQVFGLEdBQXBCLEVBQXlCO0FBQ3JCTCxzQkFBRU8sS0FBRixDQUFRRixHQUFSLEdBQWNFLEtBQWQ7QUFDSCxpQkFGRCxNQUVPLElBQUlBLFFBQVFQLEVBQUVPLEtBQUYsQ0FBUUQsR0FBcEIsRUFBeUI7QUFDNUJOLHNCQUFFTyxLQUFGLENBQVFELEdBQVIsR0FBY0MsS0FBZDtBQUNIO0FBQ0osYUFsQkQ7O0FBb0JBUCxjQUFFQyxHQUFGLEdBQVFELEVBQUVDLEdBQUYsR0FBUUQsRUFBRUcsS0FBbEI7QUFDQUgsY0FBRUUsUUFBRixHQUFhLG1CQUFTRixFQUFFSSxJQUFGLENBQU9FLEdBQVAsR0FBYU4sRUFBRUksSUFBRixDQUFPQyxHQUE3QixDQUFiO0FBQ0FMLGNBQUVJLElBQUYsQ0FBT0MsR0FBUCxHQUFhLG1CQUFTTCxFQUFFSSxJQUFGLENBQU9DLEdBQWhCLENBQWI7QUFDQUwsY0FBRUksSUFBRixDQUFPRSxHQUFQLEdBQWEsbUJBQVNOLEVBQUVJLElBQUYsQ0FBT0UsR0FBaEIsQ0FBYjtBQUNBTixjQUFFTyxLQUFGLENBQVFGLEdBQVIsR0FBYyxzQkFBWUwsRUFBRU8sS0FBRixDQUFRRixHQUFwQixDQUFkO0FBQ0FMLGNBQUVPLEtBQUYsQ0FBUUQsR0FBUixHQUFjLHNCQUFZTixFQUFFTyxLQUFGLENBQVFELEdBQXBCLENBQWQ7O0FBRUEsbUJBQU9OLENBQVA7QUFDSDs7OzRCQUVXO0FBQ1IsbUJBQU8sS0FBS1ksTUFBWjtBQUNILFM7MEJBRVNDLEcsRUFBSztBQUNYLGtDQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QjtBQUNBLGlCQUFLRCxNQUFMLEdBQWNDLEdBQWQ7QUFDSDs7Ozs7a0JBR1VsQixXIiwiZmlsZSI6ImRhdGEvRGF0YUNoYW5uZWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCBCYXNlQ29sbGVjdGlvbiBmcm9tICcuLi9kYXRhL0Jhc2VDb2xsZWN0aW9uJztcbmltcG9ydCBCYXNlRXZlbnQgZnJvbSAnLi4vZXZlbnRzL0Jhc2VFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcblxuY2xhc3MgRGF0YUNoYW5uZWwgZXh0ZW5kcyBCYXNlQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoZXZlbnRzLCB0aXRsZSA9IHVuZGVmaW5lZCwgdXVpZCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihldmVudHMsIEJhc2VFdmVudCwgdXVpZCk7XG5cbiAgICAgICAgaWYgKHRpdGxlKSB7XG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc3RhdHMoKSB7XG4gICAgICAgIGxldCBzID0ge1xuICAgICAgICAgICAgYXZnOiAwLjAsIGR1cmF0aW9uOiAwLjAsIGl0ZW1zOiAwLFxuICAgICAgICAgICAgdGltZTogeyBtaW46IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBtYXg6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSIH0sXG4gICAgICAgICAgICB2YWx1ZTogeyBtaW46IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCBtYXg6IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faXRlbXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBsZXQgdGltZSA9IGl0ZW0udGltZS5ub3JtYWxpemVkKCksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBpdGVtLnZhbHVlLm5vcm1hbGl6ZWQoKTtcblxuICAgICAgICAgICAgcy5hdmcgKz0gdmFsdWU7XG4gICAgICAgICAgICBzLml0ZW1zKys7XG5cbiAgICAgICAgICAgIGlmICh0aW1lIDwgcy50aW1lLm1pbikge1xuICAgICAgICAgICAgICAgIHMudGltZS5taW4gPSB0aW1lO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aW1lID4gcy50aW1lLm1heCkge1xuICAgICAgICAgICAgICAgIHMudGltZS5tYXggPSB0aW1lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsdWUgPCBzLnZhbHVlLm1pbikge1xuICAgICAgICAgICAgICAgIHMudmFsdWUubWluID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID4gcy52YWx1ZS5tYXgpIHtcbiAgICAgICAgICAgICAgICBzLnZhbHVlLm1heCA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzLmF2ZyA9IHMuYXZnIC8gcy5pdGVtcztcbiAgICAgICAgcy5kdXJhdGlvbiA9IG5ldyBUaW1lKHMudGltZS5tYXggLSBzLnRpbWUubWluKTtcbiAgICAgICAgcy50aW1lLm1pbiA9IG5ldyBUaW1lKHMudGltZS5taW4pO1xuICAgICAgICBzLnRpbWUubWF4ID0gbmV3IFRpbWUocy50aW1lLm1heCk7XG4gICAgICAgIHMudmFsdWUubWluID0gbmV3IFZvbHRhZ2Uocy52YWx1ZS5taW4pO1xuICAgICAgICBzLnZhbHVlLm1heCA9IG5ldyBWb2x0YWdlKHMudmFsdWUubWF4KTtcblxuICAgICAgICByZXR1cm4gcztcbiAgICB9XG5cbiAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcbiAgICB9XG5cbiAgICBzZXQgdGl0bGUodmFsKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyk7XG4gICAgICAgIHRoaXMuX3RpdGxlID0gdmFsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YUNoYW5uZWw7Il19
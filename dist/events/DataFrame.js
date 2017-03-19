'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataFrame = function (_BaseEvent) {
    _inherits(DataFrame, _BaseEvent);

    function DataFrame(time, value) {
        _classCallCheck(this, DataFrame);

        var _this = _possibleConstructorReturn(this, (DataFrame.__proto__ || Object.getPrototypeOf(DataFrame)).call(this, time, value, [Float64Array, Float32Array, Int32Array, Uint8Array]));

        _this.time = time;
        _this.value = value;
        return _this;
    }

    _createClass(DataFrame, [{
        key: 'toObject',
        value: function toObject() {
            return { t: this.time.normalized(), v: this.value.normalized() };
        }
    }]);

    return DataFrame;
}(_BaseEvent3.default);

exports.default = DataFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9EYXRhRnJhbWUuanMiXSwibmFtZXMiOlsiRGF0YUZyYW1lIiwidGltZSIsInZhbHVlIiwiRmxvYXQ2NEFycmF5IiwiRmxvYXQzMkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQ4QXJyYXkiLCJ0Iiwibm9ybWFsaXplZCIsInYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxTOzs7QUFDRix1QkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUI7QUFBQTs7QUFBQSwwSEFDZkQsSUFEZSxFQUNUQyxLQURTLEVBQ0YsQ0FBQ0MsWUFBRCxFQUFlQyxZQUFmLEVBQTZCQyxVQUE3QixFQUF5Q0MsVUFBekMsQ0FERTs7QUFHckIsY0FBS0wsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBSnFCO0FBS3hCOzs7O21DQUVVO0FBQ1AsbUJBQU8sRUFBRUssR0FBRyxLQUFLTixJQUFMLENBQVVPLFVBQVYsRUFBTCxFQUE2QkMsR0FBRyxLQUFLUCxLQUFMLENBQVdNLFVBQVgsRUFBaEMsRUFBUDtBQUNIOzs7Ozs7a0JBR1VSLFMiLCJmaWxlIjoiZXZlbnRzL0RhdGFGcmFtZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRXZlbnQgZnJvbSAnLi9CYXNlRXZlbnQnO1xuXG5jbGFzcyBEYXRhRnJhbWUgZXh0ZW5kcyBCYXNlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHRpbWUsIHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKHRpbWUsIHZhbHVlLCBbRmxvYXQ2NEFycmF5LCBGbG9hdDMyQXJyYXksIEludDMyQXJyYXksIFVpbnQ4QXJyYXldKTtcblxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB7IHQ6IHRoaXMudGltZS5ub3JtYWxpemVkKCksIHY6IHRoaXMudmFsdWUubm9ybWFsaXplZCgpIH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhRnJhbWU7Il19
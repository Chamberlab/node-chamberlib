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

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataFrame = function (_BaseEvent) {
    (0, _inherits3.default)(DataFrame, _BaseEvent);

    function DataFrame(time, value) {
        (0, _classCallCheck3.default)(this, DataFrame);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataFrame.__proto__ || (0, _getPrototypeOf2.default)(DataFrame)).call(this, time, value, [Float64Array, Float32Array, Int32Array, Uint8Array]));

        _this.time = time;
        _this.value = value;
        return _this;
    }

    (0, _createClass3.default)(DataFrame, [{
        key: 'toObject',
        value: function toObject() {
            return { t: this.time.normalized(), v: this.value.normalized() };
        }
    }]);
    return DataFrame;
}(_BaseEvent3.default);

exports.default = DataFrame;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9EYXRhRnJhbWUuanMiXSwibmFtZXMiOlsiRGF0YUZyYW1lIiwidGltZSIsInZhbHVlIiwiRmxvYXQ2NEFycmF5IiwiRmxvYXQzMkFycmF5IiwiSW50MzJBcnJheSIsIlVpbnQ4QXJyYXkiLCJ0Iiwibm9ybWFsaXplZCIsInYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVNQSxTOzs7QUFDRix1QkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUI7QUFBQTs7QUFBQSxnSkFDZkQsSUFEZSxFQUNUQyxLQURTLEVBQ0YsQ0FBQ0MsWUFBRCxFQUFlQyxZQUFmLEVBQTZCQyxVQUE3QixFQUF5Q0MsVUFBekMsQ0FERTs7QUFHckIsY0FBS0wsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBSnFCO0FBS3hCOzs7O21DQUVVO0FBQ1AsbUJBQU8sRUFBRUssR0FBRyxLQUFLTixJQUFMLENBQVVPLFVBQVYsRUFBTCxFQUE2QkMsR0FBRyxLQUFLUCxLQUFMLENBQVdNLFVBQVgsRUFBaEMsRUFBUDtBQUNIOzs7OztrQkFHVVIsUyIsImZpbGUiOiJldmVudHMvRGF0YUZyYW1lLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VFdmVudCBmcm9tICcuL0Jhc2VFdmVudCc7XG5cbmNsYXNzIERhdGFGcmFtZSBleHRlbmRzIEJhc2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IodGltZSwgdmFsdWUpIHtcbiAgICAgICAgc3VwZXIodGltZSwgdmFsdWUsIFtGbG9hdDY0QXJyYXksIEZsb2F0MzJBcnJheSwgSW50MzJBcnJheSwgVWludDhBcnJheV0pO1xuXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHsgdDogdGhpcy50aW1lLm5vcm1hbGl6ZWQoKSwgdjogdGhpcy52YWx1ZS5ub3JtYWxpemVkKCkgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFGcmFtZTsiXX0=
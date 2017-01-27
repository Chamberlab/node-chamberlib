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

var _BaseQuantity2 = require('./base/BaseQuantity');

var _BaseQuantity3 = _interopRequireDefault(_BaseQuantity2);

var _Unit = require('./base/Unit');

var _Unit2 = _interopRequireDefault(_Unit);

var _Dimensions = require('./base/Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Frequency = function (_BaseQuantity) {
    (0, _inherits3.default)(Frequency, _BaseQuantity);

    function Frequency(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Frequency.defaultUnit;
        (0, _classCallCheck3.default)(this, Frequency);

        if (typeof unit === 'string') {
            unit = Frequency.units[unit.toLowerCase()];
        }
        return (0, _possibleConstructorReturn3.default)(this, (Frequency.__proto__ || (0, _getPrototypeOf2.default)(Frequency)).call(this, value, unit));
    }

    (0, _createClass3.default)(Frequency, null, [{
        key: 'units',
        get: function get() {
            return {
                'hz': new _Unit2.default('Hertz', 'Hz', 1.0, _Dimensions2.default.DIMENSION_FREQUENCY),
                'khz': new _Unit2.default('Kilohertz', 'kHz', Math.pow(10, 3), _Dimensions2.default.DIMENSION_FREQUENCY),
                'mhz': new _Unit2.default('Megahertz', 'MHz', Math.pow(10, 6), _Dimensions2.default.DIMENSION_FREQUENCY),
                'ghz': new _Unit2.default('Gigahertz', 'GHz', Math.pow(10, 9), _Dimensions2.default.DIMENSION_FREQUENCY)
            };
        }
    }, {
        key: 'defaultUnit',
        get: function get() {
            return Frequency.units.hz;
        }
    }]);
    return Frequency;
}(_BaseQuantity3.default);

exports.default = Frequency;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvRnJlcXVlbmN5LmpzIl0sIm5hbWVzIjpbIkZyZXF1ZW5jeSIsInZhbHVlIiwidW5pdCIsImRlZmF1bHRVbml0IiwidW5pdHMiLCJ0b0xvd2VyQ2FzZSIsIkRJTUVOU0lPTl9GUkVRVUVOQ1kiLCJNYXRoIiwicG93IiwiaHoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsUzs7O0FBQ0YsdUJBQVlDLEtBQVosRUFBaUQ7QUFBQSxZQUE5QkMsSUFBOEIsdUVBQXZCRixVQUFVRyxXQUFhO0FBQUE7O0FBQzdDLFlBQUksT0FBT0QsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQkEsbUJBQU9GLFVBQVVJLEtBQVYsQ0FBZ0JGLEtBQUtHLFdBQUwsRUFBaEIsQ0FBUDtBQUNIO0FBSDRDLDJJQUl2Q0osS0FKdUMsRUFJaENDLElBSmdDO0FBS2hEOzs7OzRCQUdrQjtBQUNmLG1CQUFPO0FBQ0gsc0JBQU0sbUJBQVMsT0FBVCxFQUFrQixJQUFsQixFQUF3QixHQUF4QixFQUE2QixxQkFBV0ksbUJBQXhDLENBREg7QUFFSCx1QkFBTyxtQkFBUyxXQUFULEVBQXNCLEtBQXRCLEVBQTZCQyxLQUFLQyxHQUFMLENBQVMsRUFBVCxFQUFhLENBQWIsQ0FBN0IsRUFBOEMscUJBQVdGLG1CQUF6RCxDQUZKO0FBR0gsdUJBQU8sbUJBQVMsV0FBVCxFQUFzQixLQUF0QixFQUE2QkMsS0FBS0MsR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFiLENBQTdCLEVBQThDLHFCQUFXRixtQkFBekQsQ0FISjtBQUlILHVCQUFPLG1CQUFTLFdBQVQsRUFBc0IsS0FBdEIsRUFBNkJDLEtBQUtDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBYixDQUE3QixFQUE4QyxxQkFBV0YsbUJBQXpEO0FBSkosYUFBUDtBQU1IOzs7NEJBRXdCO0FBQ3JCLG1CQUFPTixVQUFVSSxLQUFWLENBQWdCSyxFQUF2QjtBQUNIOzs7OztrQkFHVVQsUyIsImZpbGUiOiJxdWFudGl0aWVzL0ZyZXF1ZW5jeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUXVhbnRpdHkgZnJvbSAnLi9iYXNlL0Jhc2VRdWFudGl0eSc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL2Jhc2UvVW5pdCc7XG5pbXBvcnQgRGltZW5zaW9ucyBmcm9tICcuL2Jhc2UvRGltZW5zaW9ucyc7XG5cbmNsYXNzIEZyZXF1ZW5jeSBleHRlbmRzIEJhc2VRdWFudGl0eSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHVuaXQgPSBGcmVxdWVuY3kuZGVmYXVsdFVuaXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdW5pdCA9IEZyZXF1ZW5jeS51bml0c1t1bml0LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHZhbHVlLCB1bml0KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZXQgdW5pdHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnaHonOiBuZXcgVW5pdCgnSGVydHonLCAnSHonLCAxLjAsIERpbWVuc2lvbnMuRElNRU5TSU9OX0ZSRVFVRU5DWSksXG4gICAgICAgICAgICAna2h6JzogbmV3IFVuaXQoJ0tpbG9oZXJ0eicsICdrSHonLCBNYXRoLnBvdygxMCwgMyksIERpbWVuc2lvbnMuRElNRU5TSU9OX0ZSRVFVRU5DWSksXG4gICAgICAgICAgICAnbWh6JzogbmV3IFVuaXQoJ01lZ2FoZXJ0eicsICdNSHonLCBNYXRoLnBvdygxMCwgNiksIERpbWVuc2lvbnMuRElNRU5TSU9OX0ZSRVFVRU5DWSksXG4gICAgICAgICAgICAnZ2h6JzogbmV3IFVuaXQoJ0dpZ2FoZXJ0eicsICdHSHonLCBNYXRoLnBvdygxMCwgOSksIERpbWVuc2lvbnMuRElNRU5TSU9OX0ZSRVFVRU5DWSlcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRVbml0KCkge1xuICAgICAgICByZXR1cm4gRnJlcXVlbmN5LnVuaXRzLmh6O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRnJlcXVlbmN5OyJdfQ==
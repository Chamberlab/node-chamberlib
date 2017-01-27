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

var Voltage = function (_BaseQuantity) {
    (0, _inherits3.default)(Voltage, _BaseQuantity);

    function Voltage(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Voltage.defaultUnit;
        (0, _classCallCheck3.default)(this, Voltage);

        if (typeof unit === 'string') {
            unit = Voltage.units[unit.toLowerCase()];
        }
        return (0, _possibleConstructorReturn3.default)(this, (Voltage.__proto__ || (0, _getPrototypeOf2.default)(Voltage)).call(this, value, unit));
    }

    (0, _createClass3.default)(Voltage, null, [{
        key: 'units',
        get: function get() {
            return {
                'v': new _Unit2.default('Volt', 'V', 1, _Dimensions2.default.VOLTAGE),
                'mv': new _Unit2.default('Millivolt', 'mV', Math.pow(10, -3), _Dimensions2.default.VOLTAGE)
            };
        }
    }, {
        key: 'defaultUnit',
        get: function get() {
            return Voltage.units.v;
        }
    }]);
    return Voltage;
}(_BaseQuantity3.default);

exports.default = Voltage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvVm9sdGFnZS5qcyJdLCJuYW1lcyI6WyJWb2x0YWdlIiwidmFsdWUiLCJ1bml0IiwiZGVmYXVsdFVuaXQiLCJ1bml0cyIsInRvTG93ZXJDYXNlIiwiVk9MVEFHRSIsIk1hdGgiLCJwb3ciLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLE87OztBQUNGLHFCQUFZQyxLQUFaLEVBQStDO0FBQUEsWUFBNUJDLElBQTRCLHVFQUFyQkYsUUFBUUcsV0FBYTtBQUFBOztBQUMzQyxZQUFJLE9BQU9ELElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUJBLG1CQUFPRixRQUFRSSxLQUFSLENBQWNGLEtBQUtHLFdBQUwsRUFBZCxDQUFQO0FBQ0g7QUFIMEMsdUlBSXJDSixLQUpxQyxFQUk5QkMsSUFKOEI7QUFLOUM7Ozs7NEJBRWtCO0FBQ2YsbUJBQU87QUFDSCxxQkFBSyxtQkFBUyxNQUFULEVBQWlCLEdBQWpCLEVBQXNCLENBQXRCLEVBQXlCLHFCQUFXSSxPQUFwQyxDQURGO0FBRUgsc0JBQU0sbUJBQVMsV0FBVCxFQUFzQixJQUF0QixFQUE0QkMsS0FBS0MsR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFDLENBQWQsQ0FBNUIsRUFBOEMscUJBQVdGLE9BQXpEO0FBRkgsYUFBUDtBQUlIOzs7NEJBRXdCO0FBQ3JCLG1CQUFPTixRQUFRSSxLQUFSLENBQWNLLENBQXJCO0FBQ0g7Ozs7O2tCQUdVVCxPIiwiZmlsZSI6InF1YW50aXRpZXMvVm9sdGFnZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUXVhbnRpdHkgZnJvbSAnLi9iYXNlL0Jhc2VRdWFudGl0eSc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL2Jhc2UvVW5pdCc7XG5pbXBvcnQgRGltZW5zaW9ucyBmcm9tICcuL2Jhc2UvRGltZW5zaW9ucyc7XG5cbmNsYXNzIFZvbHRhZ2UgZXh0ZW5kcyBCYXNlUXVhbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCB1bml0ID0gVm9sdGFnZS5kZWZhdWx0VW5pdCkge1xuICAgICAgICBpZiAodHlwZW9mIHVuaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB1bml0ID0gVm9sdGFnZS51bml0c1t1bml0LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHZhbHVlLCB1bml0KTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IHVuaXRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3YnOiBuZXcgVW5pdCgnVm9sdCcsICdWJywgMSwgRGltZW5zaW9ucy5WT0xUQUdFKSxcbiAgICAgICAgICAgICdtdic6IG5ldyBVbml0KCdNaWxsaXZvbHQnLCAnbVYnLCBNYXRoLnBvdygxMCwgLTMpLCBEaW1lbnNpb25zLlZPTFRBR0UpLFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFVuaXQoKSB7XG4gICAgICAgIHJldHVybiBWb2x0YWdlLnVuaXRzLnY7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBWb2x0YWdlOyJdfQ==
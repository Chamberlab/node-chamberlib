'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseQuantity2 = require('./base/BaseQuantity');

var _BaseQuantity3 = _interopRequireDefault(_BaseQuantity2);

var _Unit = require('./base/Unit');

var _Unit2 = _interopRequireDefault(_Unit);

var _Dimensions = require('./base/Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Voltage = function (_BaseQuantity) {
    _inherits(Voltage, _BaseQuantity);

    function Voltage(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Voltage.defaultUnit;

        _classCallCheck(this, Voltage);

        if (typeof unit === 'string') {
            unit = Voltage.units[unit.toLowerCase()];
        }
        return _possibleConstructorReturn(this, (Voltage.__proto__ || Object.getPrototypeOf(Voltage)).call(this, value, unit));
    }

    _createClass(Voltage, null, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvVm9sdGFnZS5qcyJdLCJuYW1lcyI6WyJWb2x0YWdlIiwidmFsdWUiLCJ1bml0IiwiZGVmYXVsdFVuaXQiLCJ1bml0cyIsInRvTG93ZXJDYXNlIiwiVk9MVEFHRSIsIk1hdGgiLCJwb3ciLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLE87OztBQUNGLHFCQUFZQyxLQUFaLEVBQStDO0FBQUEsWUFBNUJDLElBQTRCLHVFQUFyQkYsUUFBUUcsV0FBYTs7QUFBQTs7QUFDM0MsWUFBSSxPQUFPRCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCQSxtQkFBT0YsUUFBUUksS0FBUixDQUFjRixLQUFLRyxXQUFMLEVBQWQsQ0FBUDtBQUNIO0FBSDBDLGlIQUlyQ0osS0FKcUMsRUFJOUJDLElBSjhCO0FBSzlDOzs7OzRCQUVrQjtBQUNmLG1CQUFPO0FBQ0gscUJBQUssbUJBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixDQUF0QixFQUF5QixxQkFBV0ksT0FBcEMsQ0FERjtBQUVILHNCQUFNLG1CQUFTLFdBQVQsRUFBc0IsSUFBdEIsRUFBNEJDLEtBQUtDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBQyxDQUFkLENBQTVCLEVBQThDLHFCQUFXRixPQUF6RDtBQUZILGFBQVA7QUFJSDs7OzRCQUV3QjtBQUNyQixtQkFBT04sUUFBUUksS0FBUixDQUFjSyxDQUFyQjtBQUNIOzs7Ozs7a0JBR1VULE8iLCJmaWxlIjoicXVhbnRpdGllcy9Wb2x0YWdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VRdWFudGl0eSBmcm9tICcuL2Jhc2UvQmFzZVF1YW50aXR5JztcbmltcG9ydCBVbml0IGZyb20gJy4vYmFzZS9Vbml0JztcbmltcG9ydCBEaW1lbnNpb25zIGZyb20gJy4vYmFzZS9EaW1lbnNpb25zJztcblxuY2xhc3MgVm9sdGFnZSBleHRlbmRzIEJhc2VRdWFudGl0eSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHVuaXQgPSBWb2x0YWdlLmRlZmF1bHRVbml0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdW5pdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHVuaXQgPSBWb2x0YWdlLnVuaXRzW3VuaXQudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIodmFsdWUsIHVuaXQpO1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgdW5pdHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAndic6IG5ldyBVbml0KCdWb2x0JywgJ1YnLCAxLCBEaW1lbnNpb25zLlZPTFRBR0UpLFxuICAgICAgICAgICAgJ212JzogbmV3IFVuaXQoJ01pbGxpdm9sdCcsICdtVicsIE1hdGgucG93KDEwLCAtMyksIERpbWVuc2lvbnMuVk9MVEFHRSksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0VW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIFZvbHRhZ2UudW5pdHMudjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFZvbHRhZ2U7Il19
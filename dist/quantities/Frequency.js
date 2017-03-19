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

var Frequency = function (_BaseQuantity) {
    _inherits(Frequency, _BaseQuantity);

    function Frequency(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Frequency.defaultUnit;

        _classCallCheck(this, Frequency);

        if (typeof unit === 'string') {
            unit = Frequency.units[unit.toLowerCase()];
        }
        return _possibleConstructorReturn(this, (Frequency.__proto__ || Object.getPrototypeOf(Frequency)).call(this, value, unit));
    }

    _createClass(Frequency, null, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvRnJlcXVlbmN5LmpzIl0sIm5hbWVzIjpbIkZyZXF1ZW5jeSIsInZhbHVlIiwidW5pdCIsImRlZmF1bHRVbml0IiwidW5pdHMiLCJ0b0xvd2VyQ2FzZSIsIkRJTUVOU0lPTl9GUkVRVUVOQ1kiLCJNYXRoIiwicG93IiwiaHoiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsUzs7O0FBQ0YsdUJBQVlDLEtBQVosRUFBaUQ7QUFBQSxZQUE5QkMsSUFBOEIsdUVBQXZCRixVQUFVRyxXQUFhOztBQUFBOztBQUM3QyxZQUFJLE9BQU9ELElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUJBLG1CQUFPRixVQUFVSSxLQUFWLENBQWdCRixLQUFLRyxXQUFMLEVBQWhCLENBQVA7QUFDSDtBQUg0QyxxSEFJdkNKLEtBSnVDLEVBSWhDQyxJQUpnQztBQUtoRDs7Ozs0QkFHa0I7QUFDZixtQkFBTztBQUNILHNCQUFNLG1CQUFTLE9BQVQsRUFBa0IsSUFBbEIsRUFBd0IsR0FBeEIsRUFBNkIscUJBQVdJLG1CQUF4QyxDQURIO0FBRUgsdUJBQU8sbUJBQVMsV0FBVCxFQUFzQixLQUF0QixFQUE2QkMsS0FBS0MsR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFiLENBQTdCLEVBQThDLHFCQUFXRixtQkFBekQsQ0FGSjtBQUdILHVCQUFPLG1CQUFTLFdBQVQsRUFBc0IsS0FBdEIsRUFBNkJDLEtBQUtDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBYixDQUE3QixFQUE4QyxxQkFBV0YsbUJBQXpELENBSEo7QUFJSCx1QkFBTyxtQkFBUyxXQUFULEVBQXNCLEtBQXRCLEVBQTZCQyxLQUFLQyxHQUFMLENBQVMsRUFBVCxFQUFhLENBQWIsQ0FBN0IsRUFBOEMscUJBQVdGLG1CQUF6RDtBQUpKLGFBQVA7QUFNSDs7OzRCQUV3QjtBQUNyQixtQkFBT04sVUFBVUksS0FBVixDQUFnQkssRUFBdkI7QUFDSDs7Ozs7O2tCQUdVVCxTIiwiZmlsZSI6InF1YW50aXRpZXMvRnJlcXVlbmN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VRdWFudGl0eSBmcm9tICcuL2Jhc2UvQmFzZVF1YW50aXR5JztcbmltcG9ydCBVbml0IGZyb20gJy4vYmFzZS9Vbml0JztcbmltcG9ydCBEaW1lbnNpb25zIGZyb20gJy4vYmFzZS9EaW1lbnNpb25zJztcblxuY2xhc3MgRnJlcXVlbmN5IGV4dGVuZHMgQmFzZVF1YW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgdW5pdCA9IEZyZXF1ZW5jeS5kZWZhdWx0VW5pdCkge1xuICAgICAgICBpZiAodHlwZW9mIHVuaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB1bml0ID0gRnJlcXVlbmN5LnVuaXRzW3VuaXQudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIodmFsdWUsIHVuaXQpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGdldCB1bml0cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdoeic6IG5ldyBVbml0KCdIZXJ0eicsICdIeicsIDEuMCwgRGltZW5zaW9ucy5ESU1FTlNJT05fRlJFUVVFTkNZKSxcbiAgICAgICAgICAgICdraHonOiBuZXcgVW5pdCgnS2lsb2hlcnR6JywgJ2tIeicsIE1hdGgucG93KDEwLCAzKSwgRGltZW5zaW9ucy5ESU1FTlNJT05fRlJFUVVFTkNZKSxcbiAgICAgICAgICAgICdtaHonOiBuZXcgVW5pdCgnTWVnYWhlcnR6JywgJ01IeicsIE1hdGgucG93KDEwLCA2KSwgRGltZW5zaW9ucy5ESU1FTlNJT05fRlJFUVVFTkNZKSxcbiAgICAgICAgICAgICdnaHonOiBuZXcgVW5pdCgnR2lnYWhlcnR6JywgJ0dIeicsIE1hdGgucG93KDEwLCA5KSwgRGltZW5zaW9ucy5ESU1FTlNJT05fRlJFUVVFTkNZKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFVuaXQoKSB7XG4gICAgICAgIHJldHVybiBGcmVxdWVuY3kudW5pdHMuaHo7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBGcmVxdWVuY3k7Il19
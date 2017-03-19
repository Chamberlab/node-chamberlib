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

var Time = function (_BaseQuantity) {
    _inherits(Time, _BaseQuantity);

    function Time(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Time.defaultUnit;

        _classCallCheck(this, Time);

        if (typeof unit === 'string') {
            unit = Time.units[unit.toLowerCase()];
        }
        return _possibleConstructorReturn(this, (Time.__proto__ || Object.getPrototypeOf(Time)).call(this, value, unit));
    }

    _createClass(Time, null, [{
        key: 'units',
        get: function get() {
            return {
                's': new _Unit2.default('Second', 's', 1.0, _Dimensions2.default.DIMENSION_TEMPORAL),
                'ms': new _Unit2.default('Millisecond', 'ms', Math.pow(10, -3), _Dimensions2.default.DIMENSION_TEMPORAL),
                'mu': new _Unit2.default('Microseconds', 'mu', Math.pow(10, -6), _Dimensions2.default.DIMENSION_TEMPORAL),
                'ns': new _Unit2.default('Nanosecond', 'ns', Math.pow(10, -9), _Dimensions2.default.DIMENSION_TEMPORAL)
            };
        }
    }, {
        key: 'defaultUnit',
        get: function get() {
            return Time.units.s;
        }
    }]);

    return Time;
}(_BaseQuantity3.default);

exports.default = Time;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvVGltZS5qcyJdLCJuYW1lcyI6WyJUaW1lIiwidmFsdWUiLCJ1bml0IiwiZGVmYXVsdFVuaXQiLCJ1bml0cyIsInRvTG93ZXJDYXNlIiwiRElNRU5TSU9OX1RFTVBPUkFMIiwiTWF0aCIsInBvdyIsInMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsSTs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBNEM7QUFBQSxZQUF6QkMsSUFBeUIsdUVBQWxCRixLQUFLRyxXQUFhOztBQUFBOztBQUN4QyxZQUFJLE9BQU9ELElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7QUFDMUJBLG1CQUFPRixLQUFLSSxLQUFMLENBQVdGLEtBQUtHLFdBQUwsRUFBWCxDQUFQO0FBQ0g7QUFIdUMsMkdBSWxDSixLQUprQyxFQUkzQkMsSUFKMkI7QUFLM0M7Ozs7NEJBR2tCO0FBQ2YsbUJBQU87QUFDSCxxQkFBSyxtQkFBUyxRQUFULEVBQW1CLEdBQW5CLEVBQXdCLEdBQXhCLEVBQTZCLHFCQUFXSSxrQkFBeEMsQ0FERjtBQUVILHNCQUFNLG1CQUFTLGFBQVQsRUFBd0IsSUFBeEIsRUFBOEJDLEtBQUtDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBQyxDQUFkLENBQTlCLEVBQWdELHFCQUFXRixrQkFBM0QsQ0FGSDtBQUdILHNCQUFNLG1CQUFTLGNBQVQsRUFBeUIsSUFBekIsRUFBK0JDLEtBQUtDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBQyxDQUFkLENBQS9CLEVBQWlELHFCQUFXRixrQkFBNUQsQ0FISDtBQUlILHNCQUFNLG1CQUFTLFlBQVQsRUFBdUIsSUFBdkIsRUFBNkJDLEtBQUtDLEdBQUwsQ0FBUyxFQUFULEVBQWEsQ0FBQyxDQUFkLENBQTdCLEVBQStDLHFCQUFXRixrQkFBMUQ7QUFKSCxhQUFQO0FBTUg7Ozs0QkFFd0I7QUFDckIsbUJBQU9OLEtBQUtJLEtBQUwsQ0FBV0ssQ0FBbEI7QUFDSDs7Ozs7O2tCQUdVVCxJIiwiZmlsZSI6InF1YW50aXRpZXMvVGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUXVhbnRpdHkgZnJvbSAnLi9iYXNlL0Jhc2VRdWFudGl0eSc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL2Jhc2UvVW5pdCc7XG5pbXBvcnQgRGltZW5zaW9ucyBmcm9tICcuL2Jhc2UvRGltZW5zaW9ucyc7XG5cbmNsYXNzIFRpbWUgZXh0ZW5kcyBCYXNlUXVhbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCB1bml0ID0gVGltZS5kZWZhdWx0VW5pdCkge1xuICAgICAgICBpZiAodHlwZW9mIHVuaXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB1bml0ID0gVGltZS51bml0c1t1bml0LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHZhbHVlLCB1bml0KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZXQgdW5pdHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAncyc6IG5ldyBVbml0KCdTZWNvbmQnLCAncycsIDEuMCwgRGltZW5zaW9ucy5ESU1FTlNJT05fVEVNUE9SQUwpLFxuICAgICAgICAgICAgJ21zJzogbmV3IFVuaXQoJ01pbGxpc2Vjb25kJywgJ21zJywgTWF0aC5wb3coMTAsIC0zKSwgRGltZW5zaW9ucy5ESU1FTlNJT05fVEVNUE9SQUwpLFxuICAgICAgICAgICAgJ211JzogbmV3IFVuaXQoJ01pY3Jvc2Vjb25kcycsICdtdScsIE1hdGgucG93KDEwLCAtNiksIERpbWVuc2lvbnMuRElNRU5TSU9OX1RFTVBPUkFMKSxcbiAgICAgICAgICAgICducyc6IG5ldyBVbml0KCdOYW5vc2Vjb25kJywgJ25zJywgTWF0aC5wb3coMTAsIC05KSwgRGltZW5zaW9ucy5ESU1FTlNJT05fVEVNUE9SQUwpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0VW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIFRpbWUudW5pdHMucztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRpbWU7Il19
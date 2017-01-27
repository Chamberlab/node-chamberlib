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

var Datasize = function (_BaseQuantity) {
    (0, _inherits3.default)(Datasize, _BaseQuantity);

    function Datasize(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Datasize.defaultUnit;
        (0, _classCallCheck3.default)(this, Datasize);

        if (typeof unit === 'string') {
            unit = Datasize.units[unit.toLowerCase()];
        }
        return (0, _possibleConstructorReturn3.default)(this, (Datasize.__proto__ || (0, _getPrototypeOf2.default)(Datasize)).call(this, value, unit));
    }

    (0, _createClass3.default)(Datasize, null, [{
        key: 'units',
        get: function get() {
            return {
                'b': new _Unit2.default('Byte', 'b', 1, _Dimensions2.default.DIMENSION_DATASTORAGE),
                'kb': new _Unit2.default('Kilobyte', 'Kb', 1024, _Dimensions2.default.DIMENSION_DATASTORAGE),
                'mb': new _Unit2.default('Megabyte', 'Mb', Math.pow(1024, 2), _Dimensions2.default.DIMENSION_DATASTORAGE),
                'gb': new _Unit2.default('Gigabyte', 'Gb', Math.pow(1024, 3), _Dimensions2.default.DIMENSION_DATASTORAGE),
                'tb': new _Unit2.default('Terabyte', 'Tb', Math.pow(1024, 4), _Dimensions2.default.DIMENSION_DATASTORAGE)
            };
        }
    }, {
        key: 'defaultUnit',
        get: function get() {
            return Datasize.units.b;
        }
    }]);
    return Datasize;
}(_BaseQuantity3.default);

exports.default = Datasize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvRGF0YXNpemUuanMiXSwibmFtZXMiOlsiRGF0YXNpemUiLCJ2YWx1ZSIsInVuaXQiLCJkZWZhdWx0VW5pdCIsInVuaXRzIiwidG9Mb3dlckNhc2UiLCJESU1FTlNJT05fREFUQVNUT1JBR0UiLCJNYXRoIiwicG93IiwiYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxROzs7QUFDRixzQkFBWUMsS0FBWixFQUFnRDtBQUFBLFlBQTdCQyxJQUE2Qix1RUFBdEJGLFNBQVNHLFdBQWE7QUFBQTs7QUFDNUMsWUFBSSxPQUFPRCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCQSxtQkFBT0YsU0FBU0ksS0FBVCxDQUFlRixLQUFLRyxXQUFMLEVBQWYsQ0FBUDtBQUNIO0FBSDJDLHlJQUl0Q0osS0FKc0MsRUFJL0JDLElBSitCO0FBSy9DOzs7OzRCQUdrQjtBQUNmLG1CQUFPO0FBQ0gscUJBQUssbUJBQVMsTUFBVCxFQUFpQixHQUFqQixFQUFzQixDQUF0QixFQUF5QixxQkFBV0kscUJBQXBDLENBREY7QUFFSCxzQkFBTSxtQkFBUyxVQUFULEVBQXFCLElBQXJCLEVBQTJCLElBQTNCLEVBQWlDLHFCQUFXQSxxQkFBNUMsQ0FGSDtBQUdILHNCQUFNLG1CQUFTLFVBQVQsRUFBcUIsSUFBckIsRUFBMkJDLEtBQUtDLEdBQUwsQ0FBUyxJQUFULEVBQWUsQ0FBZixDQUEzQixFQUE4QyxxQkFBV0YscUJBQXpELENBSEg7QUFJSCxzQkFBTSxtQkFBUyxVQUFULEVBQXFCLElBQXJCLEVBQTJCQyxLQUFLQyxHQUFMLENBQVMsSUFBVCxFQUFlLENBQWYsQ0FBM0IsRUFBOEMscUJBQVdGLHFCQUF6RCxDQUpIO0FBS0gsc0JBQU0sbUJBQVMsVUFBVCxFQUFxQixJQUFyQixFQUEyQkMsS0FBS0MsR0FBTCxDQUFTLElBQVQsRUFBZSxDQUFmLENBQTNCLEVBQThDLHFCQUFXRixxQkFBekQ7QUFMSCxhQUFQO0FBT0g7Ozs0QkFFd0I7QUFDckIsbUJBQU9OLFNBQVNJLEtBQVQsQ0FBZUssQ0FBdEI7QUFDSDs7Ozs7a0JBR1VULFEiLCJmaWxlIjoicXVhbnRpdGllcy9EYXRhc2l6ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlUXVhbnRpdHkgZnJvbSAnLi9iYXNlL0Jhc2VRdWFudGl0eSc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL2Jhc2UvVW5pdCc7XG5pbXBvcnQgRGltZW5zaW9ucyBmcm9tICcuL2Jhc2UvRGltZW5zaW9ucyc7XG5cbmNsYXNzIERhdGFzaXplIGV4dGVuZHMgQmFzZVF1YW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgdW5pdCA9IERhdGFzaXplLmRlZmF1bHRVbml0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgdW5pdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHVuaXQgPSBEYXRhc2l6ZS51bml0c1t1bml0LnRvTG93ZXJDYXNlKCldO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHZhbHVlLCB1bml0KTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBnZXQgdW5pdHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnYic6IG5ldyBVbml0KCdCeXRlJywgJ2InLCAxLCBEaW1lbnNpb25zLkRJTUVOU0lPTl9EQVRBU1RPUkFHRSksXG4gICAgICAgICAgICAna2InOiBuZXcgVW5pdCgnS2lsb2J5dGUnLCAnS2InLCAxMDI0LCBEaW1lbnNpb25zLkRJTUVOU0lPTl9EQVRBU1RPUkFHRSksXG4gICAgICAgICAgICAnbWInOiBuZXcgVW5pdCgnTWVnYWJ5dGUnLCAnTWInLCBNYXRoLnBvdygxMDI0LCAyKSwgRGltZW5zaW9ucy5ESU1FTlNJT05fREFUQVNUT1JBR0UpLFxuICAgICAgICAgICAgJ2diJzogbmV3IFVuaXQoJ0dpZ2FieXRlJywgJ0diJywgTWF0aC5wb3coMTAyNCwgMyksIERpbWVuc2lvbnMuRElNRU5TSU9OX0RBVEFTVE9SQUdFKSxcbiAgICAgICAgICAgICd0Yic6IG5ldyBVbml0KCdUZXJhYnl0ZScsICdUYicsIE1hdGgucG93KDEwMjQsIDQpLCBEaW1lbnNpb25zLkRJTUVOU0lPTl9EQVRBU1RPUkFHRSksXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0VW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIERhdGFzaXplLnVuaXRzLmI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhc2l6ZTsiXX0=
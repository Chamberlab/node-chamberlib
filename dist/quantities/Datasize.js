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

var Datasize = function (_BaseQuantity) {
    _inherits(Datasize, _BaseQuantity);

    function Datasize(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Datasize.defaultUnit;

        _classCallCheck(this, Datasize);

        if (typeof unit === 'string') {
            unit = Datasize.units[unit.toLowerCase()];
        }
        return _possibleConstructorReturn(this, (Datasize.__proto__ || Object.getPrototypeOf(Datasize)).call(this, value, unit));
    }

    _createClass(Datasize, null, [{
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvRGF0YXNpemUuanMiXSwibmFtZXMiOlsiRGF0YXNpemUiLCJ2YWx1ZSIsInVuaXQiLCJkZWZhdWx0VW5pdCIsInVuaXRzIiwidG9Mb3dlckNhc2UiLCJESU1FTlNJT05fREFUQVNUT1JBR0UiLCJNYXRoIiwicG93IiwiYiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxROzs7QUFDRixzQkFBWUMsS0FBWixFQUFnRDtBQUFBLFlBQTdCQyxJQUE2Qix1RUFBdEJGLFNBQVNHLFdBQWE7O0FBQUE7O0FBQzVDLFlBQUksT0FBT0QsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQkEsbUJBQU9GLFNBQVNJLEtBQVQsQ0FBZUYsS0FBS0csV0FBTCxFQUFmLENBQVA7QUFDSDtBQUgyQyxtSEFJdENKLEtBSnNDLEVBSS9CQyxJQUorQjtBQUsvQzs7Ozs0QkFHa0I7QUFDZixtQkFBTztBQUNILHFCQUFLLG1CQUFTLE1BQVQsRUFBaUIsR0FBakIsRUFBc0IsQ0FBdEIsRUFBeUIscUJBQVdJLHFCQUFwQyxDQURGO0FBRUgsc0JBQU0sbUJBQVMsVUFBVCxFQUFxQixJQUFyQixFQUEyQixJQUEzQixFQUFpQyxxQkFBV0EscUJBQTVDLENBRkg7QUFHSCxzQkFBTSxtQkFBUyxVQUFULEVBQXFCLElBQXJCLEVBQTJCQyxLQUFLQyxHQUFMLENBQVMsSUFBVCxFQUFlLENBQWYsQ0FBM0IsRUFBOEMscUJBQVdGLHFCQUF6RCxDQUhIO0FBSUgsc0JBQU0sbUJBQVMsVUFBVCxFQUFxQixJQUFyQixFQUEyQkMsS0FBS0MsR0FBTCxDQUFTLElBQVQsRUFBZSxDQUFmLENBQTNCLEVBQThDLHFCQUFXRixxQkFBekQsQ0FKSDtBQUtILHNCQUFNLG1CQUFTLFVBQVQsRUFBcUIsSUFBckIsRUFBMkJDLEtBQUtDLEdBQUwsQ0FBUyxJQUFULEVBQWUsQ0FBZixDQUEzQixFQUE4QyxxQkFBV0YscUJBQXpEO0FBTEgsYUFBUDtBQU9IOzs7NEJBRXdCO0FBQ3JCLG1CQUFPTixTQUFTSSxLQUFULENBQWVLLENBQXRCO0FBQ0g7Ozs7OztrQkFHVVQsUSIsImZpbGUiOiJxdWFudGl0aWVzL0RhdGFzaXplLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VRdWFudGl0eSBmcm9tICcuL2Jhc2UvQmFzZVF1YW50aXR5JztcbmltcG9ydCBVbml0IGZyb20gJy4vYmFzZS9Vbml0JztcbmltcG9ydCBEaW1lbnNpb25zIGZyb20gJy4vYmFzZS9EaW1lbnNpb25zJztcblxuY2xhc3MgRGF0YXNpemUgZXh0ZW5kcyBCYXNlUXVhbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCB1bml0ID0gRGF0YXNpemUuZGVmYXVsdFVuaXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdW5pdCA9IERhdGFzaXplLnVuaXRzW3VuaXQudG9Mb3dlckNhc2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIodmFsdWUsIHVuaXQpO1xuICAgIH1cblxuXG4gICAgc3RhdGljIGdldCB1bml0cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdiJzogbmV3IFVuaXQoJ0J5dGUnLCAnYicsIDEsIERpbWVuc2lvbnMuRElNRU5TSU9OX0RBVEFTVE9SQUdFKSxcbiAgICAgICAgICAgICdrYic6IG5ldyBVbml0KCdLaWxvYnl0ZScsICdLYicsIDEwMjQsIERpbWVuc2lvbnMuRElNRU5TSU9OX0RBVEFTVE9SQUdFKSxcbiAgICAgICAgICAgICdtYic6IG5ldyBVbml0KCdNZWdhYnl0ZScsICdNYicsIE1hdGgucG93KDEwMjQsIDIpLCBEaW1lbnNpb25zLkRJTUVOU0lPTl9EQVRBU1RPUkFHRSksXG4gICAgICAgICAgICAnZ2InOiBuZXcgVW5pdCgnR2lnYWJ5dGUnLCAnR2InLCBNYXRoLnBvdygxMDI0LCAzKSwgRGltZW5zaW9ucy5ESU1FTlNJT05fREFUQVNUT1JBR0UpLFxuICAgICAgICAgICAgJ3RiJzogbmV3IFVuaXQoJ1RlcmFieXRlJywgJ1RiJywgTWF0aC5wb3coMTAyNCwgNCksIERpbWVuc2lvbnMuRElNRU5TSU9OX0RBVEFTVE9SQUdFKSxcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRVbml0KCkge1xuICAgICAgICByZXR1cm4gRGF0YXNpemUudW5pdHMuYjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFzaXplOyJdfQ==
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

var Time = function (_BaseQuantity) {
    (0, _inherits3.default)(Time, _BaseQuantity);

    function Time(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Time.defaultUnit;
        (0, _classCallCheck3.default)(this, Time);

        if (typeof unit === 'string') {
            unit = Time.units[unit.toLowerCase()];
        }
        return (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).call(this, value, unit));
    }

    (0, _createClass3.default)(Time, null, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvVGltZS5qcyJdLCJuYW1lcyI6WyJUaW1lIiwidmFsdWUiLCJ1bml0IiwiZGVmYXVsdFVuaXQiLCJ1bml0cyIsInRvTG93ZXJDYXNlIiwiRElNRU5TSU9OX1RFTVBPUkFMIiwiTWF0aCIsInBvdyIsInMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsSTs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBNEM7QUFBQSxZQUF6QkMsSUFBeUIsdUVBQWxCRixLQUFLRyxXQUFhO0FBQUE7O0FBQ3hDLFlBQUksT0FBT0QsSUFBUCxLQUFnQixRQUFwQixFQUE4QjtBQUMxQkEsbUJBQU9GLEtBQUtJLEtBQUwsQ0FBV0YsS0FBS0csV0FBTCxFQUFYLENBQVA7QUFDSDtBQUh1QyxpSUFJbENKLEtBSmtDLEVBSTNCQyxJQUoyQjtBQUszQzs7Ozs0QkFHa0I7QUFDZixtQkFBTztBQUNILHFCQUFLLG1CQUFTLFFBQVQsRUFBbUIsR0FBbkIsRUFBd0IsR0FBeEIsRUFBNkIscUJBQVdJLGtCQUF4QyxDQURGO0FBRUgsc0JBQU0sbUJBQVMsYUFBVCxFQUF3QixJQUF4QixFQUE4QkMsS0FBS0MsR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFDLENBQWQsQ0FBOUIsRUFBZ0QscUJBQVdGLGtCQUEzRCxDQUZIO0FBR0gsc0JBQU0sbUJBQVMsY0FBVCxFQUF5QixJQUF6QixFQUErQkMsS0FBS0MsR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFDLENBQWQsQ0FBL0IsRUFBaUQscUJBQVdGLGtCQUE1RCxDQUhIO0FBSUgsc0JBQU0sbUJBQVMsWUFBVCxFQUF1QixJQUF2QixFQUE2QkMsS0FBS0MsR0FBTCxDQUFTLEVBQVQsRUFBYSxDQUFDLENBQWQsQ0FBN0IsRUFBK0MscUJBQVdGLGtCQUExRDtBQUpILGFBQVA7QUFNSDs7OzRCQUV3QjtBQUNyQixtQkFBT04sS0FBS0ksS0FBTCxDQUFXSyxDQUFsQjtBQUNIOzs7OztrQkFHVVQsSSIsImZpbGUiOiJxdWFudGl0aWVzL1RpbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZVF1YW50aXR5IGZyb20gJy4vYmFzZS9CYXNlUXVhbnRpdHknO1xuaW1wb3J0IFVuaXQgZnJvbSAnLi9iYXNlL1VuaXQnO1xuaW1wb3J0IERpbWVuc2lvbnMgZnJvbSAnLi9iYXNlL0RpbWVuc2lvbnMnO1xuXG5jbGFzcyBUaW1lIGV4dGVuZHMgQmFzZVF1YW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgdW5pdCA9IFRpbWUuZGVmYXVsdFVuaXQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bml0ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgdW5pdCA9IFRpbWUudW5pdHNbdW5pdC50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgfVxuICAgICAgICBzdXBlcih2YWx1ZSwgdW5pdCk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2V0IHVuaXRzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3MnOiBuZXcgVW5pdCgnU2Vjb25kJywgJ3MnLCAxLjAsIERpbWVuc2lvbnMuRElNRU5TSU9OX1RFTVBPUkFMKSxcbiAgICAgICAgICAgICdtcyc6IG5ldyBVbml0KCdNaWxsaXNlY29uZCcsICdtcycsIE1hdGgucG93KDEwLCAtMyksIERpbWVuc2lvbnMuRElNRU5TSU9OX1RFTVBPUkFMKSxcbiAgICAgICAgICAgICdtdSc6IG5ldyBVbml0KCdNaWNyb3NlY29uZHMnLCAnbXUnLCBNYXRoLnBvdygxMCwgLTYpLCBEaW1lbnNpb25zLkRJTUVOU0lPTl9URU1QT1JBTCksXG4gICAgICAgICAgICAnbnMnOiBuZXcgVW5pdCgnTmFub3NlY29uZCcsICducycsIE1hdGgucG93KDEwLCAtOSksIERpbWVuc2lvbnMuRElNRU5TSU9OX1RFTVBPUkFMKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFVuaXQoKSB7XG4gICAgICAgIHJldHVybiBUaW1lLnVuaXRzLnM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBUaW1lOyJdfQ==
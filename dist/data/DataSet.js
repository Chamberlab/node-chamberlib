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

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _DataChannel = require('./DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _JSONFile = require('../io/file/JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataSet = function (_BaseCollection) {
    (0, _inherits3.default)(DataSet, _BaseCollection);

    function DataSet(channels) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        (0, _classCallCheck3.default)(this, DataSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataSet.__proto__ || (0, _getPrototypeOf2.default)(DataSet)).call(this, channels, _DataChannel2.default, uuid));

        _this.title = title;
        return _this;
    }

    // TODO: move this or make it more general


    (0, _createClass3.default)(DataSet, [{
        key: 'loadJson',
        value: function loadJson(filepath) {
            var importerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var _self = this;
            _self.title = title || _path2.default.basename(filepath, '.json');

            if (importerClass) {
                return new importerClass().read(filepath).map(function (channel) {
                    _self.push(channel);
                });
            }

            return new _JSONFile2.default().read(filepath).then(function (data) {
                return data;
            });
        }
    }]);
    return DataSet;
}(_BaseCollection3.default);

exports.default = DataSet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvRGF0YVNldC5qcyJdLCJuYW1lcyI6WyJEYXRhU2V0IiwiY2hhbm5lbHMiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInV1aWQiLCJmaWxlcGF0aCIsImltcG9ydGVyQ2xhc3MiLCJfc2VsZiIsImJhc2VuYW1lIiwicmVhZCIsIm1hcCIsImNoYW5uZWwiLCJwdXNoIiwidGhlbiIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxPOzs7QUFDRixxQkFBWUMsUUFBWixFQUEyRDtBQUFBLFlBQXJDQyxLQUFxQyx1RUFBN0JDLFNBQTZCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYRCxTQUFXO0FBQUE7O0FBQUEsNElBQ2pERixRQURpRCx5QkFDMUJHLElBRDBCOztBQUV2RCxjQUFLRixLQUFMLEdBQWFBLEtBQWI7QUFGdUQ7QUFHMUQ7O0FBRUQ7Ozs7O2lDQUNTRyxRLEVBQXdEO0FBQUEsZ0JBQTlDQyxhQUE4Qyx1RUFBOUJILFNBQThCO0FBQUEsZ0JBQW5CRCxLQUFtQix1RUFBWEMsU0FBVzs7QUFDN0QsZ0JBQUlJLFFBQVEsSUFBWjtBQUNBQSxrQkFBTUwsS0FBTixHQUFjQSxTQUFTLGVBQUtNLFFBQUwsQ0FBY0gsUUFBZCxFQUF3QixPQUF4QixDQUF2Qjs7QUFFQSxnQkFBSUMsYUFBSixFQUFtQjtBQUNmLHVCQUFPLElBQUlBLGFBQUosR0FBb0JHLElBQXBCLENBQXlCSixRQUF6QixFQUNGSyxHQURFLENBQ0UsVUFBVUMsT0FBVixFQUFtQjtBQUNwQkosMEJBQU1LLElBQU4sQ0FBV0QsT0FBWDtBQUNILGlCQUhFLENBQVA7QUFJSDs7QUFFRCxtQkFBTyx5QkFBZUYsSUFBZixDQUFvQkosUUFBcEIsRUFDRlEsSUFERSxDQUNHLFVBQVVDLElBQVYsRUFBZ0I7QUFDbEIsdUJBQU9BLElBQVA7QUFDSCxhQUhFLENBQVA7QUFJSDs7Ozs7a0JBR1VkLE8iLCJmaWxlIjoiZGF0YS9EYXRhU2V0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmltcG9ydCBEYXRhQ2hhbm5lbCBmcm9tICcuL0RhdGFDaGFubmVsJztcbmltcG9ydCBCYXNlQ29sbGVjdGlvbiBmcm9tICcuL0Jhc2VDb2xsZWN0aW9uJztcbmltcG9ydCBKU09ORmlsZSBmcm9tICcuLi9pby9maWxlL0pTT05GaWxlJztcblxuY2xhc3MgRGF0YVNldCBleHRlbmRzIEJhc2VDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcihjaGFubmVscywgdGl0bGUgPSB1bmRlZmluZWQsIHV1aWQgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoY2hhbm5lbHMsIERhdGFDaGFubmVsLCB1dWlkKTtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIH1cblxuICAgIC8vIFRPRE86IG1vdmUgdGhpcyBvciBtYWtlIGl0IG1vcmUgZ2VuZXJhbFxuICAgIGxvYWRKc29uKGZpbGVwYXRoLCBpbXBvcnRlckNsYXNzID0gdW5kZWZpbmVkLCB0aXRsZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICBfc2VsZi50aXRsZSA9IHRpdGxlIHx8IHBhdGguYmFzZW5hbWUoZmlsZXBhdGgsICcuanNvbicpO1xuXG4gICAgICAgIGlmIChpbXBvcnRlckNsYXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGltcG9ydGVyQ2xhc3MoKS5yZWFkKGZpbGVwYXRoKVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGNoYW5uZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYucHVzaChjaGFubmVsKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgSlNPTkZpbGUoKS5yZWFkKGZpbGVwYXRoKVxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRGF0YVNldDsiXX0=
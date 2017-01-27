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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseDB = function (_Emitter) {
    (0, _inherits3.default)(BaseDB, _Emitter);

    function BaseDB() {
        (0, _classCallCheck3.default)(this, BaseDB);
        return (0, _possibleConstructorReturn3.default)(this, (BaseDB.__proto__ || (0, _getPrototypeOf2.default)(BaseDB)).call(this));
    }

    (0, _createClass3.default)(BaseDB, [{
        key: 'get',
        value: function get(key) {
            (0, _assert2.default)(key instanceof _Time2.default);
        }
    }, {
        key: 'put',
        value: function put(key, val) {
            (0, _assert2.default)(key instanceof _Time2.default);
            (0, _assert2.default)(val instanceof _DataEvent2.default);
        }
    }]);
    return BaseDB;
}(_tinyEmitter2.default);

exports.default = BaseDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2RiL0Jhc2VEQi5qcyJdLCJuYW1lcyI6WyJCYXNlREIiLCJrZXkiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxNOzs7QUFDRixzQkFBYztBQUFBO0FBQUE7QUFFYjs7Ozs0QkFFR0MsRyxFQUFLO0FBQ0wsa0NBQU9BLDZCQUFQO0FBQ0g7Ozs0QkFFR0EsRyxFQUFLQyxHLEVBQUs7QUFDVixrQ0FBT0QsNkJBQVA7QUFDQSxrQ0FBT0Msa0NBQVA7QUFDSDs7Ozs7a0JBR1VGLE0iLCJmaWxlIjoiaW8vZGIvQmFzZURCLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IEVtaXR0ZXIgZnJvbSAndGlueS1lbWl0dGVyJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuXG5jbGFzcyBCYXNlREIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIGFzc2VydChrZXkgaW5zdGFuY2VvZiBUaW1lKTtcbiAgICB9XG5cbiAgICBwdXQoa2V5LCB2YWwpIHtcbiAgICAgICAgYXNzZXJ0KGtleSBpbnN0YW5jZW9mIFRpbWUpO1xuICAgICAgICBhc3NlcnQodmFsIGluc3RhbmNlb2YgRGF0YUV2ZW50KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VEQjsiXX0=
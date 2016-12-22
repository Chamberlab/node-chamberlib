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
        (0, _assert2.default)(Time.units[unit.suffix] instanceof _Unit2.default);

        return (0, _possibleConstructorReturn3.default)(this, (Time.__proto__ || (0, _getPrototypeOf2.default)(Time)).call(this, value, unit));
    }

    (0, _createClass3.default)(Time, null, [{
        key: 'units',
        get: function get() {
            return {
                's': new _Unit2.default('seconds', 's', 1.0, _Dimensions2.default.DIMENSION_TEMPORAL),
                'ms': new _Unit2.default('milliseconds', 'ms', 0.001, _Dimensions2.default.DIMENSION_TEMPORAL),
                'mu': new _Unit2.default('microseconds', 'mu', 0.000001, _Dimensions2.default.DIMENSION_TEMPORAL)
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
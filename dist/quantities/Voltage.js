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

var Voltage = function (_BaseQuantity) {
    (0, _inherits3.default)(Voltage, _BaseQuantity);

    function Voltage(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Voltage.defaultUnit;
        (0, _classCallCheck3.default)(this, Voltage);

        if (typeof unit === 'string') {
            unit = Voltage.units[unit.toLowerCase()];
        }
        (0, _assert2.default)(Voltage.units[unit.suffix] instanceof _Unit2.default);

        return (0, _possibleConstructorReturn3.default)(this, (Voltage.__proto__ || (0, _getPrototypeOf2.default)(Voltage)).call(this, value, unit));
    }

    (0, _createClass3.default)(Voltage, null, [{
        key: 'units',
        get: function get() {
            return {
                'v': new _Unit2.default('Volt', 'v', 1.0, _Dimensions2.default.DIMENSION_VOLTAGE),
                'mv': new _Unit2.default('MilliVolt', 'mv', 0.001, _Dimensions2.default.DIMENSION_VOLTAGE)
            };
        }
    }, {
        key: 'defaultUnit',
        get: function get() {
            return Voltage.units.mv;
        }
    }]);
    return Voltage;
}(_BaseQuantity3.default);

exports.default = Voltage;
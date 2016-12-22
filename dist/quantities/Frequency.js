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

var Frequency = function (_BaseQuantity) {
    (0, _inherits3.default)(Frequency, _BaseQuantity);

    function Frequency(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Frequency.defaultUnit;
        (0, _classCallCheck3.default)(this, Frequency);

        if (typeof unit === 'string') {
            unit = Frequency.units[unit.toLowerCase()];
        }
        (0, _assert2.default)(Frequency.units.hasOwnProperty(unit.suffix) > -1);

        return (0, _possibleConstructorReturn3.default)(this, (Frequency.__proto__ || (0, _getPrototypeOf2.default)(Frequency)).call(this, value, unit));
    }

    (0, _createClass3.default)(Frequency, null, [{
        key: 'units',
        get: function get() {
            return {
                'hz': new _Unit2.default('Hertz', 'hz', 1.0, _Dimensions2.default.DIMENSION_FREQUENCY),
                'khz': new _Unit2.default('Kilohertz', 'khz', 1000.0, _Dimensions2.default.DIMENSION_FREQUENCY)
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
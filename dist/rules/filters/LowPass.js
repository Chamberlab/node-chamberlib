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

var _BaseFilter2 = require('./BaseFilter');

var _BaseFilter3 = _interopRequireDefault(_BaseFilter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LowPass = function (_BaseFilter) {
    (0, _inherits3.default)(LowPass, _BaseFilter);

    function LowPass() {
        (0, _classCallCheck3.default)(this, LowPass);
        return (0, _possibleConstructorReturn3.default)(this, (LowPass.__proto__ || (0, _getPrototypeOf2.default)(LowPass)).apply(this, arguments));
    }

    (0, _createClass3.default)(LowPass, [{
        key: 'processorFunc',
        value: function processorFunc(event) {
            return event.value.normalized() < this.cutoff.normalized();
        }
    }]);
    return LowPass;
}(_BaseFilter3.default);

exports.default = LowPass;
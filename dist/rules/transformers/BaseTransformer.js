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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseRule2 = require('../BaseRule');

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseTransformer = function (_BaseRule) {
    (0, _inherits3.default)(BaseTransformer, _BaseRule);

    function BaseTransformer() {
        (0, _classCallCheck3.default)(this, BaseTransformer);
        return (0, _possibleConstructorReturn3.default)(this, (BaseTransformer.__proto__ || (0, _getPrototypeOf2.default)(BaseTransformer)).call(this));
    }

    (0, _createClass3.default)(BaseTransformer, [{
        key: 'evaluate',
        value: function evaluate(source, processorFunc) {
            (0, _get3.default)(BaseTransformer.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseTransformer.prototype), 'evaluate', this).call(this, source, processorFunc);
        }
    }, {
        key: 'processorFunc',
        value: function processorFunc(event) {
            return event;
        }
    }]);
    return BaseTransformer;
}(_BaseRule3.default);

exports.default = BaseTransformer;
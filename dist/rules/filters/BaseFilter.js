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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseRule2 = require('../BaseRule');

var _BaseRule3 = _interopRequireDefault(_BaseRule2);

var _BaseQuantity = require('../../quantities/base/BaseQuantity');

var _BaseQuantity2 = _interopRequireDefault(_BaseQuantity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseFilter = function (_BaseRule) {
    (0, _inherits3.default)(BaseFilter, _BaseRule);

    function BaseFilter(cutoff) {
        var replace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        (0, _classCallCheck3.default)(this, BaseFilter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseFilter.__proto__ || (0, _getPrototypeOf2.default)(BaseFilter)).call(this));

        _this.cutoff = cutoff;
        _this.replace = replace;
        return _this;
    }

    (0, _createClass3.default)(BaseFilter, [{
        key: 'evaluate',
        value: function evaluate(source, processorFunc) {
            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            return (0, _get3.default)(BaseFilter.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseFilter.prototype), 'evaluate', this).call(this, source, processorFunc, args);
        }
    }, {
        key: 'cutoff',
        set: function set(cutoff) {
            (0, _assert2.default)(cutoff instanceof _BaseQuantity2.default);
            this._cutoff = cutoff;
        },
        get: function get() {
            return this._cutoff;
        }
    }, {
        key: 'replace',
        set: function set(val) {
            if (val === null) {
                this._replace = val;
                return;
            }

            (0, _assert2.default)(val instanceof _BaseQuantity2.default);

            this._replace = val;
        },
        get: function get() {
            return this._cutoff;
        }
    }]);
    return BaseFilter;
}(_BaseRule3.default);

exports.default = BaseFilter;
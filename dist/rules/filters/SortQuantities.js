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

var _BaseFilter2 = require('./BaseFilter');

var _BaseFilter3 = _interopRequireDefault(_BaseFilter2);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _BaseQuantity = require('../../quantities/base/BaseQuantity');

var _BaseQuantity2 = _interopRequireDefault(_BaseQuantity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SortQuantities = function (_BaseFilter) {
    (0, _inherits3.default)(SortQuantities, _BaseFilter);

    function SortQuantities(property) {
        var reverse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        (0, _classCallCheck3.default)(this, SortQuantities);

        var _this = (0, _possibleConstructorReturn3.default)(this, (SortQuantities.__proto__ || (0, _getPrototypeOf2.default)(SortQuantities)).call(this));

        _this._property = property;
        _this._reverse = reverse;
        return _this;
    }

    (0, _createClass3.default)(SortQuantities, [{
        key: 'evaluate',
        value: function evaluate(source) {
            (0, _assert2.default)(source instanceof _DataChannel2.default);
            (0, _assert2.default)(source._childClass instanceof _BaseQuantity2.default);

            return this._items.sort(function (a, b) {
                (0, _assert2.default)(a.isCompatible(b));
                return this.filterFunc(a, b);
            });
        }
    }, {
        key: 'processorFunc',
        value: function processorFunc(a, b) {
            return a[this._property].compare(b[this._property]) * (this._reverse ? -1 : 1);
        }
    }]);
    return SortQuantities;
}(_BaseFilter3.default);

exports.default = SortQuantities;
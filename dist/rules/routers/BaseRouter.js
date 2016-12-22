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

var _BaseCollection = require('../../data/BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseRouter = function (_BaseRule) {
    (0, _inherits3.default)(BaseRouter, _BaseRule);

    function BaseRouter(destination) {
        var active = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        (0, _classCallCheck3.default)(this, BaseRouter);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseRouter.__proto__ || (0, _getPrototypeOf2.default)(BaseRouter)).call(this, active));

        _this.destination = destination;
        return _this;
    }

    (0, _createClass3.default)(BaseRouter, [{
        key: 'evaluate',
        value: function evaluate(source, processorFunc) {
            var _self = this;
            if (typeof processorFunc === 'function') {
                (0, _get3.default)(BaseRouter.prototype.__proto__ || (0, _getPrototypeOf2.default)(BaseRouter.prototype), 'evaluate', this).call(this, source, processorFunc);
            } else {
                source.all.map(function (event) {
                    _self.destination.push(event);
                });
            }
        }
    }, {
        key: 'destination',
        get: function get() {
            (0, _assert2.default)(this._destination instanceof _BaseCollection2.default);
            return this._destination;
        },
        set: function set(val) {
            (0, _assert2.default)(val instanceof _BaseCollection2.default || val.prototype instanceof _BaseCollection2.default);
            this._destination = val;
        }
    }]);
    return BaseRouter;
}(_BaseRule3.default);

exports.default = BaseRouter;
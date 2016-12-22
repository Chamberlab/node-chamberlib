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

var _BaseFilter2 = require('./BaseFilter');

var _BaseFilter3 = _interopRequireDefault(_BaseFilter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BandPass = function (_BaseFilter) {
    (0, _inherits3.default)(BandPass, _BaseFilter);

    function BandPass(base, width) {
        var replace = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        (0, _classCallCheck3.default)(this, BandPass);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BandPass.__proto__ || (0, _getPrototypeOf2.default)(BandPass)).call(this, base, replace));

        _this.width = width;
        return _this;
    }

    (0, _createClass3.default)(BandPass, [{
        key: 'processorFunc',
        value: function processorFunc(event) {
            var inRange = event.value.normalized() >= this.base.normalized() && event.value.normalized() < this.base.normalized() + this.width.normalized();

            if (inRange) {
                return event;
            } else {
                if (this._replace) {}
            }
        }
    }, {
        key: 'base',
        get: function get() {
            return this._cutoff;
        },
        set: function set(val) {
            this.cutoff = val;
        }
    }, {
        key: 'width',
        get: function get() {
            return this._width;
        },
        set: function set(width) {
            (0, _get3.default)(BandPass.prototype.__proto__ || (0, _getPrototypeOf2.default)(BandPass.prototype), 'validate', this).call(this, width);
            this._width = width;
        }
    }]);
    return BandPass;
}(_BaseFilter3.default);

exports.default = BandPass;
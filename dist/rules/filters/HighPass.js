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

var HighPass = function (_BaseFilter) {
    (0, _inherits3.default)(HighPass, _BaseFilter);

    function HighPass(cutoff) {
        (0, _classCallCheck3.default)(this, HighPass);

        var _this = (0, _possibleConstructorReturn3.default)(this, (HighPass.__proto__ || (0, _getPrototypeOf2.default)(HighPass)).call(this, cutoff));

        _this._cutoff = cutoff;
        return _this;
    }

    (0, _createClass3.default)(HighPass, [{
        key: 'evaluate',
        value: function evaluate(source) {
            return (0, _get3.default)(HighPass.prototype.__proto__ || (0, _getPrototypeOf2.default)(HighPass.prototype), 'evaluate', this).call(this, source, this.processorFunc, this._cutoff);
        }
    }, {
        key: 'processorFunc',
        value: function processorFunc() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            var event = args[0],
                cutoff = args[3][0][0];
            if (event.value.normalized() > cutoff.normalized()) {
                return args[0];
            } else {
                return null;
            }
        }
    }]);
    return HighPass;
}(_BaseFilter3.default);

exports.default = HighPass;
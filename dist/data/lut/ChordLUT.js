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

var _Scale = require('../../harmonics/Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var _BaseLUT2 = require('./BaseLUT');

var _BaseLUT3 = _interopRequireDefault(_BaseLUT2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChordLUT = function (_BaseLUT) {
    (0, _inherits3.default)(ChordLUT, _BaseLUT);

    function ChordLUT(scale) {
        (0, _classCallCheck3.default)(this, ChordLUT);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ChordLUT.__proto__ || (0, _getPrototypeOf2.default)(ChordLUT)).call(this));

        if (typeof scale === 'string') {
            scale = new _Scale2.default(scale);
        }

        (0, _assert2.default)(scale instanceof _Scale2.default);
        _this._scale = scale;
        return _this;
    }

    (0, _createClass3.default)(ChordLUT, [{
        key: 'generate',
        value: function generate() {
            (0, _get3.default)(ChordLUT.prototype.__proto__ || (0, _getPrototypeOf2.default)(ChordLUT.prototype), 'generate', this).call(this);
        }
    }]);
    return ChordLUT;
}(_BaseLUT3.default);

exports.default = ChordLUT;
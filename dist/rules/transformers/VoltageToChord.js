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

var _BaseTransformer2 = require('./BaseTransformer');

var _BaseTransformer3 = _interopRequireDefault(_BaseTransformer2);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _TonalEvent = require('../../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

var _Chord = require('../../harmonics/Chord');

var _Chord2 = _interopRequireDefault(_Chord);

var _Note = require('../../harmonics/Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VoltageToChord = function (_BaseTransformer) {
    (0, _inherits3.default)(VoltageToChord, _BaseTransformer);

    function VoltageToChord() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'C';
        (0, _classCallCheck3.default)(this, VoltageToChord);

        var _this = (0, _possibleConstructorReturn3.default)(this, (VoltageToChord.__proto__ || (0, _getPrototypeOf2.default)(VoltageToChord)).call(this, _Voltage2.default, _Chord2.default));

        _this.key = key;
        return _this;
    }

    (0, _createClass3.default)(VoltageToChord, [{
        key: 'evaluate',
        value: function evaluate(source) {
            (0, _get3.default)(VoltageToChord.prototype.__proto__ || (0, _getPrototypeOf2.default)(VoltageToChord.prototype), 'evaluate', this).call(this, source, this.processorFunc);
        }
    }, {
        key: 'processorFunc',
        value: function processorFunc(event) {
            var tone = new _TonalEvent2.default(event.time, new _Note2.default('C', 4), new _Time2.default(1.0, 's'));
            return tone;
        }
    }, {
        key: 'key',
        get: function get() {
            return this._key;
        },
        set: function set(val) {
            if (typeof val === 'string') {
                val = new _Note2.default(val);
            }
            (0, _assert2.default)(val instanceof _Note2.default);
            this._key = val;
        }
    }]);
    return VoltageToChord;
}(_BaseTransformer3.default);

exports.default = VoltageToChord;
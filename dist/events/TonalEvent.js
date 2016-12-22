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

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Note = require('../harmonics/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Chord = require('../harmonics/Chord');

var _Chord2 = _interopRequireDefault(_Chord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TonalEvent = function (_BaseEvent) {
    (0, _inherits3.default)(TonalEvent, _BaseEvent);

    function TonalEvent(time, value, duration) {
        (0, _classCallCheck3.default)(this, TonalEvent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TonalEvent.__proto__ || (0, _getPrototypeOf2.default)(TonalEvent)).call(this, time, value, [_Note2.default, _Chord2.default]));

        _this.time = time;
        _this.value = value;

        _this.duration = duration;
        return _this;
    }

    (0, _createClass3.default)(TonalEvent, [{
        key: 'duration',
        get: function get() {
            return this._duration;
        },
        set: function set(value) {
            (0, _assert2.default)(value instanceof _Time2.default);
            this._duration = value;
        }
    }]);
    return TonalEvent;
}(_BaseEvent3.default);

exports.default = TonalEvent;
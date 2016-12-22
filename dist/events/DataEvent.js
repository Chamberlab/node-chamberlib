'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

var _Voltage = require('../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _Frequency = require('../quantities/Frequency');

var _Frequency2 = _interopRequireDefault(_Frequency);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataEvent = function (_BaseEvent) {
    (0, _inherits3.default)(DataEvent, _BaseEvent);

    function DataEvent(time, value) {
        (0, _classCallCheck3.default)(this, DataEvent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataEvent.__proto__ || (0, _getPrototypeOf2.default)(DataEvent)).call(this, time, value, [_Voltage2.default, _Frequency2.default, _Time2.default]));

        _this.time = time;
        _this.value = value;
        return _this;
    }

    return DataEvent;
}(_BaseEvent3.default);

exports.default = DataEvent;
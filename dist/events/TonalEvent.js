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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9Ub25hbEV2ZW50LmpzIl0sIm5hbWVzIjpbIlRvbmFsRXZlbnQiLCJ0aW1lIiwidmFsdWUiLCJkdXJhdGlvbiIsIl9kdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsVTs7O0FBQ0Ysd0JBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXlCQyxRQUF6QixFQUFtQztBQUFBOztBQUFBLGtKQUN6QkYsSUFEeUIsRUFDbkJDLEtBRG1CLEVBQ1osaUNBRFk7O0FBRy9CLGNBQUtELElBQUwsR0FBWUEsSUFBWjtBQUNBLGNBQUtDLEtBQUwsR0FBYUEsS0FBYjs7QUFFQSxjQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQU4rQjtBQU9sQzs7Ozs0QkFHYztBQUNYLG1CQUFPLEtBQUtDLFNBQVo7QUFDSCxTOzBCQUVZRixLLEVBQU87QUFDaEIsa0NBQU9BLCtCQUFQO0FBQ0EsaUJBQUtFLFNBQUwsR0FBaUJGLEtBQWpCO0FBQ0g7Ozs7O2tCQUdVRixVIiwiZmlsZSI6ImV2ZW50cy9Ub25hbEV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IEJhc2VFdmVudCBmcm9tICcuL0Jhc2VFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IE5vdGUgZnJvbSAnLi4vaGFybW9uaWNzL05vdGUnO1xuaW1wb3J0IENob3JkIGZyb20gJy4uL2hhcm1vbmljcy9DaG9yZCc7XG5cbmNsYXNzIFRvbmFsRXZlbnQgZXh0ZW5kcyBCYXNlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHRpbWUsIHZhbHVlLCBkdXJhdGlvbikge1xuICAgICAgICBzdXBlcih0aW1lLCB2YWx1ZSwgW05vdGUsIENob3JkXSk7XG5cbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICB9XG5cblxuICAgIGdldCBkdXJhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2R1cmF0aW9uO1xuICAgIH1cblxuICAgIHNldCBkdXJhdGlvbih2YWx1ZSkge1xuICAgICAgICBhc3NlcnQodmFsdWUgaW5zdGFuY2VvZiBUaW1lKTtcbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvbmFsRXZlbnQ7Il19
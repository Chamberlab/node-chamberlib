'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MIDI_DEFAULT_CHANNEL = exports.MIDI_DEFAULT_VOLUME = exports.MIDI_EVENT_NOTE_OFF = exports.MIDI_EVENT_NOTE_ON = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsmidgen = require('jsmidgen');

var Midi = _interopRequireWildcard(_jsmidgen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIDI_EVENT_NOTE_OFF = Midi.Event.NOTE_OFF;
var MIDI_EVENT_NOTE_ON = Midi.Event.NOTE_ON;

var MIDI_DEFAULT_VOLUME = Midi.DEFAULT_VOLUME;
var MIDI_DEFAULT_CHANNEL = Midi.DEFAULT_CHANNEL;

exports.MIDI_EVENT_NOTE_ON = MIDI_EVENT_NOTE_ON;
exports.MIDI_EVENT_NOTE_OFF = MIDI_EVENT_NOTE_OFF;
exports.MIDI_DEFAULT_VOLUME = MIDI_DEFAULT_VOLUME;
exports.MIDI_DEFAULT_CHANNEL = MIDI_DEFAULT_CHANNEL;

var MidiEvent = function () {
    function MidiEvent(type, ticks, pitch, channel, velocity) {
        (0, _classCallCheck3.default)(this, MidiEvent);

        this.type = type;
        this.ticks = ticks;
        this.pitch = pitch;
        this.channel = channel;
        this.velocity = velocity || MIDI_DEFAULT_CHANNEL;
    }

    (0, _createClass3.default)(MidiEvent, [{
        key: 'toMidi',
        value: function toMidi() {
            return new Midi.Event({
                type: this.type,
                channel: this.channel,
                param1: Midi.Util.ensureMidiPitch(this.pitch),
                param2: this.velocity || MIDI_DEFAULT_VOLUME,
                time: this.ticks || 0
            });
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof type === 'number');
            this._type = val;
        }
    }, {
        key: 'pitch',
        set: function set(val) {
            this._pitch = Midi.Util.ensureMidiPitch(val);
        },
        get: function get() {
            return this._pitch;
        }
    }]);
    return MidiEvent;
}();

exports.default = MidiEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9NaWRpRXZlbnQuanMiXSwibmFtZXMiOlsiTWlkaSIsIk1JRElfRVZFTlRfTk9URV9PRkYiLCJFdmVudCIsIk5PVEVfT0ZGIiwiTUlESV9FVkVOVF9OT1RFX09OIiwiTk9URV9PTiIsIk1JRElfREVGQVVMVF9WT0xVTUUiLCJERUZBVUxUX1ZPTFVNRSIsIk1JRElfREVGQVVMVF9DSEFOTkVMIiwiREVGQVVMVF9DSEFOTkVMIiwiTWlkaUV2ZW50IiwidHlwZSIsInRpY2tzIiwicGl0Y2giLCJjaGFubmVsIiwidmVsb2NpdHkiLCJwYXJhbTEiLCJVdGlsIiwiZW5zdXJlTWlkaVBpdGNoIiwicGFyYW0yIiwidGltZSIsIl90eXBlIiwidmFsIiwiX3BpdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZQSxJOzs7Ozs7QUFFWixJQUFNQyxzQkFBc0JELEtBQUtFLEtBQUwsQ0FBV0MsUUFBdkM7QUFDQSxJQUFNQyxxQkFBcUJKLEtBQUtFLEtBQUwsQ0FBV0csT0FBdEM7O0FBRUEsSUFBTUMsc0JBQXNCTixLQUFLTyxjQUFqQztBQUNBLElBQU1DLHVCQUF1QlIsS0FBS1MsZUFBbEM7O1FBR0lMLGtCLEdBQUFBLGtCO1FBQ0FILG1CLEdBQUFBLG1CO1FBRUFLLG1CLEdBQUFBLG1CO1FBQ0FFLG9CLEdBQUFBLG9COztJQUdFRSxTO0FBQ0YsdUJBQVlDLElBQVosRUFBa0JDLEtBQWxCLEVBQXlCQyxLQUF6QixFQUFnQ0MsT0FBaEMsRUFBeUNDLFFBQXpDLEVBQW1EO0FBQUE7O0FBQy9DLGFBQUtKLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLFFBQUwsR0FBZ0JBLFlBQVlQLG9CQUE1QjtBQUNIOzs7O2lDQUVRO0FBQ0wsbUJBQU8sSUFBSVIsS0FBS0UsS0FBVCxDQUFlO0FBQ2xCUyxzQkFBTSxLQUFLQSxJQURPO0FBRWxCRyx5QkFBUyxLQUFLQSxPQUZJO0FBR2xCRSx3QkFBUWhCLEtBQUtpQixJQUFMLENBQVVDLGVBQVYsQ0FBMEIsS0FBS0wsS0FBL0IsQ0FIVTtBQUlsQk0sd0JBQVEsS0FBS0osUUFBTCxJQUFpQlQsbUJBSlA7QUFLbEJjLHNCQUFNLEtBQUtSLEtBQUwsSUFBYztBQUxGLGFBQWYsQ0FBUDtBQU9IOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLUyxLQUFaO0FBQ0gsUzswQkFFUUMsRyxFQUFLO0FBQ1Ysa0NBQU8sT0FBT1gsSUFBUCxLQUFnQixRQUF2QjtBQUNBLGlCQUFLVSxLQUFMLEdBQWFDLEdBQWI7QUFDSDs7OzBCQUVTQSxHLEVBQUs7QUFDWCxpQkFBS0MsTUFBTCxHQUFjdkIsS0FBS2lCLElBQUwsQ0FBVUMsZUFBVixDQUEwQkksR0FBMUIsQ0FBZDtBQUNILFM7NEJBRVc7QUFDUixtQkFBTyxLQUFLQyxNQUFaO0FBQ0g7Ozs7O2tCQUdVYixTIiwiZmlsZSI6ImV2ZW50cy9NaWRpRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBNaWRpIGZyb20gJ2pzbWlkZ2VuJztcblxuY29uc3QgTUlESV9FVkVOVF9OT1RFX09GRiA9IE1pZGkuRXZlbnQuTk9URV9PRkY7XG5jb25zdCBNSURJX0VWRU5UX05PVEVfT04gPSBNaWRpLkV2ZW50Lk5PVEVfT047XG5cbmNvbnN0IE1JRElfREVGQVVMVF9WT0xVTUUgPSBNaWRpLkRFRkFVTFRfVk9MVU1FO1xuY29uc3QgTUlESV9ERUZBVUxUX0NIQU5ORUwgPSBNaWRpLkRFRkFVTFRfQ0hBTk5FTDtcblxuZXhwb3J0IHtcbiAgICBNSURJX0VWRU5UX05PVEVfT04sXG4gICAgTUlESV9FVkVOVF9OT1RFX09GRixcblxuICAgIE1JRElfREVGQVVMVF9WT0xVTUUsXG4gICAgTUlESV9ERUZBVUxUX0NIQU5ORUxcbn07XG5cbmNsYXNzIE1pZGlFdmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgdGlja3MsIHBpdGNoLCBjaGFubmVsLCB2ZWxvY2l0eSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XG4gICAgICAgIHRoaXMucGl0Y2ggPSBwaXRjaDtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5IHx8IE1JRElfREVGQVVMVF9DSEFOTkVMO1xuICAgIH1cblxuICAgIHRvTWlkaSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNaWRpLkV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgICAgIHBhcmFtMTogTWlkaS5VdGlsLmVuc3VyZU1pZGlQaXRjaCh0aGlzLnBpdGNoKSxcbiAgICAgICAgICAgIHBhcmFtMjogdGhpcy52ZWxvY2l0eSB8fCBNSURJX0RFRkFVTFRfVk9MVU1FLFxuICAgICAgICAgICAgdGltZTogdGhpcy50aWNrcyB8fCAwLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgc2V0IHR5cGUodmFsKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdHlwZSA9PT0gJ251bWJlcicpO1xuICAgICAgICB0aGlzLl90eXBlID0gdmFsO1xuICAgIH1cblxuICAgIHNldCBwaXRjaCh2YWwpIHtcbiAgICAgICAgdGhpcy5fcGl0Y2ggPSBNaWRpLlV0aWwuZW5zdXJlTWlkaVBpdGNoKHZhbCk7XG4gICAgfVxuXG4gICAgZ2V0IHBpdGNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGl0Y2g7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNaWRpRXZlbnQ7Il19
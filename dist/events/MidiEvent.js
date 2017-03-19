'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MIDI_DEFAULT_CHANNEL = exports.MIDI_DEFAULT_VOLUME = exports.MIDI_EVENT_NOTE_OFF = exports.MIDI_EVENT_NOTE_ON = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsmidgen = require('jsmidgen');

var Midi = _interopRequireWildcard(_jsmidgen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        _classCallCheck(this, MidiEvent);

        this.type = type;
        this.ticks = ticks;
        this.pitch = pitch;
        this.channel = channel;
        this.velocity = velocity || MIDI_DEFAULT_CHANNEL;
    }

    _createClass(MidiEvent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9NaWRpRXZlbnQuanMiXSwibmFtZXMiOlsiTWlkaSIsIk1JRElfRVZFTlRfTk9URV9PRkYiLCJFdmVudCIsIk5PVEVfT0ZGIiwiTUlESV9FVkVOVF9OT1RFX09OIiwiTk9URV9PTiIsIk1JRElfREVGQVVMVF9WT0xVTUUiLCJERUZBVUxUX1ZPTFVNRSIsIk1JRElfREVGQVVMVF9DSEFOTkVMIiwiREVGQVVMVF9DSEFOTkVMIiwiTWlkaUV2ZW50IiwidHlwZSIsInRpY2tzIiwicGl0Y2giLCJjaGFubmVsIiwidmVsb2NpdHkiLCJwYXJhbTEiLCJVdGlsIiwiZW5zdXJlTWlkaVBpdGNoIiwicGFyYW0yIiwidGltZSIsIl90eXBlIiwidmFsIiwiX3BpdGNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZQSxJOzs7Ozs7OztBQUVaLElBQU1DLHNCQUFzQkQsS0FBS0UsS0FBTCxDQUFXQyxRQUF2QztBQUNBLElBQU1DLHFCQUFxQkosS0FBS0UsS0FBTCxDQUFXRyxPQUF0Qzs7QUFFQSxJQUFNQyxzQkFBc0JOLEtBQUtPLGNBQWpDO0FBQ0EsSUFBTUMsdUJBQXVCUixLQUFLUyxlQUFsQzs7UUFHSUwsa0IsR0FBQUEsa0I7UUFDQUgsbUIsR0FBQUEsbUI7UUFFQUssbUIsR0FBQUEsbUI7UUFDQUUsb0IsR0FBQUEsb0I7O0lBR0VFLFM7QUFDRix1QkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUJDLEtBQXpCLEVBQWdDQyxPQUFoQyxFQUF5Q0MsUUFBekMsRUFBbUQ7QUFBQTs7QUFDL0MsYUFBS0osSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsYUFBS0MsT0FBTCxHQUFlQSxPQUFmO0FBQ0EsYUFBS0MsUUFBTCxHQUFnQkEsWUFBWVAsb0JBQTVCO0FBQ0g7Ozs7aUNBRVE7QUFDTCxtQkFBTyxJQUFJUixLQUFLRSxLQUFULENBQWU7QUFDbEJTLHNCQUFNLEtBQUtBLElBRE87QUFFbEJHLHlCQUFTLEtBQUtBLE9BRkk7QUFHbEJFLHdCQUFRaEIsS0FBS2lCLElBQUwsQ0FBVUMsZUFBVixDQUEwQixLQUFLTCxLQUEvQixDQUhVO0FBSWxCTSx3QkFBUSxLQUFLSixRQUFMLElBQWlCVCxtQkFKUDtBQUtsQmMsc0JBQU0sS0FBS1IsS0FBTCxJQUFjO0FBTEYsYUFBZixDQUFQO0FBT0g7Ozs0QkFFVTtBQUNQLG1CQUFPLEtBQUtTLEtBQVo7QUFDSCxTOzBCQUVRQyxHLEVBQUs7QUFDVixrQ0FBTyxPQUFPWCxJQUFQLEtBQWdCLFFBQXZCO0FBQ0EsaUJBQUtVLEtBQUwsR0FBYUMsR0FBYjtBQUNIOzs7MEJBRVNBLEcsRUFBSztBQUNYLGlCQUFLQyxNQUFMLEdBQWN2QixLQUFLaUIsSUFBTCxDQUFVQyxlQUFWLENBQTBCSSxHQUExQixDQUFkO0FBQ0gsUzs0QkFFVztBQUNSLG1CQUFPLEtBQUtDLE1BQVo7QUFDSDs7Ozs7O2tCQUdVYixTIiwiZmlsZSI6ImV2ZW50cy9NaWRpRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBNaWRpIGZyb20gJ2pzbWlkZ2VuJztcblxuY29uc3QgTUlESV9FVkVOVF9OT1RFX09GRiA9IE1pZGkuRXZlbnQuTk9URV9PRkY7XG5jb25zdCBNSURJX0VWRU5UX05PVEVfT04gPSBNaWRpLkV2ZW50Lk5PVEVfT047XG5cbmNvbnN0IE1JRElfREVGQVVMVF9WT0xVTUUgPSBNaWRpLkRFRkFVTFRfVk9MVU1FO1xuY29uc3QgTUlESV9ERUZBVUxUX0NIQU5ORUwgPSBNaWRpLkRFRkFVTFRfQ0hBTk5FTDtcblxuZXhwb3J0IHtcbiAgICBNSURJX0VWRU5UX05PVEVfT04sXG4gICAgTUlESV9FVkVOVF9OT1RFX09GRixcblxuICAgIE1JRElfREVGQVVMVF9WT0xVTUUsXG4gICAgTUlESV9ERUZBVUxUX0NIQU5ORUxcbn07XG5cbmNsYXNzIE1pZGlFdmVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSwgdGlja3MsIHBpdGNoLCBjaGFubmVsLCB2ZWxvY2l0eSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnRpY2tzID0gdGlja3M7XG4gICAgICAgIHRoaXMucGl0Y2ggPSBwaXRjaDtcbiAgICAgICAgdGhpcy5jaGFubmVsID0gY2hhbm5lbDtcbiAgICAgICAgdGhpcy52ZWxvY2l0eSA9IHZlbG9jaXR5IHx8IE1JRElfREVGQVVMVF9DSEFOTkVMO1xuICAgIH1cblxuICAgIHRvTWlkaSgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNaWRpLkV2ZW50KHtcbiAgICAgICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgICAgIGNoYW5uZWw6IHRoaXMuY2hhbm5lbCxcbiAgICAgICAgICAgIHBhcmFtMTogTWlkaS5VdGlsLmVuc3VyZU1pZGlQaXRjaCh0aGlzLnBpdGNoKSxcbiAgICAgICAgICAgIHBhcmFtMjogdGhpcy52ZWxvY2l0eSB8fCBNSURJX0RFRkFVTFRfVk9MVU1FLFxuICAgICAgICAgICAgdGltZTogdGhpcy50aWNrcyB8fCAwLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG4gICAgc2V0IHR5cGUodmFsKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdHlwZSA9PT0gJ251bWJlcicpO1xuICAgICAgICB0aGlzLl90eXBlID0gdmFsO1xuICAgIH1cblxuICAgIHNldCBwaXRjaCh2YWwpIHtcbiAgICAgICAgdGhpcy5fcGl0Y2ggPSBNaWRpLlV0aWwuZW5zdXJlTWlkaVBpdGNoKHZhbCk7XG4gICAgfVxuXG4gICAgZ2V0IHBpdGNoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGl0Y2g7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNaWRpRXZlbnQ7Il19
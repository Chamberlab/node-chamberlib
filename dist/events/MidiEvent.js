'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MIDI_DEFAULT_CHANNEL = exports.MIDI_DEFAULT_VOLUME = exports.MIDI_EVENT_NOTE_OFF = exports.MIDI_EVENT_NOTE_ON = undefined;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsmidgen = require('jsmidgen');

var Midi = _interopRequireWildcard(_jsmidgen);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MIDI_EVENT_NOTE_OFF = Midi.Event.NOTE_OFF;
const MIDI_EVENT_NOTE_ON = Midi.Event.NOTE_ON;

const MIDI_DEFAULT_VOLUME = Midi.DEFAULT_VOLUME;
const MIDI_DEFAULT_CHANNEL = Midi.DEFAULT_CHANNEL;

exports.MIDI_EVENT_NOTE_ON = MIDI_EVENT_NOTE_ON;
exports.MIDI_EVENT_NOTE_OFF = MIDI_EVENT_NOTE_OFF;
exports.MIDI_DEFAULT_VOLUME = MIDI_DEFAULT_VOLUME;
exports.MIDI_DEFAULT_CHANNEL = MIDI_DEFAULT_CHANNEL;


class MidiEvent {
    constructor(type, ticks, pitch, channel, velocity) {
        this.type = type;
        this.ticks = ticks;
        this.pitch = pitch;
        this.channel = channel;
        this.velocity = velocity || MIDI_DEFAULT_CHANNEL;
    }

    toMidi() {
        return new Midi.Event({
            type: this.type,
            channel: this.channel,
            param1: Midi.Util.ensureMidiPitch(this.pitch),
            param2: this.velocity || MIDI_DEFAULT_VOLUME,
            time: this.ticks || 0
        });
    }

    get type() {
        return this._type;
    }

    set type(val) {
        (0, _assert2.default)(typeof type === 'number');
        this._type = val;
    }

    set pitch(val) {
        this._pitch = Midi.Util.ensureMidiPitch(val);
    }

    get pitch() {
        return this._pitch;
    }
}

exports.default = MidiEvent;
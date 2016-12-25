import assert from 'assert';
import * as Midi from 'jsmidgen';

const MIDI_EVENT_NOTE_OFF = Midi.Event.NOTE_OFF;
const MIDI_EVENT_NOTE_ON = Midi.Event.NOTE_ON;

const MIDI_DEFAULT_VOLUME = Midi.DEFAULT_VOLUME;
const MIDI_DEFAULT_CHANNEL = Midi.DEFAULT_CHANNEL;

export {
    MIDI_EVENT_NOTE_ON,
    MIDI_EVENT_NOTE_OFF,

    MIDI_DEFAULT_VOLUME,
    MIDI_DEFAULT_CHANNEL
};

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
            time: this.ticks || 0,
        });
    }

    get type() {
        return this._type;
    }

    set type(val) {
        assert(typeof type === 'number');
        this._type = val;
    }

    set pitch(val) {
        this._pitch = Midi.Util.ensureMidiPitch(val);
    }

    get pitch() {
        return this._pitch;
    }
}

export default MidiEvent;
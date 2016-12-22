import BaseCollection from './BaseCollection';
import Track from './Track';
import MidiFile from './io/MidiFile';

class Song extends BaseCollection {
    constructor(items, bpm = 120) {
        super(items, Track);

        this._bpm = bpm;
    }

    toMidiFile(filename) {
        return MidiFile.write(this, filename);
    }


    get bpm() {
        return this._bpm;
    }

    set bpm(bpm) {
        this._bpm = bpm;
    }
}

export default Song;
import BaseCollection from './BaseCollection';
import Track from './Track';
import MidiFile from '../io/file/MidiFile';

class Song extends BaseCollection {
    constructor(items, bpm = 120, uuid = undefined) {
        super(items, Track, uuid);

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
import BaseCollection from './BaseCollection';
import Track from './Track';
import MidiIO from './io/MidiIO';

class Song extends BaseCollection {
    constructor(items) {
        super(items, Track);
    }

    toMidiFile(filename) {
        return MidiIO.write(this, filename);
    }
}

export default Song;
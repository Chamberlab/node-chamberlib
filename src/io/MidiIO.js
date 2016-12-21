'use strict';

import assert from 'assert';
import Song from '../harmonics/Song';

class MidiIO {
    static writeSong(song, filename) {
        assert(song instanceof Song);
        assert(typeof filename === 'string');
    }
}

export default MidiIO;
'use strict';

import assert from 'assert';
import * as tonal from 'tonal';

import Frequency from '../quantities/Frequency';

class Note {
    constructor(key = 'C', octave = undefined) {
        if (key && octave) {
            this.fromString(key);
            this.octave = octave;
        } else {
            this.fromString(key);
        }
    }


    //
    //
    // Conversion

    toString() {
        return this.key + this.octave.toString();
    }

    fromString(input) {
        assert(typeof input === 'string');

        let _self = this,
            regex = /^[a-z,A-Z,#]+([0-9]+)$/,
            res = regex.exec(input);

        if (Array.isArray(res)) {
            if (res.length >= 2) {
                _self.octave = parseInt(res[1]);
                _self.key = res[0].replace(/[0-9]+$/i, '');
            } else {
                _self.octave = 4;
            }

            if (res.length === 1) {
                _self.key = res[0];
            }
        }

        return this;
    }


    fromRandom() {
        let note = tonal.note.fromMidi(Math.round(Math.floor() * 128));
        this.fromString(note);

        return this;
    }


    toMidi() {
        return tonal.note.midi(this.toString());
    }

    fromMidi(value) {
        assert(typeof value === 'number');
        assert(value >= 0 && value < 128);

        let res = tonal.note.fromMidi(value);
        this.fromString(res);

        return this;
    }


    toFreq() {
        let freq = tonal.note.freq(this.toString());
        return new Frequency(freq, 'hz');
    }


    //
    //
    // Getters / Setters

    get key() {
        return this._key;
    }

    set key(val) {
        assert(typeof val === 'string', `Invalid key: ${typeof key}`);
        this._key = val;
    }


    get octave() {
        return this._octave;
    }

    set octave(val) {
        assert(typeof val === 'number', `Invalid octave: ${typeof octave}`);
        this._octave = val;
    }
}

export default Note;
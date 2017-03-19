import assert from 'assert';
import Qty from 'js-quantities';

import * as tonal from 'tonal';
import * as tt from 'tonal-transpose';
import * as tn from 'tonal-note';

import Interval from './Interval';

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
        return this.key + (this.octave ? this.octave.toString() : '');
    }

    fromString(input) {
        assert(typeof input === 'string', `Note input must be string, is ${typeof input}`);

        let _self = this,
            regex = /^[a-z,A-Z,#]+([0-9]+)$/,
            res = regex.exec(input);

        if (Array.isArray(res)) {
            if (res.length >= 2) {
                _self.octave = parseInt(res[1]);
                _self.key = res[0].replace(/[0-9]+$/, '');
            } else {
                _self.octave = 4;
            }

            if (res.length === 1) {
                _self.key = res[0];
            }
        } else {
            _self.key = input;
        }

        return this;
    }


    fromRandom() {
        let note = tonal.note.fromMidi(Math.round(Math.floor() * 128));
        this.fromString(note);

        return this;
    }


    toMidi() {
        assert(typeof this.octave === 'number', 'Octave not defined');

        const str = this.toString();
        return tonal.note.midi(str);
    }

    fromMidi(value) {
        assert(typeof value === 'number', `Midi value must be number, is ${typeof value}`);
        assert(value >= 0 && value < 128, `Midi value must be 0-128, is ${value}`);

        let res = tonal.note.fromMidi(value);
        this.fromString(res);

        return this;
    }


    toFreq() {
        assert(typeof this.octave === 'number', 'Octave not defined');

        let freq = tonal.note.freq(this.toString());
        return Qty(freq, 'Hz');
    }


    transpose(interval, simplify = false) {
        assert(interval instanceof Interval, `Invalid interval of type ${typeof interval}`);

        let newval = tt.transpose(this.toString(), interval.toString());

        if (simplify) {
            newval = tn.simplify(newval);
        }

        this.fromString(newval);
    }

    transposeFifths(count = 1, simplify = false) {
        assert(typeof count === 'number', `Fifths count must be number, is ${typeof count}`);

        let newval = tt.trFifths(this.toString(), count);

        if (simplify) {
            newval = tn.simplify(newval);
        }

        this.fromString(newval);
    }



    //
    //
    // Getters / Setters

    get key() {
        return this._key;
    }

    set key(val) {
        assert(typeof val === 'string', `Key value must be string, is ${typeof val}`);

        this._key = val;
    }


    get octave() {
        return this._octave;
    }

    set octave(val) {
        assert(typeof val === 'number', `Octave value must be number, is ${typeof val}`);

        this._octave = val;
    }
}

export default Note;
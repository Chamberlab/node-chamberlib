import assert from 'assert';
import * as tonal from 'tonal';
import * as sc from 'scalesapi';

import BaseCollection from '../data/BaseCollection';
import Note from './Note';

class Chord extends BaseCollection {
    constructor(value) {
        assert(typeof value === 'string');

        super([], [Note]);
        this.string = value;
    }

    get string() {
        if (typeof this._label !== 'string') {
            let notes = this.all.map(function (note) {
                return note.string;
            });
            this._label = tonal.chord.detect(notes.join(' '));
        }
        return this._label;
    }

    set string(value) {
        assert(typeof value === 'string');

        this._label = value;

        let names = tonal.chord(this._label);
        this.value = names.map(function (name) {
            let note = new Note(name);
            return note;
        });
    }


    static getChordNames(scale = '*', baseNote = null, octave = null) {
        let names;
        if (octave && baseNote && scale) {
            names = sc.getChords(scale, baseNote, octave);
        } else if (baseNote && scale) {
            names = sc.getChords(scale, baseNote);
        } else if (scale) {
            names = sc.getChords(scale);
        }
        return Array.isArray(names) ? names : [];
    }
}

export default Chord;
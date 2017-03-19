import assert from 'assert';
import * as tc from 'tonal-chord';
import * as sc from 'scalesapi';

import BaseCollection from '../data/BaseCollection';
import Note from './Note';

class Chord extends BaseCollection {
    constructor(type, tonic) {
        super([], [Note]);

        this.type = type;
        this.tonic = tonic;
    }


    get type() {
        return this._type;
    }

    set type(type) {
        assert(typeof type === 'string', `Chord type must be string, is ${typeof type}`);

        this._type = type;
    }


    get tonic() {
        return this._tonic;
    }

    set tonic(tonic) {
        assert(typeof tonic === 'string', `Tonic must be string, is ${typeof tonic}`);

        this._tonic = tonic;
    }


    get notes() {
        let notes = tc.notes(`${this._tonic}${this._type}`);

        return Array.isArray(notes) ? notes.map(note => {
            return new Note().fromString(note);
        }) : [];
    }


    //
    //
    // Static methods

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

    static detectFromNotes(notes) {
        assert(Array.isArray(notes), 'Notes must be array');

        const chords = tc.detect(notes.map(note => {
            assert(note instanceof Note, `Note must be of type Note, is ${typeof note}`);

            return note.toString();
        }));

        return chords.map(chord => {
            const pc = tc.parse(chord);
            return new Chord(pc.type, pc.tonic);
        });
    }
}

export default Chord;
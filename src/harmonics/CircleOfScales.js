import * as tkey from 'tonal-key';
// import * as tprog from 'tonal-progression';
import Scale from './Scale';
import Note from './Note';
/*
import Chord from './Chord';

import Interval from './Interval';
*/

class CircleOfScales {
    constructor() {
        this._currentKey = tkey.fromAlter(0);
        // this._romans = ['bV', 'bII', 'bVI', 'bIII', 'bVII', 'IV', 'I', 'V', 'II', 'VI', 'III', 'VII', 'bV'];
        // this._romansMajor = ['I Maj', 'II min', 'III min', 'IV Maj', 'V Maj', 'VI min', 'VII dim'];
        // this._romansMinor = ['I min', 'II dim', 'bIII Aug', 'IV min', 'V Maj', 'bVI Maj', 'bVII Maj'];
        this._rotation = 0;
    }

    rotate(steps = 1) {
        this._currentKey = tkey.fromAlter(Math.min(6, Math.max(-6, steps)));
        this._rotation = steps;
    }

    get key() {
        return this._currentKey;
    }

    get scale() {
        return new Scale(this.tonic.key, this.mode);
    }

    get tonic() {
        return new Note(tkey.props(this._currentKey).tonic);
    }

    get mode() {
        return tkey.props(this._currentKey).mode;
    }

    /*
    get chord() {
        let parsed;
        if (this.mode === 'major') {
            parsed = tprog.parseRomanChord(this._romansMajor[Math.abs(this._rotation)]);
        } else if (this.mode === 'minor') {
            parsed = tprog.parseRomanChord(this._romansMinor[Math.abs(this._rotation)]);
        }
        if (parsed) {
            const tonic = new Note(this.scale.key);
            tonic.transpose(new Interval(parsed.root), true);
            return new Chord(parsed.type, tonic.toString());
        }
    }
    */

    get coordinates() {
        return { r: this._rotation };
    }
}

export default CircleOfScales;
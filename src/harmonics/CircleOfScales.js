import * as tkey from 'tonal-key';
import Scale from './Scale';
import Note from './Note';

class CircleOfScales {
    constructor(octave = 1) {
        this._currentKey = tkey.fromAlter(0);
        this._octave = octave;
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
        return new Scale(this.tonic.toString(), this.mode);
    }

    get tonic() {
        return new Note(tkey.props(this._currentKey).tonic, this.octave);
    }

    get mode() {
        return tkey.props(this._currentKey).mode;
    }

    get octave() {
        return this._octave;
    }

    set octave(octave) {
        this._octave = octave;
    }

    get coordinates() {
        return { r: this._rotation };
    }
}

export default CircleOfScales;
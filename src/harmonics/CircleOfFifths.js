import Note from './Note';
import Interval from './Interval';

class CircleOfFifths {
    constructor(key = 'C') {
        this._currentNote = new Note(key);
        this._rotation = 0;
        this._position = 2;
    }

    // TODO: fix negative rotation

    rotate(steps = 1, shift = false) {
        let interval;
        if (steps > 0) {
            interval = new Interval('5P');
        } else if (steps < 0) {
            interval = new Interval('m-4');
        }

        if (!interval) {
            return;
        }

        for (let n = 0; n !== steps; n += Math.sign(steps)) {
            this._rotation += Math.sign(steps);
            if (this._rotation > 11) {
                this._rotation = 0;
                if (shift && !this.shift(1)) {
                    this._rotation = 11;
                    continue;
                }
            } else if (this._rotation < 0) {
                this._rotation = 11;
                if (shift && !this.shift(-1)) {
                    this._rotation = 0;
                    continue;
                }
            }
            this._currentNote.transpose(interval, true);
        }

        return true;
    }

    shift(steps = 1) {
        let interval;
        if (steps > 0) {
            interval = new Interval('m3');
        } else if (steps < 0) {
            interval = new Interval('m-3');
        }

        if (!interval) {
            return false;
        }

        for (let n = 0; n !== steps; n += Math.sign(steps)) {
            this._position += Math.sign(steps);
            if (this._position > 4) {
                this._position = 4;
                return false;
            } else if (this._position < 0) {
                this._position = 0;
                return false;
            }
            this._currentNote.transpose(interval, true);
            return true;
        }
    }

    get note() {
        return this._currentNote;
    }

    get coordinates() {
        return { r: this._rotation, s: this._position };
    }
}

export default CircleOfFifths;
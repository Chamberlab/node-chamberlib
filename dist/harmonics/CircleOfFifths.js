'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _Interval = require('./Interval');

var _Interval2 = _interopRequireDefault(_Interval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CircleOfFifths {
    constructor(key = 'C') {
        this._currentNote = new _Note2.default(key);
        this._rotation = 0;
        this._position = 0;
    }

    // TODO: fix negative rotation

    rotate(steps = 1) {
        let interval;
        if (steps > 0) {
            interval = new _Interval2.default('5P');
        } else if (steps < 0) {
            interval = new _Interval2.default('m-4');
        }
        if (!interval) {
            return;
        }

        for (let n = 0; n !== steps; n += Math.sign(steps)) {
            this._rotation += Math.sign(steps);
            if (this._rotation > 11) {
                this._position += 1;
                this._rotation = 0;
                if (this._position > 3) {
                    this._position = 3;
                    this._rotation = 11;
                    continue;
                }
            } else if (this._rotation < 0) {
                this._position -= 1;
                this._rotation = 11;
                if (this._position < 0) {
                    this._position = 0;
                    this._rotation = 0;
                    continue;
                }
            }
            this._currentNote.transpose(interval, true);
        }
    }

    shift(steps = 1) {
        let interval;
        if (steps > 0) {
            interval = new _Interval2.default('5P');
        } else if (steps < 0) {
            interval = new _Interval2.default('m-4');
        }
        if (!interval) {
            return;
        }
        for (let n = 0; n !== steps; n += Math.sign(steps)) {
            for (let s = 0; s !== 12 * Math.sign(steps); s += Math.sign(steps)) {
                this.rotate(Math.sign(steps));
            }
        }
    }

    get note() {
        return this._currentNote;
    }

    get coordinates() {
        return { r: this._rotation, s: this._position };
    }
}

exports.default = CircleOfFifths;
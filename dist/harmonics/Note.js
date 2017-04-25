'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _tonalTranspose = require('tonal-transpose');

var tt = _interopRequireWildcard(_tonalTranspose);

var _tonalNote = require('tonal-note');

var tn = _interopRequireWildcard(_tonalNote);

var _Interval = require('./Interval');

var _Interval2 = _interopRequireDefault(_Interval);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        (0, _assert2.default)(typeof input === 'string', `Note input must be string, is ${typeof input}`);

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
        (0, _assert2.default)(typeof this.octave === 'number', 'Octave not defined');

        const str = this.toString();
        return tonal.note.midi(str);
    }

    fromMidi(value) {
        (0, _assert2.default)(typeof value === 'number', `Midi value must be number, is ${typeof value}`);
        (0, _assert2.default)(value >= 0 && value < 128, `Midi value must be 0-128, is ${value}`);

        let res = tonal.note.fromMidi(value);
        this.fromString(res);

        return this;
    }

    toFreq() {
        (0, _assert2.default)(typeof this.octave === 'number', 'Octave not defined');

        let freq = tonal.note.freq(this.toString());
        return (0, _jsQuantities2.default)(freq, 'Hz');
    }

    transpose(interval, simplify = false) {
        (0, _assert2.default)(interval instanceof _Interval2.default, `Invalid interval of type ${typeof interval}`);

        let noteString = this.toString(),
            newval = tt.transpose(noteString, interval.toString());

        if (simplify) {
            newval = tn.simplify(newval);
        }

        this.fromString(newval);
    }

    transposeFifths(count = 1, simplify = false) {
        (0, _assert2.default)(typeof count === 'number', `Fifths count must be number, is ${typeof count}`);

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
        (0, _assert2.default)(typeof val === 'string', `Key value must be string, is ${typeof val}`);

        this._key = val;
    }

    get octave() {
        return this._octave;
    }

    set octave(val) {
        (0, _assert2.default)(typeof val === 'number', `Octave value must be number, is ${typeof val}`);

        this._octave = val;
    }
}

exports.default = Note;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonalChord = require('tonal-chord');

var tc = _interopRequireWildcard(_tonalChord);

var _scalesapi = require('scalesapi');

var sc = _interopRequireWildcard(_scalesapi);

var _BaseCollection = require('../data/BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _Interval = require('./Interval');

var _Interval2 = _interopRequireDefault(_Interval);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Chord extends _BaseCollection2.default {
    constructor(type, tonic = undefined, octave = undefined) {
        super([], [_Note2.default]);

        if (typeof tonic === 'undefined') {
            const parsed = tc.parse(type);
            if (parsed instanceof Object) {
                type = parsed.type;
                tonic = parsed.tonic;
            }
        }

        this.type = type;
        this.tonic = tonic;

        if (octave) {
            this.octave = octave;
        }
    }

    get type() {
        return this._type;
    }

    set type(type) {
        (0, _assert2.default)(typeof type === 'string', `Chord type must be string, is ${typeof type}`);

        this._type = type;
    }

    get tonic() {
        return this._tonic;
    }

    set tonic(tonic) {
        (0, _assert2.default)(typeof tonic === 'string', `Tonic must be string, is ${typeof tonic}`);

        this._tonic = tonic;
    }

    get octave() {
        return this._octave;
    }

    set octave(octave) {
        (0, _assert2.default)(typeof octave === 'number', `Octave must be number, is ${typeof octave}`);

        this._octave = octave;
    }

    get notes() {
        let notes = tc.notes(`${this._tonic}${this._type}`);

        return Array.isArray(notes) ? notes.map(note => {
            return new _Note2.default().fromString(note);
        }) : [];
    }

    getNotesFromOctave(octave = undefined) {
        const _self = this;
        let notes = [],
            currentNote;

        this.notes.forEach(note => {
            if (!currentNote) {
                currentNote = new _Note2.default(note.key, octave || _self.octave);
            } else {
                currentNote.transpose(_Interval2.default.fromNotes(new _Note2.default(currentNote.key), note));
            }

            notes.push(new _Note2.default(currentNote.key, currentNote.octave));
        });

        return notes;
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
        (0, _assert2.default)(Array.isArray(notes), 'Notes must be array');

        const chords = tc.detect(notes.map(note => {
            (0, _assert2.default)(note instanceof _Note2.default, `Note must be of type Note, is ${typeof note}`);

            return note.toString();
        }));

        return chords.map(chord => {
            const pc = tc.parse(chord);
            return new Chord(pc.type, pc.tonic);
        });
    }
}

exports.default = Chord;
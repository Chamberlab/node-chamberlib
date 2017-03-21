'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseCollection = require('./BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _MidiFile = require('../io/file/MidiFile');

var _MidiFile2 = _interopRequireDefault(_MidiFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Song extends _BaseCollection2.default {
    constructor(items, bpm = 120, uuid = undefined) {
        super(items, _Track2.default, uuid);

        this._bpm = bpm;
    }

    toMidiFile(filename) {
        return _MidiFile2.default.write(this, filename);
    }

    get bpm() {
        return this._bpm;
    }

    set bpm(bpm) {
        this._bpm = bpm;
    }
}

exports.default = Song;
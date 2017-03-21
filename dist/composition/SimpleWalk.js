'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _Track = require('../data/Track');

var _Track2 = _interopRequireDefault(_Track);

var _BaseCollection = require('../data/BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _TonalEvent = require('../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

var _harmonics = require('../harmonics');

var _harmonics2 = _interopRequireDefault(_harmonics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SimpleWalk {
    constructor(useChords = false, scale = 'Major', baseNote = undefined) {
        this.useChords = useChords;
        this.scale = scale;
        this.baseNote = baseNote instanceof _harmonics2.default.Note ? baseNote : new _harmonics2.default.Note('C4');
    }

    makeTrack(dataEvents, threshold = '0.7mV', interval = 'P5', duration = undefined, chordSelectHandler = undefined) {
        (0, _assert2.default)(Array.isArray(dataEvents) || dataEvents instanceof _BaseCollection2.default, `dataEvents must be Array or BaseCollection, is ${typeof dataEvents}`);

        const tonalEvents = [],
              octave = this.baseNote.octave;

        if (typeof duration === 'undefined') {
            duration = (0, _jsQuantities2.default)(1 / 16, 's');
        }

        dataEvents.forEach(event => {
            let tonalValue,
                intervalValue = typeof interval === 'function' ? interval(event) : interval,
                durationValue = typeof duration === 'function' ? duration(event) : duration;

            if (event.value.gte((0, _jsQuantities2.default)(threshold))) {
                this.baseNote.transpose(new _harmonics2.default.Interval(intervalValue), true);
            }

            if (this.useChords) {
                const chords = _harmonics2.default.Chord.getChordNames(this.scale, this.baseNote.key);
                if (chords.length > 0) {
                    if (typeof chordSelectHandler === 'function') {
                        tonalValue = new _harmonics2.default.Chord(chordSelectHandler(chords), undefined, octave);
                    } else {
                        tonalValue = new _harmonics2.default.Chord(chords[0], undefined, octave);
                    }
                }
            } else {
                tonalValue = new _harmonics2.default.Note(this.baseNote.key, octave);
            }

            if (typeof tonalValue !== 'undefined') {
                tonalEvents.push(new _TonalEvent2.default(event.time, tonalValue, durationValue));
            }
        });

        return new _Track2.default(tonalEvents);
    }
}

exports.default = SimpleWalk;
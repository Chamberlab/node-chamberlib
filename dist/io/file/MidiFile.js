'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _fs = require('pn/fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsmidgen = require('jsmidgen');

var midi = _interopRequireWildcard(_jsmidgen);

var _Song = require('../../data/Song');

var _Song2 = _interopRequireDefault(_Song);

var _Note = require('../../harmonics/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Chord = require('../../harmonics/Chord');

var _Chord2 = _interopRequireDefault(_Chord);

var _TonalEvent = require('../../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TICKS_PER_BEAT = 128;

class MidiFile {
    static write(data, filename) {
        (0, _assert2.default)(data instanceof _Song2.default, `MIDI data must be of type Song, is ${typeof data}`);
        (0, _assert2.default)(typeof filename === 'string', `MIDI filename must be string, is ${typeof filename}`);

        let ticksPerSec = data.bpm * TICKS_PER_BEAT / 60.0,
            layout = [],
            file = new midi.File();

        data.all.map(channel => {
            let lt = [];

            channel.all.map(event => {
                (0, _assert2.default)(event instanceof _TonalEvent2.default);

                let values = [];

                if (event.value instanceof _Note2.default) {
                    values.push(event.value);
                } else if (event.value instanceof _Chord2.default) {
                    values = event.value.getNotesFromOctave();
                }

                values.forEach(value => {
                    lt.push({
                        value: new _TonalEvent2.default(event.time, value, event.duration),
                        on: true
                    });

                    lt.push({
                        value: new _TonalEvent2.default(event.time.add(event.duration), value, event.duration),
                        on: false
                    });
                });
            });

            layout.push(lt.sort((a, b) => {
                if (a.value.time.gt(b.value.time)) {
                    return 1;
                } else if (a.value.time.lt(b.value.time)) {
                    return -1;
                }
                return 0;
            }));
        });

        layout.map(lt => {
            let track = new midi.Track(),
                ticks = 0,
                last_ticks = 0,
                last_v = (0, _jsQuantities2.default)('0s');

            lt.map(event => {
                const event_val = event.value.value;

                if (event.value.time.eq(last_v)) {
                    last_v = event.value.time;
                    ticks = event.value.time.to('s').scalar * ticksPerSec;
                }

                if (event_val instanceof _Note2.default) {
                    if (event.on) {
                        track.addNoteOn(0, event_val.toMidi(), ticks - last_ticks);
                    } else {
                        track.addNoteOff(0, event_val.toMidi(), ticks - last_ticks);
                    }
                }

                last_ticks = ticks;
            });

            file.addTrack(track);
        });

        return _fs2.default.writeFile(filename, file.toBytes(), 'binary');
    }
}

exports.default = MidiFile;
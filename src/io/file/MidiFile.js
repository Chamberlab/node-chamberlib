import assert from 'assert';
import Qty from 'js-quantities';
import fs from 'pn/fs';
import * as midi from 'jsmidgen';
import Song from '../../data/Song';
import Note from '../../harmonics/Note';
import Chord from '../../harmonics/Chord';
import TonalEvent from '../../events/TonalEvent';

const TICKS_PER_BEAT = 128;

class MidiFile {
    static write(data, filename) {
        assert(data instanceof Song, `MIDI data must be of type Song, is ${typeof data}`);
        assert(typeof filename === 'string', `MIDI filename must be string, is ${typeof filename}`);

        let ticksPerSec = (data.bpm * TICKS_PER_BEAT) / 60.0,
            layout = [],
            file = new midi.File();

        data.all.map((channel) => {
            let lt = [];

            channel.all.map((event) => {
                assert(event instanceof TonalEvent);

                let values = [];

                if (event.value instanceof Note) {
                    values.push(event.value);
                } else if (event.value instanceof Chord) {
                    values = event.value.getNotesFromOctave();
                }

                values.forEach(value => {
                    lt.push({
                        value: new TonalEvent(event.time, value, event.duration),
                        on: true
                    });

                    lt.push({
                        value: new TonalEvent(event.time.add(event.duration), value, event.duration),
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

        layout.map((lt) => {
            let track = new midi.Track(),
                ticks = 0, last_ticks = 0, last_v = Qty('0s');

            lt.map((event) => {
                const event_val = event.value.value;

                if (!event.value.time.eq(last_v)) {
                    last_v = event.value.time;
                    ticks = event.value.time.to('s').scalar * ticksPerSec;
                }

                if (event_val instanceof Note) {
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

        return fs.writeFile(filename, file.toBytes(), 'binary');
    }
}

export default MidiFile;
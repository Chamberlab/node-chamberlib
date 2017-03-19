import assert from 'assert';
import fs from 'pn/fs';
import * as midi from 'jsmidgen';
import Song from '../../data/Song';
import Note from '../../harmonics/Note';
import Chord from '../../harmonics/Chord';
import TonalEvent from '../../events/TonalEvent';
import Time from '../../quantities/Time';

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

                lt.push({
                    value: event,
                    on: true
                });

                lt.push({
                    value: new TonalEvent(
                        new Time(event.time.normalized() + event.duration.normalized(), event.time.defaultUnit),
                        event.value,
                        new Time(0.0, event.time.defaultUnit)
                    ),
                    on: false
                });
            });

            layout.push(lt.sort((a, b) => {
                if (a.value.time.normalized() > b.value.time.normalized()) {
                    return 1;
                } else if (a.value.time.normalized() < b.value.time.normalized()) {
                    return -1;
                }
                return 0;
            }));
        });

        layout.map((lt) => {
            let track = new midi.Track(),
                ticks = 0, last_ticks = 0, last_v = 0;

            lt.map((event) => {
                const event_val = event.value.value;

                if (event.value.time.value !== last_v) {
                    last_v = event.value.time.value;
                    ticks = event.value.time.normalized() * ticksPerSec;
                }

                if (event_val instanceof Note) {
                    if (event.on) {
                        track.addNoteOn(0, event_val.toMidi(), ticks - last_ticks);
                    } else {
                        track.addNoteOff(0, event_val.toMidi(), ticks - last_ticks);
                    }
                } else if (event_val instanceof Chord) {
                    // TODO: properly implement chords
                    // track.addChord(0, event_val.toMidi(), ticks);
                }

                last_ticks = ticks;
            });

            file.addTrack(track);
        });

        return fs.writeFile(filename, file.toBytes(), 'binary');
    }
}

export default MidiFile;
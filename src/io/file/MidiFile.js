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
    static write(song, filename) {
        assert(song instanceof Song);
        assert(typeof filename === 'string');

        let ticksPerSec = (song.bpm * TICKS_PER_BEAT) / 60.0,
            ticks = 0,
            layout = [],
            file = new midi.File();

        song.all.map((channel) => {
            let lt = [];
            channel.all.map((event) => {
                assert(event instanceof TonalEvent);

                let oe = new TonalEvent(new Time(event.time._value + event.duration._value,
                    event.time.unit), event.value, new Time(0.0, event.duration.unit));

                lt.push({
                    value: event,
                    on: true
                });
                lt.push({
                    value: oe,
                    on: false
                });
            });
            layout.push(lt.sort((a, b) => {
                if (a.value.time._value > b.value.time._value) {
                    return 1;
                } else if (a.value.time._value < b.value.time._value) {
                    return -1;
                }
                return 0;
            }));
        });

        layout.map((lt) => {
            let track = new midi.Track(),
                last_t = 0;
            lt.map((event) => {
                const event_val = event.value._value;
                ticks += event.value.time.normalized() * ticksPerSec;
                if (event_val instanceof Note) {
                    if (event.on) {
                        track.addNoteOn(0, event_val.toMidi(), ticks - last_t);
                    } else {
                        track.addNoteOff(0, event_val.toMidi(), ticks - last_t);
                    }
                } else if (event.value._value instanceof Chord) {
                    // TODO: properly implement chords
                    // track.addChord(0, event_val.toMidi(), ticks);
                }
                last_t = ticks;
            });
            file.addTrack(track);
        });

        return fs.writeFile(filename, file.toBytes(), 'binary');
    }
}

export default MidiFile;
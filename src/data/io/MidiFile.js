import assert from 'assert';
import fs from 'pn/fs';
import * as midi from 'jsmidgen';
import Song from '../Song';
import Note from '../../harmonics/Note';
import Chord from '../../harmonics/Chord';
import TonalEvent from '../../events/TonalEvent';

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
                lt.push = {
                    value:  event.value,
                    on: true
                };
                let oe = new TonalEvent(event.time.normalized() + event.duration.normalized(), event.value);
                lt.push = {
                    value:  oe,
                    on: false
                };
            });
            layout.push(lt);
        });

        layout.sort((a, b) => {
            if (a.time.normalized() > b.time.normalized()) {
                return 1;
            } else if (a.time.normalized() < b.time.normalized()) {
                return -1;
            }
            return 0;
        }).map((lt) => {
            let track = new midi.Track(),
                last_t = 0;
            lt.all.map((event) => {

                if (event.value instanceof Note) {
                    track.addNote(1, event.value.toMidi());
                } else if (event.value instanceof Chord) {
                    track.addChord(1, event.value.toMidi());
                }
                ticks += (event.value.time.normalized() - last_t) ;
                last_t = event.value.time.normalized() * ticksPerSec;
            });
            file.addTrack(track);
        });

        return fs.writeFile(filename, file.toBytes(), 'binary');
    }
}

export default MidiFile;
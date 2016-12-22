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

        let file = new midi.File();
        song.all.map((channel) => {
            let track = new midi.Track();
            channel.all.map((event) => {
                assert(event instanceof TonalEvent);
                if (event.value instanceof Note) {
                    track.addNote(1, event.value.toMidi(), (song.bpm * TICKS_PER_BEAT) / 60);
                } else if (event.value instanceof Chord) {
                    track.addChord(1, event.value.toMidi(), (song.bpm * TICKS_PER_BEAT) / 60);
                }
            });
            file.addTrack(track);
        });

        return fs.writeFile(filename, file.toBytes(), 'binary');
    }
}

export default MidiFile;
import assert from 'assert';
import * as midi from 'jsmidgen';
import Song from '../Song';
import TonalEvent from '../../events/TonalEvent';

class MidiIO {
    static write(song, filename) {
        assert(song instanceof Song);
        assert(typeof filename === 'string');

        let file = new midi.File();
        song.all.map((channel) => {
            let track = new midi.Track();
            channel.all.map((tonalEvent) => {
                assert(tonalEvent instanceof TonalEvent);

            });
            file.addTrack(track);
        });
    }
}

export default MidiIO;
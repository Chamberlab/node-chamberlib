const chai = require('chai');
chai.should();

import uuid4 from 'uuid4';
import clab from '../../src/index';

describe('cl.data.Song', () => {
    it('Creates new empty song with uuid', () => {
        let bpm = 136, uuid = uuid4.sync(),
            song = new clab.data.Song([], bpm, uuid);

        song.size.should.equal(0);
    });

    it('Adds track to song', () => {
        let song = new clab.data.Song(),
            track = new clab.data.Track();

        song.size.should.equal(0);

        song.push(track);

        song.size.should.equal(1);
    });
});
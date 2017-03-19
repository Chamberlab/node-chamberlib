const chai = require('chai');
chai.should();

import clab from '../../src/index';

describe('cl.data.Song', () => {
    it('Creates new song with params', () => {
        let tcount = 4, bpm = 136, sig = '4/8',
            song = new clab.data.Song(tcount, bpm, sig);

        song.size.should.equal(4);
    });

    it('Adds track to song', () => {
        let song = new clab.data.Song(),
            track = new clab.data.Track();

        song.push(track);

        song.size.should.equal(1);
    });
});
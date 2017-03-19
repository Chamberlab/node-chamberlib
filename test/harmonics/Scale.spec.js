const chai = require('chai');
chai.should();

import clab from '../../src/index';

describe('cl.harmonics.Scale', () => {
    it('Creates a C major scale', () => {
        let scale = new clab.harmonics.Scale('C', 'major');

        scale.should.be.instanceOf(clab.harmonics.Scale);
        scale.key.should.equal('C');
        scale.name.should.equal('major');
        scale.notes.length.should.equal(7);

        'CDEFGAB'.split('').forEach((key, i) => {
            scale.notes[i].key.should.equal(key);
        });
    });
});
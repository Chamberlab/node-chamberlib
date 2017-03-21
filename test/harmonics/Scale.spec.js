const chai = require('chai');
chai.should();

import cl from '../../dist';

describe('cl.harmonics.Scale', () => {
    it('Creates a C major scale', () => {
        const scale = new cl.harmonics.Scale('C', 'major');

        scale.should.be.instanceOf(cl.harmonics.Scale);
        scale.key.should.equal('C');
        scale.name.should.equal('major');
        scale.notes.length.should.equal(7);

        'CDEFGAB'.split('').forEach((key, i) => {
            scale.notes[i].key.should.equal(key);
        });
    });
});
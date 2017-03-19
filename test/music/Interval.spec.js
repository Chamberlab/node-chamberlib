const chai = require('chai');
chai.should();

import clab from '../../src/index';

describe('cl.harmonics.Interval', () => {
    it('Creates a perfect fiths interval', () => {
        let interval = new clab.harmonics.Interval('P5');

        interval.should.be.instanceOf(clab.harmonics.Interval);
        interval.name.should.equal('P5');
        interval.semitones.should.equal(7);
    });
});
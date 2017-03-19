const chai = require('chai');
chai.should();

import clab from '../../src/index';

describe('cl.harmonics.Interval', () => {
    it('Creates a perfect fiths interval from name', () => {
        let interval = new clab.harmonics.Interval('P5');

        interval.should.be.instanceOf(clab.harmonics.Interval);
        interval.name.should.equal('P5');
        interval.semitones.should.equal(7);
    });

    it('Creates a negative perfect fiths interval from name', () => {
        let interval = new clab.harmonics.Interval('-5P');

        interval.should.be.instanceOf(clab.harmonics.Interval);
        interval.name.should.equal('-5P');
        interval.semitones.should.equal(-7);
    });

    it('Creates a perfect fiths interval from semitones', () => {
        let interval = new clab.harmonics.Interval.fromSemitones(7);

        interval.should.be.instanceOf(clab.harmonics.Interval);
        interval.name.should.equal('5P');
        interval.semitones.should.equal(7);
    });

    it('Creates a negative perfect fiths interval from semitones', () => {
        let interval = new clab.harmonics.Interval.fromSemitones(-7);

        interval.should.be.instanceOf(clab.harmonics.Interval);
        interval.name.should.equal('-5P');
        interval.semitones.should.equal(-7);
    });

    it('Creates an interval from two notes', () => {
        const from = new clab.harmonics.Note('C4'),
            to = new clab.harmonics.Note('E3'),
            interval = clab.harmonics.Interval.fromNotes(from, to);

        interval.should.be.instanceOf(clab.harmonics.Interval);
        interval.name.should.equal('-6m');
        interval.semitones.should.equal(-8);
    });
});
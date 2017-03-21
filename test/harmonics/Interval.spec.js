const chai = require('chai');
chai.should();

import cl from '../../dist';

describe('cl.harmonics.Interval', () => {
    it('Creates a perfect fiths interval from name', () => {
        const interval = new cl.harmonics.Interval('P5');

        interval.should.be.instanceOf(cl.harmonics.Interval);
        interval.name.should.equal('P5');
        interval.semitones.should.equal(7);
    });

    it('Creates a negative perfect fiths interval from name', () => {
        const interval = new cl.harmonics.Interval('-5P');

        interval.should.be.instanceOf(cl.harmonics.Interval);
        interval.name.should.equal('-5P');
        interval.semitones.should.equal(-7);
    });

    it('Creates a perfect fiths interval from semitones', () => {
        const interval = cl.harmonics.Interval.fromSemitones(7);

        interval.should.be.instanceOf(cl.harmonics.Interval);
        interval.name.should.equal('5P');
        interval.semitones.should.equal(7);
    });

    it('Creates a negative perfect fiths interval from semitones', () => {
        const interval = cl.harmonics.Interval.fromSemitones(-7);

        interval.should.be.instanceOf(cl.harmonics.Interval);
        interval.name.should.equal('-5P');
        interval.semitones.should.equal(-7);
    });

    it('Creates an interval from two notes', () => {
        const from = new cl.harmonics.Note('C4'),
            to = new cl.harmonics.Note('E3'),
            interval = cl.harmonics.Interval.fromNotes(from, to);

        interval.should.be.instanceOf(cl.harmonics.Interval);
        interval.name.should.equal('-6m');
        interval.semitones.should.equal(-8);
    });
});
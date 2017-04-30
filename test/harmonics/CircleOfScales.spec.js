const chai = require('chai');
chai.should();

import cl from '../../src';

describe('cl.harmonics.CircleOfScales', () => {
    it('adds one sharp moving clockwise', () => {
        const cos = new cl.harmonics.CircleOfScales();
        cos.rotate(1);
        cos.key.should.equal('G major');
        cos.tonic.should.equal('G');
        cos.mode.should.equal('major');
        // cos.chord.should.equal('major');
        cos.scale.should.be.instanceof(cl.harmonics.Scale);
        cos.scale.key.should.equal('G');
        cos.scale.name.should.equal('major');
        cos.scale.notes.length.should.equal(7);
        cos.scale.notes[0].should.be.instanceof(cl.harmonics.Note);
        cos.scale.notes[0].key.should.equal('G');
        cos.scale.notes[cos.scale.notes.length - 1].key.should.equal('F#');
        cos.coordinates.r.should.equal(1);
    });

    it('adds six sharps moving clockwise', () => {
        const cos = new cl.harmonics.CircleOfScales();
        cos.rotate(6);
        cos.key.should.equal('F# major');
        cos.coordinates.r.should.equal(6);
    });

    it('adds one flat moving counter-clockwise', () => {
        const cos = new cl.harmonics.CircleOfScales();
        cos.rotate(-1);
        cos.key.should.equal('F major');
        cos.scale.key.should.equal('F');
        cos.scale.name.should.equal('major');
        cos.coordinates.r.should.equal(-1);
    });

    it('adds six flats moving counter-clockwise', () => {
        const cos = new cl.harmonics.CircleOfScales();
        cos.rotate(-6);
        cos.key.should.equal('Gb major');
        cos.tonic.should.equal('Gb');
        cos.mode.should.equal('major');
        cos.scale.key.should.equal('Gb');
        cos.scale.name.should.equal('major');
        cos.coordinates.r.should.equal(-6);
    });
});
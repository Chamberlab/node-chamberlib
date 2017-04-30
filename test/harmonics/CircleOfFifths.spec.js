const chai = require('chai');
chai.should();

import cl from '../../src';

describe('cl.harmonics.CircleOfFifths', () => {
    it('rotates 1 step clockwise', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('G');
        cof.coordinates.r.should.equal(1);
        cof.coordinates.s.should.equal(2);
    });

    it('rotates 1 step counter-clockwise', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(-1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('G');
        cof.coordinates.r.should.equal(11);
        cof.coordinates.s.should.equal(2);
    });

    it('shifts one degree up', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.shift(1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('D#');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(3);
    });

    it('shifts one degree down', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.shift(-1);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('A');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(1);
    });

    it('rotates 12 steps clockwise without auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(12);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('C');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(2);
    });

    it('rotates 12 steps counter-clockwise without auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(-12);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('C');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(2);
    });

    it('rotates 12 steps clockwise with auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(12, true);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('D#');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(3);
    });

    it('rotates 12 steps counter-clockwise with auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(-12, true);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('A');
        cof.coordinates.r.should.equal(0);
        cof.coordinates.s.should.equal(1);
    });

    it('rotates 16 steps clockwise without auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(16);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('E');
        cof.coordinates.r.should.equal(4);
        cof.coordinates.s.should.equal(2);
    });

    it('rotates 16 steps counter-clockwise without auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(-16);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('E');
        cof.coordinates.r.should.equal(8);
        cof.coordinates.s.should.equal(2);
    });

    it('rotates 16 steps clockwise with auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(16, true);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('G');
        cof.coordinates.r.should.equal(4);
        cof.coordinates.s.should.equal(3);
    });

    it('rotates 16 steps counter-clockwise with auto shifting', () => {
        const cof = new cl.harmonics.CircleOfFifths('C');
        cof.rotate(-16, true);
        cof.note.should.be.instanceof(cl.harmonics.Note);
        cof.note.toString().should.equal('A#');
        cof.coordinates.r.should.equal(8);
        cof.coordinates.s.should.equal(0);
    });
});
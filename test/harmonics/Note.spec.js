const chai = require('chai');
chai.should();

import Qty from 'js-quantities';
import cl from '../../dist';

describe('cl.harmonics.Note', () => {
    it('Creates a note from string', () => {
        const note = new cl.harmonics.Note('C4');

        note.should.be.instanceOf(cl.harmonics.Note);
        note.key.should.equal('C');
        note.octave.should.equal(4);
        note.toString().should.equal('C4');
    });

    it('Gets a note as MIDI', () => {
        const midi = new cl.harmonics.Note('C4').toMidi();

        midi.should.equal(60);
    });

    it('Sets a note from MIDI', () => {
        const note = new cl.harmonics.Note().fromMidi(60);

        note.should.be.instanceOf(cl.harmonics.Note);
        note.key.should.equal('C');
        note.octave.should.equal(4);
        note.toString().should.equal('C4');
    });

    it('Gets a note as frequency', () => {
        const freq = new cl.harmonics.Note('C4').toFreq();

        freq.should.be.instanceOf(Qty);
        freq.scalar.should.equal(261.63);
        freq._units.should.equal('Hz');
    });

    it('Transposes note upward by perfect fiths interval', () => {
        const note = new cl.harmonics.Note('C4'),
            interval = new cl.harmonics.Interval('P5');

        note.transpose(interval);

        note.key.should.equal('G');
        note.octave.should.equal(4);
    });

    it('Transposes note downward by perfect fiths interval', () => {
        const note = new cl.harmonics.Note('C4'),
            interval = new cl.harmonics.Interval('-5P');

        note.transpose(interval);

        note.key.should.equal('F');
        note.octave.should.equal(3);
    });

    it('Transposes note upward by 3 perfect fiths', () => {
        const note = new cl.harmonics.Note('C4');

        note.transposeFifths(3);

        note.key.should.equal('A');
        note.octave.should.equal(5);
    });

    it('Transposes note downward by 3 perfect fiths', () => {
        const note = new cl.harmonics.Note('C4');

        note.transposeFifths(-3);

        note.key.should.equal('Eb');
        note.octave.should.equal(2);
    });
});
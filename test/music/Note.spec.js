const chai = require('chai');
chai.should();

import clab from '../../src/index';

describe('cl.harmonics.Note', () => {
    it('Creates a note from string', () => {
        let note = new clab.harmonics.Note('C4');

        note.should.be.instanceOf(clab.harmonics.Note);
        note.key.should.equal('C');
        note.octave.should.equal(4);
        note.toString().should.equal('C4');
    });

    it('Gets a note as MIDI', () => {
        let midi = new clab.harmonics.Note('C4').toMidi();

        midi.should.equal(60);
    });

    it('Sets a note from MIDI', () => {
        let note = new clab.harmonics.Note().fromMidi(60);

        note.should.be.instanceOf(clab.harmonics.Note);
        note.key.should.equal('C');
        note.octave.should.equal(4);
        note.toString().should.equal('C4');
    });

    it('Gets a note as frequency', () => {
        let freq = new clab.harmonics.Note('C4').toFreq();

        freq.should.be.instanceOf(clab.quantities.Frequency);
        freq.value.should.equal(261.63);
        freq.unit.suffix.should.equal('Hz');
    });
});
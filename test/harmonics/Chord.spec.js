const chai = require('chai');
chai.should();

import cl from '../../dist';

describe('cl.harmonics.Chord', () => {
    it('Creates a chord', () => {
        let chord = new cl.harmonics.Chord('Maj7', 'C');

        chord.type.should.equal('Maj7');
        chord.tonic.should.equal('C');

        chord.notes.length.should.equal(4);
        'CEGB'.split('').forEach((key, i) => {
            chord.notes[i].toString().should.equal(key);
        });
    });

    it('Detects a chord', () => {
        const notes = 'CEGB'.split('').map((key) => {
                return new cl.harmonics.Note(key);
            }),
            chords = cl.harmonics.Chord.detectFromNotes(notes);

        chords.length.should.equal(1);
        chords[0].type.should.equal('Maj7');
        chords[0].tonic.should.equal('C');
    });

    it('Lists all available chords', () => {
        let names = cl.harmonics.Chord.getChordNames('*');
        names.length.should.equal(132);
    });

    it('Lists available chords for Major', () => {
        let names = cl.harmonics.Chord.getChordNames('Major');
        names.length.should.equal(72);
    });

    it('Lists available chords for Major with basenote E', () => {
        let names = cl.harmonics.Chord.getChordNames('Major', 'E');
        names.length.should.equal(13);
    });

    it('Lists available chords for Major with basenote E and 3 notes', () => {
        let names = cl.harmonics.Chord.getChordNames('Major', 'E', 3);
        names.length.should.equal(7);
    });
});
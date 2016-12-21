import 'babel-core/register';
const chai = require('chai');
chai.should();

import clab from '../../index';

describe('Chord', () => {
    it('Creates a chord from string', () => {
        let chord = new clab.harmonics.Chord('Fm7b5');

        chord.string.should.equal('Fm7b5');
        chord.value.length.should.equal(4);
    });

    it('Lists all available chords', () => {
        let names = clab.harmonics.Chord.getChordNames('*');
        names.length.should.equal(132);
    });

    it('Lists available chords for Major', () => {
        let names = clab.harmonics.Chord.getChordNames('Major');
        names.length.should.equal(72);
    });

    it('Lists available chords for Major with basenote E', () => {
        let names = clab.harmonics.Chord.getChordNames('Major', 'E');
        names.length.should.equal(13);
    });

    it('Lists available chords for Major with basenote E and 3 notes', () => {
        let names = clab.harmonics.Chord.getChordNames('Major', 'E', 3);
        names.length.should.equal(7);
    });
});
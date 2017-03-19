const chai = require('chai');
chai.should();

import Chance from 'chance';
import Qty from 'js-quantities';
import fs from 'fs';
import path from 'path';
import * as fixtures from '../fixtures';
import clab from '../../src/index';

const chance = new Chance();

const makeTrack = function (dataEvents, useChords) {
    const walk = new clab.composition.SimpleWalk(useChords);

    return walk.makeTrack(
        dataEvents, '0.6mV', 'P5',
        () => Qty(1 / 16 + Math.random() / 8, 's'),
        chords => chance.pickone(chords)
    );
};

const conditionalRemove = (keepFile, filepath) => {
    if (!keepFile && fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
    }
};

describe('cl.composition.SimpleWalk', () => {
    const keepFile = false, dataEvents = fixtures.makeEvenlySpacedDataEvents(),
        filepath = path.join(__dirname, '..', 'assets', `simplewalk-${chance.word({syllables: 3})}`);

    it('Creates a simple walk with notes from a random mV sequence as a MIDI file', () => {
        const song = new clab.data.Song([], 120),
            fullpath = `${filepath}-notes.mid`;

        song.push(makeTrack(dataEvents));
        song.toMidiFile(fullpath).then(() => conditionalRemove(keepFile, fullpath));
    });

    it('Creates a simple walk with chords from a random mV sequence as a MIDI file', () => {
        const song = new clab.data.Song([], 120),
            fullpath = `${filepath}-chords.mid`;

        song.push(makeTrack(dataEvents, true));
        song.toMidiFile(fullpath).then(() => conditionalRemove(keepFile, fullpath));
    });
});
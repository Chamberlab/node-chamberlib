const chai = require('chai');
chai.should();

import Chance from 'chance';
import fs from 'fs';
import path from 'path';
import clab from '../../src/index';

const chance = new Chance();

const createSong = function (dataEvents, bpm, useChords, scale = 'Major', baseNote = new clab.harmonics.Note('C4')) {
    const song = new clab.data.Song([], bpm), tonalEvents = [];

    dataEvents.forEach(event => {
        let tonalValue;

        if (event.value.value > 0.7) {
            baseNote.transpose(new clab.harmonics.Interval('P5'), true);
        }
        if (useChords) {
            const chords = clab.harmonics.Chord.getChordNames(scale, baseNote.key);
            tonalValue = new clab.harmonics.Chord(chance.pickone(chords), undefined, 4);
        } else {
            tonalValue = new clab.harmonics.Note(baseNote.key, 4)
        }

        tonalEvents.push(new clab.events.TonalEvent(
            new clab.quantities.Time(event.time.normalized(), 's'),
            tonalValue,
            new clab.quantities.Time(1 / 16 + Math.random() / 8, 's')
        ));
    });

    song.push(new clab.data.Track(tonalEvents));

    return song;
};

describe('cl.composition.Walk', () => {
    const keepFile = false;
    let dataEvents;

    beforeEach(() => {
        dataEvents = [];
        for (let i = 0; i < 256; i += 1) {
            dataEvents.push(new clab.events.DataEvent(
                new clab.quantities.Time(i / 8, 's'),
                new clab.quantities.Voltage(Math.random(), 'mV')
            ));
        }
    });

    it('Should create a walk with notes from a mV sequence as a MIDI file', () => {
        let filepath = path.join(__dirname, '..', 'assets', `walk-notes-${chance.word({syllables: 3})}.mid`);

        createSong(dataEvents, 120, false)
            .toMidiFile(filepath)
            .then(() => {
                if (!keepFile && fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            });
    });

    it('Should create a walk with chords from a mV sequence as a MIDI file', () => {
        let filepath = path.join(__dirname, '..', 'assets', `walk-chords-${chance.word({syllables: 3})}.mid`);

        createSong(dataEvents, 120, true)
            .toMidiFile(filepath)
            .then(() => {
                if (!keepFile && fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            });
    });
});
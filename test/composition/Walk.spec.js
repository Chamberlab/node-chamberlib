const chai = require('chai');
chai.should();

import Chance from 'chance';
import fs from 'fs';
import path from 'path';
import clab from '../../src/index';

const chance = new Chance();

describe('cl.composition.Walk', () => {
    it('Should create a walk from a mV sequence as a MIDI file', () => {
        let keepFile = false,
            filepath = path.join(__dirname, '..', 'assets', `walk-${chance.word({syllables: 3})}.mid`),
            dataEvents = [], tonalEvents = [],
            baseNote = new clab.harmonics.Note('C4'),
            track, song = new clab.data.Song([], 120);

        for (let i = 0; i < 256; i += 1) {
            dataEvents.push(new clab.events.DataEvent(
                new clab.quantities.Time(i / 8, 's'),
                new clab.quantities.Voltage(Math.random(), 'mV')
            ));
        }

        dataEvents.forEach(event => {
            if (event.value.value > 0.7) {
                baseNote.transpose(new clab.harmonics.Interval('P5'), true);
            }
            tonalEvents.push(new clab.events.TonalEvent(
                new clab.quantities.Time(event.time.normalized(), 's'),
                new clab.harmonics.Note(baseNote.key, 4),
                new clab.quantities.Time(1 / 16 + Math.random() / 8, 's')
            ));
        });

        track = new clab.data.Track(tonalEvents);

        song.push(track);

        song.toMidiFile(filepath)
            .then(() => {
                if (!keepFile && fs.existsSync(filepath)) {
                    fs.unlinkSync(filepath);
                }
            });
    });
});
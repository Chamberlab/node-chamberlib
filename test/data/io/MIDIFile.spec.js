const chai = require('chai');
chai.should();

import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import cl from '../../../dist';
import * as fixtures from '../../fixtures';

const chance = new Chance();

describe('cl.data.io.MIDIFile', () => {
    const filepath = path.join(__dirname, '..', '..', 'assets', `${chance.word({syllables: 3})}.mid`);

    let discardFile = false;

    afterEach(() => {
        if (!discardFile) {
            discardFile = true;
        } else {
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }
        }
    });

    it('should output a MIDI representation of events as a file', () => {
        const song = fixtures.makeSong();
        cl.io.file.MidiFile.write(song, filepath);
        discardFile = true;
    });
});
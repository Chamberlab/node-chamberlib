const chai = require('chai');
chai.should();

import Debug from 'debug';
import path from 'path';
import fs from 'fs';
import Chance from 'chance';

import cl from '../../../dist';
import * as fixtures from '../../fixtures';

const debug = Debug('cl:stats'),
    chance = new Chance();

describe('cl.data.io.JSONFile', () => {
    const filepath = path.join(__dirname, '..', '..', 'assets', chance.word({syllables: 3}) + '.json'),
        channel = fixtures.makeDataChannel(10000);
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

    it('Stores a DataChannel with 10k DataEvents', () => {
        let file = new cl.io.file.JSONFile();
        let tstart = Date.now();
        return file.write(filepath, channel)
            .then(() => {
                debug(`JSONFile: Stored 10k DataEvents in ${Date.now() - tstart} ms\n`);
                fs.existsSync(filepath).should.be.true;
                let size = fs.statSync(filepath).size;
                debug(`JSONFile: File size is ${(size / Math.pow(1024,2)).toFixed(2)} MB\n`);
                size.should.be.greaterThan(4);
            });
    });

    it('Reads the DataChannel with 10k DataEvents back in', () => {
        let file = new cl.io.file.JSONFile();
        let tstart = Date.now();
        return file.read(filepath)
            .then((data) => {
                // TODO: resurrect original object type!
                // data.size.should.be.equal(10000);
                debug(`JSONFile: Loaded 10k DataEvents in ${Date.now() - tstart} ms\n\n`);
                /*
                data.all.map((event, i) => {
                    event.time.normalized().should.be.equal(channel.at(i).time.normalized());
                    event.value.normalized().should.be.equal(channel.at(i).value.normalized());
                });
                */
                discardFile = true;
            });
    });
});
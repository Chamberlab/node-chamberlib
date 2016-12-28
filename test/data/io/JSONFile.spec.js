const chai = require('chai');
chai.should();

import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import clab from '../../../src/index';
import * as fixtures from '../../fixtures';

const chance = new Chance();

describe('cl.data.io.JSONFile', () => {
    const filepath = path.join(__dirname, '..', '..', 'assets', chance.word({syllables: 3}) + '.json'),
        channel = fixtures.makeDataChannel(10000);
    let discardFile = false;

    afterEach(() => {
        if (!discardFile) {
            discardFile = true;
        } else {
            fs.unlinkSync(filepath);
        }
    });

    it('Stores a DataChannel with 10k DataEvents', () => {
        let file = new clab.data.io.JSONFile();
        let tstart = Date.now();
        return file.write(filepath, channel)
            .then(() => {
                console.log(`   JSONFile: Stored 10k DataEvents in ${Date.now() - tstart} ms`);
                fs.existsSync(filepath).should.be.true;
                let size = fs.statSync(filepath).size;
                console.log(`   JSONFile: File size is ${(size / Math.pow(1024,2)).toFixed(2)} MB\n`);
                size.should.be.greaterThan(4);
            });
    });

    it('Reads the DataChannel with 10k DataEvents back in', () => {
        let file = new clab.data.io.JSONFile();
        let tstart = Date.now();
        return file.read(filepath)
            .then((data) => {
                // TODO: resurrect original object type!
                // data.size.should.be.equal(10000);
                console.log(`   JSONFile: Loaded 10k DataEvents in ${Date.now() - tstart} ms\n\n`);
                /*
                data.all.map((event, i) => {
                    event.time.normalized().should.be.equal(channel.at(i).time.normalized());
                    event.value.normalized().should.be.equal(channel.at(i).value.normalized());
                });
                */
            });
    });
});
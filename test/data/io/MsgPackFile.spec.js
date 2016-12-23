const chai = require('chai');
chai.should();

import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import clab from '../../../src/index';
import * as fixtures from '../../fixtures';

const chance = new Chance();

describe('MsgPackFile', () => {
    const filepath = path.join(__dirname, '..', '..', 'assets', chance.word({syllables: 3}) + '.msgpack');

    afterEach(() => {
        fs.unlinkSync(filepath);
    });

    it('Stores a DataChannel with 10k DataEvents', () => {
        let file = new clab.data.io.MsgPackFile(),
            channel = fixtures.makeDataChannel(0, clab.quantities.Voltage);
        while (channel.size < 10000) {
            channel.push(fixtures.makeDataEvent(clab.quantities.Voltage));
        }
        let tstart = Date.now();
        return file.write(filepath, channel)
            .then(() => {
                console.log(`MsgPackFile: Stored 10k DataEvents in ${Date.now() - tstart} ms\n`);
                fs.existsSync(filepath).should.be.true;
                let size = fs.statSync(filepath).size;
                console.log(`MsgPackFile: File size is ${(size / Math.pow(1024,2)).toFixed(2)} MB\n`);
                size.should.be.greaterThan(4);
            });
    });
});
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

    it('Stores a DataChannel with 1000 DataEvents', () => {
        let file = new clab.data.io.MsgPackFile(),
            channel = fixtures.makeDataChannel(0, clab.quantities.Voltage);
        while (channel.size < 1000) {
            channel.push(fixtures.makeDataEvent(clab.quantities.Voltage));
        }
        return file.write(filepath, channel)
            .then(() => {
                fs.existsSync(filepath).should.be.true;
                fs.statSync(filepath).size.should.be.greaterThan(0);
            });
    });
});
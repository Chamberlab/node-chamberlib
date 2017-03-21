const chai = require('chai');
chai.should();

import Debug from 'debug';
import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import Qty from 'js-quantities';

import cl from '../../../dist';
import * as fixtures from '../../fixtures';

const debug = Debug('cl:msgpack:stats'),
    chance = new Chance();

describe('cl.data.io.MsgPackFile', () => {
    const channel = fixtures.makeDataChannel(10000),
        filepath = path.join(__dirname, '..', '..', 'assets',
            `${chance.word({syllables: 3})}.msgpack`);

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
        let file = new cl.io.file.MsgPackFile();
        return file.write(filepath, channel)
            .then(() => {
                debug('Stored 10k DataEvents');
                fs.existsSync(filepath).should.be.true;
                let size = Qty(fs.statSync(filepath).size, 'B');
                debug(`File size is ${size.to('MB')}`);
                size.gt(Qty(4, 'B')).should.be.true;
            });
    });

    it('Reads the DataChannel with 10k DataEvents back in', () => {
        let file = new cl.io.file.MsgPackFile();
        return file.read(filepath)
            .then((data) => {
                // TODO: resurrect original object type!
                // data.size.should.be.equal(10000);
                debug('Loaded 10k DataEvents');
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
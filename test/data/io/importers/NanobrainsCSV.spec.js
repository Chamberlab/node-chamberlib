const chai = require('chai');
chai.should();

import Debug from 'debug';
import path from 'path';
import cl from '../../../../dist';

describe('cl.data.io.importers.NanobrainsCSV', () => {
    it('Reads and parses a nanobrains file', () => {
        let nano = new cl.io.importers.NanobrainsCSV();
        return nano.read(path.join(__dirname, '..', '..', '..', 'assets', 'nanobrains.csv'))
            .then(() => {
                Debug('cl:csv:stats')(`Read ${nano.data.at(0).size} CSV records`);

                nano.data.should.be.instanceof(cl.data.DataSet);
                nano.data.size.should.equal(65);
                nano.data.at(0).size.should.equal(46);
                nano.data.at(0).title.should.equal('time_ms');
                nano.data.at(64).title.should.equal('ch64_mV');
            });
    });
});
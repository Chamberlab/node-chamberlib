const chai = require('chai');
chai.should();

import path from 'path';
import clab from '../../../../index';

describe('NanobrainsCSV', () => {
    it('Reads and parses a nanobrains file', () => {
        let nano = new clab.data.io.importers.NanobrainsCSV();
        let tstart = Date.now();
        return nano.read(path.join(__dirname, '..', '..', '..', 'assets', 'nanobrains.csv'))
            .then(() => {
                console.log(`   NanobrainsCSV: Read ${nano.data.at(0).size} records in ${Date.now() - tstart} ms\n`);
                nano.data.should.be.instanceof(clab.data.DataSet);
                nano.data.size.should.equal(64);
                nano.data.at(0).size.should.equal(46);
                nano.data.at(0).title.should.equal('ch1_mV');
                nano.data.at(63).title.should.equal('ch64_mV');
            });
    });
});
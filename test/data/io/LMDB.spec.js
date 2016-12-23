const chai = require('chai');
chai.should();

import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import clab from '../../../src/index';

const chance = new Chance();

describe('LMDB', () => {
    const datapath = path.join(__dirname, '..', '..', 'assets', chance.word({syllables: 3}));

    beforeEach(() => {
        if (!fs.existsSync(datapath)) {
            fs.mkdirSync(datapath);
        }
    });

    afterEach(() => {
        fs.unlinkSync(path.join(datapath, 'data.mdb'));
        fs.unlinkSync(path.join(datapath, 'lock.mdb'));
        if (fs.existsSync(datapath)) {
            fs.rmdirSync(datapath);
        }
    });

    it('Opens and closes an environment', () => {
        let lmdb = new clab.data.io.LMDB(datapath);
        fs.existsSync(path.join(datapath, 'data.mdb')).should.be.true;
        fs.existsSync(path.join(datapath, 'lock.mdb')).should.be.true;
        lmdb.closeEnv();
    });

    it('Creates 10 databases on open, randomly reopens and closes', () => {
        let lmdb = new clab.data.io.LMDB(datapath),
            dbnames = [];

        while (dbnames.length < 10) {
            let dbname = chance.word({syllables: 3});
            if (dbnames.indexOf(dbname) === -1) {
                dbnames.push(dbname);
            }
        }

        dbnames.map((name) => {
            let dbi = lmdb._open(name);
            dbi.constructor.name.should.be.equal('Dbi');
        });

        for (let i = 0; i < 50; i++) {
            let name = chance.pickone(dbnames);
            if (chance.bool()) {
                let dbi = lmdb._open(name);
                dbi.constructor.name.should.be.equal('Dbi');
            } else {
                lmdb._close(name);
                lmdb._openDB.hasOwnProperty(name).should.be.false;
            }
        }

        lmdb.closeEnv();
    });

    it('Stores 1000000 DataEvent objects', () => {
        let tstart = Date.now(),
            lmdb = new clab.data.io.LMDB(datapath),
            dbname = chance.word({syllables: 3});

        lmdb.begin(dbname);
        for (let i = 0; i < 500000; i += 1) {
            let time = new clab.quantities.Time(chance.floating({min: 0, max: 20000000})),
                voltage = new clab.quantities.Time(chance.floating({min: -24, max: 24}));
            lmdb.put(dbname, time, voltage);
        }
        lmdb.commit(dbname);
        lmdb.closeEnv();
        console.log(`Stored 1000000 DataEvents in ${Date.now() - tstart}ms`);
    });
});
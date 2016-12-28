const chai = require('chai');
chai.should();

import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import clab from '../../../src/index';
import * as fixtures from '../../fixtures';

const chance = new Chance();

describe('cl.data.io.LMDB', () => {
    const title = chance.word({syllables: 3}),
        datapath = path.join(__dirname, '..', '..', 'assets', title);

    let lmdb;

    beforeEach((cb) => {
        if (!fs.existsSync(datapath)) {
            fs.mkdirSync(datapath);
        }

        lmdb = new clab.data.io.LMDB(datapath, false, fixtures.makeLMDBMeta(datapath, title));
        lmdb.once('updated', () => {
            cb();
        });
    });

    afterEach(() => {
        lmdb.closeEnv();
        fs.unlinkSync(path.join(datapath, 'data.mdb'));
        fs.unlinkSync(path.join(datapath, 'lock.mdb'));
        fs.unlinkSync(path.join(datapath, 'meta.json'));
        fs.unlinkSync(path.join(datapath, 'meta.json.bak'));
        if (fs.existsSync(datapath)) {
            fs.rmdirSync(datapath);
        }
    });

    it('Opens and closes an environment', () => {
        fs.existsSync(path.join(datapath, 'data.mdb')).should.be.true;
        fs.existsSync(path.join(datapath, 'lock.mdb')).should.be.true;
        fs.existsSync(path.join(datapath, 'meta.json')).should.be.true;
        fs.existsSync(path.join(datapath, 'meta.json.bak')).should.be.true;
    });

    it('Creates 10 databases on open, randomly reopens and closes', () => {
        let dbnames = [];

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
    });

    it('Stores 10k DataEvent objects', () => {
        let dbname = title || chance.word({syllables: 3}),
            channel = fixtures.makeDataChannel(10000),
            tstart = Date.now();

        let txn = lmdb.begin(dbname, false);
        channel.all.map((event) => {
            lmdb.put(dbname, txn, event);
        });
        lmdb.commit(txn);
        console.log(`   LMDB: Stored 10k DataEvents in ${Date.now() - tstart} ms\n`);
    });

    it('Stores 10k DataEvent objects, then retrieves them', () => {
        let dbname = title || chance.word({syllables: 3}),
            channel = fixtures.makeDataChannel(10000);

        let txn = lmdb.begin(dbname, false);
        channel.all.map((event) => {
            lmdb.put(dbname, txn, event);
        });
        lmdb.commit(txn);

        let tstart = Date.now();
        txn = lmdb.begin(dbname);
        channel.all.map((event) => {
            let res = lmdb.get(dbname, txn, event.time);
            res.time.toObject().should.be.equal(event.time.toObject());
            // TODO: fix the rounding errors
            // res.value.toObject().should.be.equal(event.value.toObject());
        });
        lmdb.abort(txn);

        console.log(`   LMDB: Retrieved 10k DataEvents in ${Date.now() - tstart} ms\n\n`);
    });
});
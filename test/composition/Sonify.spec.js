const chai = require('chai');
chai.should();

import Debug from 'debug';
import Qty from 'js-quantities';
import path from 'path';
import fs from 'fs';

import cl from '../../src';

const debug = Debug('cl:sonify');

describe('cl.composition.Sonify', () => {
    it('Sonify raw NanoBrain signals', (cb) => {
        const dbname = process.env.NB_DBNAME || 'test',
            dbpath = path.join(__dirname, '..', '..', 'data', 'lmdb', dbname);

        if (!fs.existsSync(dbpath)) {
            debug('No Nanobrains DB in data, skipping...');
            return cb();
        }

        const lmdb = new cl.io.db.LMDB(dbpath),
            txn = lmdb.begin(dbname), cursor = lmdb.cursor(dbname, txn),
            min = Qty(-1.0, 'mV'), max = Qty(1.0, 'mV');

        let frame, value, secs = 0;
        for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
            frame = lmdb.getCurrentFrame(dbname, cursor);
            frame.value.forEach((val, i) => {
                value = Qty(val, lmdb.meta.DataSet.DataChannels[dbname].units[i]);
                if ((value.isCompatible(max) && value.gte(max)) || (value.isCompatible(max) && value.lte(min))) {
                    debug(val, i, frame.time.toString());
                }
            });
            secs = frame.time.scalar;
            if (secs % 30.0 === 0) {
                debug(`Key position at ${secs.toFixed(3)} seconds`);
            }
        }

        debug(`Key position at ${secs.toFixed(3)} seconds`);

        lmdb.closeCursor(cursor);
        lmdb.closeEnv();

        setTimeout(cb, 100);
    });
});
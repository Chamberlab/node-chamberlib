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
            txn = lmdb.begin(dbname),
            cursor = lmdb.cursor(dbname, txn),
            min = Qty(-0.5, 'mV'),
            max = Qty(0.5, 'mV'),
            channel = lmdb.meta.DataSet.DataChannels[dbname];

        let frame, value, frames = 0;
        for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
            frame = lmdb.getCurrentFrame(dbname, cursor);
            frame.value.forEach((val, i) => {
                value = Qty(val, channel.units[i]);
                if (value.isCompatible(max) && value.isCompatible(min)) {
                    if (value.gte(max)) {
                        Debug('cl:trigger')(`${value} >= ${max} on ${channel.labels[i]} at ${frame.time}`);
                    } else if (value.lte(min)) {
                        Debug('cl:trigger')(`${value} <= ${min} on ${channel.labels[i]} at ${frame.time}`);
                    }
                }
            });

            if (frames % 200000 === 0) {
                debug(`Key position at ${frame.time} (${frames} data frames)`);
            }
            frames += 1;
        }

        debug(`Key position at ${frame.time} (${frames} data frames)`);

        lmdb.closeCursor(cursor);
        lmdb.commit(txn);
        lmdb.closeEnv();

        setTimeout(cb, 100);
    });
});
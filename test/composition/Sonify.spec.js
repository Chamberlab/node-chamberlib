const chai = require('chai');
chai.should();

import Qty from 'js-quantities';
import path from 'path';
import cl from '../../src';

describe('cl.composition.Sonify', (cb) => {
    it('Sonify raw NanoBrain signals', () => {
        const dbname = '20151208_15h59m12s_nanobrain',
            lmdb = new cl.io.db.LMDB(path.join(__dirname, '..', '..', 'data', 'lmdb', dbname)),
            txn = lmdb.begin(dbname), cursor = lmdb.cursor(dbname, txn),
            min = Qty(-1.0, 'mV'), max = Qty(1.0, 'mV');

        let frame, value;
        for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
            frame = lmdb.getCurrentFrame(dbname, cursor);
            frame.value.forEach((val, index) => {
                value = Qty(val, 'mV');
                if (value.gte(max) || value.lte(min)) {
                    console.log(val, index, frame.time.toString());
                }
            });
        }

        lmdb.closeCursor(cursor);
        lmdb.closeEnv();

        setTimeout(cb, 100);
    });
});
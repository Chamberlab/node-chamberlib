const chai = require('chai');
chai.should();

import path from 'path';
import fs from 'fs';
import Chance from 'chance';
import cl from '../../../index';
import * as fixtures from '../../fixtures';

const chance = new Chance();

describe('LMDBNode', () => {
    const dbname = '20151208_15h59m12s_nanobrain',
        filepath = path.join(__dirname, '..', '..', '..', 'data/lmdb/20151208_15h59m12s_nanobrain');

    const lmdb = new cl.nodes.storage.LMDBNode();
    lmdb.openDataSet(filepath);

    it('Opens a DataSet', () => {
        lmdb.should.be.instanceOf(cl.nodes.storage.LMDBNode);
    });

    it('Gets the time range', () => {
        return lmdb.getTimeRange(dbname)
            .then((res) => {
                res.key.should.be.instanceOf(String);
                res.val.should.be.instanceOf(Float32Array);
                res.key.length.should.equal(16);
            });
    });

});
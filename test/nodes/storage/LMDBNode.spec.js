const chai = require('chai');
chai.should();

import path from 'path';
import cl from '../../../index';

describe('cl.nodes.storage.LMDBNode', () => {
    const dbname = 'nanobrains-demo-import',
        filepath = path.join(__dirname, '..', '..', 'assets', dbname);

    const lmdb = new cl.nodes.storage.LMDBNode();
    lmdb.openDataSet(filepath);

    it('Opens a DataSet', () => {
        lmdb.should.be.instanceOf(cl.nodes.storage.LMDBNode);
    });

    it('Gets the start and end time', () => {
        return lmdb.getTimeRange(dbname)
            .then((res) => {
                res.start.should.be.instanceOf(cl.quantities.Time);
                res.end.should.be.instanceOf(cl.quantities.Time);
            });
    });

    it('Gets the min/max for all values', () => {
        return lmdb.getValueRanges(dbname)
            .then((res) => {
                res.min.should.be.instanceOf(Array);
                res.min.length.should.equal(64);
                for (let v of res.min) {
                    v.should.be.instanceOf(cl.quantities.Voltage);
                    v.unit.suffix.should.equal('mV');
                }
                res.max.should.be.instanceOf(Array);
                res.max.length.should.equal(64);
                for (let v of res.max) {
                    v.should.be.instanceOf(cl.quantities.Voltage);
                    v.unit.suffix.should.equal('mV');
                }
            });
    });
});
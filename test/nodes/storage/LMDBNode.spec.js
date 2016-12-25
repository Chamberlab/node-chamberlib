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
        let res = lmdb.getTimeRange(dbname)
        res.start.should.be.instanceOf(cl.quantities.Time);
        res.end.should.be.instanceOf(cl.quantities.Time);
    });

    it('Gets the min/max for all values', () => {
        let res= lmdb.getValueRanges(dbname);
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

    it('Streams all DataFrames', () => {
        return new Promise((resolve, reject) => {
            const streamId = lmdb.createOutput(dbname, 0.0, false),
                output = lmdb.outputs[streamId].stream;

            let results = [],
                meta = null;
            output.on('data', (data) => {
                results.push(data);
            });
            output.on('end', () => {
                resolve({ results: results, meta: meta });
            });
            output.on('error', (err) => {
                reject(err);
            });
            output.on('meta', (data) => {
                meta = data;
            });

            lmdb.startOutput(streamId)
        })
        .then((res) => {
            res.meta.should.be.instanceOf(Object);
            res.results.length.should.be.equal(50);
            res.results.map((res) => {
                res.should.be.instanceOf(cl.events.DataFrame);
                res.time.should.be.instanceOf(cl.quantities.Time);
                res.value.should.be.instanceOf(Float32Array);
            })
        });
    });

    it('Streams all DataFrames as single DataEvents', () => {
        return new Promise((resolve, reject) => {
            const streamId = lmdb.createOutput(dbname),
                output = lmdb.outputs[streamId].stream;

            let results = [],
                meta = null;
            output.on('data', (data) => {
                results.push(data);
            });
            output.on('end', () => {
                resolve({ results: results, meta: meta });
            });
            output.on('error', (err) => {
                reject(err);
            });
            output.on('meta', (data) => {
                meta = data;
            });

            lmdb.startOutput(streamId)
        })
        .then((res) => {
            res.meta.should.be.instanceOf(Object);
            res.results.length.should.be.equal(3200);
            res.results.map((res) => {
                res.should.be.instanceOf(cl.events.DataEvent);
                res.time.should.be.instanceOf(cl.quantities.Time);
                res.value.should.be.instanceOf(cl.quantities.Voltage);
            })
        });

    });
});
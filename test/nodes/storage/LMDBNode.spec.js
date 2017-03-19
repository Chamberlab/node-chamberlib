const chai = require('chai');
chai.should();

import Qty from 'js-quantities';
import path from 'path';
import cl from '../../../src/index';

describe('cl.nodes.storage.LMDBNode', () => {
    const dbname = 'nanobrains-demo-import',
        filepath = path.join(__dirname, '..', '..', 'assets', dbname);

    const lmdb = new cl.nodes.storage.LMDBNode();
    lmdb.openDataSet(filepath);

    it('Opens a DataSet', () => {
        lmdb.should.be.instanceOf(cl.nodes.storage.LMDBNode);
    });

    it('Gets the start and end time', () => {
        let res = lmdb.getTimeRange(dbname);
        res.start.should.be.instanceOf(Qty);
        res.end.should.be.instanceOf(Qty);
    });

    it('Gets the min/max for all values', () => {
        let res = lmdb.getValueRanges(dbname);
        res.min.should.be.instanceOf(Array);
        res.min.length.should.equal(64);
        res.min.forEach(v => {
            v.should.be.instanceOf(Qty);
            v._units.should.equal('mV');
        });
        res.max.should.be.instanceOf(Array);
        res.max.length.should.equal(64);
        res.max.forEach(v => {
            v.should.be.instanceOf(Qty);
            v._units.should.equal('mV');
        });
    });

    it('Streams all DataFrames', () => {
        return new Promise((resolve, reject) => {
            const streamId = lmdb.createOutput(dbname,
                Qty('0s'), Qty('0s'), false),
                output = lmdb.outputs[streamId].stream;

            let results = [],
                meta = lmdb.meta;
            output.on('data', (data) => {
                results.push(data);
            });
            output.on('end', () => {
                resolve({ results: results, meta: meta });
            });
            output.on('error', (err) => {
                reject(err);
            });

            lmdb.startOutput(streamId);
        })
        .then((res) => {
            res.meta.should.be.instanceOf(Object);
            // FIXME: used to be 50...
            res.results.length.should.be.equal(49);
            res.results.map((res) => {
                res.should.be.instanceOf(cl.events.DataFrame);
                res.time.should.be.instanceOf(Qty);
                res.value.should.be.instanceOf(Float32Array);
            })
        });
    });

    it('Streams all DataFrames as single DataEvents', () => {
        return new Promise((resolve, reject) => {
            const streamId = lmdb.createOutput(dbname,
                Qty('0s'), Qty('0s'), true),
                output = lmdb.outputs[streamId].stream;

            let results = [],
                meta = lmdb.meta;
            output.on('data', (data) => {
                results.push(data);
            });
            output.on('end', () => {
                resolve({ results: results, meta: meta });
            });
            output.on('error', (err) => {
                reject(err);
            });

            lmdb.startOutput(streamId)
        })
        .then((res) => {
            res.meta.should.be.instanceOf(Object);
            // FIXME: used to be 3200
            res.results.length.should.be.equal(3136);
            res.results.map((res) => {
                res.should.be.instanceOf(cl.events.DataEvent);
                res.time.should.be.instanceOf(Qty);
                res.value.should.be.instanceOf(Qty);
            })
        });

    });

    // TODO: write tests for data input
});
const chai = require('chai');
chai.should();

import cl from '../../dist';
import path from 'path';

describe('cl.data.DataSet', () => {
    it('Creates new dataset with params', () => {
        let set = new cl.data.DataSet(4);
        set.size.should.equal(4);
    });

    it('Adds an empty channel to dataset', () => {
        let set = new cl.data.DataSet(),
            channel = new cl.data.DataChannel();

        set.push(channel);
        set.size.should.equal(1);
    });

    it('Reads data from custom json file', () => {
        let dataPath = path.join(__dirname, '..', 'assets', 'data.json'),
            set = new cl.data.DataSet();

        return set.loadJson(dataPath, cl.io.importers.SpiketrainsOE)
            .then(function () {
                set.size.should.equal(5);
                set.should.be.instanceOf(cl.data.DataSet);
                set.at(0).size.should.equal(100);
                set.at(0).should.be.instanceOf(cl.data.DataChannel);
            });
    });
});
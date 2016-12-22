const chai = require('chai');
chai.should();

import clab from '../../src/index';
import path from 'path';

describe('DataSet', () => {
    it('Creates new dataset with params', () => {
        let set = new clab.data.DataSet(4);

        set.size.should.equal(4);
    });

    it('Adds an empty channel to dataset', () => {
        let set = new clab.data.DataSet(),
            channel = new clab.data.DataChannel();

        set.push(channel);
        set.size.should.equal(1);
    });

    it('Reads data from json file', () => {
        let set = new clab.data.DataSet();

        return set.loadJson(path.join(__dirname, '..', 'assets', 'data.json'))
            .then(function () {
                set.size.should.equal(5);
                set.should.be.instanceOf(clab.data.DataSet);
                set.at(0).size.should.equal(100);
                set.at(0).should.be.instanceOf(clab.data.DataChannel);
            });
    });
});
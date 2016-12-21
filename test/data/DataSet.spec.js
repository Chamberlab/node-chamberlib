'use strict';

import 'babel-core/register';
const chai = require('chai');
chai.should();

import clab from '../../index';

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

        return set.loadJson('/Users/anton/WebstormProjects/nanonotes/sets/nb-rec-mode-1-08_groups-16_units-16_sptrs/nb-rec-mode-1-08_groups-16_units-16_sptrs.json')
            .then(function () {
                set.size.should.equal(16);
            });
    });
});
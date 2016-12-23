import assert from 'assert';
import path from 'path';
import Promise from 'bluebird';

import DataChannel from './DataChannel';
import BaseCollection from './BaseCollection';
import RuleSet from '../rules/RuleSet';
import JSONFile from './io/JSONFile';

class DataSet extends BaseCollection {
    constructor(channels, title = undefined) {
        super(channels, DataChannel);
        this.title = title;
    }

    loadJson(filepath, importerClass = undefined, title = undefined) {
        let _self = this;
        _self.title = title || path.basename(filepath, '.json');

        if (importerClass) {
            return new importerClass().read(filepath)
                .map(function (channel) {
                    _self.push(channel);
                });
        }

        return new JSONFile().read(filepath)
            .then(function (data) {
                return data;
            });
    }

    evaluateRuleSets() {
        let _self = this;
        return Promise.each(_self.all, function (channel) {
            return channel.evaluateRuleSet()
                .then(function (res) {
                    // TODO: handle errors and stats later on
                    assert(res instanceof RuleSet);
                    channel = res.lastResult;
                });
        });
    }
}

export default DataSet;
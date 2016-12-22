import assert from 'assert';
import path from 'path';
import Promise from 'bluebird';

import DataChannel from './DataChannel';
import BaseCollection from './BaseCollection';
import DataEvent from '../events/DataEvent';
import Time from '../quantities/Time';
import Voltage from '../quantities/Voltage';
import JsonIO from './io/JsonIO';

class DataSet extends BaseCollection {
    constructor(channels, title = undefined) {
        super(channels, DataChannel);
        this.title = title;
    }

    loadJson(filepath, title = undefined) {
        let _self = this;
        _self.title = title || path.basename(filepath, '.json');
        return JsonIO.readFile(filepath)
            .then(function (data) {
                return _self.fromObject(data);
            });
    }

    fromObject(data, title = undefined) {
        assert(Array.isArray(data));

        let _self = this;
        _self.title = title || _self.title;

        return Promise.map(data, function (group) {
            return Promise.map(group.units, function (unit) {
                let channel = new DataChannel();

                return Promise.map(unit.spiketrains, function (sptr) {
                    assert(Array.isArray(sptr.times) && Array.isArray(sptr.waveforms));
                    assert(sptr.times.length === sptr.waveforms.length);

                    return Promise.map(sptr.waveforms, function (wf, i) {
                        let val_diff = wf.max - wf.min,
                            event = new DataEvent(
                                new Time(sptr.times[i], 's'),
                                new Voltage(val_diff, 'mv')
                            );
                        channel.push(event);
                    });
                })
                    .then(function () {
                        _self.push(channel);
                    });
            });
        });
    }

    evaluateRuleSets() {
        let _self = this;
        return Promise.each(_self.all, function (channel) {
            return channel.evaluateRuleSet()
                .then(function (res) {
                    // TODO: handle errors and stats later on
                    channel = res[res.length - 1].results;
                });
        });
    }
}

export default DataSet;
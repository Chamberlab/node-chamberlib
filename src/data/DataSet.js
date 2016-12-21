import assert from 'assert';
import Promise from 'bluebird';

import DataChannel from './DataChannel';
import BaseCollection from './BaseCollection';
import DataEvent from '../events/DataEvent';
import Time from '../quantities/Time';
import Voltage from '../quantities/Voltage';
import JsonIO from '../io/JsonIO';

class DataSet extends BaseCollection {
    constructor(channels) {
        super(channels, DataChannel);
    }

    loadJson(filepath) {
        let _self = this;
        return JsonIO.readFile(filepath)
            .then(function (data) {
                return _self.initWithObject(data);
            });
    }

    initWithObject(data) {
        assert(Array.isArray(data));

        let _self = this;

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
}

export default DataSet;
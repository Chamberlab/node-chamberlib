import assert from 'assert';
import Promise from 'bluebird';

import DataEvent from '../../../events/DataEvent';
import Time from '../../../quantities/Time';
import Voltage from '../../../quantities/Voltage';
import DataChannel from '../../DataChannel';

class SpiketrainsOE {
    static parse(data) {
        assert(Array.isArray(data));
        let channels = [];

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
                    channels.push(channel);
                });
            });
        })
        .then(function () {
            return channels;
        });
    }
}

export default SpiketrainsOE;
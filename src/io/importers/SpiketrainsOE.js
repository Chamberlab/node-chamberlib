import assert from 'assert';
import Promise from 'bluebird';
import Qty from 'js-quantities';

import JSONFile from '../file/JSONFile';
import DataEvent from '../../events/DataEvent';
import DataChannel from '../../data/DataChannel';

class SpiketrainsOE extends JSONFile {
    constructor() {
        super();
    }

    read(file) {
        return super.read(file)
            .then((data) => {
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
                                        Qty(sptr.times[i], 's'),
                                        Qty(val_diff, 'mV')
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
            });
    }
}

export default SpiketrainsOE;
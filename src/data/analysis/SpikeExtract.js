import DataEvent from '../../events/DataEvent';
import SpikeEvent from '../../events/SpikeEvent';

class SpikeExtract {
    constructor(channels = 1, threshold = 0.5, selectChannels = undefined) {
        this._channels = channels;
        this._threshold = threshold;
        this._selectChannels = selectChannels;
        // extract from min to next min, save duration, peak point, channel info

        this._spikes = [];
        this._openSpikes = [];

        for (let i = 0; i < channels; i += 1) {
            this._spikes.push([]);
            this._openSpikes.push(null);
        }
    }

    get spikes() {
        return this._spikes;
    }

    evaluate(event, channel = undefined) {
        const values = new Float32Array(this._channels);
        if (event.constructor.name === 'DataFrame') {
            event.value.forEach((val, i) => {
                values[i] = val;
            });
        } else if (event.constructor.name === 'DataEvent') {
            if (channel === undefined) {
                values[0] = event.value;
            }
        }
        values.forEach((val, i) => {
            if (Array.isArray(this._selectChannels) && this._selectChannels.indexOf(i) === -1) {
                return;
            }
            if (val >= this._threshold) {
                const evt = new DataEvent(event.time, `${val} mV`);
                if (this._openSpikes[i] === null) {
                    this._openSpikes[i] = [evt];
                } else {
                    this._openSpikes[i].push(evt);
                }
            } else {
                if (Array.isArray(this._openSpikes[i])) {
                    this._spikes[i].push(new SpikeEvent(this._openSpikes[i][0].time, this._openSpikes[i]));
                    this._openSpikes[i] = null;
                }
            }
        });
        return new Promise(resolve => resolve(event));
    }
}

export default SpikeExtract;
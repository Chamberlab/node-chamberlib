import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';
import SpikeEvent from '../../events/SpikeEvent';

class SpikeExtract {
    constructor(channels = 1, threshold = 0.5, skip = 0) {
        this._channels = channels;
        this._threshold = threshold;
        this._skip = skip;
        // extract from min to next min, save duration, peak point, channel info

        this._spikes = [];
        this._openSpikes = [];

        for (let i = this._skip; i < channels; i += 1) {
            this._spikes.push([]);
            this._openSpikes.push(null);
        }

        this._currentSpike = null;
        this._valueHistory = [];
    }

    get spikes() {
        return this._spikes;
    }

    evaluate(event, channel = undefined) {
        const values = new Float32Array(this._channels);
        if (event.constructor.name === 'DataFrame') {
            event.value.forEach((val, i) => {
                if (i >= this._skip) {
                    values[i - this._skip] = val;
                }
            });
        } else if (event.constructor.name === 'DataEvent') {
            if (channel === undefined) {
                values[0] = event.value;
            }
        }
        values.forEach((val, i) => {
            if (i >= this._skip) {
                return;
            }
            if (val >= this._threshold) {
                const evt = new DataEvent(event.time, `${val} mV`);
                if (this._openSpikes[i - this._skip] === null) {
                    this._openSpikes[i - this._skip] = [evt];
                } else {
                    this._openSpikes[i - this._skip].push(evt);
                }
            } else {
                if (Array.isArray(this._openSpikes[i- this._skip])) {
                    this._spikes[i - this._skip].push(new SpikeEvent(this._openSpikes[i - this._skip][0].time,
                        this._openSpikes[i - this._skip]));
                    this._openSpikes[i - this._skip] = null;
                }
            }
        });
        return new Promise(resolve => resolve(event));
    }
}

export default SpikeExtract;
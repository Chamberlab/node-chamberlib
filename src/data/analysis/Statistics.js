import Qty from 'js-quantities';
import assert from 'assert';

class Statistics {
    constructor(channels) {
        this._stats = new Array(channels).fill(null);
        this._stats = this._stats.map(() => {
            return {
                min: Qty(Number.MAX_SAFE_INTEGER, 'mV'),
                max: Qty(Number.MIN_SAFE_INTEGER, 'mV')
            };
        });
    }

    evaluate(data, channel = undefined) {
        assert(typeof data !== 'undefined');

        const _self = this;

        function recordValue(val, channel) {
            const qty = typeof val === 'object' && val.constructor.name === 'Qty' ? val : Qty(val, 'mV');
            if (qty.gt(_self._stats[channel].max)) {
                _self._stats[channel].max = Qty(qty);
            }
            if (qty.lt(_self._stats[channel].min)) {
                _self._stats[channel].min = Qty(qty);
            }
        }

        if (data.constructor.name === 'DataFrame') {
            data.value.forEach((val, i) => {
                recordValue(val, i);
            });
        } else if (data.constructor.name === 'DataEvent') {
            assert(typeof channel === 'number');
            recordValue(data.value, channel);
        } else {
            throw new Error(`Unsupported type: ${data.constructor.name}`);
        }
    }

    get stats() {
        return this._stats;
    }
}

export default Statistics;
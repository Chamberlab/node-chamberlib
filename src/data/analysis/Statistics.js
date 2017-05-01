import Qty from 'js-quantities';
import assert from 'assert';

class Statistics {
    constructor(channels) {
        this._stats = new Array(channels).fill(null);
        this._stats = this._stats.map(() => {
            return {
                min: Qty(Number.MAX_SAFE_INTEGER, 'mV'),
                max: Qty(Number.MIN_SAFE_INTEGER, 'mV'),
                sum: Qty(0.0, 'mV'),
                sum_pos: Qty(0.0, 'mV'),
                sum_neg: Qty(0.0, 'mV'),
                values: 0,
                values_pos: 0,
                values_neg: 0,
                avg: Qty(0.0, 'mV'),
                avg_pos: Qty(0.0, 'mV'),
                avg_neg: Qty(0.0, 'mV'),
            };
        });
    }

    evaluate(data, channel = undefined) {
        assert(typeof data !== 'undefined');

        const _self = this;

        function recordValue(val, channel) {
            const qty = typeof val === 'object' && val.constructor.name === 'Qty' ? val : Qty(val, 'mV');
            _self._stats[channel].sum.add(qty);
            _self._stats[channel].values += 1;
            if (qty.gt(Qty(0.0, 'mV'))) {
                _self._stats[channel].sum_pos.add(qty);
                _self._stats[channel].values_pos += 1;
            } else if (qty.lt(Qty(0.0, 'mV'))) {
                _self._stats[channel].sum_neg.sub(qty);
                _self._stats[channel].values_neg += 1;
            }
            if (qty.gt(_self._stats[channel].max)) {
                _self._stats[channel].max = Qty(qty);
            }
            if (qty.lt(_self._stats[channel].min)) {
                _self._stats[channel].min = Qty(qty);
            }

            if (_self._stats[channel].sum.scalar !== 0.0) {
                _self._stats[channel].avg = _self._stats[channel].sum
                    .div(Qty(_self._stats[channel].values, 'mV'));
            }
            if (_self._stats[channel].sum_pos.scalar !== 0.0) {
                _self._stats[channel].avg_pos = _self._stats[channel].sum_pos
                    .div(Qty(_self._stats[channel].values_pos, 'mV'));
            }
            if (_self._stats[channel].sum_neg.scalar !== 0.0) {
                _self._stats[channel].avg_neg = _self._stats[channel].sum_neg
                    .div(Qty(_self._stats[channel].values_neg, 'mV')).mul(Qty(-1.0, 'mV'));
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
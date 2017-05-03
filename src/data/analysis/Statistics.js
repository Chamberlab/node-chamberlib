import Qty from 'js-quantities';
import assert from 'assert';

class Statistics {
    constructor(channels) {
        this._channels = channels;
        this._stats = new Array(channels).fill(null);
        this._stats = this._stats.map(() => {
            return {
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER,
                sum: 0.0,
                sum_pos: 0.0,
                sum_neg: 0.0,
                values: 0,
                values_pos: 0,
                values_neg: 0,
                avg: 0.0,
                avg_pos: 0.0,
                avg_neg: 0.0,
                distribution: {}
            };
        });
    }

    evaluate(data, channel = undefined) {
        assert(typeof data !== 'undefined');

        const _self = this;

        function recordValue(val, channel) {
            const qty = typeof val === 'object' && val.constructor.name === 'Qty' ? val.scalar : val,
                distVal = (parseFloat((qty * 2.0).toFixed(1)) * 0.5).toFixed(2);
            if (typeof _self._stats[channel].distribution[distVal] !== 'number') {
                _self._stats[channel].distribution[distVal] = 0;
            }
            _self._stats[channel].distribution[distVal] += 1;
            _self._stats[channel].sum += qty;
            _self._stats[channel].values += 1;
            if (qty > 0.0) {
                _self._stats[channel].sum_pos += qty;
                _self._stats[channel].values_pos += 1;
            } else if (qty < 0.0) {
                _self._stats[channel].sum_neg -= qty;
                _self._stats[channel].values_neg += 1;
            }
            if (qty > _self._stats[channel].max) {
                _self._stats[channel].max = qty;
            }
            if (qty < _self._stats[channel].min) {
                _self._stats[channel].min = qty;
            }

            if (_self._stats[channel].values !== 0) {
                _self._stats[channel].avg = _self._stats[channel].sum / _self._stats[channel].values;
            }
            if (_self._stats[channel].values_pos !== 0) {
                _self._stats[channel].avg_pos = _self._stats[channel].sum_pos / _self._stats[channel].values_pos;
            }
            if (_self._stats[channel].values_neg !== 0) {
                _self._stats[channel].avg_neg = _self._stats[channel].sum_neg / _self._stats[channel].values_neg;
            }
        }

        if (data.constructor.name === 'DataFrame') {
            data.value.forEach((val, i) => {
                // TODO: skip channel needs to be configurable
                if (i > 0) {
                    recordValue(val, i);
                }
            });
        } else if (data.constructor.name === 'DataEvent') {
            assert(typeof channel === 'number');
            recordValue(data.value, channel);
        } else {
            throw new Error(`Unsupported type: ${data.constructor.name}`);
        }
    }

    get stats() {
        return this._stats.map((stats) => {
            const distribution = Object.keys(stats.distribution).map(range => {
                return {range: Qty(parseFloat(range), 'mV'), count: stats.distribution[range]};
            });
            distribution.sort((a, b) => {
                if (a.range < b.range) {
                    return 1;
                } else if (a.range > b.range) {
                    return -1;
                }
                return 0;
            });
            return {
                min: Qty(stats.min, 'mV'),
                max: Qty(stats.max, 'mV'),
                avg: Qty(stats.avg, 'mV'),
                avg_pos: Qty(stats.avg_pos, 'mV'),
                avg_neg: Qty(stats.avg_neg, 'mV'),
                distribution: distribution
            };
        });
    }
}

export default Statistics;
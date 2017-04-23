import Qty from 'js-quantities';

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

    evaluate(frame) {
        frame.value.forEach((val, i) => {
            const qty = Qty(val, 'mV');
            if (qty.gt(this._stats[i].max)) {
                this._stats[i].max = Qty(qty);
            }
            if (qty.lt(this._stats[i].min)) {
                this._stats[i].min = Qty(qty);
            }
        });
    }

    get stats() {
        return this._stats;
    }
}

export default Statistics;
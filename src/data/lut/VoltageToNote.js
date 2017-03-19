import Qty from 'js-quantities';

import BaseLUT from './BaseLUT';
import harmonics from '../../harmonics';

class VoltageToNote extends BaseLUT {
    constructor() {
        super();

        this._data = {};

        this._scale = new harmonics.Scale('C', 'major');
        this._min = Qty(-1.0, 'mV');
        this._max = Qty(1.0, 'mV');
        this._res = (this._max.scalar - this._min.scalar) / this._scale.notes.length;

        this.generate();
    }

    generate() {
        // FIXME: f***in rounding errors...

        this._data = {};

        let idx;
        for (let i = this._min.scalar; i < this._max.scalar; i += this._res) {
            idx = Math.floor((i - this._min.scalar) / this._res);
            if (idx < this._scale.notes.length) {
                this._data[(idx * this._res + this._min.scalar).toFixed(3)] =
                    new harmonics.Note(this._scale.notes[idx].key);
            }
        }

        return this;
    }

    query(val) {
        let mv = Qty(val).to('mV'),
            idx = Math.min(this._max.scalar, Math.max(this._min.scalar, mv.scalar)) / this._res;

        return this._data[idx.toFixed(3)];
    }
}

export default VoltageToNote;
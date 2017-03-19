import assert from 'assert';
import Qty from 'js-quantities';

import BaseCollection from '../data/BaseCollection';
import BaseEvent from '../events/BaseEvent';

class DataChannel extends BaseCollection {
    constructor(events, title = undefined, uuid = undefined) {
        super(events, BaseEvent, uuid);

        if (title) {
            this.title = title;
        }
    }

    get stats() {
        let s = {
            avg: 0.0, duration: 0.0, items: 0,
            time: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
            value: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER }
        };
        this._items.map(function (item) {
            let time = item.time,
                value = item.value;

            s.avg += value.scalar;
            s.items++;

            if (time < s.time.min) {
                s.time.min = time.scalar;
            } else if (time > s.time.max) {
                s.time.max = time.scalar;
            }

            if (value < s.value.min) {
                s.value.min = value.scalar;
            } else if (value > s.value.max) {
                s.value.max = value.scalar;
            }
        });

        s.avg = s.avg / s.items;
        s.duration = Qty(s.time.max - s.time.min, 's');
        s.time.min = Qty(s.time.min, 's');
        s.time.max = Qty(s.time.max, 's');
        s.value.min = Qty(s.value.min, 'mV');
        s.value.max = Qty(s.value.max, 'mV');

        return s;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        assert(typeof val === 'string');
        this._title = val;
    }
}

export default DataChannel;
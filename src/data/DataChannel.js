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
            avg: Qty(0.0, 'mV'), duration: Qty(0.0, 's'), items: 0,
            time: { min: Qty(Number.MAX_SAFE_INTEGER, 's'), max: Qty(Number.MIN_SAFE_INTEGER, 's') },
            value: { min: Qty(Number.MAX_SAFE_INTEGER, 'mV'), max: Qty(Number.MIN_SAFE_INTEGER, 'mV') }
        };
        this._items.map(function (item) {
            let time = item.time,
                value = item.value;

            s.avg = s.avg.add(value);
            s.items++;

            if (time.lt(s.time.min)) {
                s.time.min = time;
            } else if (time.gt(s.time.max)) {
                s.time.max = time;
            }

            if (value.lt(s.value.min)) {
                s.value.min = value;
            } else if (value.gt(s.value.max)) {
                s.value.max = value;
            }
        });

        s.avg = s.items > 0 ? Qty(s.avg.scalar / s.items, 'mV') : Qty(0, 'mV');
        s.duration = s.time.max.sub(s.time.min);
        //s.time.min = Qty(s.time.min, 's');
        //s.time.max = Qty(s.time.max, 's');
        //s.value.min = Qty(s.value.min, 'mV');
        //s.value.max = Qty(s.value.max, 'mV');

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
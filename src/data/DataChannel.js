import assert from 'assert';

import BaseCollection from '../data/BaseCollection';
import BaseEvent from '../events/BaseEvent';
import Time from '../quantities/Time';
import Voltage from '../quantities/Voltage';

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
            let time = item.time.normalized(),
                value = item.value.normalized();

            s.avg += value;
            s.items++;

            if (time < s.time.min) {
                s.time.min = time;
            } else if (time > s.time.max) {
                s.time.max = time;
            }

            if (value < s.value.min) {
                s.value.min = value;
            } else if (value > s.value.max) {
                s.value.max = value;
            }
        });

        s.avg = s.avg / s.items;
        s.duration = new Time(s.time.max - s.time.min);
        s.time.min = new Time(s.time.min);
        s.time.max = new Time(s.time.max);
        s.value.min = new Voltage(s.value.min);
        s.value.max = new Voltage(s.value.max);

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
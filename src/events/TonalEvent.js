import assert from 'assert';
import Qty from 'js-quantities';

import BaseEvent from './BaseEvent';
import Note from '../harmonics/Note';
import Chord from '../harmonics/Chord';

class TonalEvent extends BaseEvent {
    constructor(time, value, duration) {
        super(time, value);

        this.time = time;
        this.value = value;
        this.duration = duration;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        assert(value instanceof Note || value instanceof Chord, `TonalEvent value must be Note or Chord, is ${typeof value}`);

        this._value = value;
    }


    get duration() {
        return this._duration;
    }

    set duration(value) {
        assert(value instanceof Qty ||
            typeof value === 'string', `Duration value must be Qty or string, is ${typeof value}`);

        this._duration = value;
    }
}

export default TonalEvent;
import assert from 'assert';
import BaseEvent from './BaseEvent';

class SpikeEvent extends BaseEvent {
    constructor(time, value) {
        super(time, value);

        this.time = time;
        this.value = value;
    }

    set value(value) {
        assert(Array.isArray(value), 'SpikeEvent value must be Array');

        this._value = value.sort((a, b) => {
            if (a.time.gt(b.time)) {
                return 1;
            } else if (a.time.lt(b.time)) {
                return -1;
            }
            return 0;
        });
    }

    get value() {
        return this._value;
    }

    get peak() {
        if (!Array.isArray(this.value) || this.value.length === 0) {
            return null;
        }
        let peakEvent = this.value[0];
        this.value.forEach(evt => {
            if (evt.value.gt(peakEvent.value)) {
                peakEvent = evt;
            }
        });
        return peakEvent;
    }

    get duration() {
        if (!Array.isArray(this.value) || this.value.length === 0) {
            return null;
        }
        return this.value[this.value.length - 1].time.sub(this.value[0].time);
    }

    toObject() {
        // TODO: time & value toObject?
        return {t: this.time, v: this.value};
    }
}

export default SpikeEvent;
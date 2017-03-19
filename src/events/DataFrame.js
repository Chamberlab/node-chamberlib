import assert from 'assert';
import BaseEvent from './BaseEvent';

class DataFrame extends BaseEvent {
    constructor(time, value) {
        super(time, value);

        this.time = time;
        this.value = value;
    }


    set value(value) {
        assert(value instanceof Float32Array || value instanceof Float32Array ||
            value instanceof Uint8Array || value instanceof Int16Array || value instanceof Int32Array,
            'Data frame Value must be TypedArray');

        this._value = value;
    }

    get value() {
        return this._value;
    }


    toObject() {
        return { t: this.time, v: this.value };
    }
}

export default DataFrame;
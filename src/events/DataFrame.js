import BaseEvent from './BaseEvent';

class DataFrame extends BaseEvent {
    constructor(time, value) {
        super(time, value, [Float64Array, Float32Array, Int32Array, Uint8Array]);

        this.time = time;
        this.value = value;
    }

    toObject() {
        return { t: this.time.normalized(), v: this.value.normalized() };
    }
}

export default DataFrame;
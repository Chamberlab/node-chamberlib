import BaseEvent from './BaseEvent';

class DataEvent extends BaseEvent {
    constructor(time, value) {
        super(time, value);

        this.time = time;
        this.value = value;
    }

    toObject() {
        return { t: this.time, v: this.value };
    }
}

export default DataEvent;
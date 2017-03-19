import assert from 'assert';
import Qty from 'js-quantities';

class BaseEvent {
    constructor(time, value) {
        this.time = time;
        this.value = value;
    }


    get parentUUID() {
        return this._parentUUID;
    }

    set parentUUID(uuid) {
        assert(typeof uuid === 'string');

        this._parentUUID = uuid;
    }


    set time(time) {
        assert(time instanceof Qty ||
            typeof time === 'string', `Time value must be Qty or string, is ${typeof time}`);

        this._time = Qty(time);
    }

    get time() {
        return this._time;
    }


    set value(value) {
        assert(value instanceof Qty ||
            typeof value === 'string', `Value value must be Qty or string, is ${typeof value}`);

        this._value = Qty(value);
    }

    get value() {
        return this._value;
    }
}

export default BaseEvent;
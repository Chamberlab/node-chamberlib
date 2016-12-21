import assert from 'assert';
import Time from '../quantities/Time';

class BaseEvent {
    constructor(time, value, dataClasses = []) {
        this._dataClasses = dataClasses;

        this.time = time;
        this.value = value;
    }


    set time(time) {
        assert(time !== undefined);
        assert(time instanceof Time);
        this._time = time;
    }

    get time() {
        return this._time;
    }


    set value(value) {
        if (this._dataClasses.length > 0) {
            let classAllowed = false;
            for (let dc of this._dataClasses) {
                if (value.constructor.name === dc.name) {
                    classAllowed = true;
                }
            }
            assert(classAllowed, `Invalid class: ${value.constructor.name} - ` +
                `Allowed: ${this._dataClasses.map((cl) => { return cl.name; }).join(',')}`);
        }
        this._value = value;
    }

    get value() {
        return this._value;
    }
}

export default BaseEvent;
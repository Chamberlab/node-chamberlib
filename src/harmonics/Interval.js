import assert from 'assert';
import * as tonal from 'tonal';

class Interval {
    constructor(name) {
        this.name = name;
    }


    get name() {
        return this._name;
    }

    set name(name) {
        assert(typeof name === 'string', `Interval name should be string, is ${typeof name}`);

        this._name = name;
    }


    get semitones() {
        return tonal.ivl.semitones(this.name);
    }


    toString() {
        return this.name;
    }
}

export default Interval;
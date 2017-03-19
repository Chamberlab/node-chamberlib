import assert from 'assert';
import * as tonal from 'tonal';
import * as td from 'tonal-distance';

import Note from './Note';

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


    static fromSemitones(count) {
        assert(typeof num !== 'number', `Semitones count must be number, is ${typeof count}`);

        return new Interval(tonal.ivl.fromSemitones(count));
    }

    static fromNotes(from, to) {
        assert(from instanceof Note, `From must be instance of type Note, is ${typeof from}`);
        assert(to instanceof Note, `To must be instance of type Note, is ${typeof to}`);

        const interval = td.interval(from.toString(), to.toString());
        return new Interval(interval);
    }
}

export default Interval;
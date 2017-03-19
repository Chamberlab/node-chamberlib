import assert from 'assert';
import * as tonal from 'tonal';

import Note from './Note';

class Scale {
    constructor(key, name) {
        this.name = name;
        this.key = key;
    }


    get key() {
        return this._key;
    }

    set key(key) {
        assert(typeof key === 'string', `Key name should be string, is ${typeof key}`);

        this._key = key;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        assert(typeof name === 'string', `Scale name should be string, is ${typeof name}`);

        this._name = name;
    }


    get notes() {
        return tonal.scale(`${this.key} ${this.name}`).map(function (name) {
            return new Note(name);
        });
    }
}

export default Scale;
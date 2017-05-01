import assert from 'assert';
import * as tonal from 'tonal';

import Note from './Note';

class Scale {
    constructor(key, name) {
        this.key = key;
        this.name = name;
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
        const data = tonal.scale.get(this.name, this.key);
        return data.map((name) => {
            return new Note(name);
        });
    }
}

export default Scale;
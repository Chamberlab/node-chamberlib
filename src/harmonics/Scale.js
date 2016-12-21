'use strict';

import assert from 'assert';
import * as tonal from 'tonal';

import Note from './Note';

class Scale {
    constructor(name, key = undefined) {
        this.name = name;
        this.key = key;
    }


    get name() {
        return this._name;
    }

    set name(name) {
        assert(typeof value === 'string');
        // TODO: validate string content
        this._name = name;
    }


    get notes() {
        return tonal.scale(this.name).map(function (name) {
            return new Note(name);
        });
    }
}

export default Scale;
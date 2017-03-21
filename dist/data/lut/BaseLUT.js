"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
class BaseLUT {
    constructor() {}

    generate() {
        this._data = {};
        return this;
    }

    query(key) {
        return this._data[key];
    }
}

exports.default = BaseLUT;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseEvent = require('./BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataFrame extends _BaseEvent2.default {
    constructor(time, value) {
        super(time, value);

        this.time = time;
        this.value = value;
    }

    set value(value) {
        (0, _assert2.default)(value instanceof Float32Array || value instanceof Float32Array || value instanceof Uint8Array || value instanceof Int16Array || value instanceof Int32Array, 'Data frame Value must be TypedArray');

        this._value = value;
    }

    get value() {
        return this._value;
    }

    toObject() {
        return { t: this.time, v: this.value };
    }
}

exports.default = DataFrame;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseEvent = require('./BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpikeEvent extends _BaseEvent2.default {
    constructor(time, value) {
        super(time, value);

        this.time = time;
        this.value = value;
    }

    set value(value) {
        (0, _assert2.default)(Array.isArray(value), 'SpikeEvent value must be Array');

        this._value = value.sort((a, b) => {
            if (a.time.gt(b.time)) {
                return 1;
            } else if (a.time.lt(b.time)) {
                return -1;
            }
            return 0;
        });
    }

    get value() {
        return this._value;
    }

    get peak() {
        if (!Array.isArray(this.value) || this.value.length === 0) {
            return null;
        }
        let peakEvent = this.value[0];
        this.value.forEach(evt => {
            if (evt.value.gt(peakEvent.value)) {
                peakEvent = evt;
            }
        });
        return peakEvent;
    }

    get duration() {
        if (!Array.isArray(this.value) || this.value.length === 0) {
            return null;
        }
        return this.value[this.value.length - 1].time.sub(this.value[0].time);
    }

    toObject() {
        // TODO: time & value toObject?
        return { t: this.time, v: this.value };
    }
}

exports.default = SpikeEvent;
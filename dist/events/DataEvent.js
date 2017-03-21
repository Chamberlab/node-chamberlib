'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseEvent = require('./BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataEvent extends _BaseEvent2.default {
    constructor(time, value) {
        super(time, value);

        this.time = time;
        this.value = value;
    }

    toObject() {
        // TODO: time & value toObject?
        return { t: this.time, v: this.value };
    }
}

exports.default = DataEvent;
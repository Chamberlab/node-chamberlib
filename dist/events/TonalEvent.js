'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _BaseEvent = require('./BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

var _Note = require('../harmonics/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Chord = require('../harmonics/Chord');

var _Chord2 = _interopRequireDefault(_Chord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TonalEvent extends _BaseEvent2.default {
    constructor(time, value, duration) {
        super(time, value);

        this.time = time;
        this.value = value;
        this.duration = duration;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        (0, _assert2.default)(value instanceof _Note2.default || value instanceof _Chord2.default, `TonalEvent value must be Note or Chord, is ${typeof value}`);

        this._value = value;
    }

    get duration() {
        return this._duration;
    }

    set duration(value) {
        (0, _assert2.default)(value instanceof _jsQuantities2.default || typeof value === 'string', `Duration value must be Qty or string, is ${typeof value}`);

        this._duration = value;
    }
}

exports.default = TonalEvent;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _BaseCollection = require('../data/BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _BaseEvent = require('../events/BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataChannel extends _BaseCollection2.default {
    constructor(events, title = undefined, uuid = undefined) {
        super(events, _BaseEvent2.default, uuid);

        if (title) {
            this.title = title;
        }
    }

    get stats() {
        let s = {
            avg: 0.0, duration: 0.0, items: 0,
            time: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER },
            value: { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER }
        };
        this._items.map(function (item) {
            let time = item.time,
                value = item.value;

            s.avg += value.scalar;
            s.items++;

            if (time < s.time.min) {
                s.time.min = time.scalar;
            } else if (time > s.time.max) {
                s.time.max = time.scalar;
            }

            if (value < s.value.min) {
                s.value.min = value.scalar;
            } else if (value > s.value.max) {
                s.value.max = value.scalar;
            }
        });

        s.avg = s.avg / s.items;
        s.duration = (0, _jsQuantities2.default)(s.time.max - s.time.min, 's');
        s.time.min = (0, _jsQuantities2.default)(s.time.min, 's');
        s.time.max = (0, _jsQuantities2.default)(s.time.max, 's');
        s.value.min = (0, _jsQuantities2.default)(s.value.min, 'mV');
        s.value.max = (0, _jsQuantities2.default)(s.value.max, 'mV');

        return s;
    }

    get title() {
        return this._title;
    }

    set title(val) {
        (0, _assert2.default)(typeof val === 'string');
        this._title = val;
    }
}

exports.default = DataChannel;
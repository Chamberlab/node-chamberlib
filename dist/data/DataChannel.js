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
            avg: (0, _jsQuantities2.default)(0.0, 'mV'), duration: (0, _jsQuantities2.default)(0.0, 's'), items: 0,
            time: { min: (0, _jsQuantities2.default)(Number.MAX_SAFE_INTEGER, 's'), max: (0, _jsQuantities2.default)(Number.MIN_SAFE_INTEGER, 's') },
            value: { min: (0, _jsQuantities2.default)(Number.MAX_SAFE_INTEGER, 'mV'), max: (0, _jsQuantities2.default)(Number.MIN_SAFE_INTEGER, 'mV') }
        };
        this._items.map(function (item) {
            let time = item.time,
                value = item.value;

            s.avg = s.avg.add(value);
            s.items++;

            if (time.lt(s.time.min)) {
                s.time.min = time;
            } else if (time.gt(s.time.max)) {
                s.time.max = time;
            }

            if (value.lt(s.value.min)) {
                s.value.min = value;
            } else if (value.gt(s.value.max)) {
                s.value.max = value;
            }
        });

        s.avg = s.items > 0 ? (0, _jsQuantities2.default)(s.avg.scalar / s.items, 'mV') : (0, _jsQuantities2.default)(0, 'mV');
        s.duration = s.time.max.sub(s.time.min);
        //s.time.min = Qty(s.time.min, 's');
        //s.time.max = Qty(s.time.max, 's');
        //s.value.min = Qty(s.value.min, 'mV');
        //s.value.max = Qty(s.value.max, 'mV');

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
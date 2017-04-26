'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Statistics {
    constructor(channels) {
        this._stats = new Array(channels).fill(null);
        this._stats = this._stats.map(() => {
            return {
                min: (0, _jsQuantities2.default)(Number.MAX_SAFE_INTEGER, 'mV'),
                max: (0, _jsQuantities2.default)(Number.MIN_SAFE_INTEGER, 'mV')
            };
        });
    }

    evaluate(data, channel = undefined) {
        (0, _assert2.default)(typeof data !== 'undefined');

        const _self = this;

        function recordValue(val, channel) {
            const qty = typeof val === 'object' && val.constructor.name === 'Qty' ? val : (0, _jsQuantities2.default)(val, 'mV');
            if (qty.gt(_self._stats[channel].max)) {
                _self._stats[channel].max = (0, _jsQuantities2.default)(qty);
            }
            if (qty.lt(_self._stats[channel].min)) {
                _self._stats[channel].min = (0, _jsQuantities2.default)(qty);
            }
        }

        if (data.constructor.name === 'DataFrame') {
            data.value.forEach((val, i) => {
                recordValue(val, i);
            });
        } else if (data.constructor.name === 'DataEvent') {
            (0, _assert2.default)(typeof channel === 'number');
            recordValue(data.value, channel);
        } else {
            throw new Error(`Unsupported type: ${data.constructor.name}`);
        }
    }

    get stats() {
        return this._stats;
    }
}

exports.default = Statistics;
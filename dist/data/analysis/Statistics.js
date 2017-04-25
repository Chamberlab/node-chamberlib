'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

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

    evaluate(frame) {
        frame.value.forEach((val, i) => {
            const qty = (0, _jsQuantities2.default)(val, 'mV');
            if (qty.gt(this._stats[i].max)) {
                this._stats[i].max = (0, _jsQuantities2.default)(qty);
            }
            if (qty.lt(this._stats[i].min)) {
                this._stats[i].min = (0, _jsQuantities2.default)(qty);
            }
        });
    }

    get stats() {
        return this._stats;
    }
}

exports.default = Statistics;
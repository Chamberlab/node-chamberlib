'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _BaseLUT = require('./BaseLUT');

var _BaseLUT2 = _interopRequireDefault(_BaseLUT);

var _harmonics = require('../../harmonics');

var _harmonics2 = _interopRequireDefault(_harmonics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class VoltageToNote extends _BaseLUT2.default {
    constructor() {
        super();

        this._data = {};

        this._scale = new _harmonics2.default.Scale('C', 'major');
        this._min = (0, _jsQuantities2.default)(-1.0, 'mV');
        this._max = (0, _jsQuantities2.default)(1.0, 'mV');
        this._res = (this._max.scalar - this._min.scalar) / this._scale.notes.length;

        this.generate();
    }

    generate() {
        // FIXME: f***in rounding errors...

        this._data = {};

        let idx;
        for (let i = this._min.scalar; i < this._max.scalar; i += this._res) {
            idx = Math.floor((i - this._min.scalar) / this._res);
            if (idx < this._scale.notes.length) {
                this._data[(idx * this._res + this._min.scalar).toFixed(3)] = new _harmonics2.default.Note(this._scale.notes[idx].key);
            }
        }

        return this;
    }

    query(val) {
        let mv = (0, _jsQuantities2.default)(val).to('mV'),
            idx = Math.min(this._max.scalar, Math.max(this._min.scalar, mv.scalar)) / this._res;

        return this._data[idx.toFixed(3)];
    }
}

exports.default = VoltageToNote;
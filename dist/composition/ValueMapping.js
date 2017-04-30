'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseLUT = require('../data/lut/BaseLUT');

var _BaseLUT2 = _interopRequireDefault(_BaseLUT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ValueMapping {
    constructor(lut) {
        // lower spike half mapped to scale, upper shifts system, maps to specific chords or rules
        this.lut = lut;
    }

    get lut() {
        return this._lut;
    }

    set lut(val) {
        (0, _assert2.default)(val instanceof _BaseLUT2.default, `Lookup table must be of type BaseLUT, is ${typeof val}`);
    }

    dataToTonal(dataEvents) {
        return dataEvents.map(event => {
            return event;
        });
    }
}

exports.default = ValueMapping;
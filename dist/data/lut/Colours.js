'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _levenshtein = require('levenshtein');

var _levenshtein2 = _interopRequireDefault(_levenshtein);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Colours {
    constructor(size, minDistance, minSum = 255, allowRepetitions = false) {
        const chance = new _chance2.default();

        this._colours = [];

        while (this._colours.length < size) {
            let min_d = 255,
                c = chance.color({ format: 'rgb' }),
                cp = c.split(','),
                csum = parseInt(cp[0].replace('rgb(', '')) + parseInt(cp[1]) + parseInt(cp[2].replace('(', ''));

            if (csum < minSum) {
                continue;
            }

            for (let cl of this._colours) {
                let lev = new _levenshtein2.default(c.toString(), cl);
                if (lev.distance < min_d) {
                    min_d = lev.distance;
                }
            }

            if (allowRepetitions || min_d > minDistance) {
                this._colours.push(c.toString());
            }
        }
    }

    get colours() {
        return this._colours;
    }
}

exports.default = Colours;
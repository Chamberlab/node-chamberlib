'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tonalKey = require('tonal-key');

var tkey = _interopRequireWildcard(_tonalKey);

var _Scale = require('./Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

class CircleOfScales {
    constructor(octave = 1) {
        this._currentKey = tkey.fromAlter(0);
        this._octave = octave;
        this._rotation = 0;
    }

    rotate(steps = 1) {
        this._currentKey = tkey.fromAlter(Math.min(6, Math.max(-6, steps)));
        this._rotation = steps;
    }

    get key() {
        return this._currentKey;
    }

    get scale() {
        return new _Scale2.default(this.tonic.toString(), this.mode);
    }

    get tonic() {
        return new _Note2.default(tkey.props(this._currentKey).tonic, this.octave);
    }

    get mode() {
        return tkey.props(this._currentKey).mode;
    }

    get octave() {
        return this._octave;
    }

    set octave(octave) {
        this._octave = octave;
    }

    get coordinates() {
        return { r: this._rotation };
    }
}

exports.default = CircleOfScales;
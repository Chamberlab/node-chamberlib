'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _tonalDistance = require('tonal-distance');

var td = _interopRequireWildcard(_tonalDistance);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Interval {
    constructor(name) {
        this.name = name;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        (0, _assert2.default)(typeof name === 'string', `Interval name should be string, is ${typeof name}`);

        this._name = name;
    }

    get semitones() {
        return tonal.ivl.semitones(this.name);
    }

    toString() {
        return this.name;
    }

    static fromSemitones(count) {
        (0, _assert2.default)(typeof num !== 'number', `Semitones count must be number, is ${typeof count}`);

        return new Interval(tonal.ivl.fromSemitones(count));
    }

    static fromNotes(from, to) {
        (0, _assert2.default)(from instanceof _Note2.default, `From must be instance of type Note, is ${typeof from}`);
        (0, _assert2.default)(to instanceof _Note2.default, `To must be instance of type Note, is ${typeof to}`);

        const interval = td.interval(from.toString(), to.toString());
        return new Interval(interval);
    }
}

exports.default = Interval;
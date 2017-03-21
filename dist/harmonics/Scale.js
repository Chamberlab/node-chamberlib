'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Scale {
    constructor(key, name) {
        this.name = name;
        this.key = key;
    }

    get key() {
        return this._key;
    }

    set key(key) {
        (0, _assert2.default)(typeof key === 'string', `Key name should be string, is ${typeof key}`);

        this._key = key;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        (0, _assert2.default)(typeof name === 'string', `Scale name should be string, is ${typeof name}`);

        this._name = name;
    }

    get notes() {
        return tonal.scale(`${this.key} ${this.name}`).map(function (name) {
            return new _Note2.default(name);
        });
    }
}

exports.default = Scale;
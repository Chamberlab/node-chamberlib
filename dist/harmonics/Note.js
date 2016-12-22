'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _Frequency = require('../quantities/Frequency');

var _Frequency2 = _interopRequireDefault(_Frequency);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = function () {
    function Note() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'C';
        var octave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        (0, _classCallCheck3.default)(this, Note);

        if (key && octave) {
            this.fromString(key);
            this.octave = octave;
        } else {
            this.fromString(key);
        }
    }

    //
    //
    // Conversion

    (0, _createClass3.default)(Note, [{
        key: 'toString',
        value: function toString() {
            return this.key + this.octave.toString();
        }
    }, {
        key: 'fromString',
        value: function fromString(input) {
            (0, _assert2.default)(typeof input === 'string');

            var _self = this,
                regex = /^[a-z,A-Z,#]+([0-9]+)$/,
                res = regex.exec(input);

            if (Array.isArray(res)) {
                if (res.length >= 2) {
                    _self.octave = parseInt(res[1]);
                    _self.key = res[0].replace(/[0-9]+$/i, '');
                } else {
                    _self.octave = 4;
                }

                if (res.length === 1) {
                    _self.key = res[0];
                }
            }

            return this;
        }
    }, {
        key: 'fromRandom',
        value: function fromRandom() {
            var note = tonal.note.fromMidi(Math.round(Math.floor() * 128));
            this.fromString(note);

            return this;
        }
    }, {
        key: 'toMidi',
        value: function toMidi() {
            return tonal.note.midi(this.toString());
        }
    }, {
        key: 'fromMidi',
        value: function fromMidi(value) {
            (0, _assert2.default)(typeof value === 'number');
            (0, _assert2.default)(value >= 0 && value < 128);

            var res = tonal.note.fromMidi(value);
            this.fromString(res);

            return this;
        }
    }, {
        key: 'toFreq',
        value: function toFreq() {
            var freq = tonal.note.freq(this.toString());
            return new _Frequency2.default(freq, 'hz');
        }

        //
        //
        // Getters / Setters

    }, {
        key: 'key',
        get: function get() {
            return this._key;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string', 'Invalid key: ' + (typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)));
            this._key = val;
        }
    }, {
        key: 'octave',
        get: function get() {
            return this._octave;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'number', 'Invalid octave: ' + (typeof octave === 'undefined' ? 'undefined' : (0, _typeof3.default)(octave)));
            this._octave = val;
        }
    }]);
    return Note;
}();

exports.default = Note;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _scalesapi = require('scalesapi');

var sc = _interopRequireWildcard(_scalesapi);

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chord = function (_BaseCollection) {
    (0, _inherits3.default)(Chord, _BaseCollection);

    function Chord(value) {
        (0, _classCallCheck3.default)(this, Chord);

        (0, _assert2.default)(typeof value === 'string');

        var _this = (0, _possibleConstructorReturn3.default)(this, (Chord.__proto__ || (0, _getPrototypeOf2.default)(Chord)).call(this, [], [_Note2.default]));

        _this.string = value;
        return _this;
    }

    (0, _createClass3.default)(Chord, [{
        key: 'string',
        get: function get() {
            if (typeof this._label !== 'string') {
                var notes = this.all.map(function (note) {
                    return note.string;
                });
                this._label = tonal.chord.detect(notes.join(' '));
            }
            return this._label;
        },
        set: function set(value) {
            (0, _assert2.default)(typeof value === 'string');

            this._label = value;

            var names = tonal.chord(this._label);
            this.value = names.map(function (name) {
                var note = new _Note2.default(name);
                return note;
            });
        }
    }], [{
        key: 'getChordNames',
        value: function getChordNames() {
            var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
            var baseNote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var octave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var names = void 0;
            if (octave && baseNote && scale) {
                names = sc.getChords(scale, baseNote, octave);
            } else if (baseNote && scale) {
                names = sc.getChords(scale, baseNote);
            } else if (scale) {
                names = sc.getChords(scale);
            }
            return Array.isArray(names) ? names : [];
        }
    }]);
    return Chord;
}(_BaseCollection3.default);

exports.default = Chord;
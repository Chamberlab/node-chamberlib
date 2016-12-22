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

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _MidiIO = require('./io/MidiIO');

var _MidiIO2 = _interopRequireDefault(_MidiIO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Song = function (_BaseCollection) {
    (0, _inherits3.default)(Song, _BaseCollection);

    function Song(items) {
        (0, _classCallCheck3.default)(this, Song);
        return (0, _possibleConstructorReturn3.default)(this, (Song.__proto__ || (0, _getPrototypeOf2.default)(Song)).call(this, items, _Track2.default));
    }

    (0, _createClass3.default)(Song, [{
        key: 'toMidiFile',
        value: function toMidiFile(filename) {
            return _MidiIO2.default.write(this, filename);
        }
    }]);
    return Song;
}(_BaseCollection3.default);

exports.default = Song;
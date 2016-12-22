'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _JsonIO = require('./JsonIO');

var _JsonIO2 = _interopRequireDefault(_JsonIO);

var _MidiIO = require('./MidiIO');

var _MidiIO2 = _interopRequireDefault(_MidiIO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    JsonIO: _JsonIO2.default,
    MidiIO: _MidiIO2.default
};
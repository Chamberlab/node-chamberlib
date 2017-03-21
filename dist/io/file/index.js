'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseFile = require('./BaseFile');

var _BaseFile2 = _interopRequireDefault(_BaseFile);

var _JSONFile = require('./JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

var _MidiFile = require('./MidiFile');

var _MidiFile2 = _interopRequireDefault(_MidiFile);

var _MsgPackFile = require('./MsgPackFile');

var _MsgPackFile2 = _interopRequireDefault(_MsgPackFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    JSONFile: _JSONFile2.default,
    MidiFile: _MidiFile2.default,
    MsgPackFile: _MsgPackFile2.default,
    BaseFile: _BaseFile2.default
};
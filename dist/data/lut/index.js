'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseLUT = require('./BaseLUT');

var _BaseLUT2 = _interopRequireDefault(_BaseLUT);

var _ChordLUT = require('./ChordLUT');

var _ChordLUT2 = _interopRequireDefault(_ChordLUT);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    BaseLUT: _BaseLUT2.default,
    ChordLUT: _ChordLUT2.default
};
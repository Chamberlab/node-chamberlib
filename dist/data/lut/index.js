'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseLUT = require('./BaseLUT');

var _BaseLUT2 = _interopRequireDefault(_BaseLUT);

var _ChannelMatrix = require('./ChannelMatrix');

var _ChannelMatrix2 = _interopRequireDefault(_ChannelMatrix);

var _Colours = require('./Colours');

var _Colours2 = _interopRequireDefault(_Colours);

var _VoltageToNote = require('./VoltageToNote');

var _VoltageToNote2 = _interopRequireDefault(_VoltageToNote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    BaseLUT: _BaseLUT2.default,
    ChannelMatrix: _ChannelMatrix2.default,
    Colours: _Colours2.default,
    VoltageToNote: _VoltageToNote2.default
};
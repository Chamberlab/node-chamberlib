'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseFile = require('./BaseFile');

var _BaseFile2 = _interopRequireDefault(_BaseFile);

var _msgpack = require('msgpack');

var _msgpack2 = _interopRequireDefault(_msgpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class MsgPackFile extends _BaseFile2.default {
    constructor(data = undefined) {
        super(data);
    }

    read(file) {
        return super.read(file).then(data => {
            return _msgpack2.default.unpack(data);
        });
    }

    write(file, data = undefined) {
        return super.write(file, _msgpack2.default.pack(data || this.data));
    }
}

exports.default = MsgPackFile;
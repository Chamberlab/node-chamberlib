'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseFile = require('./BaseFile');

var _BaseFile2 = _interopRequireDefault(_BaseFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class JSONFile extends _BaseFile2.default {
    constructor(data = undefined) {
        super(data);
    }

    read(file) {
        return super.read(file).then(data => {
            this.data = JSON.parse(data);
            return this.data;
        });
    }

    write(file, data = undefined) {
        return super.write(file, JSON.stringify(data || this.data));
    }
}

exports.default = JSONFile;
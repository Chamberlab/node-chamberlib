'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseFile = require('./BaseFile');

var _BaseFile2 = _interopRequireDefault(_BaseFile);

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class CSVFile extends _BaseFile2.default {
    constructor() {
        super();
    }

    read(file, options) {
        let fstream = super.read(file, true),
            parser = (0, _csvParse2.default)(options);
        return fstream.pipe(parser);
    }

    write() {
        throw new Error('CSV writing not implemented.');
    }
}

exports.default = CSVFile;
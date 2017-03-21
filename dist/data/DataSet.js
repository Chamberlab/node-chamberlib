'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _DataChannel = require('./DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _BaseCollection = require('./BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _JSONFile = require('../io/file/JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataSet extends _BaseCollection2.default {
    constructor(channels, title = undefined, uuid = undefined) {
        super(channels, _DataChannel2.default, uuid);
        this.title = title;
    }

    // TODO: move this or make it more general
    loadJson(filepath, importerClass = undefined, title = undefined) {
        let _self = this;
        _self.title = title || _path2.default.basename(filepath, '.json');

        if (importerClass) {
            return new importerClass().read(filepath).map(function (channel) {
                _self.push(channel);
            });
        }

        return new _JSONFile2.default().read(filepath).then(function (data) {
            return data;
        });
    }
}

exports.default = DataSet;
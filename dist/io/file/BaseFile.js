'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseFile {
    constructor(data = undefined) {
        this._pathinfo = {
            root: null,
            dir: null,
            base: null,
            ext: null,
            name: null
        };
        this._fullpath = null;
        this._data = data;
    }

    write(file, data = undefined, createPath = true, overwrite = true) {
        this._data = data || this._data;
        (0, _assert2.default)(typeof file === 'string');
        (0, _assert2.default)(typeof this._data !== 'undefined', 'File has no data.');

        // TODO: make this async, lazy bastard

        this._fullpath = _path2.default.resolve(file);
        this._pathinfo = _path2.default.parse(this.fullpath);

        if (!overwrite) {
            (0, _assert2.default)(!_fs2.default.existsSync(_path2.default.join(this.dir, this.base)));
        }
        if (!createPath) {
            (0, _assert2.default)(_fs2.default.existsSync(this.dir));
        } else {
            // TODO: does not work on windows b.c. of path root
            let p = '',
                dirs = this.dir.split(_path2.default.sep);
            for (let i in dirs) {
                p += i === 0 ? this.root : _path2.default.sep + dirs[i];
                if (!_fs2.default.existsSync(p)) {
                    _fs2.default.mkdirSync(p);
                }
            }
            (0, _assert2.default)(_fs2.default.existsSync(this.dir), `Failed to create path at ${this.dir}`);
        }

        let writer = _fs2.default.createWriteStream(this.fullpath),
            p = new _bluebird2.default(function (resolve, reject) {
            writer.on('close', resolve);
            writer.on('error', reject);
        });
        writer.end(data);
        return p;
    }

    read(file, stream = false) {
        (0, _assert2.default)(typeof file === 'string');
        this._fullpath = _path2.default.resolve(file);

        (0, _assert2.default)(_fs2.default.existsSync(this._fullpath));
        this._pathinfo = _path2.default.parse(file);

        let _self = this;
        if (stream) {
            return _fs2.default.createReadStream(this.fullpath);
        } else {
            return _bluebird2.default.promisify(_fs2.default.readFile)(this.fullpath).then(data => {
                _self._data = data;
                return _self.data;
            });
        }
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get size() {
        return this.data && this.data.hasOwnProperty('length') ? this.data.length : NaN;
    }

    get fullpath() {
        return this._fullpath;
    }

    get root() {
        return this._pathinfo.root;
    }

    get dir() {
        return this._pathinfo.dir;
    }

    get base() {
        return this._pathinfo.base;
    }

    get ext() {
        return this._pathinfo.ext;
    }

    get name() {
        return this._pathinfo.name;
    }
}

exports.default = BaseFile;
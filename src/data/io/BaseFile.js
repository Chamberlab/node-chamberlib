import Promise from 'bluebird';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

class BaseFile {
    constructor() {
        this._pathinfo = {
            root: null,
            dir: null,
            base: null,
            ext: null,
            name: null
        };
        this._fullpath = null;
        this._data = null;
    }

    write(file, data, mode = 'binary', overwrite = false, createPath = false) {
        assert(typeof file === 'string');
        assert(typeof data !== 'undefined', 'File has no data.');

        // TODO: make this async

        this._fullpath = path.resolve(file);
        this._pathinfo = path.parse(this.fullpath);

        if (!overwrite) {
            assert(!fs.existsSync(path.join(this.dir, this.base)));
        }
        if (!createPath) {
            assert(fs.existsSync(this.dir));
        } else {
            // TODO: does not work on windows b.c. of path root
            let p = '', dirs = this.dir.split(path.sep);
            for (let i in dirs) {
                p += i === 0 ? this.root : path.sep + dirs[i];
                if (!fs.existsSync(p)) {
                    fs.mkdirSync(p);
                }
            }
            assert(fs.existsSync(this.dir), `Failed to create path at ${this.dir}`);
        }

        return Promise.promisify(fs.writeFile)(this.fullpath, this.data, mode);
    }

    read(file, stream = false) {
        assert(typeof file === 'string');
        this._fullpath = path.resolve(file);

        assert(fs.existsSync(this._fullpath));
        this._pathinfo = path.parse(file);

        let _self = this;
        if (stream) {
            return fs.createReadStream(this.fullpath);
        } else {
            return Promise.promisify(fs.readFile)(this.fullpath)
                .then((data) => {
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

export default BaseFile;
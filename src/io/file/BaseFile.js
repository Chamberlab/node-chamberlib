import Promise from 'bluebird';
import assert from 'assert';
import fs from 'fs';
import path from 'path';

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
        assert(typeof file === 'string');
        assert(typeof this._data !== 'undefined', 'File has no data.');

        // TODO: make this async, lazy bastard

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

        let writer = fs.createWriteStream(this.fullpath),
            p = new Promise(function (resolve, reject) {
                writer.on('close', resolve);
                writer.on('error', reject);
            });
        writer.end(data);
        return p;
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
            return new Promise((resolve, reject) => {
                fs.readFile(this.fullpath, (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(data);
                });
            })
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
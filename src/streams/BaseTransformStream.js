import assert from 'assert';
import stream from 'stream';
import uuid4 from 'uuid4';

class BaseTransformStream extends stream.Transform {
    constructor(_transformPromise) {
        super({
            readableObjectMode: true,
            writableObjectMode: true
        });

        if (_transformPromise) {
            assert(typeof _transformPromise === 'function');
            this._transformPromise = _transformPromise;
        }

        this._uuid = uuid4();
        this._meta = null;
    }

    _transformHandler(data, cb) {
        cb(null, data);
    }

    _transform(data, encoding, cb) {
        if (this._transformPromise) {
            this._transformPromise(data)
                .then((res) => {
                    cb(null, res);
                })
                .catch((err) => {
                    cb(err, null);
                });
        } else {
            this._transformHandler(data, cb);
        }
    }

    get uuid() {
        return this._uuid;
    }

    get meta() {
        return this._meta;
    }

    set meta(val) {
        this._meta = val;
        this.emit('meta', this._meta);
    }
}

export default BaseTransformStream;
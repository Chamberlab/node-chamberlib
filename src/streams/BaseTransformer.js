import Promise from 'bluebird';
import Transform from 'stream-transform';
import Emitter from 'tiny-emitter';

class BaseTransformer extends Emitter {
    constructor() {
        super();

        this._stream = new Transform(this._transform, this._flush);
        this._time = null;
    }

    get stream() {
        return this._stream;
    }

    _transformHandler(event) {
        return Promise.resolve(event);
    }

    _transform(event, cb) {
        this._time = Date.now();
        this.emit(this.constructor.name, 'start', this._time);
        return this._transformHandler(event)
            .then((result) => {
                cb(null, result);
            })
            .catch((err) => {
                cb(err, event);
            });
    }

    _flush(err) {
        this.emit('TransformComplete', this.constructor.name, err ? err.message : null);
    }
}

export default BaseTransformer;
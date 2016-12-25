import Promise from 'bluebird';
import Transform from 'stream-transform';

class BaseTransformer extends Transform {
    constructor() {
        super({
            readableObjectMode: true,
            writableObjectMode: true
        });

        this._time = null;
    }

    _transformHandler(event) {
        return Promise.resolve(event);
    }

    _transform(event, cb) {
        return this._transformHandler(event)
            .then((result) => {
                cb(null, result);
            })
            .catch((err) => {
                cb(err, event);
            });
    }
}

export default BaseTransformer;
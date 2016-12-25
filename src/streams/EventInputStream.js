import stream from 'stream';
import assert from 'assert';
import uuid from 'uuid4';

import BaseNode from '../nodes/BaseNode';

class EventInputStream extends stream.Writable {
    constructor(dataTarget) {
        assert(dataTarget instanceof BaseNode);

        super({ objectMode: true });
        this._dataTarget = dataTarget;
        this._uuid = uuid();
        this._meta = null;
    }

    _write(chunk, encoding, cb) {
        this._dataTarget.storeInput(chunk);
        cb(null);
    }

    _writev(chunks, cb) {
        const _self = this;
        chunks.forEach((chunk) => {
            _self._dataTarget.storeInput(chunk);
        });
        cb(null);
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

export default EventInputStream;
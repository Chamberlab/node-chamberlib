import stream from 'stream';
import assert from 'assert';
import uuid from 'uuid4';

import BaseNode from '../nodes/BaseNode';

class EventOutputStream extends stream.Readable {
    constructor(dataSource) {
        assert(dataSource instanceof BaseNode);

        super({ objectMode: true });
        this._dataSource = dataSource;
        this._uuid = uuid();
        this._meta = null;
    }

    addEvent(event) {
        if (!this.push(event)) {
            this._dataSource.pauseOutput(this.uuid);
        }
    }

    EOF() {
        this.push(null);
    }

    _read() {
        this._dataSource.startOutput(this.uuid);
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

export default EventOutputStream;
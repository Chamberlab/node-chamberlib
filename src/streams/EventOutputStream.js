import stream from 'stream';
import uuid from 'uuid4';

class EventOutputStream extends stream.Readable {
    constructor(dataSource) {
        super({ objectMode: true });
        this._dataSource = dataSource;
        this._uuid = uuid();
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
}

export default EventOutputStream;
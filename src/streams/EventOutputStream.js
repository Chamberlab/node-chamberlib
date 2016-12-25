import stream from 'stream';

class EventOutputStream extends stream.Readable {
    constructor(dataSource) {
        super({ objectMode: true });
        this._dataSource = dataSource;
    }

    addEvent(event) {
        if (!this.push(event)) {
            this._dataSource.pauseOutput();
        }
    }

    EOF() {
        this.push(null);
    }

    _read() {
        this._dataSource.startOutput();
    }
}

export default EventOutputStream;
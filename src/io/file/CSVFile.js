import BaseFile from './BaseFile';
import parse from 'csv-parse';

class CSVFile extends BaseFile {
    constructor() {
        super();

        this._data = undefined;
    }

    read(file, options) {
        let fstream = super.read(file, true),
            parser = parse(options);
        return fstream.pipe(parser);
    }

    write() {
        throw new Error('CSV writing not implemented.');
    }

    get data() {
        return this._data;
    }
}

export default CSVFile;
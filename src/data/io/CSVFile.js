import BaseFile from './BaseFile';
import parse from 'csv-parse';

class CSVFile extends BaseFile {
    constructor() {
        super();
    }

    read(file, options) {
        let fstream = super.read(file, true),
            parser = parse(options);
        return fstream.pipe(parser);
    }

    write() {
        throw new Error('CSV writing not implemented.');
    }
}

export default CSVFile;
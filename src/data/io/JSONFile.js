import BaseFile from './BaseFile';

class JSONFile extends BaseFile {
    constructor(data = undefined) {
        super(data);
    }

    read(file) {
        return super.read(file).then((data) => {
            return JSON.parse(data);
        });
    }

    write(file, data = undefined) {
        return super.write(file, JSON.stringify(data || this.data));
    }
}

export default JSONFile;
import BaseFile from './BaseFile';

class MsgPackFile extends BaseFile {
    constructor(data) {
        super(data);
    }

    write(file, data = undefined) {
        return super.write(file, data);
    }

    read(file) {
        return super.read(file);
    }
}

export default MsgPackFile;
import BaseFile from './BaseFile';
import msgpack from 'msgpack';

class MsgPackFile extends BaseFile {
    constructor(data = undefined) {
        super(data);
    }

    read(file) {
        return super.read(file).then((data) => {
            return msgpack.unpack(data);
        });
    }

    write(file, data = undefined) {
        return super.write(file, msgpack.pack(data || this.data));
    }
}

export default MsgPackFile;
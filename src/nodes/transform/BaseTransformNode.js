import through from 'through';
import BaseNode from '../BaseNode';

class BaseTransformNode extends BaseNode {
    constructor(transformFunction = undefined) {
        super();

        this._stream = new through(transformFunction);
    }

    initStream(transformFunction) {
        const _self = this;
        this._stream = new through(transformFunction, () => {
            _self.addStats('out', 'null', 0);
            _self.stream.queue(null);
        });
    }

    get stream() {
        return this._stream;
    }
}

export default BaseTransformNode;
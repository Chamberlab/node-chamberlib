import BaseNode from '../BaseNode';
import BaseTransformStream from '../../streams/BaseTransformStream';

class BaseTransformNode extends BaseNode {
    constructor(transformFunction = undefined) {
        super();

        this._stream = new BaseTransformStream(transformFunction);
    }

    get stream() {
        return this._stream;
    }
}

export default BaseTransformNode;
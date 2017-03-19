import assert from 'assert';
import Qty from 'js-quantities';
import Emitter from 'tiny-emitter';
import DataEvent from '../../events/DataEvent';

class BaseDB extends Emitter {
    constructor() {
        super();
    }

    get(key) {
        assert(key instanceof Qty);
    }

    put(key, val) {
        assert(key instanceof Qty);
        assert(val instanceof DataEvent);
    }
}

export default BaseDB;
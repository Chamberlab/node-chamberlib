import assert from 'assert';
import Emitter from 'tiny-emitter';
import DataEvent from '../../events/DataEvent';
import Time from '../../quantities/Time';

class BaseDB extends Emitter {
    constructor() {
        super();
    }

    get(key) {
        assert(key instanceof Time);
    }

    put(key, val) {
        assert(key instanceof Time);
        assert(val instanceof DataEvent);
    }
}

export default BaseDB;
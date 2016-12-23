import assert from 'assert';

class BaseDB {
    constructor() {

    }

    get(key) {
        assert(typeof key === 'string');
    }

    put(key, val) {
        assert(typeof key === 'string');
        assert(val);
    }

    create(val) {
        assert(val);
    }
}

export default BaseDB;
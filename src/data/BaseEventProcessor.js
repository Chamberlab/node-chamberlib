import assert from 'assert';
import BaseEvent from '../events/BaseEvent';

class BaseEventProcessor {
    constructor(options = {}) {
        this._options = options;
        this._cache = {};
        return this;
    }

    process(event) {
        assert(event instanceof BaseEvent, `event must be BaseEvent, is ${typeof event}`);
        return event;
    }
}

export default BaseEventProcessor;
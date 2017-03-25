import assert from 'assert';
import BaseEventProcessor from '../BaseEventProcessor';

class EventFilter extends BaseEventProcessor {
    constructor(matchValueFn, matchTimeFn = undefined, options = undefined) {
        assert(typeof matchValueFn === 'function', 'No function supplied to match value');

        super(options);

        this._matchValueFn = matchValueFn;

        if (typeof matchTimeFn === 'function') {
            this._matchTimeFn = matchTimeFn;
        }
    }

    process(event) {
        const e = super.process(event);

        return this._matchValueFn(e) &&
            (typeof this._matchTimeFn === 'function' ? this._matchTimeFn(e) : true);
    }
}

export default EventFilter;
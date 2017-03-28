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
        return super.process(event)
            .then(event => {
                return this._matchValueFn(event) &&
                    (typeof this._matchTimeFn === 'function' ? this._matchTimeFn(event) : true);
            });
    }
}

export default EventFilter;
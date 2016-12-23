import assert from 'assert';
import BaseRule from '../BaseRule';
import BaseCollection from '../../data/BaseCollection';

class BaseRouter extends BaseRule {
    constructor(destination, active = true) {
        super(active);

        this.destination = destination;
    }


    evaluate(source, processorFunc) {
        const _self = this;
        return super.evaluate(source, processorFunc || this.processorFunc)
            .then(function (results) {
                return new _self.destination.constructor(results);
            });
    }

    processorFunc(event) {
        return event;
    }


    get destination() {
        return this._destination;
    }

    set destination(val) {
        assert(val && val instanceof BaseCollection);
        this._destination = val;
    }
}

export default BaseRouter;
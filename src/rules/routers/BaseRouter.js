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
        if (typeof processorFunc === 'function') {
            super.evaluate(source, processorFunc);
        } else {
            source.all.map(function (event) {
                _self.destination.push(event);
            });
        }
    }


    get destination() {
        assert(this._destination instanceof BaseCollection);
        return this._destination;
    }

    set destination(val) {
        assert(val instanceof BaseCollection || val.prototype instanceof BaseCollection);
        this._destination = val;
    }
}

export default BaseRouter;
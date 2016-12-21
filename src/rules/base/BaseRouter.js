import assert from 'assert';
import BaseRule from './BaseRule';
import DataChannel from '../../data/DataChannel';
import DataEvent from '../../events/DataEvent';

class BaseRouter extends BaseRule {
    constructor(destination, active = true) {
        super(active);

        this.destination = destination;
    }


    evaluate(source, processorFunc) {
        super.evaluate(source, processorFunc);
    }


    get destination() {
        assert(this._destination instanceof DataChannel);
        return this._destination;
    }

    set destination(val) {
        assert(val instanceof DataChannel);
        this._destination = val;
    }
}

export default BaseRouter;
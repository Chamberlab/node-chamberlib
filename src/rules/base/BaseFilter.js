import assert from 'assert';

import BaseRule from './BaseRule';
import BaseQuantity from '../../quantities/base/BaseQuantity';

class BaseFilter extends BaseRule {
    constructor(cutoff, replace = null) {
        super();

        this.cutoff = cutoff;
        this.replace = replace;
    }


    evaluate(source, processorFunc, ...args) {
        return super.evaluate(source, processorFunc, args);
    }


    set cutoff(cutoff) {
        assert(cutoff instanceof BaseQuantity);
        this._cutoff = cutoff;
    }

    get cutoff() {
        return this._cutoff;
    }


    set replace(val) {
        if (val === null) {
            this._replace = val;
            return;
        }

        assert(val instanceof BaseQuantity);

        this._replace = val;
    }

    get replace() {
        return this._cutoff;
    }
}

export default BaseFilter;
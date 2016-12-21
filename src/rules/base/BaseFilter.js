'use strict';

import assert from 'assert';

import BaseRule from './BaseRule';
import DataChannel from '../../data/DataChannel';
import DataEvent from '../../events/DataEvent';
import BaseQuantity from '../../quantities/base/BaseQuantity';

class BaseFilter extends BaseRule {
    constructor(cutoff, replace = null) {
        super();

        this.cutoff = cutoff;
        this.replace = replace;
    }


    evaluate(source) {
        super.evaluate(source);

        let _self = this;
        return new DataChannel(source.all.map(function (event) {
            assert(event instanceof DataEvent);
            return _self.filterFunc(event);
        }));
    }

    filterFunc(event) {
        return event;
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
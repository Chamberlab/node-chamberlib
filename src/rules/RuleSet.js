'use strict';

import assert from 'assert';
import BaseCollection from '../data/BaseCollection';
import BaseRule from './base/BaseRule';
import DataChannel from '../data/DataChannel';

class RuleSet extends BaseCollection {
    constructor() {
        super([], BaseRule);
    }


    evaluate(source) {
        assert(source instanceof DataChannel);

        let last;

        for (let rule of this.all) {
            last = rule.evaluate(source).results;
        }

        return this;
    }
}

export default RuleSet;
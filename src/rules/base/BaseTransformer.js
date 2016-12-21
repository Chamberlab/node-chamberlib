'use strict';

import BaseRule from './BaseRule';

class BaseTransformer extends BaseRule {
    constructor() {
        super();
    }


    evaluate(source) {
        super.evaluate(source);

        let _self = this;
        source.all.map(function (event) {
            return _self.transformFunc(event);
        });

        return this;
    }

    transformFunc(event) {
        return event;
    }
}

export default BaseTransformer;
import BaseRule from '../BaseRule';

class BaseTransformer extends BaseRule {
    constructor() {
        super();
    }


    evaluate(source, processorFunc) {
        super.evaluate(source, processorFunc);
    }

    processorFunc(event) {
        return event;
    }
}

export default BaseTransformer;
import BaseFilter from './BaseFilter';

class HighPass extends BaseFilter {
    constructor(cutoff) {
        super(cutoff);

        this._cutoff = cutoff;
    }

    evaluate(source) {
        return super.evaluate(source, this.processorFunc, this._cutoff);
    }

    processorFunc(...args) {
        let event = args[0],
            cutoff = args[3][0][0];
        if (event.value.normalized() > cutoff.normalized()) {
            return args[0];
        } else {
            return null;
        }
    }
}

export default HighPass;
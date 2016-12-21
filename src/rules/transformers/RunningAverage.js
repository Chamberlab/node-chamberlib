import BaseTransformer from '../base/BaseTransformer';

class RunningAverage extends BaseTransformer {
    processorFunc(event) {
        return event;
    }
}

export default RunningAverage;
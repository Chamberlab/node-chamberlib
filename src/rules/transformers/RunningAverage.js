import BaseFilter from '../filters/BaseFilter';

class RunningAverage extends BaseFilter {
    processorFunc(event) {
        return event;
    }
}

export default RunningAverage;
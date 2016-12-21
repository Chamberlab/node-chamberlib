'use strict';

import BaseTransformer from '../base/BaseTransformer';

class RunningAverage extends BaseTransformer {
    transformFunc(event) {
        return event;
    }
}

export default RunningAverage;
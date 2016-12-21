'use strict';

import BaseFilter from '../base/BaseFilter';

class LowPass extends BaseFilter {
    processorFunc(event) {
        return event.value.normalized() < this.cutoff.normalized();
    }
}

export default LowPass;
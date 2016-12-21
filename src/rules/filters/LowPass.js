'use strict';

import BaseFilter from '../base/BaseFilter';

class LowPass extends BaseFilter {
    filterFunc(event) {
        return event.value.normalized() < this.cutoff.normalized();
    }
}

export default LowPass;
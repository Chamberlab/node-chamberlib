'use strict';

import BaseFilter from '../base/BaseFilter';

class HighPass extends BaseFilter {
    filterFunc(event) {
        return event.value.normalized() > this.cutoff.normalized();
    }
}

export default HighPass;
'use strict';

import assert from 'assert';
import Scale from '../../harmonics/Scale';
import BaseLUT from './BaseLUT';

class ChordLUT extends BaseLUT {
    constructor(scale) {
        super();

        if (typeof scale === 'string') {
            scale = new Scale(scale);
        }

        assert(scale instanceof Scale);
        this._scale = scale;
    }

    generate() {
        super.generate();

    }
}

export default ChordLUT;
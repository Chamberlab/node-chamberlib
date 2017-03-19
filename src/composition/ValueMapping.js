import assert from 'assert';

import BaseLUT from '../data/lut/BaseLUT';

class ValueMapping {
    constructor(lut) {
        this.lut = lut;
    }


    get lut() {
        return this._lut;
    }

    set lut(val) {
        assert(val instanceof BaseLUT, `Lookup table must be of type BaseLUT, is ${typeof val}`);
    }


    dataToTonal(dataEvents) {
        return dataEvents.map(event => {
            return event;
        });
    }
}

export default ValueMapping;
import assert from 'assert';
import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Datasize extends BaseQuantity {
    constructor(value, unit = Datasize.defaultUnit) {
        if (typeof unit === 'string') {
            unit = Datasize.units[unit.toLowerCase()];
        }
        assert(Datasize.units.hasOwnProperty(unit.suffix) > -1);

        super(value, unit);
    }


    static get units() {
        return {
            'b': new Unit('Byte', 'b', 1, Dimensions.DIMENSION_DATASTORAGE),
            'kb': new Unit('Kilobyte', 'kb', 1024, Dimensions.DIMENSION_DATASTORAGE),
            'mb': new Unit('Megabyte', 'kb', Math.pow(1024, 2), Dimensions.DIMENSION_DATASTORAGE),
            'gb': new Unit('Gigabyte', 'gb', Math.pow(1024, 3), Dimensions.DIMENSION_DATASTORAGE),
            'tb': new Unit('Terabyte', 'tb', Math.pow(1024, 4), Dimensions.DIMENSION_DATASTORAGE),
        };
    }

    static get defaultUnit() {
        return Datasize.units.kb;
    }
}

export default Datasize;
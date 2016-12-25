import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Datasize extends BaseQuantity {
    constructor(value, unit = Datasize.defaultUnit) {
        if (typeof unit === 'string') {
            unit = Datasize.units[unit.toLowerCase()];
        }
        super(value, unit);
    }


    static get units() {
        return {
            'b': new Unit('Byte', 'b', 1, Dimensions.DIMENSION_DATASTORAGE),
            'kb': new Unit('Kilobyte', 'Kb', 1 / 1024, Dimensions.DIMENSION_DATASTORAGE),
            'mb': new Unit('Megabyte', 'Mb', Math.pow(1024, -2), Dimensions.DIMENSION_DATASTORAGE),
            'gb': new Unit('Gigabyte', 'Gb', Math.pow(1024, -3), Dimensions.DIMENSION_DATASTORAGE),
            'tb': new Unit('Terabyte', 'Tb', Math.pow(1024, -4), Dimensions.DIMENSION_DATASTORAGE),
        };
    }

    static get defaultUnit() {
        return Datasize.units.b;
    }
}

export default Datasize;
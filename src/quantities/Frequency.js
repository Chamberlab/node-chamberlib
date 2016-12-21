import assert from 'assert';
import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Frequency extends BaseQuantity {
    constructor(value, unitSuffix = Frequency.defaultUnit.suffix) {
        assert(Frequency.units.hasOwnProperty(unitSuffix) > -1);

        super(value, Frequency.units[unitSuffix]);
    }


    static get units() {
        return {
            'hz': new Unit('Hertz', 'hz', 1.0, Dimensions.DIMENSION_FREQUENCY),
            'khz': new Unit('Kilohertz', 'khz', 1000.0, Dimensions.DIMENSION_FREQUENCY)
        };
    }

    static get defaultUnit() {
        return Frequency.units.hz;
    }
}

export default Frequency;
import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Frequency extends BaseQuantity {
    constructor(value, unit = Frequency.defaultUnit) {
        if (typeof unit === 'string') {
            unit = Frequency.units[unit.toLowerCase()];
        }
        super(value, unit);
    }


    static get units() {
        return {
            'hz': new Unit('Hertz', 'Hz', 1.0, Dimensions.DIMENSION_FREQUENCY),
            'khz': new Unit('Kilohertz', 'kHz', Math.pow(10, -3), Dimensions.DIMENSION_FREQUENCY),
            'mhz': new Unit('Megahertz', 'MHz', Math.pow(10, -6), Dimensions.DIMENSION_FREQUENCY),
            'ghz': new Unit('Gigahertz', 'GHz', Math.pow(10, -9), Dimensions.DIMENSION_FREQUENCY)
        };
    }

    static get defaultUnit() {
        return Frequency.units.hz;
    }
}

export default Frequency;
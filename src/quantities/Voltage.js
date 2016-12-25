import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Voltage extends BaseQuantity {
    constructor(value, unit = Voltage.defaultUnit) {
        if (typeof unit === 'string') {
            unit = Voltage.units[unit.toLowerCase()];
        }
        super(value, unit);
    }

    static get units() {
        return {
            'v': new Unit('Volt', 'V', 1, Dimensions.VOLTAGE),
            'mv': new Unit('Millivolt', 'mV', Math.pow(10, 3), Dimensions.VOLTAGE),
        };
    }

    static get defaultUnit() {
        return Voltage.units.v;
    }
}

export default Voltage;
import assert from 'assert';
import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Time extends BaseQuantity {
    constructor(value, unit = Time.defaultUnit) {
        if (typeof unit === 'string') {
            unit = Time.units[unit.toLowerCase()];
        }
        assert(Time.units[unit.suffix] instanceof Unit);

        super(value, unit);
    }


    static get units() {
        return {
            's': new Unit('seconds', 's', 1.0, Dimensions.DIMENSION_TEMPORAL),
            'ms': new Unit('milliseconds', 'ms', 0.001, Dimensions.DIMENSION_TEMPORAL),
            'mu': new Unit('microseconds', 'mu', 0.000001, Dimensions.DIMENSION_TEMPORAL)
        };
    }

    static get defaultUnit() {
        return Time.units.s;
    }
}

export default Time;
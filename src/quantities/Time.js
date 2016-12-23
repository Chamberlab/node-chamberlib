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
            's': new Unit('Second', 's', 1.0, Dimensions.DIMENSION_TEMPORAL),
            'ms': new Unit('Millisecond', 'ms', Math.pow(10, -3), Dimensions.DIMENSION_TEMPORAL),
            'mu': new Unit('Microseconds', 'ms', Math.pow(10, -6), Dimensions.DIMENSION_TEMPORAL),
            'ns': new Unit('Nanosecond', 'ns', Math.pow(10, -9), Dimensions.DIMENSION_TEMPORAL)
        };
    }

    static get defaultUnit() {
        return Time.units.s;
    }
}

export default Time;
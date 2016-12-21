import assert from 'assert';
import BaseQuantity from './base/BaseQuantity';
import Unit from './base/Unit';
import Dimensions from './base/Dimensions';

class Voltage extends BaseQuantity {
    constructor(value, unitSuffix = Voltage.defaultUnit.suffix) {
        assert(Voltage.units.hasOwnProperty(unitSuffix) > -1);

        super(value, Voltage.units[unitSuffix]);
    }

    static get units() {
        return {
            'v': new Unit('Volt', 'v', 1.0, Dimensions.DIMENSION_VOLTAGE),
            'mv': new Unit('MilliVolt', 'mv', 0.001, Dimensions.DIMENSION_VOLTAGE)
        };
    }

    static get defaultUnit() {
        return Voltage.units.mv;
    }
}

export default Voltage;
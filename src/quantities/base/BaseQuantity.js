import assert from 'assert';
import Unit from './Unit';
import Dimensions from './Dimensions';

// TODO: js number precision is a nightmare, implement mathjs or bignumber

class BaseQuantity {
    constructor(value, unit) {
        assert(unit instanceof Unit);

        this._value = BaseQuantity.validateFloatInput(value);
        this._unit = unit;
    }

    isCompatible(target) {
        assert(target instanceof BaseQuantity);
        return this.unit.dimension === target.unit.dimension;
    }

    normalized() {
        return this.value / this.unit.ratio;
    }

    defaultUnit() {
        return this.normalized() * this.defaultUnit().ratio;
    }

    distanceTo(target) {
        assert(target instanceof BaseQuantity);
        assert(this.isCompatible(target));

        return target.normalized() - this.normalized();
    }

    toQuantity(target) {
        assert(target instanceof BaseQuantity);

        return new target.constructor(this.normalized() * target.unit.ratio, target.unit);
    }

    setUnit(unit) {
        assert(unit && unit !== null);
        assert(unit instanceof Unit, `Expected type Unit but got ${unit ? unit.constructor.name : null}`);
        this._value = this.normalized() * unit.ratio;
        this._unit = unit;
    }

    toString() {
        return `${ this.value.toPrecision(12) } ${this.unit.suffix}`;
    }

    toObject() {
        return this.normalized();
    }


    //
    //
    // Getters / Setters

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = BaseQuantity.validate(value);
    }


    get unit() {
        return this._unit;
    }


    get type() {
        return this._type;
    }


    //
    //
    // Static methods

    static get units() {
        return {
            'undef': new Unit('', 'undef', 1, Dimensions.DIMENSION_UNSPECIFIED)
        };
    }

    static get defaultUnit() {
        return BaseQuantity.units.undef;
    }

    static validateFloatInput(value) {
        let type = typeof value;
        switch (type) {
            case 'number':
                return value;
            case 'string':
                return parseFloat(value);
            default:
                throw new TypeError(`Expected float or string but got: ${type}`);
        }
    }
}

export default BaseQuantity;
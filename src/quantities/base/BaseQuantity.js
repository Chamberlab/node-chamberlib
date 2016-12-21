'use strict';

import assert from 'assert';
import Unit from './Unit';

class BaseQuantity {
    constructor(value, unit) {
        this._value = BaseQuantity.validateFloatInput(value);

        assert(unit instanceof Unit);
        this._unit = unit;
    }

    isCompatible(target) {
        assert(target instanceof BaseQuantity);

        return this.unit.isCompatible(target.unit);
    }

    normalized() {
        return (1.0 / this.unit.ratio) * this.value;
    }

    distanceTo(target) {
        assert(target instanceof BaseQuantity);
        assert(target.isCompatible(target));

        return target.normalized() - this.normalized();
    }

    toQuantity(target) {
        assert(target instanceof BaseQuantity);

        return new target.constructor(this.normalized() * target.unit.ratio, target.unit);
    }

    toString() {
        return `${ this.value.toString()} ${this.suffix}`;
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
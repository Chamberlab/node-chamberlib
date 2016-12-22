import assert from 'assert';
import BaseFilter from './BaseFilter';
import DataChannel from '../../data/DataChannel';
import BaseQuantity from '../../quantities/base/BaseQuantity';

class SortQuantities extends BaseFilter {
    constructor(property, reverse = false) {
        super();

        this._property = property;
        this._reverse = reverse;
    }


    evaluate(source) {
        assert(source instanceof DataChannel);
        assert(source._childClass instanceof BaseQuantity);

        return this._items.sort(function (a, b) {
            assert(a.isCompatible(b));
            return this.filterFunc(a, b);
        });
    }

    processorFunc(a, b) {
        return a[this._property].compare(b[this._property]) * (this._reverse ? -1 : 1);
    }
}

export default SortQuantities;
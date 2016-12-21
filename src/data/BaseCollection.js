import assert from 'assert';

class BaseCollection {
    constructor(items, childClass) {
        assert(typeof childClass !== 'undefined');

        this._items = [];
        this._childClass = childClass;

        if (Array.isArray(items)) {
            this._items = this._items.concat(items);
        }

        if (typeof items === 'number') {
            for (let i = 0; i < items; i++) {
                // TODO: validate this
                let item = new this._childClass();
                this._items.push(item);
            }
        }
    }

    at(...args) {
        if (args.length === 1) {
            assert(typeof args[0] === 'number');
            return this._items[args[0]];
        }

        if (args.length === 2) {
            assert(typeof args[0] === 'number');
            assert(typeof args[0] < this._items.length);
            assert(args[1] instanceof this._childClass);

            this._items[args[0]] = args[1];
        }
    }

    push(item) {
        if (item instanceof this._childClass) {
            this._items.push(item);
            return;
        }
        if (item instanceof BaseCollection) {
            item = item.all;
        }
        if (Array.isArray(item)) {
            let _self = this;
            item = item.map(function (it) {
                assert(it instanceof _self._childClass);
            });
            this._items = this._items.concat(item);
        }

    }


    //
    //
    // Getters and Setters

    get all() {
        return this._items;
    }

    get size() {
        return this._items.length;
    }
}

export default BaseCollection;
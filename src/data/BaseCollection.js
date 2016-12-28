import assert from 'assert';
import uuid4 from 'uuid4';

class BaseCollection {
    constructor(items, childClass, uuid) {
        assert(typeof childClass !== 'undefined');

        this._uuid = uuid || uuid4();
        this._items = [];
        this._childClass = childClass;

        if (Array.isArray(items)) {
            // TODO: this needs a type check
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
            this._items[args[0]].parentUUID = this.uuid;
        }
    }

    push(item) {
        const _self = this;
        if (item instanceof this._childClass) {
            item.parentUUID = this.uuid;
            this._items.push(item);
            return;
        }
        if (item instanceof BaseCollection) {
            item = item.all.map((it) => {
                it.parentUUID = _self.uuid;
                return it;
            });
        }
        if (Array.isArray(item)) {
            let _self = this;
            item = item.map(function (it) {
                assert(it instanceof _self._childClass);
                it.parentUUID = _self.uuid;
            });
            this._items = this._items.concat(item);
        }

    }


    //
    //
    // Getters and Setters

    get uuid() {
        return this._uuid;
    }

    set uuid(val) {
        this._uuid = val;
    }

    get all() {
        return this._items;
    }

    get size() {
        return this._items.length;
    }
}

export default BaseCollection;
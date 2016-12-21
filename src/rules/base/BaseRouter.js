'use strict';

import assert from 'assert';
import BaseRule from './BaseRule';
import DataChannel from '../../data/DataChannel';
import DataEvent from '../../events/DataEvent';

class BaseRouter extends BaseRule {
    constructor(destination, active = true) {
        super(active);

        this.destination = destination;
    }


    evaluate(source) {
        super.evaluate(source);

        if (this._active) {
            // TODO: promise.map ?
            source.map(function (event) {
                this.routerFunc(event);
            });
        }

        return this;
    }

    routerFunc(event) {
        assert(event instanceof DataEvent);

        this.destination.push(event);
    }


    get destination() {
        assert(this._destination instanceof DataChannel);
        return this._destination;
    }

    set destination(val) {
        assert(val instanceof DataChannel);
        this._destination = val;
    }
}

export default BaseRouter;
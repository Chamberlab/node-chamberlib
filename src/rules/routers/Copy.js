'use strict';

import assert from 'assert';
import BaseRouter from '../base/BaseRouter';
import DataEvent from '../../events/DataEvent';

class Copy extends BaseRouter {
    routerFunc(event) {
        assert(event instanceof DataEvent);

        let newEvent = new DataEvent();
        Object.assign(newEvent, event);

        this.destination.push(newEvent);
    }
}

export default Copy;
import assert from 'assert';

import BaseCollection from './BaseCollection';
import RuleSet from '../rules/RuleSet';
import TonalEvent from '../events/TonalEvent';

class Track extends BaseCollection {
    constructor(...args) {
        super(args, TonalEvent);

        this._ruleset = new RuleSet();
    }


    //
    //
    // Getters / Setters

    set ruleset(val) {
        assert(val instanceof RuleSet);
        this._ruleset = val;
    }

    get ruleset() {
        return this._ruleset;
    }
}

export default Track;
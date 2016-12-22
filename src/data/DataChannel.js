import Promise from 'bluebird';
import BaseCollection from '../data/BaseCollection';
import BaseEvent from '../events/BaseEvent';
import RuleSet from '../rules/RuleSet';

class DataChannel extends BaseCollection {
    constructor(events) {
        super(events, BaseEvent);

        this._ruleset = new RuleSet();
    }

    evaluateRuleSet() {
        const _self = this;
        return Promise.resolve()
            .then(() => {
                return _self.ruleset.evaluate(_self);
            });
    }


    get ruleset() {
        return this._ruleset;
    }
}

export default DataChannel;
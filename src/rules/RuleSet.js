import assert from 'assert';
import Promise from 'bluebird';
import BaseCollection from '../data/BaseCollection';
import BaseRule from './base/BaseRule';
import DataChannel from '../data/DataChannel';

class RuleSet extends BaseCollection {
    constructor() {
        super([], BaseRule);
    }


    evaluate(source) {
        assert(source instanceof DataChannel,
            `Expected source to be DataChannel but got ${source.constructor.name}`);

        const _self = this;
        _self._progress = 0.0;

        return Promise.reduce(_self.all, function (history, rule, i, len) {
            _self._progress = i / len;
            return Promise.resolve(rule.evaluate(_self._results || source))
                .then(function (result) {
                    history.push({ rule: rule.constructor.name, results: result, errors: []});
                    return history;
                });
        }, [])
        .then(function (results) {
            return results;
        });
    }


    get progress() {
        return this._progress;
    }
}

export default RuleSet;
import assert from 'assert';
import Promise from 'bluebird';
import BaseCollection from '../data/BaseCollection';
import BaseRule from './BaseRule';

class RuleSet extends BaseCollection {
    constructor() {
        super([], BaseRule);
    }


    evaluate(source) {
        assert(source instanceof BaseCollection,
            `Expected source to be BaseCollection but got ${source.constructor.name}`);

        const _self = this;
        _self._results = [];
        _self._progress = 0.0;

        return Promise.reduce(_self.all, function (history, rule, i, len) {
            _self._progress = i / len;
            return Promise.resolve(rule.evaluate(_self.lastResult.results || source))
                .then(function (result) {
                    return { rule: rule.constructor.name, results: result, errors: [] };
                });
        }, _self._results)
        .then(function (result) {
            _self._results.push(result);
            return _self;
        });
    }


    get progress() {
        return this._progress;
    }
    
    get results() {
        return this._results;
    }

    get lastResult() {
        if (!Array.isArray(this.results) || this.results.length === 0) {
            return {rule: null, results: null, errors: []};
        }
        return this.results[this.results.length - 1];
    }
}

export default RuleSet;
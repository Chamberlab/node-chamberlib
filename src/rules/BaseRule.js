import assert from 'assert';
import Promise from 'bluebird';
import BaseCollection from '../data/BaseCollection';
import BaseEvent from '../events/BaseEvent';
import Emitter from 'tiny-emitter';

class BaseRule extends Emitter {
    constructor(active = true) {
        super();

        this._active = active;
    }


    evaluate(source, processorFunc, ...args) {
        assert(source instanceof BaseCollection);
        assert(typeof processorFunc === 'function');

        if (this.active) {
            this.validate(source);
            if (this._autoreset) {
                this.reset();
            }
        }

        const _self = this;
        _self.emit('EvaluationProgress', _self.constructor.name, 0.0);
        this._progress = 0.0;
        this._results = [];
        this._errors = [];

        return Promise.reduce(source.all, function (history, event, i, len) {
            _self._progress = i / len;
            _self.emit('EvaluationProgress', _self.constructor.name, _self.progress);
            return Promise.resolve(processorFunc(event, history, _self._progress, args))
                .then(function (result) {
                    if (result instanceof BaseEvent) {
                        _self._results.push(result);
                    }
                    return _self._results;
                });
        }, null)
        .then(function (results) {
            _self.emit(_self.constructor.name + 'EvaluationProgress', 1.0);
            _self.emit('EvaluationComplete', _self.constructor.name, { errors: _self.errors });
            return results;
        });
    }

    validate(source) {
        assert(source instanceof BaseCollection);
        return this;
    }

    reset() {
        this._results = undefined;
        return this;
    }


    get results() {
        assert(this._results instanceof BaseCollection);
        return this._results;
    }


    get active() {
        return this._active;
    }

    set active(val) {
        this._active = val;
    }

    get progress() {
        return this._progress;
    }

    get errors() {
        return this._errors;
    }
}

export default BaseRule;
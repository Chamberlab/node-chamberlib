import assert from 'assert';
import Promise from 'bluebird';
import BaseCollection from '../data/BaseCollection';
import DataChannel from '../data/DataChannel';
import BaseEvent from '../events/BaseEvent';

class BaseRule {
    constructor(active = true, autoreset = false) {
        this._active = active;
        this._autoreset = autoreset;
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
        this._progress = 0.0;
        return Promise.reduce(source.all, function (history, event, i, len) {
            _self._progress = i / len;
            return Promise.resolve(processorFunc(event, history, _self._progress, args))
                .then(function (res) {
                    if (res instanceof BaseEvent) {
                        history.push(res);
                    }
                    return history;
                });
        }, [])
        .then(function (results) {
            return new DataChannel(results);
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

    set active(v) {
        this._active = v;
    }


    get autoreset() {
        return this._autoreset;
    }

    set autoreset(v) {
        this._autoreset = v;
    }

    get progress() {
        return this._progress;
    }
}

export default BaseRule;
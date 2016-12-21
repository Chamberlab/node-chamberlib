import assert from 'assert';
import DataChannel from '../../data/DataChannel';

class BaseRule {
    constructor(active = true, autoreset = false) {
        this._active = active;
        this._autoreset = autoreset;
    }


    evaluate(source) {
        if (this.active) {
            this.validate(source);
            if (this._autoreset) {
                this.reset();
            }
        }
        return this;
    }

    validate(source) {
        assert(source instanceof DataChannel);
        return this;
    }

    reset() {
        this._results = new DataChannel();
        return this;
    }


    get results() {
        assert(this._results instanceof DataChannel);
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
}

export default BaseRule;
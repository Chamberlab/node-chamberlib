import BaseFilter from '../base/BaseFilter';

class BandPass extends BaseFilter {
    constructor(base, width, replace = undefined) {
        super(base, replace);

        this.width = width;
    }


    filterFunc(event) {
        let inRange = event.value.normalized() >= this.base.normalized() &&
            event.value.normalized() < this.base.normalized() + this.width.normalized();

        if (inRange) {
            return event;
        } else {
            if (this._replace) {

            }
        }
    }


    get base() {
        return this._cutoff;
    }

    set base(val) {
        this.cutoff = val;
    }


    get width() {
        return this._width;
    }

    set width(width) {
        super.validate(width);
        this._width = width;
    }
}

export default BandPass;
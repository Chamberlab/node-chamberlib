import assert from 'assert';
import Dimensions from './Dimensions';

class Unit {
    constructor(title = 'Unspecified', suffix = '', ratio = 1.0, dimension = Dimensions.DIMENSION_UNSPECIFIED) {
        assert(typeof title === 'string');
        this._title = title;

        assert(typeof suffix === 'string');
        this._suffix = suffix;

        assert(typeof dimension === 'number');
        this._dimension = dimension;

        assert(typeof ratio === 'number');
        this._ratio = ratio;
    }


    get title() {
        return this._title;
    }

    get suffix() {
        return this._suffix;
    }

    get dimension() {
        return this._dimension;
    }

    get ratio() {
        return this._ratio;
    }
}

export default Unit;
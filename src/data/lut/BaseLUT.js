class BaseLUT {
    constructor() {

    }

    generate() {
        this._data = {};
        return this;
    }

    query(key) {
        return this._data[key];
    }
}

export default BaseLUT;
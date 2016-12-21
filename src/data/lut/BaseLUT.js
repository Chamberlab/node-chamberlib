class BaseLUT {
    constructor() {
        this.generate();
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
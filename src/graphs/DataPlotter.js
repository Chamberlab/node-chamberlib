import assert from 'assert';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import DataSet from '../data/DataSet';
import BaseGraph from '../graphs/BaseGraph';

class DataPlotter {
    constructor(dataSet, dirname, filename) {
        this.dataSet = dataSet;
        this.dirname = dirname;
        this.filename = filename;
    }

    generateChart(layoutClass) {
        assert(layoutClass.prototype instanceof BaseGraph);

        const _self = this;
        const chart = new layoutClass();
        return chart.draw(this.dataSet)
            .then(function (data) {
                _self.writeSVG(data, chart.constructor.name);
            });
    }

    writeSVG(data, chartType) {
        let outpath = path.join(this.dirname, this.filename + `-${chartType}.svg`);
        return Promise.promisify(fs.writeFile)(outpath, data)
            .then(() => {
                console.log(`SVG saved to ${outpath}`);
            });
    }


    get dataSet() {
        return this._dataSet;
    }

    set dataSet(dataSet) {
        assert(dataSet instanceof DataSet, `Wrong DataSet type: ${dataSet ? dataSet.constructor.name : null}`);
        assert(dataSet.size > 0, 'DataSet is empty');
        this._dataSet = dataSet;
    }

    get filename() {
        return this._filename;
    }

    set filename(val) {
        assert(typeof val === 'string');
        assert(val.length > 0);
        this._filename = val;
    }


    get dirname() {
        return this._dirname;
    }

    set dirname(val) {
        assert(typeof val === 'string');
        assert(val.length > 0);
        this._dirname = val;
    }
}

export default DataPlotter;
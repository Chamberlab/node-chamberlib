import assert from 'assert';
import path from 'path';
import fs from 'fs';
import svg2png from 'svg2png';
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
                if (Array.isArray(data)) {
                    return Promise.map(data, (gd) => {
                        return _self.writeImages(gd.data, `${gd.title}-${chart.constructor.name}`);
                    }, {concurrency: 1});
                } else {
                    return _self.writeImages(data, chart.constructor.name);
                }
            });
    }

    writeImages(data, chartType) {
        let outpath = path.join(this.dirname, this.filename);
        if (!fs.existsSync(outpath)) {
            fs.mkdirSync(outpath);
        }
        outpath = path.join(outpath, this.filename + `-${chartType}.svg`);
        // console.log(`Writing graph image SVG ${outpath}`);
        return Promise.promisify(fs.writeFile)(outpath, data)
            .then(() => {
                return Promise.promisify(fs.readFile)(outpath);
            })
            .then((data) => {
                return svg2png(data);
            })
            .then((buffer) => {
                outpath = outpath.replace(/\.svg$/, '.png');
                // console.log(`Writing graph image PNG ${outpath}`);
                return Promise.promisify(fs.writeFile)(outpath, buffer);
            })
            .catch((err) => {
                // console.error(err);
                throw err;
            });
    }


    get dataSet() {
        return this._dataSet;
    }

    set dataSet(dataSet) {
        assert(dataSet instanceof DataSet,
            `Wrong DataSet type: ${dataSet ? dataSet.constructor.name : null}`);
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
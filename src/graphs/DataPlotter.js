import 'babel-core/register';
import 'babel-polyfill';

import assert from 'assert';
import path from 'path';
import fs from 'fs';
import Promise from 'bluebird';
import DataSet from '../data/DataSet';
import LineChart from './LineChart';
import StackedStreamChart from './StackedStreamChart';

class DataPlotter {
    constructor(dataSet, filename) {
        this.dataSet = dataSet;
        this.filename = filename;
    }

    generateLineChart() {
        const _self = this;
        const lineChart = new LineChart();
        return lineChart.draw(this.dataSet)
            .then(function (data) {
                _self.writeSVG(_self.filename, data, lineChart.constructor.name);
            });
    }

    generateStackedStreamChart() {
        const _self = this;
        const stackedStreamChart = new StackedStreamChart();
        return stackedStreamChart.draw(this.dataSet)
            .then(function (data) {
                _self.writeSVG(_self.filename, data, stackedStreamChart.constructor.name);
            });
    }

    writeSVG(filename, data, chartType) {
        let fdir = path.join(__dirname, '..', '..', 'sets', filename);

        if (!fs.existsSync(fdir)) {
            fs.mkdirSync(fdir);
        }

        let outpath = path.join(fdir, filename + `-${chartType}.svg`);
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
}

export default DataPlotter;
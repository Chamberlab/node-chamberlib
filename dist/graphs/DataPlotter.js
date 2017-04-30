'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _svg2png = require('svg2png');

var _svg2png2 = _interopRequireDefault(_svg2png);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _DataSet = require('../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _BaseGraph = require('../graphs/BaseGraph');

var _BaseGraph2 = _interopRequireDefault(_BaseGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataPlotter {
    constructor(dataSet, dirname, filename) {
        this.dataSet = dataSet;
        this.dirname = dirname;
        this.filename = filename;
    }

    generateChart(layoutClass, drawSeparateChannels = false) {
        (0, _assert2.default)(layoutClass.prototype instanceof _BaseGraph2.default);

        const _self = this;
        const chart = new layoutClass();
        return chart.draw(this.dataSet, drawSeparateChannels).then(function (data) {
            if (Array.isArray(data)) {
                return _bluebird2.default.map(data, gd => {
                    return _self.writeImages(gd.data, `${gd.title}-${chart.constructor.name}`);
                }, { concurrency: 1 });
            } else {
                return _self.writeImages(data, chart.constructor.name);
            }
        });
    }

    writeImages(data, chartType) {
        let outpath = _path2.default.join(this.dirname, this.filename);
        if (!_fs2.default.existsSync(outpath)) {
            _fs2.default.mkdirSync(outpath);
        }
        outpath = _path2.default.join(outpath, this.filename + `-${chartType}.svg`);
        // console.log(`Writing graph image SVG ${outpath}`);
        return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, data).then(() => {
            return _bluebird2.default.promisify(_fs2.default.readFile)(outpath);
        }).then(data => {
            return (0, _svg2png2.default)(data);
        }).then(buffer => {
            outpath = outpath.replace(/\.svg$/, '.png');
            // console.log(`Writing graph image PNG ${outpath}`);
            return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, buffer);
        }).catch(err => {
            // console.error(err);
            throw err;
        });
    }

    get dataSet() {
        return this._dataSet;
    }

    set dataSet(dataSet) {
        (0, _assert2.default)(dataSet instanceof _DataSet2.default, `Wrong DataSet type: ${dataSet ? dataSet.constructor.name : null}`);
        (0, _assert2.default)(dataSet.size > 0, 'DataSet is empty');
        this._dataSet = dataSet;
    }

    get filename() {
        return this._filename;
    }

    set filename(val) {
        (0, _assert2.default)(typeof val === 'string');
        (0, _assert2.default)(val.length > 0);
        this._filename = val;
    }

    get dirname() {
        return this._dirname;
    }

    set dirname(val) {
        (0, _assert2.default)(typeof val === 'string');
        (0, _assert2.default)(val.length > 0);
        this._dirname = val;
    }
}

exports.default = DataPlotter;
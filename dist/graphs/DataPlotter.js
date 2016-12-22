'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _DataSet = require('../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _BaseGraph = require('../graphs/BaseGraph');

var _BaseGraph2 = _interopRequireDefault(_BaseGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataPlotter = function () {
    function DataPlotter(dataSet, dirname, filename) {
        (0, _classCallCheck3.default)(this, DataPlotter);

        this.dataSet = dataSet;
        this.dirname = dirname;
        this.filename = filename;
    }

    (0, _createClass3.default)(DataPlotter, [{
        key: 'generateChart',
        value: function generateChart(layoutClass) {
            (0, _assert2.default)(layoutClass.prototype instanceof _BaseGraph2.default);

            var _self = this;
            var chart = new layoutClass();
            return chart.draw(this.dataSet).then(function (data) {
                _self.writeSVG(data, chart.constructor.name);
            });
        }
    }, {
        key: 'writeSVG',
        value: function writeSVG(data, chartType) {
            var outpath = _path2.default.join(this.dirname, this.filename + ('-' + chartType + '.svg'));
            return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, data).then(function () {
                console.log('SVG saved to ' + outpath);
            });
        }
    }, {
        key: 'dataSet',
        get: function get() {
            return this._dataSet;
        },
        set: function set(dataSet) {
            (0, _assert2.default)(dataSet instanceof _DataSet2.default, 'Wrong DataSet type: ' + (dataSet ? dataSet.constructor.name : null));
            (0, _assert2.default)(dataSet.size > 0, 'DataSet is empty');
            this._dataSet = dataSet;
        }
    }, {
        key: 'filename',
        get: function get() {
            return this._filename;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string');
            (0, _assert2.default)(val.length > 0);
            this._filename = val;
        }
    }, {
        key: 'dirname',
        get: function get() {
            return this._dirname;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string');
            (0, _assert2.default)(val.length > 0);
            this._dirname = val;
        }
    }]);
    return DataPlotter;
}();

exports.default = DataPlotter;
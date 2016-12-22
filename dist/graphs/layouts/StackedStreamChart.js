'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _BaseGraph2 = require('../BaseGraph');

var _BaseGraph3 = _interopRequireDefault(_BaseGraph2);

var _ColourTable = require('../../data/lut/ColourTable');

var _ColourTable2 = _interopRequireDefault(_ColourTable);

var _Defaults = require('./Defaults');

var _Defaults2 = _interopRequireDefault(_Defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StackedStreamChart = function (_BaseGraph) {
    (0, _inherits3.default)(StackedStreamChart, _BaseGraph);

    function StackedStreamChart() {
        (0, _classCallCheck3.default)(this, StackedStreamChart);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StackedStreamChart.__proto__ || (0, _getPrototypeOf2.default)(StackedStreamChart)).call(this));

        _this._quantize = true;
        return _this;
    }

    (0, _createClass3.default)(StackedStreamChart, [{
        key: 'drawContent',
        value: function drawContent(d3env, layerData, g) {
            (0, _get3.default)(StackedStreamChart.prototype.__proto__ || (0, _getPrototypeOf2.default)(StackedStreamChart.prototype), 'drawContent', this).call(this);

            var stack = d3env.d3.layout.stack().offset("wiggle"),
                layers = stack(d3env.d3.range(layerData.length).map(function (i) {
                return layerData[i];
            }));

            var x = d3env.d3.scale.linear().domain([0, _Defaults2.default.SECONDS_LENGTH]).range([0, d3env.width]);

            d3env.xAxis = d3env.d3.svg.axis().scale(x).orient("bottom").ticks(_Defaults2.default.SECONDS_LENGTH * 0.1);

            var ymax = d3env.d3.max(layers, function (layer) {
                return d3env.d3.max(layer, function (d) {
                    return d.y0 + d.y;
                });
            }),
                y = d3env.d3.scale.linear().domain([0, ymax]).range([d3env.height, 0]);

            var area = d3env.d3.svg.area().x(function (d) {
                return x(d.x);
            }).y0(function (d) {
                return y(d.y0);
            }).y1(function (d) {
                return y(d.y0 + d.y);
            });

            var colourList = new _ColourTable2.default(layerData.length, 5);

            g.selectAll("svg:path").data(layers).enter().append("svg:path").attr("d", area).style("stroke", function (d, i) {
                return colourList.colours[i];
            }).style("fill", function (d, i) {
                return colourList.colours[i];
            });

            return _bluebird2.default.resolve([d3env, layerData, g]);
        }
    }]);
    return StackedStreamChart;
}(_BaseGraph3.default);

exports.default = StackedStreamChart;
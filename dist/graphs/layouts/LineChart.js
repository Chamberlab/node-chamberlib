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

var LineChart = function (_BaseGraph) {
    (0, _inherits3.default)(LineChart, _BaseGraph);

    function LineChart() {
        (0, _classCallCheck3.default)(this, LineChart);
        return (0, _possibleConstructorReturn3.default)(this, (LineChart.__proto__ || (0, _getPrototypeOf2.default)(LineChart)).call(this));
    }

    (0, _createClass3.default)(LineChart, [{
        key: 'drawContent',
        value: function drawContent(d3env, layerData, g) {
            (0, _get3.default)(LineChart.prototype.__proto__ || (0, _getPrototypeOf2.default)(LineChart.prototype), 'drawContent', this).call(this);

            var x = d3env.d3.scale.linear().range([0, d3env.width]),
                y = d3env.d3.scale.linear().range([d3env.height, 0]),
                ymax = 0.0;

            var line = d3env.d3.svg.line().x(function (d) {
                return x(d.x);
            }).y(function (d) {
                return y(d.y);
            });

            for (var i in layerData) {
                var _ymax = d3env.d3.max(layerData[i], function (d) {
                    return d.y;
                });
                if (_ymax > ymax) {
                    ymax = _ymax;
                }
            }

            x.domain([0, _Defaults2.default.SECONDS_LENGTH]);
            y.domain([0, ymax]);

            var colourList = new _ColourTable2.default(layerData.length, 5);

            for (var _i in layerData) {
                g.append("svg:path").attr("class", "line").style("stroke", colourList.colours[_i]).style("fill", "none").style("alpha", "0.8").style("stroke-width", "0.8").attr("d", line(layerData[_i]));
            }

            d3env.yAxis = d3env.d3.svg.axis().scale(y).orient("left").ticks(ymax * 10.0);

            // d3env.xAxis = d3env.d3.svg.axis().scale(x)
            //    .orient("bottom").ticks(Defaults.SECONDS_LENGTH * 0.1);

            g.append("g").attr("class", "y axis").style("color", "#cccccc").style("fill", "none").style("stroke", "#cccccc").style("stroke-width", "0.8").call(d3env.yAxis);

            return _bluebird2.default.resolve([d3env, layerData, g]);
        }
    }]);
    return LineChart;
}(_BaseGraph3.default);

exports.default = LineChart;
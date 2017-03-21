'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _BaseGraph = require('../BaseGraph');

var _BaseGraph2 = _interopRequireDefault(_BaseGraph);

var _Colours = require('../../data/lut/Colours');

var _Colours2 = _interopRequireDefault(_Colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME: update this to use d3 4.x

class StackedStreamChart extends _BaseGraph2.default {
    constructor() {
        super();

        this._quantize = require('../../../config/layouts/StackedStreamChart.json').quantize;
    }

    drawContent(d3env, layerData, g) {
        super.drawContent();

        // TODO: fix stacked stream layout

        d3env.layoutConfig = require('../../../config/layouts/StackedStreamChart.json');

        let stack = d3env.d3.layout.stack().offset('wiggle'),
            layers = stack(d3env.d3.range(layerData.length).map(function (i) {
            return layerData[i];
        }));

        let x = d3env.d3.scale.linear().domain([0, d3env.duration]).range([0, d3env.width]);

        d3env.xAxis = d3env.d3.svg.axis().scale(x).orient('bottom').ticks(d3env.duration * 0.1);

        let ymax = d3env.d3.max(layers, function (layer) {
            return d3env.d3.max(layer, function (d) {
                return d.y0 + d.y;
            });
        }),
            y = d3env.d3.scale.linear().domain([0, ymax]).range([d3env.height, 0]);

        let area = d3env.d3.svg.area().x(function (d) {
            return x(d.x);
        }).y0(function (d) {
            return y(d.y0);
        }).y1(function (d) {
            return y(d.y0 + d.y);
        });

        let colourList = new _Colours2.default(layerData.length, 5);

        g.selectAll('svg:path').data(layers).enter().append('svg:path').attr('d', area).style('stroke', (d, i) => {
            return colourList.colours[i];
        }).style('fill', (d, i) => {
            return colourList.colours[i];
        });

        return _bluebird2.default.resolve([d3env, layerData, g]);
    }
}

exports.default = StackedStreamChart;
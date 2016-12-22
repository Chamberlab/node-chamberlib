import Promise from 'bluebird';
import BaseGraph from '../BaseGraph';
import ColourTable from '../../data/lut/ColourTable';

class LineChart extends BaseGraph {
    constructor() {
        super();
    }

    drawContent(d3env, layerData, g) {
        super.drawContent();

        d3env.layoutConfig = require('../../../config/layouts/LineChart.json');

        let x = d3env.d3.scale.linear().range([0, d3env.width]),
            y = d3env.d3.scale.linear().range([d3env.height, 0]),
            ymax = 0.0;

        let line = d3env.d3.svg.line()
            .x(function(d) { return x(d.x); })
            .y(function(d) { return y(d.y); });

        for (let i in layerData) {
            let _ymax = d3env.d3.max(layerData[i], function (d) {
                return d.y;
            });
            if (_ymax > ymax) {
                ymax = _ymax;
            }
        }

        x.domain([0, d3env.duration]);
        y.domain([0, ymax]);

        let colourList = new ColourTable(layerData.length, 5);

        for (let i in layerData) {
            g.append("svg:path")
                .attr("class", "line")
                .style("stroke", colourList.colours[i])
                .style("fill", "none")
                .style("alpha", "0.8")
                .style("stroke-width", "0.8")
                .attr("d", line(layerData[i]));
        }

        if (d3env.layoutConfig.xAxis.show) {
            d3env.xAxis = d3env.d3.svg.axis().scale(x)
                .orient("bottom").ticks(d3env.duration * d3env.layoutConfig.xAxis.scaleTicks);
            g.append("g")
                .attr("class", "x axis")
                .style("color", d3env.layoutConfig.xAxis.colour)
                .style("fill", "none")
                .style("stroke", d3env.layoutConfig.xAxis.colour)
                .style("stroke-width", d3env.layoutConfig.xAxis['stroke-width'])
                .attr("transform", "translate(0," + d3env.docHeight + ")")
                .call(d3env.xAxis);
        }

        if (d3env.layoutConfig.yAxis.show) {
            d3env.yAxis = d3env.d3.svg.axis().scale(y)
                .orient("left").ticks(ymax * d3env.layoutConfig.yAxis.scaleTicks);
            g.append("g")
                .attr("class", "y axis")
                .style("color", d3env.layoutConfig.yAxis.colour)
                .style("fill", "none")
                .style("stroke", d3env.layoutConfig.yAxis.colour)
                .style("stroke-width", d3env.layoutConfig.yAxis['stroke-width'])
                .call(d3env.yAxis);
        }

        return Promise.resolve([d3env, layerData, g]);
    }
}

export default LineChart;
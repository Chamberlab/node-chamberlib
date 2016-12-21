import 'babel-core/register';
import 'babel-polyfill';

import Promise from 'bluebird';
import BaseGraph from './BaseGraph';
import ColourTable from './ColourTable';
import Defaults from './Defaults';

class LineChart extends BaseGraph {
    constructor() {
        super();
    }

    drawContent(d3env, layerData, g) {
        super.drawContent();

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

        x.domain([0, Defaults.SECONDS_LENGTH]);
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

        d3env.yAxis = d3env.d3.svg.axis().scale(y)
            .orient("left").ticks(ymax * 10.0);

        // d3env.xAxis = d3env.d3.svg.axis().scale(x)
        //    .orient("bottom").ticks(Defaults.SECONDS_LENGTH * 0.1);

        g.append("g")
            .attr("class", "y axis")
            .style("color", "#cccccc")
            .style("fill", "none")
            .style("stroke", "#cccccc")
            .style("stroke-width", "0.8")
            .call(d3env.yAxis);

        return Promise.resolve([d3env, layerData, g]);
    }
}

export default LineChart;
import Promise from 'bluebird';
import BaseGraph from '../BaseGraph';
import ColourTable from '../../data/lut/ColourTable';

// FIXME: update this to use d3 4.x

class LineChart extends BaseGraph {
    constructor() {
        super();
    }

    drawContent(d3env, layerData, g) {
        super.drawContent();

        d3env.layoutConfig = require('../../../config/layouts/LineChart.json');

        let x = d3env.d3.scale.linear().range([0, d3env.width]),
            y = d3env.d3.scale.linear().range([d3env.height, 0]);

        let line = d3env.d3.svg.line()
            .x((d) => { return x(d.x); })
            .y((d) => { return y(d.y); });

        x.domain([d3env.minX, d3env.maxX]);
        y.domain([d3env.minY, d3env.maxY]);

        let colourList = new ColourTable(layerData.length, 5);

        if (d3env.layoutConfig.xAxis.show) {
            d3env.xAxis = d3env.d3.svg.axis().scale(x)
                .orient("bottom").ticks(d3env.maxX / d3env.layoutConfig.xAxis.scaleTicks);
            g.append("g")
                .attr("class", "x axis")
                .style("color", d3env.layoutConfig.xAxis.colour)
                .style("fill", "none")
                .style("stroke", d3env.layoutConfig.xAxis.colour)
                .style("stroke-width", d3env.layoutConfig.xAxis['stroke-width'])
                .attr("transform", "translate(0," + d3env.height + ")")
                .call(d3env.xAxis);
        }

        for (let i in layerData) {
            g.append("svg:path")
                .attr("class", "line")
                .style("stroke", colourList.colours[i])
                .style("fill", "none")
                .style("alpha", "0.8")
                .style("stroke-width", "0.8")
                .attr("d", line(layerData[i]));
        }

        // TODO: plotter croaks on very large values because of axis ticks

        if (d3env.layoutConfig.yAxis.show) {
            d3env.yAxis = d3env.d3.svg.axis().scale(y)
                .orient("left").ticks(d3env.maxY / d3env.layoutConfig.yAxis.scaleTicks);
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
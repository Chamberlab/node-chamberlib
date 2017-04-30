import Promise from 'bluebird';
import BaseGraph from '../BaseGraph';
import ColourTable from '../../data/lut/Colours';

// FIXME: update this to use d3 4.x

class ScatterPlot extends BaseGraph {
    constructor() {
        super();
    }

    drawContent(d3env, layerData, g) {
        super.drawContent();

        d3env.layoutConfig = require('../../../config/layouts/ScatterPlot.json');

        let x = d3env.d3.scale.linear().range([0, d3env.width]),
            y = d3env.d3.scale.linear().range([d3env.height, 0]);

        x.domain([d3env.minX.scalar, d3env.maxX.scalar]);
        y.domain([d3env.minY.scalar, d3env.maxY.scalar]);

        let colourList = new ColourTable(layerData.length, 5);

        if (d3env.layoutConfig.xAxis.show) {
            d3env.xAxis = d3env.d3.svg.axis().scale(x)
                .orient('bottom').ticks(d3env.maxX.scalar / d3env.layoutConfig.xAxis.scaleTicks);
            g.append('g')
                .attr('class', 'x axis')
                .style('color', d3env.layoutConfig.xAxis.colour)
                .style('fill', 'none')
                .style('stroke', d3env.layoutConfig.xAxis.colour)
                .style('stroke-width', d3env.layoutConfig.xAxis['stroke-width'])
                .attr('transform', 'translate(0,' + d3env.height + ')')
                .call(d3env.xAxis);
        }

        return Promise.map(layerData, (data, i) => {
            let xValue = (d) => {
                    return d.x;
                },
                yValue = (d) => {
                    return d.y;
                };
            g.selectAll('.dot')
                .data(data)
                .enter().append('circle')
                .attr('r', d3env.layoutConfig.radius)
                .attr('cx', (d) => {
                    return x(xValue(d));
                })
                .attr('cy', (d) => {
                    return y(yValue(d));
                })
                .style('fill', () => {
                    return colourList.colours[i];
                })
                .style('alpha', d3env.layoutConfig.alpha);
        }, {concurrency: 1})
        .then(() => {
            if (d3env.layoutConfig.yAxis.show) {
                d3env.yAxis = d3env.d3.svg.axis().scale(y)
                    .orient('left').ticks(d3env.maxY.scalar / d3env.layoutConfig.yAxis.scaleTicks);
                g.append('g')
                    .attr('class', 'y axis')
                    .style('color', d3env.layoutConfig.yAxis.colour)
                    .style('fill', 'none')
                    .style('stroke', d3env.layoutConfig.yAxis.colour)
                    .style('stroke-width', d3env.layoutConfig.yAxis['stroke-width'])
                    .call(d3env.yAxis);
            }

            return Promise.resolve([d3env, layerData, g]);
        });
    }
}

export default ScatterPlot;
import BaseGraph from './BaseGraph';
import ColourTable from './ColourTable';
import Defaults from './Defaults';

class StackedStreamChart extends BaseGraph {
    drawGraph(context, layerData, g) {
        let d3 = context.d3,
            stack = d3.layout.stack().offset("wiggle"),
            layers = stack(d3.range(layerData.length).map(function (i) {
                return layerData[i];
            }));

        let x = d3.scale.linear()
            .domain([0, Defaults.SECONDS_LENGTH])
            .range([0, context.width]);

        context.xAxis = d3.svg.axis().scale(x)
            .orient("bottom").ticks(Defaults.SECONDS_LENGTH * 0.1);

        let ymax = d3.max(layers, function (layer) {
                return d3.max(layer, function (d) {
                    return d.y0 + d.y;
                });
            }),
            y = d3.scale.linear()
                .domain([0, ymax])
                .range([context.height, 0]);

        let area = d3.svg.area()
            .x(function (d) {
                return x(d.x);
            })
            .y0(function (d) {
                return y(d.y0);
            })
            .y1(function (d) {
                return y(d.y0 + d.y);
            });

        let colourList = new ColourTable(layerData.length, 5);

        g.selectAll("svg:path")
            .data(layers)
            .enter().append("svg:path")
            .attr("d", area)
            .style("stroke", (d, i) => {
                return colourList.colours[i];
            })
            .style("fill", (d, i) => {
                return colourList.colours[i];
            });
    }
}

export default StackedStreamChart;
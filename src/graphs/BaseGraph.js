import d3 from 'd3';
import jsdom from 'jsdom';
import Defaults from './Defaults';
import Promise from 'bluebird';

class BaseGraph {
    constructor() {

    }

    jsdomEnv() {
        let _self = this;
        jsdom.env({
            features: {QuerySelector: true}, html: Defaults.HTML_STUB,
            done: Promise.coroutine(function* (err, window) {
                console.log('Loading data...');

                this.d3 = d3.select(window.document);

                _self._width = Math.ceil(Defaults.SECONDS_LENGTH * Defaults.DEFAULT_PPS);
                _self._height = Defaults.DEFAULT_HEIGHT - Defaults.DEFAULT_MARGIN_Y;

                let xAxis,
                    w = Math.ceil(Defaults.SECONDS_LENGTH * Defaults.DEFAULT_PPS + Defaults.DEFAULT_MARGIN_LEFT * 2),
                    h = Defaults.DEFAULT_HEIGHT,
                    g = window.d3.select('body').append('div')
                    .attr('width', w).attr('height', h).attr('class','container').append('svg')
                    .attr('width', w).attr('height', h).attr('class','container').append('g')
                    .attr('transform',`translate(${Defaults.DEFAULT_MARGIN_LEFT}, ${Defaults.DEFAULT_MARGIN_Y * 0.5})`);

                g.append("rect")
                    .attr("x", 0 - Defaults.DEFAULT_MARGIN_LEFT).attr("y", 0 - Defaults.DEFAULT_MARGIN_Y * 0.5)
                    .attr("width", 5).attr("height", Defaults.DEFAULT_HEIGHT)
                    .style("stroke", "none").style("fill", "transparent");

                g.append("rect")
                    .attr("x", Math.ceil(Defaults.SECONDS_LENGTH * Defaults.DEFAULT_PPS +
                            Defaults.DEFAULT_MARGIN_LEFT * 2) - 5 - Defaults.DEFAULT_MARGIN_LEFT)
                    .attr("y", 0 - Defaults.DEFAULT_MARGIN_Y * 0.5).attr("width", 5)
                    .attr("height", Defaults.DEFAULT_HEIGHT).style("stroke", "none").style("fill", "transparent");


                yield this.drawGraph(this);


                if (xAxis) {
                    g.append("g")
                        .attr("class", "x axis")
                        .style("color", "#cccccc")
                        .style("fill", "none")
                        .style("stroke", "#cccccc")
                        .style("stroke-width", "0.8")
                        .attr("transform", "translate(0," + h + ")")
                        .call(xAxis);
                }
            })
        });
    }


    drawGraph() {
        /* ignored */
    }


    prepareData(data) {
        let layerData = [],
            layerCount = 0, layerMax = 0,
            layerRes = Defaults.SECONDS_LENGTH;

        return Promise.coroutine(function* () {
            yield Promise.map(data, function (group) {
                let _layer = [];

                console.log(`Processing group: ${group.name}`);

                if (!Array.isArray(group.units)) {
                    console.log('WARNING: skipping non-array: units');
                    return;
                }

                return Promise.map(group.units, function (unit) {
                    console.log(`Processing unit: ${unit.name}`);

                    if (!Array.isArray(unit.spiketrains)) {
                        console.log('WARNING: skipping non-array: spiketrains');
                        return;
                    }

                    return Promise.map(unit.spiketrains, function (sptr) {
                        let last_t = 0.0;

                        console.log(`Processing spike train from ${sptr.t_min}s-${sptr.t_max}s`);

                        if (!Array.isArray(sptr.times) || !Array.isArray(sptr.waveforms)) {
                            console.log('WARNING: skipping non-array: times || waveforms');
                            return;
                        }

                        if (sptr.times.length !== sptr.waveforms.length) {
                            console.log(`WARNING: uneven lengths in times (${sptr.times.length})` +
                                ` & waveforms (${sptr.waveforms.length})`);
                        }

                        for (let i in sptr.times) {
                            layerRes = Math.min(
                                Math.max(sptr.times[i] - last_t, Defaults.MAX_LAYER_RES), Defaults.MAX_LAYER_RES);
                            last_t = sptr.times[i];
                            _layer.push({x: sptr.times[i], y: sptr.waveforms[i].dyn});
                        }

                        layerCount += 1;

                    }, {concurrency: 1});
                }, {concurrency: 1})
                    .then(() => {
                        _layer.sort((a, b) => {
                            if (a.x < b.x) {
                                return -1;
                            }
                            return 1;
                        });

                        layerData.push(_layer);

                        if (_layer.length > layerMax) {
                            layerMax = _layer.length;
                        }
                    });

            }, {concurrency: 1});

            if (Defaults.QUANTIZE) {
                let lsteps = Math.ceil(Defaults.SECONDS_LENGTH / layerRes),
                    quantizedLayers = [];

                while (layerData.length > 0) {
                    let ld = layerData.shift(),
                        quant = [];
                    for (let n = 0; n < lsteps; n += 1) {
                        quant.push({x: n * layerRes, y: 0.0});
                    }
                    for (let t = 0; t < ld.length; t += 1) {
                        let idx = Math.floor(ld[t].x / layerRes);
                        if (ld[t].y > quant[idx].y) {
                            quant[idx].y = ld[t].y;
                        }
                    }
                    quantizedLayers.push(quant);
                }

                layerData = layerData.concat(quantizedLayers);
            }

            return layerData;
        })();
    }
}

export default BaseGraph;
import * as d3 from 'd3';
import jsdom from 'jsdom';
import Defaults from './layouts/Defaults';
import Promise from 'bluebird';

class BaseGraph {
    constructor() {
        this._d3env = {};
        this._layerData = null;
        this._g = null;

        this._quantize = false;
    }


    draw(dataSet) {
        const _self = this;
        return _self.prepareData(dataSet)
            .then(function (res) {
                _self.layerData = res;
                return Promise.promisify(_self.jsdomEnv)(_self.d3env, _self.layerData, _self.g,
                    _self.drawContent, _self.quantize ? _self.quantizeData : null);
            });
    }

    jsdomEnv(d3env, layerData, g, drawContent, quantizeData, cb) {
        // TODO: update d3 to version 4
        // TODO: clean up graph config

        d3env.width = Math.ceil(Defaults.SECONDS_LENGTH * Defaults.DEFAULT_PPS);
        d3env.height = Defaults.DEFAULT_HEIGHT - Defaults.DEFAULT_MARGIN_Y;
        d3env.d3 = {};
        Object.assign(d3env.d3, d3);
        return jsdom.env({
            features: {QuerySelector: true}, html: Defaults.HTML_STUB,
            done: function (err, window) {
                window.d3 = d3env.d3.select(window.document);

                d3env.window = window;

                d3env._width = Math.ceil(Defaults.SECONDS_LENGTH * Defaults.DEFAULT_PPS);
                d3env._height = Defaults.DEFAULT_HEIGHT - Defaults.DEFAULT_MARGIN_Y;

                d3env.w = Math.ceil(Defaults.SECONDS_LENGTH * Defaults.DEFAULT_PPS + Defaults.DEFAULT_MARGIN_LEFT * 2);
                d3env.h = Defaults.DEFAULT_HEIGHT;
                g = window.d3.select('body').append('div')
                    .attr('width', d3env.w).attr('height', d3env.h).attr('class','container').append('svg')
                    .attr('width', d3env.w).attr('height', d3env.h).attr('class','container').append('g')
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


                Promise.resolve()
                    .then(function () {
                        if (typeof quantizeData === 'function') {
                            return quantizeData(layerData, d3env);
                        } else {
                            return Promise.resolve();
                        }
                    })
                    .then(function () {
                        return drawContent(d3env, layerData, g)
                            .then(function () {
                                if (d3env.xAxis) {
                                    g.append("g")
                                        .attr("class", "x axis")
                                        .style("color", "#cccccc")
                                        .style("fill", "none")
                                        .style("stroke", "#cccccc")
                                        .style("stroke-width", "0.8")
                                        .attr("transform", "translate(0," + d3env.h + ")")
                                        .call(d3env.xAxis);
                                }

                                cb(null, d3env.window.d3.select('.container').html());
                            });
                    });
            }
        });
    }


    drawContent() {
        /* ignored */
    }


    prepareData(dataSet) {
        const _self = this;
        this.layerData = [];
        this.d3env.layerCount = 0;
        this.d3env.layerMax = 0;
        this.d3env.layerRes = Defaults.SECONDS_LENGTH;

        return Promise.map(dataSet.all, Promise.coroutine(function* (channel) {
            let last_t = 0.0,
                events = channel.all.sort(function (a, b) {
                if (a.time.normalized() > b.time.normalized()) {
                    return 1;
                } else if (a.time.normalized() < b.time.normalized()) {
                    return -1;
                }
                return 0;
            });

            events = yield Promise.map(events, function (event) {
                _self.d3env.layerRes = Math.min(Math.max(event.time.normalized() - last_t,
                    Defaults.MAX_LAYER_RES), Defaults.MAX_LAYER_RES);
                last_t = event.time.normalized();
                return { x: event.time.normalized(), y: event.value.normalized() };
            });

            _self.d3env.layerCount += 1;

            return events;
        }));
    }


    quantizeData(layerData, d3env) {
        let lsteps = Math.ceil(Defaults.SECONDS_LENGTH / d3env.layerRes),
            quantizedLayers = [];

        while (layerData.length > 0) {
            let ld = layerData.shift(),
                quant = [];
            for (let n = 0; n < lsteps; n += 1) {
                quant.push({x: n * d3env.layerRes, y: 0.0});
            }
            for (let t = 0; t < ld.length; t += 1) {
                let idx = Math.floor(ld[t].x / d3env.layerRes);
                if (ld[t].y > quant[idx].y) {
                    quant[idx].y = ld[t].y;
                }
            }
            quantizedLayers.push(quant);
        }

        return layerData.concat(quantizedLayers);
    }


    get d3env() {
        return this._d3env;
    }

    set d3env(val) {
        this._d3env = val;
    }


    get layerData() {
        return this._layerData;
    }

    set layerData(val) {
        this._layerData = val;
    }


    get g() {
        return this._g;
    }

    set g(val) {
        this._g = val;
    }

    get quantize() {
        return this._quantize;
    }

    set quantize(val) {
        this._quantize = val;
    }
}

export default BaseGraph;
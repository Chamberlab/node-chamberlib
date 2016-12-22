import * as d3 from 'd3';
import jsdom from 'jsdom';
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

        d3env.width = Math.ceil(d3env.duration * d3env.config.pixelsPerSecond);
        d3env.height = d3env.config.displayDimensions.height - d3env.config.margins.top - d3env.config.margins.bottom;
        d3env.d3 = {};
        Object.assign(d3env.d3, d3);
        return jsdom.env({
            features: {QuerySelector: true}, html: '<!DOCTYPE html><html><head></head><body>' +
            '<script src="http://d3js.org/d3.v3.min.js"></script></body></html>',
            done: function (err, window) {
                window.d3 = d3env.d3.select(window.document);
                d3env.window = window;
                d3env.docWidth = d3env.width + d3env.config.margins.left + d3env.config.margins.right;
                d3env.docHeight = d3env.config.displayDimensions.height;

                g = window.d3.select('body').append('div')
                    .attr('width', d3env.docWidth).attr('height', d3env.docHeight)
                    .attr('class','container').append('svg')
                    .attr('width', d3env.docWidth).attr('height', d3env.docHeight)
                    .attr('class','container').append('g')
                    .attr('transform',`translate(${d3env.config.margins.left}, ${d3env.config.margins.top})`);

                g.append("rect")
                    .attr("x", 0 - d3env.config.margins.left)
                    .attr("y", 0 - d3env.config.margins.top)
                    .attr("width", 5)
                    .attr("height", d3env.docHeight)
                    .style("stroke", "none").style("fill", "transparent");

                g.append("rect")
                    .attr("x", d3env.docWidth - 5 - d3env.config.margins.left)
                    .attr("y", 0 - d3env.config.margins.top)
                    .attr("width", 5)
                    .attr("height", d3env.docHeight)
                    .style("stroke", "none").style("fill", "transparent");


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
        this.d3env.config = this.config;
        this.d3env.layerCount = 0;
        this.d3env.layerMax = 0;
        this.d3env.layerStats = [];
        this.d3env.maxX = 0;
        this.d3env.maxY = 0;
        this.d3env.duration = 0;
        this.d3env.layerRes = Number.MAX_SAFE_INTEGER;

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

            let stats = channel.stats;
            _self.d3env.layerStats.push(stats);

            _self.d3env.duration = Math.max(_self.d3env.duration, stats.duration.normalized());
            _self.d3env.maxX = Math.max(_self.d3env.maxX, stats.time.max.normalized());
            _self.d3env.minX = Math.min(_self.d3env.minX, stats.time.min.normalized());
            _self.d3env.maxY = Math.max(_self.d3env.maxY, stats.value.max.normalized());
            _self.d3env.minY = Math.min(_self.d3env.minY, stats.value.min.normalized());

            events = yield Promise.map(events, function (event) {
                _self.d3env.layerRes = Math.min(Math.max(event.time.normalized() - last_t,
                    _self.config.layerResolutionLimit), _self.config.layerResolutionLimit);
                last_t = event.time.normalized();
                return { x: event.time.normalized(), y: event.value.normalized() };
            });

            _self.d3env.layerCount += 1;

            return events;
        }));
    }


    quantizeData(layerData, d3env) {
        let lsteps = Math.ceil(d3env.duration / d3env.layerRes),
            quantizedLayers = [];

        while (layerData.length > 0) {
            let ld = layerData.shift(),
                quant = [];
            for (let n = 0; n < lsteps; n += 1) {
                quant.push({x: n * d3env.layerRes, y: 0.0});
            }
            for (let t = 0; t < ld.length && t < quant.length; t += 1) {
                let idx = Math.floor(ld[t].x / d3env.layerRes);
                if (ld[t] && quant[idx] && ld[t].y > quant[idx].y) {
                    quant[idx].y = ld[t].y;
                }
            }
            quantizedLayers.push(quant);
        }

        return layerData.concat(quantizedLayers);
    }


    get config() {
        return require('../../config/graphs.json');
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
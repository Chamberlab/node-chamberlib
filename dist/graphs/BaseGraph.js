'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// FIXME: update this to use d3 4.x

class BaseGraph {
    constructor() {
        this._d3env = {};
        this._layerData = null;
        this._g = null;

        this._quantize = false;
    }

    draw(dataSet, drawSeparateChannels = false) {
        const _self = this;
        let d3env;
        return _self.prepareData(dataSet).then(function (res) {
            _self.layerData = res;
            d3env = Object.assign({}, _self.d3env);
            if (drawSeparateChannels) {
                return _bluebird2.default.map(_self.layerData, (ld, i) => {
                    d3env.layerData = [ld];
                    d3env.layerCount = 1;
                    d3env.layerStats = [_self.d3env.layerStats[i]];
                    d3env.channels = [_self.d3env.channels[i]];
                    d3env.channelTitle = [_self.d3env.channelTitles[i]].join('-');
                    // console.log(`Creating graph for channel ${d3env.channelTitle}`);
                    return _bluebird2.default.promisify(_self.jsdomEnv)(d3env, d3env.layerData, d3env.g, _self.drawContent, _self.quantize ? _self.quantizeData : null).then(data => {
                        return { data: data, title: d3env.channelTitle };
                    });
                }, { concurrency: 1 });
            } else {
                return [];
            }
        }).then(graphs => {
            // console.log('Creating graph for all channels');
            return _bluebird2.default.promisify(_self.jsdomEnv)(_self.d3env, _self.layerData, d3env.g, _self.drawContent, _self.quantize ? _self.quantizeData : null).then(data => {
                graphs.push({ data: data, title: 'all' });
                return graphs;
            });
        });
    }

    jsdomEnv(d3env, layerData, g, drawContent, quantizeData, cb) {
        // TODO: update d3 to version 4

        d3env.width = Math.ceil(d3env.duration.scalar * d3env.config.pixelsPerSecond);
        d3env.height = d3env.config.displayDimensions.height - d3env.config.margins.top - d3env.config.margins.bottom;
        d3env.d3 = {};
        Object.assign(d3env.d3, d3);
        return _jsdom2.default.env({
            features: { QuerySelector: true }, html: '<!DOCTYPE html><html><head></head><body>' + '<script src="http://d3js.org/d3.v3.min.js"></script></body></html>',
            done: function (err, window) {
                window.d3 = d3env.d3.select(window.document);
                d3env.window = window;
                d3env.docWidth = d3env.width + d3env.config.margins.left + d3env.config.margins.right;
                d3env.docHeight = d3env.config.displayDimensions.height;

                g = window.d3.select('body').append('div').attr('width', d3env.docWidth).attr('height', d3env.docHeight).attr('class', 'container').append('svg').attr('width', d3env.docWidth).attr('height', d3env.docHeight).attr('class', 'container').append('g').attr('transform', `translate(${d3env.config.margins.left}, ${d3env.config.margins.top})`);

                g.append('rect').attr('x', 0 - d3env.config.margins.left).attr('y', 0 - d3env.config.margins.top).attr('width', d3env.docWidth + d3env.config.margins.left).attr('height', d3env.docHeight).style('stroke', 'none').style('fill', 'black');

                _bluebird2.default.resolve().then(() => {
                    if (typeof quantizeData === 'function') {
                        return quantizeData(layerData, d3env);
                    } else {
                        return _bluebird2.default.resolve();
                    }
                }).then(() => {
                    return drawContent(d3env, layerData, g).then(() => {
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
        this.d3env.minX = (0, _jsQuantities2.default)(Number.MAX_SAFE_INTEGER, 's');
        this.d3env.minY = (0, _jsQuantities2.default)(Number.MAX_SAFE_INTEGER, 'mV');
        this.d3env.maxX = (0, _jsQuantities2.default)(Number.MIN_SAFE_INTEGER, 's');
        this.d3env.maxY = (0, _jsQuantities2.default)(Number.MIN_SAFE_INTEGER, 'mV');
        this.d3env.duration = (0, _jsQuantities2.default)(0, 's');
        this.d3env.layerRes = (0, _jsQuantities2.default)(Number.MAX_SAFE_INTEGER, 's');
        this.d3env.channels = [];
        this.d3env.channelTitles = [];

        const eventData = [];

        return _bluebird2.default.map(dataSet.all, _bluebird2.default.coroutine(function* (channel) {
            if (channel.length === 0) {
                return;
            }

            let last_t = (0, _jsQuantities2.default)(0.0, 's'),
                events = channel.all.sort(function (a, b) {
                if (a.time.gt(b.time)) {
                    return 1;
                } else if (a.time.lt(b.time)) {
                    return -1;
                }
                return 0;
            });

            let stats = channel.stats;
            _self.d3env.channels.push(channel.uuid);
            _self.d3env.channelTitles.push(channel.title);
            _self.d3env.layerStats.push(stats);

            _self.d3env.duration = (0, _jsQuantities2.default)(Math.max(_self.d3env.duration.scalar, stats.duration.scalar), 's');
            _self.d3env.maxX = (0, _jsQuantities2.default)(Math.max(_self.d3env.maxX.scalar, stats.time.max.scalar), 's');
            _self.d3env.minX = (0, _jsQuantities2.default)(Math.min(_self.d3env.minX.scalar, stats.time.min.scalar), 's');
            _self.d3env.maxY = (0, _jsQuantities2.default)(Math.max(_self.d3env.maxY.scalar, stats.value.max.scalar), 'mV');
            _self.d3env.minY = (0, _jsQuantities2.default)(Math.min(_self.d3env.minY.scalar, stats.value.min.scalar), 'mV');

            events = yield _bluebird2.default.map(events, function (event) {

                _self.d3env.layerRes = (0, _jsQuantities2.default)(Math.min(Math.max(event.time.sub(last_t).scalar, _self.config.layerResolutionLimit), _self.config.layerResolutionLimit), 's');
                _self.d3env.duration = (0, _jsQuantities2.default)(Math.max(_self.d3env.duration.scalar, event.time.scalar), 's');
                last_t = event.time;
                return { x: event.time.scalar, y: event.value.scalar };
            });

            _self.d3env.layerCount += 1;

            eventData.push(events);
            return events;
        })).then(() => {
            return eventData;
        });
    }

    quantizeData(layerData, d3env) {
        let lsteps = Math.ceil(d3env.duration.scalar / d3env.layerRes.scalar),
            quantizedLayers = [];

        while (layerData.length > 0) {
            let ld = layerData.shift(),
                quant = [];
            for (let n = 0; n < lsteps; n += 1) {
                quant.push({ x: n * d3env.layerRes.scalar, y: 0.0 });
            }
            for (let t = 0; t < ld.length && t < quant.length; t += 1) {
                let idx = Math.floor(ld[t].x / d3env.layerRes.scalar);
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

exports.default = BaseGraph;
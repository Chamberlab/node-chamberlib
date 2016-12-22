'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _Defaults = require('./layouts/Defaults');

var _Defaults2 = _interopRequireDefault(_Defaults);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseGraph = function () {
    function BaseGraph() {
        (0, _classCallCheck3.default)(this, BaseGraph);

        this._d3env = {};
        this._layerData = null;
        this._g = null;

        this._quantize = false;
    }

    (0, _createClass3.default)(BaseGraph, [{
        key: 'draw',
        value: function draw(dataSet) {
            var _self = this;
            return _self.prepareData(dataSet).then(function (res) {
                _self.layerData = res;
                return _bluebird2.default.promisify(_self.jsdomEnv)(_self.d3env, _self.layerData, _self.g, _self.drawContent, _self.quantize ? _self.quantizeData : null);
            });
        }
    }, {
        key: 'jsdomEnv',
        value: function jsdomEnv(d3env, layerData, g, drawContent, quantizeData, cb) {
            // TODO: update d3 to version 4
            // TODO: clean up graph config

            d3env.width = Math.ceil(_Defaults2.default.SECONDS_LENGTH * _Defaults2.default.DEFAULT_PPS);
            d3env.height = _Defaults2.default.DEFAULT_HEIGHT - _Defaults2.default.DEFAULT_MARGIN_Y;
            d3env.d3 = {};
            (0, _assign2.default)(d3env.d3, d3);
            return _jsdom2.default.env({
                features: { QuerySelector: true }, html: _Defaults2.default.HTML_STUB,
                done: function done(err, window) {
                    window.d3 = d3env.d3.select(window.document);

                    d3env.window = window;

                    d3env._width = Math.ceil(_Defaults2.default.SECONDS_LENGTH * _Defaults2.default.DEFAULT_PPS);
                    d3env._height = _Defaults2.default.DEFAULT_HEIGHT - _Defaults2.default.DEFAULT_MARGIN_Y;

                    d3env.w = Math.ceil(_Defaults2.default.SECONDS_LENGTH * _Defaults2.default.DEFAULT_PPS + _Defaults2.default.DEFAULT_MARGIN_LEFT * 2);
                    d3env.h = _Defaults2.default.DEFAULT_HEIGHT;
                    g = window.d3.select('body').append('div').attr('width', d3env.w).attr('height', d3env.h).attr('class', 'container').append('svg').attr('width', d3env.w).attr('height', d3env.h).attr('class', 'container').append('g').attr('transform', 'translate(' + _Defaults2.default.DEFAULT_MARGIN_LEFT + ', ' + _Defaults2.default.DEFAULT_MARGIN_Y * 0.5 + ')');

                    g.append("rect").attr("x", 0 - _Defaults2.default.DEFAULT_MARGIN_LEFT).attr("y", 0 - _Defaults2.default.DEFAULT_MARGIN_Y * 0.5).attr("width", 5).attr("height", _Defaults2.default.DEFAULT_HEIGHT).style("stroke", "none").style("fill", "transparent");

                    g.append("rect").attr("x", Math.ceil(_Defaults2.default.SECONDS_LENGTH * _Defaults2.default.DEFAULT_PPS + _Defaults2.default.DEFAULT_MARGIN_LEFT * 2) - 5 - _Defaults2.default.DEFAULT_MARGIN_LEFT).attr("y", 0 - _Defaults2.default.DEFAULT_MARGIN_Y * 0.5).attr("width", 5).attr("height", _Defaults2.default.DEFAULT_HEIGHT).style("stroke", "none").style("fill", "transparent");

                    _bluebird2.default.resolve().then(function () {
                        if (typeof quantizeData === 'function') {
                            return quantizeData(layerData, d3env);
                        } else {
                            return _bluebird2.default.resolve();
                        }
                    }).then(function () {
                        return drawContent(d3env, layerData, g).then(function () {
                            if (d3env.xAxis) {
                                g.append("g").attr("class", "x axis").style("color", "#cccccc").style("fill", "none").style("stroke", "#cccccc").style("stroke-width", "0.8").attr("transform", "translate(0," + d3env.h + ")").call(d3env.xAxis);
                            }

                            cb(null, d3env.window.d3.select('.container').html());
                        });
                    });
                }
            });
        }
    }, {
        key: 'drawContent',
        value: function drawContent() {
            /* ignored */
        }
    }, {
        key: 'prepareData',
        value: function prepareData(dataSet) {
            var _self = this;
            this.layerData = [];
            this.d3env.layerCount = 0;
            this.d3env.layerMax = 0;
            this.d3env.layerRes = _Defaults2.default.SECONDS_LENGTH;

            return _bluebird2.default.map(dataSet.all, _bluebird2.default.coroutine(_regenerator2.default.mark(function _callee(channel) {
                var last_t, events;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                last_t = 0.0, events = channel.all.sort(function (a, b) {
                                    if (a.time.normalized() > b.time.normalized()) {
                                        return 1;
                                    } else if (a.time.normalized() < b.time.normalized()) {
                                        return -1;
                                    }
                                    return 0;
                                });
                                _context.next = 3;
                                return _bluebird2.default.map(events, function (event) {
                                    _self.d3env.layerRes = Math.min(Math.max(event.time.normalized() - last_t, _Defaults2.default.MAX_LAYER_RES), _Defaults2.default.MAX_LAYER_RES);
                                    last_t = event.time.normalized();
                                    return { x: event.time.normalized(), y: event.value.normalized() };
                                });

                            case 3:
                                events = _context.sent;


                                _self.d3env.layerCount += 1;

                                return _context.abrupt('return', events);

                            case 6:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            })));
        }
    }, {
        key: 'quantizeData',
        value: function quantizeData(layerData, d3env) {
            var lsteps = Math.ceil(_Defaults2.default.SECONDS_LENGTH / d3env.layerRes),
                quantizedLayers = [];

            while (layerData.length > 0) {
                var ld = layerData.shift(),
                    quant = [];
                for (var n = 0; n < lsteps; n += 1) {
                    quant.push({ x: n * d3env.layerRes, y: 0.0 });
                }
                for (var t = 0; t < ld.length; t += 1) {
                    var idx = Math.floor(ld[t].x / d3env.layerRes);
                    if (ld[t].y > quant[idx].y) {
                        quant[idx].y = ld[t].y;
                    }
                }
                quantizedLayers.push(quant);
            }

            return layerData.concat(quantizedLayers);
        }
    }, {
        key: 'd3env',
        get: function get() {
            return this._d3env;
        },
        set: function set(val) {
            this._d3env = val;
        }
    }, {
        key: 'layerData',
        get: function get() {
            return this._layerData;
        },
        set: function set(val) {
            this._layerData = val;
        }
    }, {
        key: 'g',
        get: function get() {
            return this._g;
        },
        set: function set(val) {
            this._g = val;
        }
    }, {
        key: 'quantize',
        get: function get() {
            return this._quantize;
        },
        set: function set(val) {
            this._quantize = val;
        }
    }]);
    return BaseGraph;
}();

exports.default = BaseGraph;
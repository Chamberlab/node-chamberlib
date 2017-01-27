'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _maxSafeInteger = require('babel-runtime/core-js/number/max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

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
                var d3env = void 0;
                return _bluebird2.default.map(_self.layerData, function (ld, i) {
                    d3env = (0, _assign2.default)({}, _self.d3env);
                    d3env.layerData = [ld];
                    d3env.layerCount = 1;
                    d3env.layerStats = [_self.d3env.layerStats[i]];
                    d3env.channels = [_self.d3env.channels[i]];
                    d3env.channelTitle = [_self.d3env.channelTitles[i]].join('-');
                    console.log('Creating graph for channel ' + d3env.channelTitle);
                    return _bluebird2.default.promisify(_self.jsdomEnv)(d3env, d3env.layerData, d3env.g, _self.drawContent, _self.quantize ? _self.quantizeData : null).then(function (data) {
                        return { data: data, title: d3env.channelTitle };
                    });
                }, { concurrency: 1 }).then(function (graphs) {
                    console.log('Creating graph for all channels');
                    return _bluebird2.default.promisify(_self.jsdomEnv)(_self.d3env, _self.layerData, d3env.g, _self.drawContent, _self.quantize ? _self.quantizeData : null).then(function (data) {
                        graphs.push({ data: data, title: 'all' });
                        return graphs;
                    });
                });
            });
        }
    }, {
        key: 'jsdomEnv',
        value: function jsdomEnv(d3env, layerData, g, drawContent, quantizeData, cb) {
            // TODO: update d3 to version 4

            d3env.width = Math.ceil(d3env.duration * d3env.config.pixelsPerSecond);
            d3env.height = d3env.config.displayDimensions.height - d3env.config.margins.top - d3env.config.margins.bottom;
            d3env.d3 = {};
            (0, _assign2.default)(d3env.d3, d3);
            return _jsdom2.default.env({
                features: { QuerySelector: true }, html: '<!DOCTYPE html><html><head></head><body>' + '<script src="http://d3js.org/d3.v3.min.js"></script></body></html>',
                done: function done(err, window) {
                    window.d3 = d3env.d3.select(window.document);
                    d3env.window = window;
                    d3env.docWidth = d3env.width + d3env.config.margins.left + d3env.config.margins.right;
                    d3env.docHeight = d3env.config.displayDimensions.height;

                    g = window.d3.select('body').append('div').attr('width', d3env.docWidth).attr('height', d3env.docHeight).attr('class', 'container').append('svg').attr('width', d3env.docWidth).attr('height', d3env.docHeight).attr('class', 'container').append('g').attr('transform', 'translate(' + d3env.config.margins.left + ', ' + d3env.config.margins.top + ')');

                    g.append("rect").attr("x", 0 - d3env.config.margins.left).attr("y", 0 - d3env.config.margins.top).attr("width", d3env.docWidth + d3env.config.margins.left).attr("height", d3env.docHeight).style("stroke", "none").style("fill", "black");

                    _bluebird2.default.resolve().then(function () {
                        if (typeof quantizeData === 'function') {
                            return quantizeData(layerData, d3env);
                        } else {
                            return _bluebird2.default.resolve();
                        }
                    }).then(function () {
                        return drawContent(d3env, layerData, g).then(function () {
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
            this.d3env.config = this.config;
            this.d3env.layerCount = 0;
            this.d3env.layerMax = 0;
            this.d3env.layerStats = [];
            this.d3env.minX = Number.MAX_VALUE;
            this.d3env.minY = Number.MAX_VALUE;
            this.d3env.maxX = Number.MIN_VALUE;
            this.d3env.maxY = Number.MIN_VALUE;
            this.d3env.duration = 0;
            this.d3env.layerRes = _maxSafeInteger2.default;
            this.d3env.channels = [];
            this.d3env.channelTitles = [];

            return _bluebird2.default.map(dataSet.all, _bluebird2.default.coroutine(_regenerator2.default.mark(function _callee(channel) {
                var last_t, events, stats;
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
                                stats = channel.stats;

                                _self.d3env.channels.push(channel.uuid);
                                _self.d3env.channelTitles.push(channel.title);
                                _self.d3env.layerStats.push(stats);

                                _self.d3env.duration = Math.max(_self.d3env.duration, stats.duration.normalized());
                                _self.d3env.maxX = Math.max(_self.d3env.maxX, stats.time.max.normalized());
                                _self.d3env.minX = Math.min(_self.d3env.minX, stats.time.min.normalized());
                                _self.d3env.maxY = Math.max(_self.d3env.maxY, stats.value.max.asUnit('mV'));
                                _self.d3env.minY = Math.min(_self.d3env.minY, stats.value.min.asUnit('mV'));

                                _context.next = 12;
                                return _bluebird2.default.map(events, function (event) {
                                    _self.d3env.layerRes = Math.min(Math.max(event.time.normalized() - last_t, _self.config.layerResolutionLimit), _self.config.layerResolutionLimit);
                                    last_t = event.time.normalized();
                                    return { x: event.time.normalized(), y: event.value.asUnit('mV') };
                                });

                            case 12:
                                events = _context.sent;


                                _self.d3env.layerCount += 1;

                                return _context.abrupt('return', events);

                            case 15:
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
            var lsteps = Math.ceil(d3env.duration / d3env.layerRes),
                quantizedLayers = [];

            while (layerData.length > 0) {
                var ld = layerData.shift(),
                    quant = [];
                for (var n = 0; n < lsteps; n += 1) {
                    quant.push({ x: n * d3env.layerRes, y: 0.0 });
                }
                for (var t = 0; t < ld.length && t < quant.length; t += 1) {
                    var idx = Math.floor(ld[t].x / d3env.layerRes);
                    if (ld[t] && quant[idx] && ld[t].y > quant[idx].y) {
                        quant[idx].y = ld[t].y;
                    }
                }
                quantizedLayers.push(quant);
            }

            return layerData.concat(quantizedLayers);
        }
    }, {
        key: 'config',
        get: function get() {
            return require('../../config/graphs.json');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9CYXNlR3JhcGguanMiXSwibmFtZXMiOlsiZDMiLCJCYXNlR3JhcGgiLCJfZDNlbnYiLCJfbGF5ZXJEYXRhIiwiX2ciLCJfcXVhbnRpemUiLCJkYXRhU2V0IiwiX3NlbGYiLCJwcmVwYXJlRGF0YSIsInRoZW4iLCJyZXMiLCJsYXllckRhdGEiLCJkM2VudiIsIm1hcCIsImxkIiwiaSIsImxheWVyQ291bnQiLCJsYXllclN0YXRzIiwiY2hhbm5lbHMiLCJjaGFubmVsVGl0bGUiLCJjaGFubmVsVGl0bGVzIiwiam9pbiIsImNvbnNvbGUiLCJsb2ciLCJwcm9taXNpZnkiLCJqc2RvbUVudiIsImciLCJkcmF3Q29udGVudCIsInF1YW50aXplIiwicXVhbnRpemVEYXRhIiwiZGF0YSIsInRpdGxlIiwiY29uY3VycmVuY3kiLCJncmFwaHMiLCJwdXNoIiwiY2IiLCJ3aWR0aCIsIk1hdGgiLCJjZWlsIiwiZHVyYXRpb24iLCJjb25maWciLCJwaXhlbHNQZXJTZWNvbmQiLCJoZWlnaHQiLCJkaXNwbGF5RGltZW5zaW9ucyIsIm1hcmdpbnMiLCJ0b3AiLCJib3R0b20iLCJlbnYiLCJmZWF0dXJlcyIsIlF1ZXJ5U2VsZWN0b3IiLCJodG1sIiwiZG9uZSIsImVyciIsIndpbmRvdyIsInNlbGVjdCIsImRvY3VtZW50IiwiZG9jV2lkdGgiLCJsZWZ0IiwicmlnaHQiLCJkb2NIZWlnaHQiLCJhcHBlbmQiLCJhdHRyIiwic3R5bGUiLCJyZXNvbHZlIiwibGF5ZXJNYXgiLCJtaW5YIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibWluWSIsIm1heFgiLCJNSU5fVkFMVUUiLCJtYXhZIiwibGF5ZXJSZXMiLCJhbGwiLCJjb3JvdXRpbmUiLCJjaGFubmVsIiwibGFzdF90IiwiZXZlbnRzIiwic29ydCIsImEiLCJiIiwidGltZSIsIm5vcm1hbGl6ZWQiLCJzdGF0cyIsInV1aWQiLCJtYXgiLCJtaW4iLCJ2YWx1ZSIsImFzVW5pdCIsImV2ZW50IiwibGF5ZXJSZXNvbHV0aW9uTGltaXQiLCJ4IiwieSIsImxzdGVwcyIsInF1YW50aXplZExheWVycyIsImxlbmd0aCIsInNoaWZ0IiwicXVhbnQiLCJuIiwidCIsImlkeCIsImZsb29yIiwiY29uY2F0IiwicmVxdWlyZSIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsRTs7QUFDWjs7OztBQUNBOzs7Ozs7OztJQUVNQyxTO0FBQ0YseUJBQWM7QUFBQTs7QUFDVixhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLQyxFQUFMLEdBQVUsSUFBVjs7QUFFQSxhQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7Ozs7NkJBR0lDLE8sRUFBUztBQUNWLGdCQUFNQyxRQUFRLElBQWQ7QUFDQSxtQkFBT0EsTUFBTUMsV0FBTixDQUFrQkYsT0FBbEIsRUFDRkcsSUFERSxDQUNHLFVBQVVDLEdBQVYsRUFBZTtBQUNqQkgsc0JBQU1JLFNBQU4sR0FBa0JELEdBQWxCO0FBQ0Esb0JBQUlFLGNBQUo7QUFDQSx1QkFBTyxtQkFBUUMsR0FBUixDQUFZTixNQUFNSSxTQUFsQixFQUE2QixVQUFDRyxFQUFELEVBQUtDLENBQUwsRUFBVztBQUMzQ0gsNEJBQVEsc0JBQWMsRUFBZCxFQUFrQkwsTUFBTUssS0FBeEIsQ0FBUjtBQUNBQSwwQkFBTUQsU0FBTixHQUFrQixDQUFDRyxFQUFELENBQWxCO0FBQ0FGLDBCQUFNSSxVQUFOLEdBQW1CLENBQW5CO0FBQ0FKLDBCQUFNSyxVQUFOLEdBQW1CLENBQUNWLE1BQU1LLEtBQU4sQ0FBWUssVUFBWixDQUF1QkYsQ0FBdkIsQ0FBRCxDQUFuQjtBQUNBSCwwQkFBTU0sUUFBTixHQUFpQixDQUFDWCxNQUFNSyxLQUFOLENBQVlNLFFBQVosQ0FBcUJILENBQXJCLENBQUQsQ0FBakI7QUFDQUgsMEJBQU1PLFlBQU4sR0FBcUIsQ0FBQ1osTUFBTUssS0FBTixDQUFZUSxhQUFaLENBQTBCTCxDQUExQixDQUFELEVB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QUFaO0FBQ0gsUzswQkFFU3NHLEcsRUFBSztBQUNYLGlCQUFLdEcsTUFBTCxHQUFjc0csR0FBZDtBQUNIOzs7NEJBR2U7QUFDWixtQkFBTyxLQUFLckcsVUFBWjtBQUNILFM7MEJBRWFxRyxHLEVBQUs7QUFDZixpQkFBS3JHLFVBQUwsR0FBa0JxRyxHQUFsQjtBQUNIOzs7NEJBR087QUFDSixtQkFBTyxLQUFLcEcsRUFBWjtBQUNILFM7MEJBRUtvRyxHLEVBQUs7QUFDUCxpQkFBS3BHLEVBQUwsR0FBVW9HLEdBQVY7QUFDSDs7OzRCQUVjO0FBQ1gsbUJBQU8sS0FBS25HLFNBQVo7QUFDSCxTOzBCQUVZbUcsRyxFQUFLO0FBQ2QsaUJBQUtuRyxTQUFMLEdBQWlCbUcsR0FBakI7QUFDSDs7Ozs7a0JBR1V2RyxTIiwiZmlsZSI6ImdyYXBocy9CYXNlR3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQganNkb20gZnJvbSAnanNkb20nO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5jbGFzcyBCYXNlR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kM2VudiA9IHt9O1xuICAgICAgICB0aGlzLl9sYXllckRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9nID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9xdWFudGl6ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgZHJhdyhkYXRhU2V0KSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF9zZWxmLnByZXBhcmVEYXRhKGRhdGFTZXQpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYubGF5ZXJEYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIGxldCBkM2VudjtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5tYXAoX3NlbGYubGF5ZXJEYXRhLCAobGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYgPSBPYmplY3QuYXNzaWduKHt9LCBfc2VsZi5kM2Vudik7XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmxheWVyRGF0YSA9IFtsZF07XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmxheWVyQ291bnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBkM2Vudi5sYXllclN0YXRzID0gW19zZWxmLmQzZW52LmxheWVyU3RhdHNbaV1dO1xuICAgICAgICAgICAgICAgICAgICBkM2Vudi5jaGFubmVscyA9IFtfc2VsZi5kM2Vudi5jaGFubmVsc1tpXV07XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmNoYW5uZWxUaXRsZSA9IFtfc2VsZi5kM2Vudi5jaGFubmVsVGl0bGVzW2ldXS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDcmVhdGluZyBncmFwaCBmb3IgY2hhbm5lbCAke2QzZW52LmNoYW5uZWxUaXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucHJvbWlzaWZ5KF9zZWxmLmpzZG9tRW52KShkM2VudiwgZDNlbnYubGF5ZXJEYXRhLCBkM2Vudi5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuZHJhd0NvbnRlbnQsIF9zZWxmLnF1YW50aXplID8gX3NlbGYucXVhbnRpemVEYXRhIDogbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogZGF0YSwgdGl0bGU6IGQzZW52LmNoYW5uZWxUaXRsZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwge2NvbmN1cnJlbmN5OiAxfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZ3JhcGhzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBDcmVhdGluZyBncmFwaCBmb3IgYWxsIGNoYW5uZWxzYCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnByb21pc2lmeShfc2VsZi5qc2RvbUVudikoX3NlbGYuZDNlbnYsIF9zZWxmLmxheWVyRGF0YSwgZDNlbnYuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLmRyYXdDb250ZW50LCBfc2VsZi5xdWFudGl6ZSA/IF9zZWxmLnF1YW50aXplRGF0YSA6IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBocy5wdXNoKHsgZGF0YTogZGF0YSwgdGl0bGU6ICdhbGwnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBncmFwaHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGpzZG9tRW52KGQzZW52LCBsYXllckRhdGEsIGcsIGRyYXdDb250ZW50LCBxdWFudGl6ZURhdGEsIGNiKSB7XG4gICAgICAgIC8vIFRPRE86IHVwZGF0ZSBkMyB0byB2ZXJzaW9uIDRcblxuICAgICAgICBkM2Vudi53aWR0aCA9IE1hdGguY2VpbChkM2Vudi5kdXJhdGlvbiAqIGQzZW52LmNvbmZpZy5waXhlbHNQZXJTZWNvbmQpO1xuICAgICAgICBkM2Vudi5oZWlnaHQgPSBkM2Vudi5jb25maWcuZGlzcGxheURpbWVuc2lvbnMuaGVpZ2h0IC0gZDNlbnYuY29uZmlnLm1hcmdpbnMudG9wIC0gZDNlbnYuY29uZmlnLm1hcmdpbnMuYm90dG9tO1xuICAgICAgICBkM2Vudi5kMyA9IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKGQzZW52LmQzLCBkMyk7XG4gICAgICAgIHJldHVybiBqc2RvbS5lbnYoe1xuICAgICAgICAgICAgZmVhdHVyZXM6IHtRdWVyeVNlbGVjdG9yOiB0cnVlfSwgaHRtbDogJzwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjwvaGVhZD48Ym9keT4nICtcbiAgICAgICAgICAgICc8c2NyaXB0IHNyYz1cImh0dHA6Ly9kM2pzLm9yZy9kMy52My5taW4uanNcIj48L3NjcmlwdD48L2JvZHk+PC9odG1sPicsXG4gICAgICAgICAgICBkb25lOiBmdW5jdGlvbiAoZXJyLCB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZDMgPSBkM2Vudi5kMy5zZWxlY3Qod2luZG93LmRvY3VtZW50KTtcbiAgICAgICAgICAgICAgICBkM2Vudi53aW5kb3cgPSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgZDNlbnYuZG9jV2lkdGggPSBkM2Vudi53aWR0aCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnQgKyBkM2Vudi5jb25maWcubWFyZ2lucy5yaWdodDtcbiAgICAgICAgICAgICAgICBkM2Vudi5kb2NIZWlnaHQgPSBkM2Vudi5jb25maWcuZGlzcGxheURpbWVuc2lvbnMuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgZyA9IHdpbmRvdy5kMy5zZWxlY3QoJ2JvZHknKS5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGQzZW52LmRvY1dpZHRoKS5hdHRyKCdoZWlnaHQnLCBkM2Vudi5kb2NIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsJ2NvbnRhaW5lcicpLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZDNlbnYuZG9jV2lkdGgpLmF0dHIoJ2hlaWdodCcsIGQzZW52LmRvY0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnY29udGFpbmVyJykuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsYHRyYW5zbGF0ZSgke2QzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnR9LCAke2QzZW52LmNvbmZpZy5tYXJnaW5zLnRvcH0pYCk7XG5cbiAgICAgICAgICAgICAgICBnLmFwcGVuZChcInJlY3RcIilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ4XCIsIDAgLSBkM2Vudi5jb25maWcubWFyZ2lucy5sZWZ0KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cihcInlcIiwgMCAtIGQzZW52LmNvbmZpZy5tYXJnaW5zLnRvcClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBkM2Vudi5kb2NXaWR0aCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGQzZW52LmRvY0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFwic3Ryb2tlXCIsIFwibm9uZVwiKS5zdHlsZShcImZpbGxcIiwgXCJibGFja1wiKTtcblxuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpemVEYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1YW50aXplRGF0YShsYXllckRhdGEsIGQzZW52KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhd0NvbnRlbnQoZDNlbnYsIGxheWVyRGF0YSwgZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGQzZW52LndpbmRvdy5kMy5zZWxlY3QoJy5jb250YWluZXInKS5odG1sKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBkcmF3Q29udGVudCgpIHtcbiAgICAgICAgLyogaWdub3JlZCAqL1xuICAgIH1cblxuXG4gICAgcHJlcGFyZURhdGEoZGF0YVNldCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubGF5ZXJEYXRhID0gW107XG4gICAgICAgIHRoaXMuZDNlbnYuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJNYXggPSAwO1xuICAgICAgICB0aGlzLmQzZW52LmxheWVyU3RhdHMgPSBbXTtcbiAgICAgICAgdGhpcy5kM2Vudi5taW5YID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5taW5ZID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5tYXhYID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5tYXhZID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5kdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJSZXMgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgICAgdGhpcy5kM2Vudi5jaGFubmVscyA9IFtdO1xuICAgICAgICB0aGlzLmQzZW52LmNoYW5uZWxUaXRsZXMgPSBbXTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5tYXAoZGF0YVNldC5hbGwsIFByb21pc2UuY29yb3V0aW5lKGZ1bmN0aW9uKiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgbGV0IGxhc3RfdCA9IDAuMCxcbiAgICAgICAgICAgICAgICBldmVudHMgPSBjaGFubmVsLmFsbC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGEudGltZS5ub3JtYWxpemVkKCkgPiBiLnRpbWUubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYS50aW1lLm5vcm1hbGl6ZWQoKSA8IGIudGltZS5ub3JtYWxpemVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgc3RhdHMgPSBjaGFubmVsLnN0YXRzO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYuY2hhbm5lbHMucHVzaChjaGFubmVsLnV1aWQpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYuY2hhbm5lbFRpdGxlcy5wdXNoKGNoYW5uZWwudGl0bGUpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJTdGF0cy5wdXNoKHN0YXRzKTtcblxuICAgICAgICAgICAgX3NlbGYuZDNlbnYuZHVyYXRpb24gPSBNYXRoLm1heChfc2VsZi5kM2Vudi5kdXJhdGlvbiwgc3RhdHMuZHVyYXRpb24ubm9ybWFsaXplZCgpKTtcbiAgICAgICAgICAgIF9zZWxmLmQzZW52Lm1heFggPSBNYXRoLm1heChfc2VsZi5kM2Vudi5tYXhYLCBzdGF0cy50aW1lLm1heC5ub3JtYWxpemVkKCkpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubWluWCA9IE1hdGgubWluKF9zZWxmLmQzZW52Lm1pblgsIHN0YXRzLnRpbWUubWluLm5vcm1hbGl6ZWQoKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5tYXhZID0gTWF0aC5tYXgoX3NlbGYuZDNlbnYubWF4WSwgc3RhdHMudmFsdWUubWF4LmFzVW5pdCgnbVYnKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5taW5ZID0gTWF0aC5taW4oX3NlbGYuZDNlbnYubWluWSwgc3RhdHMudmFsdWUubWluLmFzVW5pdCgnbVYnKSk7XG5cbiAgICAgICAgICAgIGV2ZW50cyA9IHlpZWxkIFByb21pc2UubWFwKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJSZXMgPSBNYXRoLm1pbihNYXRoLm1heChldmVudC50aW1lLm5vcm1hbGl6ZWQoKSAtIGxhc3RfdCxcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuY29uZmlnLmxheWVyUmVzb2x1dGlvbkxpbWl0KSwgX3NlbGYuY29uZmlnLmxheWVyUmVzb2x1dGlvbkxpbWl0KTtcbiAgICAgICAgICAgICAgICBsYXN0X3QgPSBldmVudC50aW1lLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBldmVudC50aW1lLm5vcm1hbGl6ZWQoKSwgeTogZXZlbnQudmFsdWUuYXNVbml0KCdtVicpIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJDb3VudCArPSAxO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG5cbiAgICBxdWFudGl6ZURhdGEobGF5ZXJEYXRhLCBkM2Vudikge1xuICAgICAgICBsZXQgbHN0ZXBzID0gTWF0aC5jZWlsKGQzZW52LmR1cmF0aW9uIC8gZDNlbnYubGF5ZXJSZXMpLFxuICAgICAgICAgICAgcXVhbnRpemVkTGF5ZXJzID0gW107XG5cbiAgICAgICAgd2hpbGUgKGxheWVyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGQgPSBsYXllckRhdGEuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBxdWFudCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBsc3RlcHM7IG4gKz0gMSkge1xuICAgICAgICAgICAgICAgIHF1YW50LnB1c2goe3g6IG4gKiBkM2Vudi5sYXllclJlcywgeTogMC4wfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IGxkLmxlbmd0aCAmJiB0IDwgcXVhbnQubGVuZ3RoOyB0ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gTWF0aC5mbG9vcihsZFt0XS54IC8gZDNlbnYubGF5ZXJSZXMpO1xuICAgICAgICAgICAgICAgIGlmIChsZFt0XSAmJiBxdWFudFtpZHhdICYmIGxkW3RdLnkgPiBxdWFudFtpZHhdLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRbaWR4XS55ID0gbGRbdF0ueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWFudGl6ZWRMYXllcnMucHVzaChxdWFudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGF5ZXJEYXRhLmNvbmNhdChxdWFudGl6ZWRMYXllcnMpO1xuICAgIH1cblxuXG4gICAgZ2V0IGNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9ncmFwaHMuanNvbicpO1xuICAgIH1cblxuXG4gICAgZ2V0IGQzZW52KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZDNlbnY7XG4gICAgfVxuXG4gICAgc2V0IGQzZW52KHZhbCkge1xuICAgICAgICB0aGlzLl9kM2VudiA9IHZhbDtcbiAgICB9XG5cblxuICAgIGdldCBsYXllckRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllckRhdGE7XG4gICAgfVxuXG4gICAgc2V0IGxheWVyRGF0YSh2YWwpIHtcbiAgICAgICAgdGhpcy5fbGF5ZXJEYXRhID0gdmFsO1xuICAgIH1cblxuXG4gICAgZ2V0IGcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xuICAgIH1cblxuICAgIHNldCBnKHZhbCkge1xuICAgICAgICB0aGlzLl9nID0gdmFsO1xuICAgIH1cblxuICAgIGdldCBxdWFudGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1YW50aXplO1xuICAgIH1cblxuICAgIHNldCBxdWFudGl6ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fcXVhbnRpemUgPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlR3JhcGg7Il19
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require('d3');

var d3 = _interopRequireWildcard(_d);

var _jsdom = require('jsdom');

var _jsdom2 = _interopRequireDefault(_jsdom);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// FIXME: update this to use d3 4.x

var BaseGraph = function () {
    function BaseGraph() {
        _classCallCheck(this, BaseGraph);

        this._d3env = {};
        this._layerData = null;
        this._g = null;

        this._quantize = false;
    }

    _createClass(BaseGraph, [{
        key: 'draw',
        value: function draw(dataSet) {
            var _self = this;
            return _self.prepareData(dataSet).then(function (res) {
                _self.layerData = res;
                var d3env = void 0;
                return _bluebird2.default.map(_self.layerData, function (ld, i) {
                    d3env = Object.assign({}, _self.d3env);
                    d3env.layerData = [ld];
                    d3env.layerCount = 1;
                    d3env.layerStats = [_self.d3env.layerStats[i]];
                    d3env.channels = [_self.d3env.channels[i]];
                    d3env.channelTitle = [_self.d3env.channelTitles[i]].join('-');
                    // console.log(`Creating graph for channel ${d3env.channelTitle}`);
                    return _bluebird2.default.promisify(_self.jsdomEnv)(d3env, d3env.layerData, d3env.g, _self.drawContent, _self.quantize ? _self.quantizeData : null).then(function (data) {
                        return { data: data, title: d3env.channelTitle };
                    });
                }, { concurrency: 1 }).then(function (graphs) {
                    // console.log('Creating graph for all channels');
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
            Object.assign(d3env.d3, d3);
            return _jsdom2.default.env({
                features: { QuerySelector: true }, html: '<!DOCTYPE html><html><head></head><body>' + '<script src="http://d3js.org/d3.v3.min.js"></script></body></html>',
                done: function done(err, window) {
                    window.d3 = d3env.d3.select(window.document);
                    d3env.window = window;
                    d3env.docWidth = d3env.width + d3env.config.margins.left + d3env.config.margins.right;
                    d3env.docHeight = d3env.config.displayDimensions.height;

                    g = window.d3.select('body').append('div').attr('width', d3env.docWidth).attr('height', d3env.docHeight).attr('class', 'container').append('svg').attr('width', d3env.docWidth).attr('height', d3env.docHeight).attr('class', 'container').append('g').attr('transform', 'translate(' + d3env.config.margins.left + ', ' + d3env.config.margins.top + ')');

                    g.append('rect').attr('x', 0 - d3env.config.margins.left).attr('y', 0 - d3env.config.margins.top).attr('width', d3env.docWidth + d3env.config.margins.left).attr('height', d3env.docHeight).style('stroke', 'none').style('fill', 'black');

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
            this.d3env.layerRes = Number.MAX_SAFE_INTEGER;
            this.d3env.channels = [];
            this.d3env.channelTitles = [];

            return _bluebird2.default.map(dataSet.all, _bluebird2.default.coroutine(regeneratorRuntime.mark(function _callee(channel) {
                var last_t, events, stats;
                return regeneratorRuntime.wrap(function _callee$(_context) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9CYXNlR3JhcGguanMiXSwibmFtZXMiOlsiZDMiLCJCYXNlR3JhcGgiLCJfZDNlbnYiLCJfbGF5ZXJEYXRhIiwiX2ciLCJfcXVhbnRpemUiLCJkYXRhU2V0IiwiX3NlbGYiLCJwcmVwYXJlRGF0YSIsInRoZW4iLCJyZXMiLCJsYXllckRhdGEiLCJkM2VudiIsIm1hcCIsImxkIiwiaSIsIk9iamVjdCIsImFzc2lnbiIsImxheWVyQ291bnQiLCJsYXllclN0YXRzIiwiY2hhbm5lbHMiLCJjaGFubmVsVGl0bGUiLCJjaGFubmVsVGl0bGVzIiwiam9pbiIsInByb21pc2lmeSIsImpzZG9tRW52IiwiZyIsImRyYXdDb250ZW50IiwicXVhbnRpemUiLCJxdWFudGl6ZURhdGEiLCJkYXRhIiwidGl0bGUiLCJjb25jdXJyZW5jeSIsImdyYXBocyIsInB1c2giLCJjYiIsIndpZHRoIiwiTWF0aCIsImNlaWwiLCJkdXJhdGlvbiIsImNvbmZpZyIsInBpeGVsc1BlclNlY29uZCIsImhlaWdodCIsImRpc3BsYXlEaW1lbnNpb25zIiwibWFyZ2lucyIsInRvcCIsImJvdHRvbSIsImVudiIsImZlYXR1cmVzIiwiUXVlcnlTZWxlY3RvciIsImh0bWwiLCJkb25lIiwiZXJyIiwid2luZG93Iiwic2VsZWN0IiwiZG9jdW1lbnQiLCJkb2NXaWR0aCIsImxlZnQiLCJyaWdodCIsImRvY0hlaWdodCIsImFwcGVuZCIsImF0dHIiLCJzdHlsZSIsInJlc29sdmUiLCJsYXllck1heCIsIm1pblgiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJtaW5ZIiwibWF4WCIsIk1JTl9WQUxVRSIsIm1heFkiLCJsYXllclJlcyIsIk1BWF9TQUZFX0lOVEVHRVIiLCJhbGwiLCJjb3JvdXRpbmUiLCJjaGFubmVsIiwibGFzdF90IiwiZXZlbnRzIiwic29ydCIsImEiLCJiIiwidGltZSIsIm5vcm1hbGl6ZWQiLCJzdGF0cyIsInV1aWQiLCJtYXgiLCJtaW4iLCJ2YWx1ZSIsImFzVW5pdCIsImV2ZW50IiwibGF5ZXJSZXNvbHV0aW9uTGltaXQiLCJ4IiwieSIsImxzdGVwcyIsInF1YW50aXplZExheWVycyIsImxlbmd0aCIsInNoaWZ0IiwicXVhbnQiLCJuIiwidCIsImlkeCIsImZsb29yIiwiY29uY2F0IiwicmVxdWlyZSIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7SUFBWUEsRTs7QUFDWjs7OztBQUNBOzs7Ozs7Ozs7O0FBRUE7O0lBRU1DLFM7QUFDRix5QkFBYztBQUFBOztBQUNWLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUtDLEVBQUwsR0FBVSxJQUFWOztBQUVBLGFBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDSDs7Ozs2QkFHSUMsTyxFQUFTO0FBQ1YsZ0JBQU1DLFFBQVEsSUFBZDtBQUNBLG1CQUFPQSxNQUFNQyxXQUFOLENBQWtCRixPQUFsQixFQUNGRyxJQURFLENBQ0csVUFBVUMsR0FBVixFQUFlO0FBQ2pCSCxzQkFBTUksU0FBTixHQUFrQkQsR0FBbEI7QUFDQSxvQkFBSUUsY0FBSjtBQUNBLHVCQUFPLG1CQUFRQyxHQUFSLENBQVlOLE1BQU1JLFNBQWxCLEVBQTZCLFVBQUNHLEVBQUQsRUFBS0MsQ0FBTCxFQUFXO0FBQzNDSCw0QkFBUUksT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JWLE1BQU1LLEtBQXhCLENBQVI7QUFDQUEsMEJBQU1ELFNBQU4sR0FBa0IsQ0FBQ0csRUFBRCxDQUFsQjtBQUNBRiwwQkFBTU0sVUFBTixHQUFtQixDQUFuQjtBQUNBTiwwQkFBTU8sVUFBTixHQUFtQixDQUFDWixNQUFNSyxLQUFOLENBQVlPLFVBQVosQ0FBdUJKLENBQXZCLENBQUQsQ0FBbkI7QUFDQUgsMEJBQU1RLFFBQU4sR0FBaUIsQ0FBQ2IsTUFBTUssS0FBTixDQUFZUSxRQUFaLENBQXFCTCxDQUFyQixDQUFELENBQWpCO0FBQ0FILDBCQUFNUyxZQUFOLEdBQXFCLENBQUNkLE1BQU1LLEtBQU4sQ0FBWVUsYUFB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S0FBS3RHLE1BQVo7QUFDSCxTOzBCQUVTdUcsRyxFQUFLO0FBQ1gsaUJBQUt2RyxNQUFMLEdBQWN1RyxHQUFkO0FBQ0g7Ozs0QkFHZTtBQUNaLG1CQUFPLEtBQUt0RyxVQUFaO0FBQ0gsUzswQkFFYXNHLEcsRUFBSztBQUNmLGlCQUFLdEcsVUFBTCxHQUFrQnNHLEdBQWxCO0FBQ0g7Ozs0QkFHTztBQUNKLG1CQUFPLEtBQUtyRyxFQUFaO0FBQ0gsUzswQkFFS3FHLEcsRUFBSztBQUNQLGlCQUFLckcsRUFBTCxHQUFVcUcsR0FBVjtBQUNIOzs7NEJBRWM7QUFDWCxtQkFBTyxLQUFLcEcsU0FBWjtBQUNILFM7MEJBRVlvRyxHLEVBQUs7QUFDZCxpQkFBS3BHLFNBQUwsR0FBaUJvRyxHQUFqQjtBQUNIOzs7Ozs7a0JBR1V4RyxTIiwiZmlsZSI6ImdyYXBocy9CYXNlR3JhcGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBkMyBmcm9tICdkMyc7XG5pbXBvcnQganNkb20gZnJvbSAnanNkb20nO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG4vLyBGSVhNRTogdXBkYXRlIHRoaXMgdG8gdXNlIGQzIDQueFxuXG5jbGFzcyBCYXNlR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9kM2VudiA9IHt9O1xuICAgICAgICB0aGlzLl9sYXllckRhdGEgPSBudWxsO1xuICAgICAgICB0aGlzLl9nID0gbnVsbDtcblxuICAgICAgICB0aGlzLl9xdWFudGl6ZSA9IGZhbHNlO1xuICAgIH1cblxuXG4gICAgZHJhdyhkYXRhU2V0KSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgcmV0dXJuIF9zZWxmLnByZXBhcmVEYXRhKGRhdGFTZXQpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYubGF5ZXJEYXRhID0gcmVzO1xuICAgICAgICAgICAgICAgIGxldCBkM2VudjtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5tYXAoX3NlbGYubGF5ZXJEYXRhLCAobGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYgPSBPYmplY3QuYXNzaWduKHt9LCBfc2VsZi5kM2Vudik7XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmxheWVyRGF0YSA9IFtsZF07XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmxheWVyQ291bnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBkM2Vudi5sYXllclN0YXRzID0gW19zZWxmLmQzZW52LmxheWVyU3RhdHNbaV1dO1xuICAgICAgICAgICAgICAgICAgICBkM2Vudi5jaGFubmVscyA9IFtfc2VsZi5kM2Vudi5jaGFubmVsc1tpXV07XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmNoYW5uZWxUaXRsZSA9IFtfc2VsZi5kM2Vudi5jaGFubmVsVGl0bGVzW2ldXS5qb2luKCctJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBDcmVhdGluZyBncmFwaCBmb3IgY2hhbm5lbCAke2QzZW52LmNoYW5uZWxUaXRsZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucHJvbWlzaWZ5KF9zZWxmLmpzZG9tRW52KShkM2VudiwgZDNlbnYubGF5ZXJEYXRhLCBkM2Vudi5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuZHJhd0NvbnRlbnQsIF9zZWxmLnF1YW50aXplID8gX3NlbGYucXVhbnRpemVEYXRhIDogbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHsgZGF0YTogZGF0YSwgdGl0bGU6IGQzZW52LmNoYW5uZWxUaXRsZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSwge2NvbmN1cnJlbmN5OiAxfSlcbiAgICAgICAgICAgICAgICAudGhlbigoZ3JhcGhzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdDcmVhdGluZyBncmFwaCBmb3IgYWxsIGNoYW5uZWxzJyk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnByb21pc2lmeShfc2VsZi5qc2RvbUVudikoX3NlbGYuZDNlbnYsIF9zZWxmLmxheWVyRGF0YSwgZDNlbnYuZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLmRyYXdDb250ZW50LCBfc2VsZi5xdWFudGl6ZSA/IF9zZWxmLnF1YW50aXplRGF0YSA6IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyYXBocy5wdXNoKHsgZGF0YTogZGF0YSwgdGl0bGU6ICdhbGwnIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBncmFwaHM7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGpzZG9tRW52KGQzZW52LCBsYXllckRhdGEsIGcsIGRyYXdDb250ZW50LCBxdWFudGl6ZURhdGEsIGNiKSB7XG4gICAgICAgIC8vIFRPRE86IHVwZGF0ZSBkMyB0byB2ZXJzaW9uIDRcblxuICAgICAgICBkM2Vudi53aWR0aCA9IE1hdGguY2VpbChkM2Vudi5kdXJhdGlvbiAqIGQzZW52LmNvbmZpZy5waXhlbHNQZXJTZWNvbmQpO1xuICAgICAgICBkM2Vudi5oZWlnaHQgPSBkM2Vudi5jb25maWcuZGlzcGxheURpbWVuc2lvbnMuaGVpZ2h0IC0gZDNlbnYuY29uZmlnLm1hcmdpbnMudG9wIC0gZDNlbnYuY29uZmlnLm1hcmdpbnMuYm90dG9tO1xuICAgICAgICBkM2Vudi5kMyA9IHt9O1xuICAgICAgICBPYmplY3QuYXNzaWduKGQzZW52LmQzLCBkMyk7XG4gICAgICAgIHJldHVybiBqc2RvbS5lbnYoe1xuICAgICAgICAgICAgZmVhdHVyZXM6IHtRdWVyeVNlbGVjdG9yOiB0cnVlfSwgaHRtbDogJzwhRE9DVFlQRSBodG1sPjxodG1sPjxoZWFkPjwvaGVhZD48Ym9keT4nICtcbiAgICAgICAgICAgICc8c2NyaXB0IHNyYz1cImh0dHA6Ly9kM2pzLm9yZy9kMy52My5taW4uanNcIj48L3NjcmlwdD48L2JvZHk+PC9odG1sPicsXG4gICAgICAgICAgICBkb25lOiBmdW5jdGlvbiAoZXJyLCB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cuZDMgPSBkM2Vudi5kMy5zZWxlY3Qod2luZG93LmRvY3VtZW50KTtcbiAgICAgICAgICAgICAgICBkM2Vudi53aW5kb3cgPSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgZDNlbnYuZG9jV2lkdGggPSBkM2Vudi53aWR0aCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnQgKyBkM2Vudi5jb25maWcubWFyZ2lucy5yaWdodDtcbiAgICAgICAgICAgICAgICBkM2Vudi5kb2NIZWlnaHQgPSBkM2Vudi5jb25maWcuZGlzcGxheURpbWVuc2lvbnMuaGVpZ2h0O1xuXG4gICAgICAgICAgICAgICAgZyA9IHdpbmRvdy5kMy5zZWxlY3QoJ2JvZHknKS5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIGQzZW52LmRvY1dpZHRoKS5hdHRyKCdoZWlnaHQnLCBkM2Vudi5kb2NIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsJ2NvbnRhaW5lcicpLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZDNlbnYuZG9jV2lkdGgpLmF0dHIoJ2hlaWdodCcsIGQzZW52LmRvY0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnY29udGFpbmVyJykuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsYHRyYW5zbGF0ZSgke2QzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnR9LCAke2QzZW52LmNvbmZpZy5tYXJnaW5zLnRvcH0pYCk7XG5cbiAgICAgICAgICAgICAgICBnLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd4JywgMCAtIGQzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd5JywgMCAtIGQzZW52LmNvbmZpZy5tYXJnaW5zLnRvcClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZDNlbnYuZG9jV2lkdGggKyBkM2Vudi5jb25maWcubWFyZ2lucy5sZWZ0KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZDNlbnYuZG9jSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJykuc3R5bGUoJ2ZpbGwnLCAnYmxhY2snKTtcblxuICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSgpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVhbnRpemVEYXRhID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHF1YW50aXplRGF0YShsYXllckRhdGEsIGQzZW52KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhd0NvbnRlbnQoZDNlbnYsIGxheWVyRGF0YSwgZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNiKG51bGwsIGQzZW52LndpbmRvdy5kMy5zZWxlY3QoJy5jb250YWluZXInKS5odG1sKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBkcmF3Q29udGVudCgpIHtcbiAgICAgICAgLyogaWdub3JlZCAqL1xuICAgIH1cblxuXG4gICAgcHJlcGFyZURhdGEoZGF0YVNldCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMubGF5ZXJEYXRhID0gW107XG4gICAgICAgIHRoaXMuZDNlbnYuY29uZmlnID0gdGhpcy5jb25maWc7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJNYXggPSAwO1xuICAgICAgICB0aGlzLmQzZW52LmxheWVyU3RhdHMgPSBbXTtcbiAgICAgICAgdGhpcy5kM2Vudi5taW5YID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5taW5ZID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5tYXhYID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5tYXhZID0gTnVtYmVyLk1JTl9WQUxVRTtcbiAgICAgICAgdGhpcy5kM2Vudi5kdXJhdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJSZXMgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcbiAgICAgICAgdGhpcy5kM2Vudi5jaGFubmVscyA9IFtdO1xuICAgICAgICB0aGlzLmQzZW52LmNoYW5uZWxUaXRsZXMgPSBbXTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5tYXAoZGF0YVNldC5hbGwsIFByb21pc2UuY29yb3V0aW5lKGZ1bmN0aW9uKiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgbGV0IGxhc3RfdCA9IDAuMCxcbiAgICAgICAgICAgICAgICBldmVudHMgPSBjaGFubmVsLmFsbC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhLnRpbWUubm9ybWFsaXplZCgpID4gYi50aW1lLm5vcm1hbGl6ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYS50aW1lLm5vcm1hbGl6ZWQoKSA8IGIudGltZS5ub3JtYWxpemVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHN0YXRzID0gY2hhbm5lbC5zdGF0cztcbiAgICAgICAgICAgIF9zZWxmLmQzZW52LmNoYW5uZWxzLnB1c2goY2hhbm5lbC51dWlkKTtcbiAgICAgICAgICAgIF9zZWxmLmQzZW52LmNoYW5uZWxUaXRsZXMucHVzaChjaGFubmVsLnRpdGxlKTtcbiAgICAgICAgICAgIF9zZWxmLmQzZW52LmxheWVyU3RhdHMucHVzaChzdGF0cyk7XG5cbiAgICAgICAgICAgIF9zZWxmLmQzZW52LmR1cmF0aW9uID0gTWF0aC5tYXgoX3NlbGYuZDNlbnYuZHVyYXRpb24sIHN0YXRzLmR1cmF0aW9uLm5vcm1hbGl6ZWQoKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5tYXhYID0gTWF0aC5tYXgoX3NlbGYuZDNlbnYubWF4WCwgc3RhdHMudGltZS5tYXgubm9ybWFsaXplZCgpKTtcbiAgICAgICAgICAgIF9zZWxmLmQzZW52Lm1pblggPSBNYXRoLm1pbihfc2VsZi5kM2Vudi5taW5YLCBzdGF0cy50aW1lLm1pbi5ub3JtYWxpemVkKCkpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubWF4WSA9IE1hdGgubWF4KF9zZWxmLmQzZW52Lm1heFksIHN0YXRzLnZhbHVlLm1heC5hc1VuaXQoJ21WJykpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubWluWSA9IE1hdGgubWluKF9zZWxmLmQzZW52Lm1pblksIHN0YXRzLnZhbHVlLm1pbi5hc1VuaXQoJ21WJykpO1xuXG4gICAgICAgICAgICBldmVudHMgPSB5aWVsZCBQcm9taXNlLm1hcChldmVudHMsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIF9zZWxmLmQzZW52LmxheWVyUmVzID0gTWF0aC5taW4oTWF0aC5tYXgoZXZlbnQudGltZS5ub3JtYWxpemVkKCkgLSBsYXN0X3QsXG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLmNvbmZpZy5sYXllclJlc29sdXRpb25MaW1pdCksIF9zZWxmLmNvbmZpZy5sYXllclJlc29sdXRpb25MaW1pdCk7XG4gICAgICAgICAgICAgICAgbGFzdF90ID0gZXZlbnQudGltZS5ub3JtYWxpemVkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgeDogZXZlbnQudGltZS5ub3JtYWxpemVkKCksIHk6IGV2ZW50LnZhbHVlLmFzVW5pdCgnbVYnKSB9O1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIF9zZWxmLmQzZW52LmxheWVyQ291bnQgKz0gMTtcblxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50cztcbiAgICAgICAgfSkpO1xuICAgIH1cblxuXG4gICAgcXVhbnRpemVEYXRhKGxheWVyRGF0YSwgZDNlbnYpIHtcbiAgICAgICAgbGV0IGxzdGVwcyA9IE1hdGguY2VpbChkM2Vudi5kdXJhdGlvbiAvIGQzZW52LmxheWVyUmVzKSxcbiAgICAgICAgICAgIHF1YW50aXplZExheWVycyA9IFtdO1xuXG4gICAgICAgIHdoaWxlIChsYXllckRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGxkID0gbGF5ZXJEYXRhLnNoaWZ0KCksXG4gICAgICAgICAgICAgICAgcXVhbnQgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgbHN0ZXBzOyBuICs9IDEpIHtcbiAgICAgICAgICAgICAgICBxdWFudC5wdXNoKHt4OiBuICogZDNlbnYubGF5ZXJSZXMsIHk6IDAuMH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChsZXQgdCA9IDA7IHQgPCBsZC5sZW5ndGggJiYgdCA8IHF1YW50Lmxlbmd0aDsgdCArPSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IE1hdGguZmxvb3IobGRbdF0ueCAvIGQzZW52LmxheWVyUmVzKTtcbiAgICAgICAgICAgICAgICBpZiAobGRbdF0gJiYgcXVhbnRbaWR4XSAmJiBsZFt0XS55ID4gcXVhbnRbaWR4XS55KSB7XG4gICAgICAgICAgICAgICAgICAgIHF1YW50W2lkeF0ueSA9IGxkW3RdLnk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcXVhbnRpemVkTGF5ZXJzLnB1c2gocXVhbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxheWVyRGF0YS5jb25jYXQocXVhbnRpemVkTGF5ZXJzKTtcbiAgICB9XG5cblxuICAgIGdldCBjb25maWcoKSB7XG4gICAgICAgIHJldHVybiByZXF1aXJlKCcuLi8uLi9jb25maWcvZ3JhcGhzLmpzb24nKTtcbiAgICB9XG5cblxuICAgIGdldCBkM2VudigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2QzZW52O1xuICAgIH1cblxuICAgIHNldCBkM2Vudih2YWwpIHtcbiAgICAgICAgdGhpcy5fZDNlbnYgPSB2YWw7XG4gICAgfVxuXG5cbiAgICBnZXQgbGF5ZXJEYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJEYXRhO1xuICAgIH1cblxuICAgIHNldCBsYXllckRhdGEodmFsKSB7XG4gICAgICAgIHRoaXMuX2xheWVyRGF0YSA9IHZhbDtcbiAgICB9XG5cblxuICAgIGdldCBnKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZztcbiAgICB9XG5cbiAgICBzZXQgZyh2YWwpIHtcbiAgICAgICAgdGhpcy5fZyA9IHZhbDtcbiAgICB9XG5cbiAgICBnZXQgcXVhbnRpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9xdWFudGl6ZTtcbiAgICB9XG5cbiAgICBzZXQgcXVhbnRpemUodmFsKSB7XG4gICAgICAgIHRoaXMuX3F1YW50aXplID0gdmFsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUdyYXBoOyJdfQ==
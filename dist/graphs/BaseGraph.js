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

// FIXME: update this to use d3 4.x

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9CYXNlR3JhcGguanMiXSwibmFtZXMiOlsiZDMiLCJCYXNlR3JhcGgiLCJfZDNlbnYiLCJfbGF5ZXJEYXRhIiwiX2ciLCJfcXVhbnRpemUiLCJkYXRhU2V0IiwiX3NlbGYiLCJwcmVwYXJlRGF0YSIsInRoZW4iLCJyZXMiLCJsYXllckRhdGEiLCJkM2VudiIsIm1hcCIsImxkIiwiaSIsImxheWVyQ291bnQiLCJsYXllclN0YXRzIiwiY2hhbm5lbHMiLCJjaGFubmVsVGl0bGUiLCJjaGFubmVsVGl0bGVzIiwiam9pbiIsImNvbnNvbGUiLCJsb2ciLCJwcm9taXNpZnkiLCJqc2RvbUVudiIsImciLCJkcmF3Q29udGVudCIsInF1YW50aXplIiwicXVhbnRpemVEYXRhIiwiZGF0YSIsInRpdGxlIiwiY29uY3VycmVuY3kiLCJncmFwaHMiLCJwdXNoIiwiY2IiLCJ3aWR0aCIsIk1hdGgiLCJjZWlsIiwiZHVyYXRpb24iLCJjb25maWciLCJwaXhlbHNQZXJTZWNvbmQiLCJoZWlnaHQiLCJkaXNwbGF5RGltZW5zaW9ucyIsIm1hcmdpbnMiLCJ0b3AiLCJib3R0b20iLCJlbnYiLCJmZWF0dXJlcyIsIlF1ZXJ5U2VsZWN0b3IiLCJodG1sIiwiZG9uZSIsImVyciIsIndpbmRvdyIsInNlbGVjdCIsImRvY3VtZW50IiwiZG9jV2lkdGgiLCJsZWZ0IiwicmlnaHQiLCJkb2NIZWlnaHQiLCJhcHBlbmQiLCJhdHRyIiwic3R5bGUiLCJyZXNvbHZlIiwibGF5ZXJNYXgiLCJtaW5YIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibWluWSIsIm1heFgiLCJNSU5fVkFMVUUiLCJtYXhZIiwibGF5ZXJSZXMiLCJhbGwiLCJjb3JvdXRpbmUiLCJjaGFubmVsIiwibGFzdF90IiwiZXZlbnRzIiwic29ydCIsImEiLCJiIiwidGltZSIsIm5vcm1hbGl6ZWQiLCJzdGF0cyIsInV1aWQiLCJtYXgiLCJtaW4iLCJ2YWx1ZSIsImFzVW5pdCIsImV2ZW50IiwibGF5ZXJSZXNvbHV0aW9uTGltaXQiLCJ4IiwieSIsImxzdGVwcyIsInF1YW50aXplZExheWVycyIsImxlbmd0aCIsInNoaWZ0IiwicXVhbnQiLCJuIiwidCIsImlkeCIsImZsb29yIiwiY29uY2F0IiwicmVxdWlyZSIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFBWUEsRTs7QUFDWjs7OztBQUNBOzs7Ozs7OztBQUVBOztJQUVNQyxTO0FBQ0YseUJBQWM7QUFBQTs7QUFDVixhQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsSUFBbEI7QUFDQSxhQUFLQyxFQUFMLEdBQVUsSUFBVjs7QUFFQSxhQUFLQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0g7Ozs7NkJBR0lDLE8sRUFBUztBQUNWLGdCQUFNQyxRQUFRLElBQWQ7QUFDQSxtQkFBT0EsTUFBTUMsV0FBTixDQUFrQkYsT0FBbEIsRUFDRkcsSUFERSxDQUNHLFVBQVVDLEdBQVYsRUFBZTtBQUNqQkgsc0JBQU1JLFNBQU4sR0FBa0JELEdBQWxCO0FBQ0Esb0JBQUlFLGNBQUo7QUFDQSx1QkFBTyxtQkFBUUMsR0FBUixDQUFZTixNQUFNSSxTQUFsQixFQUE2QixVQUFDRyxFQUFELEVBQUtDLENBQUwsRUFBVztBQUMzQ0gsNEJBQVEsc0JBQWMsRUFBZCxFQUFrQkwsTUFBTUssS0FBeEIsQ0FBUjtBQUNBQSwwQkFBTUQsU0FBTixHQUFrQixDQUFDRyxFQUFELENBQWxCO0FBQ0FGLDBCQUFNSSxVQUFOLEdBQW1CLENBQW5CO0FBQ0FKLDBCQUFNSyxVQUFOLEdBQW1CLENBQUNWLE1BQU1LLEtBQU4sQ0FBWUssVUFBWixDQUF1QkYsQ0FBdkIsQ0FBRCxDQUFuQjtBQUNBSCwwQkFBTU0sUUFBTixHQUFpQixDQUFDWCxNQUFNSyxLQUFOLENBQVlNLFFBQVosQ0FBcUJILENBQXJCLENBQUQsQ0FBakI7QUFDQUgsMEJBQU1PLFlBQU4sR0FBcUIsQ0FBQ1osTUFBTUssS0FBTixDQUFZUSxhQUFaLENBQTBCTCxDQUExQixD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Q1IsbUJBQU8sS0FBS3JHLE1BQVo7QUFDSCxTOzBCQUVTc0csRyxFQUFLO0FBQ1gsaUJBQUt0RyxNQUFMLEdBQWNzRyxHQUFkO0FBQ0g7Ozs0QkFHZTtBQUNaLG1CQUFPLEtBQUtyRyxVQUFaO0FBQ0gsUzswQkFFYXFHLEcsRUFBSztBQUNmLGlCQUFLckcsVUFBTCxHQUFrQnFHLEdBQWxCO0FBQ0g7Ozs0QkFHTztBQUNKLG1CQUFPLEtBQUtwRyxFQUFaO0FBQ0gsUzswQkFFS29HLEcsRUFBSztBQUNQLGlCQUFLcEcsRUFBTCxHQUFVb0csR0FBVjtBQUNIOzs7NEJBRWM7QUFDWCxtQkFBTyxLQUFLbkcsU0FBWjtBQUNILFM7MEJBRVltRyxHLEVBQUs7QUFDZCxpQkFBS25HLFNBQUwsR0FBaUJtRyxHQUFqQjtBQUNIOzs7OztrQkFHVXZHLFMiLCJmaWxlIjoiZ3JhcGhzL0Jhc2VHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBqc2RvbSBmcm9tICdqc2RvbSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbi8vIEZJWE1FOiB1cGRhdGUgdGhpcyB0byB1c2UgZDMgNC54XG5cbmNsYXNzIEJhc2VHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2QzZW52ID0ge307XG4gICAgICAgIHRoaXMuX2xheWVyRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2cgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3F1YW50aXplID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBkcmF3KGRhdGFTZXQpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gX3NlbGYucHJlcGFyZURhdGEoZGF0YVNldClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5sYXllckRhdGEgPSByZXM7XG4gICAgICAgICAgICAgICAgbGV0IGQzZW52O1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChfc2VsZi5sYXllckRhdGEsIChsZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkM2VudiA9IE9iamVjdC5hc3NpZ24oe30sIF9zZWxmLmQzZW52KTtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYubGF5ZXJEYXRhID0gW2xkXTtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYubGF5ZXJDb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmxheWVyU3RhdHMgPSBbX3NlbGYuZDNlbnYubGF5ZXJTdGF0c1tpXV07XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmNoYW5uZWxzID0gW19zZWxmLmQzZW52LmNoYW5uZWxzW2ldXTtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYuY2hhbm5lbFRpdGxlID0gW19zZWxmLmQzZW52LmNoYW5uZWxUaXRsZXNbaV1dLmpvaW4oJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYENyZWF0aW5nIGdyYXBoIGZvciBjaGFubmVsICR7ZDNlbnYuY2hhbm5lbFRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoX3NlbGYuanNkb21FbnYpKGQzZW52LCBkM2Vudi5sYXllckRhdGEsIGQzZW52LmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5kcmF3Q29udGVudCwgX3NlbGYucXVhbnRpemUgPyBfc2VsZi5xdWFudGl6ZURhdGEgOiBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBkYXRhLCB0aXRsZTogZDNlbnYuY2hhbm5lbFRpdGxlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCB7Y29uY3VycmVuY3k6IDF9KVxuICAgICAgICAgICAgICAgIC50aGVuKChncmFwaHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0NyZWF0aW5nIGdyYXBoIGZvciBhbGwgY2hhbm5lbHMnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucHJvbWlzaWZ5KF9zZWxmLmpzZG9tRW52KShfc2VsZi5kM2VudiwgX3NlbGYubGF5ZXJEYXRhLCBkM2Vudi5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuZHJhd0NvbnRlbnQsIF9zZWxmLnF1YW50aXplID8gX3NlbGYucXVhbnRpemVEYXRhIDogbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhzLnB1c2goeyBkYXRhOiBkYXRhLCB0aXRsZTogJ2FsbCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyYXBocztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAganNkb21FbnYoZDNlbnYsIGxheWVyRGF0YSwgZywgZHJhd0NvbnRlbnQsIHF1YW50aXplRGF0YSwgY2IpIHtcbiAgICAgICAgLy8gVE9ETzogdXBkYXRlIGQzIHRvIHZlcnNpb24gNFxuXG4gICAgICAgIGQzZW52LndpZHRoID0gTWF0aC5jZWlsKGQzZW52LmR1cmF0aW9uICogZDNlbnYuY29uZmlnLnBpeGVsc1BlclNlY29uZCk7XG4gICAgICAgIGQzZW52LmhlaWdodCA9IGQzZW52LmNvbmZpZy5kaXNwbGF5RGltZW5zaW9ucy5oZWlnaHQgLSBkM2Vudi5jb25maWcubWFyZ2lucy50b3AgLSBkM2Vudi5jb25maWcubWFyZ2lucy5ib3R0b207XG4gICAgICAgIGQzZW52LmQzID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZDNlbnYuZDMsIGQzKTtcbiAgICAgICAgcmV0dXJuIGpzZG9tLmVudih7XG4gICAgICAgICAgICBmZWF0dXJlczoge1F1ZXJ5U2VsZWN0b3I6IHRydWV9LCBodG1sOiAnPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PicgK1xuICAgICAgICAgICAgJzxzY3JpcHQgc3JjPVwiaHR0cDovL2QzanMub3JnL2QzLnYzLm1pbi5qc1wiPjwvc2NyaXB0PjwvYm9keT48L2h0bWw+JyxcbiAgICAgICAgICAgIGRvbmU6IGZ1bmN0aW9uIChlcnIsIHdpbmRvdykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kMyA9IGQzZW52LmQzLnNlbGVjdCh3aW5kb3cuZG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgIGQzZW52LndpbmRvdyA9IHdpbmRvdztcbiAgICAgICAgICAgICAgICBkM2Vudi5kb2NXaWR0aCA9IGQzZW52LndpZHRoICsgZDNlbnYuY29uZmlnLm1hcmdpbnMubGVmdCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGQzZW52LmRvY0hlaWdodCA9IGQzZW52LmNvbmZpZy5kaXNwbGF5RGltZW5zaW9ucy5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBnID0gd2luZG93LmQzLnNlbGVjdCgnYm9keScpLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZDNlbnYuZG9jV2lkdGgpLmF0dHIoJ2hlaWdodCcsIGQzZW52LmRvY0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnY29udGFpbmVyJykuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBkM2Vudi5kb2NXaWR0aCkuYXR0cignaGVpZ2h0JywgZDNlbnYuZG9jSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCdjb250YWluZXInKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJyxgdHJhbnNsYXRlKCR7ZDNlbnYuY29uZmlnLm1hcmdpbnMubGVmdH0sICR7ZDNlbnYuY29uZmlnLm1hcmdpbnMudG9wfSlgKTtcblxuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAwIC0gZDNlbnYuY29uZmlnLm1hcmdpbnMubGVmdClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwIC0gZDNlbnYuY29uZmlnLm1hcmdpbnMudG9wKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBkM2Vudi5kb2NXaWR0aCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkM2Vudi5kb2NIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKS5zdHlsZSgnZmlsbCcsICdibGFjaycpO1xuXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWFudGl6ZURhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVhbnRpemVEYXRhKGxheWVyRGF0YSwgZDNlbnYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmF3Q29udGVudChkM2VudiwgbGF5ZXJEYXRhLCBnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZDNlbnYud2luZG93LmQzLnNlbGVjdCgnLmNvbnRhaW5lcicpLmh0bWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGRyYXdDb250ZW50KCkge1xuICAgICAgICAvKiBpZ25vcmVkICovXG4gICAgfVxuXG5cbiAgICBwcmVwYXJlRGF0YShkYXRhU2V0KSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sYXllckRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5kM2Vudi5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgdGhpcy5kM2Vudi5sYXllckNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kM2Vudi5sYXllck1heCA9IDA7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJTdGF0cyA9IFtdO1xuICAgICAgICB0aGlzLmQzZW52Lm1pblggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52Lm1pblkgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52Lm1heFggPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52Lm1heFkgPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52LmR1cmF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5kM2Vudi5sYXllclJlcyA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgICAgICB0aGlzLmQzZW52LmNoYW5uZWxzID0gW107XG4gICAgICAgIHRoaXMuZDNlbnYuY2hhbm5lbFRpdGxlcyA9IFtdO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLm1hcChkYXRhU2V0LmFsbCwgUHJvbWlzZS5jb3JvdXRpbmUoZnVuY3Rpb24qIChjaGFubmVsKSB7XG4gICAgICAgICAgICBsZXQgbGFzdF90ID0gMC4wLFxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IGNoYW5uZWwuYWxsLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEudGltZS5ub3JtYWxpemVkKCkgPiBiLnRpbWUubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhLnRpbWUubm9ybWFsaXplZCgpIDwgYi50aW1lLm5vcm1hbGl6ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgc3RhdHMgPSBjaGFubmVsLnN0YXRzO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYuY2hhbm5lbHMucHVzaChjaGFubmVsLnV1aWQpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYuY2hhbm5lbFRpdGxlcy5wdXNoKGNoYW5uZWwudGl0bGUpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJTdGF0cy5wdXNoKHN0YXRzKTtcblxuICAgICAgICAgICAgX3NlbGYuZDNlbnYuZHVyYXRpb24gPSBNYXRoLm1heChfc2VsZi5kM2Vudi5kdXJhdGlvbiwgc3RhdHMuZHVyYXRpb24ubm9ybWFsaXplZCgpKTtcbiAgICAgICAgICAgIF9zZWxmLmQzZW52Lm1heFggPSBNYXRoLm1heChfc2VsZi5kM2Vudi5tYXhYLCBzdGF0cy50aW1lLm1heC5ub3JtYWxpemVkKCkpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubWluWCA9IE1hdGgubWluKF9zZWxmLmQzZW52Lm1pblgsIHN0YXRzLnRpbWUubWluLm5vcm1hbGl6ZWQoKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5tYXhZID0gTWF0aC5tYXgoX3NlbGYuZDNlbnYubWF4WSwgc3RhdHMudmFsdWUubWF4LmFzVW5pdCgnbVYnKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5taW5ZID0gTWF0aC5taW4oX3NlbGYuZDNlbnYubWluWSwgc3RhdHMudmFsdWUubWluLmFzVW5pdCgnbVYnKSk7XG5cbiAgICAgICAgICAgIGV2ZW50cyA9IHlpZWxkIFByb21pc2UubWFwKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJSZXMgPSBNYXRoLm1pbihNYXRoLm1heChldmVudC50aW1lLm5vcm1hbGl6ZWQoKSAtIGxhc3RfdCxcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuY29uZmlnLmxheWVyUmVzb2x1dGlvbkxpbWl0KSwgX3NlbGYuY29uZmlnLmxheWVyUmVzb2x1dGlvbkxpbWl0KTtcbiAgICAgICAgICAgICAgICBsYXN0X3QgPSBldmVudC50aW1lLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBldmVudC50aW1lLm5vcm1hbGl6ZWQoKSwgeTogZXZlbnQudmFsdWUuYXNVbml0KCdtVicpIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJDb3VudCArPSAxO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG5cbiAgICBxdWFudGl6ZURhdGEobGF5ZXJEYXRhLCBkM2Vudikge1xuICAgICAgICBsZXQgbHN0ZXBzID0gTWF0aC5jZWlsKGQzZW52LmR1cmF0aW9uIC8gZDNlbnYubGF5ZXJSZXMpLFxuICAgICAgICAgICAgcXVhbnRpemVkTGF5ZXJzID0gW107XG5cbiAgICAgICAgd2hpbGUgKGxheWVyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGQgPSBsYXllckRhdGEuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBxdWFudCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBsc3RlcHM7IG4gKz0gMSkge1xuICAgICAgICAgICAgICAgIHF1YW50LnB1c2goe3g6IG4gKiBkM2Vudi5sYXllclJlcywgeTogMC4wfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IGxkLmxlbmd0aCAmJiB0IDwgcXVhbnQubGVuZ3RoOyB0ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gTWF0aC5mbG9vcihsZFt0XS54IC8gZDNlbnYubGF5ZXJSZXMpO1xuICAgICAgICAgICAgICAgIGlmIChsZFt0XSAmJiBxdWFudFtpZHhdICYmIGxkW3RdLnkgPiBxdWFudFtpZHhdLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRbaWR4XS55ID0gbGRbdF0ueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWFudGl6ZWRMYXllcnMucHVzaChxdWFudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGF5ZXJEYXRhLmNvbmNhdChxdWFudGl6ZWRMYXllcnMpO1xuICAgIH1cblxuXG4gICAgZ2V0IGNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9ncmFwaHMuanNvbicpO1xuICAgIH1cblxuXG4gICAgZ2V0IGQzZW52KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZDNlbnY7XG4gICAgfVxuXG4gICAgc2V0IGQzZW52KHZhbCkge1xuICAgICAgICB0aGlzLl9kM2VudiA9IHZhbDtcbiAgICB9XG5cblxuICAgIGdldCBsYXllckRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllckRhdGE7XG4gICAgfVxuXG4gICAgc2V0IGxheWVyRGF0YSh2YWwpIHtcbiAgICAgICAgdGhpcy5fbGF5ZXJEYXRhID0gdmFsO1xuICAgIH1cblxuXG4gICAgZ2V0IGcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xuICAgIH1cblxuICAgIHNldCBnKHZhbCkge1xuICAgICAgICB0aGlzLl9nID0gdmFsO1xuICAgIH1cblxuICAgIGdldCBxdWFudGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1YW50aXplO1xuICAgIH1cblxuICAgIHNldCBxdWFudGl6ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fcXVhbnRpemUgPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlR3JhcGg7Il19
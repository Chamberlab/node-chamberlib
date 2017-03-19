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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9CYXNlR3JhcGguanMiXSwibmFtZXMiOlsiZDMiLCJCYXNlR3JhcGgiLCJfZDNlbnYiLCJfbGF5ZXJEYXRhIiwiX2ciLCJfcXVhbnRpemUiLCJkYXRhU2V0IiwiX3NlbGYiLCJwcmVwYXJlRGF0YSIsInRoZW4iLCJyZXMiLCJsYXllckRhdGEiLCJkM2VudiIsIm1hcCIsImxkIiwiaSIsImxheWVyQ291bnQiLCJsYXllclN0YXRzIiwiY2hhbm5lbHMiLCJjaGFubmVsVGl0bGUiLCJjaGFubmVsVGl0bGVzIiwiam9pbiIsInByb21pc2lmeSIsImpzZG9tRW52IiwiZyIsImRyYXdDb250ZW50IiwicXVhbnRpemUiLCJxdWFudGl6ZURhdGEiLCJkYXRhIiwidGl0bGUiLCJjb25jdXJyZW5jeSIsImdyYXBocyIsInB1c2giLCJjYiIsIndpZHRoIiwiTWF0aCIsImNlaWwiLCJkdXJhdGlvbiIsImNvbmZpZyIsInBpeGVsc1BlclNlY29uZCIsImhlaWdodCIsImRpc3BsYXlEaW1lbnNpb25zIiwibWFyZ2lucyIsInRvcCIsImJvdHRvbSIsImVudiIsImZlYXR1cmVzIiwiUXVlcnlTZWxlY3RvciIsImh0bWwiLCJkb25lIiwiZXJyIiwid2luZG93Iiwic2VsZWN0IiwiZG9jdW1lbnQiLCJkb2NXaWR0aCIsImxlZnQiLCJyaWdodCIsImRvY0hlaWdodCIsImFwcGVuZCIsImF0dHIiLCJzdHlsZSIsInJlc29sdmUiLCJsYXllck1heCIsIm1pblgiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJtaW5ZIiwibWF4WCIsIk1JTl9WQUxVRSIsIm1heFkiLCJsYXllclJlcyIsImFsbCIsImNvcm91dGluZSIsImNoYW5uZWwiLCJsYXN0X3QiLCJldmVudHMiLCJzb3J0IiwiYSIsImIiLCJ0aW1lIiwibm9ybWFsaXplZCIsInN0YXRzIiwidXVpZCIsIm1heCIsIm1pbiIsInZhbHVlIiwiYXNVbml0IiwiZXZlbnQiLCJsYXllclJlc29sdXRpb25MaW1pdCIsIngiLCJ5IiwibHN0ZXBzIiwicXVhbnRpemVkTGF5ZXJzIiwibGVuZ3RoIiwic2hpZnQiLCJxdWFudCIsIm4iLCJ0IiwiaWR4IiwiZmxvb3IiLCJjb25jYXQiLCJyZXF1aXJlIiwidmFsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUFZQSxFOztBQUNaOzs7O0FBQ0E7Ozs7Ozs7O0FBRUE7O0lBRU1DLFM7QUFDRix5QkFBYztBQUFBOztBQUNWLGFBQUtDLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNBLGFBQUtDLEVBQUwsR0FBVSxJQUFWOztBQUVBLGFBQUtDLFNBQUwsR0FBaUIsS0FBakI7QUFDSDs7Ozs2QkFHSUMsTyxFQUFTO0FBQ1YsZ0JBQU1DLFFBQVEsSUFBZDtBQUNBLG1CQUFPQSxNQUFNQyxXQUFOLENBQWtCRixPQUFsQixFQUNGRyxJQURFLENBQ0csVUFBVUMsR0FBVixFQUFlO0FBQ2pCSCxzQkFBTUksU0FBTixHQUFrQkQsR0FBbEI7QUFDQSxvQkFBSUUsY0FBSjtBQUNBLHVCQUFPLG1CQUFRQyxHQUFSLENBQVlOLE1BQU1JLFNBQWxCLEVBQTZCLFVBQUNHLEVBQUQsRUFBS0MsQ0FBTCxFQUFXO0FBQzNDSCw0QkFBUSxzQkFBYyxFQUFkLEVBQWtCTCxNQUFNSyxLQUF4QixDQUFSO0FBQ0FBLDBCQUFNRCxTQUFOLEdBQWtCLENBQUNHLEVBQUQsQ0FBbEI7QUFDQUYsMEJBQU1JLFVBQU4sR0FBbUIsQ0FBbkI7QUFDQUosMEJBQU1LLFVBQU4sR0FBbUIsQ0FBQ1YsTUFBTUssS0FBTixDQUFZSyxVQUFaLENBQXVCRixDQUF2QixDQUFELENBQW5CO0FBQ0FILDBCQUFNTSxRQUFOLEdBQWlCLENBQUNYLE1BQU1LLEtBQU4sQ0FBWU0sUUFBWixDQUFxQkgsQ0FBckIsQ0FBRCxDQUFqQjtBQUNBSCwwQkFBTU8sWUFBTixHQUFxQixDQUFDWixNQUFNSyxLQUFOLENBQVlRLGFBQVosQ0FBMEJMLENBQTFCLENBQUQsRUFBK0JNLElBQS9C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Ozs0QkFHZTtBQUNaLG1CQUFPLEtBQUtuRyxVQUFaO0FBQ0gsUzswQkFFYW1HLEcsRUFBSztBQUNmLGlCQUFLbkcsVUFBTCxHQUFrQm1HLEdBQWxCO0FBQ0g7Ozs0QkFHTztBQUNKLG1CQUFPLEtBQUtsRyxFQUFaO0FBQ0gsUzswQkFFS2tHLEcsRUFBSztBQUNQLGlCQUFLbEcsRUFBTCxHQUFVa0csR0FBVjtBQUNIOzs7NEJBRWM7QUFDWCxtQkFBTyxLQUFLakcsU0FBWjtBQUNILFM7MEJBRVlpRyxHLEVBQUs7QUFDZCxpQkFBS2pHLFNBQUwsR0FBaUJpRyxHQUFqQjtBQUNIOzs7OztrQkFHVXJHLFMiLCJmaWxlIjoiZ3JhcGhzL0Jhc2VHcmFwaC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcbmltcG9ydCBqc2RvbSBmcm9tICdqc2RvbSc7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5cbi8vIEZJWE1FOiB1cGRhdGUgdGhpcyB0byB1c2UgZDMgNC54XG5cbmNsYXNzIEJhc2VHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2QzZW52ID0ge307XG4gICAgICAgIHRoaXMuX2xheWVyRGF0YSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2cgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3F1YW50aXplID0gZmFsc2U7XG4gICAgfVxuXG5cbiAgICBkcmF3KGRhdGFTZXQpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICByZXR1cm4gX3NlbGYucHJlcGFyZURhdGEoZGF0YVNldClcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXMpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5sYXllckRhdGEgPSByZXM7XG4gICAgICAgICAgICAgICAgbGV0IGQzZW52O1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChfc2VsZi5sYXllckRhdGEsIChsZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBkM2VudiA9IE9iamVjdC5hc3NpZ24oe30sIF9zZWxmLmQzZW52KTtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYubGF5ZXJEYXRhID0gW2xkXTtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYubGF5ZXJDb3VudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmxheWVyU3RhdHMgPSBbX3NlbGYuZDNlbnYubGF5ZXJTdGF0c1tpXV07XG4gICAgICAgICAgICAgICAgICAgIGQzZW52LmNoYW5uZWxzID0gW19zZWxmLmQzZW52LmNoYW5uZWxzW2ldXTtcbiAgICAgICAgICAgICAgICAgICAgZDNlbnYuY2hhbm5lbFRpdGxlID0gW19zZWxmLmQzZW52LmNoYW5uZWxUaXRsZXNbaV1dLmpvaW4oJy0nKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYENyZWF0aW5nIGdyYXBoIGZvciBjaGFubmVsICR7ZDNlbnYuY2hhbm5lbFRpdGxlfWApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoX3NlbGYuanNkb21FbnYpKGQzZW52LCBkM2Vudi5sYXllckRhdGEsIGQzZW52LmcsXG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5kcmF3Q29udGVudCwgX3NlbGYucXVhbnRpemUgPyBfc2VsZi5xdWFudGl6ZURhdGEgOiBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBkYXRhLCB0aXRsZTogZDNlbnYuY2hhbm5lbFRpdGxlIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LCB7Y29uY3VycmVuY3k6IDF9KVxuICAgICAgICAgICAgICAgIC50aGVuKChncmFwaHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0NyZWF0aW5nIGdyYXBoIGZvciBhbGwgY2hhbm5lbHMnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucHJvbWlzaWZ5KF9zZWxmLmpzZG9tRW52KShfc2VsZi5kM2VudiwgX3NlbGYubGF5ZXJEYXRhLCBkM2Vudi5nLFxuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuZHJhd0NvbnRlbnQsIF9zZWxmLnF1YW50aXplID8gX3NlbGYucXVhbnRpemVEYXRhIDogbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JhcGhzLnB1c2goeyBkYXRhOiBkYXRhLCB0aXRsZTogJ2FsbCcgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdyYXBocztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAganNkb21FbnYoZDNlbnYsIGxheWVyRGF0YSwgZywgZHJhd0NvbnRlbnQsIHF1YW50aXplRGF0YSwgY2IpIHtcbiAgICAgICAgLy8gVE9ETzogdXBkYXRlIGQzIHRvIHZlcnNpb24gNFxuXG4gICAgICAgIGQzZW52LndpZHRoID0gTWF0aC5jZWlsKGQzZW52LmR1cmF0aW9uICogZDNlbnYuY29uZmlnLnBpeGVsc1BlclNlY29uZCk7XG4gICAgICAgIGQzZW52LmhlaWdodCA9IGQzZW52LmNvbmZpZy5kaXNwbGF5RGltZW5zaW9ucy5oZWlnaHQgLSBkM2Vudi5jb25maWcubWFyZ2lucy50b3AgLSBkM2Vudi5jb25maWcubWFyZ2lucy5ib3R0b207XG4gICAgICAgIGQzZW52LmQzID0ge307XG4gICAgICAgIE9iamVjdC5hc3NpZ24oZDNlbnYuZDMsIGQzKTtcbiAgICAgICAgcmV0dXJuIGpzZG9tLmVudih7XG4gICAgICAgICAgICBmZWF0dXJlczoge1F1ZXJ5U2VsZWN0b3I6IHRydWV9LCBodG1sOiAnPCFET0NUWVBFIGh0bWw+PGh0bWw+PGhlYWQ+PC9oZWFkPjxib2R5PicgK1xuICAgICAgICAgICAgJzxzY3JpcHQgc3JjPVwiaHR0cDovL2QzanMub3JnL2QzLnYzLm1pbi5qc1wiPjwvc2NyaXB0PjwvYm9keT48L2h0bWw+JyxcbiAgICAgICAgICAgIGRvbmU6IGZ1bmN0aW9uIChlcnIsIHdpbmRvdykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5kMyA9IGQzZW52LmQzLnNlbGVjdCh3aW5kb3cuZG9jdW1lbnQpO1xuICAgICAgICAgICAgICAgIGQzZW52LndpbmRvdyA9IHdpbmRvdztcbiAgICAgICAgICAgICAgICBkM2Vudi5kb2NXaWR0aCA9IGQzZW52LndpZHRoICsgZDNlbnYuY29uZmlnLm1hcmdpbnMubGVmdCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLnJpZ2h0O1xuICAgICAgICAgICAgICAgIGQzZW52LmRvY0hlaWdodCA9IGQzZW52LmNvbmZpZy5kaXNwbGF5RGltZW5zaW9ucy5oZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBnID0gd2luZG93LmQzLnNlbGVjdCgnYm9keScpLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZDNlbnYuZG9jV2lkdGgpLmF0dHIoJ2hlaWdodCcsIGQzZW52LmRvY0hlaWdodClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywnY29udGFpbmVyJykuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBkM2Vudi5kb2NXaWR0aCkuYXR0cignaGVpZ2h0JywgZDNlbnYuZG9jSGVpZ2h0KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCdjb250YWluZXInKS5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJyxgdHJhbnNsYXRlKCR7ZDNlbnYuY29uZmlnLm1hcmdpbnMubGVmdH0sICR7ZDNlbnYuY29uZmlnLm1hcmdpbnMudG9wfSlgKTtcblxuICAgICAgICAgICAgICAgIGcuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3gnLCAwIC0gZDNlbnYuY29uZmlnLm1hcmdpbnMubGVmdClcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3knLCAwIC0gZDNlbnYuY29uZmlnLm1hcmdpbnMudG9wKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCBkM2Vudi5kb2NXaWR0aCArIGQzZW52LmNvbmZpZy5tYXJnaW5zLmxlZnQpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCBkM2Vudi5kb2NIZWlnaHQpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgJ25vbmUnKS5zdHlsZSgnZmlsbCcsICdibGFjaycpO1xuXG4gICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBxdWFudGl6ZURhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcXVhbnRpemVEYXRhKGxheWVyRGF0YSwgZDNlbnYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkcmF3Q29udGVudChkM2VudiwgbGF5ZXJEYXRhLCBnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2IobnVsbCwgZDNlbnYud2luZG93LmQzLnNlbGVjdCgnLmNvbnRhaW5lcicpLmh0bWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGRyYXdDb250ZW50KCkge1xuICAgICAgICAvKiBpZ25vcmVkICovXG4gICAgfVxuXG5cbiAgICBwcmVwYXJlRGF0YShkYXRhU2V0KSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5sYXllckRhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5kM2Vudi5jb25maWcgPSB0aGlzLmNvbmZpZztcbiAgICAgICAgdGhpcy5kM2Vudi5sYXllckNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kM2Vudi5sYXllck1heCA9IDA7XG4gICAgICAgIHRoaXMuZDNlbnYubGF5ZXJTdGF0cyA9IFtdO1xuICAgICAgICB0aGlzLmQzZW52Lm1pblggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52Lm1pblkgPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52Lm1heFggPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52Lm1heFkgPSBOdW1iZXIuTUlOX1ZBTFVFO1xuICAgICAgICB0aGlzLmQzZW52LmR1cmF0aW9uID0gMDtcbiAgICAgICAgdGhpcy5kM2Vudi5sYXllclJlcyA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xuICAgICAgICB0aGlzLmQzZW52LmNoYW5uZWxzID0gW107XG4gICAgICAgIHRoaXMuZDNlbnYuY2hhbm5lbFRpdGxlcyA9IFtdO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLm1hcChkYXRhU2V0LmFsbCwgUHJvbWlzZS5jb3JvdXRpbmUoZnVuY3Rpb24qIChjaGFubmVsKSB7XG4gICAgICAgICAgICBsZXQgbGFzdF90ID0gMC4wLFxuICAgICAgICAgICAgICAgIGV2ZW50cyA9IGNoYW5uZWwuYWxsLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEudGltZS5ub3JtYWxpemVkKCkgPiBiLnRpbWUubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhLnRpbWUubm9ybWFsaXplZCgpIDwgYi50aW1lLm5vcm1hbGl6ZWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgc3RhdHMgPSBjaGFubmVsLnN0YXRzO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYuY2hhbm5lbHMucHVzaChjaGFubmVsLnV1aWQpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYuY2hhbm5lbFRpdGxlcy5wdXNoKGNoYW5uZWwudGl0bGUpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJTdGF0cy5wdXNoKHN0YXRzKTtcblxuICAgICAgICAgICAgX3NlbGYuZDNlbnYuZHVyYXRpb24gPSBNYXRoLm1heChfc2VsZi5kM2Vudi5kdXJhdGlvbiwgc3RhdHMuZHVyYXRpb24ubm9ybWFsaXplZCgpKTtcbiAgICAgICAgICAgIF9zZWxmLmQzZW52Lm1heFggPSBNYXRoLm1heChfc2VsZi5kM2Vudi5tYXhYLCBzdGF0cy50aW1lLm1heC5ub3JtYWxpemVkKCkpO1xuICAgICAgICAgICAgX3NlbGYuZDNlbnYubWluWCA9IE1hdGgubWluKF9zZWxmLmQzZW52Lm1pblgsIHN0YXRzLnRpbWUubWluLm5vcm1hbGl6ZWQoKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5tYXhZID0gTWF0aC5tYXgoX3NlbGYuZDNlbnYubWF4WSwgc3RhdHMudmFsdWUubWF4LmFzVW5pdCgnbVYnKSk7XG4gICAgICAgICAgICBfc2VsZi5kM2Vudi5taW5ZID0gTWF0aC5taW4oX3NlbGYuZDNlbnYubWluWSwgc3RhdHMudmFsdWUubWluLmFzVW5pdCgnbVYnKSk7XG5cbiAgICAgICAgICAgIGV2ZW50cyA9IHlpZWxkIFByb21pc2UubWFwKGV2ZW50cywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJSZXMgPSBNYXRoLm1pbihNYXRoLm1heChldmVudC50aW1lLm5vcm1hbGl6ZWQoKSAtIGxhc3RfdCxcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuY29uZmlnLmxheWVyUmVzb2x1dGlvbkxpbWl0KSwgX3NlbGYuY29uZmlnLmxheWVyUmVzb2x1dGlvbkxpbWl0KTtcbiAgICAgICAgICAgICAgICBsYXN0X3QgPSBldmVudC50aW1lLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4OiBldmVudC50aW1lLm5vcm1hbGl6ZWQoKSwgeTogZXZlbnQudmFsdWUuYXNVbml0KCdtVicpIH07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgX3NlbGYuZDNlbnYubGF5ZXJDb3VudCArPSAxO1xuXG4gICAgICAgICAgICByZXR1cm4gZXZlbnRzO1xuICAgICAgICB9KSk7XG4gICAgfVxuXG5cbiAgICBxdWFudGl6ZURhdGEobGF5ZXJEYXRhLCBkM2Vudikge1xuICAgICAgICBsZXQgbHN0ZXBzID0gTWF0aC5jZWlsKGQzZW52LmR1cmF0aW9uIC8gZDNlbnYubGF5ZXJSZXMpLFxuICAgICAgICAgICAgcXVhbnRpemVkTGF5ZXJzID0gW107XG5cbiAgICAgICAgd2hpbGUgKGxheWVyRGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXQgbGQgPSBsYXllckRhdGEuc2hpZnQoKSxcbiAgICAgICAgICAgICAgICBxdWFudCA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgbiA9IDA7IG4gPCBsc3RlcHM7IG4gKz0gMSkge1xuICAgICAgICAgICAgICAgIHF1YW50LnB1c2goe3g6IG4gKiBkM2Vudi5sYXllclJlcywgeTogMC4wfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGxldCB0ID0gMDsgdCA8IGxkLmxlbmd0aCAmJiB0IDwgcXVhbnQubGVuZ3RoOyB0ICs9IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gTWF0aC5mbG9vcihsZFt0XS54IC8gZDNlbnYubGF5ZXJSZXMpO1xuICAgICAgICAgICAgICAgIGlmIChsZFt0XSAmJiBxdWFudFtpZHhdICYmIGxkW3RdLnkgPiBxdWFudFtpZHhdLnkpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVhbnRbaWR4XS55ID0gbGRbdF0ueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxdWFudGl6ZWRMYXllcnMucHVzaChxdWFudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGF5ZXJEYXRhLmNvbmNhdChxdWFudGl6ZWRMYXllcnMpO1xuICAgIH1cblxuXG4gICAgZ2V0IGNvbmZpZygpIHtcbiAgICAgICAgcmV0dXJuIHJlcXVpcmUoJy4uLy4uL2NvbmZpZy9ncmFwaHMuanNvbicpO1xuICAgIH1cblxuXG4gICAgZ2V0IGQzZW52KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZDNlbnY7XG4gICAgfVxuXG4gICAgc2V0IGQzZW52KHZhbCkge1xuICAgICAgICB0aGlzLl9kM2VudiA9IHZhbDtcbiAgICB9XG5cblxuICAgIGdldCBsYXllckRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllckRhdGE7XG4gICAgfVxuXG4gICAgc2V0IGxheWVyRGF0YSh2YWwpIHtcbiAgICAgICAgdGhpcy5fbGF5ZXJEYXRhID0gdmFsO1xuICAgIH1cblxuXG4gICAgZ2V0IGcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xuICAgIH1cblxuICAgIHNldCBnKHZhbCkge1xuICAgICAgICB0aGlzLl9nID0gdmFsO1xuICAgIH1cblxuICAgIGdldCBxdWFudGl6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3F1YW50aXplO1xuICAgIH1cblxuICAgIHNldCBxdWFudGl6ZSh2YWwpIHtcbiAgICAgICAgdGhpcy5fcXVhbnRpemUgPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlR3JhcGg7Il19
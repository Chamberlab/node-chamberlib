'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _svg2png = require('svg2png');

var _svg2png2 = _interopRequireDefault(_svg2png);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _DataSet = require('../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _BaseGraph = require('../graphs/BaseGraph');

var _BaseGraph2 = _interopRequireDefault(_BaseGraph);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataPlotter = function () {
    function DataPlotter(dataSet, dirname, filename) {
        _classCallCheck(this, DataPlotter);

        this.dataSet = dataSet;
        this.dirname = dirname;
        this.filename = filename;
    }

    _createClass(DataPlotter, [{
        key: 'generateChart',
        value: function generateChart(layoutClass) {
            (0, _assert2.default)(layoutClass.prototype instanceof _BaseGraph2.default);

            var _self = this;
            var chart = new layoutClass();
            return chart.draw(this.dataSet).then(function (data) {
                if (Array.isArray(data)) {
                    return _bluebird2.default.map(data, function (gd) {
                        return _self.writeImages(gd.data, gd.title + '-' + chart.constructor.name);
                    }, { concurrency: 1 });
                } else {
                    return _self.writeImages(data, chart.constructor.name);
                }
            });
        }
    }, {
        key: 'writeImages',
        value: function writeImages(data, chartType) {
            var outpath = _path2.default.join(this.dirname, this.filename);
            if (!_fs2.default.existsSync(outpath)) {
                _fs2.default.mkdirSync(outpath);
            }
            outpath = _path2.default.join(outpath, this.filename + ('-' + chartType + '.svg'));
            // console.log(`Writing graph image SVG ${outpath}`);
            return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, data).then(function () {
                return _bluebird2.default.promisify(_fs2.default.readFile)(outpath);
            }).then(function (data) {
                return (0, _svg2png2.default)(data);
            }).then(function (buffer) {
                outpath = outpath.replace(/\.svg$/, '.png');
                // console.log(`Writing graph image PNG ${outpath}`);
                return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, buffer);
            }).catch(function (err) {
                // console.error(err);
                throw err;
            });
        }
    }, {
        key: 'dataSet',
        get: function get() {
            return this._dataSet;
        },
        set: function set(dataSet) {
            (0, _assert2.default)(dataSet instanceof _DataSet2.default, 'Wrong DataSet type: ' + (dataSet ? dataSet.constructor.name : null));
            (0, _assert2.default)(dataSet.size > 0, 'DataSet is empty');
            this._dataSet = dataSet;
        }
    }, {
        key: 'filename',
        get: function get() {
            return this._filename;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string');
            (0, _assert2.default)(val.length > 0);
            this._filename = val;
        }
    }, {
        key: 'dirname',
        get: function get() {
            return this._dirname;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string');
            (0, _assert2.default)(val.length > 0);
            this._dirname = val;
        }
    }]);

    return DataPlotter;
}();

exports.default = DataPlotter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9EYXRhUGxvdHRlci5qcyJdLCJuYW1lcyI6WyJEYXRhUGxvdHRlciIsImRhdGFTZXQiLCJkaXJuYW1lIiwiZmlsZW5hbWUiLCJsYXlvdXRDbGFzcyIsInByb3RvdHlwZSIsIl9zZWxmIiwiY2hhcnQiLCJkcmF3IiwidGhlbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJnZCIsIndyaXRlSW1hZ2VzIiwidGl0bGUiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJjb25jdXJyZW5jeSIsImNoYXJ0VHlwZSIsIm91dHBhdGgiLCJqb2luIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsInByb21pc2lmeSIsIndyaXRlRmlsZSIsInJlYWRGaWxlIiwiYnVmZmVyIiwicmVwbGFjZSIsImNhdGNoIiwiZXJyIiwiX2RhdGFTZXQiLCJzaXplIiwiX2ZpbGVuYW1lIiwidmFsIiwibGVuZ3RoIiwiX2Rpcm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLFc7QUFDRix5QkFBWUMsT0FBWixFQUFxQkMsT0FBckIsRUFBOEJDLFFBQTlCLEVBQXdDO0FBQUE7O0FBQ3BDLGFBQUtGLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLGFBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0g7Ozs7c0NBRWFDLFcsRUFBYTtBQUN2QixrQ0FBT0EsWUFBWUMsU0FBWiwrQkFBUDs7QUFFQSxnQkFBTUMsUUFBUSxJQUFkO0FBQ0EsZ0JBQU1DLFFBQVEsSUFBSUgsV0FBSixFQUFkO0FBQ0EsbUJBQU9HLE1BQU1DLElBQU4sQ0FBVyxLQUFLUCxPQUFoQixFQUNGUSxJQURFLENBQ0csVUFBVUMsSUFBVixFQUFnQjtBQUNsQixvQkFBSUMsTUFBTUMsT0FBTixDQUFjRixJQUFkLENBQUosRUFBeUI7QUFDckIsMkJBQU8sbUJBQVFHLEdBQVIsQ0FBWUgsSUFBWixFQUFrQixVQUFDSSxFQUFELEVBQVE7QUFDN0IsK0JBQU9SLE1BQU1TLFdBQU4sQ0FBa0JELEdBQUdKLElBQXJCLEVBQThCSSxHQUFHRSxLQUFqQyxTQUEwQ1QsTUFBTVUsV0FBTixDQUFrQkMsSUFBNUQsQ0FBUDtBQUNILHFCQUZNLEVBRUosRUFBQ0MsYUFBYSxDQUFkLEVBRkksQ0FBUDtBQUdILGlCQUpELE1BSU87QUFDSCwyQkFBT2IsTUFBTVMsV0FBTixDQUFrQkwsSUFBbEIsRUFBd0JILE1BQU1VLFdBQU4sQ0FBa0JDLElBQTFDLENBQVA7QUFDSDtBQUNKLGFBVEUsQ0FBUDtBQVVIOzs7b0NBRVdSLEksRUFBTVUsUyxFQUFXO0FBQ3pCLGdCQUFJQyxVQUFVLGVBQUtDLElBQUwsQ0FBVSxLQUFLcEIsT0FBZixFQUF3QixLQUFLQyxRQUE3QixDQUFkO0FBQ0EsZ0JBQUksQ0FBQyxhQUFHb0IsVUFBSCxDQUFjRixPQUFkLENBQUwsRUFBNkI7QUFDekIsNkJBQUdHLFNBQUgsQ0FBYUgsT0FBYjtBQUNIO0FBQ0RBLHNCQUFVLGVBQUtDLElBQUwsQ0FBVUQsT0FBVixFQUFtQixLQUFLbEIsUUFBTCxVQUFvQmlCLFNBQXBCLFVBQW5CLENBQVY7QUFDQTtBQUNBLG1CQUFPLG1CQUFRSyxTQUFSLENBQWtCLGFBQUdDLFNBQXJCLEVBQWdDTCxPQUFoQyxFQUF5Q1gsSUFBekMsRUFDRkQsSUFERSxDQUNHLFlBQU07QUFDUix1QkFBTyxtQkFBUWdCLFNBQVIsQ0FBa0IsYUFBR0UsUUFBckIsRUFBK0JOLE9BQS9CLENBQVA7QUFDSCxhQUhFLEVBSUZaLElBSkUsQ0FJRyxVQUFDQyxJQUFELEVBQVU7QUFDWix1QkFBTyx1QkFBUUEsSUFBUixDQUFQO0FBQ0gsYUFORSxFQU9GRCxJQVBFLENBT0csVUFBQ21CLE1BQUQsRUFBWTtBQUNkUCwwQkFBVUEsUUFBUVEsT0FBUixDQUFnQixRQUFoQixFQUEwQixNQUExQixDQUFWO0FBQ0E7QUFDQSx1QkFBTyxtQkFBUUosU0FBUixDQUFrQixhQUFHQyxTQUFyQixFQUFnQ0wsT0FBaEMsRUFBeUNPLE1BQXpDLENBQVA7QUFDSCxhQVhFLEVBWUZFLEtBWkUsQ0FZSSxVQUFDQyxHQUFELEVBQVM7QUFDWjtBQUNBLHNCQUFNQSxHQUFOO0FBQ0gsYUFmRSxDQUFQO0FBZ0JIOzs7NEJBR2E7QUFDVixtQkFBTyxLQUFLQyxRQUFaO0FBQ0gsUzswQkFFVy9CLE8sRUFBUztBQUNqQixrQ0FBT0Esb0NBQVAsNEJBQzJCQSxVQUFVQSxRQUFRZ0IsV0FBUixDQUFvQkMsSUFBOUIsR0FBcUMsSUFEaEU7QUFFQSxrQ0FBT2pCLFFBQVFnQyxJQUFSLEdBQWUsQ0FBdEIsRUFBeUIsa0JBQXpCO0FBQ0EsaUJBQUtELFFBQUwsR0FBZ0IvQixPQUFoQjtBQUNIOzs7NEJBRWM7QUFDWCxtQkFBTyxLQUFLaUMsU0FBWjtBQUNILFM7MEJBRVlDLEcsRUFBSztBQUNkLGtDQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QjtBQUNBLGtDQUFPQSxJQUFJQyxNQUFKLEdBQWEsQ0FBcEI7QUFDQSxpQkFBS0YsU0FBTCxHQUFpQkMsR0FBakI7QUFDSDs7OzRCQUdhO0FBQ1YsbUJBQU8sS0FBS0UsUUFBWjtBQUNILFM7MEJBRVdGLEcsRUFBSztBQUNiLGtDQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QjtBQUNBLGtDQUFPQSxJQUFJQyxNQUFKLEdBQWEsQ0FBcEI7QUFDQSxpQkFBS0MsUUFBTCxHQUFnQkYsR0FBaEI7QUFDSDs7Ozs7O2tCQUdVbkMsVyIsImZpbGUiOiJncmFwaHMvRGF0YVBsb3R0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgc3ZnMnBuZyBmcm9tICdzdmcycG5nJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBEYXRhU2V0IGZyb20gJy4uL2RhdGEvRGF0YVNldCc7XG5pbXBvcnQgQmFzZUdyYXBoIGZyb20gJy4uL2dyYXBocy9CYXNlR3JhcGgnO1xuXG5jbGFzcyBEYXRhUGxvdHRlciB7XG4gICAgY29uc3RydWN0b3IoZGF0YVNldCwgZGlybmFtZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5kYXRhU2V0ID0gZGF0YVNldDtcbiAgICAgICAgdGhpcy5kaXJuYW1lID0gZGlybmFtZTtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQ2hhcnQobGF5b3V0Q2xhc3MpIHtcbiAgICAgICAgYXNzZXJ0KGxheW91dENsYXNzLnByb3RvdHlwZSBpbnN0YW5jZW9mIEJhc2VHcmFwaCk7XG5cbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBjaGFydCA9IG5ldyBsYXlvdXRDbGFzcygpO1xuICAgICAgICByZXR1cm4gY2hhcnQuZHJhdyh0aGlzLmRhdGFTZXQpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChkYXRhLCAoZ2QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2VsZi53cml0ZUltYWdlcyhnZC5kYXRhLCBgJHtnZC50aXRsZX0tJHtjaGFydC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICB9LCB7Y29uY3VycmVuY3k6IDF9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NlbGYud3JpdGVJbWFnZXMoZGF0YSwgY2hhcnQuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd3JpdGVJbWFnZXMoZGF0YSwgY2hhcnRUeXBlKSB7XG4gICAgICAgIGxldCBvdXRwYXRoID0gcGF0aC5qb2luKHRoaXMuZGlybmFtZSwgdGhpcy5maWxlbmFtZSk7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXRwYXRoKSkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKG91dHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIG91dHBhdGggPSBwYXRoLmpvaW4ob3V0cGF0aCwgdGhpcy5maWxlbmFtZSArIGAtJHtjaGFydFR5cGV9LnN2Z2ApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgV3JpdGluZyBncmFwaCBpbWFnZSBTVkcgJHtvdXRwYXRofWApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoZnMud3JpdGVGaWxlKShvdXRwYXRoLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSkob3V0cGF0aCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ZnMnBuZyhkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cGF0aCA9IG91dHBhdGgucmVwbGFjZSgvXFwuc3ZnJC8sICcucG5nJyk7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFdyaXRpbmcgZ3JhcGggaW1hZ2UgUE5HICR7b3V0cGF0aH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoZnMud3JpdGVGaWxlKShvdXRwYXRoLCBidWZmZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgZ2V0IGRhdGFTZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhU2V0O1xuICAgIH1cblxuICAgIHNldCBkYXRhU2V0KGRhdGFTZXQpIHtcbiAgICAgICAgYXNzZXJ0KGRhdGFTZXQgaW5zdGFuY2VvZiBEYXRhU2V0LFxuICAgICAgICAgICAgYFdyb25nIERhdGFTZXQgdHlwZTogJHtkYXRhU2V0ID8gZGF0YVNldC5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbH1gKTtcbiAgICAgICAgYXNzZXJ0KGRhdGFTZXQuc2l6ZSA+IDAsICdEYXRhU2V0IGlzIGVtcHR5Jyk7XG4gICAgICAgIHRoaXMuX2RhdGFTZXQgPSBkYXRhU2V0O1xuICAgIH1cblxuICAgIGdldCBmaWxlbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZpbGVuYW1lO1xuICAgIH1cblxuICAgIHNldCBmaWxlbmFtZSh2YWwpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgYXNzZXJ0KHZhbC5sZW5ndGggPiAwKTtcbiAgICAgICAgdGhpcy5fZmlsZW5hbWUgPSB2YWw7XG4gICAgfVxuXG5cbiAgICBnZXQgZGlybmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rpcm5hbWU7XG4gICAgfVxuXG4gICAgc2V0IGRpcm5hbWUodmFsKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdmFsID09PSAnc3RyaW5nJyk7XG4gICAgICAgIGFzc2VydCh2YWwubGVuZ3RoID4gMCk7XG4gICAgICAgIHRoaXMuX2Rpcm5hbWUgPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhUGxvdHRlcjsiXX0=
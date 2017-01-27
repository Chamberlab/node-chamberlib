'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

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

var DataPlotter = function () {
    function DataPlotter(dataSet, dirname, filename) {
        (0, _classCallCheck3.default)(this, DataPlotter);

        this.dataSet = dataSet;
        this.dirname = dirname;
        this.filename = filename;
    }

    (0, _createClass3.default)(DataPlotter, [{
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
            console.log('Writing graph image SVG ' + outpath);
            return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, data).then(function () {
                return _bluebird2.default.promisify(_fs2.default.readFile)(outpath);
            }).then(function (data) {
                return (0, _svg2png2.default)(data);
            }).then(function (buffer) {
                outpath = outpath.replace(/\.svg$/, '.png');
                console.log('Writing graph image PNG ' + outpath);
                return _bluebird2.default.promisify(_fs2.default.writeFile)(outpath, buffer);
            }).catch(function (err) {
                console.error(err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9EYXRhUGxvdHRlci5qcyJdLCJuYW1lcyI6WyJEYXRhUGxvdHRlciIsImRhdGFTZXQiLCJkaXJuYW1lIiwiZmlsZW5hbWUiLCJsYXlvdXRDbGFzcyIsInByb3RvdHlwZSIsIl9zZWxmIiwiY2hhcnQiLCJkcmF3IiwidGhlbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJnZCIsIndyaXRlSW1hZ2VzIiwidGl0bGUiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJjb25jdXJyZW5jeSIsImNoYXJ0VHlwZSIsIm91dHBhdGgiLCJqb2luIiwiZXhpc3RzU3luYyIsIm1rZGlyU3luYyIsImNvbnNvbGUiLCJsb2ciLCJwcm9taXNpZnkiLCJ3cml0ZUZpbGUiLCJyZWFkRmlsZSIsImJ1ZmZlciIsInJlcGxhY2UiLCJjYXRjaCIsImVyciIsImVycm9yIiwiX2RhdGFTZXQiLCJzaXplIiwiX2ZpbGVuYW1lIiwidmFsIiwibGVuZ3RoIiwiX2Rpcm5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxXO0FBQ0YseUJBQVlDLE9BQVosRUFBcUJDLE9BQXJCLEVBQThCQyxRQUE5QixFQUF3QztBQUFBOztBQUNwQyxhQUFLRixPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxPQUFMLEdBQWVBLE9BQWY7QUFDQSxhQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNIOzs7O3NDQUVhQyxXLEVBQWE7QUFDdkIsa0NBQU9BLFlBQVlDLFNBQVosK0JBQVA7O0FBRUEsZ0JBQU1DLFFBQVEsSUFBZDtBQUNBLGdCQUFNQyxRQUFRLElBQUlILFdBQUosRUFBZDtBQUNBLG1CQUFPRyxNQUFNQyxJQUFOLENBQVcsS0FBS1AsT0FBaEIsRUFDRlEsSUFERSxDQUNHLFVBQVVDLElBQVYsRUFBZ0I7QUFDbEIsb0JBQUlDLE1BQU1DLE9BQU4sQ0FBY0YsSUFBZCxDQUFKLEVBQXlCO0FBQ3JCLDJCQUFPLG1CQUFRRyxHQUFSLENBQVlILElBQVosRUFBa0IsVUFBQ0ksRUFBRCxFQUFRO0FBQzdCLCtCQUFPUixNQUFNUyxXQUFOLENBQWtCRCxHQUFHSixJQUFyQixFQUE4QkksR0FBR0UsS0FBakMsU0FBMENULE1BQU1VLFdBQU4sQ0FBa0JDLElBQTVELENBQVA7QUFDSCxxQkFGTSxFQUVKLEVBQUNDLGFBQWEsQ0FBZCxFQUZJLENBQVA7QUFHSCxpQkFKRCxNQUlPO0FBQ0gsMkJBQU9iLE1BQU1TLFdBQU4sQ0FBa0JMLElBQWxCLEVBQXdCSCxNQUFNVSxXQUFOLENBQWtCQyxJQUExQyxDQUFQO0FBQ0g7QUFDSixhQVRFLENBQVA7QUFVSDs7O29DQUVXUixJLEVBQU1VLFMsRUFBVztBQUN6QixnQkFBSUMsVUFBVSxlQUFLQyxJQUFMLENBQVUsS0FBS3BCLE9BQWYsRUFBd0IsS0FBS0MsUUFBN0IsQ0FBZDtBQUNBLGdCQUFJLENBQUMsYUFBR29CLFVBQUgsQ0FBY0YsT0FBZCxDQUFMLEVBQTZCO0FBQ3pCLDZCQUFHRyxTQUFILENBQWFILE9BQWI7QUFDSDtBQUNEQSxzQkFBVSxlQUFLQyxJQUFMLENBQVVELE9BQVYsRUFBbUIsS0FBS2xCLFFBQUwsVUFBb0JpQixTQUFwQixVQUFuQixDQUFWO0FBQ0FLLG9CQUFRQyxHQUFSLDhCQUF1Q0wsT0FBdkM7QUFDQSxtQkFBTyxtQkFBUU0sU0FBUixDQUFrQixhQUFHQyxTQUFyQixFQUFnQ1AsT0FBaEMsRUFBeUNYLElBQXpDLEVBQ0ZELElBREUsQ0FDRyxZQUFNO0FBQ1IsdUJBQU8sbUJBQVFrQixTQUFSLENBQWtCLGFBQUdFLFFBQXJCLEVBQStCUixPQUEvQixDQUFQO0FBQ0gsYUFIRSxFQUlGWixJQUpFLENBSUcsVUFBQ0MsSUFBRCxFQUFVO0FBQ1osdUJBQU8sdUJBQVFBLElBQVIsQ0FBUDtBQUNILGFBTkUsRUFPRkQsSUFQRSxDQU9HLFVBQUNxQixNQUFELEVBQVk7QUFDZFQsMEJBQVVBLFFBQVFVLE9BQVIsQ0FBZ0IsUUFBaEIsRUFBMEIsTUFBMUIsQ0FBVjtBQUNBTix3QkFBUUMsR0FBUiw4QkFBdUNMLE9BQXZDO0FBQ0EsdUJBQU8sbUJBQVFNLFNBQVIsQ0FBa0IsYUFBR0MsU0FBckIsRUFBZ0NQLE9BQWhDLEVBQXlDUyxNQUF6QyxDQUFQO0FBQ0gsYUFYRSxFQVlGRSxLQVpFLENBWUksVUFBQ0MsR0FBRCxFQUFTO0FBQ1pSLHdCQUFRUyxLQUFSLENBQWNELEdBQWQ7QUFDSCxhQWRFLENBQVA7QUFlSDs7OzRCQUdhO0FBQ1YsbUJBQU8sS0FBS0UsUUFBWjtBQUNILFM7MEJBRVdsQyxPLEVBQVM7QUFDakIsa0NBQU9BLG9DQUFQLDRCQUMyQkEsVUFBVUEsUUFBUWdCLFdBQVIsQ0FBb0JDLElBQTlCLEdBQXFDLElBRGhFO0FBRUEsa0NBQU9qQixRQUFRbUMsSUFBUixHQUFlLENBQXRCLEVBQXlCLGtCQUF6QjtBQUNBLGlCQUFLRCxRQUFMLEdBQWdCbEMsT0FBaEI7QUFDSDs7OzRCQUVjO0FBQ1gsbUJBQU8sS0FBS29DLFNBQVo7QUFDSCxTOzBCQUVZQyxHLEVBQUs7QUFDZCxrQ0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEI7QUFDQSxrQ0FBT0EsSUFBSUMsTUFBSixHQUFhLENBQXBCO0FBQ0EsaUJBQUtGLFNBQUwsR0FBaUJDLEdBQWpCO0FBQ0g7Ozs0QkFHYTtBQUNWLG1CQUFPLEtBQUtFLFFBQVo7QUFDSCxTOzBCQUVXRixHLEVBQUs7QUFDYixrQ0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEI7QUFDQSxrQ0FBT0EsSUFBSUMsTUFBSixHQUFhLENBQXBCO0FBQ0EsaUJBQUtDLFFBQUwsR0FBZ0JGLEdBQWhCO0FBQ0g7Ozs7O2tCQUdVdEMsVyIsImZpbGUiOiJncmFwaHMvRGF0YVBsb3R0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgc3ZnMnBuZyBmcm9tICdzdmcycG5nJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBEYXRhU2V0IGZyb20gJy4uL2RhdGEvRGF0YVNldCc7XG5pbXBvcnQgQmFzZUdyYXBoIGZyb20gJy4uL2dyYXBocy9CYXNlR3JhcGgnO1xuXG5jbGFzcyBEYXRhUGxvdHRlciB7XG4gICAgY29uc3RydWN0b3IoZGF0YVNldCwgZGlybmFtZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5kYXRhU2V0ID0gZGF0YVNldDtcbiAgICAgICAgdGhpcy5kaXJuYW1lID0gZGlybmFtZTtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgIH1cblxuICAgIGdlbmVyYXRlQ2hhcnQobGF5b3V0Q2xhc3MpIHtcbiAgICAgICAgYXNzZXJ0KGxheW91dENsYXNzLnByb3RvdHlwZSBpbnN0YW5jZW9mIEJhc2VHcmFwaCk7XG5cbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBjb25zdCBjaGFydCA9IG5ldyBsYXlvdXRDbGFzcygpO1xuICAgICAgICByZXR1cm4gY2hhcnQuZHJhdyh0aGlzLmRhdGFTZXQpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChkYXRhLCAoZ2QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2VsZi53cml0ZUltYWdlcyhnZC5kYXRhLCBgJHtnZC50aXRsZX0tJHtjaGFydC5jb25zdHJ1Y3Rvci5uYW1lfWApO1xuICAgICAgICAgICAgICAgICAgICB9LCB7Y29uY3VycmVuY3k6IDF9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NlbGYud3JpdGVJbWFnZXMoZGF0YSwgY2hhcnQuY29uc3RydWN0b3IubmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd3JpdGVJbWFnZXMoZGF0YSwgY2hhcnRUeXBlKSB7XG4gICAgICAgIGxldCBvdXRwYXRoID0gcGF0aC5qb2luKHRoaXMuZGlybmFtZSwgdGhpcy5maWxlbmFtZSk7XG4gICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhvdXRwYXRoKSkge1xuICAgICAgICAgICAgZnMubWtkaXJTeW5jKG91dHBhdGgpO1xuICAgICAgICB9XG4gICAgICAgIG91dHBhdGggPSBwYXRoLmpvaW4ob3V0cGF0aCwgdGhpcy5maWxlbmFtZSArIGAtJHtjaGFydFR5cGV9LnN2Z2ApO1xuICAgICAgICBjb25zb2xlLmxvZyhgV3JpdGluZyBncmFwaCBpbWFnZSBTVkcgJHtvdXRwYXRofWApO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoZnMud3JpdGVGaWxlKShvdXRwYXRoLCBkYXRhKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSkob3V0cGF0aCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ZnMnBuZyhkYXRhKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoYnVmZmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgb3V0cGF0aCA9IG91dHBhdGgucmVwbGFjZSgvXFwuc3ZnJC8sICcucG5nJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFdyaXRpbmcgZ3JhcGggaW1hZ2UgUE5HICR7b3V0cGF0aH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoZnMud3JpdGVGaWxlKShvdXRwYXRoLCBidWZmZXIpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBnZXQgZGF0YVNldCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFTZXQ7XG4gICAgfVxuXG4gICAgc2V0IGRhdGFTZXQoZGF0YVNldCkge1xuICAgICAgICBhc3NlcnQoZGF0YVNldCBpbnN0YW5jZW9mIERhdGFTZXQsXG4gICAgICAgICAgICBgV3JvbmcgRGF0YVNldCB0eXBlOiAke2RhdGFTZXQgPyBkYXRhU2V0LmNvbnN0cnVjdG9yLm5hbWUgOiBudWxsfWApO1xuICAgICAgICBhc3NlcnQoZGF0YVNldC5zaXplID4gMCwgJ0RhdGFTZXQgaXMgZW1wdHknKTtcbiAgICAgICAgdGhpcy5fZGF0YVNldCA9IGRhdGFTZXQ7XG4gICAgfVxuXG4gICAgZ2V0IGZpbGVuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlsZW5hbWU7XG4gICAgfVxuXG4gICAgc2V0IGZpbGVuYW1lKHZhbCkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpO1xuICAgICAgICBhc3NlcnQodmFsLmxlbmd0aCA+IDApO1xuICAgICAgICB0aGlzLl9maWxlbmFtZSA9IHZhbDtcbiAgICB9XG5cblxuICAgIGdldCBkaXJuYW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGlybmFtZTtcbiAgICB9XG5cbiAgICBzZXQgZGlybmFtZSh2YWwpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgYXNzZXJ0KHZhbC5sZW5ndGggPiAwKTtcbiAgICAgICAgdGhpcy5fZGlybmFtZSA9IHZhbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFQbG90dGVyOyJdfQ==
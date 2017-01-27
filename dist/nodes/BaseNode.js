'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseNode = function (_Emitter) {
    (0, _inherits3.default)(BaseNode, _Emitter);

    function BaseNode() {
        (0, _classCallCheck3.default)(this, BaseNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseNode.__proto__ || (0, _getPrototypeOf2.default)(BaseNode)).call(this));

        _this._stats = {
            data: {
                in: {},
                out: {}
            },
            start: 0,
            lastLog: 0
        };
        return _this;
    }

    (0, _createClass3.default)(BaseNode, [{
        key: 'addStats',
        value: function addStats(dir, type) {
            var count = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

            if (typeof this._stats.data[dir][type] === 'number') {
                this._stats.data[dir][type] += count;
            } else {
                this._stats.data[dir][type] = count;
            }
            var now = Date.now();
            if (this._stats.start === 0) {
                this._stats.start = now;
                console.log(this.constructor.name + ' -- START ' + now);
            }
            if (now - this._stats.lastLog > Math.max(1000, process.env.DUMP_STATS_MILLIS)) {
                this._stats.lastLog = now;
                this.emit('stats', this._stats);
                if (process.env.DUMP_STATS_MILLIS) {
                    this.printStats();
                }
            } else if (count === 0) {
                if (process.env.DUMP_STATS_MILLIS) {
                    console.log(this.constructor.name + ' -- END ' + now);
                    this.printStats();
                }
            }
        }
    }, {
        key: 'printStats',
        value: function printStats() {
            console.log(this.constructor.name + ' -- ' + (Date.now() - this._stats.start) * 0.001 + 's');
            for (var dir in this._stats.data) {
                for (var key in this._stats.data[dir]) {
                    if (this._stats.data[dir][key] > 0) {
                        console.log(key + ' ' + dir + ' ' + this._stats.data[dir][key]);
                    }
                }
            }
            console.log('------\n');
        }
    }, {
        key: 'stats',
        get: function get() {
            return this._stats;
        }
    }]);
    return BaseNode;
}(_tinyEmitter2.default);

exports.default = BaseNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL0Jhc2VOb2RlLmpzIl0sIm5hbWVzIjpbIkJhc2VOb2RlIiwiX3N0YXRzIiwiZGF0YSIsImluIiwib3V0Iiwic3RhcnQiLCJsYXN0TG9nIiwiZGlyIiwidHlwZSIsImNvdW50Iiwibm93IiwiRGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJNYXRoIiwibWF4IiwicHJvY2VzcyIsImVudiIsIkRVTVBfU1RBVFNfTUlMTElTIiwiZW1pdCIsInByaW50U3RhdHMiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVNQSxROzs7QUFDRix3QkFBYztBQUFBOztBQUFBOztBQUdWLGNBQUtDLE1BQUwsR0FBYztBQUNWQyxrQkFBTTtBQUNGQyxvQkFBSSxFQURGO0FBRUZDLHFCQUFLO0FBRkgsYUFESTtBQUtWQyxtQkFBTyxDQUxHO0FBTVZDLHFCQUFTO0FBTkMsU0FBZDtBQUhVO0FBV2I7Ozs7aUNBRVFDLEcsRUFBS0MsSSxFQUFpQjtBQUFBLGdCQUFYQyxLQUFXLHVFQUFILENBQUc7O0FBQzNCLGdCQUFJLE9BQU8sS0FBS1IsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQkMsSUFBdEIsQ0FBUCxLQUF1QyxRQUEzQyxFQUFxRDtBQUNqRCxxQkFBS1AsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQkMsSUFBdEIsS0FBK0JDLEtBQS9CO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtSLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsRUFBc0JDLElBQXRCLElBQThCQyxLQUE5QjtBQUNIO0FBQ0QsZ0JBQUlDLE1BQU1DLEtBQUtELEdBQUwsRUFBVjtBQUNBLGdCQUFJLEtBQUtULE1BQUwsQ0FBWUksS0FBWixLQUFzQixDQUExQixFQUE2QjtBQUN6QixxQkFBS0osTUFBTCxDQUFZSSxLQUFaLEdBQW9CSyxHQUFwQjtBQUNBRSx3QkFBUUMsR0FBUixDQUFlLEtBQUtDLFdBQUwsQ0FBaUJDLElBQWhDLGtCQUFpREwsR0FBakQ7QUFDSDtBQUNELGdCQUFJQSxNQUFNLEtBQUtULE1BQUwsQ0FBWUssT0FBbEIsR0FBNEJVLEtBQUtDLEdBQUwsQ0FBUyxJQUFULEVBQWVDLFFBQVFDLEdBQVIsQ0FBWUMsaUJBQTNCLENBQWhDLEVBQStFO0FBQzNFLHFCQUFLbkIsTUFBTCxDQUFZSyxPQUFaLEdBQXNCSSxHQUF0QjtBQUNBLHFCQUFLVyxJQUFMLENBQVUsT0FBVixFQUFtQixLQUFLcEIsTUFBeEI7QUFDQSxvQkFBSWlCLFFBQVFDLEdBQVIsQ0FBWUMsaUJBQWhCLEVBQW1DO0FBQy9CLHlCQUFLRSxVQUFMO0FBQ0g7QUFDSixhQU5ELE1BTU8sSUFBSWIsVUFBVSxDQUFkLEVBQWlCO0FBQ3BCLG9CQUFJUyxRQUFRQyxHQUFSLENBQVlDLGlCQUFoQixFQUFtQztBQUMvQlIsNEJBQVFDLEdBQVIsQ0FBZSxLQUFLQyxXQUFMLENBQWlCQyxJQUFoQyxnQkFBK0NMLEdBQS9DO0FBQ0EseUJBQUtZLFVBQUw7QUFDSDtBQUNKO0FBQ0o7OztxQ0FFWTtBQUNUVixvQkFBUUMsR0FBUixDQUFlLEtBQUtDLFdBQUwsQ0FBaUJDLElBQWhDLFlBQTJDLENBQUNKLEtBQUtELEdBQUwsS0FBYSxLQUFLVCxNQUFMLENBQVlJLEtBQTFCLElBQW1DLEtBQTlFO0FBQ0EsaUJBQUssSUFBSUUsR0FBVCxJQUFnQixLQUFLTixNQUFMLENBQVlDLElBQTVCLEVBQWtDO0FBQzlCLHFCQUFLLElBQUlxQixHQUFULElBQWdCLEtBQUt0QixNQUFMLENBQVlDLElBQVosQ0FBaUJLLEdBQWpCLENBQWhCLEVBQXVDO0FBQ25DLHdCQUFJLEtBQUtOLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsRUFBc0JnQixHQUF0QixJQUE2QixDQUFqQyxFQUFvQztBQUNoQ1gsZ0NBQVFDLEdBQVIsQ0FBZVUsR0FBZixTQUFzQmhCLEdBQXRCLFNBQTZCLEtBQUtOLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsRUFBc0JnQixHQUF0QixDQUE3QjtBQUNIO0FBQ0o7QUFDSjtBQUNEWCxvQkFBUUMsR0FBUixDQUFZLFVBQVo7QUFDSDs7OzRCQUVXO0FBQ1IsbUJBQU8sS0FBS1osTUFBWjtBQUNIOzs7OztrQkFJVUQsUSIsImZpbGUiOiJub2Rlcy9CYXNlTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbWl0dGVyIGZyb20gJ3RpbnktZW1pdHRlcic7XG5cbmNsYXNzIEJhc2VOb2RlIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc3RhdHMgPSB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaW46IHt9LFxuICAgICAgICAgICAgICAgIG91dDoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGxhc3RMb2c6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhZGRTdGF0cyhkaXIsIHR5cGUsIGNvdW50ID0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3N0YXRzLmRhdGFbZGlyXVt0eXBlXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLmRhdGFbZGlyXVt0eXBlXSArPSBjb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLmRhdGFbZGlyXVt0eXBlXSA9IGNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAodGhpcy5fc3RhdHMuc3RhcnQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLnN0YXJ0ID0gbm93O1xuICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtLSBTVEFSVCAke25vd31gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm93IC0gdGhpcy5fc3RhdHMubGFzdExvZyA+IE1hdGgubWF4KDEwMDAsIHByb2Nlc3MuZW52LkRVTVBfU1RBVFNfTUlMTElTKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHMubGFzdExvZyA9IG5vdztcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RhdHMnLCB0aGlzLl9zdGF0cyk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuRFVNUF9TVEFUU19NSUxMSVMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50U3RhdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkRVTVBfU1RBVFNfTUlMTElTKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtLSBFTkQgJHtub3d9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmludFN0YXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmludFN0YXRzKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IC0tICR7KERhdGUubm93KCkgLSB0aGlzLl9zdGF0cy5zdGFydCkgKiAwLjAwMX1zYCk7XG4gICAgICAgIGZvciAobGV0IGRpciBpbiB0aGlzLl9zdGF0cy5kYXRhKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBrZXkgaW4gdGhpcy5fc3RhdHMuZGF0YVtkaXJdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0YXRzLmRhdGFbZGlyXVtrZXldID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgJHtrZXl9ICR7ZGlyfSAke3RoaXMuX3N0YXRzLmRhdGFbZGlyXVtrZXldfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmxvZygnLS0tLS0tXFxuJyk7XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHM7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VOb2RlOyJdfQ==
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
                // console.log(`${this.constructor.name} -- START ${now}`);
            }
            if (now - this._stats.lastLog > Math.max(1000, process.env.DUMP_STATS_MILLIS)) {
                this._stats.lastLog = now;
                this.emit('stats', this._stats);
                if (process.env.DUMP_STATS_MILLIS) {
                    this.printStats();
                }
            } else if (count === 0) {
                if (process.env.DUMP_STATS_MILLIS) {
                    // console.log(`${this.constructor.name} -- END ${now}`);
                    this.printStats();
                }
            }
        }
    }, {
        key: 'printStats',
        value: function printStats() {
            /* eslint-disable no-console */
            console.log(this.constructor.name + ' -- ' + (Date.now() - this._stats.start) * 0.001 + 's');
            for (var dir in this._stats.data) {
                for (var key in this._stats.data[dir]) {
                    if (this._stats.data[dir][key] > 0) {
                        console.log(key + ' ' + dir + ' ' + this._stats.data[dir][key]);
                    }
                }
            }
            console.log('------\n');
            /* eslint-enable no-console */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL0Jhc2VOb2RlLmpzIl0sIm5hbWVzIjpbIkJhc2VOb2RlIiwiX3N0YXRzIiwiZGF0YSIsImluIiwib3V0Iiwic3RhcnQiLCJsYXN0TG9nIiwiZGlyIiwidHlwZSIsImNvdW50Iiwibm93IiwiRGF0ZSIsIk1hdGgiLCJtYXgiLCJwcm9jZXNzIiwiZW52IiwiRFVNUF9TVEFUU19NSUxMSVMiLCJlbWl0IiwicHJpbnRTdGF0cyIsImNvbnNvbGUiLCJsb2ciLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7OztJQUVNQSxROzs7QUFDRix3QkFBYztBQUFBOztBQUFBOztBQUdWLGNBQUtDLE1BQUwsR0FBYztBQUNWQyxrQkFBTTtBQUNGQyxvQkFBSSxFQURGO0FBRUZDLHFCQUFLO0FBRkgsYUFESTtBQUtWQyxtQkFBTyxDQUxHO0FBTVZDLHFCQUFTO0FBTkMsU0FBZDtBQUhVO0FBV2I7Ozs7aUNBRVFDLEcsRUFBS0MsSSxFQUFpQjtBQUFBLGdCQUFYQyxLQUFXLHVFQUFILENBQUc7O0FBQzNCLGdCQUFJLE9BQU8sS0FBS1IsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQkMsSUFBdEIsQ0FBUCxLQUF1QyxRQUEzQyxFQUFxRDtBQUNqRCxxQkFBS1AsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQkMsSUFBdEIsS0FBK0JDLEtBQS9CO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtSLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsRUFBc0JDLElBQXRCLElBQThCQyxLQUE5QjtBQUNIO0FBQ0QsZ0JBQUlDLE1BQU1DLEtBQUtELEdBQUwsRUFBVjtBQUNBLGdCQUFJLEtBQUtULE1BQUwsQ0FBWUksS0FBWixLQUFzQixDQUExQixFQUE2QjtBQUN6QixxQkFBS0osTUFBTCxDQUFZSSxLQUFaLEdBQW9CSyxHQUFwQjtBQUNBO0FBQ0g7QUFDRCxnQkFBSUEsTUFBTSxLQUFLVCxNQUFMLENBQVlLLE9BQWxCLEdBQTRCTSxLQUFLQyxHQUFMLENBQVMsSUFBVCxFQUFlQyxRQUFRQyxHQUFSLENBQVlDLGlCQUEzQixDQUFoQyxFQUErRTtBQUMzRSxxQkFBS2YsTUFBTCxDQUFZSyxPQUFaLEdBQXNCSSxHQUF0QjtBQUNBLHFCQUFLTyxJQUFMLENBQVUsT0FBVixFQUFtQixLQUFLaEIsTUFBeEI7QUFDQSxvQkFBSWEsUUFBUUMsR0FBUixDQUFZQyxpQkFBaEIsRUFBbUM7QUFDL0IseUJBQUtFLFVBQUw7QUFDSDtBQUNKLGFBTkQsTUFNTyxJQUFJVCxVQUFVLENBQWQsRUFBaUI7QUFDcEIsb0JBQUlLLFFBQVFDLEdBQVIsQ0FBWUMsaUJBQWhCLEVBQW1DO0FBQy9CO0FBQ0EseUJBQUtFLFVBQUw7QUFDSDtBQUNKO0FBQ0o7OztxQ0FFWTtBQUNUO0FBQ0FDLG9CQUFRQyxHQUFSLENBQWUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBaEMsWUFBMkMsQ0FBQ1gsS0FBS0QsR0FBTCxLQUFhLEtBQUtULE1BQUwsQ0FBWUksS0FBMUIsSUFBbUMsS0FBOUU7QUFDQSxpQkFBSyxJQUFJRSxHQUFULElBQWdCLEtBQUtOLE1BQUwsQ0FBWUMsSUFBNUIsRUFBa0M7QUFDOUIscUJBQUssSUFBSXFCLEdBQVQsSUFBZ0IsS0FBS3RCLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsQ0FBaEIsRUFBdUM7QUFDbkMsd0JBQUksS0FBS04sTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQmdCLEdBQXRCLElBQTZCLENBQWpDLEVBQW9DO0FBQ2hDSixnQ0FBUUMsR0FBUixDQUFlRyxHQUFmLFNBQXNCaEIsR0FBdEIsU0FBNkIsS0FBS04sTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQmdCLEdBQXRCLENBQTdCO0FBQ0g7QUFDSjtBQUNKO0FBQ0RKLG9CQUFRQyxHQUFSLENBQVksVUFBWjtBQUNBO0FBQ0g7Ozs0QkFFVztBQUNSLG1CQUFPLEtBQUtuQixNQUFaO0FBQ0g7Ozs7O2tCQUlVRCxRIiwiZmlsZSI6Im5vZGVzL0Jhc2VOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEVtaXR0ZXIgZnJvbSAndGlueS1lbWl0dGVyJztcblxuY2xhc3MgQmFzZU5vZGUgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9zdGF0cyA9IHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBpbjoge30sXG4gICAgICAgICAgICAgICAgb3V0OiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0YXJ0OiAwLFxuICAgICAgICAgICAgbGFzdExvZzogMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGFkZFN0YXRzKGRpciwgdHlwZSwgY291bnQgPSAxKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fc3RhdHMuZGF0YVtkaXJdW3R5cGVdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHMuZGF0YVtkaXJdW3R5cGVdICs9IGNvdW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHMuZGF0YVtkaXJdW3R5cGVdID0gY291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGlmICh0aGlzLl9zdGF0cy5zdGFydCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHMuc3RhcnQgPSBub3c7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IC0tIFNUQVJUICR7bm93fWApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChub3cgLSB0aGlzLl9zdGF0cy5sYXN0TG9nID4gTWF0aC5tYXgoMTAwMCwgcHJvY2Vzcy5lbnYuRFVNUF9TVEFUU19NSUxMSVMpKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGF0cy5sYXN0TG9nID0gbm93O1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdzdGF0cycsIHRoaXMuX3N0YXRzKTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5EVU1QX1NUQVRTX01JTExJUykge1xuICAgICAgICAgICAgICAgIHRoaXMucHJpbnRTdGF0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuRFVNUF9TVEFUU19NSUxMSVMpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IC0tIEVORCAke25vd31gKTtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50U3RhdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaW50U3RhdHMoKSB7XG4gICAgICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbiAgICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtLSAkeyhEYXRlLm5vdygpIC0gdGhpcy5fc3RhdHMuc3RhcnQpICogMC4wMDF9c2ApO1xuICAgICAgICBmb3IgKGxldCBkaXIgaW4gdGhpcy5fc3RhdHMuZGF0YSkge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX3N0YXRzLmRhdGFbZGlyXSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0cy5kYXRhW2Rpcl1ba2V5XSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYCR7a2V5fSAke2Rpcn0gJHt0aGlzLl9zdGF0cy5kYXRhW2Rpcl1ba2V5XX1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5sb2coJy0tLS0tLVxcbicpO1xuICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgICB9XG5cbiAgICBnZXQgc3RhdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0cztcbiAgICB9XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQmFzZU5vZGU7Il19
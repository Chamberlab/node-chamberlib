'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseNode = function (_Emitter) {
    _inherits(BaseNode, _Emitter);

    function BaseNode() {
        _classCallCheck(this, BaseNode);

        var _this = _possibleConstructorReturn(this, (BaseNode.__proto__ || Object.getPrototypeOf(BaseNode)).call(this));

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

    _createClass(BaseNode, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL0Jhc2VOb2RlLmpzIl0sIm5hbWVzIjpbIkJhc2VOb2RlIiwiX3N0YXRzIiwiZGF0YSIsImluIiwib3V0Iiwic3RhcnQiLCJsYXN0TG9nIiwiZGlyIiwidHlwZSIsImNvdW50Iiwibm93IiwiRGF0ZSIsIk1hdGgiLCJtYXgiLCJwcm9jZXNzIiwiZW52IiwiRFVNUF9TVEFUU19NSUxMSVMiLCJlbWl0IiwicHJpbnRTdGF0cyIsImNvbnNvbGUiLCJsb2ciLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7OztJQUVNQSxROzs7QUFDRix3QkFBYztBQUFBOztBQUFBOztBQUdWLGNBQUtDLE1BQUwsR0FBYztBQUNWQyxrQkFBTTtBQUNGQyxvQkFBSSxFQURGO0FBRUZDLHFCQUFLO0FBRkgsYUFESTtBQUtWQyxtQkFBTyxDQUxHO0FBTVZDLHFCQUFTO0FBTkMsU0FBZDtBQUhVO0FBV2I7Ozs7aUNBRVFDLEcsRUFBS0MsSSxFQUFpQjtBQUFBLGdCQUFYQyxLQUFXLHVFQUFILENBQUc7O0FBQzNCLGdCQUFJLE9BQU8sS0FBS1IsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQkMsSUFBdEIsQ0FBUCxLQUF1QyxRQUEzQyxFQUFxRDtBQUNqRCxxQkFBS1AsTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQkMsSUFBdEIsS0FBK0JDLEtBQS9CO0FBQ0gsYUFGRCxNQUVPO0FBQ0gscUJBQUtSLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsRUFBc0JDLElBQXRCLElBQThCQyxLQUE5QjtBQUNIO0FBQ0QsZ0JBQUlDLE1BQU1DLEtBQUtELEdBQUwsRUFBVjtBQUNBLGdCQUFJLEtBQUtULE1BQUwsQ0FBWUksS0FBWixLQUFzQixDQUExQixFQUE2QjtBQUN6QixxQkFBS0osTUFBTCxDQUFZSSxLQUFaLEdBQW9CSyxHQUFwQjtBQUNBO0FBQ0g7QUFDRCxnQkFBSUEsTUFBTSxLQUFLVCxNQUFMLENBQVlLLE9BQWxCLEdBQTRCTSxLQUFLQyxHQUFMLENBQVMsSUFBVCxFQUFlQyxRQUFRQyxHQUFSLENBQVlDLGlCQUEzQixDQUFoQyxFQUErRTtBQUMzRSxxQkFBS2YsTUFBTCxDQUFZSyxPQUFaLEdBQXNCSSxHQUF0QjtBQUNBLHFCQUFLTyxJQUFMLENBQVUsT0FBVixFQUFtQixLQUFLaEIsTUFBeEI7QUFDQSxvQkFBSWEsUUFBUUMsR0FBUixDQUFZQyxpQkFBaEIsRUFBbUM7QUFDL0IseUJBQUtFLFVBQUw7QUFDSDtBQUNKLGFBTkQsTUFNTyxJQUFJVCxVQUFVLENBQWQsRUFBaUI7QUFDcEIsb0JBQUlLLFFBQVFDLEdBQVIsQ0FBWUMsaUJBQWhCLEVBQW1DO0FBQy9CO0FBQ0EseUJBQUtFLFVBQUw7QUFDSDtBQUNKO0FBQ0o7OztxQ0FFWTtBQUNUO0FBQ0FDLG9CQUFRQyxHQUFSLENBQWUsS0FBS0MsV0FBTCxDQUFpQkMsSUFBaEMsWUFBMkMsQ0FBQ1gsS0FBS0QsR0FBTCxLQUFhLEtBQUtULE1BQUwsQ0FBWUksS0FBMUIsSUFBbUMsS0FBOUU7QUFDQSxpQkFBSyxJQUFJRSxHQUFULElBQWdCLEtBQUtOLE1BQUwsQ0FBWUMsSUFBNUIsRUFBa0M7QUFDOUIscUJBQUssSUFBSXFCLEdBQVQsSUFBZ0IsS0FBS3RCLE1BQUwsQ0FBWUMsSUFBWixDQUFpQkssR0FBakIsQ0FBaEIsRUFBdUM7QUFDbkMsd0JBQUksS0FBS04sTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQmdCLEdBQXRCLElBQTZCLENBQWpDLEVBQW9DO0FBQ2hDSixnQ0FBUUMsR0FBUixDQUFlRyxHQUFmLFNBQXNCaEIsR0FBdEIsU0FBNkIsS0FBS04sTUFBTCxDQUFZQyxJQUFaLENBQWlCSyxHQUFqQixFQUFzQmdCLEdBQXRCLENBQTdCO0FBQ0g7QUFDSjtBQUNKO0FBQ0RKLG9CQUFRQyxHQUFSLENBQVksVUFBWjtBQUNBO0FBQ0g7Ozs0QkFFVztBQUNSLG1CQUFPLEtBQUtuQixNQUFaO0FBQ0g7Ozs7OztrQkFJVUQsUSIsImZpbGUiOiJub2Rlcy9CYXNlTm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFbWl0dGVyIGZyb20gJ3RpbnktZW1pdHRlcic7XG5cbmNsYXNzIEJhc2VOb2RlIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc3RhdHMgPSB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgaW46IHt9LFxuICAgICAgICAgICAgICAgIG91dDoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdGFydDogMCxcbiAgICAgICAgICAgIGxhc3RMb2c6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBhZGRTdGF0cyhkaXIsIHR5cGUsIGNvdW50ID0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3N0YXRzLmRhdGFbZGlyXVt0eXBlXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLmRhdGFbZGlyXVt0eXBlXSArPSBjb3VudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLmRhdGFbZGlyXVt0eXBlXSA9IGNvdW50O1xuICAgICAgICB9XG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBpZiAodGhpcy5fc3RhdHMuc3RhcnQgPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuX3N0YXRzLnN0YXJ0ID0gbm93O1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtLSBTVEFSVCAke25vd31gKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm93IC0gdGhpcy5fc3RhdHMubGFzdExvZyA+IE1hdGgubWF4KDEwMDAsIHByb2Nlc3MuZW52LkRVTVBfU1RBVFNfTUlMTElTKSkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdHMubGFzdExvZyA9IG5vdztcbiAgICAgICAgICAgIHRoaXMuZW1pdCgnc3RhdHMnLCB0aGlzLl9zdGF0cyk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuRFVNUF9TVEFUU19NSUxMSVMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByaW50U3RhdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjb3VudCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkRVTVBfU1RBVFNfTUlMTElTKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5jb25zdHJ1Y3Rvci5uYW1lfSAtLSBFTkQgJHtub3d9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmludFN0YXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmludFN0YXRzKCkge1xuICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuY29uc3RydWN0b3IubmFtZX0gLS0gJHsoRGF0ZS5ub3coKSAtIHRoaXMuX3N0YXRzLnN0YXJ0KSAqIDAuMDAxfXNgKTtcbiAgICAgICAgZm9yIChsZXQgZGlyIGluIHRoaXMuX3N0YXRzLmRhdGEpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9zdGF0cy5kYXRhW2Rpcl0pIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdHMuZGF0YVtkaXJdW2tleV0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGAke2tleX0gJHtkaXJ9ICR7dGhpcy5fc3RhdHMuZGF0YVtkaXJdW2tleV19YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUubG9nKCctLS0tLS1cXG4nKTtcbiAgICAgICAgLyogZXNsaW50LWVuYWJsZSBuby1jb25zb2xlICovXG4gICAgfVxuXG4gICAgZ2V0IHN0YXRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RhdHM7XG4gICAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VOb2RlOyJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _levenshtein = require('levenshtein');

var _levenshtein2 = _interopRequireDefault(_levenshtein);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ColourTable = function () {
    function ColourTable(size, minDistance) {
        var minSum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;

        _classCallCheck(this, ColourTable);

        var chance = new _chance2.default();

        this._colours = [];

        while (this._colours.length < size) {
            var min_d = 255,
                c = chance.color({ format: 'rgb' }),
                cp = c.split(','),
                csum = parseInt(cp[0].replace('rgb(', '')) + parseInt(cp[1]) + parseInt(cp[2].replace('(', ''));

            if (csum < minSum) {
                continue;
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._colours[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var cl = _step.value;

                    var lev = new _levenshtein2.default(c.toString(), cl);
                    if (lev.distance < min_d) {
                        min_d = lev.distance;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (min_d > minDistance) {
                this._colours.push(c.toString());
            }
        }
    }

    _createClass(ColourTable, [{
        key: 'colours',
        get: function get() {
            return this._colours;
        }
    }]);

    return ColourTable;
}();

exports.default = ColourTable;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbHV0L0NvbG91clRhYmxlLmpzIl0sIm5hbWVzIjpbIkNvbG91clRhYmxlIiwic2l6ZSIsIm1pbkRpc3RhbmNlIiwibWluU3VtIiwiY2hhbmNlIiwiX2NvbG91cnMiLCJsZW5ndGgiLCJtaW5fZCIsImMiLCJjb2xvciIsImZvcm1hdCIsImNwIiwic3BsaXQiLCJjc3VtIiwicGFyc2VJbnQiLCJyZXBsYWNlIiwiY2wiLCJsZXYiLCJ0b1N0cmluZyIsImRpc3RhbmNlIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxXO0FBQ0YseUJBQVlDLElBQVosRUFBa0JDLFdBQWxCLEVBQTZDO0FBQUEsWUFBZEMsTUFBYyx1RUFBTCxHQUFLOztBQUFBOztBQUN6QyxZQUFNQyxTQUFTLHNCQUFmOztBQUVBLGFBQUtDLFFBQUwsR0FBZ0IsRUFBaEI7O0FBRUEsZUFBTyxLQUFLQSxRQUFMLENBQWNDLE1BQWQsR0FBdUJMLElBQTlCLEVBQW9DO0FBQ2hDLGdCQUFJTSxRQUFRLEdBQVo7QUFBQSxnQkFDSUMsSUFBSUosT0FBT0ssS0FBUCxDQUFhLEVBQUNDLFFBQVEsS0FBVCxFQUFiLENBRFI7QUFBQSxnQkFFSUMsS0FBS0gsRUFBRUksS0FBRixDQUFRLEdBQVIsQ0FGVDtBQUFBLGdCQUdJQyxPQUFPQyxTQUFTSCxHQUFHLENBQUgsRUFBTUksT0FBTixDQUFjLE1BQWQsRUFBc0IsRUFBdEIsQ0FBVCxJQUNIRCxTQUFTSCxHQUFHLENBQUgsQ0FBVCxDQURHLEdBQ2VHLFNBQVNILEdBQUcsQ0FBSCxFQUFNSSxPQUFOLENBQWMsR0FBZCxFQUFtQixFQUFuQixDQUFULENBSjFCOztBQU1BLGdCQUFJRixPQUFPVixNQUFYLEVBQW1CO0FBQ2Y7QUFDSDs7QUFUK0I7QUFBQTtBQUFBOztBQUFBO0FBV2hDLHFDQUFlLEtBQUtFLFFBQXBCLDhIQUE4QjtBQUFBLHdCQUFyQlcsRUFBcUI7O0FBQzFCLHdCQUFJQyxNQUFNLDBCQUFnQlQsRUFBRVUsUUFBRixFQUFoQixFQUE4QkYsRUFBOUIsQ0FBVjtBQUNBLHdCQUFJQyxJQUFJRSxRQUFKLEdBQWVaLEtBQW5CLEVBQTBCO0FBQ3RCQSxnQ0FBUVUsSUFBSUUsUUFBWjtBQUNIO0FBQ0o7QUFoQitCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBa0JoQyxnQkFBSVosUUFBUUwsV0FBWixFQUF5QjtBQUNyQixxQkFBS0csUUFBTCxDQUFjZSxJQUFkLENBQW1CWixFQUFFVSxRQUFGLEVBQW5CO0FBQ0g7QUFDSjtBQUNKOzs7OzRCQUVhO0FBQ1YsbUJBQU8sS0FBS2IsUUFBWjtBQUNIOzs7Ozs7a0JBR1VMLFciLCJmaWxlIjoiZGF0YS9sdXQvQ29sb3VyVGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGV2ZW5zaHRlaW4gZnJvbSAnbGV2ZW5zaHRlaW4nO1xuaW1wb3J0IENoYW5jZSBmcm9tICdjaGFuY2UnO1xuXG5jbGFzcyBDb2xvdXJUYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbWluRGlzdGFuY2UsIG1pblN1bSA9IDI1NSkge1xuICAgICAgICBjb25zdCBjaGFuY2UgPSBuZXcgQ2hhbmNlKCk7XG5cbiAgICAgICAgdGhpcy5fY29sb3VycyA9IFtdO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9jb2xvdXJzLmxlbmd0aCA8IHNpemUpIHtcbiAgICAgICAgICAgIGxldCBtaW5fZCA9IDI1NSxcbiAgICAgICAgICAgICAgICBjID0gY2hhbmNlLmNvbG9yKHtmb3JtYXQ6ICdyZ2InfSksXG4gICAgICAgICAgICAgICAgY3AgPSBjLnNwbGl0KCcsJyksXG4gICAgICAgICAgICAgICAgY3N1bSA9IHBhcnNlSW50KGNwWzBdLnJlcGxhY2UoJ3JnYignLCAnJykpICtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoY3BbMV0pICsgcGFyc2VJbnQoY3BbMl0ucmVwbGFjZSgnKCcsICcnKSk7XG5cbiAgICAgICAgICAgIGlmIChjc3VtIDwgbWluU3VtKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNsIG9mIHRoaXMuX2NvbG91cnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGV2ID0gbmV3IExldmVuc2h0ZWluKGMudG9TdHJpbmcoKSwgY2wpO1xuICAgICAgICAgICAgICAgIGlmIChsZXYuZGlzdGFuY2UgPCBtaW5fZCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5fZCA9IGxldi5kaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaW5fZCA+IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sb3Vycy5wdXNoKGMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY29sb3VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG91cnM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xvdXJUYWJsZTsiXX0=
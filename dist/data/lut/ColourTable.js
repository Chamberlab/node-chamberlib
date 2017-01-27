'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _levenshtein = require('levenshtein');

var _levenshtein2 = _interopRequireDefault(_levenshtein);

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColourTable = function () {
    function ColourTable(size, minDistance) {
        var minSum = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 255;
        (0, _classCallCheck3.default)(this, ColourTable);

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
                for (var _iterator = (0, _getIterator3.default)(this._colours), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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

    (0, _createClass3.default)(ColourTable, [{
        key: 'colours',
        get: function get() {
            return this._colours;
        }
    }]);
    return ColourTable;
}();

exports.default = ColourTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbHV0L0NvbG91clRhYmxlLmpzIl0sIm5hbWVzIjpbIkNvbG91clRhYmxlIiwic2l6ZSIsIm1pbkRpc3RhbmNlIiwibWluU3VtIiwiY2hhbmNlIiwiX2NvbG91cnMiLCJsZW5ndGgiLCJtaW5fZCIsImMiLCJjb2xvciIsImZvcm1hdCIsImNwIiwic3BsaXQiLCJjc3VtIiwicGFyc2VJbnQiLCJyZXBsYWNlIiwiY2wiLCJsZXYiLCJ0b1N0cmluZyIsImRpc3RhbmNlIiwicHVzaCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLFc7QUFDRix5QkFBWUMsSUFBWixFQUFrQkMsV0FBbEIsRUFBNkM7QUFBQSxZQUFkQyxNQUFjLHVFQUFMLEdBQUs7QUFBQTs7QUFDekMsWUFBTUMsU0FBUyxzQkFBZjs7QUFFQSxhQUFLQyxRQUFMLEdBQWdCLEVBQWhCOztBQUVBLGVBQU8sS0FBS0EsUUFBTCxDQUFjQyxNQUFkLEdBQXVCTCxJQUE5QixFQUFvQztBQUNoQyxnQkFBSU0sUUFBUSxHQUFaO0FBQUEsZ0JBQ0lDLElBQUlKLE9BQU9LLEtBQVAsQ0FBYSxFQUFDQyxRQUFRLEtBQVQsRUFBYixDQURSO0FBQUEsZ0JBRUlDLEtBQUtILEVBQUVJLEtBQUYsQ0FBUSxHQUFSLENBRlQ7QUFBQSxnQkFHSUMsT0FBT0MsU0FBU0gsR0FBRyxDQUFILEVBQU1JLE9BQU4sQ0FBYyxNQUFkLEVBQXNCLEVBQXRCLENBQVQsSUFDSEQsU0FBU0gsR0FBRyxDQUFILENBQVQsQ0FERyxHQUNlRyxTQUFTSCxHQUFHLENBQUgsRUFBTUksT0FBTixDQUFjLEdBQWQsRUFBbUIsRUFBbkIsQ0FBVCxDQUoxQjs7QUFNQSxnQkFBSUYsT0FBT1YsTUFBWCxFQUFtQjtBQUNmO0FBQ0g7O0FBVCtCO0FBQUE7QUFBQTs7QUFBQTtBQVdoQyxnRUFBZSxLQUFLRSxRQUFwQiw0R0FBOEI7QUFBQSx3QkFBckJXLEVBQXFCOztBQUMxQix3QkFBSUMsTUFBTSwwQkFBZ0JULEVBQUVVLFFBQUYsRUFBaEIsRUFBOEJGLEVBQTlCLENBQVY7QUFDQSx3QkFBSUMsSUFBSUUsUUFBSixHQUFlWixLQUFuQixFQUEwQjtBQUN0QkEsZ0NBQVFVLElBQUlFLFFBQVo7QUFDSDtBQUNKO0FBaEIrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWtCaEMsZ0JBQUlaLFFBQVFMLFdBQVosRUFBeUI7QUFDckIscUJBQUtHLFFBQUwsQ0FBY2UsSUFBZCxDQUFtQlosRUFBRVUsUUFBRixFQUFuQjtBQUNIO0FBQ0o7QUFDSjs7Ozs0QkFFYTtBQUNWLG1CQUFPLEtBQUtiLFFBQVo7QUFDSDs7Ozs7a0JBR1VMLFciLCJmaWxlIjoiZGF0YS9sdXQvQ29sb3VyVGFibGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGV2ZW5zaHRlaW4gZnJvbSAnbGV2ZW5zaHRlaW4nO1xuaW1wb3J0IENoYW5jZSBmcm9tICdjaGFuY2UnO1xuXG5jbGFzcyBDb2xvdXJUYWJsZSB7XG4gICAgY29uc3RydWN0b3Ioc2l6ZSwgbWluRGlzdGFuY2UsIG1pblN1bSA9IDI1NSkge1xuICAgICAgICBjb25zdCBjaGFuY2UgPSBuZXcgQ2hhbmNlKCk7XG5cbiAgICAgICAgdGhpcy5fY29sb3VycyA9IFtdO1xuXG4gICAgICAgIHdoaWxlICh0aGlzLl9jb2xvdXJzLmxlbmd0aCA8IHNpemUpIHtcbiAgICAgICAgICAgIGxldCBtaW5fZCA9IDI1NSxcbiAgICAgICAgICAgICAgICBjID0gY2hhbmNlLmNvbG9yKHtmb3JtYXQ6ICdyZ2InfSksXG4gICAgICAgICAgICAgICAgY3AgPSBjLnNwbGl0KCcsJyksXG4gICAgICAgICAgICAgICAgY3N1bSA9IHBhcnNlSW50KGNwWzBdLnJlcGxhY2UoJ3JnYignLCAnJykpICtcbiAgICAgICAgICAgICAgICAgICAgcGFyc2VJbnQoY3BbMV0pICsgcGFyc2VJbnQoY3BbMl0ucmVwbGFjZSgnKCcsICcnKSk7XG5cbiAgICAgICAgICAgIGlmIChjc3VtIDwgbWluU3VtKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGNsIG9mIHRoaXMuX2NvbG91cnMpIHtcbiAgICAgICAgICAgICAgICBsZXQgbGV2ID0gbmV3IExldmVuc2h0ZWluKGMudG9TdHJpbmcoKSwgY2wpO1xuICAgICAgICAgICAgICAgIGlmIChsZXYuZGlzdGFuY2UgPCBtaW5fZCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5fZCA9IGxldi5kaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtaW5fZCA+IG1pbkRpc3RhbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sb3Vycy5wdXNoKGMudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY29sb3VycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbG91cnM7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBDb2xvdXJUYWJsZTsiXX0=
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
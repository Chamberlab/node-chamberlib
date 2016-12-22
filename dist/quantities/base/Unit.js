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

var _Dimensions = require('./Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Unit = function () {
    function Unit() {
        var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unspecified';
        var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
        var dimension = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Dimensions2.default.DIMENSION_UNSPECIFIED;
        (0, _classCallCheck3.default)(this, Unit);

        (0, _assert2.default)(typeof title === 'string');
        this._title = title;

        (0, _assert2.default)(typeof suffix === 'string');
        this._suffix = suffix;

        (0, _assert2.default)(typeof dimension === 'number');
        this._dimension = dimension;

        (0, _assert2.default)(typeof ratio === 'number');
        this._ratio = ratio;
    }

    (0, _createClass3.default)(Unit, [{
        key: 'title',
        get: function get() {
            return this._title;
        }
    }, {
        key: 'suffix',
        get: function get() {
            return this._suffix;
        }
    }, {
        key: 'dimension',
        get: function get() {
            return this._dimension;
        }
    }, {
        key: 'ratio',
        get: function get() {
            return this._ratio;
        }
    }]);
    return Unit;
}();

exports.default = Unit;
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

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scale = function () {
    function Scale(name) {
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        (0, _classCallCheck3.default)(this, Scale);

        this.name = name;
        this.key = key;
    }

    (0, _createClass3.default)(Scale, [{
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            (0, _assert2.default)(typeof value === 'string');
            // TODO: validate string content
            this._name = name;
        }
    }, {
        key: 'notes',
        get: function get() {
            return tonal.scale(this.name).map(function (name) {
                return new _Note2.default(name);
            });
        }
    }]);
    return Scale;
}();

exports.default = Scale;
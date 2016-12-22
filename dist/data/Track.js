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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _RuleSet = require('../rules/RuleSet');

var _RuleSet2 = _interopRequireDefault(_RuleSet);

var _TonalEvent = require('../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = function (_BaseCollection) {
    (0, _inherits3.default)(Track, _BaseCollection);

    function Track() {
        (0, _classCallCheck3.default)(this, Track);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (Track.__proto__ || (0, _getPrototypeOf2.default)(Track)).call(this, args, _TonalEvent2.default));

        _this._ruleset = new _RuleSet2.default();
        return _this;
    }

    //
    //
    // Getters / Setters

    (0, _createClass3.default)(Track, [{
        key: 'ruleset',
        set: function set(val) {
            (0, _assert2.default)(val instanceof _RuleSet2.default);
            this._ruleset = val;
        },
        get: function get() {
            return this._ruleset;
        }
    }]);
    return Track;
}(_BaseCollection3.default);

exports.default = Track;
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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _BaseRule = require('./BaseRule');

var _BaseRule2 = _interopRequireDefault(_BaseRule);

var _DataChannel = require('../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RuleSet = function (_BaseCollection) {
    (0, _inherits3.default)(RuleSet, _BaseCollection);

    function RuleSet() {
        (0, _classCallCheck3.default)(this, RuleSet);
        return (0, _possibleConstructorReturn3.default)(this, (RuleSet.__proto__ || (0, _getPrototypeOf2.default)(RuleSet)).call(this, [], _BaseRule2.default));
    }

    (0, _createClass3.default)(RuleSet, [{
        key: 'evaluate',
        value: function evaluate(source) {
            (0, _assert2.default)(source instanceof _DataChannel2.default, 'Expected source to be DataChannel but got ' + source.constructor.name);

            var _self = this;
            _self._progress = 0.0;

            return _bluebird2.default.reduce(_self.all, function (history, rule, i, len) {
                _self._progress = i / len;
                return _bluebird2.default.resolve(rule.evaluate(_self._results || source)).then(function (result) {
                    history.push({ rule: rule.constructor.name, results: result, errors: [] });
                    return history;
                });
            }, []).then(function (results) {
                return results;
            });
        }
    }, {
        key: 'progress',
        get: function get() {
            return this._progress;
        }
    }]);
    return RuleSet;
}(_BaseCollection3.default);

exports.default = RuleSet;
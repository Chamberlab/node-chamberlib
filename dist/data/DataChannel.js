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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _BaseEvent = require('../events/BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

var _RuleSet = require('../rules/RuleSet');

var _RuleSet2 = _interopRequireDefault(_RuleSet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataChannel = function (_BaseCollection) {
    (0, _inherits3.default)(DataChannel, _BaseCollection);

    function DataChannel(events) {
        (0, _classCallCheck3.default)(this, DataChannel);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataChannel.__proto__ || (0, _getPrototypeOf2.default)(DataChannel)).call(this, events, _BaseEvent2.default));

        _this._ruleset = new _RuleSet2.default();
        return _this;
    }

    (0, _createClass3.default)(DataChannel, [{
        key: 'evaluateRuleSet',
        value: function evaluateRuleSet() {
            var _self = this;
            return _bluebird2.default.resolve().then(function () {
                return _self.ruleset.evaluate(_self);
            });
        }
    }, {
        key: 'ruleset',
        get: function get() {
            return this._ruleset;
        }
    }]);
    return DataChannel;
}(_BaseCollection3.default);

exports.default = DataChannel;
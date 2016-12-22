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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _BaseCollection = require('../data/BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _DataChannel = require('../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _BaseEvent = require('../events/BaseEvent');

var _BaseEvent2 = _interopRequireDefault(_BaseEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseRule = function () {
    function BaseRule() {
        var active = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var autoreset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        (0, _classCallCheck3.default)(this, BaseRule);

        this._active = active;
        this._autoreset = autoreset;
    }

    (0, _createClass3.default)(BaseRule, [{
        key: 'evaluate',
        value: function evaluate(source, processorFunc) {
            for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                args[_key - 2] = arguments[_key];
            }

            (0, _assert2.default)(source instanceof _BaseCollection2.default);
            (0, _assert2.default)(typeof processorFunc === 'function');

            if (this.active) {
                this.validate(source);
                if (this._autoreset) {
                    this.reset();
                }
            }

            var _self = this;
            this._progress = 0.0;
            return _bluebird2.default.reduce(source.all, function (history, event, i, len) {
                _self._progress = i / len;
                return _bluebird2.default.resolve(processorFunc(event, history, _self._progress, args)).then(function (res) {
                    if (res instanceof _BaseEvent2.default) {
                        history.push(res);
                    }
                    return history;
                });
            }, []).then(function (results) {
                return new _DataChannel2.default(results);
            });
        }
    }, {
        key: 'validate',
        value: function validate(source) {
            (0, _assert2.default)(source instanceof _BaseCollection2.default);
            return this;
        }
    }, {
        key: 'reset',
        value: function reset() {
            this._results = undefined;
            return this;
        }
    }, {
        key: 'results',
        get: function get() {
            (0, _assert2.default)(this._results instanceof _BaseCollection2.default);
            return this._results;
        }
    }, {
        key: 'active',
        get: function get() {
            return this._active;
        },
        set: function set(v) {
            this._active = v;
        }
    }, {
        key: 'autoreset',
        get: function get() {
            return this._autoreset;
        },
        set: function set(v) {
            this._autoreset = v;
        }
    }, {
        key: 'progress',
        get: function get() {
            return this._progress;
        }
    }]);
    return BaseRule;
}();

exports.default = BaseRule;
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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseEvent = function () {
    function BaseEvent(time, value) {
        var dataClasses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        (0, _classCallCheck3.default)(this, BaseEvent);

        this._dataClasses = dataClasses;

        this.time = time;
        this.value = value;
    }

    (0, _createClass3.default)(BaseEvent, [{
        key: 'time',
        set: function set(time) {
            (0, _assert2.default)(time !== undefined);
            (0, _assert2.default)(time instanceof _Time2.default);
            this._time = time;
        },
        get: function get() {
            return this._time;
        }
    }, {
        key: 'value',
        set: function set(value) {
            if (this._dataClasses.length > 0) {
                var classAllowed = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(this._dataClasses), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dc = _step.value;

                        if (value.constructor.name === dc.name) {
                            classAllowed = true;
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

                (0, _assert2.default)(classAllowed, 'Invalid class: ' + value.constructor.name + ' - ' + ('Allowed: ' + this._dataClasses.map(function (cl) {
                    return cl.name;
                }).join(',')));
            }
            this._value = value;
        },
        get: function get() {
            return this._value;
        }
    }]);
    return BaseEvent;
}();

exports.default = BaseEvent;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseCollection = function () {
    function BaseCollection(items, childClass) {
        (0, _classCallCheck3.default)(this, BaseCollection);

        (0, _assert2.default)(typeof childClass !== 'undefined');

        this._items = [];
        this._childClass = childClass;

        if (Array.isArray(items)) {
            this._items = this._items.concat(items);
        }

        if (typeof items === 'number') {
            for (var i = 0; i < items; i++) {
                // TODO: validate this
                var item = new this._childClass();
                this._items.push(item);
            }
        }
    }

    (0, _createClass3.default)(BaseCollection, [{
        key: 'at',
        value: function at() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (args.length === 1) {
                (0, _assert2.default)(typeof args[0] === 'number');
                return this._items[args[0]];
            }

            if (args.length === 2) {
                (0, _assert2.default)(typeof args[0] === 'number');
                (0, _assert2.default)((0, _typeof3.default)(args[0]) < this._items.length);
                (0, _assert2.default)(args[1] instanceof this._childClass);

                this._items[args[0]] = args[1];
            }
        }
    }, {
        key: 'push',
        value: function push(item) {
            var _this = this;

            if (item instanceof this._childClass) {
                this._items.push(item);
                return;
            }
            if (item instanceof BaseCollection) {
                item = item.all;
            }
            if (Array.isArray(item)) {
                (function () {
                    var _self = _this;
                    item = item.map(function (it) {
                        (0, _assert2.default)(it instanceof _self._childClass);
                    });
                    _this._items = _this._items.concat(item);
                })();
            }
        }

        //
        //
        // Getters and Setters

    }, {
        key: 'all',
        get: function get() {
            return this._items;
        }
    }, {
        key: 'size',
        get: function get() {
            return this._items.length;
        }
    }]);
    return BaseCollection;
}();

exports.default = BaseCollection;
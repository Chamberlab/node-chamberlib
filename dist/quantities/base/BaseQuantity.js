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

var _Unit = require('./Unit');

var _Unit2 = _interopRequireDefault(_Unit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseQuantity = function () {
    function BaseQuantity(value, unit) {
        (0, _classCallCheck3.default)(this, BaseQuantity);

        this._value = BaseQuantity.validateFloatInput(value);

        (0, _assert2.default)(unit instanceof _Unit2.default);
        this._unit = unit;
    }

    (0, _createClass3.default)(BaseQuantity, [{
        key: 'isCompatible',
        value: function isCompatible(target) {
            (0, _assert2.default)(target instanceof BaseQuantity);

            return this.unit.isCompatible(target.unit);
        }
    }, {
        key: 'normalized',
        value: function normalized() {
            return 1.0 / this.unit.ratio * this.value;
        }
    }, {
        key: 'distanceTo',
        value: function distanceTo(target) {
            (0, _assert2.default)(target instanceof BaseQuantity);
            (0, _assert2.default)(target.isCompatible(target));

            return target.normalized() - this.normalized();
        }
    }, {
        key: 'toQuantity',
        value: function toQuantity(target) {
            (0, _assert2.default)(target instanceof BaseQuantity);

            return new target.constructor(this.normalized() * target.unit.ratio, target.unit);
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.value.toString() + ' ' + this.suffix;
        }

        //
        //
        // Getters / Setters

    }, {
        key: 'value',
        get: function get() {
            return this._value;
        },
        set: function set(value) {
            this._value = BaseQuantity.validate(value);
        }
    }, {
        key: 'unit',
        get: function get() {
            return this._unit;
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        }

        //
        //
        // Static methods

    }], [{
        key: 'validateFloatInput',
        value: function validateFloatInput(value) {
            var type = typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value);
            switch (type) {
                case 'number':
                    return value;
                case 'string':
                    return parseFloat(value);
                default:
                    throw new TypeError('Expected float or string but got: ' + type);
            }
        }
    }]);
    return BaseQuantity;
}();

exports.default = BaseQuantity;
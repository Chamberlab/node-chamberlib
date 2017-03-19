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

var _Dimensions = require('./Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: js number precision is a nightmare, implement mathjs or bignumber

var BaseQuantity = function () {
    function BaseQuantity(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Unit2.default();
        (0, _classCallCheck3.default)(this, BaseQuantity);

        (0, _assert2.default)(unit instanceof _Unit2.default);

        this._value = BaseQuantity.validateFloatInput(value);
        this._unit = unit;
    }

    (0, _createClass3.default)(BaseQuantity, [{
        key: 'isCompatible',
        value: function isCompatible(target) {
            (0, _assert2.default)(target instanceof BaseQuantity);
            return this.unit.dimension === target.unit.dimension;
        }
    }, {
        key: 'normalized',
        value: function normalized() {
            return this.value * this.unit.ratio;
        }
    }, {
        key: 'asUnit',
        value: function asUnit(suffix) {
            return this.normalized() * this.constructor.units[suffix.toLowerCase()].ratio;
        }
    }, {
        key: 'distanceTo',
        value: function distanceTo(target) {
            (0, _assert2.default)(target instanceof BaseQuantity);
            (0, _assert2.default)(this.isCompatible(target));

            return target.normalized() - this.normalized();
        }
    }, {
        key: 'toQuantity',
        value: function toQuantity(target) {
            (0, _assert2.default)(target instanceof BaseQuantity);

            return new target.constructor(this.normalized() * target.unit.ratio, target.unit);
        }
    }, {
        key: 'setUnit',
        value: function setUnit(unit) {
            (0, _assert2.default)(unit && unit !== null);
            (0, _assert2.default)(unit instanceof _Unit2.default, 'Expected type Unit but got ' + (unit ? unit.constructor.name : null));

            // FIXME: this does not work, seems to apply ratio where not necessary
            if (this._unit.suffix !== unit.suffix) {
                this._value = this.normalized() * unit.ratio;
                this._unit = unit;
            }
        }
    }, {
        key: 'toString',
        value: function toString() {
            return this.value.toPrecision(12) + ' ' + this.unit.suffix;
        }
    }, {
        key: 'toObject',
        value: function toObject() {
            return this.normalized();
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
    }, {
        key: 'units',
        get: function get() {
            return {
                undef: new _Unit2.default('', 'undef', 1, _Dimensions2.default.DIMENSION_UNSPECIFIED)
            };
        }
    }, {
        key: 'defaultUnit',
        get: function get() {
            return BaseQuantity.units.undef;
        }
    }]);
    return BaseQuantity;
}();

exports.default = BaseQuantity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvYmFzZS9CYXNlUXVhbnRpdHkuanMiXSwibmFtZXMiOlsiQmFzZVF1YW50aXR5IiwidmFsdWUiLCJ1bml0IiwiX3ZhbHVlIiwidmFsaWRhdGVGbG9hdElucHV0IiwiX3VuaXQiLCJ0YXJnZXQiLCJkaW1lbnNpb24iLCJyYXRpbyIsInN1ZmZpeCIsIm5vcm1hbGl6ZWQiLCJjb25zdHJ1Y3RvciIsInVuaXRzIiwidG9Mb3dlckNhc2UiLCJpc0NvbXBhdGlibGUiLCJuYW1lIiwidG9QcmVjaXNpb24iLCJ2YWxpZGF0ZSIsIl90eXBlIiwidHlwZSIsInBhcnNlRmxvYXQiLCJUeXBlRXJyb3IiLCJ1bmRlZiIsIkRJTUVOU0lPTl9VTlNQRUNJRklFRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7SUFFTUEsWTtBQUNGLDBCQUFZQyxLQUFaLEVBQXNDO0FBQUEsWUFBbkJDLElBQW1CLHVFQUFaLG9CQUFZO0FBQUE7O0FBQ2xDLDhCQUFPQSw4QkFBUDs7QUFFQSxhQUFLQyxNQUFMLEdBQWNILGFBQWFJLGtCQUFiLENBQWdDSCxLQUFoQyxDQUFkO0FBQ0EsYUFBS0ksS0FBTCxHQUFhSCxJQUFiO0FBQ0g7Ozs7cUNBRVlJLE0sRUFBUTtBQUNqQixrQ0FBT0Esa0JBQWtCTixZQUF6QjtBQUNBLG1CQUFPLEtBQUtFLElBQUwsQ0FBVUssU0FBVixLQUF3QkQsT0FBT0osSUFBUCxDQUFZSyxTQUEzQztBQUNIOzs7cUNBRVk7QUFDVCxtQkFBTyxLQUFLTixLQUFMLEdBQWEsS0FBS0MsSUFBTCxDQUFVTSxLQUE5QjtBQUNIOzs7K0JBRU1DLE0sRUFBUTtBQUNYLG1CQUFPLEtBQUtDLFVBQUwsS0FBb0IsS0FBS0MsV0FBTCxDQUFpQkMsS0FBakIsQ0FBdUJILE9BQU9JLFdBQVAsRUFBdkIsRUFBNkNMLEtBQXhFO0FBQ0g7OzttQ0FFVUYsTSxFQUFRO0FBQ2Ysa0NBQU9BLGtCQUFrQk4sWUFBekI7QUFDQSxrQ0FBTyxLQUFLYyxZQUFMLENBQWtCUixNQUFsQixDQUFQOztBQUVBLG1CQUFPQSxPQUFPSSxVQUFQLEtBQXNCLEtBQUtBLFVBQUwsRUFBN0I7QUFDSDs7O21DQUVVSixNLEVBQVE7QUFDZixrQ0FBT0Esa0JBQWtCTixZQUF6Qjs7QUFFQSxtQkFBTyxJQUFJTSxPQUFPSyxXQUFYLENBQXVCLEtBQUtELFVBQUwsS0FBb0JKLE9BQU9KLElBQVAsQ0FBWU0sS0FBdkQsRUFBOERGLE9BQU9KLElBQXJFLENBQVA7QUFDSDs7O2dDQUVPQSxJLEVBQU07QUFDVixrQ0FBT0EsUUFBUUEsU0FBUyxJQUF4QjtBQUNBLGtDQUFPQSw4QkFBUCxtQ0FBMkRBLE9BQU9BLEtBQUtTLFdBQUwsQ0FBaUJJLElBQXhCLEdBQStCLElBQTFGOztBQUVBO0FBQ0EsZ0JBQUksS0FBS1YsS0FBTCxDQUFXSSxNQUFYLEtBQXNCUCxLQUFLTyxNQUEvQixFQUF1QztBQUNuQyxxQkFBS04sTUFBTCxHQUFjLEtBQUtPLFVBQUwsS0FBb0JSLEtBQUtNLEtBQXZDO0FBQ0EscUJBQUtILEtBQUwsR0FBYUgsSUFBYjtBQUNIO0FBQ0o7OzttQ0FFVTtBQUNQLG1CQUFXLEtBQUtELEtBQUwsQ0FBV2UsV0FBWCxDQUF1QixFQUF2QixDQUFYLFNBQTBDLEtBQUtkLElBQUwsQ0FBVU8sTUFBcEQ7QUFDSDs7O21DQUVVO0FBQ1AsbUJBQU8sS0FBS0MsVUFBTCxFQUFQO0FBQ0g7O0FBR0Q7QUFDQTtBQUNBOzs7OzRCQUVZO0FBQ1IsbUJBQU8sS0FBS1AsTUFBWjtBQUNILFM7MEJBRVNGLEssRUFBTztBQUNiLGlCQUFLRSxNQUFMLEdBQWNILGFBQWFpQixRQUFiLENBQXNCaEIsS0FBdEIsQ0FBZDtBQUNIOzs7NEJBR1U7QUFDUCxtQkFBTyxLQUFLSSxLQUFaO0FBQ0g7Ozs0QkFHVTtBQUNQLG1CQUFPLEtBQUthLEtBQVo7QUFDSDs7QUFHRDtBQUNBO0FBQ0E7Ozs7MkNBWTBCakIsSyxFQUFPO0FBQzdCLGdCQUFJa0IsY0FBY2xCLEtBQWQsdURBQWNBLEtBQWQsQ0FBSjtBQUNBLG9CQUFRa0IsSUFBUjtBQUNBLHFCQUFLLFFBQUw7QUFDSSwyQkFBT2xCLEtBQVA7QUFDSixxQkFBSyxRQUFMO0FBQ0ksMkJBQU9tQixXQUFXbkIsS0FBWCxDQUFQO0FBQ0o7QUFDSSwwQkFBTSxJQUFJb0IsU0FBSix3Q0FBbURGLElBQW5ELENBQU47QUFOSjtBQVFIOzs7NEJBcEJrQjtBQUNmLG1CQUFPO0FBQ0hHLHVCQUFPLG1CQUFTLEVBQVQsRUFBYSxPQUFiLEVBQXNCLENBQXRCLEVBQXlCLHFCQUFXQyxxQkFBcEM7QUFESixhQUFQO0FBR0g7Ozs0QkFFd0I7QUFDckIsbUJBQU92QixhQUFhWSxLQUFiLENBQW1CVSxLQUExQjtBQUNIOzs7OztrQkFlVXRCLFkiLCJmaWxlIjoicXVhbnRpdGllcy9iYXNlL0Jhc2VRdWFudGl0eS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBVbml0IGZyb20gJy4vVW5pdCc7XG5pbXBvcnQgRGltZW5zaW9ucyBmcm9tICcuL0RpbWVuc2lvbnMnO1xuXG4vLyBUT0RPOiBqcyBudW1iZXIgcHJlY2lzaW9uIGlzIGEgbmlnaHRtYXJlLCBpbXBsZW1lbnQgbWF0aGpzIG9yIGJpZ251bWJlclxuXG5jbGFzcyBCYXNlUXVhbnRpdHkge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlLCB1bml0ID0gbmV3IFVuaXQoKSkge1xuICAgICAgICBhc3NlcnQodW5pdCBpbnN0YW5jZW9mIFVuaXQpO1xuXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gQmFzZVF1YW50aXR5LnZhbGlkYXRlRmxvYXRJbnB1dCh2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3VuaXQgPSB1bml0O1xuICAgIH1cblxuICAgIGlzQ29tcGF0aWJsZSh0YXJnZXQpIHtcbiAgICAgICAgYXNzZXJ0KHRhcmdldCBpbnN0YW5jZW9mIEJhc2VRdWFudGl0eSk7XG4gICAgICAgIHJldHVybiB0aGlzLnVuaXQuZGltZW5zaW9uID09PSB0YXJnZXQudW5pdC5kaW1lbnNpb247XG4gICAgfVxuXG4gICAgbm9ybWFsaXplZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgKiB0aGlzLnVuaXQucmF0aW87XG4gICAgfVxuXG4gICAgYXNVbml0KHN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVkKCkgKiB0aGlzLmNvbnN0cnVjdG9yLnVuaXRzW3N1ZmZpeC50b0xvd2VyQ2FzZSgpXS5yYXRpbztcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvKHRhcmdldCkge1xuICAgICAgICBhc3NlcnQodGFyZ2V0IGluc3RhbmNlb2YgQmFzZVF1YW50aXR5KTtcbiAgICAgICAgYXNzZXJ0KHRoaXMuaXNDb21wYXRpYmxlKHRhcmdldCkpO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQubm9ybWFsaXplZCgpIC0gdGhpcy5ub3JtYWxpemVkKCk7XG4gICAgfVxuXG4gICAgdG9RdWFudGl0eSh0YXJnZXQpIHtcbiAgICAgICAgYXNzZXJ0KHRhcmdldCBpbnN0YW5jZW9mIEJhc2VRdWFudGl0eSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyB0YXJnZXQuY29uc3RydWN0b3IodGhpcy5ub3JtYWxpemVkKCkgKiB0YXJnZXQudW5pdC5yYXRpbywgdGFyZ2V0LnVuaXQpO1xuICAgIH1cblxuICAgIHNldFVuaXQodW5pdCkge1xuICAgICAgICBhc3NlcnQodW5pdCAmJiB1bml0ICE9PSBudWxsKTtcbiAgICAgICAgYXNzZXJ0KHVuaXQgaW5zdGFuY2VvZiBVbml0LCBgRXhwZWN0ZWQgdHlwZSBVbml0IGJ1dCBnb3QgJHt1bml0ID8gdW5pdC5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbH1gKTtcblxuICAgICAgICAvLyBGSVhNRTogdGhpcyBkb2VzIG5vdCB3b3JrLCBzZWVtcyB0byBhcHBseSByYXRpbyB3aGVyZSBub3QgbmVjZXNzYXJ5XG4gICAgICAgIGlmICh0aGlzLl91bml0LnN1ZmZpeCAhPT0gdW5pdC5zdWZmaXgpIHtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdGhpcy5ub3JtYWxpemVkKCkgKiB1bml0LnJhdGlvO1xuICAgICAgICAgICAgdGhpcy5fdW5pdCA9IHVuaXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIGAkeyB0aGlzLnZhbHVlLnRvUHJlY2lzaW9uKDEyKSB9ICR7dGhpcy51bml0LnN1ZmZpeH1gO1xuICAgIH1cblxuICAgIHRvT2JqZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVkKCk7XG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gR2V0dGVycyAvIFNldHRlcnNcblxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cblxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IEJhc2VRdWFudGl0eS52YWxpZGF0ZSh2YWx1ZSk7XG4gICAgfVxuXG5cbiAgICBnZXQgdW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VuaXQ7XG4gICAgfVxuXG5cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3R5cGU7XG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gU3RhdGljIG1ldGhvZHNcblxuICAgIHN0YXRpYyBnZXQgdW5pdHMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1bmRlZjogbmV3IFVuaXQoJycsICd1bmRlZicsIDEsIERpbWVuc2lvbnMuRElNRU5TSU9OX1VOU1BFQ0lGSUVEKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFVuaXQoKSB7XG4gICAgICAgIHJldHVybiBCYXNlUXVhbnRpdHkudW5pdHMudW5kZWY7XG4gICAgfVxuXG4gICAgc3RhdGljIHZhbGlkYXRlRmxvYXRJbnB1dCh2YWx1ZSkge1xuICAgICAgICBsZXQgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCBmbG9hdCBvciBzdHJpbmcgYnV0IGdvdDogJHt0eXBlfWApO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlUXVhbnRpdHk7Il19
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Unit = require('./Unit');

var _Unit2 = _interopRequireDefault(_Unit);

var _Dimensions = require('./Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// TODO: js number precision is a nightmare, implement mathjs or bignumber

var BaseQuantity = function () {
    function BaseQuantity(value) {
        var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _Unit2.default();

        _classCallCheck(this, BaseQuantity);

        (0, _assert2.default)(unit instanceof _Unit2.default);

        this._value = BaseQuantity.validateFloatInput(value);
        this._unit = unit;
    }

    _createClass(BaseQuantity, [{
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
            var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvYmFzZS9CYXNlUXVhbnRpdHkuanMiXSwibmFtZXMiOlsiQmFzZVF1YW50aXR5IiwidmFsdWUiLCJ1bml0IiwiX3ZhbHVlIiwidmFsaWRhdGVGbG9hdElucHV0IiwiX3VuaXQiLCJ0YXJnZXQiLCJkaW1lbnNpb24iLCJyYXRpbyIsInN1ZmZpeCIsIm5vcm1hbGl6ZWQiLCJjb25zdHJ1Y3RvciIsInVuaXRzIiwidG9Mb3dlckNhc2UiLCJpc0NvbXBhdGlibGUiLCJuYW1lIiwidG9QcmVjaXNpb24iLCJ2YWxpZGF0ZSIsIl90eXBlIiwidHlwZSIsInBhcnNlRmxvYXQiLCJUeXBlRXJyb3IiLCJ1bmRlZiIsIkRJTUVOU0lPTl9VTlNQRUNJRklFRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQTs7SUFFTUEsWTtBQUNGLDBCQUFZQyxLQUFaLEVBQXNDO0FBQUEsWUFBbkJDLElBQW1CLHVFQUFaLG9CQUFZOztBQUFBOztBQUNsQyw4QkFBT0EsOEJBQVA7O0FBRUEsYUFBS0MsTUFBTCxHQUFjSCxhQUFhSSxrQkFBYixDQUFnQ0gsS0FBaEMsQ0FBZDtBQUNBLGFBQUtJLEtBQUwsR0FBYUgsSUFBYjtBQUNIOzs7O3FDQUVZSSxNLEVBQVE7QUFDakIsa0NBQU9BLGtCQUFrQk4sWUFBekI7QUFDQSxtQkFBTyxLQUFLRSxJQUFMLENBQVVLLFNBQVYsS0FBd0JELE9BQU9KLElBQVAsQ0FBWUssU0FBM0M7QUFDSDs7O3FDQUVZO0FBQ1QsbUJBQU8sS0FBS04sS0FBTCxHQUFhLEtBQUtDLElBQUwsQ0FBVU0sS0FBOUI7QUFDSDs7OytCQUVNQyxNLEVBQVE7QUFDWCxtQkFBTyxLQUFLQyxVQUFMLEtBQW9CLEtBQUtDLFdBQUwsQ0FBaUJDLEtBQWpCLENBQXVCSCxPQUFPSSxXQUFQLEVBQXZCLEVBQTZDTCxLQUF4RTtBQUNIOzs7bUNBRVVGLE0sRUFBUTtBQUNmLGtDQUFPQSxrQkFBa0JOLFlBQXpCO0FBQ0Esa0NBQU8sS0FBS2MsWUFBTCxDQUFrQlIsTUFBbEIsQ0FBUDs7QUFFQSxtQkFBT0EsT0FBT0ksVUFBUCxLQUFzQixLQUFLQSxVQUFMLEVBQTdCO0FBQ0g7OzttQ0FFVUosTSxFQUFRO0FBQ2Ysa0NBQU9BLGtCQUFrQk4sWUFBekI7O0FBRUEsbUJBQU8sSUFBSU0sT0FBT0ssV0FBWCxDQUF1QixLQUFLRCxVQUFMLEtBQW9CSixPQUFPSixJQUFQLENBQVlNLEtBQXZELEVBQThERixPQUFPSixJQUFyRSxDQUFQO0FBQ0g7OztnQ0FFT0EsSSxFQUFNO0FBQ1Ysa0NBQU9BLFFBQVFBLFNBQVMsSUFBeEI7QUFDQSxrQ0FBT0EsOEJBQVAsbUNBQTJEQSxPQUFPQSxLQUFLUyxXQUFMLENBQWlCSSxJQUF4QixHQUErQixJQUExRjs7QUFFQTtBQUNBLGdCQUFJLEtBQUtWLEtBQUwsQ0FBV0ksTUFBWCxLQUFzQlAsS0FBS08sTUFBL0IsRUFBdUM7QUFDbkMscUJBQUtOLE1BQUwsR0FBYyxLQUFLTyxVQUFMLEtBQW9CUixLQUFLTSxLQUF2QztBQUNBLHFCQUFLSCxLQUFMLEdBQWFILElBQWI7QUFDSDtBQUNKOzs7bUNBRVU7QUFDUCxtQkFBVyxLQUFLRCxLQUFMLENBQVdlLFdBQVgsQ0FBdUIsRUFBdkIsQ0FBWCxTQUEwQyxLQUFLZCxJQUFMLENBQVVPLE1BQXBEO0FBQ0g7OzttQ0FFVTtBQUNQLG1CQUFPLEtBQUtDLFVBQUwsRUFBUDtBQUNIOztBQUdEO0FBQ0E7QUFDQTs7Ozs0QkFFWTtBQUNSLG1CQUFPLEtBQUtQLE1BQVo7QUFDSCxTOzBCQUVTRixLLEVBQU87QUFDYixpQkFBS0UsTUFBTCxHQUFjSCxhQUFhaUIsUUFBYixDQUFzQmhCLEtBQXRCLENBQWQ7QUFDSDs7OzRCQUdVO0FBQ1AsbUJBQU8sS0FBS0ksS0FBWjtBQUNIOzs7NEJBR1U7QUFDUCxtQkFBTyxLQUFLYSxLQUFaO0FBQ0g7O0FBR0Q7QUFDQTtBQUNBOzs7OzJDQVkwQmpCLEssRUFBTztBQUM3QixnQkFBSWtCLGNBQWNsQixLQUFkLHlDQUFjQSxLQUFkLENBQUo7QUFDQSxvQkFBUWtCLElBQVI7QUFDQSxxQkFBSyxRQUFMO0FBQ0ksMkJBQU9sQixLQUFQO0FBQ0oscUJBQUssUUFBTDtBQUNJLDJCQUFPbUIsV0FBV25CLEtBQVgsQ0FBUDtBQUNKO0FBQ0ksMEJBQU0sSUFBSW9CLFNBQUosd0NBQW1ERixJQUFuRCxDQUFOO0FBTko7QUFRSDs7OzRCQXBCa0I7QUFDZixtQkFBTztBQUNIRyx1QkFBTyxtQkFBUyxFQUFULEVBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixxQkFBV0MscUJBQXBDO0FBREosYUFBUDtBQUdIOzs7NEJBRXdCO0FBQ3JCLG1CQUFPdkIsYUFBYVksS0FBYixDQUFtQlUsS0FBMUI7QUFDSDs7Ozs7O2tCQWVVdEIsWSIsImZpbGUiOiJxdWFudGl0aWVzL2Jhc2UvQmFzZVF1YW50aXR5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IFVuaXQgZnJvbSAnLi9Vbml0JztcbmltcG9ydCBEaW1lbnNpb25zIGZyb20gJy4vRGltZW5zaW9ucyc7XG5cbi8vIFRPRE86IGpzIG51bWJlciBwcmVjaXNpb24gaXMgYSBuaWdodG1hcmUsIGltcGxlbWVudCBtYXRoanMgb3IgYmlnbnVtYmVyXG5cbmNsYXNzIEJhc2VRdWFudGl0eSB7XG4gICAgY29uc3RydWN0b3IodmFsdWUsIHVuaXQgPSBuZXcgVW5pdCgpKSB7XG4gICAgICAgIGFzc2VydCh1bml0IGluc3RhbmNlb2YgVW5pdCk7XG5cbiAgICAgICAgdGhpcy5fdmFsdWUgPSBCYXNlUXVhbnRpdHkudmFsaWRhdGVGbG9hdElucHV0KHZhbHVlKTtcbiAgICAgICAgdGhpcy5fdW5pdCA9IHVuaXQ7XG4gICAgfVxuXG4gICAgaXNDb21wYXRpYmxlKHRhcmdldCkge1xuICAgICAgICBhc3NlcnQodGFyZ2V0IGluc3RhbmNlb2YgQmFzZVF1YW50aXR5KTtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5pdC5kaW1lbnNpb24gPT09IHRhcmdldC51bml0LmRpbWVuc2lvbjtcbiAgICB9XG5cbiAgICBub3JtYWxpemVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZSAqIHRoaXMudW5pdC5yYXRpbztcbiAgICB9XG5cbiAgICBhc1VuaXQoc3VmZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZWQoKSAqIHRoaXMuY29uc3RydWN0b3IudW5pdHNbc3VmZml4LnRvTG93ZXJDYXNlKCldLnJhdGlvO1xuICAgIH1cblxuICAgIGRpc3RhbmNlVG8odGFyZ2V0KSB7XG4gICAgICAgIGFzc2VydCh0YXJnZXQgaW5zdGFuY2VvZiBCYXNlUXVhbnRpdHkpO1xuICAgICAgICBhc3NlcnQodGhpcy5pc0NvbXBhdGlibGUodGFyZ2V0KSk7XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldC5ub3JtYWxpemVkKCkgLSB0aGlzLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG5cbiAgICB0b1F1YW50aXR5KHRhcmdldCkge1xuICAgICAgICBhc3NlcnQodGFyZ2V0IGluc3RhbmNlb2YgQmFzZVF1YW50aXR5KTtcblxuICAgICAgICByZXR1cm4gbmV3IHRhcmdldC5jb25zdHJ1Y3Rvcih0aGlzLm5vcm1hbGl6ZWQoKSAqIHRhcmdldC51bml0LnJhdGlvLCB0YXJnZXQudW5pdCk7XG4gICAgfVxuXG4gICAgc2V0VW5pdCh1bml0KSB7XG4gICAgICAgIGFzc2VydCh1bml0ICYmIHVuaXQgIT09IG51bGwpO1xuICAgICAgICBhc3NlcnQodW5pdCBpbnN0YW5jZW9mIFVuaXQsIGBFeHBlY3RlZCB0eXBlIFVuaXQgYnV0IGdvdCAke3VuaXQgPyB1bml0LmNvbnN0cnVjdG9yLm5hbWUgOiBudWxsfWApO1xuXG4gICAgICAgIC8vIEZJWE1FOiB0aGlzIGRvZXMgbm90IHdvcmssIHNlZW1zIHRvIGFwcGx5IHJhdGlvIHdoZXJlIG5vdCBuZWNlc3NhcnlcbiAgICAgICAgaWYgKHRoaXMuX3VuaXQuc3VmZml4ICE9PSB1bml0LnN1ZmZpeCkge1xuICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLm5vcm1hbGl6ZWQoKSAqIHVuaXQucmF0aW87XG4gICAgICAgICAgICB0aGlzLl91bml0ID0gdW5pdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7IHRoaXMudmFsdWUudG9QcmVjaXNpb24oMTIpIH0gJHt0aGlzLnVuaXQuc3VmZml4fWA7XG4gICAgfVxuXG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBHZXR0ZXJzIC8gU2V0dGVyc1xuXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gQmFzZVF1YW50aXR5LnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9XG5cblxuICAgIGdldCB1bml0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdW5pdDtcbiAgICB9XG5cblxuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBTdGF0aWMgbWV0aG9kc1xuXG4gICAgc3RhdGljIGdldCB1bml0cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVuZGVmOiBuZXcgVW5pdCgnJywgJ3VuZGVmJywgMSwgRGltZW5zaW9ucy5ESU1FTlNJT05fVU5TUEVDSUZJRUQpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBkZWZhdWx0VW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIEJhc2VRdWFudGl0eS51bml0cy51bmRlZjtcbiAgICB9XG5cbiAgICBzdGF0aWMgdmFsaWRhdGVGbG9hdElucHV0KHZhbHVlKSB7XG4gICAgICAgIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYEV4cGVjdGVkIGZsb2F0IG9yIHN0cmluZyBidXQgZ290OiAke3R5cGV9YCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VRdWFudGl0eTsiXX0=
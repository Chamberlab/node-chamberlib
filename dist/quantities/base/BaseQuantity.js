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
            return this.value / this.unit.ratio;
        }
    }, {
        key: 'defaultUnit',
        value: function defaultUnit() {
            return this.normalized() / this.constructor.defaultUnit().ratio;
        }
    }, {
        key: 'asUnit',
        value: function asUnit(suffix) {
            return this.normalized() / this.constructor.units[suffix.toLowerCase()].ratio;
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
            this._value = this.normalized() * unit.ratio;
            this._unit = unit;
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
                'undef': new _Unit2.default('', 'undef', 1, _Dimensions2.default.DIMENSION_UNSPECIFIED)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvYmFzZS9CYXNlUXVhbnRpdHkuanMiXSwibmFtZXMiOlsiQmFzZVF1YW50aXR5IiwidmFsdWUiLCJ1bml0IiwiX3ZhbHVlIiwidmFsaWRhdGVGbG9hdElucHV0IiwiX3VuaXQiLCJ0YXJnZXQiLCJkaW1lbnNpb24iLCJyYXRpbyIsIm5vcm1hbGl6ZWQiLCJjb25zdHJ1Y3RvciIsImRlZmF1bHRVbml0Iiwic3VmZml4IiwidW5pdHMiLCJ0b0xvd2VyQ2FzZSIsImlzQ29tcGF0aWJsZSIsIm5hbWUiLCJ0b1ByZWNpc2lvbiIsInZhbGlkYXRlIiwiX3R5cGUiLCJ0eXBlIiwicGFyc2VGbG9hdCIsIlR5cGVFcnJvciIsIkRJTUVOU0lPTl9VTlNQRUNJRklFRCIsInVuZGVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOztJQUVNQSxZO0FBQ0YsMEJBQVlDLEtBQVosRUFBc0M7QUFBQSxZQUFuQkMsSUFBbUIsdUVBQVosb0JBQVk7QUFBQTs7QUFDbEMsOEJBQU9BLDhCQUFQOztBQUVBLGFBQUtDLE1BQUwsR0FBY0gsYUFBYUksa0JBQWIsQ0FBZ0NILEtBQWhDLENBQWQ7QUFDQSxhQUFLSSxLQUFMLEdBQWFILElBQWI7QUFDSDs7OztxQ0FFWUksTSxFQUFRO0FBQ2pCLGtDQUFPQSxrQkFBa0JOLFlBQXpCO0FBQ0EsbUJBQU8sS0FBS0UsSUFBTCxDQUFVSyxTQUFWLEtBQXdCRCxPQUFPSixJQUFQLENBQVlLLFNBQTNDO0FBQ0g7OztxQ0FFWTtBQUNULG1CQUFPLEtBQUtOLEtBQUwsR0FBYSxLQUFLQyxJQUFMLENBQVVNLEtBQTlCO0FBQ0g7OztzQ0FFYTtBQUNWLG1CQUFPLEtBQUtDLFVBQUwsS0FBb0IsS0FBS0MsV0FBTCxDQUFpQkMsV0FBakIsR0FBK0JILEtBQTFEO0FBQ0g7OzsrQkFFTUksTSxFQUFRO0FBQ1gsbUJBQU8sS0FBS0gsVUFBTCxLQUFvQixLQUFLQyxXQUFMLENBQWlCRyxLQUFqQixDQUF1QkQsT0FBT0UsV0FBUCxFQUF2QixFQUE2Q04sS0FBeEU7QUFDSDs7O21DQUVVRixNLEVBQVE7QUFDZixrQ0FBT0Esa0JBQWtCTixZQUF6QjtBQUNBLGtDQUFPLEtBQUtlLFlBQUwsQ0FBa0JULE1BQWxCLENBQVA7O0FBRUEsbUJBQU9BLE9BQU9HLFVBQVAsS0FBc0IsS0FBS0EsVUFBTCxFQUE3QjtBQUNIOzs7bUNBRVVILE0sRUFBUTtBQUNmLGtDQUFPQSxrQkFBa0JOLFlBQXpCOztBQUVBLG1CQUFPLElBQUlNLE9BQU9JLFdBQVgsQ0FBdUIsS0FBS0QsVUFBTCxLQUFvQkgsT0FBT0osSUFBUCxDQUFZTSxLQUF2RCxFQUE4REYsT0FBT0osSUFBckUsQ0FBUDtBQUNIOzs7Z0NBRU9BLEksRUFBTTtBQUNWLGtDQUFPQSxRQUFRQSxTQUFTLElBQXhCO0FBQ0Esa0NBQU9BLDhCQUFQLG1DQUEyREEsT0FBT0EsS0FBS1EsV0FBTCxDQUFpQk0sSUFBeEIsR0FBK0IsSUFBMUY7QUFDQSxpQkFBS2IsTUFBTCxHQUFjLEtBQUtNLFVBQUwsS0FBb0JQLEtBQUtNLEtBQXZDO0FBQ0EsaUJBQUtILEtBQUwsR0FBYUgsSUFBYjtBQUNIOzs7bUNBRVU7QUFDUCxtQkFBVyxLQUFLRCxLQUFMLENBQVdnQixXQUFYLENBQXVCLEVBQXZCLENBQVgsU0FBMEMsS0FBS2YsSUFBTCxDQUFVVSxNQUFwRDtBQUNIOzs7bUNBRVU7QUFDUCxtQkFBTyxLQUFLSCxVQUFMLEVBQVA7QUFDSDs7QUFHRDtBQUNBO0FBQ0E7Ozs7NEJBRVk7QUFDUixtQkFBTyxLQUFLTixNQUFaO0FBQ0gsUzswQkFFU0YsSyxFQUFPO0FBQ2IsaUJBQUtFLE1BQUwsR0FBY0gsYUFBYWtCLFFBQWIsQ0FBc0JqQixLQUF0QixDQUFkO0FBQ0g7Ozs0QkFHVTtBQUNQLG1CQUFPLEtBQUtJLEtBQVo7QUFDSDs7OzRCQUdVO0FBQ1AsbUJBQU8sS0FBS2MsS0FBWjtBQUNIOztBQUdEO0FBQ0E7QUFDQTs7OzsyQ0FZMEJsQixLLEVBQU87QUFDN0IsZ0JBQUltQixjQUFjbkIsS0FBZCx1REFBY0EsS0FBZCxDQUFKO0FBQ0Esb0JBQVFtQixJQUFSO0FBQ0EscUJBQUssUUFBTDtBQUNJLDJCQUFPbkIsS0FBUDtBQUNKLHFCQUFLLFFBQUw7QUFDSSwyQkFBT29CLFdBQVdwQixLQUFYLENBQVA7QUFDSjtBQUNJLDBCQUFNLElBQUlxQixTQUFKLHdDQUFtREYsSUFBbkQsQ0FBTjtBQU5KO0FBUUg7Ozs0QkFwQmtCO0FBQ2YsbUJBQU87QUFDSCx5QkFBUyxtQkFBUyxFQUFULEVBQWEsT0FBYixFQUFzQixDQUF0QixFQUF5QixxQkFBV0cscUJBQXBDO0FBRE4sYUFBUDtBQUdIOzs7NEJBRXdCO0FBQ3JCLG1CQUFPdkIsYUFBYWEsS0FBYixDQUFtQlcsS0FBMUI7QUFDSDs7Ozs7a0JBZVV4QixZIiwiZmlsZSI6InF1YW50aXRpZXMvYmFzZS9CYXNlUXVhbnRpdHkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL1VuaXQnO1xuaW1wb3J0IERpbWVuc2lvbnMgZnJvbSAnLi9EaW1lbnNpb25zJztcblxuLy8gVE9ETzoganMgbnVtYmVyIHByZWNpc2lvbiBpcyBhIG5pZ2h0bWFyZSwgaW1wbGVtZW50IG1hdGhqcyBvciBiaWdudW1iZXJcblxuY2xhc3MgQmFzZVF1YW50aXR5IHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSwgdW5pdCA9IG5ldyBVbml0KCkpIHtcbiAgICAgICAgYXNzZXJ0KHVuaXQgaW5zdGFuY2VvZiBVbml0KTtcblxuICAgICAgICB0aGlzLl92YWx1ZSA9IEJhc2VRdWFudGl0eS52YWxpZGF0ZUZsb2F0SW5wdXQodmFsdWUpO1xuICAgICAgICB0aGlzLl91bml0ID0gdW5pdDtcbiAgICB9XG5cbiAgICBpc0NvbXBhdGlibGUodGFyZ2V0KSB7XG4gICAgICAgIGFzc2VydCh0YXJnZXQgaW5zdGFuY2VvZiBCYXNlUXVhbnRpdHkpO1xuICAgICAgICByZXR1cm4gdGhpcy51bml0LmRpbWVuc2lvbiA9PT0gdGFyZ2V0LnVuaXQuZGltZW5zaW9uO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlIC8gdGhpcy51bml0LnJhdGlvO1xuICAgIH1cblxuICAgIGRlZmF1bHRVbml0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVkKCkgLyB0aGlzLmNvbnN0cnVjdG9yLmRlZmF1bHRVbml0KCkucmF0aW87XG4gICAgfVxuXG4gICAgYXNVbml0KHN1ZmZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ub3JtYWxpemVkKCkgLyB0aGlzLmNvbnN0cnVjdG9yLnVuaXRzW3N1ZmZpeC50b0xvd2VyQ2FzZSgpXS5yYXRpbztcbiAgICB9XG5cbiAgICBkaXN0YW5jZVRvKHRhcmdldCkge1xuICAgICAgICBhc3NlcnQodGFyZ2V0IGluc3RhbmNlb2YgQmFzZVF1YW50aXR5KTtcbiAgICAgICAgYXNzZXJ0KHRoaXMuaXNDb21wYXRpYmxlKHRhcmdldCkpO1xuXG4gICAgICAgIHJldHVybiB0YXJnZXQubm9ybWFsaXplZCgpIC0gdGhpcy5ub3JtYWxpemVkKCk7XG4gICAgfVxuXG4gICAgdG9RdWFudGl0eSh0YXJnZXQpIHtcbiAgICAgICAgYXNzZXJ0KHRhcmdldCBpbnN0YW5jZW9mIEJhc2VRdWFudGl0eSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyB0YXJnZXQuY29uc3RydWN0b3IodGhpcy5ub3JtYWxpemVkKCkgKiB0YXJnZXQudW5pdC5yYXRpbywgdGFyZ2V0LnVuaXQpO1xuICAgIH1cblxuICAgIHNldFVuaXQodW5pdCkge1xuICAgICAgICBhc3NlcnQodW5pdCAmJiB1bml0ICE9PSBudWxsKTtcbiAgICAgICAgYXNzZXJ0KHVuaXQgaW5zdGFuY2VvZiBVbml0LCBgRXhwZWN0ZWQgdHlwZSBVbml0IGJ1dCBnb3QgJHt1bml0ID8gdW5pdC5jb25zdHJ1Y3Rvci5uYW1lIDogbnVsbH1gKTtcbiAgICAgICAgdGhpcy5fdmFsdWUgPSB0aGlzLm5vcm1hbGl6ZWQoKSAqIHVuaXQucmF0aW87XG4gICAgICAgIHRoaXMuX3VuaXQgPSB1bml0O1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gYCR7IHRoaXMudmFsdWUudG9QcmVjaXNpb24oMTIpIH0gJHt0aGlzLnVuaXQuc3VmZml4fWA7XG4gICAgfVxuXG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vcm1hbGl6ZWQoKTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBHZXR0ZXJzIC8gU2V0dGVyc1xuXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gQmFzZVF1YW50aXR5LnZhbGlkYXRlKHZhbHVlKTtcbiAgICB9XG5cblxuICAgIGdldCB1bml0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdW5pdDtcbiAgICB9XG5cblxuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBTdGF0aWMgbWV0aG9kc1xuXG4gICAgc3RhdGljIGdldCB1bml0cygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICd1bmRlZic6IG5ldyBVbml0KCcnLCAndW5kZWYnLCAxLCBEaW1lbnNpb25zLkRJTUVOU0lPTl9VTlNQRUNJRklFRClcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRVbml0KCkge1xuICAgICAgICByZXR1cm4gQmFzZVF1YW50aXR5LnVuaXRzLnVuZGVmO1xuICAgIH1cblxuICAgIHN0YXRpYyB2YWxpZGF0ZUZsb2F0SW5wdXQodmFsdWUpIHtcbiAgICAgICAgbGV0IHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgRXhwZWN0ZWQgZmxvYXQgb3Igc3RyaW5nIGJ1dCBnb3Q6ICR7dHlwZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVF1YW50aXR5OyJdfQ==
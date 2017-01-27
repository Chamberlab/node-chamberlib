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

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

var _BaseQuantity = require('../quantities/base/BaseQuantity');

var _BaseQuantity2 = _interopRequireDefault(_BaseQuantity);

var _Voltage = require('../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _Frequency = require('../quantities/Frequency');

var _Frequency2 = _interopRequireDefault(_Frequency);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Datasize = require('../quantities/Datasize');

var _Datasize2 = _interopRequireDefault(_Datasize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataEvent = function (_BaseEvent) {
    (0, _inherits3.default)(DataEvent, _BaseEvent);

    function DataEvent(time, value) {
        (0, _classCallCheck3.default)(this, DataEvent);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataEvent.__proto__ || (0, _getPrototypeOf2.default)(DataEvent)).call(this, time, value, [_BaseQuantity2.default, _Voltage2.default, _Frequency2.default, _Time2.default, _Datasize2.default]));

        _this.time = time;
        _this.value = value;
        return _this;
    }

    (0, _createClass3.default)(DataEvent, [{
        key: 'toObject',
        value: function toObject() {
            return { t: this.time.normalized(), v: this.value.normalized() };
        }
    }]);
    return DataEvent;
}(_BaseEvent3.default);

exports.default = DataEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9EYXRhRXZlbnQuanMiXSwibmFtZXMiOlsiRGF0YUV2ZW50IiwidGltZSIsInZhbHVlIiwidCIsIm5vcm1hbGl6ZWQiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFM7OztBQUNGLHVCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF5QjtBQUFBOztBQUFBLGdKQUNmRCxJQURlLEVBQ1RDLEtBRFMsRUFDRixvR0FERTs7QUFHckIsY0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBSnFCO0FBS3hCOzs7O21DQUVVO0FBQ1AsbUJBQU8sRUFBRUMsR0FBRyxLQUFLRixJQUFMLENBQVVHLFVBQVYsRUFBTCxFQUE2QkMsR0FBRyxLQUFLSCxLQUFMLENBQVdFLFVBQVgsRUFBaEMsRUFBUDtBQUNIOzs7OztrQkFHVUosUyIsImZpbGUiOiJldmVudHMvRGF0YUV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VFdmVudCBmcm9tICcuL0Jhc2VFdmVudCc7XG5pbXBvcnQgQmFzZVF1YW50aXR5IGZyb20gJy4uL3F1YW50aXRpZXMvYmFzZS9CYXNlUXVhbnRpdHknO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcbmltcG9ydCBGcmVxdWVuY3kgZnJvbSAnLi4vcXVhbnRpdGllcy9GcmVxdWVuY3knO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBEYXRhc2l6ZSBmcm9tICcuLi9xdWFudGl0aWVzL0RhdGFzaXplJztcblxuY2xhc3MgRGF0YUV2ZW50IGV4dGVuZHMgQmFzZUV2ZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih0aW1lLCB2YWx1ZSkge1xuICAgICAgICBzdXBlcih0aW1lLCB2YWx1ZSwgW0Jhc2VRdWFudGl0eSwgVm9sdGFnZSwgRnJlcXVlbmN5LCBUaW1lLCBEYXRhc2l6ZV0pO1xuXG4gICAgICAgIHRoaXMudGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICB0b09iamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIHsgdDogdGhpcy50aW1lLm5vcm1hbGl6ZWQoKSwgdjogdGhpcy52YWx1ZS5ub3JtYWxpemVkKCkgfTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERhdGFFdmVudDsiXX0=
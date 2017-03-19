'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataEvent = function (_BaseEvent) {
    _inherits(DataEvent, _BaseEvent);

    function DataEvent(time, value) {
        _classCallCheck(this, DataEvent);

        var _this = _possibleConstructorReturn(this, (DataEvent.__proto__ || Object.getPrototypeOf(DataEvent)).call(this, time, value, [_BaseQuantity2.default, _Voltage2.default, _Frequency2.default, _Time2.default, _Datasize2.default]));

        _this.time = time;
        _this.value = value;
        return _this;
    }

    _createClass(DataEvent, [{
        key: 'toObject',
        value: function toObject() {
            return { t: this.time.normalized(), v: this.value.normalized() };
        }
    }]);

    return DataEvent;
}(_BaseEvent3.default);

exports.default = DataEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9EYXRhRXZlbnQuanMiXSwibmFtZXMiOlsiRGF0YUV2ZW50IiwidGltZSIsInZhbHVlIiwidCIsIm5vcm1hbGl6ZWQiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFM7OztBQUNGLHVCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUF5QjtBQUFBOztBQUFBLDBIQUNmRCxJQURlLEVBQ1RDLEtBRFMsRUFDRixvR0FERTs7QUFHckIsY0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhQSxLQUFiO0FBSnFCO0FBS3hCOzs7O21DQUVVO0FBQ1AsbUJBQU8sRUFBRUMsR0FBRyxLQUFLRixJQUFMLENBQVVHLFVBQVYsRUFBTCxFQUE2QkMsR0FBRyxLQUFLSCxLQUFMLENBQVdFLFVBQVgsRUFBaEMsRUFBUDtBQUNIOzs7Ozs7a0JBR1VKLFMiLCJmaWxlIjoiZXZlbnRzL0RhdGFFdmVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRXZlbnQgZnJvbSAnLi9CYXNlRXZlbnQnO1xuaW1wb3J0IEJhc2VRdWFudGl0eSBmcm9tICcuLi9xdWFudGl0aWVzL2Jhc2UvQmFzZVF1YW50aXR5JztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5pbXBvcnQgRnJlcXVlbmN5IGZyb20gJy4uL3F1YW50aXRpZXMvRnJlcXVlbmN5JztcbmltcG9ydCBUaW1lIGZyb20gJy4uL3F1YW50aXRpZXMvVGltZSc7XG5pbXBvcnQgRGF0YXNpemUgZnJvbSAnLi4vcXVhbnRpdGllcy9EYXRhc2l6ZSc7XG5cbmNsYXNzIERhdGFFdmVudCBleHRlbmRzIEJhc2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IodGltZSwgdmFsdWUpIHtcbiAgICAgICAgc3VwZXIodGltZSwgdmFsdWUsIFtCYXNlUXVhbnRpdHksIFZvbHRhZ2UsIEZyZXF1ZW5jeSwgVGltZSwgRGF0YXNpemVdKTtcblxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgdG9PYmplY3QoKSB7XG4gICAgICAgIHJldHVybiB7IHQ6IHRoaXMudGltZS5ub3JtYWxpemVkKCksIHY6IHRoaXMudmFsdWUubm9ybWFsaXplZCgpIH07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhRXZlbnQ7Il19
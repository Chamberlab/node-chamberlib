'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseEvent2 = require('./BaseEvent');

var _BaseEvent3 = _interopRequireDefault(_BaseEvent2);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Note = require('../harmonics/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Chord = require('../harmonics/Chord');

var _Chord2 = _interopRequireDefault(_Chord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TonalEvent = function (_BaseEvent) {
    _inherits(TonalEvent, _BaseEvent);

    function TonalEvent(time, value, duration) {
        _classCallCheck(this, TonalEvent);

        var _this = _possibleConstructorReturn(this, (TonalEvent.__proto__ || Object.getPrototypeOf(TonalEvent)).call(this, time, value, [_Note2.default, _Chord2.default]));

        _this.time = time;
        _this.value = value;

        _this.duration = duration;
        return _this;
    }

    _createClass(TonalEvent, [{
        key: 'duration',
        get: function get() {
            return this._duration;
        },
        set: function set(value) {
            (0, _assert2.default)(value instanceof _Time2.default, 'Duration value must be of type Time, is ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));

            this._duration = value;
        }
    }]);

    return TonalEvent;
}(_BaseEvent3.default);

exports.default = TonalEvent;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9Ub25hbEV2ZW50LmpzIl0sIm5hbWVzIjpbIlRvbmFsRXZlbnQiLCJ0aW1lIiwidmFsdWUiLCJkdXJhdGlvbiIsIl9kdXJhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxVOzs7QUFDRix3QkFBWUMsSUFBWixFQUFrQkMsS0FBbEIsRUFBeUJDLFFBQXpCLEVBQW1DO0FBQUE7O0FBQUEsNEhBQ3pCRixJQUR5QixFQUNuQkMsS0FEbUIsRUFDWixpQ0FEWTs7QUFHL0IsY0FBS0QsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsY0FBS0MsS0FBTCxHQUFhQSxLQUFiOztBQUVBLGNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBTitCO0FBT2xDOzs7OzRCQUdjO0FBQ1gsbUJBQU8sS0FBS0MsU0FBWjtBQUNILFM7MEJBRVlGLEssRUFBTztBQUNoQixrQ0FBT0EsK0JBQVAsdURBQWdGQSxLQUFoRix5Q0FBZ0ZBLEtBQWhGOztBQUVBLGlCQUFLRSxTQUFMLEdBQWlCRixLQUFqQjtBQUNIOzs7Ozs7a0JBR1VGLFUiLCJmaWxlIjoiZXZlbnRzL1RvbmFsRXZlbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgQmFzZUV2ZW50IGZyb20gJy4vQmFzZUV2ZW50JztcbmltcG9ydCBUaW1lIGZyb20gJy4uL3F1YW50aXRpZXMvVGltZSc7XG5pbXBvcnQgTm90ZSBmcm9tICcuLi9oYXJtb25pY3MvTm90ZSc7XG5pbXBvcnQgQ2hvcmQgZnJvbSAnLi4vaGFybW9uaWNzL0Nob3JkJztcblxuY2xhc3MgVG9uYWxFdmVudCBleHRlbmRzIEJhc2VFdmVudCB7XG4gICAgY29uc3RydWN0b3IodGltZSwgdmFsdWUsIGR1cmF0aW9uKSB7XG4gICAgICAgIHN1cGVyKHRpbWUsIHZhbHVlLCBbTm90ZSwgQ2hvcmRdKTtcblxuICAgICAgICB0aGlzLnRpbWUgPSB0aW1lO1xuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIH1cblxuXG4gICAgZ2V0IGR1cmF0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZHVyYXRpb247XG4gICAgfVxuXG4gICAgc2V0IGR1cmF0aW9uKHZhbHVlKSB7XG4gICAgICAgIGFzc2VydCh2YWx1ZSBpbnN0YW5jZW9mIFRpbWUsIGBEdXJhdGlvbiB2YWx1ZSBtdXN0IGJlIG9mIHR5cGUgVGltZSwgaXMgJHt0eXBlb2YgdmFsdWV9YCk7XG5cbiAgICAgICAgdGhpcy5fZHVyYXRpb24gPSB2YWx1ZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRvbmFsRXZlbnQ7Il19
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseDB = function (_Emitter) {
    _inherits(BaseDB, _Emitter);

    function BaseDB() {
        _classCallCheck(this, BaseDB);

        return _possibleConstructorReturn(this, (BaseDB.__proto__ || Object.getPrototypeOf(BaseDB)).call(this));
    }

    _createClass(BaseDB, [{
        key: 'get',
        value: function get(key) {
            (0, _assert2.default)(key instanceof _Time2.default);
        }
    }, {
        key: 'put',
        value: function put(key, val) {
            (0, _assert2.default)(key instanceof _Time2.default);
            (0, _assert2.default)(val instanceof _DataEvent2.default);
        }
    }]);

    return BaseDB;
}(_tinyEmitter2.default);

exports.default = BaseDB;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2RiL0Jhc2VEQi5qcyJdLCJuYW1lcyI6WyJCYXNlREIiLCJrZXkiLCJ2YWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxNOzs7QUFDRixzQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7NEJBRUdDLEcsRUFBSztBQUNMLGtDQUFPQSw2QkFBUDtBQUNIOzs7NEJBRUdBLEcsRUFBS0MsRyxFQUFLO0FBQ1Ysa0NBQU9ELDZCQUFQO0FBQ0Esa0NBQU9DLGtDQUFQO0FBQ0g7Ozs7OztrQkFHVUYsTSIsImZpbGUiOiJpby9kYi9CYXNlREIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgRW1pdHRlciBmcm9tICd0aW55LWVtaXR0ZXInO1xuaW1wb3J0IERhdGFFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUV2ZW50JztcbmltcG9ydCBUaW1lIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVGltZSc7XG5cbmNsYXNzIEJhc2VEQiBleHRlbmRzIEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGdldChrZXkpIHtcbiAgICAgICAgYXNzZXJ0KGtleSBpbnN0YW5jZW9mIFRpbWUpO1xuICAgIH1cblxuICAgIHB1dChrZXksIHZhbCkge1xuICAgICAgICBhc3NlcnQoa2V5IGluc3RhbmNlb2YgVGltZSk7XG4gICAgICAgIGFzc2VydCh2YWwgaW5zdGFuY2VvZiBEYXRhRXZlbnQpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZURCOyJdfQ==
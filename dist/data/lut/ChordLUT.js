'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Scale = require('../../harmonics/Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var _BaseLUT2 = require('./BaseLUT');

var _BaseLUT3 = _interopRequireDefault(_BaseLUT2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChordLUT = function (_BaseLUT) {
    _inherits(ChordLUT, _BaseLUT);

    function ChordLUT(scale) {
        _classCallCheck(this, ChordLUT);

        var _this = _possibleConstructorReturn(this, (ChordLUT.__proto__ || Object.getPrototypeOf(ChordLUT)).call(this));

        if (typeof scale === 'string') {
            scale = new _Scale2.default(scale);
        }

        (0, _assert2.default)(scale instanceof _Scale2.default);
        _this._scale = scale;
        return _this;
    }

    _createClass(ChordLUT, [{
        key: 'generate',
        value: function generate() {
            _get(ChordLUT.prototype.__proto__ || Object.getPrototypeOf(ChordLUT.prototype), 'generate', this).call(this);
        }
    }]);

    return ChordLUT;
}(_BaseLUT3.default);

exports.default = ChordLUT;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbHV0L0Nob3JkTFVULmpzIl0sIm5hbWVzIjpbIkNob3JkTFVUIiwic2NhbGUiLCJfc2NhbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxROzs7QUFDRixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUdmLFlBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQkEsb0JBQVEsb0JBQVVBLEtBQVYsQ0FBUjtBQUNIOztBQUVELDhCQUFPQSxnQ0FBUDtBQUNBLGNBQUtDLE1BQUwsR0FBY0QsS0FBZDtBQVJlO0FBU2xCOzs7O21DQUVVO0FBQ1A7QUFFSDs7Ozs7O2tCQUdVRCxRIiwiZmlsZSI6ImRhdGEvbHV0L0Nob3JkTFVULmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IFNjYWxlIGZyb20gJy4uLy4uL2hhcm1vbmljcy9TY2FsZSc7XG5pbXBvcnQgQmFzZUxVVCBmcm9tICcuL0Jhc2VMVVQnO1xuXG5jbGFzcyBDaG9yZExVVCBleHRlbmRzIEJhc2VMVVQge1xuICAgIGNvbnN0cnVjdG9yKHNjYWxlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBzY2FsZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNjYWxlID0gbmV3IFNjYWxlKHNjYWxlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydChzY2FsZSBpbnN0YW5jZW9mIFNjYWxlKTtcbiAgICAgICAgdGhpcy5fc2NhbGUgPSBzY2FsZTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgc3VwZXIuZ2VuZXJhdGUoKTtcblxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hvcmRMVVQ7Il19
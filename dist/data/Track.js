'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _TonalEvent = require('../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Track = function (_BaseCollection) {
    _inherits(Track, _BaseCollection);

    function Track(tracks) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, Track);

        var _this = _possibleConstructorReturn(this, (Track.__proto__ || Object.getPrototypeOf(Track)).call(this, tracks, _TonalEvent2.default, uuid));

        _this._title = title;
        return _this;
    }

    return Track;
}(_BaseCollection3.default);

exports.default = Track;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvVHJhY2suanMiXSwibmFtZXMiOlsiVHJhY2siLCJ0cmFja3MiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInV1aWQiLCJfdGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxLOzs7QUFDRixtQkFBWUMsTUFBWixFQUF5RDtBQUFBLFlBQXJDQyxLQUFxQyx1RUFBN0JDLFNBQTZCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYRCxTQUFXOztBQUFBOztBQUFBLGtIQUMvQ0YsTUFEK0Msd0JBQzNCRyxJQUQyQjs7QUFHckQsY0FBS0MsTUFBTCxHQUFjSCxLQUFkO0FBSHFEO0FBSXhEOzs7OztrQkFHVUYsSyIsImZpbGUiOiJkYXRhL1RyYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gJy4vQmFzZUNvbGxlY3Rpb24nO1xuaW1wb3J0IFRvbmFsRXZlbnQgZnJvbSAnLi4vZXZlbnRzL1RvbmFsRXZlbnQnO1xuXG5jbGFzcyBUcmFjayBleHRlbmRzIEJhc2VDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3MsIHRpdGxlID0gdW5kZWZpbmVkLCB1dWlkID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKHRyYWNrcywgVG9uYWxFdmVudCwgdXVpZCk7XG5cbiAgICAgICAgdGhpcy5fdGl0bGUgPSB0aXRsZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWNrOyJdfQ==
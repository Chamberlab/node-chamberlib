'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _TonalEvent = require('../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Track = function (_BaseCollection) {
    (0, _inherits3.default)(Track, _BaseCollection);

    function Track(tracks) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        (0, _classCallCheck3.default)(this, Track);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Track.__proto__ || (0, _getPrototypeOf2.default)(Track)).call(this, tracks, _TonalEvent2.default, uuid));

        _this._title = title;
        return _this;
    }

    return Track;
}(_BaseCollection3.default);

exports.default = Track;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvVHJhY2suanMiXSwibmFtZXMiOlsiVHJhY2siLCJ0cmFja3MiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInV1aWQiLCJfdGl0bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsSzs7O0FBQ0YsbUJBQVlDLE1BQVosRUFBeUQ7QUFBQSxZQUFyQ0MsS0FBcUMsdUVBQTdCQyxTQUE2QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEQsU0FBVztBQUFBOztBQUFBLHdJQUMvQ0YsTUFEK0Msd0JBQzNCRyxJQUQyQjs7QUFHckQsY0FBS0MsTUFBTCxHQUFjSCxLQUFkO0FBSHFEO0FBSXhEOzs7OztrQkFHVUYsSyIsImZpbGUiOiJkYXRhL1RyYWNrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gJy4vQmFzZUNvbGxlY3Rpb24nO1xuaW1wb3J0IFRvbmFsRXZlbnQgZnJvbSAnLi4vZXZlbnRzL1RvbmFsRXZlbnQnO1xuXG5jbGFzcyBUcmFjayBleHRlbmRzIEJhc2VDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmFja3MsIHRpdGxlID0gdW5kZWZpbmVkLCB1dWlkID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKHRyYWNrcywgVG9uYWxFdmVudCwgdXVpZCk7XG5cbiAgICAgICAgdGhpcy5fdGl0bGUgPSB0aXRsZTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFRyYWNrOyJdfQ==
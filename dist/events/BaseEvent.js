'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseEvent = function () {
    function BaseEvent(time, value) {
        var dataClasses = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        (0, _classCallCheck3.default)(this, BaseEvent);

        this._dataClasses = dataClasses;

        this.time = time;
        this.value = value;
    }

    (0, _createClass3.default)(BaseEvent, [{
        key: 'parentUUID',
        get: function get() {
            return this._parentUUID;
        },
        set: function set(uuid) {
            (0, _assert2.default)(typeof uuid === 'string');
            this._parentUUID = uuid;
        }
    }, {
        key: 'time',
        set: function set(time) {
            (0, _assert2.default)(time !== undefined);
            (0, _assert2.default)(time instanceof _Time2.default);
            this._time = time;
        },
        get: function get() {
            return this._time;
        }
    }, {
        key: 'value',
        set: function set(value) {
            if (this._dataClasses.length > 0) {
                var classAllowed = false;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = (0, _getIterator3.default)(this._dataClasses), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var dc = _step.value;

                        if (value.constructor.name === dc.name) {
                            classAllowed = true;
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                (0, _assert2.default)(classAllowed, 'Invalid class: ' + value.constructor.name + ' - ' + ('Allowed: ' + this._dataClasses.map(function (cl) {
                    return cl.name;
                }).join(',')));
            }
            this._value = value;
        },
        get: function get() {
            return this._value;
        }
    }]);
    return BaseEvent;
}();

exports.default = BaseEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV2ZW50cy9CYXNlRXZlbnQuanMiXSwibmFtZXMiOlsiQmFzZUV2ZW50IiwidGltZSIsInZhbHVlIiwiZGF0YUNsYXNzZXMiLCJfZGF0YUNsYXNzZXMiLCJfcGFyZW50VVVJRCIsInV1aWQiLCJ1bmRlZmluZWQiLCJfdGltZSIsImxlbmd0aCIsImNsYXNzQWxsb3dlZCIsImRjIiwiY29uc3RydWN0b3IiLCJuYW1lIiwibWFwIiwiY2wiLCJqb2luIiwiX3ZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7SUFFTUEsUztBQUNGLHVCQUFZQyxJQUFaLEVBQWtCQyxLQUFsQixFQUEyQztBQUFBLFlBQWxCQyxXQUFrQix1RUFBSixFQUFJO0FBQUE7O0FBQ3ZDLGFBQUtDLFlBQUwsR0FBb0JELFdBQXBCOztBQUVBLGFBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNIOzs7OzRCQUVnQjtBQUNiLG1CQUFPLEtBQUtHLFdBQVo7QUFDSCxTOzBCQUVjQyxJLEVBQU07QUFDakIsa0NBQU8sT0FBT0EsSUFBUCxLQUFnQixRQUF2QjtBQUNBLGlCQUFLRCxXQUFMLEdBQW1CQyxJQUFuQjtBQUNIOzs7MEJBR1FMLEksRUFBTTtBQUNYLGtDQUFPQSxTQUFTTSxTQUFoQjtBQUNBLGtDQUFPTiw4QkFBUDtBQUNBLGlCQUFLTyxLQUFMLEdBQWFQLElBQWI7QUFDSCxTOzRCQUVVO0FBQ1AsbUJBQU8sS0FBS08sS0FBWjtBQUNIOzs7MEJBR1NOLEssRUFBTztBQUNiLGdCQUFJLEtBQUtFLFlBQUwsQ0FBa0JLLE1BQWxCLEdBQTJCLENBQS9CLEVBQWtDO0FBQzlCLG9CQUFJQyxlQUFlLEtBQW5CO0FBRDhCO0FBQUE7QUFBQTs7QUFBQTtBQUU5QixvRUFBZSxLQUFLTixZQUFwQiw0R0FBa0M7QUFBQSw0QkFBekJPLEVBQXlCOztBQUM5Qiw0QkFBSVQsTUFBTVUsV0FBTixDQUFrQkMsSUFBbEIsS0FBMkJGLEdBQUdFLElBQWxDLEVBQXdDO0FBQ3BDSCwyQ0FBZSxJQUFmO0FBQ0g7QUFDSjtBQU42QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQU85QixzQ0FBT0EsWUFBUCxFQUFxQixvQkFBa0JSLE1BQU1VLFdBQU4sQ0FBa0JDLElBQXBDLDBCQUNMLEtBQUtULFlBQUwsQ0FBa0JVLEdBQWxCLENBQXNCLFVBQUNDLEVBQUQsRUFBUTtBQUFFLDJCQUFPQSxHQUFHRixJQUFWO0FBQWlCLGlCQUFqRCxFQUFtREcsSUFBbkQsQ0FBd0QsR0FBeEQsQ0FESyxDQUFyQjtBQUVIO0FBQ0QsaUJBQUtDLE1BQUwsR0FBY2YsS0FBZDtBQUNILFM7NEJBRVc7QUFDUixtQkFBTyxLQUFLZSxNQUFaO0FBQ0g7Ozs7O2tCQUdVakIsUyIsImZpbGUiOiJldmVudHMvQmFzZUV2ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuXG5pbXBvcnQgVGltZSBmcm9tICcuLi9xdWFudGl0aWVzL1RpbWUnO1xuXG5jbGFzcyBCYXNlRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHRpbWUsIHZhbHVlLCBkYXRhQ2xhc3NlcyA9IFtdKSB7XG4gICAgICAgIHRoaXMuX2RhdGFDbGFzc2VzID0gZGF0YUNsYXNzZXM7XG5cbiAgICAgICAgdGhpcy50aW1lID0gdGltZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGdldCBwYXJlbnRVVUlEKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50VVVJRDtcbiAgICB9XG5cbiAgICBzZXQgcGFyZW50VVVJRCh1dWlkKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdXVpZCA9PT0gJ3N0cmluZycpO1xuICAgICAgICB0aGlzLl9wYXJlbnRVVUlEID0gdXVpZDtcbiAgICB9XG5cblxuICAgIHNldCB0aW1lKHRpbWUpIHtcbiAgICAgICAgYXNzZXJ0KHRpbWUgIT09IHVuZGVmaW5lZCk7XG4gICAgICAgIGFzc2VydCh0aW1lIGluc3RhbmNlb2YgVGltZSk7XG4gICAgICAgIHRoaXMuX3RpbWUgPSB0aW1lO1xuICAgIH1cblxuICAgIGdldCB0aW1lKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdGltZTtcbiAgICB9XG5cblxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5fZGF0YUNsYXNzZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV0IGNsYXNzQWxsb3dlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgZGMgb2YgdGhpcy5fZGF0YUNsYXNzZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUuY29uc3RydWN0b3IubmFtZSA9PT0gZGMubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGFzc0FsbG93ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFzc2VydChjbGFzc0FsbG93ZWQsIGBJbnZhbGlkIGNsYXNzOiAke3ZhbHVlLmNvbnN0cnVjdG9yLm5hbWV9IC0gYCArXG4gICAgICAgICAgICAgICAgYEFsbG93ZWQ6ICR7dGhpcy5fZGF0YUNsYXNzZXMubWFwKChjbCkgPT4geyByZXR1cm4gY2wubmFtZTsgfSkuam9pbignLCcpfWApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlRXZlbnQ7Il19
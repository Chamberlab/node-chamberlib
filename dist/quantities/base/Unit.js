'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Dimensions = require('./Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Unit = function () {
    function Unit() {
        var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unspecified';
        var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
        var dimension = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Dimensions2.default.DIMENSION_UNSPECIFIED;
        (0, _classCallCheck3.default)(this, Unit);

        (0, _assert2.default)(typeof title === 'string');
        this._title = title;

        (0, _assert2.default)(typeof suffix === 'string');
        this._suffix = suffix;

        (0, _assert2.default)(typeof dimension === 'number');
        this._dimension = dimension;

        (0, _assert2.default)(typeof ratio === 'number');
        this._ratio = ratio;
    }

    (0, _createClass3.default)(Unit, [{
        key: 'title',
        get: function get() {
            return this._title;
        }
    }, {
        key: 'suffix',
        get: function get() {
            return this._suffix;
        }
    }, {
        key: 'dimension',
        get: function get() {
            return this._dimension;
        }
    }, {
        key: 'ratio',
        get: function get() {
            return this._ratio;
        }
    }]);
    return Unit;
}();

exports.default = Unit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvYmFzZS9Vbml0LmpzIl0sIm5hbWVzIjpbIlVuaXQiLCJ0aXRsZSIsInN1ZmZpeCIsInJhdGlvIiwiZGltZW5zaW9uIiwiRElNRU5TSU9OX1VOU1BFQ0lGSUVEIiwiX3RpdGxlIiwiX3N1ZmZpeCIsIl9kaW1lbnNpb24iLCJfcmF0aW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLEk7QUFDRixvQkFBMkc7QUFBQSxZQUEvRkMsS0FBK0YsdUVBQXZGLGFBQXVGO0FBQUEsWUFBeEVDLE1BQXdFLHVFQUEvRCxFQUErRDtBQUFBLFlBQTNEQyxLQUEyRCx1RUFBbkQsR0FBbUQ7QUFBQSxZQUE5Q0MsU0FBOEMsdUVBQWxDLHFCQUFXQyxxQkFBdUI7QUFBQTs7QUFDdkcsOEJBQU8sT0FBT0osS0FBUCxLQUFpQixRQUF4QjtBQUNBLGFBQUtLLE1BQUwsR0FBY0wsS0FBZDs7QUFFQSw4QkFBTyxPQUFPQyxNQUFQLEtBQWtCLFFBQXpCO0FBQ0EsYUFBS0ssT0FBTCxHQUFlTCxNQUFmOztBQUVBLDhCQUFPLE9BQU9FLFNBQVAsS0FBcUIsUUFBNUI7QUFDQSxhQUFLSSxVQUFMLEdBQWtCSixTQUFsQjs7QUFFQSw4QkFBTyxPQUFPRCxLQUFQLEtBQWlCLFFBQXhCO0FBQ0EsYUFBS00sTUFBTCxHQUFjTixLQUFkO0FBQ0g7Ozs7NEJBR1c7QUFDUixtQkFBTyxLQUFLRyxNQUFaO0FBQ0g7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUtDLE9BQVo7QUFDSDs7OzRCQUVlO0FBQ1osbUJBQU8sS0FBS0MsVUFBWjtBQUNIOzs7NEJBRVc7QUFDUixtQkFBTyxLQUFLQyxNQUFaO0FBQ0g7Ozs7O2tCQUdVVCxJIiwiZmlsZSI6InF1YW50aXRpZXMvYmFzZS9Vbml0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IERpbWVuc2lvbnMgZnJvbSAnLi9EaW1lbnNpb25zJztcblxuY2xhc3MgVW5pdCB7XG4gICAgY29uc3RydWN0b3IodGl0bGUgPSAnVW5zcGVjaWZpZWQnLCBzdWZmaXggPSAnJywgcmF0aW8gPSAxLjAsIGRpbWVuc2lvbiA9IERpbWVuc2lvbnMuRElNRU5TSU9OX1VOU1BFQ0lGSUVEKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgdGhpcy5fdGl0bGUgPSB0aXRsZTtcblxuICAgICAgICBhc3NlcnQodHlwZW9mIHN1ZmZpeCA9PT0gJ3N0cmluZycpO1xuICAgICAgICB0aGlzLl9zdWZmaXggPSBzdWZmaXg7XG5cbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBkaW1lbnNpb24gPT09ICdudW1iZXInKTtcbiAgICAgICAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uO1xuXG4gICAgICAgIGFzc2VydCh0eXBlb2YgcmF0aW8gPT09ICdudW1iZXInKTtcbiAgICAgICAgdGhpcy5fcmF0aW8gPSByYXRpbztcbiAgICB9XG5cblxuICAgIGdldCB0aXRsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RpdGxlO1xuICAgIH1cblxuICAgIGdldCBzdWZmaXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWZmaXg7XG4gICAgfVxuXG4gICAgZ2V0IGRpbWVuc2lvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RpbWVuc2lvbjtcbiAgICB9XG5cbiAgICBnZXQgcmF0aW8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yYXRpbztcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFVuaXQ7Il19
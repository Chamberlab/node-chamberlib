'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Dimensions = require('./Dimensions');

var _Dimensions2 = _interopRequireDefault(_Dimensions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Unit = function () {
    function Unit() {
        var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Unspecified';
        var suffix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var ratio = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1.0;
        var dimension = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _Dimensions2.default.DIMENSION_UNSPECIFIED;

        _classCallCheck(this, Unit);

        (0, _assert2.default)(typeof title === 'string');
        this._title = title;

        (0, _assert2.default)(typeof suffix === 'string');
        this._suffix = suffix;

        (0, _assert2.default)(typeof dimension === 'number');
        this._dimension = dimension;

        (0, _assert2.default)(typeof ratio === 'number');
        this._ratio = ratio;
    }

    _createClass(Unit, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInF1YW50aXRpZXMvYmFzZS9Vbml0LmpzIl0sIm5hbWVzIjpbIlVuaXQiLCJ0aXRsZSIsInN1ZmZpeCIsInJhdGlvIiwiZGltZW5zaW9uIiwiRElNRU5TSU9OX1VOU1BFQ0lGSUVEIiwiX3RpdGxlIiwiX3N1ZmZpeCIsIl9kaW1lbnNpb24iLCJfcmF0aW8iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7SUFFTUEsSTtBQUNGLG9CQUEyRztBQUFBLFlBQS9GQyxLQUErRix1RUFBdkYsYUFBdUY7QUFBQSxZQUF4RUMsTUFBd0UsdUVBQS9ELEVBQStEO0FBQUEsWUFBM0RDLEtBQTJELHVFQUFuRCxHQUFtRDtBQUFBLFlBQTlDQyxTQUE4Qyx1RUFBbEMscUJBQVdDLHFCQUF1Qjs7QUFBQTs7QUFDdkcsOEJBQU8sT0FBT0osS0FBUCxLQUFpQixRQUF4QjtBQUNBLGFBQUtLLE1BQUwsR0FBY0wsS0FBZDs7QUFFQSw4QkFBTyxPQUFPQyxNQUFQLEtBQWtCLFFBQXpCO0FBQ0EsYUFBS0ssT0FBTCxHQUFlTCxNQUFmOztBQUVBLDhCQUFPLE9BQU9FLFNBQVAsS0FBcUIsUUFBNUI7QUFDQSxhQUFLSSxVQUFMLEdBQWtCSixTQUFsQjs7QUFFQSw4QkFBTyxPQUFPRCxLQUFQLEtBQWlCLFFBQXhCO0FBQ0EsYUFBS00sTUFBTCxHQUFjTixLQUFkO0FBQ0g7Ozs7NEJBR1c7QUFDUixtQkFBTyxLQUFLRyxNQUFaO0FBQ0g7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUtDLE9BQVo7QUFDSDs7OzRCQUVlO0FBQ1osbUJBQU8sS0FBS0MsVUFBWjtBQUNIOzs7NEJBRVc7QUFDUixtQkFBTyxLQUFLQyxNQUFaO0FBQ0g7Ozs7OztrQkFHVVQsSSIsImZpbGUiOiJxdWFudGl0aWVzL2Jhc2UvVW5pdC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBEaW1lbnNpb25zIGZyb20gJy4vRGltZW5zaW9ucyc7XG5cbmNsYXNzIFVuaXQge1xuICAgIGNvbnN0cnVjdG9yKHRpdGxlID0gJ1Vuc3BlY2lmaWVkJywgc3VmZml4ID0gJycsIHJhdGlvID0gMS4wLCBkaW1lbnNpb24gPSBEaW1lbnNpb25zLkRJTUVOU0lPTl9VTlNQRUNJRklFRCkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHRpdGxlID09PSAnc3RyaW5nJyk7XG4gICAgICAgIHRoaXMuX3RpdGxlID0gdGl0bGU7XG5cbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBzdWZmaXggPT09ICdzdHJpbmcnKTtcbiAgICAgICAgdGhpcy5fc3VmZml4ID0gc3VmZml4O1xuXG4gICAgICAgIGFzc2VydCh0eXBlb2YgZGltZW5zaW9uID09PSAnbnVtYmVyJyk7XG4gICAgICAgIHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvbjtcblxuICAgICAgICBhc3NlcnQodHlwZW9mIHJhdGlvID09PSAnbnVtYmVyJyk7XG4gICAgICAgIHRoaXMuX3JhdGlvID0gcmF0aW87XG4gICAgfVxuXG5cbiAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aXRsZTtcbiAgICB9XG5cbiAgICBnZXQgc3VmZml4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3VmZml4O1xuICAgIH1cblxuICAgIGdldCBkaW1lbnNpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaW1lbnNpb247XG4gICAgfVxuXG4gICAgZ2V0IHJhdGlvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcmF0aW87XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVbml0OyJdfQ==
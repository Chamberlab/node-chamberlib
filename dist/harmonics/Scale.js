'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scale = function () {
    function Scale(key, name) {
        _classCallCheck(this, Scale);

        this.name = name;
        this.key = key;
    }

    _createClass(Scale, [{
        key: 'key',
        get: function get() {
            return this._key;
        },
        set: function set(key) {
            (0, _assert2.default)(typeof key === 'string', 'Key name should be string, is ' + (typeof key === 'undefined' ? 'undefined' : _typeof(key)));

            this._key = key;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            (0, _assert2.default)(typeof name === 'string', 'Scale name should be string, is ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));

            this._name = name;
        }
    }, {
        key: 'notes',
        get: function get() {
            return tonal.scale(this.key + ' ' + this.name).map(function (name) {
                return new _Note2.default(name);
            });
        }
    }]);

    return Scale;
}();

exports.default = Scale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9TY2FsZS5qcyJdLCJuYW1lcyI6WyJ0b25hbCIsIlNjYWxlIiwia2V5IiwibmFtZSIsIl9rZXkiLCJfbmFtZSIsInNjYWxlIiwibWFwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsSzs7QUFFWjs7Ozs7Ozs7OztJQUVNQyxLO0FBQ0YsbUJBQVlDLEdBQVosRUFBaUJDLElBQWpCLEVBQXVCO0FBQUE7O0FBQ25CLGFBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNBLGFBQUtELEdBQUwsR0FBV0EsR0FBWDtBQUNIOzs7OzRCQUdTO0FBQ04sbUJBQU8sS0FBS0UsSUFBWjtBQUNILFM7MEJBRU9GLEcsRUFBSztBQUNULGtDQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0Qiw2Q0FBd0VBLEdBQXhFLHlDQUF3RUEsR0FBeEU7O0FBRUEsaUJBQUtFLElBQUwsR0FBWUYsR0FBWjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLRyxLQUFaO0FBQ0gsUzswQkFFUUYsSSxFQUFNO0FBQ1gsa0NBQU8sT0FBT0EsSUFBUCxLQUFnQixRQUF2QiwrQ0FBMkVBLElBQTNFLHlDQUEyRUEsSUFBM0U7O0FBRUEsaUJBQUtFLEtBQUwsR0FBYUYsSUFBYjtBQUNIOzs7NEJBR1c7QUFDUixtQkFBT0gsTUFBTU0sS0FBTixDQUFlLEtBQUtKLEdBQXBCLFNBQTJCLEtBQUtDLElBQWhDLEVBQXdDSSxHQUF4QyxDQUE0QyxVQUFVSixJQUFWLEVBQWdCO0FBQy9ELHVCQUFPLG1CQUFTQSxJQUFULENBQVA7QUFDSCxhQUZNLENBQVA7QUFHSDs7Ozs7O2tCQUdVRixLIiwiZmlsZSI6Imhhcm1vbmljcy9TY2FsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCAqIGFzIHRvbmFsIGZyb20gJ3RvbmFsJztcblxuaW1wb3J0IE5vdGUgZnJvbSAnLi9Ob3RlJztcblxuY2xhc3MgU2NhbGUge1xuICAgIGNvbnN0cnVjdG9yKGtleSwgbmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmtleSA9IGtleTtcbiAgICB9XG5cblxuICAgIGdldCBrZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXk7XG4gICAgfVxuXG4gICAgc2V0IGtleShrZXkpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnLCBgS2V5IG5hbWUgc2hvdWxkIGJlIHN0cmluZywgaXMgJHt0eXBlb2Yga2V5fWApO1xuXG4gICAgICAgIHRoaXMuX2tleSA9IGtleTtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX25hbWU7XG4gICAgfVxuXG4gICAgc2V0IG5hbWUobmFtZSkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnLCBgU2NhbGUgbmFtZSBzaG91bGQgYmUgc3RyaW5nLCBpcyAke3R5cGVvZiBuYW1lfWApO1xuXG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgIH1cblxuXG4gICAgZ2V0IG5vdGVzKCkge1xuICAgICAgICByZXR1cm4gdG9uYWwuc2NhbGUoYCR7dGhpcy5rZXl9ICR7dGhpcy5uYW1lfWApLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBOb3RlKG5hbWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNjYWxlOyJdfQ==
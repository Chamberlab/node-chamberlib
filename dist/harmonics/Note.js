'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _Frequency = require('../quantities/Frequency');

var _Frequency2 = _interopRequireDefault(_Frequency);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Note = function () {
    function Note() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'C';
        var octave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        (0, _classCallCheck3.default)(this, Note);

        if (key && octave) {
            this.fromString(key);
            this.octave = octave;
        } else {
            this.fromString(key);
        }
    }

    //
    //
    // Conversion

    (0, _createClass3.default)(Note, [{
        key: 'toString',
        value: function toString() {
            return this.key + this.octave.toString();
        }
    }, {
        key: 'fromString',
        value: function fromString(input) {
            (0, _assert2.default)(typeof input === 'string');

            var _self = this,
                regex = /^[a-z,A-Z,#]+([0-9]+)$/,
                res = regex.exec(input);

            if (Array.isArray(res)) {
                if (res.length >= 2) {
                    _self.octave = parseInt(res[1]);
                    _self.key = res[0].replace(/[0-9]+$/i, '');
                } else {
                    _self.octave = 4;
                }

                if (res.length === 1) {
                    _self.key = res[0];
                }
            }

            return this;
        }
    }, {
        key: 'fromRandom',
        value: function fromRandom() {
            var note = tonal.note.fromMidi(Math.round(Math.floor() * 128));
            this.fromString(note);

            return this;
        }
    }, {
        key: 'toMidi',
        value: function toMidi() {
            return tonal.note.midi(this.toString());
        }
    }, {
        key: 'fromMidi',
        value: function fromMidi(value) {
            (0, _assert2.default)(typeof value === 'number');
            (0, _assert2.default)(value >= 0 && value < 128);

            var res = tonal.note.fromMidi(value);
            this.fromString(res);

            return this;
        }
    }, {
        key: 'toFreq',
        value: function toFreq() {
            var freq = tonal.note.freq(this.toString());
            return new _Frequency2.default(freq, 'hz');
        }

        //
        //
        // Getters / Setters

    }, {
        key: 'key',
        get: function get() {
            return this._key;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'string', 'Invalid key: ' + (typeof key === 'undefined' ? 'undefined' : (0, _typeof3.default)(key)));
            this._key = val;
        }
    }, {
        key: 'octave',
        get: function get() {
            return this._octave;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'number', 'Invalid octave: ' + (typeof octave === 'undefined' ? 'undefined' : (0, _typeof3.default)(octave)));
            this._octave = val;
        }
    }]);
    return Note;
}();

exports.default = Note;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9Ob3RlLmpzIl0sIm5hbWVzIjpbInRvbmFsIiwiTm90ZSIsImtleSIsIm9jdGF2ZSIsInVuZGVmaW5lZCIsImZyb21TdHJpbmciLCJ0b1N0cmluZyIsImlucHV0IiwiX3NlbGYiLCJyZWdleCIsInJlcyIsImV4ZWMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJwYXJzZUludCIsInJlcGxhY2UiLCJub3RlIiwiZnJvbU1pZGkiLCJNYXRoIiwicm91bmQiLCJmbG9vciIsIm1pZGkiLCJ2YWx1ZSIsImZyZXEiLCJfa2V5IiwidmFsIiwiX29jdGF2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsSzs7QUFFWjs7Ozs7Ozs7SUFFTUMsSTtBQUNGLG9CQUEyQztBQUFBLFlBQS9CQyxHQUErQix1RUFBekIsR0FBeUI7QUFBQSxZQUFwQkMsTUFBb0IsdUVBQVhDLFNBQVc7QUFBQTs7QUFDdkMsWUFBSUYsT0FBT0MsTUFBWCxFQUFtQjtBQUNmLGlCQUFLRSxVQUFMLENBQWdCSCxHQUFoQjtBQUNBLGlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxTQUhELE1BR087QUFDSCxpQkFBS0UsVUFBTCxDQUFnQkgsR0FBaEI7QUFDSDtBQUNKOztBQUdEO0FBQ0E7QUFDQTs7OzttQ0FFVztBQUNQLG1CQUFPLEtBQUtBLEdBQUwsR0FBVyxLQUFLQyxNQUFMLENBQVlHLFFBQVosRUFBbEI7QUFDSDs7O21DQUVVQyxLLEVBQU87QUFDZCxrQ0FBTyxPQUFPQSxLQUFQLEtBQWlCLFFBQXhCOztBQUVBLGdCQUFJQyxRQUFRLElBQVo7QUFBQSxnQkFDSUMsUUFBUSx3QkFEWjtBQUFBLGdCQUVJQyxNQUFNRCxNQUFNRSxJQUFOLENBQVdKLEtBQVgsQ0FGVjs7QUFJQSxnQkFBSUssTUFBTUMsT0FBTixDQUFjSCxHQUFkLENBQUosRUFBd0I7QUFDcEIsb0JBQUlBLElBQUlJLE1BQUosSUFBYyxDQUFsQixFQUFxQjtBQUNqQk4sMEJBQU1MLE1BQU4sR0FBZVksU0FBU0wsSUFBSSxDQUFKLENBQVQsQ0FBZjtBQUNBRiwwQkFBTU4sR0FBTixHQUFZUSxJQUFJLENBQUosRUFBT00sT0FBUCxDQUFlLFVBQWYsRUFBMkIsRUFBM0IsQ0FBWjtBQUNILGlCQUhELE1BR087QUFDSFIsMEJBQU1MLE1BQU4sR0FBZSxDQUFmO0FBQ0g7O0FBRUQsb0JBQUlPLElBQUlJLE1BQUosS0FBZSxDQUFuQixFQUFzQjtBQUNsQk4sMEJBQU1OLEdBQU4sR0FBWVEsSUFBSSxDQUFKLENBQVo7QUFDSDtBQUNKOztBQUVELG1CQUFPLElBQVA7QUFDSDs7O3FDQUdZO0FBQ1QsZ0JBQUlPLE9BQU9qQixNQUFNaUIsSUFBTixDQUFXQyxRQUFYLENBQW9CQyxLQUFLQyxLQUFMLENBQVdELEtBQUtFLEtBQUwsS0FBZSxHQUExQixDQUFwQixDQUFYO0FBQ0EsaUJBQUtoQixVQUFMLENBQWdCWSxJQUFoQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FHUTtBQUNMLG1CQUFPakIsTUFBTWlCLElBQU4sQ0FBV0ssSUFBWCxDQUFnQixLQUFLaEIsUUFBTCxFQUFoQixDQUFQO0FBQ0g7OztpQ0FFUWlCLEssRUFBTztBQUNaLGtDQUFPLE9BQU9BLEtBQVAsS0FBaUIsUUFBeEI7QUFDQSxrQ0FBT0EsU0FBUyxDQUFULElBQWNBLFFBQVEsR0FBN0I7O0FBRUEsZ0JBQUliLE1BQU1WLE1BQU1pQixJQUFOLENBQVdDLFFBQVgsQ0FBb0JLLEtBQXBCLENBQVY7QUFDQSxpQkFBS2xCLFVBQUwsQ0FBZ0JLLEdBQWhCOztBQUVBLG1CQUFPLElBQVA7QUFDSDs7O2lDQUdRO0FBQ0wsZ0JBQUljLE9BQU94QixNQUFNaUIsSUFBTixDQUFXTyxJQUFYLENBQWdCLEtBQUtsQixRQUFMLEVBQWhCLENBQVg7QUFDQSxtQkFBTyx3QkFBY2tCLElBQWQsRUFBb0IsSUFBcEIsQ0FBUDtBQUNIOztBQUdEO0FBQ0E7QUFDQTs7Ozs0QkFFVTtBQUNOLG1CQUFPLEtBQUtDLElBQVo7QUFDSCxTOzBCQUVPQyxHLEVBQUs7QUFDVCxrQ0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEIsNEJBQXVEeEIsR0FBdkQsdURBQXVEQSxHQUF2RDtBQUNBLGlCQUFLdUIsSUFBTCxHQUFZQyxHQUFaO0FBQ0g7Ozs0QkFHWTtBQUNULG1CQUFPLEtBQUtDLE9BQVo7QUFDSCxTOzBCQUVVRCxHLEVBQUs7QUFDWixrQ0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEIsK0JBQTBEdkIsTUFBMUQsdURBQTBEQSxNQUExRDtBQUNBLGlCQUFLd0IsT0FBTCxHQUFlRCxHQUFmO0FBQ0g7Ozs7O2tCQUdVekIsSSIsImZpbGUiOiJoYXJtb25pY3MvTm90ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCAqIGFzIHRvbmFsIGZyb20gJ3RvbmFsJztcblxuaW1wb3J0IEZyZXF1ZW5jeSBmcm9tICcuLi9xdWFudGl0aWVzL0ZyZXF1ZW5jeSc7XG5cbmNsYXNzIE5vdGUge1xuICAgIGNvbnN0cnVjdG9yKGtleSA9ICdDJywgb2N0YXZlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChrZXkgJiYgb2N0YXZlKSB7XG4gICAgICAgICAgICB0aGlzLmZyb21TdHJpbmcoa2V5KTtcbiAgICAgICAgICAgIHRoaXMub2N0YXZlID0gb2N0YXZlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcm9tU3RyaW5nKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBDb252ZXJzaW9uXG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5ICsgdGhpcy5vY3RhdmUudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBmcm9tU3RyaW5nKGlucHV0KSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKTtcblxuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzLFxuICAgICAgICAgICAgcmVnZXggPSAvXlthLXosQS1aLCNdKyhbMC05XSspJC8sXG4gICAgICAgICAgICByZXMgPSByZWdleC5leGVjKGlucHV0KTtcblxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyZXMpKSB7XG4gICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYub2N0YXZlID0gcGFyc2VJbnQocmVzWzFdKTtcbiAgICAgICAgICAgICAgICBfc2VsZi5rZXkgPSByZXNbMF0ucmVwbGFjZSgvWzAtOV0rJC9pLCAnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9zZWxmLm9jdGF2ZSA9IDQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgX3NlbGYua2V5ID0gcmVzWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBmcm9tUmFuZG9tKCkge1xuICAgICAgICBsZXQgbm90ZSA9IHRvbmFsLm5vdGUuZnJvbU1pZGkoTWF0aC5yb3VuZChNYXRoLmZsb29yKCkgKiAxMjgpKTtcbiAgICAgICAgdGhpcy5mcm9tU3RyaW5nKG5vdGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgdG9NaWRpKCkge1xuICAgICAgICByZXR1cm4gdG9uYWwubm90ZS5taWRpKHRoaXMudG9TdHJpbmcoKSk7XG4gICAgfVxuXG4gICAgZnJvbU1pZGkodmFsdWUpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpO1xuICAgICAgICBhc3NlcnQodmFsdWUgPj0gMCAmJiB2YWx1ZSA8IDEyOCk7XG5cbiAgICAgICAgbGV0IHJlcyA9IHRvbmFsLm5vdGUuZnJvbU1pZGkodmFsdWUpO1xuICAgICAgICB0aGlzLmZyb21TdHJpbmcocmVzKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cblxuICAgIHRvRnJlcSgpIHtcbiAgICAgICAgbGV0IGZyZXEgPSB0b25hbC5ub3RlLmZyZXEodGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmVxdWVuY3koZnJlcSwgJ2h6Jyk7XG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gR2V0dGVycyAvIFNldHRlcnNcblxuICAgIGdldCBrZXkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9rZXk7XG4gICAgfVxuXG4gICAgc2V0IGtleSh2YWwpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnLCBgSW52YWxpZCBrZXk6ICR7dHlwZW9mIGtleX1gKTtcbiAgICAgICAgdGhpcy5fa2V5ID0gdmFsO1xuICAgIH1cblxuXG4gICAgZ2V0IG9jdGF2ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX29jdGF2ZTtcbiAgICB9XG5cbiAgICBzZXQgb2N0YXZlKHZhbCkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbCA9PT0gJ251bWJlcicsIGBJbnZhbGlkIG9jdGF2ZTogJHt0eXBlb2Ygb2N0YXZlfWApO1xuICAgICAgICB0aGlzLl9vY3RhdmUgPSB2YWw7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOb3RlOyJdfQ==
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
            return this.key + (this.octave ? this.octave.toString() : '');
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
            } else {
                _self.key = input;
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
            var str = this.toString();
            return tonal.note.midi(str);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9Ob3RlLmpzIl0sIm5hbWVzIjpbInRvbmFsIiwiTm90ZSIsImtleSIsIm9jdGF2ZSIsInVuZGVmaW5lZCIsImZyb21TdHJpbmciLCJ0b1N0cmluZyIsImlucHV0IiwiX3NlbGYiLCJyZWdleCIsInJlcyIsImV4ZWMiLCJBcnJheSIsImlzQXJyYXkiLCJsZW5ndGgiLCJwYXJzZUludCIsInJlcGxhY2UiLCJub3RlIiwiZnJvbU1pZGkiLCJNYXRoIiwicm91bmQiLCJmbG9vciIsInN0ciIsIm1pZGkiLCJ2YWx1ZSIsImZyZXEiLCJfa2V5IiwidmFsIiwiX29jdGF2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsSzs7QUFFWjs7Ozs7Ozs7SUFFTUMsSTtBQUNGLG9CQUEyQztBQUFBLFlBQS9CQyxHQUErQix1RUFBekIsR0FBeUI7QUFBQSxZQUFwQkMsTUFBb0IsdUVBQVhDLFNBQVc7QUFBQTs7QUFDdkMsWUFBSUYsT0FBT0MsTUFBWCxFQUFtQjtBQUNmLGlCQUFLRSxVQUFMLENBQWdCSCxHQUFoQjtBQUNBLGlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxTQUhELE1BR087QUFDSCxpQkFBS0UsVUFBTCxDQUFnQkgsR0FBaEI7QUFDSDtBQUNKOztBQUdEO0FBQ0E7QUFDQTs7OzttQ0FFVztBQUNQLG1CQUFPLEtBQUtBLEdBQUwsSUFBWSxLQUFLQyxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZRyxRQUFaLEVBQWQsR0FBdUMsRUFBbkQsQ0FBUDtBQUNIOzs7bUNBRVVDLEssRUFBTztBQUNkLGtDQUFPLE9BQU9BLEtBQVAsS0FBaUIsUUFBeEI7O0FBRUEsZ0JBQUlDLFFBQVEsSUFBWjtBQUFBLGdCQUNJQyxRQUFRLHdCQURaO0FBQUEsZ0JBRUlDLE1BQU1ELE1BQU1FLElBQU4sQ0FBV0osS0FBWCxDQUZWOztBQUlBLGdCQUFJSyxNQUFNQyxPQUFOLENBQWNILEdBQWQsQ0FBSixFQUF3QjtBQUNwQixvQkFBSUEsSUFBSUksTUFBSixJQUFjLENBQWxCLEVBQXFCO0FBQ2pCTiwwQkFBTUwsTUFBTixHQUFlWSxTQUFTTCxJQUFJLENBQUosQ0FBVCxDQUFmO0FBQ0FGLDBCQUFNTixHQUFOLEdBQVlRLElBQUksQ0FBSixFQUFPTSxPQUFQLENBQWUsVUFBZixFQUEyQixFQUEzQixDQUFaO0FBQ0gsaUJBSEQsTUFHTztBQUNIUiwwQkFBTUwsTUFBTixHQUFlLENBQWY7QUFDSDs7QUFFRCxvQkFBSU8sSUFBSUksTUFBSixLQUFlLENBQW5CLEVBQXNCO0FBQ2xCTiwwQkFBTU4sR0FBTixHQUFZUSxJQUFJLENBQUosQ0FBWjtBQUNIO0FBQ0osYUFYRCxNQVdPO0FBQ0hGLHNCQUFNTixHQUFOLEdBQVlLLEtBQVo7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7OztxQ0FHWTtBQUNULGdCQUFJVSxPQUFPakIsTUFBTWlCLElBQU4sQ0FBV0MsUUFBWCxDQUFvQkMsS0FBS0MsS0FBTCxDQUFXRCxLQUFLRSxLQUFMLEtBQWUsR0FBMUIsQ0FBcEIsQ0FBWDtBQUNBLGlCQUFLaEIsVUFBTCxDQUFnQlksSUFBaEI7O0FBRUEsbUJBQU8sSUFBUDtBQUNIOzs7aUNBR1E7QUFDTCxnQkFBTUssTUFBTSxLQUFLaEIsUUFBTCxFQUFaO0FBQ0EsbUJBQU9OLE1BQU1pQixJQUFOLENBQVdNLElBQVgsQ0FBZ0JELEdBQWhCLENBQVA7QUFDSDs7O2lDQUVRRSxLLEVBQU87QUFDWixrQ0FBTyxPQUFPQSxLQUFQLEtBQWlCLFFBQXhCO0FBQ0Esa0NBQU9BLFNBQVMsQ0FBVCxJQUFjQSxRQUFRLEdBQTdCOztBQUVBLGdCQUFJZCxNQUFNVixNQUFNaUIsSUFBTixDQUFXQyxRQUFYLENBQW9CTSxLQUFwQixDQUFWO0FBQ0EsaUJBQUtuQixVQUFMLENBQWdCSyxHQUFoQjs7QUFFQSxtQkFBTyxJQUFQO0FBQ0g7OztpQ0FHUTtBQUNMLGdCQUFJZSxPQUFPekIsTUFBTWlCLElBQU4sQ0FBV1EsSUFBWCxDQUFnQixLQUFLbkIsUUFBTCxFQUFoQixDQUFYO0FBQ0EsbUJBQU8sd0JBQWNtQixJQUFkLEVBQW9CLElBQXBCLENBQVA7QUFDSDs7QUFHRDtBQUNBO0FBQ0E7Ozs7NEJBRVU7QUFDTixtQkFBTyxLQUFLQyxJQUFaO0FBQ0gsUzswQkFFT0MsRyxFQUFLO0FBQ1Qsa0NBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQXRCLDRCQUF1RHpCLEdBQXZELHVEQUF1REEsR0FBdkQ7QUFDQSxpQkFBS3dCLElBQUwsR0FBWUMsR0FBWjtBQUNIOzs7NEJBR1k7QUFDVCxtQkFBTyxLQUFLQyxPQUFaO0FBQ0gsUzswQkFFVUQsRyxFQUFLO0FBQ1osa0NBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQXRCLCtCQUEwRHhCLE1BQTFELHVEQUEwREEsTUFBMUQ7QUFDQSxpQkFBS3lCLE9BQUwsR0FBZUQsR0FBZjtBQUNIOzs7OztrQkFHVTFCLEkiLCJmaWxlIjoiaGFybW9uaWNzL05vdGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgKiBhcyB0b25hbCBmcm9tICd0b25hbCc7XG5cbmltcG9ydCBGcmVxdWVuY3kgZnJvbSAnLi4vcXVhbnRpdGllcy9GcmVxdWVuY3knO1xuXG5jbGFzcyBOb3RlIHtcbiAgICBjb25zdHJ1Y3RvcihrZXkgPSAnQycsIG9jdGF2ZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoa2V5ICYmIG9jdGF2ZSkge1xuICAgICAgICAgICAgdGhpcy5mcm9tU3RyaW5nKGtleSk7XG4gICAgICAgICAgICB0aGlzLm9jdGF2ZSA9IG9jdGF2ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbVN0cmluZyhrZXkpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gQ29udmVyc2lvblxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleSArICh0aGlzLm9jdGF2ZSA/IHRoaXMub2N0YXZlLnRvU3RyaW5nKCkgOiAnJyk7XG4gICAgfVxuXG4gICAgZnJvbVN0cmluZyhpbnB1dCkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJyk7XG5cbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHJlZ2V4ID0gL15bYS16LEEtWiwjXSsoWzAtOV0rKSQvLFxuICAgICAgICAgICAgcmVzID0gcmVnZXguZXhlYyhpbnB1dCk7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocmVzKSkge1xuICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPj0gMikge1xuICAgICAgICAgICAgICAgIF9zZWxmLm9jdGF2ZSA9IHBhcnNlSW50KHJlc1sxXSk7XG4gICAgICAgICAgICAgICAgX3NlbGYua2V5ID0gcmVzWzBdLnJlcGxhY2UoL1swLTldKyQvaSwgJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5vY3RhdmUgPSA0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIF9zZWxmLmtleSA9IHJlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9zZWxmLmtleSA9IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBmcm9tUmFuZG9tKCkge1xuICAgICAgICBsZXQgbm90ZSA9IHRvbmFsLm5vdGUuZnJvbU1pZGkoTWF0aC5yb3VuZChNYXRoLmZsb29yKCkgKiAxMjgpKTtcbiAgICAgICAgdGhpcy5mcm9tU3RyaW5nKG5vdGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgdG9NaWRpKCkge1xuICAgICAgICBjb25zdCBzdHIgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiB0b25hbC5ub3RlLm1pZGkoc3RyKTtcbiAgICB9XG5cbiAgICBmcm9tTWlkaSh2YWx1ZSkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyk7XG4gICAgICAgIGFzc2VydCh2YWx1ZSA+PSAwICYmIHZhbHVlIDwgMTI4KTtcblxuICAgICAgICBsZXQgcmVzID0gdG9uYWwubm90ZS5mcm9tTWlkaSh2YWx1ZSk7XG4gICAgICAgIHRoaXMuZnJvbVN0cmluZyhyZXMpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgdG9GcmVxKCkge1xuICAgICAgICBsZXQgZnJlcSA9IHRvbmFsLm5vdGUuZnJlcSh0aGlzLnRvU3RyaW5nKCkpO1xuICAgICAgICByZXR1cm4gbmV3IEZyZXF1ZW5jeShmcmVxLCAnaHonKTtcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBHZXR0ZXJzIC8gU2V0dGVyc1xuXG4gICAgZ2V0IGtleSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICB9XG5cbiAgICBzZXQga2V5KHZhbCkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycsIGBJbnZhbGlkIGtleTogJHt0eXBlb2Yga2V5fWApO1xuICAgICAgICB0aGlzLl9rZXkgPSB2YWw7XG4gICAgfVxuXG5cbiAgICBnZXQgb2N0YXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2N0YXZlO1xuICAgIH1cblxuICAgIHNldCBvY3RhdmUodmFsKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdmFsID09PSAnbnVtYmVyJywgYEludmFsaWQgb2N0YXZlOiAke3R5cGVvZiBvY3RhdmV9YCk7XG4gICAgICAgIHRoaXMuX29jdGF2ZSA9IHZhbDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5vdGU7Il19
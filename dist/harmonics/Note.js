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

var _tonalTranspose = require('tonal-transpose');

var tt = _interopRequireWildcard(_tonalTranspose);

var _tonalNote = require('tonal-note');

var tn = _interopRequireWildcard(_tonalNote);

var _Interval = require('./Interval');

var _Interval2 = _interopRequireDefault(_Interval);

var _Frequency = require('../quantities/Frequency');

var _Frequency2 = _interopRequireDefault(_Frequency);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Note = function () {
    function Note() {
        var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'C';
        var octave = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        _classCallCheck(this, Note);

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

    _createClass(Note, [{
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
                    _self.key = res[0].replace(/[0-9]+$/, '');
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
            (0, _assert2.default)(typeof this.octave === 'number', 'Octave not defined');

            var str = this.toString();
            return tonal.note.midi(str);
        }
    }, {
        key: 'fromMidi',
        value: function fromMidi(value) {
            (0, _assert2.default)(typeof value === 'number', 'Midi value must be number, is ' + (typeof value === 'undefined' ? 'undefined' : _typeof(value)));
            (0, _assert2.default)(value >= 0 && value < 128, 'Midi value must be 0-128, is ' + value);

            var res = tonal.note.fromMidi(value);
            this.fromString(res);

            return this;
        }
    }, {
        key: 'toFreq',
        value: function toFreq() {
            (0, _assert2.default)(typeof this.octave === 'number', 'Octave not defined');

            var freq = tonal.note.freq(this.toString());
            return new _Frequency2.default(freq, 'hz');
        }
    }, {
        key: 'transpose',
        value: function transpose(interval) {
            var simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            (0, _assert2.default)(interval instanceof _Interval2.default, 'Invalid interval of type ' + (typeof interval === 'undefined' ? 'undefined' : _typeof(interval)));

            var newval = tt.transpose(this.toString(), interval.toString());

            if (simplify) {
                newval = tn.simplify(newval);
            }

            this.fromString(newval);
        }
    }, {
        key: 'transposeFifths',
        value: function transposeFifths() {
            var count = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
            var simplify = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            (0, _assert2.default)(typeof count === 'number', 'Fifths count must be number, is ' + (typeof count === 'undefined' ? 'undefined' : _typeof(count)));

            var newval = tt.trFifths(this.toString(), count);

            if (simplify) {
                newval = tn.simplify(newval);
            }

            this.fromString(newval);
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
            (0, _assert2.default)(typeof val === 'string', 'Key value must be string, is ' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)));

            this._key = val;
        }
    }, {
        key: 'octave',
        get: function get() {
            return this._octave;
        },
        set: function set(val) {
            (0, _assert2.default)(typeof val === 'number', 'Octave value must be number, is ' + (typeof val === 'undefined' ? 'undefined' : _typeof(val)));

            this._octave = val;
        }
    }]);

    return Note;
}();

exports.default = Note;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9Ob3RlLmpzIl0sIm5hbWVzIjpbInRvbmFsIiwidHQiLCJ0biIsIk5vdGUiLCJrZXkiLCJvY3RhdmUiLCJ1bmRlZmluZWQiLCJmcm9tU3RyaW5nIiwidG9TdHJpbmciLCJpbnB1dCIsIl9zZWxmIiwicmVnZXgiLCJyZXMiLCJleGVjIiwiQXJyYXkiLCJpc0FycmF5IiwibGVuZ3RoIiwicGFyc2VJbnQiLCJyZXBsYWNlIiwibm90ZSIsImZyb21NaWRpIiwiTWF0aCIsInJvdW5kIiwiZmxvb3IiLCJzdHIiLCJtaWRpIiwidmFsdWUiLCJmcmVxIiwiaW50ZXJ2YWwiLCJzaW1wbGlmeSIsIm5ld3ZhbCIsInRyYW5zcG9zZSIsImNvdW50IiwidHJGaWZ0aHMiLCJfa2V5IiwidmFsIiwiX29jdGF2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7O0lBQVlBLEs7O0FBQ1o7O0lBQVlDLEU7O0FBQ1o7O0lBQVlDLEU7O0FBRVo7Ozs7QUFDQTs7Ozs7Ozs7OztJQUVNQyxJO0FBQ0Ysb0JBQTJDO0FBQUEsWUFBL0JDLEdBQStCLHVFQUF6QixHQUF5QjtBQUFBLFlBQXBCQyxNQUFvQix1RUFBWEMsU0FBVzs7QUFBQTs7QUFDdkMsWUFBSUYsT0FBT0MsTUFBWCxFQUFtQjtBQUNmLGlCQUFLRSxVQUFMLENBQWdCSCxHQUFoQjtBQUNBLGlCQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFDSCxTQUhELE1BR087QUFDSCxpQkFBS0UsVUFBTCxDQUFnQkgsR0FBaEI7QUFDSDtBQUNKOztBQUdEO0FBQ0E7QUFDQTs7OzttQ0FFVztBQUNQLG1CQUFPLEtBQUtBLEdBQUwsSUFBWSxLQUFLQyxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZRyxRQUFaLEVBQWQsR0FBdUMsRUFBbkQsQ0FBUDtBQUNIOzs7bUNBRVVDLEssRUFBTztBQUNkLGtDQUFPLE9BQU9BLEtBQVAsS0FBaUIsUUFBeEI7O0FBRUEsZ0JBQUlDLFFBQVEsSUFBWjtBQUFBLGdCQUNJQyxR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QixNQUFoQjtBQUNIOztBQUlEO0FBQ0E7QUFDQTs7Ozs0QkFFVTtBQUNOLG1CQUFPLEtBQUtJLElBQVo7QUFDSCxTOzBCQUVPQyxHLEVBQUs7QUFDVCxrQ0FBTyxPQUFPQSxHQUFQLEtBQWUsUUFBdEIsNENBQXVFQSxHQUF2RSx5Q0FBdUVBLEdBQXZFOztBQUVBLGlCQUFLRCxJQUFMLEdBQVlDLEdBQVo7QUFDSDs7OzRCQUdZO0FBQ1QsbUJBQU8sS0FBS0MsT0FBWjtBQUNILFM7MEJBRVVELEcsRUFBSztBQUNaLGtDQUFPLE9BQU9BLEdBQVAsS0FBZSxRQUF0QiwrQ0FBMEVBLEdBQTFFLHlDQUEwRUEsR0FBMUU7O0FBRUEsaUJBQUtDLE9BQUwsR0FBZUQsR0FBZjtBQUNIOzs7Ozs7a0JBR1VoQyxJIiwiZmlsZSI6Imhhcm1vbmljcy9Ob3RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICogYXMgdG9uYWwgZnJvbSAndG9uYWwnO1xuaW1wb3J0ICogYXMgdHQgZnJvbSAndG9uYWwtdHJhbnNwb3NlJztcbmltcG9ydCAqIGFzIHRuIGZyb20gJ3RvbmFsLW5vdGUnO1xuXG5pbXBvcnQgSW50ZXJ2YWwgZnJvbSAnLi9JbnRlcnZhbCc7XG5pbXBvcnQgRnJlcXVlbmN5IGZyb20gJy4uL3F1YW50aXRpZXMvRnJlcXVlbmN5JztcblxuY2xhc3MgTm90ZSB7XG4gICAgY29uc3RydWN0b3Ioa2V5ID0gJ0MnLCBvY3RhdmUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGtleSAmJiBvY3RhdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZnJvbVN0cmluZyhrZXkpO1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyb21TdHJpbmcoa2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIENvbnZlcnNpb25cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXkgKyAodGhpcy5vY3RhdmUgPyB0aGlzLm9jdGF2ZS50b1N0cmluZygpIDogJycpO1xuICAgIH1cblxuICAgIGZyb21TdHJpbmcoaW5wdXQpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpO1xuXG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICByZWdleCA9IC9eW2EteixBLVosI10rKFswLTldKykkLyxcbiAgICAgICAgICAgIHJlcyA9IHJlZ2V4LmV4ZWMoaW5wdXQpO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJlcykpIHtcbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID49IDIpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5vY3RhdmUgPSBwYXJzZUludChyZXNbMV0pO1xuICAgICAgICAgICAgICAgIF9zZWxmLmtleSA9IHJlc1swXS5yZXBsYWNlKC9bMC05XSskLywgJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5vY3RhdmUgPSA0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIF9zZWxmLmtleSA9IHJlc1swXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF9zZWxmLmtleSA9IGlucHV0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICBmcm9tUmFuZG9tKCkge1xuICAgICAgICBsZXQgbm90ZSA9IHRvbmFsLm5vdGUuZnJvbU1pZGkoTWF0aC5yb3VuZChNYXRoLmZsb29yKCkgKiAxMjgpKTtcbiAgICAgICAgdGhpcy5mcm9tU3RyaW5nKG5vdGUpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuXG4gICAgdG9NaWRpKCkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHRoaXMub2N0YXZlID09PSAnbnVtYmVyJywgJ09jdGF2ZSBub3QgZGVmaW5lZCcpO1xuXG4gICAgICAgIGNvbnN0IHN0ciA9IHRoaXMudG9TdHJpbmcoKTtcbiAgICAgICAgcmV0dXJuIHRvbmFsLm5vdGUubWlkaShzdHIpO1xuICAgIH1cblxuICAgIGZyb21NaWRpKHZhbHVlKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInLCBgTWlkaSB2YWx1ZSBtdXN0IGJlIG51bWJlciwgaXMgJHt0eXBlb2YgdmFsdWV9YCk7XG4gICAgICAgIGFzc2VydCh2YWx1ZSA+PSAwICYmIHZhbHVlIDwgMTI4LCBgTWlkaSB2YWx1ZSBtdXN0IGJlIDAtMTI4LCBpcyAke3ZhbHVlfWApO1xuXG4gICAgICAgIGxldCByZXMgPSB0b25hbC5ub3RlLmZyb21NaWRpKHZhbHVlKTtcbiAgICAgICAgdGhpcy5mcm9tU3RyaW5nKHJlcyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG5cbiAgICB0b0ZyZXEoKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdGhpcy5vY3RhdmUgPT09ICdudW1iZXInLCAnT2N0YXZlIG5vdCBkZWZpbmVkJyk7XG5cbiAgICAgICAgbGV0IGZyZXEgPSB0b25hbC5ub3RlLmZyZXEodGhpcy50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIG5ldyBGcmVxdWVuY3koZnJlcSwgJ2h6Jyk7XG4gICAgfVxuXG5cbiAgICB0cmFuc3Bvc2UoaW50ZXJ2YWwsIHNpbXBsaWZ5ID0gZmFsc2UpIHtcbiAgICAgICAgYXNzZXJ0KGludGVydmFsIGluc3RhbmNlb2YgSW50ZXJ2YWwsIGBJbnZhbGlkIGludGVydmFsIG9mIHR5cGUgJHt0eXBlb2YgaW50ZXJ2YWx9YCk7XG5cbiAgICAgICAgbGV0IG5ld3ZhbCA9IHR0LnRyYW5zcG9zZSh0aGlzLnRvU3RyaW5nKCksIGludGVydmFsLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIGlmIChzaW1wbGlmeSkge1xuICAgICAgICAgICAgbmV3dmFsID0gdG4uc2ltcGxpZnkobmV3dmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZnJvbVN0cmluZyhuZXd2YWwpO1xuICAgIH1cblxuICAgIHRyYW5zcG9zZUZpZnRocyhjb3VudCA9IDEsIHNpbXBsaWZ5ID0gZmFsc2UpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBjb3VudCA9PT0gJ251bWJlcicsIGBGaWZ0aHMgY291bnQgbXVzdCBiZSBudW1iZXIsIGlzICR7dHlwZW9mIGNvdW50fWApO1xuXG4gICAgICAgIGxldCBuZXd2YWwgPSB0dC50ckZpZnRocyh0aGlzLnRvU3RyaW5nKCksIGNvdW50KTtcblxuICAgICAgICBpZiAoc2ltcGxpZnkpIHtcbiAgICAgICAgICAgIG5ld3ZhbCA9IHRuLnNpbXBsaWZ5KG5ld3ZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZyb21TdHJpbmcobmV3dmFsKTtcbiAgICB9XG5cblxuXG4gICAgLy9cbiAgICAvL1xuICAgIC8vIEdldHRlcnMgLyBTZXR0ZXJzXG5cbiAgICBnZXQga2V5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgIH1cblxuICAgIHNldCBrZXkodmFsKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdmFsID09PSAnc3RyaW5nJywgYEtleSB2YWx1ZSBtdXN0IGJlIHN0cmluZywgaXMgJHt0eXBlb2YgdmFsfWApO1xuXG4gICAgICAgIHRoaXMuX2tleSA9IHZhbDtcbiAgICB9XG5cblxuICAgIGdldCBvY3RhdmUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9vY3RhdmU7XG4gICAgfVxuXG4gICAgc2V0IG9jdGF2ZSh2YWwpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWwgPT09ICdudW1iZXInLCBgT2N0YXZlIHZhbHVlIG11c3QgYmUgbnVtYmVyLCBpcyAke3R5cGVvZiB2YWx9YCk7XG5cbiAgICAgICAgdGhpcy5fb2N0YXZlID0gdmFsO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90ZTsiXX0=
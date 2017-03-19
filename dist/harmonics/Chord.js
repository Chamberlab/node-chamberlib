'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonalChord = require('tonal-chord');

var tc = _interopRequireWildcard(_tonalChord);

var _scalesapi = require('scalesapi');

var sc = _interopRequireWildcard(_scalesapi);

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

var _Interval = require('./Interval');

var _Interval2 = _interopRequireDefault(_Interval);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Chord = function (_BaseCollection) {
    _inherits(Chord, _BaseCollection);

    function Chord(type) {
        var tonic = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var octave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, Chord);

        var _this = _possibleConstructorReturn(this, (Chord.__proto__ || Object.getPrototypeOf(Chord)).call(this, [], [_Note2.default]));

        if (typeof tonic === 'undefined') {
            var parsed = tc.parse(type);
            if (parsed instanceof Object) {
                type = parsed.type;
                tonic = parsed.tonic;
            }
        }

        _this.type = type;
        _this.tonic = tonic;

        if (octave) {
            _this.octave = octave;
        }
        return _this;
    }

    _createClass(Chord, [{
        key: 'getNotesFromOctave',
        value: function getNotesFromOctave() {
            var octave = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

            var _self = this;
            var notes = [],
                currentNote = void 0;

            this.notes.forEach(function (note) {
                if (!currentNote) {
                    currentNote = new _Note2.default(note.key, octave || _self.octave);
                } else {
                    currentNote.transpose(_Interval2.default.fromNotes(new _Note2.default(currentNote.key), note));
                }

                notes.push(new _Note2.default(currentNote.key, currentNote.octave));
            });

            return notes;
        }

        //
        //
        // Static methods

    }, {
        key: 'type',
        get: function get() {
            return this._type;
        },
        set: function set(type) {
            (0, _assert2.default)(typeof type === 'string', 'Chord type must be string, is ' + (typeof type === 'undefined' ? 'undefined' : _typeof(type)));

            this._type = type;
        }
    }, {
        key: 'tonic',
        get: function get() {
            return this._tonic;
        },
        set: function set(tonic) {
            (0, _assert2.default)(typeof tonic === 'string', 'Tonic must be string, is ' + (typeof tonic === 'undefined' ? 'undefined' : _typeof(tonic)));

            this._tonic = tonic;
        }
    }, {
        key: 'octave',
        get: function get() {
            return this._octave;
        },
        set: function set(octave) {
            (0, _assert2.default)(typeof octave === 'number', 'Octave must be number, is ' + (typeof octave === 'undefined' ? 'undefined' : _typeof(octave)));

            this._octave = octave;
        }
    }, {
        key: 'notes',
        get: function get() {
            var notes = tc.notes('' + this._tonic + this._type);

            return Array.isArray(notes) ? notes.map(function (note) {
                return new _Note2.default().fromString(note);
            }) : [];
        }
    }], [{
        key: 'getChordNames',
        value: function getChordNames() {
            var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*';
            var baseNote = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
            var octave = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

            var names = void 0;
            if (octave && baseNote && scale) {
                names = sc.getChords(scale, baseNote, octave);
            } else if (baseNote && scale) {
                names = sc.getChords(scale, baseNote);
            } else if (scale) {
                names = sc.getChords(scale);
            }
            return Array.isArray(names) ? names : [];
        }
    }, {
        key: 'detectFromNotes',
        value: function detectFromNotes(notes) {
            (0, _assert2.default)(Array.isArray(notes), 'Notes must be array');

            var chords = tc.detect(notes.map(function (note) {
                (0, _assert2.default)(note instanceof _Note2.default, 'Note must be of type Note, is ' + (typeof note === 'undefined' ? 'undefined' : _typeof(note)));

                return note.toString();
            }));

            return chords.map(function (chord) {
                var pc = tc.parse(chord);
                return new Chord(pc.type, pc.tonic);
            });
        }
    }]);

    return Chord;
}(_BaseCollection3.default);

exports.default = Chord;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9DaG9yZC5qcyJdLCJuYW1lcyI6WyJ0YyIsInNjIiwiQ2hvcmQiLCJ0eXBlIiwidG9uaWMiLCJ1bmRlZmluZWQiLCJvY3RhdmUiLCJwYXJzZWQiLCJwYXJzZSIsIk9iamVjdCIsIl9zZWxmIiwibm90ZXMiLCJjdXJyZW50Tm90ZSIsImZvckVhY2giLCJub3RlIiwia2V5IiwidHJhbnNwb3NlIiwiZnJvbU5vdGVzIiwicHVzaCIsIl90eXBlIiwiX3RvbmljIiwiX29jdGF2ZSIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsImZyb21TdHJpbmciLCJzY2FsZSIsImJhc2VOb3RlIiwibmFtZXMiLCJnZXRDaG9yZHMiLCJjaG9yZHMiLCJkZXRlY3QiLCJ0b1N0cmluZyIsInBjIiwiY2hvcmQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZQSxFOztBQUNaOztJQUFZQyxFOztBQUVaOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7SUFFTUMsSzs7O0FBQ0YsbUJBQVlDLElBQVosRUFBeUQ7QUFBQSxZQUF2Q0MsS0FBdUMsdUVBQS9CQyxTQUErQjtBQUFBLFlBQXBCQyxNQUFvQix1RUFBWEQsU0FBVzs7QUFBQTs7QUFBQSxrSEFDL0MsRUFEK0MsRUFDM0MsZ0JBRDJDOztBQUdyRCxZQUFJLE9BQU9ELEtBQVAsS0FBaUIsV0FBckIsRUFBa0M7QUFDOUIsZ0JBQU1HLFNBQVNQLEdBQUdRLEtBQUgsQ0FBU0wsSUFBVCxDQUFmO0FBQ0EsZ0JBQUlJLGtCQUFrQkUsTUFBdEIsRUFBOEI7QUFDMUJOLHVCQUFPSSxPQUFPSixJQUFkO0FBQ0FDLHdCQUFRRyxPQUFPSCxLQUFmO0FBQ0g7QUFDSjs7QUFFRCxjQUFLRCxJQUFMLEdBQVlBLElBQVo7QUFDQSxjQUFLQyxLQUFMLEdBQWFBLEtBQWI7O0FBRUEsWUFBSUUsTUFBSixFQUFZO0FBQ1Isa0JBQUtBLE1BQUwsR0FBY0EsTUFBZDtBQUNIO0FBaEJvRDtBQWlCeEQ7Ozs7NkNBNENzQztBQUFBLGdCQUFwQkEsTUFBb0IsdUVBQVhELFNBQVc7O0FBQ25DLGdCQUFNSyxRQUFRLElBQWQ7QUFDQSxnQkFBSUMsUUFBUSxFQUFaO0FBQUEsZ0JBQWdCQyxvQkFBaEI7O0FBRUEsaUJBQUtELEtBQUwsQ0FBV0UsT0FBWCxDQUFtQixnQkFBUTtBQUN2QixvQkFBSSxDQUFDRCxXQUFMLEVBQWtCO0FBQ2RBLGtDQUFjLG1CQUFTRSxLQUFLQyxHQUFkLEVBQW1CVCxVQUFVSSxNQUFNSixNQUFuQyxDQUFkO0FBQ0gsaUJBRkQsTUFFTztBQUNITSxnQ0FBWUksU0FBWixDQUFzQixtQkFBU0MsU0FBVCxDQUFtQixtQkFBU0wsWUFBWUcsR0FBckIsQ0FBbkIsRUFBOENELElBQTlDLENBQXRCO0FBQ0g7O0FBRURILHNCQUFNTyxJQUFOLENBQVcsbUJBQVNOLFlBQVlHLEdBQXJCLEVBQTBCSCxZQUFZTixNQUF0QyxDQUFYO0FBQ0gsYUFSRDs7QUFVQSxtQkFBT0ssS0FBUDtBQUNIOztBQUdEO0FBQ0E7QUFDQTs7Ozs0QkE3RFc7QUFDUCxtQkFBTyxLQUFLUSxLQUFaO0FBQ0gsUzswQkFFUWhCLEksRUFBTTtBQUNYLGtDQUFPLE9BQU9BLElBQVAsS0FBZ0IsUUFBdkIsNkNBQXlFQSxJQUF6RSx5Q0FBeUVBLElBQXpFOztBQUVBLGlCQUFLZ0IsS0FBTCxHQUFhaEIsSUFBYjtBQUNIOzs7NEJBR1c7QUFDUixtQkFBTyxLQUFLaUIsTUFBWjtBQUNILFM7MEJBRVNoQixLLEVBQU87QUFDYixrQ0FBTyxPQUFPQSxLQUFQLEtBQWlCLFFBQXhCLHdDQUFxRUEsS0FBckUseUNBQXFFQSxLQUFyRTs7QUFFQSxpQkFBS2dCLE1BQUwsR0FBY2hCLEtBQWQ7QUFDSDs7OzRCQUdZO0FBQ1QsbUJBQU8sS0FBS2lCLE9BQVo7QUFDSCxTOzBCQUVVZixNLEVBQVE7QUFDZixrQ0FBTyxPQUFPQSxNQUFQLEtBQWtCLFFBQXpCLHlDQUF1RUEsTUFBdkUseUNBQXVFQSxNQUF2RTs7QUFFQSxpQkFBS2UsT0FBTCxHQUFlZixNQUFmO0FBQ0g7Ozs0QkFHVztBQUNSLGdCQUFJSyxRQUFRWCxHQUFHVyxLQUFILE1BQVksS0FBS1MsTUFBakIsR0FBMEIsS0FBS0QsS0FBL0IsQ0FBWjs7QUFFQSxtQkFBT0csTUFBTUMsT0FBTixDQUFjWixLQUFkLElBQXVCQSxNQUFNYSxHQUFOLENBQVUsZ0JBQVE7QUFDNUMsdUJBQU8scUJBQVdDLFVBQVgsQ0FBc0JYLElBQXRCLENBQVA7QUFDSCxhQUY2QixDQUF2QixHQUVGLEVBRkw7QUFHSDs7O3dDQXdCaUU7QUFBQSxnQkFBN0NZLEtBQTZDLHVFQUFyQyxHQUFxQztBQUFBLGdCQUFoQ0MsUUFBZ0MsdUVBQXJCLElBQXFCO0FBQUEsZ0JBQWZyQixNQUFlLHVFQUFOLElBQU07O0FBQzlELGdCQUFJc0IsY0FBSjtBQUNBLGdCQUFJdEIsVUFBVXFCLFFBQVYsSUFBc0JELEtBQTFCLEVBQWlDO0FBQzdCRSx3QkFBUTNCLEdBQUc0QixTQUFILENBQWFILEtBQWIsRUFBb0JDLFFBQXBCLEVBQThCckIsTUFBOUIsQ0FBUjtBQUNILGFBRkQsTUFFTyxJQUFJcUIsWUFBWUQsS0FBaEIsRUFBdUI7QUFDMUJFLHdCQUFRM0IsR0FBRzRCLFNBQUgsQ0FBYUgsS0FBYixFQUFvQkMsUUFBcEIsQ0FBUjtBQUNILGFBRk0sTUFFQSxJQUFJRCxLQUFKLEVBQVc7QUFDZEUsd0JBQVEzQixHQUFHNEIsU0FBSCxDQUFhSCxLQUFiLENBQVI7QUFDSDtBQUNELG1CQUFPSixNQUFNQyxPQUFOLENBQWNLLEtBQWQsSUFBdUJBLEtBQXZCLEdBQStCLEVBQXRDO0FBQ0g7Ozt3Q0FFc0JqQixLLEVBQU87QUFDMUIsa0NBQU9XLE1BQU1DLE9BQU4sQ0FBY1osS0FBZCxDQUFQLEVBQTZCLHFCQUE3Qjs7QUFFQSxnQkFBTW1CLFNBQVM5QixHQUFHK0IsTUFBSCxDQUFVcEIsTUFBTWEsR0FBTixDQUFVLGdCQUFRO0FBQ3ZDLHNDQUFPViw4QkFBUCw2Q0FBcUVBLElBQXJFLHlDQUFxRUEsSUFBckU7O0FBRUEsdUJBQU9BLEtBQUtrQixRQUFMLEVBQVA7QUFDSCxhQUp3QixDQUFWLENBQWY7O0FBTUEsbUJBQU9GLE9BQU9OLEdBQVAsQ0FBVyxpQkFBUztBQUN2QixvQkFBTVMsS0FBS2pDLEdBQUdRLEtBQUgsQ0FBUzBCLEtBQVQsQ0FBWDtBQUNBLHVCQUFPLElBQUloQyxLQUFKLENBQVUrQixHQUFHOUIsSUFBYixFQUFtQjhCLEdBQUc3QixLQUF0QixDQUFQO0FBQ0gsYUFITSxDQUFQO0FBSUg7Ozs7OztrQkFHVUYsSyIsImZpbGUiOiJoYXJtb25pY3MvQ2hvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgKiBhcyB0YyBmcm9tICd0b25hbC1jaG9yZCc7XG5pbXBvcnQgKiBhcyBzYyBmcm9tICdzY2FsZXNhcGknO1xuXG5pbXBvcnQgQmFzZUNvbGxlY3Rpb24gZnJvbSAnLi4vZGF0YS9CYXNlQ29sbGVjdGlvbic7XG5pbXBvcnQgTm90ZSBmcm9tICcuL05vdGUnO1xuaW1wb3J0IEludGVydmFsIGZyb20gJy4vSW50ZXJ2YWwnO1xuXG5jbGFzcyBDaG9yZCBleHRlbmRzIEJhc2VDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCB0b25pYyA9IHVuZGVmaW5lZCwgb2N0YXZlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKFtdLCBbTm90ZV0pO1xuXG4gICAgICAgIGlmICh0eXBlb2YgdG9uaWMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBwYXJzZWQgPSB0Yy5wYXJzZSh0eXBlKTtcbiAgICAgICAgICAgIGlmIChwYXJzZWQgaW5zdGFuY2VvZiBPYmplY3QpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gcGFyc2VkLnR5cGU7XG4gICAgICAgICAgICAgICAgdG9uaWMgPSBwYXJzZWQudG9uaWM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnRvbmljID0gdG9uaWM7XG5cbiAgICAgICAgaWYgKG9jdGF2ZSkge1xuICAgICAgICAgICAgdGhpcy5vY3RhdmUgPSBvY3RhdmU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBzZXQgdHlwZSh0eXBlKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycsIGBDaG9yZCB0eXBlIG11c3QgYmUgc3RyaW5nLCBpcyAke3R5cGVvZiB0eXBlfWApO1xuXG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgIH1cblxuXG4gICAgZ2V0IHRvbmljKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdG9uaWM7XG4gICAgfVxuXG4gICAgc2V0IHRvbmljKHRvbmljKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgdG9uaWMgPT09ICdzdHJpbmcnLCBgVG9uaWMgbXVzdCBiZSBzdHJpbmcsIGlzICR7dHlwZW9mIHRvbmljfWApO1xuXG4gICAgICAgIHRoaXMuX3RvbmljID0gdG9uaWM7XG4gICAgfVxuXG5cbiAgICBnZXQgb2N0YXZlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fb2N0YXZlO1xuICAgIH1cblxuICAgIHNldCBvY3RhdmUob2N0YXZlKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2Ygb2N0YXZlID09PSAnbnVtYmVyJywgYE9jdGF2ZSBtdXN0IGJlIG51bWJlciwgaXMgJHt0eXBlb2Ygb2N0YXZlfWApO1xuXG4gICAgICAgIHRoaXMuX29jdGF2ZSA9IG9jdGF2ZTtcbiAgICB9XG5cblxuICAgIGdldCBub3RlcygpIHtcbiAgICAgICAgbGV0IG5vdGVzID0gdGMubm90ZXMoYCR7dGhpcy5fdG9uaWN9JHt0aGlzLl90eXBlfWApO1xuXG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KG5vdGVzKSA/IG5vdGVzLm1hcChub3RlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgTm90ZSgpLmZyb21TdHJpbmcobm90ZSk7XG4gICAgICAgIH0pIDogW107XG4gICAgfVxuXG4gICAgZ2V0Tm90ZXNGcm9tT2N0YXZlKG9jdGF2ZSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBub3RlcyA9IFtdLCBjdXJyZW50Tm90ZTtcblxuICAgICAgICB0aGlzLm5vdGVzLmZvckVhY2gobm90ZSA9PiB7XG4gICAgICAgICAgICBpZiAoIWN1cnJlbnROb3RlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudE5vdGUgPSBuZXcgTm90ZShub3RlLmtleSwgb2N0YXZlIHx8IF9zZWxmLm9jdGF2ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnROb3RlLnRyYW5zcG9zZShJbnRlcnZhbC5mcm9tTm90ZXMobmV3IE5vdGUoY3VycmVudE5vdGUua2V5KSwgbm90ZSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBub3Rlcy5wdXNoKG5ldyBOb3RlKGN1cnJlbnROb3RlLmtleSwgY3VycmVudE5vdGUub2N0YXZlKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBub3RlcztcbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBTdGF0aWMgbWV0aG9kc1xuXG4gICAgc3RhdGljIGdldENob3JkTmFtZXMoc2NhbGUgPSAnKicsIGJhc2VOb3RlID0gbnVsbCwgb2N0YXZlID0gbnVsbCkge1xuICAgICAgICBsZXQgbmFtZXM7XG4gICAgICAgIGlmIChvY3RhdmUgJiYgYmFzZU5vdGUgJiYgc2NhbGUpIHtcbiAgICAgICAgICAgIG5hbWVzID0gc2MuZ2V0Q2hvcmRzKHNjYWxlLCBiYXNlTm90ZSwgb2N0YXZlKTtcbiAgICAgICAgfSBlbHNlIGlmIChiYXNlTm90ZSAmJiBzY2FsZSkge1xuICAgICAgICAgICAgbmFtZXMgPSBzYy5nZXRDaG9yZHMoc2NhbGUsIGJhc2VOb3RlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzY2FsZSkge1xuICAgICAgICAgICAgbmFtZXMgPSBzYy5nZXRDaG9yZHMoc2NhbGUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBBcnJheS5pc0FycmF5KG5hbWVzKSA/IG5hbWVzIDogW107XG4gICAgfVxuXG4gICAgc3RhdGljIGRldGVjdEZyb21Ob3Rlcyhub3Rlcykge1xuICAgICAgICBhc3NlcnQoQXJyYXkuaXNBcnJheShub3RlcyksICdOb3RlcyBtdXN0IGJlIGFycmF5Jyk7XG5cbiAgICAgICAgY29uc3QgY2hvcmRzID0gdGMuZGV0ZWN0KG5vdGVzLm1hcChub3RlID0+IHtcbiAgICAgICAgICAgIGFzc2VydChub3RlIGluc3RhbmNlb2YgTm90ZSwgYE5vdGUgbXVzdCBiZSBvZiB0eXBlIE5vdGUsIGlzICR7dHlwZW9mIG5vdGV9YCk7XG5cbiAgICAgICAgICAgIHJldHVybiBub3RlLnRvU3RyaW5nKCk7XG4gICAgICAgIH0pKTtcblxuICAgICAgICByZXR1cm4gY2hvcmRzLm1hcChjaG9yZCA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYyA9IHRjLnBhcnNlKGNob3JkKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ2hvcmQocGMudHlwZSwgcGMudG9uaWMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENob3JkOyJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _scalesapi = require('scalesapi');

var sc = _interopRequireWildcard(_scalesapi);

var _BaseCollection2 = require('../data/BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chord = function (_BaseCollection) {
    (0, _inherits3.default)(Chord, _BaseCollection);

    function Chord(value) {
        (0, _classCallCheck3.default)(this, Chord);

        (0, _assert2.default)(typeof value === 'string');

        var _this = (0, _possibleConstructorReturn3.default)(this, (Chord.__proto__ || (0, _getPrototypeOf2.default)(Chord)).call(this, [], [_Note2.default]));

        _this.string = value;
        return _this;
    }

    (0, _createClass3.default)(Chord, [{
        key: 'string',
        get: function get() {
            if (typeof this._label !== 'string') {
                var notes = this.all.map(function (note) {
                    return note.string;
                });
                this._label = tonal.chord.detect(notes.join(' '));
            }
            return this._label;
        },
        set: function set(value) {
            (0, _assert2.default)(typeof value === 'string');

            this._label = value;

            var names = tonal.chord(this._label);
            this.value = names.map(function (name) {
                var note = new _Note2.default(name);
                return note;
            });
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
    }]);
    return Chord;
}(_BaseCollection3.default);

exports.default = Chord;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9DaG9yZC5qcyJdLCJuYW1lcyI6WyJ0b25hbCIsInNjIiwiQ2hvcmQiLCJ2YWx1ZSIsInN0cmluZyIsIl9sYWJlbCIsIm5vdGVzIiwiYWxsIiwibWFwIiwibm90ZSIsImNob3JkIiwiZGV0ZWN0Iiwiam9pbiIsIm5hbWVzIiwibmFtZSIsInNjYWxlIiwiYmFzZU5vdGUiLCJvY3RhdmUiLCJnZXRDaG9yZHMiLCJBcnJheSIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsSzs7QUFDWjs7SUFBWUMsRTs7QUFFWjs7OztBQUNBOzs7Ozs7OztJQUVNQyxLOzs7QUFDRixtQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNmLDhCQUFPLE9BQU9BLEtBQVAsS0FBaUIsUUFBeEI7O0FBRGUsd0lBR1QsRUFIUyxFQUdMLGdCQUhLOztBQUlmLGNBQUtDLE1BQUwsR0FBY0QsS0FBZDtBQUplO0FBS2xCOzs7OzRCQUVZO0FBQ1QsZ0JBQUksT0FBTyxLQUFLRSxNQUFaLEtBQXVCLFFBQTNCLEVBQXFDO0FBQ2pDLG9CQUFJQyxRQUFRLEtBQUtDLEdBQUwsQ0FBU0MsR0FBVCxDQUFhLFVBQVVDLElBQVYsRUFBZ0I7QUFDckMsMkJBQU9BLEtBQUtMLE1BQVo7QUFDSCxpQkFGVyxDQUFaO0FBR0EscUJBQUtDLE1BQUwsR0FBY0wsTUFBTVUsS0FBTixDQUFZQyxNQUFaLENBQW1CTCxNQUFNTSxJQUFOLENBQVcsR0FBWCxDQUFuQixDQUFkO0FBQ0g7QUFDRCxtQkFBTyxLQUFLUCxNQUFaO0FBQ0gsUzswQkFFVUYsSyxFQUFPO0FBQ2Qsa0NBQU8sT0FBT0EsS0FBUCxLQUFpQixRQUF4Qjs7QUFFQSxpQkFBS0UsTUFBTCxHQUFjRixLQUFkOztBQUVBLGdCQUFJVSxRQUFRYixNQUFNVSxLQUFOLENBQVksS0FBS0wsTUFBakIsQ0FBWjtBQUNBLGlCQUFLRixLQUFMLEdBQWFVLE1BQU1MLEdBQU4sQ0FBVSxVQUFVTSxJQUFWLEVBQWdCO0FBQ25DLG9CQUFJTCxPQUFPLG1CQUFTSyxJQUFULENBQVg7QUFDQSx1QkFBT0wsSUFBUDtBQUNILGFBSFksQ0FBYjtBQUlIOzs7d0NBR2lFO0FBQUEsZ0JBQTdDTSxLQUE2Qyx1RUFBckMsR0FBcUM7QUFBQSxnQkFBaENDLFFBQWdDLHVFQUFyQixJQUFxQjtBQUFBLGdCQUFmQyxNQUFlLHVFQUFOLElBQU07O0FBQzlELGdCQUFJSixjQUFKO0FBQ0EsZ0JBQUlJLFVBQVVELFFBQVYsSUFBc0JELEtBQTFCLEVBQWlDO0FBQzdCRix3QkFBUVosR0FBR2lCLFNBQUgsQ0FBYUgsS0FBYixFQUFvQkMsUUFBcEIsRUFBOEJDLE1BQTlCLENBQVI7QUFDSCxhQUZELE1BRU8sSUFBSUQsWUFBWUQsS0FBaEIsRUFBdUI7QUFDMUJGLHdCQUFRWixHQUFHaUIsU0FBSCxDQUFhSCxLQUFiLEVBQW9CQyxRQUFwQixDQUFSO0FBQ0gsYUFGTSxNQUVBLElBQUlELEtBQUosRUFBVztBQUNkRix3QkFBUVosR0FBR2lCLFNBQUgsQ0FBYUgsS0FBYixDQUFSO0FBQ0g7QUFDRCxtQkFBT0ksTUFBTUMsT0FBTixDQUFjUCxLQUFkLElBQXVCQSxLQUF2QixHQUErQixFQUF0QztBQUNIOzs7OztrQkFHVVgsSyIsImZpbGUiOiJoYXJtb25pY3MvQ2hvcmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgKiBhcyB0b25hbCBmcm9tICd0b25hbCc7XG5pbXBvcnQgKiBhcyBzYyBmcm9tICdzY2FsZXNhcGknO1xuXG5pbXBvcnQgQmFzZUNvbGxlY3Rpb24gZnJvbSAnLi4vZGF0YS9CYXNlQ29sbGVjdGlvbic7XG5pbXBvcnQgTm90ZSBmcm9tICcuL05vdGUnO1xuXG5jbGFzcyBDaG9yZCBleHRlbmRzIEJhc2VDb2xsZWN0aW9uIHtcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZSkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyk7XG5cbiAgICAgICAgc3VwZXIoW10sIFtOb3RlXSk7XG4gICAgICAgIHRoaXMuc3RyaW5nID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmluZygpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9sYWJlbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGxldCBub3RlcyA9IHRoaXMuYWxsLm1hcChmdW5jdGlvbiAobm90ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBub3RlLnN0cmluZztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbGFiZWwgPSB0b25hbC5jaG9yZC5kZXRlY3Qobm90ZXMuam9pbignICcpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fbGFiZWw7XG4gICAgfVxuXG4gICAgc2V0IHN0cmluZyh2YWx1ZSkge1xuICAgICAgICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyk7XG5cbiAgICAgICAgdGhpcy5fbGFiZWwgPSB2YWx1ZTtcblxuICAgICAgICBsZXQgbmFtZXMgPSB0b25hbC5jaG9yZCh0aGlzLl9sYWJlbCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBuYW1lcy5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgIGxldCBub3RlID0gbmV3IE5vdGUobmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gbm90ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBzdGF0aWMgZ2V0Q2hvcmROYW1lcyhzY2FsZSA9ICcqJywgYmFzZU5vdGUgPSBudWxsLCBvY3RhdmUgPSBudWxsKSB7XG4gICAgICAgIGxldCBuYW1lcztcbiAgICAgICAgaWYgKG9jdGF2ZSAmJiBiYXNlTm90ZSAmJiBzY2FsZSkge1xuICAgICAgICAgICAgbmFtZXMgPSBzYy5nZXRDaG9yZHMoc2NhbGUsIGJhc2VOb3RlLCBvY3RhdmUpO1xuICAgICAgICB9IGVsc2UgaWYgKGJhc2VOb3RlICYmIHNjYWxlKSB7XG4gICAgICAgICAgICBuYW1lcyA9IHNjLmdldENob3JkcyhzY2FsZSwgYmFzZU5vdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKHNjYWxlKSB7XG4gICAgICAgICAgICBuYW1lcyA9IHNjLmdldENob3JkcyhzY2FsZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkobmFtZXMpID8gbmFtZXMgOiBbXTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENob3JkOyJdfQ==
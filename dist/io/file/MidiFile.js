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

var _fs = require('pn/fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsmidgen = require('jsmidgen');

var midi = _interopRequireWildcard(_jsmidgen);

var _Song = require('../../data/Song');

var _Song2 = _interopRequireDefault(_Song);

var _Note = require('../../harmonics/Note');

var _Note2 = _interopRequireDefault(_Note);

var _Chord = require('../../harmonics/Chord');

var _Chord2 = _interopRequireDefault(_Chord);

var _TonalEvent = require('../../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TICKS_PER_BEAT = 128;

var MidiFile = function () {
    function MidiFile() {
        (0, _classCallCheck3.default)(this, MidiFile);
    }

    (0, _createClass3.default)(MidiFile, null, [{
        key: 'write',
        value: function write(song, filename) {
            (0, _assert2.default)(song instanceof _Song2.default);
            (0, _assert2.default)(typeof filename === 'string');

            var ticksPerSec = song.bpm * TICKS_PER_BEAT / 60.0,
                ticks = 0,
                layout = [],
                file = new midi.File();
            song.all.map(function (channel) {
                var lt = [];
                channel.all.map(function (event) {
                    (0, _assert2.default)(event instanceof _TonalEvent2.default);
                    lt.push = {
                        value: event.value,
                        on: true
                    };
                    var oe = new _TonalEvent2.default(event.time.normalized() + event.duration.normalized(), event.value);
                    lt.push = {
                        value: oe,
                        on: false
                    };
                });
                layout.push(lt.sort(function (a, b) {
                    if (a.value.time.normalized() > b.value.time.normalized()) {
                        return 1;
                    } else if (a.value.time.normalized() < b.value.time.normalized()) {
                        return -1;
                    }
                    return 0;
                }));
            });

            layout.map(function (lt) {
                var track = new midi.Track(),
                    last_t = 0;
                lt.map(function (event) {
                    if (event.value instanceof _Note2.default) {
                        track.addNote(1, event.value.toMidi());
                    } else if (event.value instanceof _Chord2.default) {
                        track.addChord(1, event.value.toMidi());
                    }
                    ticks += event.value.time.normalized() - last_t;
                    last_t = event.value.time.normalized() * ticksPerSec;
                });
                file.addTrack(track);
            });

            return _fs2.default.writeFile(filename, file.toBytes(), 'binary');
        }
    }]);
    return MidiFile;
}();

exports.default = MidiFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvTWlkaUZpbGUuanMiXSwibmFtZXMiOlsibWlkaSIsIlRJQ0tTX1BFUl9CRUFUIiwiTWlkaUZpbGUiLCJzb25nIiwiZmlsZW5hbWUiLCJ0aWNrc1BlclNlYyIsImJwbSIsInRpY2tzIiwibGF5b3V0IiwiZmlsZSIsIkZpbGUiLCJhbGwiLCJtYXAiLCJjaGFubmVsIiwibHQiLCJldmVudCIsInB1c2giLCJ2YWx1ZSIsIm9uIiwib2UiLCJ0aW1lIiwibm9ybWFsaXplZCIsImR1cmF0aW9uIiwic29ydCIsImEiLCJiIiwidHJhY2siLCJUcmFjayIsImxhc3RfdCIsImFkZE5vdGUiLCJ0b01pZGkiLCJhZGRDaG9yZCIsImFkZFRyYWNrIiwid3JpdGVGaWxlIiwidG9CeXRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLEk7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0FBRUEsSUFBTUMsaUJBQWlCLEdBQXZCOztJQUVNQyxROzs7Ozs7OzhCQUNXQyxJLEVBQU1DLFEsRUFBVTtBQUN6QixrQ0FBT0QsOEJBQVA7QUFDQSxrQ0FBTyxPQUFPQyxRQUFQLEtBQW9CLFFBQTNCOztBQUVBLGdCQUFJQyxjQUFlRixLQUFLRyxHQUFMLEdBQVdMLGNBQVosR0FBOEIsSUFBaEQ7QUFBQSxnQkFDSU0sUUFBUSxDQURaO0FBQUEsZ0JBRUlDLFNBQVMsRUFGYjtBQUFBLGdCQUdJQyxPQUFPLElBQUlULEtBQUtVLElBQVQsRUFIWDtBQUlBUCxpQkFBS1EsR0FBTCxDQUFTQyxHQUFULENBQWEsVUFBQ0MsT0FBRCxFQUFhO0FBQ3RCLG9CQUFJQyxLQUFLLEVBQVQ7QUFDQUQsd0JBQVFGLEdBQVIsQ0FBWUMsR0FBWixDQUFnQixVQUFDRyxLQUFELEVBQVc7QUFDdkIsMENBQU9BLHFDQUFQO0FBQ0FELHVCQUFHRSxJQUFILEdBQVU7QUFDTkMsK0JBQVFGLE1BQU1FLEtBRFI7QUFFTkMsNEJBQUk7QUFGRSxxQkFBVjtBQUlBLHdCQUFJQyxLQUFLLHlCQUFlSixNQUFNSyxJQUFOLENBQVdDLFVBQVgsS0FBMEJOLE1BQU1PLFFBQU4sQ0FBZUQsVUFBZixFQUF6QyxFQUFzRU4sTUFBTUUsS0FBNUUsQ0FBVDtBQUNBSCx1QkFBR0UsSUFBSCxHQUFVO0FBQ05DLCtCQUFRRSxFQURGO0FBRU5ELDRCQUFJO0FBRkUscUJBQVY7QUFJSCxpQkFYRDtBQVlBVix1QkFBT1EsSUFBUCxDQUFZRixHQUFHUyxJQUFILENBQVEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDMUIsd0JBQUlELEVBQUVQLEtBQUYsQ0FBUUcsSUFBUixDQUFhQyxVQUFiLEtBQTRCSSxFQUFFUixLQUFGLENBQVFHLElBQVIsQ0FBYUMsVUFBYixFQUFoQyxFQUEyRDtBQUN2RCwrQkFBTyxDQUFQO0FBQ0gscUJBRkQsTUFFTyxJQUFJRyxFQUFFUCxLQUFGLENBQVFHLElBQVIsQ0FBYUMsVUFBYixLQUE0QkksRUFBRVIsS0FBRixDQUFRRyxJQUFSLENBQWFDLFVBQWIsRUFBaEMsRUFBMkQ7QUFDOUQsK0JBQU8sQ0FBQyxDQUFSO0FBQ0g7QUFDRCwyQkFBTyxDQUFQO0FBQ0gsaUJBUFcsQ0FBWjtBQVFILGFBdEJEOztBQXdCQWIsbUJBQU9JLEdBQVAsQ0FBVyxVQUFDRSxFQUFELEVBQVE7QUFDZixvQkFBSVksUUFBUSxJQUFJMUIsS0FBSzJCLEtBQVQsRUFBWjtBQUFBLG9CQUNJQyxTQUFTLENBRGI7QUFFQWQsbUJBQUdGLEdBQUgsQ0FBTyxVQUFDRyxLQUFELEVBQVc7QUFDZCx3QkFBSUEsTUFBTUUsS0FBTiwwQkFBSixFQUFpQztBQUM3QlMsOEJBQU1HLE9BQU4sQ0FBYyxDQUFkLEVBQWlCZCxNQUFNRSxLQUFOLENBQVlhLE1BQVosRUFBakI7QUFDSCxxQkFGRCxNQUVPLElBQUlmLE1BQU1FLEtBQU4sMkJBQUosRUFBa0M7QUFDckNTLDhCQUFNSyxRQUFOLENBQWUsQ0FBZixFQUFrQmhCLE1BQU1FLEtBQU4sQ0FBWWEsTUFBWixFQUFsQjtBQUNIO0FBQ0R2Qiw2QkFBVVEsTUFBTUUsS0FBTixDQUFZRyxJQUFaLENBQWlCQyxVQUFqQixLQUFnQ08sTUFBMUM7QUFDQUEsNkJBQVNiLE1BQU1FLEtBQU4sQ0FBWUcsSUFBWixDQUFpQkMsVUFBakIsS0FBZ0NoQixXQUF6QztBQUNILGlCQVJEO0FBU0FJLHFCQUFLdUIsUUFBTCxDQUFjTixLQUFkO0FBQ0gsYUFiRDs7QUFlQSxtQkFBTyxhQUFHTyxTQUFILENBQWE3QixRQUFiLEVBQXVCSyxLQUFLeUIsT0FBTCxFQUF2QixFQUF1QyxRQUF2QyxDQUFQO0FBQ0g7Ozs7O2tCQUdVaEMsUSIsImZpbGUiOiJpby9maWxlL01pZGlGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IGZzIGZyb20gJ3BuL2ZzJztcbmltcG9ydCAqIGFzIG1pZGkgZnJvbSAnanNtaWRnZW4nO1xuaW1wb3J0IFNvbmcgZnJvbSAnLi4vLi4vZGF0YS9Tb25nJztcbmltcG9ydCBOb3RlIGZyb20gJy4uLy4uL2hhcm1vbmljcy9Ob3RlJztcbmltcG9ydCBDaG9yZCBmcm9tICcuLi8uLi9oYXJtb25pY3MvQ2hvcmQnO1xuaW1wb3J0IFRvbmFsRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL1RvbmFsRXZlbnQnO1xuXG5jb25zdCBUSUNLU19QRVJfQkVBVCA9IDEyODtcblxuY2xhc3MgTWlkaUZpbGUge1xuICAgIHN0YXRpYyB3cml0ZShzb25nLCBmaWxlbmFtZSkge1xuICAgICAgICBhc3NlcnQoc29uZyBpbnN0YW5jZW9mIFNvbmcpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGZpbGVuYW1lID09PSAnc3RyaW5nJyk7XG5cbiAgICAgICAgbGV0IHRpY2tzUGVyU2VjID0gKHNvbmcuYnBtICogVElDS1NfUEVSX0JFQVQpIC8gNjAuMCxcbiAgICAgICAgICAgIHRpY2tzID0gMCxcbiAgICAgICAgICAgIGxheW91dCA9IFtdLFxuICAgICAgICAgICAgZmlsZSA9IG5ldyBtaWRpLkZpbGUoKTtcbiAgICAgICAgc29uZy5hbGwubWFwKChjaGFubmVsKSA9PiB7XG4gICAgICAgICAgICBsZXQgbHQgPSBbXTtcbiAgICAgICAgICAgIGNoYW5uZWwuYWxsLm1hcCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoZXZlbnQgaW5zdGFuY2VvZiBUb25hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICBsdC5wdXNoID0ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogIGV2ZW50LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGV0IG9lID0gbmV3IFRvbmFsRXZlbnQoZXZlbnQudGltZS5ub3JtYWxpemVkKCkgKyBldmVudC5kdXJhdGlvbi5ub3JtYWxpemVkKCksIGV2ZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBsdC5wdXNoID0ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogIG9lLFxuICAgICAgICAgICAgICAgICAgICBvbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsYXlvdXQucHVzaChsdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGEudmFsdWUudGltZS5ub3JtYWxpemVkKCkgPiBiLnZhbHVlLnRpbWUubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYS52YWx1ZS50aW1lLm5vcm1hbGl6ZWQoKSA8IGIudmFsdWUudGltZS5ub3JtYWxpemVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5b3V0Lm1hcCgobHQpID0+IHtcbiAgICAgICAgICAgIGxldCB0cmFjayA9IG5ldyBtaWRpLlRyYWNrKCksXG4gICAgICAgICAgICAgICAgbGFzdF90ID0gMDtcbiAgICAgICAgICAgIGx0Lm1hcCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudmFsdWUgaW5zdGFuY2VvZiBOb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrLmFkZE5vdGUoMSwgZXZlbnQudmFsdWUudG9NaWRpKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQudmFsdWUgaW5zdGFuY2VvZiBDaG9yZCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGRDaG9yZCgxLCBldmVudC52YWx1ZS50b01pZGkoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRpY2tzICs9IChldmVudC52YWx1ZS50aW1lLm5vcm1hbGl6ZWQoKSAtIGxhc3RfdCkgO1xuICAgICAgICAgICAgICAgIGxhc3RfdCA9IGV2ZW50LnZhbHVlLnRpbWUubm9ybWFsaXplZCgpICogdGlja3NQZXJTZWM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpbGUuYWRkVHJhY2sodHJhY2spO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZnMud3JpdGVGaWxlKGZpbGVuYW1lLCBmaWxlLnRvQnl0ZXMoKSwgJ2JpbmFyeScpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlkaUZpbGU7Il19
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

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

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
                    lt.push({
                        value: event,
                        on: true
                    });
                    var oe = new _TonalEvent2.default(new _Time2.default(event.time._value + event.duration._value, event.time.unit), event.value, new _Time2.default(0.0, event.duration.unit));
                    lt.push({
                        value: oe,
                        on: false
                    });
                });
                layout.push(lt.sort(function (a, b) {
                    if (a.value.time._value > b.value.time._value) {
                        return 1;
                    } else if (a.value.time._value < b.value.time._value) {
                        return -1;
                    }
                    return 0;
                }));
            });

            layout.map(function (lt) {
                var track = new midi.Track(),
                    last_t = 0;
                lt.map(function (event) {
                    var event_val = event.value._value;
                    ticks += event.value.time._value * 0.001 * ticksPerSec;
                    if (event_val instanceof _Note2.default) {
                        if (event.on) {
                            track.addNoteOn(0, event_val.toMidi(), ticks - last_t);
                        } else {
                            track.addNoteOff(0, event_val.toMidi(), ticks - last_t);
                        }
                    } else if (event.value._value instanceof _Chord2.default) {
                        track.addChord(0, event_val.toMidi(), ticks);
                    }
                    last_t = ticks;
                });
                file.addTrack(track);
            });

            return _fs2.default.writeFile(filename, file.toBytes(), 'binary');
        }
    }]);
    return MidiFile;
}();

exports.default = MidiFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvTWlkaUZpbGUuanMiXSwibmFtZXMiOlsibWlkaSIsIlRJQ0tTX1BFUl9CRUFUIiwiTWlkaUZpbGUiLCJzb25nIiwiZmlsZW5hbWUiLCJ0aWNrc1BlclNlYyIsImJwbSIsInRpY2tzIiwibGF5b3V0IiwiZmlsZSIsIkZpbGUiLCJhbGwiLCJtYXAiLCJjaGFubmVsIiwibHQiLCJldmVudCIsInB1c2giLCJ2YWx1ZSIsIm9uIiwib2UiLCJ0aW1lIiwiX3ZhbHVlIiwiZHVyYXRpb24iLCJ1bml0Iiwic29ydCIsImEiLCJiIiwidHJhY2siLCJUcmFjayIsImxhc3RfdCIsImV2ZW50X3ZhbCIsImFkZE5vdGVPbiIsInRvTWlkaSIsImFkZE5vdGVPZmYiLCJhZGRDaG9yZCIsImFkZFRyYWNrIiwid3JpdGVGaWxlIiwidG9CeXRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7O0lBQVlBLEk7O0FBQ1o7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFNQyxpQkFBaUIsR0FBdkI7O0lBRU1DLFE7Ozs7Ozs7OEJBQ1dDLEksRUFBTUMsUSxFQUFVO0FBQ3pCLGtDQUFPRCw4QkFBUDtBQUNBLGtDQUFPLE9BQU9DLFFBQVAsS0FBb0IsUUFBM0I7O0FBRUEsZ0JBQUlDLGNBQWVGLEtBQUtHLEdBQUwsR0FBV0wsY0FBWixHQUE4QixJQUFoRDtBQUFBLGdCQUNJTSxRQUFRLENBRFo7QUFBQSxnQkFFSUMsU0FBUyxFQUZiO0FBQUEsZ0JBR0lDLE9BQU8sSUFBSVQsS0FBS1UsSUFBVCxFQUhYOztBQUtBUCxpQkFBS1EsR0FBTCxDQUFTQyxHQUFULENBQWEsVUFBQ0MsT0FBRCxFQUFhO0FBQ3RCLG9CQUFJQyxLQUFLLEVBQVQ7QUFDQUQsd0JBQVFGLEdBQVIsQ0FBWUMsR0FBWixDQUFnQixVQUFDRyxLQUFELEVBQVc7QUFDdkIsMENBQU9BLHFDQUFQO0FBQ0FELHVCQUFHRSxJQUFILENBQVE7QUFDSkMsK0JBQU9GLEtBREg7QUFFSkcsNEJBQUk7QUFGQSxxQkFBUjtBQUlBLHdCQUFJQyxLQUFLLHlCQUFlLG1CQUFTSixNQUFNSyxJQUFOLENBQVdDLE1BQVgsR0FBb0JOLE1BQU1PLFFBQU4sQ0FBZUQsTUFBNUMsRUFDcEJOLE1BQU1LLElBQU4sQ0FBV0csSUFEUyxDQUFmLEVBQ2FSLE1BQU1FLEtBRG5CLEVBQzBCLG1CQUFTLEdBQVQsRUFBY0YsTUFBTU8sUUFBTixDQUFlQyxJQUE3QixDQUQxQixDQUFUO0FBRUFULHVCQUFHRSxJQUFILENBQVE7QUFDSkMsK0JBQU9FLEVBREg7QUFFSkQsNEJBQUk7QUFGQSxxQkFBUjtBQUlILGlCQVpEO0FBYUFWLHVCQUFPUSxJQUFQLENBQVlGLEdBQUdVLElBQUgsQ0FBUSxVQUFDQyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUMxQix3QkFBSUQsRUFBRVIsS0FBRixDQUFRRyxJQUFSLENBQWFDLE1BQWIsR0FBc0JLLEVBQUVULEtBQUYsQ0FBUUcsSUFBUixDQUFhQyxNQUF2QyxFQUErQztBQUMzQywrQkFBTyxDQUFQO0FBQ0gscUJBRkQsTUFFTyxJQUFJSSxFQUFFUixLQUFGLENBQVFHLElBQVIsQ0FBYUMsTUFBYixHQUFzQkssRUFBRVQsS0FBRixDQUFRRyxJQUFSLENBQWFDLE1BQXZDLEVBQStDO0FBQ2xELCtCQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0QsMkJBQU8sQ0FBUDtBQUNILGlCQVBXLENBQVo7QUFRSCxhQXZCRDs7QUF5QkFiLG1CQUFPSSxHQUFQLENBQVcsVUFBQ0UsRUFBRCxFQUFRO0FBQ2Ysb0JBQUlhLFFBQVEsSUFBSTNCLEtBQUs0QixLQUFULEVBQVo7QUFBQSxvQkFDSUMsU0FBUyxDQURiO0FBRUFmLG1CQUFHRixHQUFILENBQU8sVUFBQ0csS0FBRCxFQUFXO0FBQ2Qsd0JBQU1lLFlBQVlmLE1BQU1FLEtBQU4sQ0FBWUksTUFBOUI7QUFDQWQsNkJBQVNRLE1BQU1FLEtBQU4sQ0FBWUcsSUFBWixDQUFpQkMsTUFBakIsR0FBMEIsS0FBMUIsR0FBa0NoQixXQUEzQztBQUNBLHdCQUFJeUIsbUNBQUosRUFBK0I7QUFDM0IsNEJBQUlmLE1BQU1HLEVBQVYsRUFBYztBQUNWUyxrQ0FBTUksU0FBTixDQUFnQixDQUFoQixFQUFtQkQsVUFBVUUsTUFBVixFQUFuQixFQUF1Q3pCLFFBQVFzQixNQUEvQztBQUNILHlCQUZELE1BRU87QUFDSEYsa0NBQU1NLFVBQU4sQ0FBaUIsQ0FBakIsRUFBb0JILFVBQVVFLE1BQVYsRUFBcEIsRUFBd0N6QixRQUFRc0IsTUFBaEQ7QUFDSDtBQUNKLHFCQU5ELE1BTU8sSUFBSWQsTUFBTUUsS0FBTixDQUFZSSxNQUFaLDJCQUFKLEVBQXlDO0FBQzVDTSw4QkFBTU8sUUFBTixDQUFlLENBQWYsRUFBa0JKLFVBQVVFLE1BQVYsRUFBbEIsRUFBc0N6QixLQUF0QztBQUNIO0FBQ0RzQiw2QkFBU3RCLEtBQVQ7QUFDSCxpQkFiRDtBQWNBRSxxQkFBSzBCLFFBQUwsQ0FBY1IsS0FBZDtBQUNILGFBbEJEOztBQW9CQSxtQkFBTyxhQUFHUyxTQUFILENBQWFoQyxRQUFiLEVBQXVCSyxLQUFLNEIsT0FBTCxFQUF2QixFQUF1QyxRQUF2QyxDQUFQO0FBQ0g7Ozs7O2tCQUdVbkMsUSIsImZpbGUiOiJpby9maWxlL01pZGlGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IGZzIGZyb20gJ3BuL2ZzJztcbmltcG9ydCAqIGFzIG1pZGkgZnJvbSAnanNtaWRnZW4nO1xuaW1wb3J0IFNvbmcgZnJvbSAnLi4vLi4vZGF0YS9Tb25nJztcbmltcG9ydCBOb3RlIGZyb20gJy4uLy4uL2hhcm1vbmljcy9Ob3RlJztcbmltcG9ydCBDaG9yZCBmcm9tICcuLi8uLi9oYXJtb25pY3MvQ2hvcmQnO1xuaW1wb3J0IFRvbmFsRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL1RvbmFsRXZlbnQnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcblxuY29uc3QgVElDS1NfUEVSX0JFQVQgPSAxMjg7XG5cbmNsYXNzIE1pZGlGaWxlIHtcbiAgICBzdGF0aWMgd3JpdGUoc29uZywgZmlsZW5hbWUpIHtcbiAgICAgICAgYXNzZXJ0KHNvbmcgaW5zdGFuY2VvZiBTb25nKTtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBmaWxlbmFtZSA9PT0gJ3N0cmluZycpO1xuXG4gICAgICAgIGxldCB0aWNrc1BlclNlYyA9IChzb25nLmJwbSAqIFRJQ0tTX1BFUl9CRUFUKSAvIDYwLjAsXG4gICAgICAgICAgICB0aWNrcyA9IDAsXG4gICAgICAgICAgICBsYXlvdXQgPSBbXSxcbiAgICAgICAgICAgIGZpbGUgPSBuZXcgbWlkaS5GaWxlKCk7XG5cbiAgICAgICAgc29uZy5hbGwubWFwKChjaGFubmVsKSA9PiB7XG4gICAgICAgICAgICBsZXQgbHQgPSBbXTtcbiAgICAgICAgICAgIGNoYW5uZWwuYWxsLm1hcCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoZXZlbnQgaW5zdGFuY2VvZiBUb25hbEV2ZW50KTtcbiAgICAgICAgICAgICAgICBsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBvbjogdHJ1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxldCBvZSA9IG5ldyBUb25hbEV2ZW50KG5ldyBUaW1lKGV2ZW50LnRpbWUuX3ZhbHVlICsgZXZlbnQuZHVyYXRpb24uX3ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBldmVudC50aW1lLnVuaXQpLCBldmVudC52YWx1ZSwgbmV3IFRpbWUoMC4wLCBldmVudC5kdXJhdGlvbi51bml0KSk7XG4gICAgICAgICAgICAgICAgbHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBvZSxcbiAgICAgICAgICAgICAgICAgICAgb246IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxheW91dC5wdXNoKGx0LnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYS52YWx1ZS50aW1lLl92YWx1ZSA+IGIudmFsdWUudGltZS5fdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChhLnZhbHVlLnRpbWUuX3ZhbHVlIDwgYi52YWx1ZS50aW1lLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsYXlvdXQubWFwKChsdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHRyYWNrID0gbmV3IG1pZGkuVHJhY2soKSxcbiAgICAgICAgICAgICAgICBsYXN0X3QgPSAwO1xuICAgICAgICAgICAgbHQubWFwKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50X3ZhbCA9IGV2ZW50LnZhbHVlLl92YWx1ZTtcbiAgICAgICAgICAgICAgICB0aWNrcyArPSBldmVudC52YWx1ZS50aW1lLl92YWx1ZSAqIDAuMDAxICogdGlja3NQZXJTZWM7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50X3ZhbCBpbnN0YW5jZW9mIE5vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGROb3RlT24oMCwgZXZlbnRfdmFsLnRvTWlkaSgpLCB0aWNrcyAtIGxhc3RfdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGROb3RlT2ZmKDAsIGV2ZW50X3ZhbC50b01pZGkoKSwgdGlja3MgLSBsYXN0X3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC52YWx1ZS5fdmFsdWUgaW5zdGFuY2VvZiBDaG9yZCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGRDaG9yZCgwLCBldmVudF92YWwudG9NaWRpKCksIHRpY2tzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGFzdF90ID0gdGlja3M7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZpbGUuYWRkVHJhY2sodHJhY2spO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gZnMud3JpdGVGaWxlKGZpbGVuYW1lLCBmaWxlLnRvQnl0ZXMoKSwgJ2JpbmFyeScpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWlkaUZpbGU7Il19
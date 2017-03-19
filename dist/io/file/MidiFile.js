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

                    var oe = new _TonalEvent2.default(new _Time2.default(event.time._value + event.duration._value, event.time.unit), event.value, new _Time2.default(0.0, event.duration.unit));

                    lt.push({
                        value: event,
                        on: true
                    });
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
                    ticks += event.value.time.normalized() * ticksPerSec;
                    if (event_val instanceof _Note2.default) {
                        if (event.on) {
                            track.addNoteOn(0, event_val.toMidi(), ticks - last_t);
                        } else {
                            track.addNoteOff(0, event_val.toMidi(), ticks - last_t);
                        }
                    } else if (event.value._value instanceof _Chord2.default) {
                        // TODO: properly implement chords
                        // track.addChord(0, event_val.toMidi(), ticks);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvTWlkaUZpbGUuanMiXSwibmFtZXMiOlsibWlkaSIsIlRJQ0tTX1BFUl9CRUFUIiwiTWlkaUZpbGUiLCJzb25nIiwiZmlsZW5hbWUiLCJ0aWNrc1BlclNlYyIsImJwbSIsInRpY2tzIiwibGF5b3V0IiwiZmlsZSIsIkZpbGUiLCJhbGwiLCJtYXAiLCJjaGFubmVsIiwibHQiLCJldmVudCIsIm9lIiwidGltZSIsIl92YWx1ZSIsImR1cmF0aW9uIiwidW5pdCIsInZhbHVlIiwicHVzaCIsIm9uIiwic29ydCIsImEiLCJiIiwidHJhY2siLCJUcmFjayIsImxhc3RfdCIsImV2ZW50X3ZhbCIsIm5vcm1hbGl6ZWQiLCJhZGROb3RlT24iLCJ0b01pZGkiLCJhZGROb3RlT2ZmIiwiYWRkVHJhY2siLCJ3cml0ZUZpbGUiLCJ0b0J5dGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLElBQU1DLGlCQUFpQixHQUF2Qjs7SUFFTUMsUTs7Ozs7Ozs4QkFDV0MsSSxFQUFNQyxRLEVBQVU7QUFDekIsa0NBQU9ELDhCQUFQO0FBQ0Esa0NBQU8sT0FBT0MsUUFBUCxLQUFvQixRQUEzQjs7QUFFQSxnQkFBSUMsY0FBZUYsS0FBS0csR0FBTCxHQUFXTCxjQUFaLEdBQThCLElBQWhEO0FBQUEsZ0JBQ0lNLFFBQVEsQ0FEWjtBQUFBLGdCQUVJQyxTQUFTLEVBRmI7QUFBQSxnQkFHSUMsT0FBTyxJQUFJVCxLQUFLVSxJQUFULEVBSFg7O0FBS0FQLGlCQUFLUSxHQUFMLENBQVNDLEdBQVQsQ0FBYSxVQUFDQyxPQUFELEVBQWE7QUFDdEIsb0JBQUlDLEtBQUssRUFBVDtBQUNBRCx3QkFBUUYsR0FBUixDQUFZQyxHQUFaLENBQWdCLFVBQUNHLEtBQUQsRUFBVztBQUN2QiwwQ0FBT0EscUNBQVA7O0FBRUEsd0JBQUlDLEtBQUsseUJBQWUsbUJBQVNELE1BQU1FLElBQU4sQ0FBV0MsTUFBWCxHQUFvQkgsTUFBTUksUUFBTixDQUFlRCxNQUE1QyxFQUNwQkgsTUFBTUUsSUFBTixDQUFXRyxJQURTLENBQWYsRUFDYUwsTUFBTU0sS0FEbkIsRUFDMEIsbUJBQVMsR0FBVCxFQUFjTixNQUFNSSxRQUFOLENBQWVDLElBQTdCLENBRDFCLENBQVQ7O0FBR0FOLHVCQUFHUSxJQUFILENBQVE7QUFDSkQsK0JBQU9OLEtBREg7QUFFSlEsNEJBQUk7QUFGQSxxQkFBUjtBQUlBVCx1QkFBR1EsSUFBSCxDQUFRO0FBQ0pELCtCQUFPTCxFQURIO0FBRUpPLDRCQUFJO0FBRkEscUJBQVI7QUFJSCxpQkFkRDtBQWVBZix1QkFBT2MsSUFBUCxDQUFZUixHQUFHVSxJQUFILENBQVEsVUFBQ0MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDMUIsd0JBQUlELEVBQUVKLEtBQUYsQ0FBUUosSUFBUixDQUFhQyxNQUFiLEdBQXNCUSxFQUFFTCxLQUFGLENBQVFKLElBQVIsQ0FBYUMsTUFBdkMsRUFBK0M7QUFDM0MsK0JBQU8sQ0FBUDtBQUNILHFCQUZELE1BRU8sSUFBSU8sRUFBRUosS0FBRixDQUFRSixJQUFSLENBQWFDLE1BQWIsR0FBc0JRLEVBQUVMLEtBQUYsQ0FBUUosSUFBUixDQUFhQyxNQUF2QyxFQUErQztBQUNsRCwrQkFBTyxDQUFDLENBQVI7QUFDSDtBQUNELDJCQUFPLENBQVA7QUFDSCxpQkFQVyxDQUFaO0FBUUgsYUF6QkQ7O0FBMkJBVixtQkFBT0ksR0FBUCxDQUFXLFVBQUNFLEVBQUQsRUFBUTtBQUNmLG9CQUFJYSxRQUFRLElBQUkzQixLQUFLNEIsS0FBVCxFQUFaO0FBQUEsb0JBQ0lDLFNBQVMsQ0FEYjtBQUVBZixtQkFBR0YsR0FBSCxDQUFPLFVBQUNHLEtBQUQsRUFBVztBQUNkLHdCQUFNZSxZQUFZZixNQUFNTSxLQUFOLENBQVlILE1BQTlCO0FBQ0FYLDZCQUFTUSxNQUFNTSxLQUFOLENBQVlKLElBQVosQ0FBaUJjLFVBQWpCLEtBQWdDMUIsV0FBekM7QUFDQSx3QkFBSXlCLG1DQUFKLEVBQStCO0FBQzNCLDRCQUFJZixNQUFNUSxFQUFWLEVBQWM7QUFDVkksa0NBQU1LLFNBQU4sQ0FBZ0IsQ0FBaEIsRUFBbUJGLFVBQVVHLE1BQVYsRUFBbkIsRUFBdUMxQixRQUFRc0IsTUFBL0M7QUFDSCx5QkFGRCxNQUVPO0FBQ0hGLGtDQUFNTyxVQUFOLENBQWlCLENBQWpCLEVBQW9CSixVQUFVRyxNQUFWLEVBQXBCLEVBQXdDMUIsUUFBUXNCLE1BQWhEO0FBQ0g7QUFDSixxQkFORCxNQU1PLElBQUlkLE1BQU1NLEtBQU4sQ0FBWUgsTUFBWiwyQkFBSixFQUF5QztBQUM1QztBQUNBO0FBQ0g7QUFDRFcsNkJBQVN0QixLQUFUO0FBQ0gsaUJBZEQ7QUFlQUUscUJBQUswQixRQUFMLENBQWNSLEtBQWQ7QUFDSCxhQW5CRDs7QUFxQkEsbUJBQU8sYUFBR1MsU0FBSCxDQUFhaEMsUUFBYixFQUF1QkssS0FBSzRCLE9BQUwsRUFBdkIsRUFBdUMsUUFBdkMsQ0FBUDtBQUNIOzs7OztrQkFHVW5DLFEiLCJmaWxlIjoiaW8vZmlsZS9NaWRpRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBmcyBmcm9tICdwbi9mcyc7XG5pbXBvcnQgKiBhcyBtaWRpIGZyb20gJ2pzbWlkZ2VuJztcbmltcG9ydCBTb25nIGZyb20gJy4uLy4uL2RhdGEvU29uZyc7XG5pbXBvcnQgTm90ZSBmcm9tICcuLi8uLi9oYXJtb25pY3MvTm90ZSc7XG5pbXBvcnQgQ2hvcmQgZnJvbSAnLi4vLi4vaGFybW9uaWNzL0Nob3JkJztcbmltcG9ydCBUb25hbEV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9Ub25hbEV2ZW50JztcbmltcG9ydCBUaW1lIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVGltZSc7XG5cbmNvbnN0IFRJQ0tTX1BFUl9CRUFUID0gMTI4O1xuXG5jbGFzcyBNaWRpRmlsZSB7XG4gICAgc3RhdGljIHdyaXRlKHNvbmcsIGZpbGVuYW1lKSB7XG4gICAgICAgIGFzc2VydChzb25nIGluc3RhbmNlb2YgU29uZyk7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgZmlsZW5hbWUgPT09ICdzdHJpbmcnKTtcblxuICAgICAgICBsZXQgdGlja3NQZXJTZWMgPSAoc29uZy5icG0gKiBUSUNLU19QRVJfQkVBVCkgLyA2MC4wLFxuICAgICAgICAgICAgdGlja3MgPSAwLFxuICAgICAgICAgICAgbGF5b3V0ID0gW10sXG4gICAgICAgICAgICBmaWxlID0gbmV3IG1pZGkuRmlsZSgpO1xuXG4gICAgICAgIHNvbmcuYWxsLm1hcCgoY2hhbm5lbCkgPT4ge1xuICAgICAgICAgICAgbGV0IGx0ID0gW107XG4gICAgICAgICAgICBjaGFubmVsLmFsbC5tYXAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGV2ZW50IGluc3RhbmNlb2YgVG9uYWxFdmVudCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgb2UgPSBuZXcgVG9uYWxFdmVudChuZXcgVGltZShldmVudC50aW1lLl92YWx1ZSArIGV2ZW50LmR1cmF0aW9uLl92YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQudGltZS51bml0KSwgZXZlbnQudmFsdWUsIG5ldyBUaW1lKDAuMCwgZXZlbnQuZHVyYXRpb24udW5pdCkpO1xuXG4gICAgICAgICAgICAgICAgbHQucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgb246IHRydWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IG9lLFxuICAgICAgICAgICAgICAgICAgICBvbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGF5b3V0LnB1c2gobHQuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhLnZhbHVlLnRpbWUuX3ZhbHVlID4gYi52YWx1ZS50aW1lLl92YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGEudmFsdWUudGltZS5fdmFsdWUgPCBiLnZhbHVlLnRpbWUuX3ZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxheW91dC5tYXAoKGx0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdHJhY2sgPSBuZXcgbWlkaS5UcmFjaygpLFxuICAgICAgICAgICAgICAgIGxhc3RfdCA9IDA7XG4gICAgICAgICAgICBsdC5tYXAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXZlbnRfdmFsID0gZXZlbnQudmFsdWUuX3ZhbHVlO1xuICAgICAgICAgICAgICAgIHRpY2tzICs9IGV2ZW50LnZhbHVlLnRpbWUubm9ybWFsaXplZCgpICogdGlja3NQZXJTZWM7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50X3ZhbCBpbnN0YW5jZW9mIE5vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGROb3RlT24oMCwgZXZlbnRfdmFsLnRvTWlkaSgpLCB0aWNrcyAtIGxhc3RfdCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGROb3RlT2ZmKDAsIGV2ZW50X3ZhbC50b01pZGkoKSwgdGlja3MgLSBsYXN0X3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldmVudC52YWx1ZS5fdmFsdWUgaW5zdGFuY2VvZiBDaG9yZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPOiBwcm9wZXJseSBpbXBsZW1lbnQgY2hvcmRzXG4gICAgICAgICAgICAgICAgICAgIC8vIHRyYWNrLmFkZENob3JkKDAsIGV2ZW50X3ZhbC50b01pZGkoKSwgdGlja3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXN0X3QgPSB0aWNrcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZmlsZS5hZGRUcmFjayh0cmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmcy53cml0ZUZpbGUoZmlsZW5hbWUsIGZpbGUudG9CeXRlcygpLCAnYmluYXJ5Jyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNaWRpRmlsZTsiXX0=
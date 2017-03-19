'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TICKS_PER_BEAT = 128;

var MidiFile = function () {
    function MidiFile() {
        _classCallCheck(this, MidiFile);
    }

    _createClass(MidiFile, null, [{
        key: 'write',
        value: function write(data, filename) {
            (0, _assert2.default)(data instanceof _Song2.default, 'MIDI data must be of type Song, is ' + (typeof data === 'undefined' ? 'undefined' : _typeof(data)));
            (0, _assert2.default)(typeof filename === 'string', 'MIDI filename must be string, is ' + (typeof filename === 'undefined' ? 'undefined' : _typeof(filename)));

            var ticksPerSec = data.bpm * TICKS_PER_BEAT / 60.0,
                layout = [],
                file = new midi.File();

            data.all.map(function (channel) {
                var lt = [];

                channel.all.map(function (event) {
                    (0, _assert2.default)(event instanceof _TonalEvent2.default);

                    var values = [];

                    if (event.value instanceof _Note2.default) {
                        values.push(event.value);
                    } else if (event.value instanceof _Chord2.default) {
                        values = event.value.getNotesFromOctave();
                    }

                    values.forEach(function (value) {
                        lt.push({
                            value: new _TonalEvent2.default(new _Time2.default(event.time.normalized(), event.time.defaultUnit), value, new _Time2.default(event.duration.normalized(), event.duration.defaultUnit)),
                            on: true
                        });

                        lt.push({
                            value: new _TonalEvent2.default(new _Time2.default(event.time.normalized() + event.duration.normalized(), event.time.defaultUnit), value, new _Time2.default(0.0, event.time.defaultUnit)),
                            on: false
                        });
                    });
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
                    ticks = 0,
                    last_ticks = 0,
                    last_v = 0;

                lt.map(function (event) {
                    var event_val = event.value.value;

                    if (event.value.time.value !== last_v) {
                        last_v = event.value.time.value;
                        ticks = event.value.time.normalized() * ticksPerSec;
                    }

                    if (event_val instanceof _Note2.default) {
                        if (event.on) {
                            track.addNoteOn(0, event_val.toMidi(), ticks - last_ticks);
                        } else {
                            track.addNoteOff(0, event_val.toMidi(), ticks - last_ticks);
                        }
                    }

                    last_ticks = ticks;
                });

                file.addTrack(track);
            });

            return _fs2.default.writeFile(filename, file.toBytes(), 'binary');
        }
    }]);

    return MidiFile;
}();

exports.default = MidiFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvTWlkaUZpbGUuanMiXSwibmFtZXMiOlsibWlkaSIsIlRJQ0tTX1BFUl9CRUFUIiwiTWlkaUZpbGUiLCJkYXRhIiwiZmlsZW5hbWUiLCJ0aWNrc1BlclNlYyIsImJwbSIsImxheW91dCIsImZpbGUiLCJGaWxlIiwiYWxsIiwibWFwIiwiY2hhbm5lbCIsImx0IiwiZXZlbnQiLCJ2YWx1ZXMiLCJ2YWx1ZSIsInB1c2giLCJnZXROb3Rlc0Zyb21PY3RhdmUiLCJmb3JFYWNoIiwidGltZSIsIm5vcm1hbGl6ZWQiLCJkZWZhdWx0VW5pdCIsImR1cmF0aW9uIiwib24iLCJzb3J0IiwiYSIsImIiLCJ0cmFjayIsIlRyYWNrIiwidGlja3MiLCJsYXN0X3RpY2tzIiwibGFzdF92IiwiZXZlbnRfdmFsIiwiYWRkTm90ZU9uIiwidG9NaWRpIiwiYWRkTm90ZU9mZiIsImFkZFRyYWNrIiwid3JpdGVGaWxlIiwidG9CeXRlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7SUFBWUEsSTs7QUFDWjs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7O0FBRUEsSUFBTUMsaUJBQWlCLEdBQXZCOztJQUVNQyxROzs7Ozs7OzhCQUNXQyxJLEVBQU1DLFEsRUFBVTtBQUN6QixrQ0FBT0QsOEJBQVAsa0RBQTBFQSxJQUExRSx5Q0FBMEVBLElBQTFFO0FBQ0Esa0NBQU8sT0FBT0MsUUFBUCxLQUFvQixRQUEzQixnREFBZ0ZBLFFBQWhGLHlDQUFnRkEsUUFBaEY7O0FBRUEsZ0JBQUlDLGNBQWVGLEtBQUtHLEdBQUwsR0FBV0wsY0FBWixHQUE4QixJQUFoRDtBQUFBLGdCQUNJTSxTQUFTLEVBRGI7QUFBQSxnQkFFSUMsT0FBTyxJQUFJUixLQUFLUyxJQUFULEVBRlg7O0FBSUFOLGlCQUFLTyxHQUFMLENBQVNDLEdBQVQsQ0FBYSxVQUFDQyxPQUFELEVBQWE7QUFDdEIsb0JBQUlDLEtBQUssRUFBVDs7QUFFQUQsd0JB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O0FBbUJBdEIscUJBQUs2QixRQUFMLENBQWNULEtBQWQ7QUFDSCxhQXhCRDs7QUEwQkEsbUJBQU8sYUFBR1UsU0FBSCxDQUFhbEMsUUFBYixFQUF1QkksS0FBSytCLE9BQUwsRUFBdkIsRUFBdUMsUUFBdkMsQ0FBUDtBQUNIOzs7Ozs7a0JBR1VyQyxRIiwiZmlsZSI6ImlvL2ZpbGUvTWlkaUZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgZnMgZnJvbSAncG4vZnMnO1xuaW1wb3J0ICogYXMgbWlkaSBmcm9tICdqc21pZGdlbic7XG5pbXBvcnQgU29uZyBmcm9tICcuLi8uLi9kYXRhL1NvbmcnO1xuaW1wb3J0IE5vdGUgZnJvbSAnLi4vLi4vaGFybW9uaWNzL05vdGUnO1xuaW1wb3J0IENob3JkIGZyb20gJy4uLy4uL2hhcm1vbmljcy9DaG9yZCc7XG5pbXBvcnQgVG9uYWxFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvVG9uYWxFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuXG5jb25zdCBUSUNLU19QRVJfQkVBVCA9IDEyODtcblxuY2xhc3MgTWlkaUZpbGUge1xuICAgIHN0YXRpYyB3cml0ZShkYXRhLCBmaWxlbmFtZSkge1xuICAgICAgICBhc3NlcnQoZGF0YSBpbnN0YW5jZW9mIFNvbmcsIGBNSURJIGRhdGEgbXVzdCBiZSBvZiB0eXBlIFNvbmcsIGlzICR7dHlwZW9mIGRhdGF9YCk7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgZmlsZW5hbWUgPT09ICdzdHJpbmcnLCBgTUlESSBmaWxlbmFtZSBtdXN0IGJlIHN0cmluZywgaXMgJHt0eXBlb2YgZmlsZW5hbWV9YCk7XG5cbiAgICAgICAgbGV0IHRpY2tzUGVyU2VjID0gKGRhdGEuYnBtICogVElDS1NfUEVSX0JFQVQpIC8gNjAuMCxcbiAgICAgICAgICAgIGxheW91dCA9IFtdLFxuICAgICAgICAgICAgZmlsZSA9IG5ldyBtaWRpLkZpbGUoKTtcblxuICAgICAgICBkYXRhLmFsbC5tYXAoKGNoYW5uZWwpID0+IHtcbiAgICAgICAgICAgIGxldCBsdCA9IFtdO1xuXG4gICAgICAgICAgICBjaGFubmVsLmFsbC5tYXAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGV2ZW50IGluc3RhbmNlb2YgVG9uYWxFdmVudCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVzID0gW107XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQudmFsdWUgaW5zdGFuY2VvZiBOb3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGV2ZW50LnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LnZhbHVlIGluc3RhbmNlb2YgQ2hvcmQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gZXZlbnQudmFsdWUuZ2V0Tm90ZXNGcm9tT2N0YXZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFsdWVzLmZvckVhY2godmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXcgVG9uYWxFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGltZShldmVudC50aW1lLm5vcm1hbGl6ZWQoKSwgZXZlbnQudGltZS5kZWZhdWx0VW5pdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRpbWUoZXZlbnQuZHVyYXRpb24ubm9ybWFsaXplZCgpLCBldmVudC5kdXJhdGlvbi5kZWZhdWx0VW5pdClcbiAgICAgICAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgICAgICAgICBvbjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBuZXcgVG9uYWxFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGltZShldmVudC50aW1lLm5vcm1hbGl6ZWQoKSArIGV2ZW50LmR1cmF0aW9uLm5vcm1hbGl6ZWQoKSwgZXZlbnQudGltZS5kZWZhdWx0VW5pdCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFRpbWUoMC4wLCBldmVudC50aW1lLmRlZmF1bHRVbml0KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsYXlvdXQucHVzaChsdC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGEudmFsdWUudGltZS5ub3JtYWxpemVkKCkgPiBiLnZhbHVlLnRpbWUubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoYS52YWx1ZS50aW1lLm5vcm1hbGl6ZWQoKSA8IGIudmFsdWUudGltZS5ub3JtYWxpemVkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5b3V0Lm1hcCgobHQpID0+IHtcbiAgICAgICAgICAgIGxldCB0cmFjayA9IG5ldyBtaWRpLlRyYWNrKCksXG4gICAgICAgICAgICAgICAgdGlja3MgPSAwLCBsYXN0X3RpY2tzID0gMCwgbGFzdF92ID0gMDtcblxuICAgICAgICAgICAgbHQubWFwKChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50X3ZhbCA9IGV2ZW50LnZhbHVlLnZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnZhbHVlLnRpbWUudmFsdWUgIT09IGxhc3Rfdikge1xuICAgICAgICAgICAgICAgICAgICBsYXN0X3YgPSBldmVudC52YWx1ZS50aW1lLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aWNrcyA9IGV2ZW50LnZhbHVlLnRpbWUubm9ybWFsaXplZCgpICogdGlja3NQZXJTZWM7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50X3ZhbCBpbnN0YW5jZW9mIE5vdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGROb3RlT24oMCwgZXZlbnRfdmFsLnRvTWlkaSgpLCB0aWNrcyAtIGxhc3RfdGlja3MpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2suYWRkTm90ZU9mZigwLCBldmVudF92YWwudG9NaWRpKCksIHRpY2tzIC0gbGFzdF90aWNrcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsYXN0X3RpY2tzID0gdGlja3M7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZmlsZS5hZGRUcmFjayh0cmFjayk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBmcy53cml0ZUZpbGUoZmlsZW5hbWUsIGZpbGUudG9CeXRlcygpLCAnYmluYXJ5Jyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNaWRpRmlsZTsiXX0=
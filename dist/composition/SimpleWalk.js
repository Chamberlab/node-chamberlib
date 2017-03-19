'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Track = require('../data/Track');

var _Track2 = _interopRequireDefault(_Track);

var _BaseCollection = require('../data/BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _TonalEvent = require('../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

var _harmonics = require('../harmonics');

var _harmonics2 = _interopRequireDefault(_harmonics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleWalk = function () {
    function SimpleWalk() {
        var useChords = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Major';
        var baseNote = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, SimpleWalk);

        this.useChords = useChords;
        this.scale = scale;
        this.baseNote = baseNote instanceof _harmonics2.default.Note ? baseNote : new _harmonics2.default.Note('C4');
    }

    _createClass(SimpleWalk, [{
        key: 'makeTrack',
        value: function makeTrack(dataEvents) {
            var threshold = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.7;
            var interval = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'P5';

            var _this = this;

            var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
            var chordSelectHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

            (0, _assert2.default)(Array.isArray(dataEvents) || dataEvents instanceof _BaseCollection2.default, 'dataEvents must be Array or BaseCollection, is ' + (typeof dataEvents === 'undefined' ? 'undefined' : _typeof(dataEvents)));

            var tonalEvents = [],
                octave = this.baseNote.octave;

            if (typeof duration === 'undefined') {
                duration = new _Time2.default(1 / 16, 's');
            }

            dataEvents.forEach(function (event) {
                var tonalValue = void 0,
                    intervalValue = typeof interval === 'function' ? interval(event) : interval,
                    durationValue = typeof duration === 'function' ? duration(event) : duration;

                if (event.value.value >= threshold) {
                    _this.baseNote.transpose(new _harmonics2.default.Interval(intervalValue), true);
                }

                if (_this.useChords) {
                    var chords = _harmonics2.default.Chord.getChordNames(_this.scale, _this.baseNote.key);
                    if (chords.length > 0) {
                        if (typeof chordSelectHandler === 'function') {
                            tonalValue = new _harmonics2.default.Chord(chordSelectHandler(chords), undefined, octave);
                        } else {
                            tonalValue = new _harmonics2.default.Chord(chords[0], undefined, octave);
                        }
                    }
                } else {
                    tonalValue = new _harmonics2.default.Note(_this.baseNote.key, octave);
                }

                if (typeof tonalValue !== 'undefined') {
                    tonalEvents.push(new _TonalEvent2.default(new _Time2.default(event.time.normalized(), 's'), tonalValue, durationValue));
                }
            });

            return new _Track2.default(tonalEvents);
        }
    }]);

    return SimpleWalk;
}();

exports.default = SimpleWalk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvc2l0aW9uL1NpbXBsZVdhbGsuanMiXSwibmFtZXMiOlsiU2ltcGxlV2FsayIsInVzZUNob3JkcyIsInNjYWxlIiwiYmFzZU5vdGUiLCJ1bmRlZmluZWQiLCJOb3RlIiwiZGF0YUV2ZW50cyIsInRocmVzaG9sZCIsImludGVydmFsIiwiZHVyYXRpb24iLCJjaG9yZFNlbGVjdEhhbmRsZXIiLCJBcnJheSIsImlzQXJyYXkiLCJ0b25hbEV2ZW50cyIsIm9jdGF2ZSIsImZvckVhY2giLCJ0b25hbFZhbHVlIiwiaW50ZXJ2YWxWYWx1ZSIsImV2ZW50IiwiZHVyYXRpb25WYWx1ZSIsInZhbHVlIiwidHJhbnNwb3NlIiwiSW50ZXJ2YWwiLCJjaG9yZHMiLCJDaG9yZCIsImdldENob3JkTmFtZXMiLCJrZXkiLCJsZW5ndGgiLCJwdXNoIiwidGltZSIsIm5vcm1hbGl6ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLFU7QUFDRiwwQkFBc0U7QUFBQSxZQUExREMsU0FBMEQsdUVBQTlDLEtBQThDO0FBQUEsWUFBdkNDLEtBQXVDLHVFQUEvQixPQUErQjtBQUFBLFlBQXRCQyxRQUFzQix1RUFBWEMsU0FBVzs7QUFBQTs7QUFDbEUsYUFBS0gsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxhQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxhQUFLQyxRQUFMLEdBQWdCQSxvQkFBb0Isb0JBQVVFLElBQTlCLEdBQXFDRixRQUFyQyxHQUFnRCxJQUFJLG9CQUFVRSxJQUFkLENBQW1CLElBQW5CLENBQWhFO0FBQ0g7Ozs7a0NBRVNDLFUsRUFBb0c7QUFBQSxnQkFBeEZDLFNBQXdGLHVFQUE1RSxHQUE0RTtBQUFBLGdCQUF2RUMsUUFBdUUsdUVBQTVELElBQTREOztBQUFBOztBQUFBLGdCQUF0REMsUUFBc0QsdUVBQTNDTCxTQUEyQztBQUFBLGdCQUFoQ00sa0JBQWdDLHVFQUFYTixTQUFXOztBQUMxRyxrQ0FBT08sTUFBTUMsT0FBTixDQUFjTixVQUFkLEtBQTZCQSw4Q0FBcEMsOERBQzZEQSxVQUQ3RCx5Q0FDNkRBLFVBRDdEOztBQUdBLGdCQUFNTyxjQUFjLEVBQXBCO0FBQUEsZ0JBQ0lDLFNBQVMsS0FBS1gsUUFBTCxDQUFjVyxNQUQzQjs7QUFHQSxnQkFBSSxPQUFPTCxRQUFQLEtBQW9CLFdBQXhCLEVBQXFDO0FBQ2pDQSwyQkFBVyxtQkFBUyxJQUFJLEVBQWIsRUFBaUIsR0FBakIsQ0FBWDtBQUNIOztBQUVESCx1QkFBV1MsT0FBWCxDQUFtQixpQkFBUztBQUN4QixvQkFBSUMsbUJBQUo7QUFBQSxvQkFDSUMsZ0JBQWdCLE9BQU9ULFFBQVAsS0FBb0IsVUFBcEIsR0FBaUNBLFNBQVNVLEtBQVQsQ0FBakMsR0FBbURWLFFBRHZFO0FBQUEsb0JBRUlXLGdCQUFnQixPQUFPVixRQUFQLEtBQW9CLFVBQXBCLEdBQWlDQSxTQUFTUyxLQUFULENBQWpDLEdBQW1EVCxRQUZ2RTs7QUFJQSxvQkFBSVMsTUFBTUUsS0FBTixDQUFZQSxLQUFaLElBQXFCYixTQUF6QixFQUFvQztBQUNoQywwQkFBS0osUUFBTCxDQUFja0IsU0FBZCxDQUF3QixJQUFJLG9CQUFVQyxRQUFkLENBQXVCTCxhQUF2QixDQUF4QixFQUErRCxJQUEvRDtBQUNIOztBQUVELG9CQUFJLE1BQUtoQixTQUFULEVBQW9CO0FBQ2hCLHdCQUFNc0IsU0FBUyxvQkFBVUMsS0FBVixDQUFnQkMsYUFBaEIsQ0FBOEIsTUFBS3ZCLEtBQW5DLEVBQTBDLE1BQUtDLFFBQUwsQ0FBY3VCLEdBQXhELENBQWY7QUFDQSx3QkFBSUgsT0FBT0ksTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNuQiw0QkFBSSxPQUFPakIsa0JBQVAsS0FBOEIsVUFBbEMsRUFBOEM7QUFDMUNNLHlDQUFhLElBQUksb0JBQVVRLEtBQWQsQ0FBb0JkLG1CQUFtQmEsTUFBbkIsQ0FBcEIsRUFBZ0RuQixTQUFoRCxFQUEyRFUsTUFBM0QsQ0FBYjtBQUNILHlCQUZELE1BRU87QUFDSEUseUNBQWEsSUFBSSxvQkFBVVEsS0FBZCxDQUFvQkQsT0FBTyxDQUFQLENBQXBCLEVBQStCbkIsU0FBL0IsRUFBMENVLE1BQTFDLENBQWI7QUFDSDtBQUNKO0FBQ0osaUJBVEQsTUFTTztBQUNIRSxpQ0FBYSxJQUFJLG9CQUFVWCxJQUFkLENBQW1CLE1BQUtGLFFBQUwsQ0FBY3VCLEdBQWpDLEVBQXNDWixNQUF0QyxDQUFiO0FBQ0g7O0FBRUQsb0JBQUksT0FBT0UsVUFBUCxLQUFzQixXQUExQixFQUF1QztBQUNuQ0gsZ0NBQVllLElBQVosQ0FBaUIseUJBQ2IsbUJBQVNWLE1BQU1XLElBQU4sQ0FBV0MsVUFBWCxFQUFULEVBQWtDLEdBQWxDLENBRGEsRUFFYmQsVUFGYSxFQUdiRyxhQUhhLENBQWpCO0FBS0g7QUFDSixhQTdCRDs7QUErQkEsbUJBQU8sb0JBQVVOLFdBQVYsQ0FBUDtBQUNIOzs7Ozs7a0JBR1ViLFUiLCJmaWxlIjoiY29tcG9zaXRpb24vU2ltcGxlV2Fsay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IFRyYWNrIGZyb20gJy4uL2RhdGEvVHJhY2snO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gJy4uL2RhdGEvQmFzZUNvbGxlY3Rpb24nO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBUb25hbEV2ZW50IGZyb20gJy4uL2V2ZW50cy9Ub25hbEV2ZW50JztcbmltcG9ydCBoYXJtb25pY3MgZnJvbSAnLi4vaGFybW9uaWNzJztcblxuY2xhc3MgU2ltcGxlV2FsayB7XG4gICAgY29uc3RydWN0b3IodXNlQ2hvcmRzID0gZmFsc2UsIHNjYWxlID0gJ01ham9yJywgYmFzZU5vdGUgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy51c2VDaG9yZHMgPSB1c2VDaG9yZHM7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBzY2FsZTtcbiAgICAgICAgdGhpcy5iYXNlTm90ZSA9IGJhc2VOb3RlIGluc3RhbmNlb2YgaGFybW9uaWNzLk5vdGUgPyBiYXNlTm90ZSA6IG5ldyBoYXJtb25pY3MuTm90ZSgnQzQnKTtcbiAgICB9XG5cbiAgICBtYWtlVHJhY2soZGF0YUV2ZW50cywgdGhyZXNob2xkID0gMC43LCBpbnRlcnZhbCA9ICdQNScsIGR1cmF0aW9uID0gdW5kZWZpbmVkLCBjaG9yZFNlbGVjdEhhbmRsZXIgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0KEFycmF5LmlzQXJyYXkoZGF0YUV2ZW50cykgfHwgZGF0YUV2ZW50cyBpbnN0YW5jZW9mIEJhc2VDb2xsZWN0aW9uLFxuICAgICAgICAgICAgYGRhdGFFdmVudHMgbXVzdCBiZSBBcnJheSBvciBCYXNlQ29sbGVjdGlvbiwgaXMgJHt0eXBlb2YgZGF0YUV2ZW50c31gKTtcblxuICAgICAgICBjb25zdCB0b25hbEV2ZW50cyA9IFtdLFxuICAgICAgICAgICAgb2N0YXZlID0gdGhpcy5iYXNlTm90ZS5vY3RhdmU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gbmV3IFRpbWUoMSAvIDE2LCAncycpO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YUV2ZW50cy5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCB0b25hbFZhbHVlLFxuICAgICAgICAgICAgICAgIGludGVydmFsVmFsdWUgPSB0eXBlb2YgaW50ZXJ2YWwgPT09ICdmdW5jdGlvbicgPyBpbnRlcnZhbChldmVudCkgOiBpbnRlcnZhbCxcbiAgICAgICAgICAgICAgICBkdXJhdGlvblZhbHVlID0gdHlwZW9mIGR1cmF0aW9uID09PSAnZnVuY3Rpb24nID8gZHVyYXRpb24oZXZlbnQpIDogZHVyYXRpb247XG5cbiAgICAgICAgICAgIGlmIChldmVudC52YWx1ZS52YWx1ZSA+PSB0aHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJhc2VOb3RlLnRyYW5zcG9zZShuZXcgaGFybW9uaWNzLkludGVydmFsKGludGVydmFsVmFsdWUpLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMudXNlQ2hvcmRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2hvcmRzID0gaGFybW9uaWNzLkNob3JkLmdldENob3JkTmFtZXModGhpcy5zY2FsZSwgdGhpcy5iYXNlTm90ZS5rZXkpO1xuICAgICAgICAgICAgICAgIGlmIChjaG9yZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNob3JkU2VsZWN0SGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9uYWxWYWx1ZSA9IG5ldyBoYXJtb25pY3MuQ2hvcmQoY2hvcmRTZWxlY3RIYW5kbGVyKGNob3JkcyksIHVuZGVmaW5lZCwgb2N0YXZlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvbmFsVmFsdWUgPSBuZXcgaGFybW9uaWNzLkNob3JkKGNob3Jkc1swXSwgdW5kZWZpbmVkLCBvY3RhdmUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0b25hbFZhbHVlID0gbmV3IGhhcm1vbmljcy5Ob3RlKHRoaXMuYmFzZU5vdGUua2V5LCBvY3RhdmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHRvbmFsVmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdG9uYWxFdmVudHMucHVzaChuZXcgVG9uYWxFdmVudChcbiAgICAgICAgICAgICAgICAgICAgbmV3IFRpbWUoZXZlbnQudGltZS5ub3JtYWxpemVkKCksICdzJyksXG4gICAgICAgICAgICAgICAgICAgIHRvbmFsVmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uVmFsdWVcbiAgICAgICAgICAgICAgICApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUcmFjayh0b25hbEV2ZW50cyk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaW1wbGVXYWxrOyJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _JSONFile2 = require('../file/JSONFile');

var _JSONFile3 = _interopRequireDefault(_JSONFile2);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SpiketrainsOE = function (_JSONFile) {
    _inherits(SpiketrainsOE, _JSONFile);

    function SpiketrainsOE() {
        _classCallCheck(this, SpiketrainsOE);

        return _possibleConstructorReturn(this, (SpiketrainsOE.__proto__ || Object.getPrototypeOf(SpiketrainsOE)).call(this));
    }

    _createClass(SpiketrainsOE, [{
        key: 'read',
        value: function read(file) {
            return _get(SpiketrainsOE.prototype.__proto__ || Object.getPrototypeOf(SpiketrainsOE.prototype), 'read', this).call(this, file).then(function (data) {
                (0, _assert2.default)(Array.isArray(data));
                var channels = [];

                return _bluebird2.default.map(data, function (group) {
                    return _bluebird2.default.map(group.units, function (unit) {
                        var channel = new _DataChannel2.default();

                        return _bluebird2.default.map(unit.spiketrains, function (sptr) {
                            (0, _assert2.default)(Array.isArray(sptr.times) && Array.isArray(sptr.waveforms));
                            (0, _assert2.default)(sptr.times.length === sptr.waveforms.length);

                            return _bluebird2.default.map(sptr.waveforms, function (wf, i) {
                                var val_diff = wf.max - wf.min,
                                    event = new _DataEvent2.default(new _Time2.default(sptr.times[i], 's'), new _Voltage2.default(val_diff, 'mv'));
                                channel.push(event);
                            });
                        }).then(function () {
                            channels.push(channel);
                        });
                    });
                }).then(function () {
                    return channels;
                });
            });
        }
    }]);

    return SpiketrainsOE;
}(_JSONFile3.default);

exports.default = SpiketrainsOE;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ltcG9ydGVycy9TcGlrZXRyYWluc09FLmpzIl0sIm5hbWVzIjpbIlNwaWtldHJhaW5zT0UiLCJmaWxlIiwidGhlbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJjaGFubmVscyIsIm1hcCIsImdyb3VwIiwidW5pdHMiLCJ1bml0IiwiY2hhbm5lbCIsInNwaWtldHJhaW5zIiwic3B0ciIsInRpbWVzIiwid2F2ZWZvcm1zIiwibGVuZ3RoIiwid2YiLCJpIiwidmFsX2RpZmYiLCJtYXgiLCJtaW4iLCJldmVudCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLGE7OztBQUNGLDZCQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs2QkFFSUMsSSxFQUFNO0FBQ1AsbUJBQU8sbUhBQVdBLElBQVgsRUFDRkMsSUFERSxDQUNHLFVBQUNDLElBQUQsRUFBVTtBQUNaLHNDQUFPQyxNQUFNQyxPQUFOLENBQWNGLElBQWQsQ0FBUDtBQUNBLG9CQUFJRyxXQUFXLEVBQWY7O0FBRUEsdUJBQU8sbUJBQVFDLEdBQVIsQ0FBWUosSUFBWixFQUFrQixVQUFVSyxLQUFWLEVBQWlCO0FBQ3RDLDJCQUFPLG1CQUFRRCxHQUFSLENBQVlDLE1BQU1DLEtBQWxCLEVBQXlCLFVBQVVDLElBQVYsRUFBZ0I7QUFDNUMsNEJBQUlDLFVBQVUsMkJBQWQ7O0FBRUEsK0JBQU8sbUJBQVFKLEdBQVIsQ0FBWUcsS0FBS0UsV0FBakIsRUFBOEIsVUFBVUMsSUFBVixFQUFnQjtBQUNqRCxrREFBT1QsTUFBTUMsT0FBTixDQUFjUSxLQUFLQyxLQUFuQixLQUE2QlYsTUFBTUMsT0FBTixDQUFjUSxLQUFLRSxTQUFuQixDQUFwQztBQUNBLGtEQUFPRixLQUFLQyxLQUFMLENBQVdFLE1BQVgsS0FBc0JILEtBQUtFLFNBQUwsQ0FBZUMsTUFBNUM7O0FBRUEsbUNBQU8sbUJBQVFULEdBQVIsQ0FBWU0sS0FBS0UsU0FBakIsRUFBNEIsVUFBVUUsRUFBVixFQUFjQyxDQUFkLEVBQWlCO0FBQ2hELG9DQUFJQyxXQUFXRixHQUFHRyxHQUFILEdBQVNILEdBQUdJLEdBQTNCO0FBQUEsb0NBQ0lDLFFBQVEsd0JBQ0osbUJBQVNULEtBQUtDLEtBQUwsQ0FBV0ksQ0FBWCxDQUFULEVBQXdCLEdBQXhCLENBREksRUFFSixzQkFBWUMsUUFBWixFQUFzQixJQUF0QixDQUZJLENBRFo7QUFLQVIsd0NBQVFZLElBQVIsQ0FBYUQsS0FBYjtBQUNILDZCQVBNLENBQVA7QUFRSCx5QkFaTSxFQWFGcEIsSUFiRSxDQWFHLFlBQVk7QUFDZEkscUNBQVNpQixJQUFULENBQWNaLE9BQWQ7QUFDSCx5QkFmRSxDQUFQO0FBZ0JILHFCQW5CTSxDQUFQO0FBb0JILGlCQXJCTSxFQXNCTlQsSUF0Qk0sQ0FzQkQsWUFBWTtBQUNkLDJCQUFPSSxRQUFQO0FBQ0gsaUJBeEJNLENBQVA7QUF5QkgsYUE5QkUsQ0FBUDtBQStCSDs7Ozs7O2tCQUdVTixhIiwiZmlsZSI6ImlvL2ltcG9ydGVycy9TcGlrZXRyYWluc09FLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5pbXBvcnQgSlNPTkZpbGUgZnJvbSAnLi4vZmlsZS9KU09ORmlsZSc7XG5pbXBvcnQgRGF0YUV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRXZlbnQnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5pbXBvcnQgRGF0YUNoYW5uZWwgZnJvbSAnLi4vLi4vZGF0YS9EYXRhQ2hhbm5lbCc7XG5cbmNsYXNzIFNwaWtldHJhaW5zT0UgZXh0ZW5kcyBKU09ORmlsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZChmaWxlKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5yZWFkKGZpbGUpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydChBcnJheS5pc0FycmF5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChkYXRhLCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UubWFwKGdyb3VwLnVuaXRzLCBmdW5jdGlvbiAodW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWwgPSBuZXcgRGF0YUNoYW5uZWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UubWFwKHVuaXQuc3Bpa2V0cmFpbnMsIGZ1bmN0aW9uIChzcHRyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KEFycmF5LmlzQXJyYXkoc3B0ci50aW1lcykgJiYgQXJyYXkuaXNBcnJheShzcHRyLndhdmVmb3JtcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChzcHRyLnRpbWVzLmxlbmd0aCA9PT0gc3B0ci53YXZlZm9ybXMubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChzcHRyLndhdmVmb3JtcywgZnVuY3Rpb24gKHdmLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWxfZGlmZiA9IHdmLm1heCAtIHdmLm1pbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IERhdGFFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGltZShzcHRyLnRpbWVzW2ldLCAncycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWb2x0YWdlKHZhbF9kaWZmLCAnbXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVscy5wdXNoKGNoYW5uZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWxzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlrZXRyYWluc09FOyJdfQ==
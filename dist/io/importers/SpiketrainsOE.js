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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

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

var SpiketrainsOE = function (_JSONFile) {
    (0, _inherits3.default)(SpiketrainsOE, _JSONFile);

    function SpiketrainsOE() {
        (0, _classCallCheck3.default)(this, SpiketrainsOE);
        return (0, _possibleConstructorReturn3.default)(this, (SpiketrainsOE.__proto__ || (0, _getPrototypeOf2.default)(SpiketrainsOE)).call(this));
    }

    (0, _createClass3.default)(SpiketrainsOE, [{
        key: 'read',
        value: function read(file) {
            return (0, _get3.default)(SpiketrainsOE.prototype.__proto__ || (0, _getPrototypeOf2.default)(SpiketrainsOE.prototype), 'read', this).call(this, file).then(function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ltcG9ydGVycy9TcGlrZXRyYWluc09FLmpzIl0sIm5hbWVzIjpbIlNwaWtldHJhaW5zT0UiLCJmaWxlIiwidGhlbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJjaGFubmVscyIsIm1hcCIsImdyb3VwIiwidW5pdHMiLCJ1bml0IiwiY2hhbm5lbCIsInNwaWtldHJhaW5zIiwic3B0ciIsInRpbWVzIiwid2F2ZWZvcm1zIiwibGVuZ3RoIiwid2YiLCJpIiwidmFsX2RpZmYiLCJtYXgiLCJtaW4iLCJldmVudCIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsYTs7O0FBQ0YsNkJBQWM7QUFBQTtBQUFBO0FBRWI7Ozs7NkJBRUlDLEksRUFBTTtBQUNQLG1CQUFPLHlJQUFXQSxJQUFYLEVBQ0ZDLElBREUsQ0FDRyxVQUFDQyxJQUFELEVBQVU7QUFDWixzQ0FBT0MsTUFBTUMsT0FBTixDQUFjRixJQUFkLENBQVA7QUFDQSxvQkFBSUcsV0FBVyxFQUFmOztBQUVBLHVCQUFPLG1CQUFRQyxHQUFSLENBQVlKLElBQVosRUFBa0IsVUFBVUssS0FBVixFQUFpQjtBQUN0QywyQkFBTyxtQkFBUUQsR0FBUixDQUFZQyxNQUFNQyxLQUFsQixFQUF5QixVQUFVQyxJQUFWLEVBQWdCO0FBQzVDLDRCQUFJQyxVQUFVLDJCQUFkOztBQUVBLCtCQUFPLG1CQUFRSixHQUFSLENBQVlHLEtBQUtFLFdBQWpCLEVBQThCLFVBQVVDLElBQVYsRUFBZ0I7QUFDakQsa0RBQU9ULE1BQU1DLE9BQU4sQ0FBY1EsS0FBS0MsS0FBbkIsS0FBNkJWLE1BQU1DLE9BQU4sQ0FBY1EsS0FBS0UsU0FBbkIsQ0FBcEM7QUFDQSxrREFBT0YsS0FBS0MsS0FBTCxDQUFXRSxNQUFYLEtBQXNCSCxLQUFLRSxTQUFMLENBQWVDLE1BQTVDOztBQUVBLG1DQUFPLG1CQUFRVCxHQUFSLENBQVlNLEtBQUtFLFNBQWpCLEVBQTRCLFVBQVVFLEVBQVYsRUFBY0MsQ0FBZCxFQUFpQjtBQUNoRCxvQ0FBSUMsV0FBV0YsR0FBR0csR0FBSCxHQUFTSCxHQUFHSSxHQUEzQjtBQUFBLG9DQUNJQyxRQUFRLHdCQUNKLG1CQUFTVCxLQUFLQyxLQUFMLENBQVdJLENBQVgsQ0FBVCxFQUF3QixHQUF4QixDQURJLEVBRUosc0JBQVlDLFFBQVosRUFBc0IsSUFBdEIsQ0FGSSxDQURaO0FBS0FSLHdDQUFRWSxJQUFSLENBQWFELEtBQWI7QUFDSCw2QkFQTSxDQUFQO0FBUUgseUJBWk0sRUFhRnBCLElBYkUsQ0FhRyxZQUFZO0FBQ2RJLHFDQUFTaUIsSUFBVCxDQUFjWixPQUFkO0FBQ0gseUJBZkUsQ0FBUDtBQWdCSCxxQkFuQk0sQ0FBUDtBQW9CSCxpQkFyQk0sRUFzQk5ULElBdEJNLENBc0JELFlBQVk7QUFDZCwyQkFBT0ksUUFBUDtBQUNILGlCQXhCTSxDQUFQO0FBeUJILGFBOUJFLENBQVA7QUErQkg7Ozs7O2tCQUdVTixhIiwiZmlsZSI6ImlvL2ltcG9ydGVycy9TcGlrZXRyYWluc09FLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuXG5pbXBvcnQgSlNPTkZpbGUgZnJvbSAnLi4vZmlsZS9KU09ORmlsZSc7XG5pbXBvcnQgRGF0YUV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRXZlbnQnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5pbXBvcnQgRGF0YUNoYW5uZWwgZnJvbSAnLi4vLi4vZGF0YS9EYXRhQ2hhbm5lbCc7XG5cbmNsYXNzIFNwaWtldHJhaW5zT0UgZXh0ZW5kcyBKU09ORmlsZSB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcmVhZChmaWxlKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5yZWFkKGZpbGUpXG4gICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgIGFzc2VydChBcnJheS5pc0FycmF5KGRhdGEpKTtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChkYXRhLCBmdW5jdGlvbiAoZ3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UubWFwKGdyb3VwLnVuaXRzLCBmdW5jdGlvbiAodW5pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoYW5uZWwgPSBuZXcgRGF0YUNoYW5uZWwoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UubWFwKHVuaXQuc3Bpa2V0cmFpbnMsIGZ1bmN0aW9uIChzcHRyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXNzZXJ0KEFycmF5LmlzQXJyYXkoc3B0ci50aW1lcykgJiYgQXJyYXkuaXNBcnJheShzcHRyLndhdmVmb3JtcykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzc2VydChzcHRyLnRpbWVzLmxlbmd0aCA9PT0gc3B0ci53YXZlZm9ybXMubGVuZ3RoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLm1hcChzcHRyLndhdmVmb3JtcywgZnVuY3Rpb24gKHdmLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWxfZGlmZiA9IHdmLm1heCAtIHdmLm1pbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gbmV3IERhdGFFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGltZShzcHRyLnRpbWVzW2ldLCAncycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWb2x0YWdlKHZhbF9kaWZmLCAnbXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVscy5wdXNoKGNoYW5uZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoYW5uZWxzO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTcGlrZXRyYWluc09FOyJdfQ==
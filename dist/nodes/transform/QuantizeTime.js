'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _BaseTransformNode2 = require('./BaseTransformNode');

var _BaseTransformNode3 = _interopRequireDefault(_BaseTransformNode2);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var QuantizeTime = function (_BaseTransformNode) {
    (0, _inherits3.default)(QuantizeTime, _BaseTransformNode);

    function QuantizeTime(options) {
        (0, _classCallCheck3.default)(this, QuantizeTime);

        var _this = (0, _possibleConstructorReturn3.default)(this, (QuantizeTime.__proto__ || (0, _getPrototypeOf2.default)(QuantizeTime)).call(this));

        var lastFrameTime = 0.0,
            values = {},
            _self = _this;
        var transformFunction = function transformFunction(event) {
            _self.addStats('in', event.constructor.name);
            if (event.time.normalized() - lastFrameTime > options.steps.normalized()) {
                var _ret = function () {
                    lastFrameTime += options.steps.normalized();
                    var evt = void 0,
                        frameTime = new _Time2.default(lastFrameTime);
                    if (event instanceof _DataEvent2.default) {
                        (0, _keys2.default)(values).map(function (key) {
                            evt = new _DataEvent2.default(frameTime, new _Voltage2.default(values[key].length ? _mathjs2.default.mean(values[key]) : 0.0));
                            evt.parentUUID = key;
                            values[key] = [];
                        });
                    } else if (event instanceof _DataFrame2.default) {
                        var arr = new Float32Array(event.value.length).fill(0.0);
                        evt = new _DataFrame2.default(frameTime, arr.map(function (v, i) {
                            return _mathjs2.default.mean(values[i]);
                        }));
                        evt.parentUUID = event.parentUUID;
                        values = [];
                    }
                    _self.stream.queue(evt);
                    _self.addStats('out', event.constructor.name);
                    return {
                        v: event
                    };
                }();

                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
            } else {
                if (event instanceof _DataEvent2.default) {
                    if (!Array.isArray(values[event.parentUUID])) {
                        values[event.parentUUID] = [];
                    }
                    values[event.parentUUID].push(event.value.normalized());
                } else if (event instanceof _DataFrame2.default) {
                    if (!Array.isArray(values)) {
                        values = new Array(event.value.length).fill([]);
                    }
                    event.value.map(function (v, i) {
                        values[i] = v;
                    });
                }
            }
        };
        _this.initStream(transformFunction);
        return _this;
    }

    return QuantizeTime;
}(_BaseTransformNode3.default);

exports.default = QuantizeTime;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL3RyYW5zZm9ybS9RdWFudGl6ZVRpbWUuanMiXSwibmFtZXMiOlsiUXVhbnRpemVUaW1lIiwib3B0aW9ucyIsImxhc3RGcmFtZVRpbWUiLCJ2YWx1ZXMiLCJfc2VsZiIsInRyYW5zZm9ybUZ1bmN0aW9uIiwiZXZlbnQiLCJhZGRTdGF0cyIsImNvbnN0cnVjdG9yIiwibmFtZSIsInRpbWUiLCJub3JtYWxpemVkIiwic3RlcHMiLCJldnQiLCJmcmFtZVRpbWUiLCJtYXAiLCJrZXkiLCJsZW5ndGgiLCJtZWFuIiwicGFyZW50VVVJRCIsImFyciIsIkZsb2F0MzJBcnJheSIsInZhbHVlIiwiZmlsbCIsInYiLCJpIiwic3RyZWFtIiwicXVldWUiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiaW5pdFN0cmVhbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsWTs7O0FBQ0YsMEJBQVlDLE9BQVosRUFBcUI7QUFBQTs7QUFBQTs7QUFFakIsWUFBSUMsZ0JBQWdCLEdBQXBCO0FBQUEsWUFDSUMsU0FBUyxFQURiO0FBQUEsWUFDaUJDLGFBRGpCO0FBRUEsWUFBTUMsb0JBQW9CLFNBQXBCQSxpQkFBb0IsQ0FBVUMsS0FBVixFQUFpQjtBQUN2Q0Ysa0JBQU1HLFFBQU4sQ0FBZSxJQUFmLEVBQXFCRCxNQUFNRSxXQUFOLENBQWtCQyxJQUF2QztBQUNBLGdCQUFJSCxNQUFNSSxJQUFOLENBQVdDLFVBQVgsS0FBMEJULGFBQTFCLEdBQTBDRCxRQUFRVyxLQUFSLENBQWNELFVBQWQsRUFBOUMsRUFBMEU7QUFBQTtBQUN0RVQscUNBQWlCRCxRQUFRVyxLQUFSLENBQWNELFVBQWQsRUFBakI7QUFDQSx3QkFBSUUsWUFBSjtBQUFBLHdCQUFTQyxZQUFZLG1CQUFTWixhQUFULENBQXJCO0FBQ0Esd0JBQUlJLG9DQUFKLEVBQWdDO0FBQzVCLDRDQUFZSCxNQUFaLEVBQW9CWSxHQUFwQixDQUF3QixVQUFDQyxHQUFELEVBQVM7QUFDN0JILGtDQUFNLHdCQUNGQyxTQURFLEVBRUYsc0JBQVlYLE9BQU9hLEdBQVAsRUFBWUMsTUFBWixHQUFxQixpQkFBS0MsSUFBTCxDQUFVZixPQUFPYSxHQUFQLENBQVYsQ0FBckIsR0FBOEMsR0FBMUQsQ0FGRSxDQUFOO0FBSUFILGdDQUFJTSxVQUFKLEdBQWlCSCxHQUFqQjtBQUNBYixtQ0FBT2EsR0FBUCxJQUFjLEVBQWQ7QUFDSCx5QkFQRDtBQVFILHFCQVRELE1BU08sSUFBSVYsb0NBQUosRUFBZ0M7QUFDbkMsNEJBQUljLE1BQU0sSUFBSUMsWUFBSixDQUFpQmYsTUFBTWdCLEtBQU4sQ0FBWUwsTUFBN0IsRUFBcUNNLElBQXJDLENBQTBDLEdBQTFDLENBQVY7QUFDQVYsOEJBQU0sd0JBQWNDLFNBQWQsRUFBeUJNLElBQUlMLEdBQUosQ0FBUSxVQUFDUyxDQUFELEVBQUlDLENBQUosRUFBVTtBQUM3QyxtQ0FBTyxpQkFBS1AsSUFBTCxDQUFVZixPQUFPc0IsQ0FBUCxDQUFWLENBQVA7QUFDSCx5QkFGOEIsQ0FBekIsQ0FBTjtBQUdBWiw0QkFBSU0sVUFBSixHQUFpQmIsTUFBTWEsVUFBdkI7QUFDQWhCLGlDQUFTLEVBQVQ7QUFDSDtBQUNEQywwQkFBTXNCLE1BQU4sQ0FBYUMsS0FBYixDQUFtQmQsR0FBbkI7QUFDQVQsMEJBQU1HLFFBQU4sQ0FBZSxLQUFmLEVBQXNCRCxNQUFNRSxXQUFOLENBQWtCQyxJQUF4QztBQUNBO0FBQUEsMkJBQU9IO0FBQVA7QUF0QnNFOztBQUFBO0FBdUJ6RSxhQXZCRCxNQXVCTztBQUNILG9CQUFJQSxvQ0FBSixFQUFnQztBQUM1Qix3QkFBSSxDQUFDc0IsTUFBTUMsT0FBTixDQUFjMUIsT0FBT0csTUFBTWEsVUFBYixDQUFkLENBQUwsRUFBOEM7QUFDMUNoQiwrQkFBT0csTUFBTWEsVUFBYixJQUEyQixFQUEzQjtBQUNIO0FBQ0RoQiwyQkFBT0csTUFBTWEsVUFBYixFQUF5QlcsSUFBekIsQ0FBOEJ4QixNQUFNZ0IsS0FBTixDQUFZWCxVQUFaLEVBQTlCO0FBQ0gsaUJBTEQsTUFLTyxJQUFJTCxvQ0FBSixFQUFnQztBQUNuQyx3QkFBSSxDQUFDc0IsTUFBTUMsT0FBTixDQUFjMUIsTUFBZCxDQUFMLEVBQTRCO0FBQ3hCQSxpQ0FBUyxJQUFJeUIsS0FBSixDQUFVdEIsTUFBTWdCLEtBQU4sQ0FBWUwsTUFBdEIsRUFBOEJNLElBQTlCLENBQW1DLEVBQW5DLENBQVQ7QUFDSDtBQUNEakIsMEJBQU1nQixLQUFOLENBQVlQLEdBQVosQ0FBZ0IsVUFBQ1MsQ0FBRCxFQUFJQyxDQUFKLEVBQVU7QUFDdEJ0QiwrQkFBT3NCLENBQVAsSUFBWUQsQ0FBWjtBQUNILHFCQUZEO0FBR0g7QUFDSjtBQUNKLFNBeENEO0FBeUNBLGNBQUtPLFVBQUwsQ0FBZ0IxQixpQkFBaEI7QUE3Q2lCO0FBOENwQjs7Ozs7a0JBR1VMLFkiLCJmaWxlIjoibm9kZXMvdHJhbnNmb3JtL1F1YW50aXplVGltZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtYXRoIGZyb20gJ21hdGhqcyc7XG5cbmltcG9ydCBCYXNlVHJhbnNmb3JtTm9kZSBmcm9tICcuL0Jhc2VUcmFuc2Zvcm1Ob2RlJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgRGF0YUZyYW1lIGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRnJhbWUnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5cbmNsYXNzIFF1YW50aXplVGltZSBleHRlbmRzIEJhc2VUcmFuc2Zvcm1Ob2RlIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGxldCBsYXN0RnJhbWVUaW1lID0gMC4wLFxuICAgICAgICAgICAgdmFsdWVzID0ge30sIF9zZWxmID0gdGhpcztcbiAgICAgICAgY29uc3QgdHJhbnNmb3JtRnVuY3Rpb24gPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIF9zZWxmLmFkZFN0YXRzKCdpbicsIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgaWYgKGV2ZW50LnRpbWUubm9ybWFsaXplZCgpIC0gbGFzdEZyYW1lVGltZSA+IG9wdGlvbnMuc3RlcHMubm9ybWFsaXplZCgpKSB7XG4gICAgICAgICAgICAgICAgbGFzdEZyYW1lVGltZSArPSBvcHRpb25zLnN0ZXBzLm5vcm1hbGl6ZWQoKTtcbiAgICAgICAgICAgICAgICBsZXQgZXZ0LCBmcmFtZVRpbWUgPSBuZXcgVGltZShsYXN0RnJhbWVUaW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXModmFsdWVzKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0ID0gbmV3IERhdGFFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcmFtZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFZvbHRhZ2UodmFsdWVzW2tleV0ubGVuZ3RoID8gbWF0aC5tZWFuKHZhbHVlc1trZXldKSA6IDAuMClcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucGFyZW50VVVJRCA9IGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlc1trZXldID0gW107XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IG5ldyBGbG9hdDMyQXJyYXkoZXZlbnQudmFsdWUubGVuZ3RoKS5maWxsKDAuMCk7XG4gICAgICAgICAgICAgICAgICAgIGV2dCA9IG5ldyBEYXRhRnJhbWUoZnJhbWVUaW1lLCBhcnIubWFwKCh2LCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0aC5tZWFuKHZhbHVlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnBhcmVudFVVSUQgPSBldmVudC5wYXJlbnRVVUlEO1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX3NlbGYuc3RyZWFtLnF1ZXVlKGV2dCk7XG4gICAgICAgICAgICAgICAgX3NlbGYuYWRkU3RhdHMoJ291dCcsIGV2ZW50LmNvbnN0cnVjdG9yLm5hbWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBldmVudDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheSh2YWx1ZXNbZXZlbnQucGFyZW50VVVJRF0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbZXZlbnQucGFyZW50VVVJRF0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbZXZlbnQucGFyZW50VVVJRF0ucHVzaChldmVudC52YWx1ZS5ub3JtYWxpemVkKCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQgaW5zdGFuY2VvZiBEYXRhRnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IG5ldyBBcnJheShldmVudC52YWx1ZS5sZW5ndGgpLmZpbGwoW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnZhbHVlLm1hcCgodiwgaSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2ldID0gdjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluaXRTdHJlYW0odHJhbnNmb3JtRnVuY3Rpb24pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUXVhbnRpemVUaW1lOyJdfQ==
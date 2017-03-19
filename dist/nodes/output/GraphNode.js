'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

var _DataSet = require('../../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _DataPlotter = require('../../graphs/DataPlotter');

var _DataPlotter2 = _interopRequireDefault(_DataPlotter);

var _LineChart = require('../../graphs/layouts/LineChart');

var _LineChart2 = _interopRequireDefault(_LineChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GraphNode = function (_BaseNode) {
    _inherits(GraphNode, _BaseNode);

    function GraphNode(filepath) {
        _classCallCheck(this, GraphNode);

        var _this = _possibleConstructorReturn(this, (GraphNode.__proto__ || Object.getPrototypeOf(GraphNode)).call(this));

        var _self = _this;
        _this._dataSet = new _DataSet2.default([]);
        _this._channels = {};
        _this._dataPlotter = null;
        _this._input = (0, _through2.default)();
        _this._meta = {};

        _this._input.on('data', function (data) {
            if (Array.isArray(data)) {
                data.map(function (event) {
                    _self.processEvent(event);
                });
            } else {
                _self.processEvent(data);
            }
        });

        _this._input.once('end', function () {
            _self.addStats('out', 'null', 0);
            Object.keys(_self._channels).forEach(function (key) {
                if (_self._channels[key].size > 0) {
                    _self._dataSet.push(_self._channels[key]);
                }
            });
            _self._dataPlotter = new _DataPlotter2.default(_self._dataSet, _path2.default.parse(filepath).dir, _path2.default.parse(filepath).name);
            return _self._dataPlotter.generateChart(_LineChart2.default).then(function () {
                _self.emit('done');
            }).catch(function (err) {
                _self.emit('error', err);
            });
        });

        _this._input.once('error', function (err) {
            throw new Error('graph stream error', err.message);
        });
        return _this;
    }

    _createClass(GraphNode, [{
        key: 'processEvent',
        value: function processEvent(event) {
            var _this2 = this;

            var _self = this;
            _self.addStats('in', event.constructor.name);
            if (event instanceof _DataFrame2.default) {
                event.value.map(function (val, i) {
                    var meta = _this2.meta.DataSet.DataChannels[event.parentUUID],
                        uuid = meta.uuids[i];
                    if (!(_self._channels[uuid] instanceof _DataChannel2.default)) {
                        _self._channels[uuid] = new _DataChannel2.default([]);
                        _self._channels[uuid].title = meta.labels[i];
                        _self._channels[uuid].uuid = meta.units[i];
                    }
                    var evt = new _DataEvent2.default(new _Time2.default(event.time.normalized(), meta.keyUnit), new _Voltage2.default(val, meta.units[i]));
                    _self._channels[uuid].push(evt);
                    _self.addStats('in', evt.constructor.name);
                    _self._store += 1;
                });
                return true;
            }
            if (event instanceof _DataEvent2.default) {
                if (!(_self._channels[event.parentUUID] instanceof _DataChannel2.default)) {
                    _self._channels[event.parentUUID] = new _DataChannel2.default([]);
                    _self._channels[event.parentUUID].uuid = event.parentUUID;
                }
                _self._channels[event.parentUUID].push(event);
                _self._store += 1;
                return true;
            }
            return false;
        }
    }, {
        key: 'input',
        get: function get() {
            return this._input;
        }
    }, {
        key: 'meta',
        get: function get() {
            return this._meta;
        },
        set: function set(v) {
            this._meta = v;
        }
    }]);

    return GraphNode;
}(_BaseNode3.default);

exports.default = GraphNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL291dHB1dC9HcmFwaE5vZGUuanMiXSwibmFtZXMiOlsiR3JhcGhOb2RlIiwiZmlsZXBhdGgiLCJfc2VsZiIsIl9kYXRhU2V0IiwiX2NoYW5uZWxzIiwiX2RhdGFQbG90dGVyIiwiX2lucHV0IiwiX21ldGEiLCJvbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJldmVudCIsInByb2Nlc3NFdmVudCIsIm9uY2UiLCJhZGRTdGF0cyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwia2V5Iiwic2l6ZSIsInB1c2giLCJwYXJzZSIsImRpciIsIm5hbWUiLCJnZW5lcmF0ZUNoYXJ0IiwidGhlbiIsImVtaXQiLCJjYXRjaCIsImVyciIsIkVycm9yIiwibWVzc2FnZSIsImNvbnN0cnVjdG9yIiwidmFsdWUiLCJ2YWwiLCJpIiwibWV0YSIsIkRhdGFTZXQiLCJEYXRhQ2hhbm5lbHMiLCJwYXJlbnRVVUlEIiwidXVpZCIsInV1aWRzIiwidGl0bGUiLCJsYWJlbHMiLCJ1bml0cyIsImV2dCIsInRpbWUiLCJub3JtYWxpemVkIiwia2V5VW5pdCIsIl9zdG9yZSIsInYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFM7OztBQUNGLHVCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUE7O0FBR2xCLFlBQU1DLGFBQU47QUFDQSxjQUFLQyxRQUFMLEdBQWdCLHNCQUFZLEVBQVosQ0FBaEI7QUFDQSxjQUFLQyxTQUFMLEdBQWlCLEVBQWpCO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixJQUFwQjtBQUNBLGNBQUtDLE1BQUwsR0FBYyx3QkFBZDtBQUNBLGNBQUtDLEtBQUwsR0FBYSxFQUFiOztBQUVBLGNBQUtELE1BQUwsQ0FBWUUsRUFBWixDQUFlLE1BQWYsRUFBdUIsVUFBQ0MsSUFB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c0JuQixJQUF0QixDQUEyQndCLEdBQTNCO0FBQ0E1QywwQkFBTWMsUUFBTixDQUFlLElBQWYsRUFBcUI4QixJQUFJYixXQUFKLENBQWdCUixJQUFyQztBQUNBdkIsMEJBQU1nRCxNQUFOLElBQWdCLENBQWhCO0FBQ0gsaUJBZEQ7QUFlQSx1QkFBTyxJQUFQO0FBQ0g7QUFDRCxnQkFBSXJDLG9DQUFKLEVBQWdDO0FBQzVCLG9CQUFJLEVBQUVYLE1BQU1FLFNBQU4sQ0FBZ0JTLE1BQU0yQixVQUF0QixrQ0FBRixDQUFKLEVBQWlFO0FBQzdEdEMsMEJBQU1FLFNBQU4sQ0FBZ0JTLE1BQU0yQixVQUF0QixJQUFvQywwQkFBZ0IsRUFBaEIsQ0FBcEM7QUFDQXRDLDBCQUFNRSxTQUFOLENBQWdCUyxNQUFNMkIsVUFBdEIsRUFBa0NDLElBQWxDLEdBQXlDNUIsTUFBTTJCLFVBQS9DO0FBQ0g7QUFDRHRDLHNCQUFNRSxTQUFOLENBQWdCUyxNQUFNMkIsVUFBdEIsRUFBa0NsQixJQUFsQyxDQUF1Q1QsS0FBdkM7QUFDQVgsc0JBQU1nRCxNQUFOLElBQWdCLENBQWhCO0FBQ0EsdUJBQU8sSUFBUDtBQUNIO0FBQ0QsbUJBQU8sS0FBUDtBQUNIOzs7NEJBRVc7QUFDUixtQkFBTyxLQUFLNUMsTUFBWjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLQyxLQUFaO0FBQ0gsUzswQkFFUTRDLEMsRUFBRztBQUNSLGlCQUFLNUMsS0FBTCxHQUFhNEMsQ0FBYjtBQUNIOzs7Ozs7a0JBR1VuRCxTIiwiZmlsZSI6Im5vZGVzL291dHB1dC9HcmFwaE5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgQmFzZU5vZGUgZnJvbSAnLi4vQmFzZU5vZGUnO1xuaW1wb3J0IERhdGFTZXQgZnJvbSAnLi4vLi4vZGF0YS9EYXRhU2V0JztcbmltcG9ydCBUaW1lIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVGltZSc7XG5pbXBvcnQgVm9sdGFnZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1ZvbHRhZ2UnO1xuaW1wb3J0IERhdGFFdmVudCBmcm9tICcuLi8uLi9ldmVudHMvRGF0YUV2ZW50JztcbmltcG9ydCBEYXRhRnJhbWUgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFGcmFtZSc7XG5pbXBvcnQgRGF0YUNoYW5uZWwgZnJvbSAnLi4vLi4vZGF0YS9EYXRhQ2hhbm5lbCc7XG5pbXBvcnQgRGF0YVBsb3R0ZXIgZnJvbSAnLi4vLi4vZ3JhcGhzL0RhdGFQbG90dGVyJztcbmltcG9ydCBMaW5lQ2hhcnQgZnJvbSAnLi4vLi4vZ3JhcGhzL2xheW91dHMvTGluZUNoYXJ0JztcblxuY2xhc3MgR3JhcGhOb2RlIGV4dGVuZHMgQmFzZU5vZGUge1xuICAgIGNvbnN0cnVjdG9yKGZpbGVwYXRoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9kYXRhU2V0ID0gbmV3IERhdGFTZXQoW10pO1xuICAgICAgICB0aGlzLl9jaGFubmVscyA9IHt9O1xuICAgICAgICB0aGlzLl9kYXRhUGxvdHRlciA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lucHV0ID0gdGhyb3VnaCgpO1xuICAgICAgICB0aGlzLl9tZXRhID0ge307XG5cbiAgICAgICAgdGhpcy5faW5wdXQub24oJ2RhdGEnLCAoZGF0YSkgPT4ge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhLm1hcCgoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYucHJvY2Vzc0V2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgX3NlbGYucHJvY2Vzc0V2ZW50KGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9pbnB1dC5vbmNlKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfc2VsZi5hZGRTdGF0cygnb3V0JywgJ251bGwnLCAwKTtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKF9zZWxmLl9jaGFubmVscykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKF9zZWxmLl9jaGFubmVsc1trZXldLnNpemUgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLl9kYXRhU2V0LnB1c2goX3NlbGYuX2NoYW5uZWxzW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgX3NlbGYuX2RhdGFQbG90dGVyID0gbmV3IERhdGFQbG90dGVyKF9zZWxmLl9kYXRhU2V0LFxuICAgICAgICAgICAgICAgIHBhdGgucGFyc2UoZmlsZXBhdGgpLmRpciwgcGF0aC5wYXJzZShmaWxlcGF0aCkubmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gX3NlbGYuX2RhdGFQbG90dGVyLmdlbmVyYXRlQ2hhcnQoTGluZUNoYXJ0KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuZW1pdCgnZG9uZScpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuZW1pdCgnZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9pbnB1dC5vbmNlKCdlcnJvcicsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZ3JhcGggc3RyZWFtIGVycm9yJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBfc2VsZi5hZGRTdGF0cygnaW4nLCBldmVudC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUZyYW1lKSB7XG4gICAgICAgICAgICBldmVudC52YWx1ZS5tYXAoKHZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZXRhID0gdGhpcy5tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2V2ZW50LnBhcmVudFVVSURdLFxuICAgICAgICAgICAgICAgICAgICB1dWlkID0gbWV0YS51dWlkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIShfc2VsZi5fY2hhbm5lbHNbdXVpZF0gaW5zdGFuY2VvZiBEYXRhQ2hhbm5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW3V1aWRdID0gbmV3IERhdGFDaGFubmVsKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW3V1aWRdLnRpdGxlID0gbWV0YS5sYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1t1dWlkXS51dWlkID0gbWV0YS51bml0c1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGV2dCA9IG5ldyBEYXRhRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUaW1lKGV2ZW50LnRpbWUubm9ybWFsaXplZCgpLCBtZXRhLmtleVVuaXQpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVm9sdGFnZSh2YWwsIG1ldGEudW5pdHNbaV0pKTtcbiAgICAgICAgICAgICAgICBfc2VsZi5fY2hhbm5lbHNbdXVpZF0ucHVzaChldnQpO1xuICAgICAgICAgICAgICAgIF9zZWxmLmFkZFN0YXRzKCdpbicsIGV2dC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgICAgICBfc2VsZi5fc3RvcmUgKz0gMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIShfc2VsZi5fY2hhbm5lbHNbZXZlbnQucGFyZW50VVVJRF0gaW5zdGFuY2VvZiBEYXRhQ2hhbm5lbCkpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5fY2hhbm5lbHNbZXZlbnQucGFyZW50VVVJRF0gPSBuZXcgRGF0YUNoYW5uZWwoW10pO1xuICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1tldmVudC5wYXJlbnRVVUlEXS51dWlkID0gZXZlbnQucGFyZW50VVVJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1tldmVudC5wYXJlbnRVVUlEXS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIF9zZWxmLl9zdG9yZSArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xuICAgIH1cblxuICAgIGdldCBtZXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YTtcbiAgICB9XG5cbiAgICBzZXQgbWV0YSh2KSB7XG4gICAgICAgIHRoaXMuX21ldGEgPSB2O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlOyJdfQ==
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var GraphNode = function (_BaseNode) {
    (0, _inherits3.default)(GraphNode, _BaseNode);

    function GraphNode(filepath) {
        (0, _classCallCheck3.default)(this, GraphNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (GraphNode.__proto__ || (0, _getPrototypeOf2.default)(GraphNode)).call(this));

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
            (0, _keys2.default)(_self._channels).forEach(function (key) {
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
            console.log('graph stream error', err.message);
        });
        return _this;
    }

    (0, _createClass3.default)(GraphNode, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL291dHB1dC9HcmFwaE5vZGUuanMiXSwibmFtZXMiOlsiR3JhcGhOb2RlIiwiZmlsZXBhdGgiLCJfc2VsZiIsIl9kYXRhU2V0IiwiX2NoYW5uZWxzIiwiX2RhdGFQbG90dGVyIiwiX2lucHV0IiwiX21ldGEiLCJvbiIsImRhdGEiLCJBcnJheSIsImlzQXJyYXkiLCJtYXAiLCJldmVudCIsInByb2Nlc3NFdmVudCIsIm9uY2UiLCJhZGRTdGF0cyIsImZvckVhY2giLCJrZXkiLCJzaXplIiwicHVzaCIsInBhcnNlIiwiZGlyIiwibmFtZSIsImdlbmVyYXRlQ2hhcnQiLCJ0aGVuIiwiZW1pdCIsImNhdGNoIiwiZXJyIiwiY29uc29sZSIsImxvZyIsIm1lc3NhZ2UiLCJjb25zdHJ1Y3RvciIsInZhbHVlIiwidmFsIiwiaSIsIm1ldGEiLCJEYXRhU2V0IiwiRGF0YUNoYW5uZWxzIiwicGFyZW50VVVJRCIsInV1aWQiLCJ1dWlkcyIsInRpdGxlIiwibGFiZWxzIiwidW5pdHMiLCJldnQiLCJ0aW1lIiwibm9ybWFsaXplZCIsImtleVVuaXQiLCJfc3RvcmUiLCJ2Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsUzs7O0FBQ0YsdUJBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQTs7QUFHbEIsWUFBTUMsYUFBTjtBQUNBLGNBQUtDLFFBQUwsR0FBZ0Isc0JBQVksRUFBWixDQUFoQjtBQUNBLGNBQUtDLFNBQUwsR0FBaUIsRUFBakI7QUFDQSxjQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0EsY0FBS0MsTUFBTCxHQUFjLHdCQUFkO0FBQ0EsY0FBS0MsS0FBTCxHQUFhLEVBQWI7O0FBRUEsY0FBS0QsTUFBTCxDQUFZRSxFQUFaLENBQWUsTUFBZixFQUF1QixV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eUIsR0FBM0I7QUFDQTNDLDBCQUFNYyxRQUFOLENBQWUsSUFBZixFQUFxQjZCLElBQUliLFdBQUosQ0FBZ0JULElBQXJDO0FBQ0FyQiwwQkFBTStDLE1BQU4sSUFBZ0IsQ0FBaEI7QUFDSCxpQkFkRDtBQWVBLHVCQUFPLElBQVA7QUFDSDtBQUNELGdCQUFJcEMsb0NBQUosRUFBZ0M7QUFDNUIsb0JBQUksRUFBRVgsTUFBTUUsU0FBTixDQUFnQlMsTUFBTTBCLFVBQXRCLGtDQUFGLENBQUosRUFBaUU7QUFDN0RyQywwQkFBTUUsU0FBTixDQUFnQlMsTUFBTTBCLFVBQXRCLElBQW9DLDBCQUFnQixFQUFoQixDQUFwQztBQUNBckMsMEJBQU1FLFNBQU4sQ0FBZ0JTLE1BQU0wQixVQUF0QixFQUFrQ0MsSUFBbEMsR0FBeUMzQixNQUFNMEIsVUFBL0M7QUFDSDtBQUNEckMsc0JBQU1FLFNBQU4sQ0FBZ0JTLE1BQU0wQixVQUF0QixFQUFrQ25CLElBQWxDLENBQXVDUCxLQUF2QztBQUNBWCxzQkFBTStDLE1BQU4sSUFBZ0IsQ0FBaEI7QUFDQSx1QkFBTyxJQUFQO0FBQ0g7QUFDRCxtQkFBTyxLQUFQO0FBQ0g7Ozs0QkFFVztBQUNSLG1CQUFPLEtBQUszQyxNQUFaO0FBQ0g7Ozs0QkFFVTtBQUNQLG1CQUFPLEtBQUtDLEtBQVo7QUFDSCxTOzBCQUVRMkMsQyxFQUFHO0FBQ1IsaUJBQUszQyxLQUFMLEdBQWEyQyxDQUFiO0FBQ0g7Ozs7O2tCQUdVbEQsUyIsImZpbGUiOiJub2Rlcy9vdXRwdXQvR3JhcGhOb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRocm91Z2ggZnJvbSAndGhyb3VnaCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IEJhc2VOb2RlIGZyb20gJy4uL0Jhc2VOb2RlJztcbmltcG9ydCBEYXRhU2V0IGZyb20gJy4uLy4uL2RhdGEvRGF0YVNldCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgRGF0YUZyYW1lIGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRnJhbWUnO1xuaW1wb3J0IERhdGFDaGFubmVsIGZyb20gJy4uLy4uL2RhdGEvRGF0YUNoYW5uZWwnO1xuaW1wb3J0IERhdGFQbG90dGVyIGZyb20gJy4uLy4uL2dyYXBocy9EYXRhUGxvdHRlcic7XG5pbXBvcnQgTGluZUNoYXJ0IGZyb20gJy4uLy4uL2dyYXBocy9sYXlvdXRzL0xpbmVDaGFydCc7XG5cbmNsYXNzIEdyYXBoTm9kZSBleHRlbmRzIEJhc2VOb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihmaWxlcGF0aCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fZGF0YVNldCA9IG5ldyBEYXRhU2V0KFtdKTtcbiAgICAgICAgdGhpcy5fY2hhbm5lbHMgPSB7fTtcbiAgICAgICAgdGhpcy5fZGF0YVBsb3R0ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLl9pbnB1dCA9IHRocm91Z2goKTtcbiAgICAgICAgdGhpcy5fbWV0YSA9IHt9O1xuXG4gICAgICAgIHRoaXMuX2lucHV0Lm9uKCdkYXRhJywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YS5tYXAoKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLnByb2Nlc3NFdmVudChldmVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIF9zZWxmLnByb2Nlc3NFdmVudChkYXRhKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faW5wdXQub25jZSgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3NlbGYuYWRkU3RhdHMoJ291dCcsICdudWxsJywgMCk7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhfc2VsZi5fY2hhbm5lbHMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChfc2VsZi5fY2hhbm5lbHNba2V5XS5zaXplID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5fZGF0YVNldC5wdXNoKF9zZWxmLl9jaGFubmVsc1trZXldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIF9zZWxmLl9kYXRhUGxvdHRlciA9IG5ldyBEYXRhUGxvdHRlcihfc2VsZi5fZGF0YVNldCxcbiAgICAgICAgICAgICAgICBwYXRoLnBhcnNlKGZpbGVwYXRoKS5kaXIsIHBhdGgucGFyc2UoZmlsZXBhdGgpLm5hbWUpO1xuICAgICAgICAgICAgcmV0dXJuIF9zZWxmLl9kYXRhUGxvdHRlci5nZW5lcmF0ZUNoYXJ0KExpbmVDaGFydClcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLmVtaXQoJ2RvbmUnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5faW5wdXQub25jZSgnZXJyb3InLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZ3JhcGggc3RyZWFtIGVycm9yJywgZXJyLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm9jZXNzRXZlbnQoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBfc2VsZi5hZGRTdGF0cygnaW4nLCBldmVudC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUZyYW1lKSB7XG4gICAgICAgICAgICBldmVudC52YWx1ZS5tYXAoKHZhbCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBtZXRhID0gdGhpcy5tZXRhLkRhdGFTZXQuRGF0YUNoYW5uZWxzW2V2ZW50LnBhcmVudFVVSURdLFxuICAgICAgICAgICAgICAgICAgICB1dWlkID0gbWV0YS51dWlkc1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoIShfc2VsZi5fY2hhbm5lbHNbdXVpZF0gaW5zdGFuY2VvZiBEYXRhQ2hhbm5lbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW3V1aWRdID0gbmV3IERhdGFDaGFubmVsKFtdKTtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2NoYW5uZWxzW3V1aWRdLnRpdGxlID0gbWV0YS5sYWJlbHNbaV07XG4gICAgICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1t1dWlkXS51dWlkID0gbWV0YS51bml0c1tpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGV2dCA9IG5ldyBEYXRhRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBUaW1lKGV2ZW50LnRpbWUubm9ybWFsaXplZCgpLCBtZXRhLmtleVVuaXQpLFxuICAgICAgICAgICAgICAgICAgICBuZXcgVm9sdGFnZSh2YWwsIG1ldGEudW5pdHNbaV0pKTtcbiAgICAgICAgICAgICAgICBfc2VsZi5fY2hhbm5lbHNbdXVpZF0ucHVzaChldnQpO1xuICAgICAgICAgICAgICAgIF9zZWxmLmFkZFN0YXRzKCdpbicsIGV2dC5jb25zdHJ1Y3Rvci5uYW1lKTtcbiAgICAgICAgICAgICAgICBfc2VsZi5fc3RvcmUgKz0gMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgRGF0YUV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoIShfc2VsZi5fY2hhbm5lbHNbZXZlbnQucGFyZW50VVVJRF0gaW5zdGFuY2VvZiBEYXRhQ2hhbm5lbCkpIHtcbiAgICAgICAgICAgICAgICBfc2VsZi5fY2hhbm5lbHNbZXZlbnQucGFyZW50VVVJRF0gPSBuZXcgRGF0YUNoYW5uZWwoW10pO1xuICAgICAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1tldmVudC5wYXJlbnRVVUlEXS51dWlkID0gZXZlbnQucGFyZW50VVVJRDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9zZWxmLl9jaGFubmVsc1tldmVudC5wYXJlbnRVVUlEXS5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIF9zZWxmLl9zdG9yZSArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBpbnB1dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xuICAgIH1cblxuICAgIGdldCBtZXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWV0YTtcbiAgICB9XG5cbiAgICBzZXQgbWV0YSh2KSB7XG4gICAgICAgIHRoaXMuX21ldGEgPSB2O1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR3JhcGhOb2RlOyJdfQ==
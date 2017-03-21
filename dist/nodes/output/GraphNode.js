'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _BaseNode = require('../BaseNode');

var _BaseNode2 = _interopRequireDefault(_BaseNode);

var _DataSet = require('../../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

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

class GraphNode extends _BaseNode2.default {
    constructor(filepath) {
        super();

        const _self = this;
        this._dataSet = new _DataSet2.default([]);
        this._channels = {};
        this._dataPlotter = null;
        this._input = (0, _through2.default)();
        this._meta = {};

        this._input.on('data', data => {
            if (Array.isArray(data)) {
                data.map(event => {
                    _self.processEvent(event);
                });
            } else {
                _self.processEvent(data);
            }
        });

        this._input.once('end', function () {
            _self.addStats('out', 'null', 0);
            Object.keys(_self._channels).forEach(key => {
                if (_self._channels[key].size > 0) {
                    _self._dataSet.push(_self._channels[key]);
                }
            });
            _self._dataPlotter = new _DataPlotter2.default(_self._dataSet, _path2.default.parse(filepath).dir, _path2.default.parse(filepath).name);
            return _self._dataPlotter.generateChart(_LineChart2.default).then(() => {
                _self.emit('done');
            }).catch(err => {
                _self.emit('error', err);
            });
        });

        this._input.once('error', function (err) {
            throw new Error('graph stream error', err.message);
        });
    }

    processEvent(event) {
        const _self = this;
        _self.addStats('in', event.constructor.name);
        if (event instanceof _DataFrame2.default) {
            event.value.map((val, i) => {
                let meta = this.meta.DataSet.DataChannels[event.parentUUID],
                    uuid = meta.uuids[i];
                if (!(_self._channels[uuid] instanceof _DataChannel2.default)) {
                    _self._channels[uuid] = new _DataChannel2.default([]);
                    _self._channels[uuid].title = meta.labels[i];
                    _self._channels[uuid].uuid = meta.units[i];
                }
                let evt = new _DataEvent2.default((0, _jsQuantities2.default)(event.time.normalized(), meta.keyUnit), (0, _jsQuantities2.default)(val, meta.units[i]));
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

    get input() {
        return this._input;
    }

    get meta() {
        return this._meta;
    }

    set meta(v) {
        this._meta = v;
    }
}

exports.default = GraphNode;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _events = require('../../events');

var _events2 = _interopRequireDefault(_events);

var _BaseNode = require('../BaseNode');

var _BaseNode2 = _interopRequireDefault(_BaseNode);

var _LMDB = require('../../io/db/LMDB');

var _LMDB2 = _interopRequireDefault(_LMDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class LMDBNode extends _BaseNode2.default {
    constructor() {
        super();

        this._lmdb = null;
        this._channels = {};
        this._outputs = {};
        this._inputs = {};
    }

    openDataSet(datapath, readOnly = true) {
        this._lmdb = new _LMDB2.default(datapath, readOnly);
        const _this = this;
        Object.keys(_this._lmdb._meta.DataSet.DataChannels).forEach(key => {
            let channel = _this._lmdb._meta.DataSet.DataChannels[key];
            channel._isDirty = true;
            channel.timeRange = null;
            channel.valueRange = null;
            channel.uuid = key;
            _this._channels[key] = channel;
            _this._channels[key].timeRange = _this.getTimeRange(key);
        });
    }

    createDataSet(datapath, sizeGb = 2, dbname = undefined) {
        const _dbname = dbname || _path2.default.parse(datapath).name,
              meta = {
            mapSize: sizeGb * Math.pow(1024, 3),
            maxDbs: 10,
            DataSet: {
                title: _dbname,
                DataChannels: {}
            }
        };
        if (!_fs2.default.existsSync(datapath)) {
            _fs2.default.mkdirSync(datapath);
        }
        this._lmdb = new _LMDB2.default(datapath, false, meta);
    }

    getTimeRange(channelKey) {
        (0, _assert2.default)(this._lmdb instanceof _LMDB2.default);

        let channel = this._channels[channelKey];
        if (channel.timeRange && !channel._isDirty) {
            return channel.timeRange;
        }

        // FIXME: this throws invalid argument on getbinary
        /*
        let txnUUID = this._lmdb.begin(channelKey),
            cursorUUID = this._lmdb.cursor(channelKey, txnUUID);
         this._lmdb.gotoFirst(cursorUUID);
        let start = this._lmdb.getCurrentKeyValue(channelKey, cursorUUID);
         this._lmdb.gotoLast(cursorUUID);
        let end = this._lmdb.getCurrentKeyValue(channelKey, cursorUUID);
         let startTime = Qty(parseFloat(start.key), 's'),
            endTime = Qty(parseFloat(end.key), 's');
         this._lmdb.closeCursor(cursorUUID);
        this._lmdb.abort(txnUUID);
         channel.timeRange = { start: startTime, end: endTime };
        */
        return { start: (0, _jsQuantities2.default)(0, 's'), end: (0, _jsQuantities2.default)(0, 's') }; // channel.timeRange;
    }

    getValueRanges(channelKey) {
        (0, _assert2.default)(this._lmdb !== null);

        let channel = this._channels[channelKey];

        if (channel.valueRange && !channel._isDirty) {
            return channel.valueRange;
        }

        const _self = this;
        const txnUUID = _self._lmdb.begin(channelKey);
        const cursorUUID = _self._lmdb.cursor(channelKey, txnUUID);

        let units = channel.units,
            max = new Array(channel.type.length).fill(Number.MIN_VALUE),
            min = new Array(channel.type.length).fill(Number.MAX_VALUE);

        for (let found = _self._lmdb.gotoFirst(cursorUUID); found; found = _self._lmdb.gotoNext(cursorUUID)) {
            let vals = _self._lmdb.getCurrentValue(channelKey, cursorUUID);
            for (let i in vals) {
                if (vals[i] > max[i]) {
                    max[i] = vals[i];
                }
                if (vals[i] < min[i]) {
                    min[i] = vals[i];
                }
            }
        }

        _self._lmdb.closeCursor(cursorUUID);
        _self._lmdb.abort(txnUUID);

        channel.valueRange = { min: min.map((val, i) => {
                return (0, _jsQuantities2.default)(val, units[i]);
            }), max: max.map((val, i) => {
                return (0, _jsQuantities2.default)(val, units[i]);
            })
        };

        return channel.valueRange;
    }

    createInput(dataLayout, storeFrames = false) {
        (0, _assert2.default)(this._lmdb !== null);
        (0, _assert2.default)(typeof dataLayout === 'object');

        if (storeFrames) {
            (0, _assert2.default)(Object.keys(dataLayout).length === 1, 'Only create a single channel when storing frames.');
        }

        const _self = this;
        Object.keys(dataLayout).map(channelKey => {
            _self._lmdb.meta.DataSet.DataChannels[channelKey] = {
                type: {
                    class: storeFrames ? 'DataFrame' : 'DataEvent',
                    type: storeFrames ? 'Float32' : null,
                    length: storeFrames ? dataLayout[channelKey].labels.length : 0
                },
                keySize: 16,
                keyPrecision: 6,
                title: dataLayout[channelKey].title || channelKey,
                keyUnit: dataLayout[channelKey].keyUnit,
                units: storeFrames ? dataLayout[channelKey].units : [],
                labels: storeFrames ? dataLayout[channelKey].labels : [],
                uuids: []
            };
        });
        Object.keys(this._lmdb._meta.DataSet.DataChannels).forEach(key => {
            let channel = this._lmdb._meta.DataSet.DataChannels[key];
            channel._isDirty = true;
            channel.timeRange = null;
            channel.valueRange = null;
            channel.uuid = key;
            this._channels[key] = channel;
        });

        let input = {
            uuid: (0, _uuid2.default)(),
            db: this._lmdb._meta.DataSet.title,
            stream: (0, _through2.default)(),
            paused: false,
            position: 0
        };

        input.txnUUID = this._lmdb.begin(input.db, false);

        input.stream.on('data', data => {
            if (!Array.isArray(data)) {
                data = [data];
            }
            data.map(event => {

                if (event instanceof _events2.default.DataFrame && storeFrames) {
                    _self._lmdb.put(_self._lmdb._meta.DataSet.title, input.txnUUID, event);
                } else if (event instanceof _events2.default.DataEvent && !storeFrames) {
                    _self._lmdb.put(_self._lmdb._meta.DataSet.title, input.txnUUID, event);
                }
                this.addStats('in', event.constructor.name);
            });
        });
        input.stream.once('end', () => {
            _self._lmdb.commit(input.txnUUID);
            return _self._lmdb._updateMeta().then(() => {
                _self.emit('done');
            });
        });
        input.stream.once('error', err => {
            _self.emit('error', `LMDB input error ${err.message}`);
            _self._lmdb.commit(input.txnUUID);
        });

        this._inputs[input.uuid] = input;
        return input.uuid;
    }

    createOutput(channelKey, startTime = (0, _jsQuantities2.default)('0s'), endTime = (0, _jsQuantities2.default)('0s'), convertFrames = false) {
        (0, _assert2.default)(this._lmdb !== null);

        (0, _assert2.default)(typeof channelKey === 'string');
        (0, _assert2.default)(this._channels.hasOwnProperty(channelKey));

        let output = {
            uuid: (0, _uuid2.default)(),
            db: channelKey,
            stream: (0, _through2.default)(),
            convertFrames: convertFrames,
            hasNext: true,
            startTime: startTime,
            endTime: endTime,
            currentKey: null,
            paused: false,
            position: 0,
            eventBuffer: []
        };

        this._outputs[output.uuid] = output;

        output.txnUUID = this._lmdb.begin(output.db);
        output.cursorUUID = this._lmdb.cursor(output.db, output.txnUUID);

        return output.uuid;
    }

    startOutput(uuid) {
        if (!this._outputs[uuid]) {
            return;
        }
        (0, _assert2.default)(this._outputs[uuid] instanceof Object);
        const output = this._outputs[uuid],
              _self = this;

        if (output.currentKey) {
            this._lmdb.gotoKey(output.db, output.cursorUUID, output.currentKey);
        } else {
            this._lmdb.gotoRange(output.db, output.cursorUUID, output.startTime);
        }

        let lastType;
        while (!output.stream.paused) {
            if (output.eventBuffer.length === 0 && output.hasNext) {
                if (output.convertFrames) {
                    output.eventBuffer = this._lmdb.getCurrentEvents(output.db, output.cursorUUID);
                } else {
                    output.eventBuffer = [this._lmdb.getCurrentFrame(output.db, output.cursorUUID)];
                }
                output.currentKey = this._lmdb.gotoNext(output.cursorUUID);
                if (!output.currentKey) {
                    output.hasNext = false;
                }
            } else if (output.eventBuffer.length === 0 && !output.hasNext) {
                return this.endOutput(uuid);
            }
            if (output.eventBuffer.length > 0) {
                let event = output.eventBuffer.shift();
                if (output.endTime.gt((0, _jsQuantities2.default)('0s')) && event.time.gte(output.endTime)) {
                    return this.endOutput(uuid);
                }
                output.stream.queue(event);
                lastType = event.constructor.name;
                this.addStats('out', lastType);
            }
        }

        setTimeout(function () {
            _self.startOutput(uuid);
        }, 10);
    }

    endOutput(uuid) {
        let output = this._outputs[uuid];
        (0, _assert2.default)(output instanceof Object);

        output.stream.queue(null);
        this.addStats('out', 'null', 0);

        this._lmdb.closeCursor(output.cursorUUID);
        this._lmdb.abort(output.txnUUID);

        this._outputs[uuid] = null;
        output = null;
    }

    get outputs() {
        return this._outputs;
    }

    get inputs() {
        return this._inputs;
    }

    get meta() {
        return this._lmdb.meta;
    }
}

exports.default = LMDBNode;
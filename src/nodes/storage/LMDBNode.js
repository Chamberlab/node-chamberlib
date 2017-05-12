import assert from 'assert';
import path from 'path';
import fs from 'fs';
import uuid4 from 'uuid4';
import through from 'through';
import Qty from 'js-quantities';

import events from '../../events';
import BaseNode from '../BaseNode';
import LMDB from '../../io/db/LMDB';

class LMDBNode extends BaseNode {
    constructor() {
        super();

        this._lmdb = null;
        this._channels = {};
        this._outputs = {};
        this._inputs = {};
    }

    openDataSet(datapath, readOnly = true) {
        this._lmdb = new LMDB(datapath, readOnly);
        const _this = this;
        Object.keys(_this._lmdb._meta.DataSet.DataChannels).forEach((key) => {
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
        const _dbname = dbname || path.parse(datapath).name,
            meta = {
                mapSize: sizeGb * Math.pow(1024, 3),
                maxDbs: 10,
                DataSet: {
                    title: _dbname,
                    DataChannels: {}
                }
            };
        if (!fs.existsSync(datapath)) {
            fs.mkdirSync(datapath);
        }
        this._lmdb = new LMDB(datapath, false, meta);
    }

    getTimeRange(channelKey) {
        assert(this._lmdb instanceof LMDB);

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
        return { start: Qty(0, 's'), end: Qty(0, 's') }; // channel.timeRange;
    }

    getValueRanges(channelKey) {
        assert(this._lmdb !== null);

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
            return Qty(val, units[i]);
        }), max: max.map((val, i) => {
            return Qty(val, units[i]);
        })
        };

        return channel.valueRange;
    }

    createInput(dataLayout, storeFrames = false) {
        assert(this._lmdb !== null);
        assert(typeof dataLayout === 'object');

        if (storeFrames) {
            assert(Object.keys(dataLayout).length === 1, 'Only create a single channel when storing frames.');
        }

        const _self = this;
        Object.keys(dataLayout).map((channelKey) => {
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
        Object.keys(this._lmdb._meta.DataSet.DataChannels).forEach((key) => {
            let channel = this._lmdb._meta.DataSet.DataChannels[key];
            channel._isDirty = true;
            channel.timeRange = null;
            channel.valueRange = null;
            channel.uuid = key;
            this._channels[key] = channel;
        });

        let input = {
            uuid: uuid4(),
            db: this._lmdb._meta.DataSet.title,
            stream: through(),
            paused: false,
            position: 0
        };

        input.txnUUID = this._lmdb.begin(input.db, false);

        input.stream.on('data', (data) => {
            if (!Array.isArray(data)) {
                data = [data];
            }
            data.map((event) => {

                if (event instanceof events.DataFrame && storeFrames) {
                    _self._lmdb.put(_self._lmdb._meta.DataSet.title, input.txnUUID, event);
                } else if (event instanceof events.DataEvent && !storeFrames) {
                    _self._lmdb.put(_self._lmdb._meta.DataSet.title, input.txnUUID, event);
                }
                this.addStats('in', event.constructor.name);
            });
        });
        input.stream.once('end', () => {
            _self._lmdb.commit(input.txnUUID);
            return _self._lmdb._updateMeta()
                .then(() => {
                    _self.emit('done');
                });
        });
        input.stream.once('error', (err) => {
            _self.emit('error', `LMDB input error ${err.message}`);
            _self._lmdb.commit(input.txnUUID);
        });

        this._inputs[input.uuid] = input;
        return input.uuid;
    }

    createOutput(channelKey, startTime = Qty('0 s'), endTime = Qty('0 s'), convertFrames = false) {
        assert(this._lmdb !== null);

        assert(typeof channelKey === 'string');
        assert(this._channels.hasOwnProperty(channelKey));

        let output = {
            uuid: uuid4(),
            db: channelKey,
            stream: through(),
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
        assert(this._outputs[uuid] instanceof Object);
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
                if (output.endTime.gt(Qty('0 s')) && event.time.gte(output.endTime)) {
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
        assert(output instanceof Object);

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

export default LMDBNode;
import assert from 'assert';
import uuid4 from 'uuid4';
import through from 'through';

import BaseNode from '../BaseNode';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';
import LMDB from '../../data/io/LMDB';

class LMDBNode extends BaseNode {
    constructor() {
        super();

        this._lmdb = null;
        this._channels = {};
        this._outputs = {};
    }

    openDataSet(datapath) {
        this._lmdb = new LMDB(datapath);
        Object.keys(this._lmdb._meta.DataSet.DataChannels).forEach((key) => {
            let channel = this._lmdb._meta.DataSet.DataChannels[key];
            channel._isDirty = true;
            channel.timeRange = null;
            channel.valueRange = null;
            channel.uuid = key;
            this._channels[key] = channel;
            this._channels[key].timeRange = this.getTimeRange(key);
        });
    }

    getTimeRange(channelKey) {
        assert(this._lmdb !== null);

        let channel = this._channels[channelKey];

        if (channel.timeRange && !channel._isDirty) {
            return channel.timeRange;
        }

        const _self = this;
        const txnUUID = _self._lmdb.begin(channelKey);
        const cursorUUID = _self._lmdb.cursor(channelKey, txnUUID);

        _self._lmdb.gotoFirst(cursorUUID);
        let start = _self._lmdb.getCurrentKeyValue(channelKey, cursorUUID);

        _self._lmdb.gotoLast(cursorUUID);
        let end = _self._lmdb.getCurrentKeyValue(channelKey, cursorUUID);

        let startTime = new Time(start.key, 'ms'),
            endTime = new Time(end.key, 'ms');

        _self._lmdb.closeCursor(cursorUUID);
        _self._lmdb.abort(txnUUID);

        channel.timeRange = { start: startTime, end: endTime };
        return channel.timeRange;
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

        for (var found = _self._lmdb.gotoFirst(cursorUUID); found; found = _self._lmdb.gotoNext(cursorUUID)) {
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
            return new Voltage(val, units[i]);
        }), max: max.map((val, i) => {
            return new Voltage(val, units[i]);
        })
        };

        return channel.valueRange;
    }

    createOutput(channelKey, startTime = new Time(0.0), endTime = new Time(0.0), convertFrames = false) {
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
                if (output.endTime.normalized() > 0 && event.time.normalized() >= output.endTime.normalized()) {
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

    get meta() {
        return this._lmdb.meta;
    }
}

export default LMDBNode;
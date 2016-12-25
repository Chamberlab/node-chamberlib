import assert from 'assert';

import BaseNode from '../BaseNode';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';
import LMDB from '../../data/io/LMDB';
import EventOutputStream from '../../streams/EventOutputStream';

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
            channel.isDirty = true;
            channel.timeRange = null;
            channel.valueRange = null;
            channel.eventBuffer = [];
            this._channels[key] = channel;
        });
    }

    getTimeRange(channelKey) {
        assert(this._lmdb !== null);

        let channel = this._channels[channelKey];

        if (channel.timeRange && !channel.isDirty) {
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

        if (channel.valueRange && !channel.isDirty) {
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

    createOutput(channelKey, startTime = new Time(0.0), convertFrames = true) {
        assert(this._lmdb !== null);

        assert(typeof channelKey === 'string');
        assert(this._channels.hasOwnProperty(channelKey));

        const _self = this;
        let output = {
            db: channelKey,
            stream: new EventOutputStream(_self),
            convertFrames: convertFrames,
            hasNext: true,
            paused: false,
            eventBuffer: []
        };

        output.txnUUID = this._lmdb.begin(channelKey);
        output.cursorUUID = this._lmdb.cursor(channelKey, output.txnUUID);
        this._lmdb.gotoRange(channelKey, output.cursorUUID, startTime);

        this._outputs[output.stream.uuid] = output;

        this.startOutput(output.stream.uuid);

        return output.stream.uuid;
    }

    startOutput(uuid) {
        let output = this._outputs[uuid];
        assert(output instanceof Object);

        if (output.paused) {
            output.paused = false;
        }
        while (!output.paused) {
            if (output.eventBuffer.length === 0 && output.hasNext) {
                if (output.convertFrames) {
                    output.eventBuffer = this._lmdb.getCurrentEvents(output.db, output.cursorUUID);
                } else {
                    output.eventBuffer = [this._lmdb.getCurrentFrame(output.db, output.cursorUUID)];
                }
                if (!this._lmdb.gotoNext(output.cursorUUID)) {
                    output.hasNext = false;
                }
            } else if (output.eventBuffer.length === 0 && !output.hasNext) {
                this.endOutput(uuid);
            } else if (output.eventBuffer.length > 0) {
                output.stream.addEvent(output.eventBuffer.shift());
            }
        }
    }

    pauseOutput(uuid) {
        let output = this._outputs[uuid];
        assert(output instanceof Object);

        output.paused = true;
    }

    endOutput(uuid) {
        let output = this._outputs[uuid];
        assert(output instanceof Object);

        output.paused = true;
        output.stream.EOF();

        this._lmdb.closeCursor(output.cursorUUID);
        this._lmdb.abort(output.txnUUID);

        output = null;
        // TODO: clean up properly after ending a stream
    }

    get outputs() {
        return this._outputs;
    }
}

export default LMDBNode;
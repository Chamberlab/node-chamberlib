import Chance from 'chance';
const chance = new Chance();

import through from 'through';
import uuid4 from 'uuid4';
import BaseNode from '../BaseNode';
import DataEvent from '../../events/DataEvent';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';

class Random extends BaseNode {
    constructor(eventCount = 100, channelCount = 1, min = -0.02, max = 0.02, tstart = 0.0, tend = 20.0) {
        super();

        this._eventCount = Math.max(eventCount, 0);
        this._stream = through();
        this._paused = false;

        this._time = 0.0;
        this._min = min;
        this._max = max;
        this._tstart = tstart;
        this._tend = tend;

        this._channelUUIDs = [];
        for (let i = 0; i < channelCount; i++) {
            this._channelUUIDs.push(uuid4());
        }
    }

    pauseOutput() {
        this._paused = true;
    }

    startOutput() {
        const _self = this;
        while (!this._stream.paused && this._stream.readable) {
            const time = new Time(this._time, 's'),
                value = new Voltage(chance.floating({ min: this._min, max: this._max }), 'V'),
                event = new DataEvent(time, value);
            event.parentUUID = chance.pickone(this._channelUUIDs);

            this._time += chance.floating({ min: this._tstart, max: this._tend });
            this._eventCount -= 1;
            this._stream.queue(event);
            if (this._eventCount < 1) {
                this._stream.end(null);
            }
        }
        if (this._stream.readable) {
            setTimeout(function () {
                _self.startOutput();
            }, 10);
        }
    }

    get stream() {
        return this._stream;
    }
}

export default Random;
import Chance from 'chance';
const chance = new Chance();

import BaseNode from '../BaseNode';
import EventOutputStream from '../../streams/EventOutputStream';
import DataEvent from '../../events/DataEvent';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';

class Random extends BaseNode {
    constructor(eventCount = 100, min = -20.0, max = 20.0) {
        super();

        this._eventCount = Math.max(eventCount, 0);
        this._stream = new EventOutputStream(this);
        this._paused = false;

        this._time = 0.0;
        this._min = min;
        this._max = max;

        this.startOutput();
    }

    pauseOutput() {
        this._paused = true;
    }

    startOutput() {
        if (this._paused) {
            this._paused = false;
        }

        while (!this._paused) {
            const time = new Time(this._time, 'ms'),
                value = new Voltage(chance.floating({ min: this._min, max: this._max }), 'mV'),
                event = new DataEvent(time, value);

            this._time += chance.floating({ min: 500, max: 2000 });
            this._eventCount -= 1;
            this._stream.addEvent(event);
            if (this._eventCount < 1) {
                this.pauseOutput();
                this._stream.EOF();
            }
        }
    }

    get stream() {
        return this._stream;
    }
}

export default Random;
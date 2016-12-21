'use strict';

import BaseEvent from './BaseEvent';
import Voltage from '../quantities/Voltage';
import Frequency from '../quantities/Frequency';
import Time from '../quantities/Time';

class DataEvent extends BaseEvent {
    constructor(time, value) {
        super(time, value, [Voltage, Frequency, Time]);

        this.time = time;
        this.value = value;
    }
}

export default DataEvent;
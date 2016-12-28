import BaseEvent from './BaseEvent';
import BaseQuantity from '../quantities/base/BaseQuantity';
import Voltage from '../quantities/Voltage';
import Frequency from '../quantities/Frequency';
import Time from '../quantities/Time';
import Datasize from '../quantities/Datasize';

class DataEvent extends BaseEvent {
    constructor(time, value) {
        super(time, value, [BaseQuantity, Voltage, Frequency, Time, Datasize]);

        this.time = time;
        this.value = value;
    }

    toObject() {
        return { t: this.time.normalized(), v: this.value.normalized() };
    }
}

export default DataEvent;
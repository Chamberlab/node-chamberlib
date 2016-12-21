import BaseCollection from '../data/BaseCollection';
import DataEvent from '../events/DataEvent';

class DataChannel extends BaseCollection {
    constructor(events) {
        super(events, DataEvent);
    }
}

export default DataChannel;
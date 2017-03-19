import assert from 'assert';
import BaseEvent from './BaseEvent';
import Time from '../quantities/Time';
import Note from '../harmonics/Note';
import Chord from '../harmonics/Chord';

class TonalEvent extends BaseEvent {
    constructor(time, value, duration) {
        super(time, value, [Note, Chord]);

        this.time = time;
        this.value = value;

        this.duration = duration;
    }


    get duration() {
        return this._duration;
    }

    set duration(value) {
        assert(value instanceof Time, `Duration value must be of type Time, is ${typeof value}`);

        this._duration = value;
    }
}

export default TonalEvent;
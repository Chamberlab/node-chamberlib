'use strict';

import assert from 'assert';
import DataEvent from './DataEvent';
import Time from '../quantities/Time';
import Note from '../harmonics/Note';
import Chord from '../harmonics/Chord';

class TonalEvent extends DataEvent {
    constructor(time, value, duration = new Time(0.0)) {
        super(time, value, [Note, Chord]);

        this.duration = duration;
    }


    get duration() {
        return this._duration;
    }

    set duration(value) {
        assert(value instanceof Time);
        this._duration = value;
    }
}

export default TonalEvent;
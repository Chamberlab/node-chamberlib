import assert from 'assert';

import BaseRule from '../BaseRule';
import Voltage from '../../quantities/Voltage';
import Time from '../../quantities/Time';
import TonalEvent from '../../events/TonalEvent';
import Chord from '../../harmonics/Chord';
import Note from '../../harmonics/Note';

class VoltageToChord extends BaseRule {
    constructor(key = 'C') {
        super(Voltage, Chord);

        this.key = key;
    }

    evaluate(source) {
        super.evaluate(source, this.processorFunc);
    }

    processorFunc(event) {
        return new TonalEvent(event.time, new Note('C', 4), new Time(1.0, 's'));
    }


    get key() {
        return this._key;
    }

    set key(val) {
        if (typeof val === 'string') {
            val = new Note(val);
        }
        assert(val instanceof Note);
        this._key = val;
    }
}

export default VoltageToChord;
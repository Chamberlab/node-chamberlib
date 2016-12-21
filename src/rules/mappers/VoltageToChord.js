import assert from 'assert';

import BaseRouter from '../base/BaseRouter';
import Voltage from '../../quantities/Voltage';
import Chord from '../../harmonics/Chord';
import Note from '../../harmonics/Note';

class VoltageToChord extends BaseRouter {
    constructor(key = 'C') {
        super(Voltage, Chord);

        this.key = key;
    }

    evaluate(source) {
        super.evaluate(source);

        let names = Chord.getChordNames(this.key);
        return names;
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
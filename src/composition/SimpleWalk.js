import assert from 'assert';

import Track from '../data/Track';
import BaseCollection from '../data/BaseCollection';
import Time from '../quantities/Time';
import TonalEvent from '../events/TonalEvent';
import harmonics from '../harmonics';

class SimpleWalk {
    constructor(useChords = false, scale = 'Major', baseNote = undefined) {
        this.useChords = useChords;
        this.scale = scale;
        this.baseNote = baseNote instanceof harmonics.Note ? baseNote : new harmonics.Note('C4');
    }

    makeTrack(dataEvents, threshold = 0.7, interval = 'P5', duration = undefined, chordSelectHandler = undefined) {
        assert(Array.isArray(dataEvents) || dataEvents instanceof BaseCollection,
            `dataEvents must be Array or BaseCollection, is ${typeof dataEvents}`);

        const tonalEvents = [],
            octave = this.baseNote.octave;

        if (typeof duration === 'undefined') {
            duration = new Time(1 / 16, 's');
        }

        dataEvents.forEach(event => {
            let tonalValue,
                intervalValue = typeof interval === 'function' ? interval(event) : interval,
                durationValue = typeof duration === 'function' ? duration(event) : duration;

            if (event.value.value >= threshold) {
                this.baseNote.transpose(new harmonics.Interval(intervalValue), true);
            }

            if (this.useChords) {
                const chords = harmonics.Chord.getChordNames(this.scale, this.baseNote.key);
                if (chords.length > 0) {
                    if (typeof chordSelectHandler === 'function') {
                        tonalValue = new harmonics.Chord(chordSelectHandler(chords), undefined, octave);
                    } else {
                        tonalValue = new harmonics.Chord(chords[0], undefined, octave);
                    }
                }
            } else {
                tonalValue = new harmonics.Note(this.baseNote.key, octave);
            }

            if (typeof tonalValue !== 'undefined') {
                tonalEvents.push(new TonalEvent(
                    new Time(event.time.normalized(), 's'),
                    tonalValue,
                    durationValue
                ));
            }
        });

        return new Track(tonalEvents);
    }
}

export default SimpleWalk;
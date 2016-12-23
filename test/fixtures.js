import Chance from 'chance';
const chance = new Chance();

import data from '../src/data';
import events from '../src/events';
import quantities from '../src/quantities';

export function makeDataChannel(size, valClass) {
    let channel = new data.DataChannel(chance.word({syllables: 3}));
    while (channel.size < size) {
        channel.push(makeDataEvent(valClass));
    }
    return channel;
}

export function makeDataEvent(valClass) {
    return new events.DataEvent(
        new quantities.Time(chance.floating({min: 0, max: 20000000}), chance.pickone(Object.keys(quantities.Time.units))),
        new valClass(chance.floating({min: -24, max: 24}), chance.pickone(Object.keys(valClass.units)))
    );
}
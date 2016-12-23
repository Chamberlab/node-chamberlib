import Chance from 'chance';
const chance = new Chance();

import data from '../src/data';
import events from '../src/events';
import quantities from '../src/quantities';

const quants = [
    quantities.Datasize,
    quantities.Frequency,
    quantities.Time,
    quantities.Voltage
];

export function makeDataChannel(size, valClass = chance.pickone(quants)) {
    let channel = new data.DataChannel(chance.word({syllables: 3}));
    while (channel.size < size) {
        channel.push(makeDataEvent(valClass));
    }
    return channel;
}

export function makeDataEvent(valClass = chance.pickone(quants)) {
    return new events.DataEvent(
        new quantities.Time(chance.floating({min: 0, max: 20000000}), chance.pickone(Object.keys(quantities.Time.units))),
        new valClass(chance.floating({min: -24, max: 24}), chance.pickone(Object.keys(valClass.units)))
    );
}

export function makeQuantity(valClass = chance.pickone(quants)) {
    return new valClass(chance.floating({min: Number.MIN_VALUE, max: Number.MAX_VALUE}), chance.pickone(Object.keys(valClass.units)));
}

export function makeTime() {
    // TODO: keys and negative time values - will it sort?!?
    return new quantities.Time(chance.floating({min: Number.MIN_VALUE, max: Number.MAX_VALUE}), chance.pickone(Object.keys(quantities.Time.units)));
}
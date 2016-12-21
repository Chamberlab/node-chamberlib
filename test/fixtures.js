import Chance from 'chance';
const chance = new Chance();

import data from '../src/data';
import events from '../src/events';
import quantities from '../src/quantities';

export function makeDataChannel(size, valClass) {
    let channel = new data.DataChannel();
    while (channel.size < size) {
        channel.push(makeDataEvent(valClass));
    }
    return channel;
}

export function makeDataEvent(valClass) {
    return new events.DataEvent(
        new quantities.Time(chance.floating(), chance.pickone(Object.keys(quantities.Time.units))),
        new valClass(chance.floating(), chance.pickone(Object.keys(valClass.units)))
    );
}
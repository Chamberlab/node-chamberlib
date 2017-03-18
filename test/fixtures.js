import Chance from 'chance';
const chance = new Chance();

import data from '../src/data';
import events from '../src/events';
import quantities from '../src/quantities';
import harmonics from '../src/harmonics';

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
    return new valClass(chance.floating({min: Math.MIN_VALUE, max: Math.MAX_VALUE}), 'ms');
}

export function makeTime(startAtZero = false, max) {
    // TODO: keys and negative time values - will it sort?!? implement integer keys as well...
    return new quantities.Time(chance.floating({min: startAtZero ? 0.0 : Math.pow(10, 6) * -1.0, max: max ? max : Math.pow(10, 6)}), 'ms');
}

export function makeLMDBMeta(dir, title) {
    const meta = {
        dataDir: dir,
        mapSize: 32 * Math.pow(1024, 3),
        maxDbs: 10,
        DataSet: {
            title: title,
            DataChannels: {}
        }
    };
    meta.DataSet.DataChannels[title] = {
        type: {
            class: 'DataEvent',
            type: 'Float32',
            length: 1
        },
        keySize: 24,
        keyPrecision: 0,
        keyUnit: 'ms',
        units: ['mV'],
        labels: [chance.word({ syllables: 2 })]
    };
    return meta;
}

export function makeTonalEvent(maxTime = 60000) {
    return new events.TonalEvent(makeTime(true, maxTime), new harmonics.Note(chance.pickone(['C', 'D', 'E', 'F', 'G']), 3), makeTime(true, 6000));
}

export function makeSong() {
    const items = new Array(32).fill(0).map(() => {
            return makeTonalEvent();
        }),
        channel = new data.DataChannel(items, chance.word(), chance.hash()),
        channels = [channel];
    return new data.Song(channels);
}
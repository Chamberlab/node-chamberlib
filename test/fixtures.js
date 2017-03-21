import Chance from 'chance';
import Qty from 'js-quantities';
const chance = new Chance();

import data from '../dist/data';
import events from '../dist/events';
import harmonics from '../dist/harmonics';

export function makeDataChannel(size) {
    let channel = new data.DataChannel(chance.word({syllables: 3}));
    while (channel.size < size) {
        channel.push(makeDataEvent());
    }
    return channel;
}

export function makeDataEvent() {
    return new events.DataEvent(
        chance.floating({min: 0, max: 20000000}) + 'ms',
        chance.floating({min: -24, max: 24}) + 'mV'
    );
}

export function makeEvenlySpacedDataEvents(count = 256, deltaTime = '0.25 s', valMin = 0.0, valMax = 1.0) {
    const dataEvents = [];

    for (let i = 0; i < count; i += 1) {
        dataEvents.push(new events.DataEvent(
            Qty(deltaTime).mul(i).toString(),
            chance.floating({min: valMin, max: valMax }) + 'mV'
        ));
    }

    return dataEvents;
}

export function makeTime(startAtZero = false, max) {
    // TODO: keys and negative time values - will it sort?!? implement integer keys as well...
    return Qty(chance.floating({min: startAtZero ? 0.0 : Math.pow(10, 6) * -1.0, max: max ? max : Math.pow(10, 6)}), 'ms');
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
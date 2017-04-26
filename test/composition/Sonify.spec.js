const chai = require('chai');
chai.should();

import Debug from 'debug';
import Qty from 'js-quantities';
import path from 'path';
import fs from 'fs';
import uuid4 from 'uuid4';

import cl from '../../src';

const debug = Debug('cl:test:Sonify');

describe('cl.composition.Sonify', () => {
    it('Sonify NanoBrain signals', () => {
        const statsPath = path.join(__dirname, '..', '..',
                'data', `${process.env.OUTPUT_BASENAME}-stats.json`),
            channelSpikesPath = path.join(__dirname, '..', '..',
                'data', `${process.env.OUTPUT_BASENAME}-channelSpikes.json`),
            flattenedSpikesPath = path.join(__dirname, '..', '..',
                'data', `${process.env.OUTPUT_BASENAME}-flattenedSpikes.json`),
            evaluate = {
                stats: false,
                channelSpikes: false,
                allSpikes: false
            };

        let _stats, _channelSpikes, _flattenedSpikes;

        return cl.composition.Utilities.loadStats(statsPath)
            .then(stats => {
                if (stats) {
                    _stats = stats;
                } else {
                    evaluate['stats'] = true;
                }
            })
            .then(() => {
                return cl.composition.Utilities.loadChannelSpikes(channelSpikesPath)
                    .then(channelSpikes => {
                        if (channelSpikes) {
                            _channelSpikes = channelSpikes;
                        } else {
                            evaluate['channelSpikes'] = true;
                        }
                    });
            })
            .then(() => {
                return cl.composition.Utilities.loadFlattenedSpikes(flattenedSpikesPath)
                    .then(flattenedSpikes => {
                        if (flattenedSpikes) {
                            _flattenedSpikes = flattenedSpikes;
                        } else {
                            evaluate['flattenedSpikes'] = true;
                        }
                    });
            })
            .then(() => {
                if (!_stats || !_channelSpikes) {
                    if (process.env.PARSE_SPIKETRAINS) {
                        const spikeTrainFile = path.join(__dirname, '..', '..', 'data', process.env.SPIKETRAIN_FILE);
                        return cl.composition.Utilities.parseSpiketrains(spikeTrainFile, evaluate);
                    } else {
                        const dbname = process.env.NB_DBNAME || 'test',
                            dbpath = path.join(__dirname, '..', '..', 'data', 'lmdb', dbname);
                        return new Promise(resolve => {
                            fs.exists(dbpath, exists => {
                                if (exists) {
                                    return resolve(cl.composition.Utilities.parseLMDBFrames(dbname, dbpath, evaluate));
                                }
                                debug('No Nanobrains DB in data, skipping...');
                                resolve();
                            });
                        });
                    }
                }
            })
            .then(res => {
                if (res) {
                    [_stats, _channelSpikes] = res;
                    return cl.composition.Utilities.storeStats(_stats, statsPath)
                        .then(() => cl.composition.Utilities.storeChannelSpikes(
                            _channelSpikes, channelSpikesPath));
                }
            })
            .then(() => {
                if (evaluate['flattenedSpikes'] && _channelSpikes) {
                    return cl.composition.Utilities.flattenChannels(_channelSpikes)
                        .then(flattenedSpikes => {
                            if (flattenedSpikes) {
                                _flattenedSpikes = flattenedSpikes;
                                return cl.composition.Utilities.storeFlattenedSpikes(
                                    flattenedSpikes, flattenedSpikesPath);
                            }
                        });
                }
            })
            .then(() => {
                if (Array.isArray(_stats)) {
                    _stats.forEach((stat, i) => {
                        debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)}`);
                    });
                }
            })
            .then(() => {
                return cl.composition.Utilities.makeClusters(_flattenedSpikes, '0.01 ms');
            })
            .then(spikeClusters => {
                const tonalEvents = [],
                    scale = new cl.harmonics.Scale('C', 'lydian'),
                    noteMap = {
                        '0.10': 0,
                        '0.15': 1,
                        '0.20': 2,
                        '0.25': 3,
                        '0.30': 4,
                        '0.35': 5,
                        '0.40': 6
                    };

                spikeClusters.forEach(cluster => {
                    cluster.sort((a, b) => {
                        if (a.spike.peak.value.lt(b.spike.peak.value)) {
                            return 1;
                        } else if (a.spike.peak.value.gt(b.spike.peak.value)) {
                            return -1;
                        }
                        return 0;
                    }).forEach((evt, i) => {
                        let val = evt.spike.peak.value.scalar,
                            stringVal = (parseFloat((Math.abs(val) * 2.0).toPrecision(1)) * 0.5).toPrecision(2),
                            note = scale.notes[noteMap[stringVal]] ? scale.notes[noteMap[stringVal]] : undefined,
                            intervalHigh = new cl.harmonics.Interval('5P'),
                            intervalLow = new cl.harmonics.Interval('-5P');

                        if (!note) {
                            note = scale.notes[0];
                        }

                        if (i < 7) {
                            note.octave = 3;

                            if (val > 0) {
                                for (let n = 0; n < Math.round(val * 10); n+= 1) {
                                    note.transpose(intervalHigh, true);
                                }
                            } else if (val < 0) {
                                for (let n = 0; n < Math.round(Math.abs(val) * 10); n += 1) {
                                    note.transpose(intervalLow, true);
                                }
                            }

                            tonalEvents.push(new cl.events.TonalEvent(Qty(evt.spike.peak.time), note, Qty('0.25 s')));
                        }
                    });
                });

                return tonalEvents;
            })
            .then(tonalEvents => {
                const dataChannel = new cl.data.DataChannel(tonalEvents, process.env.OUTPUT_BASENAME, uuid4()),
                    song = new cl.data.Song([dataChannel], 120, uuid4());
                return song.toMidiFile(path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}.mid`));
            })
            .catch(err => {
                throw err;
            });
    });
});
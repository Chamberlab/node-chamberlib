const chai = require('chai');
chai.should();

import Debug from 'debug';
import Qty from 'js-quantities';
import path from 'path';
import fs from 'fs';
import uuid4 from 'uuid4';

import cl from '../../src';
import CompositionHelper from '../helpers/CompositionHelper';

const debug = Debug('cl:test:Sonify');

describe('cl.composition.Sonify', () => {
    it('sonifies NanoBrain signals', () => {
        const baseCachePath = path.join(__dirname, '..', '..', 'data', process.env.OUTPUT_BASENAME);

        let _stats, _channelSpikes, _flattenedSpikes, _evaluate, _title = ['spikes', process.env.OUTPUT_BASENAME];

        return CompositionHelper.readCache(baseCachePath)
            .then(res => {
                [_stats, _channelSpikes, _flattenedSpikes, _evaluate] = res;
            })
            .then(() => {
                if (!_stats || !_channelSpikes) {
                    if (process.env.SPIKETRAIN_FILE) {
                        const spikeTrainFile = path.join(__dirname, '..', '..', 'data', process.env.SPIKETRAIN_FILE);
                        return cl.composition.DataParsing.parseSpiketrains(spikeTrainFile, _evaluate, 0.1);
                    }
                }
            })
            .then(res => {
                if (res) {
                    [_stats, _channelSpikes] = res;
                }
            })
            .then(() => {
                if (!_stats || !_channelSpikes) {
                    if (process.env.NB_DBNAME) {
                        const dbname = process.env.NB_DBNAME,
                            dbpath = path.join(__dirname, '..', '..', 'data', 'lmdb', dbname);
                        return new Promise(resolve => {
                            fs.exists(dbpath, exists => {
                                if (exists) {
                                    return resolve(
                                        cl.composition.DataParsing.parseLMDBFrames(dbname, dbpath, _evaluate, 0.1)
                                    );
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
                    if (process.env.FORCE_MERGE) {
                        let [stats, channelSpikes] = res;
                        _stats = _stats.concat(stats.splice(1, 64));
                        _channelSpikes = _channelSpikes.concat(channelSpikes);
                    } else {
                        [_stats, _channelSpikes] = res;
                        _stats = _stats.splice(1, 64);
                    }
                }
            })
            .then(() => {
                return CompositionHelper.plotSpikes(
                    _channelSpikes, path.join(__dirname, '..', '..', 'data'), `${_title.join('-')}-channels`,
                    cl.graphs.layouts.ScatterPlot, process.env.PLOT_SEPARATE_CHANNELS);
            })
            .then(() => {
                if (_evaluate.flattenedSpikes && _channelSpikes) {
                    return cl.composition.DataManipulation.flattenChannels(_channelSpikes)
                        .then(flattenedSpikes => {
                            if (flattenedSpikes) {
                                _flattenedSpikes = flattenedSpikes;
                            }
                        });
                }
            })
            .then(() => {
                return CompositionHelper.writeCache(baseCachePath, _evaluate, _stats, _channelSpikes, _flattenedSpikes);
            })
            .then(() => {
                return CompositionHelper.plotSpikes([_flattenedSpikes.map(s => {
                        return s.spike;
                    })],
                    path.join(__dirname, '..', '..', 'data'), `${_title.join('-')}-flattened`,
                    cl.graphs.layouts.ScatterPlot, false);
            })
            .then(() => {
                if (Array.isArray(_stats)) {
                    _stats.forEach((stat, i) => {
                        debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)}`);
                    });
                }
            })
            .then(() => {
                return cl.composition.DataManipulation.makeClusters(_flattenedSpikes, process.env.MAX_CLUSTER_SPACING);
            })
            .then(spikeClusters => {
                if (Array.isArray(spikeClusters)) {
                    spikeClusters.forEach(cluster => {
                        Debug('cl:composition:Utilities')
                            (`Extracted Cluster at approx. ${cluster[0].spike.peak.time} with ${cluster.length} items`);
                    });
                }
                const tonalEvents = [],
                    scale = new cl.harmonics.Scale(process.env.SCALE_KEY || 'C', process.env.SCALE_NAME || 'lydian'),
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
                        let tonalEvent, val = evt.spike.peak.value.scalar,
                            stringVal = (parseFloat((Math.abs(val) * 2.0).toPrecision(1)) * 0.5).toPrecision(2),
                            note = scale.notes[noteMap[stringVal]] ? scale.notes[noteMap[stringVal]] : undefined,
                            intervalHigh = new cl.harmonics.Interval(process.env.INTERVAL_NAME || '5P'),
                            intervalLow = new cl.harmonics.Interval(`-${process.env.INTERVAL_NAME || '5P'}`);

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

                            tonalEvent = new cl.events.TonalEvent(
                                Qty(evt.spike.peak.time),
                                note,
                                Qty(process.env.DEFAULT_NOTE_LENGTH || '0.25 s')
                            );
                            tonalEvents.push(tonalEvent);
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
            /*
            .catch(err => {
                throw err;
            });
            */
    });
});
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
        const cacheBasePaths = {
            lmdb: path.join(__dirname, '..', '..', 'data', 'lmdb'),
            spiketrains: path.join(__dirname, '..', '..', 'data', 'spiketrains')
        };

        let _stats, _channelSpikes, _flattenedSpikes, _evaluate, _title = ['spikes', process.env.OUTPUT_BASENAME];

        return Promise.resolve()
            .then(() => {
                if (process.env.SPIKETRAIN_FILE) {
                    return CompositionHelper.readCache(cacheBasePaths['spiketrains']);
                }
            })
            .then(res => {
                if (res) {
                    [_stats, _channelSpikes, _flattenedSpikes, _evaluate] = res;
                }
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
                if (process.env.NB_DBNAME) {
                    return CompositionHelper.readCache(cacheBasePaths['lmdb']);
                }
            })
            .then(res => {
                if (res) {
                    if (process.env.FORCE_MERGE) {
                        const [stats, channelSpikes, flattenedSpikes, evaluate] = res;
                        _stats = _stats ? _stats.concat(stats) : stats;
                        _channelSpikes = _channelSpikes ? _channelSpikes.concat(channelSpikes) : channelSpikes;
                        _flattenedSpikes = _flattenedSpikes ? _flattenedSpikes.concat(flattenedSpikes) : flattenedSpikes;
                        _evaluate = evaluate;
                    } else {
                        [_stats, _channelSpikes, _flattenedSpikes, _evaluate] = res;
                    }
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
                        stats = stats.splice(1, 64);
                        _stats = _stats ? _stats.concat(stats) : stats;
                        _channelSpikes = _channelSpikes ? _channelSpikes.concat(channelSpikes) : _channelSpikes;
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
                    cofDegree = new cl.harmonics.CircleOfFifths('C'),
                    cofMode = new cl.harmonics.CircleOfFifths('C'),
                    noteIndexMap = {
                        '-0.10': 0,
                        '0.10': 1,
                        '0.15': 2,
                        '0.20': 3,
                        '0.25': 4,
                        '0.30': 5,
                        '0.40': 6
                    };

                // rotate mode to G
                cofMode.rotate(1);

                spikeClusters.forEach((cluster, cn) => {
                    const clusterStats = {
                        min_active: 0,
                        med_active: 0,
                        max_active: 0,
                        synchronous: 0,
                        time: undefined,
                        spikes_pos: [],
                        spikes_neg: []
                    };
                    cluster.forEach((evt, i) => {
                        const mapVal = Math.abs(evt.spike.peak.value.scalar),
                            sign = Math.sign(evt.spike.peak.value.scalar);
                        if (mapVal >= 0.4) {
                            clusterStats.synchronous += 1;
                        }
                        if (mapVal >= 0.1) {
                            const stringVal = (parseFloat((Math.abs(evt.spike.peak.value.scalar) * 2.0)
                                .toPrecision(1)) * 0.5).toPrecision(2);
                            const spike = {
                                string: stringVal,
                                peak: evt.spike.peak,
                                channel: evt.channel,
                                index: i,
                                sign: sign
                            };
                            if (sign > 0) {
                                clusterStats.spikes_pos.push(spike);
                            } else if (sign < 0) {
                                clusterStats.spikes_neg.push(spike);
                            }
                        }
                    });

                    debug(`Cluster #${cn}: ${clusterStats.synchronous} synchronous spikes`);

                    if (clusterStats.spikes_pos.length === 0 && clusterStats.spikes_neg.length === 0) {
                        return;
                    }

                    const sortAbs = (a, b) => {
                        if (Math.abs(a.peak.value.scalar) < Math.abs(b.peak.value.scalar)) {
                            return 1;
                        } else if (Math.abs(a.peak.value.scalar) > Math.abs(b.peak.value.scalar)) {
                            return -1;
                        }
                        return 0;
                    };

                    if (clusterStats.spikes_pos.length > 0) {
                        clusterStats.spikes_pos.sort(sortAbs);
                        if (!clusterStats.time) {
                            clusterStats.time = clusterStats.spikes_pos[0].peak.time;
                        }

                        if (clusterStats.spikes_pos[0].peak.value.scalar >= 0.45) {
                            let rotationSteps = Math.floor(clusterStats.synchronous * 0.5);
                            debug(`Cluster #${cn}: Rotate degree ${rotationSteps} steps clockwise`);
                            cofDegree.rotate(rotationSteps);
                        }
                    }

                    if (clusterStats.spikes_neg.length > 0) {
                        clusterStats.spikes_neg.sort(sortAbs);
                        if (!clusterStats.time || clusterStats.spikes_neg[0].peak.time.lt(clusterStats.time)) {
                            clusterStats.time = clusterStats.spikes_neg[0].peak.time;
                        }

                        if (clusterStats.spikes_neg[0].peak.value.scalar >= 0.45) {
                            let rotationSteps = Math.floor(clusterStats.synchronous * 0.5);
                            debug(`Cluster #${cn}: Rotate mode ${rotationSteps} steps counterclockwise`);
                            cofMode.rotate(rotationSteps * -1.0);
                        }
                    }

                    let scale = new cl.harmonics.Scale(cofMode.note.toString(), process.env.SCALE_NAME || 'major'),
                        chord = new cl.harmonics.Chord('Maj7', cofDegree.note.toString());

                    debug(`Cluster #${cn}: Generate chord ${chord.type} with tonic ${chord.tonic}`);
                    chord.notes.map(note => {
                        note.octave = 4;
                        let tonalEvent = new cl.events.TonalEvent(clusterStats.time, note,
                            Qty(process.env.DEFAULT_NOTE_LENGTH || '0.25 s')
                        );
                        tonalEvents.push(tonalEvent);
                    });
                });

                return tonalEvents;
            })
            .then(tonalEvents => {
                const dataChannel = new cl.data.DataChannel(tonalEvents, process.env.OUTPUT_BASENAME, uuid4()),
                    song = new cl.data.Song([dataChannel], 120, uuid4());
                return song.toMidiFile(path.join(__dirname, '..', '..', 'data', `${_title.join('-')}.mid`));
            })
            /*
            .catch(err => {
                throw err;
            });
            */
    });
});
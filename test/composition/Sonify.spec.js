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
    it('translates multi-channel sequences of mV spikes to SVG, PNG and MIDI', () => {
        if (!process.env.OUTPUT_BASENAME) {
            debug('Not configured, skipping test.');
            return;
        }

        const baseCachePath = path.join(__dirname, '..', '..', 'data', process.env.OUTPUT_BASENAME),
            cacheBasePaths = {
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
                    startOctave = 2,
                    cos = new cl.harmonics.CircleOfScales(),
                    defaultNoteLength = process.env.DEFAULT_NOTE_LENGTH || '0.25 s',
                    lowThreshold = '0.1 mV',
                    syncThreshold = '0.4 mV',
                    degModeThreshold = '0.45 mV',
                    noteIndexMap = {
                        '-0.10': 0,
                        '0.10': 1,
                        '0.15': 2,
                        '0.20': 3,
                        '0.25': 4,
                        '0.30': 5,
                        '0.40': 6
                    };

                spikeClusters.forEach((cluster, cn) => {
                    const clusterStats = {
                        min_active: 0,
                        med_active: 0,
                        max_active: 0,
                        synchronous_pos: 0,
                        synchronous_neg: 0,
                        time: undefined,
                        spikes_pos: [],
                        spikes_neg: []
                    };
                    cluster.forEach((evt, i) => {
                        const mapVal = Math.abs(evt.spike.peak.value.scalar),
                            sign = Math.sign(evt.spike.peak.value.scalar);

                        if (evt.spike.peak.value.gte(Qty(syncThreshold))) {
                            clusterStats.synchronous_pos += 1;
                        } else if (evt.spike.peak.value.lte(Qty(Qty(syncThreshold).scalar * sign, 'mV'))) {
                            clusterStats.synchronous_neg += 1;
                        }

                        if (mapVal >= Qty(lowThreshold).scalar) {
                            const stringVal = (parseFloat(evt.spike.peak.value.scalar * 2.0)
                                .toPrecision(1) * 0.5).toPrecision(2);
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

                    if (clusterStats.synchronous_pos > 0) {
                        Debug(`cluster:${cn}`)(`${clusterStats.synchronous_pos} synchronous positive spikes`);
                    }
                    if (clusterStats.synchronous_neg > 0) {
                        Debug(`cluster:${cn}`)(`${clusterStats.synchronous_neg} synchronous negative spikes`);
                    }

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

                    clusterStats.spikes_pos.sort(sortAbs);
                    clusterStats.spikes_neg.sort(sortAbs);

                    let peakPos = clusterStats.spikes_pos.length > 0 ?
                            clusterStats.spikes_pos[0].peak.value : Qty(0.0, 'mV'),
                        peakNeg = clusterStats.spikes_neg.length > 0 ?
                            clusterStats.spikes_neg[0].peak.value : Qty(0.0, 'mV');

                    if (clusterStats.spikes_pos.length > 0) {
                        clusterStats.time = clusterStats.spikes_pos[0].peak.time;
                    } else if (clusterStats.spikes_neg.length > 0 &&
                        Math.abs(peakNeg.scalar) > Math.abs(peakPos.scalar)) {
                        clusterStats.time = clusterStats.spikes_neg[0].peak.time;
                    }

                    let chordDegree = 0,
                        chordList = ['Cmaj7', 'Fmaj7#11', 'Gdom7', 'Dm7', 'Am7', 'Em7', 'Bm7b5'];

                    const makeChord = () => {
                        let chord = new cl.harmonics.Chord(chordList[chordDegree]);
                        Debug(`cluster:${cn}`)(`Generating chord ${chord.type} with tonic ${chord.tonic.toString()}`);
                        chord.getNotesFromOctave(1).map(note => {
                            let tonalEvent = new cl.events.TonalEvent(clusterStats.time, note, Qty(defaultNoteLength));
                            tonalEvents.push(tonalEvent);
                        });
                    };

                    if (peakPos.gte(Qty(degModeThreshold)) && peakPos.gt(peakNeg)) {
                        chordDegree = Math.min(Math.floor(clusterStats.synchronous_pos * 0.5), 6);
                        Debug(`cluster:${cn}`)(`Setting degree to ${chordDegree}`);
                        clusterStats.spikes_pos.splice(0, 1);
                        makeChord();
                    } else if (peakNeg.gte(Qty(degModeThreshold)) && peakNeg.gt(peakPos)) {
                        let rotationSteps = Math.floor(clusterStats.synchronous_neg * 0.5);
                        Debug(`cluster:${cn}`)(`Rotating mode ${rotationSteps} steps counterclockwise`);
                        cos.rotate(rotationSteps * -1.0);
                        clusterStats.spikes_neg.splice(0, 1);
                    }

                    clusterStats.spikes_pos.concat(clusterStats.spikes_neg).forEach(spike => {
                        if (noteIndexMap[spike.string] && cos.scale.notes[noteIndexMap[spike.string]]) {
                            let cof = new cl.harmonics.CircleOfFifths('G', startOctave);
                            cof.rotate(noteIndexMap[spike.string]);
                            if (cof.note) {
                                let tonalEvent = new cl.events.TonalEvent(
                                    spike.peak.time, cof.note, Qty(defaultNoteLength)
                                );
                                Debug(`cluster:${cn}`)(`Adding TonalEvent ${tonalEvent.value.toString()} at ` +
                                    `${tonalEvent.time.toString()} for value ${spike.peak.value.toString()}`);
                                tonalEvents.push(tonalEvent);
                            }
                        }
                    });
                });

                return tonalEvents;
            })
            .then(tonalEvents => {
                const dataChannel = new cl.data.DataChannel(tonalEvents, process.env.OUTPUT_BASENAME, uuid4()),
                    song = new cl.data.Song([dataChannel], 120, uuid4());
                return song.toMidiFile(path.join(__dirname, '..', '..', 'data', `${_title.join('-')}.mid`));
            })
            .catch(err => {
                throw err;
            });
    });
});
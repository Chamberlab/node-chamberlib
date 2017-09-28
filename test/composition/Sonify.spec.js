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

        const scaleValues = parseFloat(process.env.SCALE_VALUES) || 1.0,
            baseCachePath = path.join(__dirname, '..', '..', 'data', process.env.OUTPUT_BASENAME),
            cacheBasePaths = {
                lmdb: path.join(__dirname, '..', '..', 'data', process.env.OUTPUT_BASENAME),
                spiketrains: path.join(__dirname, '..', '..', 'data', process.env.OUTPUT_BASENAME)
            };

        let _stats, _channelSpikes, _flattenedSpikes, _evaluate, _title = ['spikes', process.env.OUTPUT_BASENAME];

        return Promise.resolve()
            .then(() => {
                if (process.env.SPIKETRAIN_FILE) {
                    return CompositionHelper.readCache(cacheBasePaths['spiketrains'], process.env.OUTPUT_BASENAME);
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
                        return cl.composition.DataParsing.parseSpiketrains(
                            spikeTrainFile, _evaluate, parseFloat(process.env.SPIKE_THRESHOLD) || 0.01);
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
                            dbpath = path.join(__dirname, '..', '..', 'data', 'lmdb', process.env.NB_DBFOLDER || dbname);
                        return new Promise(resolve => {
                            fs.exists(dbpath, exists => {
                                if (exists) {
                                    return resolve(
                                        cl.composition.DataParsing.parseLMDBFrames(
                                            dbname, dbpath, _evaluate, parseFloat(process.env.SPIKE_THRESHOLD) || 0.01,
                                            parseFloat(process.env.SPIKE_MAX) || undefined)
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
                        debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)} - Avg: ${Qty(stat.avg || '0 mV')}` +
                            ` - Avg pos.: ${Qty(stat.avg_pos || '0 mV')} - Avg neg.: ${Qty(stat.avg_pos || '0 mV')}`);
                        const ranges = stat.distribution.map(entry => {
                            return `${entry.range}:${entry.count}`;
                        });
                        debug(`Channel ${i} - Ranges: ${ranges.join(' ')}`);
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
                let tonalEvents = new Array(process.env.CHANNEL_GROUPING ?
                    cl.data.lut.ChannelMatrix[process.env.CHANNEL_GROUPING]['CHANNEL_COUNT'] : 64).fill(null);
                const startOctave = 2,
                    cos = new cl.harmonics.CircleOfScales(startOctave),
                    defaultNoteLength = process.env.DEFAULT_NOTE_LENGTH || '0.25 s',
                    lowThreshold = '0.001 mV',
                    syncThreshold = '0.02 mV',
                    degModeThreshold = '0.025 mV',
                    chordList = ['Cmaj7', 'Fmaj7#11', 'Gdom7', 'Dm7', 'Am7', 'Em7', 'Bm7b5'],
                    noteIndexMap = {
                        '0.10': 0,
                        '0.15': 1,
                        '0.20': 2,
                        '0.25': 3,
                        '0.30': 4,
                        '0.35': 5,
                        '0.40': 6
                    },
                    /*
                    noteIndexMap = {
                        '0.05': 0,
                        '0.10': 1,
                        '0.15': 2,
                        '0.20': 3,
                        '0.25': 4,
                        '0.30': 5,
                        '0.35': 6
                    },
                    */
                    rootNoteIndexMap = {
                        '0.60': -1,
                        '0.65': 1,
                        '0.70': 2,
                        '0.75': 3,
                        '0.80': 4,
                        '0.85': 4,
                        '0.90': 4,
                        '0.95': 4,
                        '1.00': -3,
                        '1.05': -3,
                        '1.10': -3,
                        '1.15': -3,
                        '1.20': -3,
                        '1.25': -3,
                        '1.30': -3,
                        '1.35': -3,
                        '1.40': -4,
                        '1.45': -4,
                        '1.50': -4,
                        '1.55': -4,
                        '1.60': -4,
                        '1.65': -4,
                        '1.75': -4,
                        '1.80': 5,
                        '1.85': 5,
                        '1.90': 5,
                        '1.95': 5,
                        '2.00': 5,
                        '2.05': 5,
                        '2.10': 5,
                        '2.15': 5,
                        '2.20': 6
                    };
                /*
                    rootNoteIndexMap = {
                        '0.30': -1,
                        '0.35': 1,
                        '0.40': 2,
                        '0.45': 3,
                        '0.50': 4,
                        '0.55': 4,
                        '0.60': 4,
                        '0.65': 4,
                        '0.90': -3,
                        '0.95': -3,
                        '1.00': -3,
                        '1.05': -3,
                        '1.10': -3,
                        '1.15': -3,
                        '1.30': -3,
                        '1.35': -3,
                        '1.40': -4,
                        '1.45': -4,
                        '1.50': -4,
                        '1.55': -4,
                        '1.60': -4,
                        '1.65': -4,
                        '1.75': -4,
                        '1.80': 5,
                        '1.85': 5,
                        '1.90': 5,
                        '1.95': 5,
                        '2.00': 5,
                        '2.05': 5,
                        '2.10': 5,
                        '2.15': 5,
                        '2.20': 6
                    };
                    rootNoteIndexMap = {
                        '0.60': 'F',
                        '0.65': 'G',
                        '0.70': 'D',
                        '0.75': 'A',
                        '0.80': 'E',
                        '0.85': 'E',
                        '0.90': 'E',
                        '0.95': 'E',
                        '1.00': 'Eb',
                        '1.05': 'Eb',
                        '1.10': 'Eb',
                        '1.15': 'Eb',
                        '1.20': 'Eb',
                        '1.25': 'Eb',
                        '1.30': 'Eb',
                        '1.35': 'Eb',
                        '1.40': 'Ab',
                        '1.45': 'Ab',
                        '1.50': 'Ab',
                        '1.55': 'Ab',
                        '1.60': 'Ab',
                        '1.70': 'Ab',
                        '1.75': 'Ab',
                        '1.80': 'Bb',
                        '1.85': 'Bb',
                        '1.90': 'Bb',
                        '1.95': 'Bb',
                        '2.00': 'Bb',
                        '2.05': 'Bb',
                        '2.10': 'Bb',
                        '2.15': 'Bb',
                        '2.20': 'F#'
                    };
                    */

                tonalEvents = tonalEvents.map(() => {
                    return [];
                });

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
                        if (process.env.MAX_CLUSTER_SIZE && i >= parseInt(process.env.MAX_CLUSTER_SIZE)) {
                            return;
                        }
                        const mapVal = Math.abs(evt.spike.peak.value.scalar * scaleValues),
                            sign = Math.sign(evt.spike.peak.value.scalar);

                        if (evt.spike.peak.value.scalar * scaleValues >= Qty(syncThreshold).scalar) {
                            clusterStats.synchronous_pos += 1;
                        } else if (evt.spike.peak.value.scalar * scaleValues <= Qty(syncThreshold).scalar * sign) {
                            clusterStats.synchronous_neg += 1;
                        }

                        clusterStats.synchronous_pos = process.env.MAX_CLUSTER_SIZE ? Math.min(parseInt(process.env.MAX_CLUSTER_SIZE),
                            clusterStats.synchronous_pos) : clusterStats.synchronous_pos;

                        clusterStats.synchronous_neg = process.env.MAX_CLUSTER_SIZE ? Math.min(parseInt(process.env.MAX_CLUSTER_SIZE),
                            clusterStats.synchronous_neg) : clusterStats.synchronous_neg;

                        if (mapVal >= Qty(lowThreshold).scalar) {
                            const stringVal = (parseFloat((mapVal * 2.0).toFixed(1)) * 0.5).toFixed(2);
                            const spike = {
                                string: stringVal,
                                peak: new cl.events.DataEvent(evt.spike.peak.time,
                                    Qty(evt.spike.peak.value.scalar * scaleValues, 'mV')),
                                channel: process.env.CHANNEL_GROUPING ?
                                        cl.data.lut.ChannelMatrix[process.env.CHANNEL_GROUPING][i.toString()] : evt.channel,
                                index: i,
                                sign: sign
                            };
                            if (sign > 0) { // && clusterStats.spikes_pos.length < 6) {
                                clusterStats.spikes_pos.push(spike);
                            } else if (sign < 0) { // && clusterStats.spikes_neg.length < 6) {
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
                    if (process.env.MAX_CLUSTER_SIZE && clusterStats.spikes_pos.length >= parseInt(process.env.MAX_CLUSTER_SIZE)) {
                        clusterStats.spikes_pos = clusterStats.spikes_pos.splice(0,
                            Math.min(clusterStats.spikes_pos.length, process.env.MAX_CLUSTER_SIZE));
                    }

                    clusterStats.spikes_neg.sort(sortAbs);
                    if (process.env.MAX_CLUSTER_SIZE && clusterStats.spikes_neg.length >= parseInt(process.env.MAX_CLUSTER_SIZE)) {
                        clusterStats.spikes_neg = clusterStats.spikes_neg.splice(0,
                            Math.min(clusterStats.spikes_neg.length, process.env.MAX_CLUSTER_SIZE));
                    }

                    let peakPos = clusterStats.spikes_pos.length > 0 ?
                            Qty(Math.abs(clusterStats.spikes_pos[0].peak.value.scalar), 'mV') : Qty(0.0, 'mV'),
                        peakNeg = clusterStats.spikes_neg.length > 0 ?
                            Qty(Math.abs(clusterStats.spikes_neg[0].peak.value.scalar), 'mV') : Qty(0.0, 'mV');

                    if (clusterStats.spikes_pos.length > 0) {
                        clusterStats.time = clusterStats.spikes_pos[0].peak.time;
                    } else if (clusterStats.spikes_neg.length > 0 &&
                        Math.abs(peakNeg.scalar) > Math.abs(peakPos.scalar)) {
                        clusterStats.time = clusterStats.spikes_neg[0].peak.time;
                    }

                    let chordDegree = 0,
                        rootNoteCos = new cl.harmonics.CircleOfScales(startOctave);

                    const makeChord = (spike) => {
                        let chord = new cl.harmonics.Chord(chordList[chordDegree]);
                        Debug(`cluster:${cn}`)(`Generating chord ${chord.type} with tonic ${chord.tonic.toString()}`);
                        chord.getNotesFromOctave(1).map(note => {
                            let tonalEvent = new cl.events.TonalEvent(clusterStats.time, note, Qty(defaultNoteLength));
                            tonalEvents[spike.channel].push(tonalEvent);
                        });
                    };

                    const makeNote = (spike, key = undefined) => {
                        if (key || (typeof noteIndexMap[spike.string] === 'number' && cos.scale.notes[noteIndexMap[spike.string]])) {
                            let cof = new cl.harmonics.CircleOfFifths(key || rootNoteCos.tonic.key, startOctave);
                            cof.rotate(noteIndexMap[spike.string]);
                            if (cof.note) {
                                let tonalEvent = new cl.events.TonalEvent(
                                    spike.peak.time, cof.note, Qty(defaultNoteLength)
                                );
                                tonalEvent.value.velocity = Math.min(Math.abs(spike.peak.value.scalar), 1.0);
                                Debug(`cluster:${cn}`)(`Adding TonalEvent ${tonalEvent.value.toString()} at ` +
                                    `${tonalEvent.time.toString()} for value ${spike.peak.value.toString()}`);
                                tonalEvents[spike.channel].push(tonalEvent);
                            }
                        } else {
                            Debug(`cluster:${cn}`)(`NOT adding TonalEvent for value ${spike.peak.value.toString()} with str ${spike.string}`);
                        }
                    };

                    if (clusterStats.spikes_pos.length > 0 && rootNoteIndexMap[clusterStats.spikes_pos[0].string]) {
                        rootNoteCos = new cl.harmonics.CircleOfScales(startOctave);
                        rootNoteCos.rotate(rootNoteIndexMap[clusterStats.spikes_pos[0].string]);
                    }

                    if (peakPos.gte(Qty(degModeThreshold)) && peakPos.gt(peakNeg)) {
                        chordDegree = Math.min(Math.ceil(clusterStats.synchronous_pos), 6);
                        Debug(`cluster:${cn}`)(`Setting degree to ${chordDegree}`);
                        makeChord(clusterStats.spikes_pos.splice(0, 1)[0])
                    } else if (peakNeg.gte(Qty(degModeThreshold)) && peakNeg.gt(peakPos)) {
                        let rotationSteps = Math.ceil(clusterStats.synchronous_neg);
                        Debug(`cluster:${cn}`)(`Rotating mode ${rotationSteps} steps counterclockwise`);
                        cos.rotate(rotationSteps * -1.0);
                        let key = cos.tonic.key;
                        makeNote(clusterStats.spikes_neg.splice(0, 1)[0], key);
                    } else {
                        /*
                        if (peakPos.gt(peakNeg)) {
                            makeNote(clusterStats.spikes_pos.splice(0, 1));
                        } else {
                            makeNote(clusterStats.spikes_neg.splice(0, 1));
                        }
                        */
                    }

                    clusterStats.spikes_pos.concat(clusterStats.spikes_neg).sort(sortAbs).forEach(spike => {
                        makeNote(spike);
                    });
                });

                return tonalEvents;
            })
            .then(tonalEvents => {
                const song = new cl.data.Song(tonalEvents.map(channel => {
                    return new cl.data.DataChannel(channel, process.env.OUTPUT_BASENAME, uuid4());
                }), 120, uuid4());
                return song.toMidiFile(path.join(__dirname, '..', '..', 'data', `${_title.join('-')}.mid`));
            });
            /*
            .catch(err => {
                throw err;
            });
            */
    });
});
const chai = require('chai');
chai.should();

import Debug from 'debug';
import Qty from 'js-quantities';
import path from 'path';
import fs from 'fs';
import uuid4 from 'uuid4';

import cl from '../../src';

const debug = Debug('cl:sonify');

function storeStatsAndChannelSpikes(statsExtract, spikeExtract, evaluate) {
    let stats, channelSpikes;
    return new Promise((resolve, reject) => {
        if (evaluate['stats']) {
            stats = statsExtract.stats.splice(1, 64);
            fs.writeFile(
                path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}-stats.json`),
                JSON.stringify(stats), err => {
                    if (err) {
                        return reject(err);
                    }
                    resolve();
                });
        } else {
            resolve();
        }
    })
        .then(() => {
            return new Promise((resolve, reject) => {
                if (evaluate['channelSpikes']) {
                    channelSpikes = spikeExtract.spikes;
                    fs.writeFile(
                        path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}-channelSpikes.json`),
                        JSON.stringify(channelSpikes), err => {
                            if (err) {
                                return reject(err);
                            }
                            resolve();
                        });
                } else {
                    resolve();
                }
            });
        })
}

function parseLMDBFrames(dbname, dbpath, evaluate) {

    return new Promise(resolve => {

        const lmdb = new cl.io.db.LMDB(dbpath),
            txn = lmdb.begin(dbname),
            cursor = lmdb.cursor(dbname, txn);

        const selectChannels = new Array(64).fill(null).map((v, i) => {
            return i + 1;
        });

        const spikeExtract = new cl.data.analysis.SpikeExtract(64, 0.1, selectChannels),
            statsExtract = new cl.data.analysis.Statistics(65);

        if (!evaluate['stats']) {
            debug('Using existing stats data');
        }

        if (!evaluate['channelSpikes']) {
            debug('Using existing channel spikes data');
        }

        let stats, channelSpikes, frame, frames = 0;
        for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
            frame = lmdb.getCurrentFrame(dbname, cursor);

            if (evaluate['stats']) {
                statsExtract.evaluate(frame);
            }

            if (evaluate['channelSpikes']) {
                spikeExtract.evaluate(frame);
            }

            if (frames % 200000 === 0) {
                debug(`Key position at ${frame.time} (${frames} data frames)`);
            }
            frames += 1;
        }

        debug(`Key position at ${frame.time} (${frames} data frames)`);

        return storeStatsAndChannelSpikes(statsExtract, spikeExtract, evaluate)
            .then(() => {
                lmdb.closeCursor(cursor);
                lmdb.commit(txn);
                lmdb.closeEnv();

                resolve([statsExtract.stats, spikeExtract.spikes]);
            });
    });
}

function parseSpiketrains(evaluate) {
    const spikeFile = new cl.io.importers.SpiketrainsOE();
    return spikeFile.read(
            path.join(__dirname, '..', '..', 'data', process.env.SPIKETRAIN_FILE)
        )
        .then(channels => {
            const spikeExtract = new cl.data.analysis.SpikeExtract(channels.length, 0.1),
                statsExtract = new cl.data.analysis.Statistics(channels.length);

            let stats, channelSpikes;

            channels.map((channel, i) => {
                channel._items.map(dataEvent => {
                    if (evaluate['stats']) {
                        statsExtract.evaluate(dataEvent, i);
                    }

                    if (evaluate['channelSpikes']) {
                        spikeExtract.evaluate(dataEvent, i);
                    }
                });
            });

            return storeStatsAndChannelSpikes(statsExtract, spikeExtract, evaluate)
                .then(() => {
                    return [stats, channelSpikes];
                });
        });
}


function flattenChannels(channelSpikes) {
    return new Promise((resolve, reject) => {
        const allSpikes = [];

        channelSpikes.forEach((channel, i) => {
            channel.forEach(spike => {
                allSpikes.push({channel: i, spike: spike});
            });
        });

        allSpikes.sort((a, b) => {
            if (a.spike.peak.time.gt(b.spike.peak.time)) {
                return 1;
            } else if (a.spike.peak.time.lt(b.spike.peak.time)) {
                return -1;
            }
            return 0;
        });

        fs.writeFile(path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}-allSpikes.json`),
            JSON.stringify(allSpikes), err => {
                if (err) {
                    return reject(err);
                }
                resolve(allSpikes);
            });
    });
}


function makeClusters(allSpikes) {
    let lastTime = Qty('0s'),
        spikeClusters = [],
        currentCluster = [];

    if (Array.isArray(allSpikes)) {
        allSpikes.forEach((data, i) => {
            if (currentCluster.length > 0 && data.spike.peak.time.sub(lastTime) >= Qty('0.01 ms')) {
                spikeClusters.push(currentCluster);
                debug(`Extracted Cluster at ${currentCluster[0].spike.time} with ${currentCluster.length} items`);
                currentCluster = [];
            }
            currentCluster.push(data);
            // debug(`Spike #${i} delta T ${data.spike.peak.time.sub(lastTime)}`);
            lastTime = data.spike.peak.time;
        });
    }

    return Promise.resolve(spikeClusters);
}

describe('cl.composition.Sonify', () => {
    it('Sonify NanoBrain signals', (cb) => {
        const dbname = process.env.NB_DBNAME || 'test',
            dbpath = path.join(__dirname, '..', '..', 'data', 'lmdb', dbname);

        const evaluate = {
            stats: false,
            channelSpikes: false,
            allSpikes: false
        };

        let _stats, _channelSpikes, _allSpikes;

        if (!fs.existsSync(dbpath)) {
            debug('No Nanobrains DB in data, skipping...');
            return cb();
        }

        const statsPath = path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}-stats.json`),
            channelSpikesPath = path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}-channelSpikes.json`),
            allSpikesPath = path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}-allSpikes.json`);

        if (fs.existsSync(statsPath)) {
            _stats = JSON.parse(fs.readFileSync(statsPath));
        } else {
            evaluate['stats'] = true;
        }

        if (fs.existsSync(channelSpikesPath)) {
            _channelSpikes = JSON.parse(fs.readFileSync(channelSpikesPath)).map(channel => {
                return channel.map(spikeEvent => {
                    return cl.events.SpikeEvent.fromObject(spikeEvent);
                });
            });
        } else {
            evaluate['channelSpikes'] = true;
        }

        if (fs.existsSync(allSpikesPath)) {
            _allSpikes = JSON.parse(fs.readFileSync(allSpikesPath)).map(spikeEvent => {
                return { channel: spikeEvent.channel, spike: cl.events.SpikeEvent.fromObject(spikeEvent.spike) };
            });
        } else {
            evaluate['allSpikes'] = true;
        }

        new Promise((resolve, reject) => {
            if (!_stats || !_channelSpikes) {
                if (process.env.PARSE_SPIKETRAINS) {
                    parseSpiketrains(evaluate)
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                } else {
                    parseLMDBFrames(dbname, dbpath, evaluate)
                        .then(res => resolve(res))
                        .catch(err => reject(err));
                }
            } else {
                resolve();
            }
        })
        .then(res => {
            if (res) {
                [_stats, _channelSpikes] = res;
            }
            if (evaluate['allSpikes'] && _channelSpikes) {
                return flattenChannels(_channelSpikes);
            }
        })
        .then(allSpikes => {
            if (allSpikes) {
                _allSpikes = allSpikes;
            }
            _stats.forEach((stat, i) => {
                debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)}`);
            });
        })
        .then(() => {
            return makeClusters(_allSpikes);
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
            const dataChannel = new cl.data.DataChannel(tonalEvents, 'main', uuid4()),
                song = new cl.data.Song([dataChannel], 120, uuid4());
            song.toMidiFile(path.join(__dirname, '..', '..', 'data', `${process.env.OUTPUT_BASENAME}.mid`))
                .then(() => cb());
        })
        .catch(err => {
            cb(err);
        });

    });
});
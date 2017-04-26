import Qty from 'js-quantities';
import fs from 'fs';
import Debug from 'debug';
import assert from 'assert';

import LMDB from '../io/db/LMDB';
import SpiketrainsOE from '../io/importers/SpiketrainsOE';
import SpikeExtract from '../data/analysis/SpikeExtract';
import SpikeEvent from '../events/SpikeEvent';
import Statistics from '../data/analysis/Statistics';

class Utilities {
    static storeStats(statsExtract, filePath) {
        assert(statsExtract instanceof Statistics, 'Argument Error: statsExtract type mismatch');
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        let stats;
        return new Promise((resolve, reject) => {
            stats = statsExtract.stats.splice(1, 64);
            fs.writeFile(filePath, JSON.stringify(stats), err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static loadStats(filePath) {
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            fs.exists(filePath, exists => {
                if (exists) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(JSON.parse(data));
                    });
                } else {
                    Debug('cl:composition:Utilities')('Stats file does not exist.');
                    resolve();
                }
            });
        });
    }

    static storeChannelSpikes(spikeExtract, filePath) {
        assert(spikeExtract instanceof SpikeExtract, 'Argument Error: spikeExtract type mismatch');
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        let channelSpikes;
        return new Promise((resolve, reject) => {
            channelSpikes = spikeExtract.spikes;
            fs.writeFile(filePath, JSON.stringify(channelSpikes), err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static loadChannelSpikes(filePath) {
        let channelSpikes;
        return new Promise((resolve, reject) => {
            fs.exists(filePath, exists => {
                if (exists) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        channelSpikes = JSON.parse(data).map(channel => {
                            return channel.map(spikeEvent => {
                                return SpikeEvent.fromObject(spikeEvent);
                            });
                        });
                        resolve(channelSpikes);
                    });
                } else {
                    Debug('cl:composition:Utilities')('Channel spikes file does not exist.');
                    resolve();
                }
            });
        });
    }

    static storeFlattenedSpikes(flattenedSpikes, filePath) {
        assert(Array.isArray(flattenedSpikes), 'Argument Error: flattenedSpikes type mismatch');
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(flattenedSpikes), err => {
                if (err) {
                    return reject(err);
                }
                resolve(flattenedSpikes);
            });
        });
    }

    static loadFlattenedSpikes(filePath) {
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            let flattenedSpikes;
            fs.exists(filePath, exists => {
                if (exists) {
                    fs.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        flattenedSpikes = JSON.parse(data).map(spikeEvent => {
                            return {
                                channel: spikeEvent.channel,
                                spike: SpikeEvent.fromObject(spikeEvent.spike)
                            };
                        });
                        resolve(flattenedSpikes);
                    });
                } else {
                    Debug('cl:composition:Utilities')('Flattened spikes file does not exist.');
                    resolve();
                }
            });
        });

    }

    static parseLMDBFrames(dbname, dbpath, evaluate) {
        return new Promise(resolve => {
            const lmdb = new LMDB(dbpath),
                txn = lmdb.begin(dbname),
                cursor = lmdb.cursor(dbname, txn);

            const selectChannels = new Array(64).fill(null).map((v, i) => {
                    return i + 1;
                }),
                spikeExtract = new SpikeExtract(64, 0.1, selectChannels),
                statsExtract = new Statistics(65);

            if (!evaluate.stats) {
                Debug('cl:composition:Utilities')('Using existing stats data');
            }

            if (!evaluate.channelSpikes) {
                Debug('cl:composition:Utilities')('Using existing channel spikes data');
            }

            let frame, frames = 0;
            for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
                frame = lmdb.getCurrentFrame(dbname, cursor);

                if (evaluate.stats) {
                    statsExtract.evaluate(frame);
                }

                if (evaluate.channelSpikes) {
                    spikeExtract.evaluate(frame);
                }

                if (frames % 200000 === 0) {
                    Debug('cl:composition:Utilities')(`Key position at ${frame.time} (${frames} data frames)`);
                }
                frames += 1;
            }

            Debug('cl:composition:Utilities')(`Key position at ${frame.time} (${frames} data frames)`);

            lmdb.closeCursor(cursor);
            lmdb.commit(txn);
            lmdb.closeEnv();

            resolve([statsExtract.stats, spikeExtract.spikes]);
        });
    }

    static parseSpiketrains(spiketrainFile, evaluate) {
        const spikeFile = new SpiketrainsOE();
        return spikeFile.read(spiketrainFile)
            .then(channels => {
                const spikeExtract = new SpikeExtract(channels.length, 0.1),
                    statsExtract = new Statistics(channels.length);

                channels.map((channel, i) => {
                    channel._items.map(dataEvent => {
                        if (evaluate.stats) {
                            statsExtract.evaluate(dataEvent, i);
                        }

                        if (evaluate.channelSpikes) {
                            spikeExtract.evaluate(dataEvent, i);
                        }
                    });
                });

                return [statsExtract.stats, spikeExtract.spikes];
            });
    }

    static flattenChannels(channelSpikes) {
        return new Promise((resolve) => {
            const flattenedSpikes = [];

            channelSpikes.forEach((channel, i) => {
                channel.forEach(spike => {
                    flattenedSpikes.push({channel: i, spike: spike});
                });
            });

            flattenedSpikes.sort((a, b) => {
                if (a.spike.peak.time.gt(b.spike.peak.time)) {
                    return 1;
                } else if (a.spike.peak.time.lt(b.spike.peak.time)) {
                    return -1;
                }
                return 0;
            });

            resolve(flattenedSpikes);
        });
    }

    static makeClusters(flattenedSpikes, maxTimeDifference = '1 ms') {
        let lastTime = Qty('0s'),
            spikeClusters = [],
            currentCluster = [];

        if (Array.isArray(flattenedSpikes)) {
            flattenedSpikes.forEach(data => {
                if (currentCluster.length > 0 && data.spike.peak.time.sub(lastTime) >= Qty(maxTimeDifference)) {
                    spikeClusters.push(currentCluster);
                    Debug('cl:composition:Utilities')(`Extracted Cluster at ${currentCluster[0].spike.time} with ${currentCluster.length} items`);
                    currentCluster = [];
                }
                currentCluster.push(data);
                lastTime = data.spike.peak.time;
            });
        }

        return Promise.resolve(spikeClusters);
    }
}

export default Utilities;
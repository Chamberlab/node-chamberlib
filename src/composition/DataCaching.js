import fs from 'fs';
import Debug from 'debug';
import assert from 'assert';
import Qty from 'js-quantities';

import SpikeEvent from '../events/SpikeEvent';

class DataCaching {
    static storeStats(stats, filePath, spliceStart = undefined, spliceEnd = undefined) {
        assert(Array.isArray(stats), 'Argument Error: stats type mismatch');
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            if (typeof spliceStart === 'number' && typeof spliceEnd === 'number') {
                stats = stats.splice(spliceStart, spliceEnd);
            }
            fs.writeFile(filePath, JSON.stringify(stats), err => {
                if (err) {
                    //return reject(err);
                    Debug('cl:composition:Utilities')(`Unable to store stats: ${err.message}`);
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
        })
        .then(rawStats => {
            if (rawStats) {
                return rawStats.map((stats) => {
                    return {
                        min: Qty(stats.min.scalar, stats.min._units),
                        max: Qty(stats.max.scalar, stats.max._units),
                        avg: Qty(stats.avg.scalar, stats.avg._units),
                        avg_pos: Qty(stats.avg_pos.scalar, stats.avg_pos._units),
                        avg_neg: Qty(stats.avg_neg.scalar, stats.avg_neg._units),
                        distribution: stats.distribution.map(entry => {
                            entry.range = Qty(entry.range.scalar, entry.range._units);
                            return entry;
                        })
                    };
                });
            }
        });
    }

    static storeChannelSpikes(channelSpikes, filePath) {
        assert(Array.isArray(channelSpikes), 'Argument Error: channelSpikes type mismatch');
        assert(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            fs.writeFile(filePath, JSON.stringify(channelSpikes), err => {
                if (err) {
                    //return reject(err);
                    Debug('cl:composition:Utilities')(`Unable to store channel spikes: ${err.message}`);
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
                    //return reject(err);
                    Debug('cl:composition:Utilities')(`Unable to store flattened spikes: ${err.message}`);
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
}

export default DataCaching;
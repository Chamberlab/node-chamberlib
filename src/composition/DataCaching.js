import fs from 'fs';
import Debug from 'debug';
import assert from 'assert';

import SpikeEvent from '../events/SpikeEvent';

class DataCaching {
    static storeStats(statsExtract, filePath) {
        // TODO: check why this is not working with instanceof, would be safer for refactoring
        assert(statsExtract.constructor.name === 'Statistics', 'Argument Error: statsExtract type mismatch');
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
        assert(spikeExtract.constructor.name === 'SpikeExtract', 'Argument Error: spikeExtract type mismatch');
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
}

export default DataCaching;
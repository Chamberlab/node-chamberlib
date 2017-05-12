'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _SpikeEvent = require('../events/SpikeEvent');

var _SpikeEvent2 = _interopRequireDefault(_SpikeEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataCaching {
    static storeStats(stats, filePath, spliceStart = undefined, spliceEnd = undefined) {
        // TODO: check why this is not working with instanceof, would be safer for refactoring
        (0, _assert2.default)(Array.isArray(stats), 'Argument Error: stats type mismatch');
        (0, _assert2.default)(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            if (typeof spliceStart === 'number' && typeof spliceEnd === 'number') {
                stats = stats.splice(spliceStart, spliceEnd);
            }
            _fs2.default.writeFile(filePath, JSON.stringify(stats), err => {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    }

    static loadStats(filePath) {
        (0, _assert2.default)(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            _fs2.default.exists(filePath, exists => {
                if (exists) {
                    _fs2.default.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        resolve(JSON.parse(data));
                    });
                } else {
                    (0, _debug2.default)('cl:composition:Utilities')('Stats file does not exist.');
                    resolve();
                }
            });
        }).then(rawStats => {
            if (rawStats) {
                return rawStats.map(stats => {
                    return {
                        min: (0, _jsQuantities2.default)(stats.min.scalar, stats.min._units),
                        max: (0, _jsQuantities2.default)(stats.max.scalar, stats.max._units),
                        avg: (0, _jsQuantities2.default)(stats.avg.scalar, stats.avg._units),
                        avg_pos: (0, _jsQuantities2.default)(stats.avg_pos.scalar, stats.avg_pos._units),
                        avg_neg: (0, _jsQuantities2.default)(stats.avg_neg.scalar, stats.avg_neg._units),
                        distribution: stats.distribution.map(entry => {
                            entry.range = (0, _jsQuantities2.default)(entry.range.scalar, entry.range._units);
                            return entry;
                        })
                    };
                });
            }
        });
    }

    static storeChannelSpikes(channelSpikes, filePath) {
        (0, _assert2.default)(Array.isArray(channelSpikes), 'Argument Error: channelSpikes type mismatch');
        (0, _assert2.default)(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            _fs2.default.writeFile(filePath, JSON.stringify(channelSpikes), err => {
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
            _fs2.default.exists(filePath, exists => {
                if (exists) {
                    _fs2.default.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        channelSpikes = JSON.parse(data).map(channel => {
                            return channel.map(spikeEvent => {
                                return _SpikeEvent2.default.fromObject(spikeEvent);
                            });
                        });
                        resolve(channelSpikes);
                    });
                } else {
                    (0, _debug2.default)('cl:composition:Utilities')('Channel spikes file does not exist.');
                    resolve();
                }
            });
        });
    }

    static storeFlattenedSpikes(flattenedSpikes, filePath) {
        (0, _assert2.default)(Array.isArray(flattenedSpikes), 'Argument Error: flattenedSpikes type mismatch');
        (0, _assert2.default)(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            _fs2.default.writeFile(filePath, JSON.stringify(flattenedSpikes), err => {
                if (err) {
                    return reject(err);
                }
                resolve(flattenedSpikes);
            });
        });
    }

    static loadFlattenedSpikes(filePath) {
        (0, _assert2.default)(typeof filePath === 'string', 'Argument Error: Invalid filePath');

        return new Promise((resolve, reject) => {
            let flattenedSpikes;
            _fs2.default.exists(filePath, exists => {
                if (exists) {
                    _fs2.default.readFile(filePath, (err, data) => {
                        if (err) {
                            return reject(err);
                        }
                        flattenedSpikes = JSON.parse(data).map(spikeEvent => {
                            return {
                                channel: spikeEvent.channel,
                                spike: _SpikeEvent2.default.fromObject(spikeEvent.spike)
                            };
                        });
                        resolve(flattenedSpikes);
                    });
                } else {
                    (0, _debug2.default)('cl:composition:Utilities')('Flattened spikes file does not exist.');
                    resolve();
                }
            });
        });
    }
}

exports.default = DataCaching;
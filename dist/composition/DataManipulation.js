'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataManipulation {
    static flattenChannels(channelSpikes) {
        return new Promise(resolve => {
            const flattenedSpikes = [];

            channelSpikes.forEach((channel, i) => {
                channel.forEach(spike => {
                    flattenedSpikes.push({ channel: i, spike: spike });
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
        let lastTime = (0, _jsQuantities2.default)('0s'),
            spikeClusters = [],
            currentCluster = [];

        if (Array.isArray(flattenedSpikes)) {
            flattenedSpikes.forEach(data => {
                if (currentCluster.length > 0 && data.spike.peak.time.sub(lastTime) >= (0, _jsQuantities2.default)(maxTimeDifference)) {
                    spikeClusters.push(currentCluster);
                    currentCluster = [];
                }
                currentCluster.push(data);
                lastTime = data.spike.peak.time;
            });
        }

        return Promise.resolve(spikeClusters);
    }
}

exports.default = DataManipulation;
import Qty from 'js-quantities';

class DataManipulation {
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
                    currentCluster = [];
                }
                currentCluster.push(data);
                lastTime = data.spike.peak.time;
            });
        }

        return Promise.resolve(spikeClusters);
    }
}

export default DataManipulation;
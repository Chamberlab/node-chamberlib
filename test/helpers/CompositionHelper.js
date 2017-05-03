import uuid4 from 'uuid4';
import cl from '../../src';

class CompositionHelper {
    static readCache(basePath) {
        const statsPath = `${basePath}-stats.json`,
            channelSpikesPath = `${basePath}-channelSpikes.json`,
            flattenedSpikesPath = `${basePath}-flattenedSpikes.json`,
            evaluate = {
                stats: false,
                channelSpikes: false,
                allSpikes: false
            };

        let _stats, _channelSpikes, _flattenedSpikes;

        return cl.composition.DataCaching.loadStats(statsPath)
            .then(stats => {
                if (stats) {
                    _stats = stats;
                } else {
                    evaluate.stats = true;
                }
            })
            .then(() => {
                return cl.composition.DataCaching.loadChannelSpikes(channelSpikesPath)
                    .then(channelSpikes => {
                        if (channelSpikes) {
                            _channelSpikes = channelSpikes;
                        } else {
                            evaluate.channelSpikes = true;
                        }
                    });
            })
            .then(() => {
                return cl.composition.DataCaching.loadFlattenedSpikes(flattenedSpikesPath)
                    .then(flattenedSpikes => {
                        if (flattenedSpikes) {
                            _flattenedSpikes = flattenedSpikes;
                        } else {
                            evaluate.flattenedSpikes = true;
                        }
                    });
            })
            .then(() => {
                return [_stats, _channelSpikes, _flattenedSpikes, evaluate];
            });
    }

    static writeCache(basePath, evaluate, stats, channelSpikes, flattenedSpikes) {
        const statsPath = `${basePath}-stats.json`,
            channelSpikesPath = `${basePath}-channelSpikes.json`,
            flattenedSpikesPath = `${basePath}-flattenedSpikes.json`;

        return new Promise(resolve => resolve())
            .then(() => {
                if (evaluate.stats && stats) {
                    return cl.composition.DataCaching.storeStats(stats, statsPath);
                }
            })
            .then(() => {
                if (evaluate.channelSpikes && channelSpikes) {
                    return cl.composition.DataCaching.storeChannelSpikes(channelSpikes, channelSpikesPath);
                }
            })
            .then(() => {
                if (evaluate.flattenedSpikes && flattenedSpikes) {
                    return cl.composition.DataCaching.storeFlattenedSpikes(flattenedSpikes, flattenedSpikesPath);
                }
            });
    }

    static plotSpikes(spikeData, basePath, title, graphClass, separateChannels) {
        const dataSet = new cl.data.DataSet(spikeData.map((channel, i) => {
            return new cl.data.DataChannel(channel.map(spike => {
                return spike.peak;
            }), `channel-${i}`, uuid4());
        }), title, uuid4());
        const plotter = new cl.graphs.DataPlotter(dataSet, basePath, title);
        return plotter.generateChart(graphClass, separateChannels);
    }
}

export default CompositionHelper;
import Debug from 'debug';

import LMDB from '../io/db/LMDB';
import SpiketrainsOE from '../io/importers/SpiketrainsOE';

import SpikeExtract from '../data/analysis/SpikeExtract';
import Statistics from '../data/analysis/Statistics';

class DataParsing {
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
                const spikeExtract = new SpikeExtract(channels.length, 0.0),
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
}

export default DataParsing;
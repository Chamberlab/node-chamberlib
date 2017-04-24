const chai = require('chai');
chai.should();

import Debug from 'debug';
import Qty from 'js-quantities';
import path from 'path';
import fs from 'fs';

import cl from '../../src';

const debug = Debug('cl:sonify');

describe('cl.composition.Sonify', () => {
    it('Sonify raw NanoBrain signals', (cb) => {
        const dbname = process.env.NB_DBNAME || 'test',
            dbpath = path.join(__dirname, '..', '..', 'data', 'lmdb', dbname);

        const evaluate = {
            stats: false,
            channelSpikes: false,
            allSpikes: false
        };

        let stats, channelSpikes, allSpikes;

        if (!fs.existsSync(dbpath)) {
            debug('No Nanobrains DB in data, skipping...');
            return cb();
        }

        const statsPath = path.join(__dirname, '..', '..', 'data', 'stats.json'),
            channelSpikesPath = path.join(__dirname, '..', '..', 'data', 'channelSpikes.json'),
            allSpikesPath = path.join(__dirname, '..', '..', 'data', 'allSpikes.json');

        if (fs.existsSync(statsPath)) {
            stats = JSON.parse(fs.readFileSync(statsPath));
            stats.forEach((stat, i) => {
                debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)}`);
            });
        } else {
            evaluate['stats'] = true;
        }

        if (fs.existsSync(channelSpikesPath)) {
            channelSpikes = JSON.parse(fs.readFileSync(channelSpikesPath));
        } else {
            evaluate['channelSpikes'] = true;
        }

        if (fs.existsSync(allSpikesPath)) {
            allSpikes = JSON.parse(fs.readFileSync(allSpikesPath));
        } else {
            evaluate['allSpikes'] = true;
        }

        if (!stats || !channelSpikes) {

            const lmdb = new cl.io.db.LMDB(dbpath),
                txn = lmdb.begin(dbname),
                cursor = lmdb.cursor(dbname, txn),
                min = Qty(-0.5, 'mV'),
                max = Qty(0.5, 'mV'),
                channel = lmdb.meta.DataSet.DataChannels[dbname];

            // highest spike, spike count, spike mv sum

            const spikeExtract = new cl.data.analysis.SpikeExtract(64, 0.2, 1),
                statsExtract = new cl.data.analysis.Statistics(65);

            if (!evaluate['stats']) {
                debug('Using existing stats data');
            }

            if (!evaluate['channelSpikes']) {
                debug('Using existing channel spikes data');
            }

            let frame, value, frames = 0;
            for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
                frame = lmdb.getCurrentFrame(dbname, cursor);

                // cascade and switch master ruleset/system
                // start on f, tonic is c

                //let dist = new ValueDistribution({ quantize: 0.01 }); // percentage, detect modes for value distribution

                // negative circle left (diminish b), positive circle right (augment #)

                if (evaluate['stats']) {
                    statsExtract.evaluate(frame);
                }

                if (evaluate['channelSpikes']) {
                    spikeExtract.evaluate(frame);
                }

                // cutoff 0.2
                // grundtonwechsel 1.0

                if (frames % 200000 === 0) {
                    debug(`Key position at ${frame.time} (${frames} data frames)`);
                }
                frames += 1;
            }

            debug(`Key position at ${frame.time} (${frames} data frames)`);

            if (evaluate['stats']) {
                fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'stats.json'),
                    JSON.stringify(statsExtract.stats));
            }

            if (evaluate['channelSpikes']) {
                fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'channelSpikes.json'),
                    JSON.stringify(spikeExtract.spikes));
            }

            lmdb.closeCursor(cursor);
            lmdb.commit(txn);
            lmdb.closeEnv();

        }

        if (evaluate['allSpikes'] && channelSpikes) {
            allSpikes = [];

            channelSpikes.spikes.forEach((channel, i) => {
                channel.forEach(spike => {
                    allSpikes.push({ channel: i, spike: spike });
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

            fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'allSpikes.json'), JSON.stringify(allSpikes));
        }

        setTimeout(cb, 100);
    });
});
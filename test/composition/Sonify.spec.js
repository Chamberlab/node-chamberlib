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

        if (!fs.existsSync(dbpath)) {
            debug('No Nanobrains DB in data, skipping...');
            return cb();
        }

        const st = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'stats.json'))),
            ld = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'spikes.json'))),
            lds = JSON.parse(fs.readFileSync(path.join(__dirname, '..', '..', 'data', 'allSpikes.json')));

        st.forEach((stat, i) => {
            debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)}`);
        });

        const lmdb = new cl.io.db.LMDB(dbpath),
            txn = lmdb.begin(dbname),
            cursor = lmdb.cursor(dbname, txn),
            min = Qty(-0.5, 'mV'),
            max = Qty(0.5, 'mV'),
            channel = lmdb.meta.DataSet.DataChannels[dbname];

        // highest spike, spike count, spike mv sum

        const extract = new cl.data.analysis.SpikeExtract(64, 0.2, 1),
            stats = new cl.data.analysis.Statistics(65);

        let frame, value, frames = 0;
        for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
            frame = lmdb.getCurrentFrame(dbname, cursor);

            // cascade and switch master ruleset/system
            // start on f, tonic is c

            //let dist = new ValueDistribution({ quantize: 0.01 }); // percentage, detect modes for value distribution

            // negative circle left (diminish b), positive circle right (augment #)

            //dist.evaluate(frame);
            stats.evaluate(frame);
            extract.evaluate(frame);

            // cutoff 0.2
            // grundtonwechsel 1.0

            /*
            frame.value.forEach((val, i) => {
                value = Qty(val, channel.units[i]);
                if (value.isCompatible(max) && value.isCompatible(min)) {
                    if (value.gte(max)) {
                        Debug('cl:trigger')(`${value} >= ${max} on ${channel.labels[i]} at ${frame.time}`);
                    } else if (value.lte(min)) {
                        Debug('cl:trigger')(`${value} <= ${min} on ${channel.labels[i]} at ${frame.time}`);
                    }
                }
            });
            */

            if (frames % 200000 === 0) {
                debug(`Key position at ${frame.time} (${frames} data frames)`);
            }
            frames += 1;
        }

        debug(`Key position at ${frame.time} (${frames} data frames)`);

        const allSpikes = [];

        extract.spikes.forEach((channel, i) => {
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

        fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'stats.json'), JSON.stringify(stats.stats));
        fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'spikes.json'), JSON.stringify(extract.spikes));
        fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'allSpikes.json'), JSON.stringify(allSpikes));

        lmdb.closeCursor(cursor);
        lmdb.commit(txn);
        lmdb.closeEnv();

        setTimeout(cb, 100);
    });
});
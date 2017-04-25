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
        } else {
            evaluate['stats'] = true;
        }

        if (fs.existsSync(channelSpikesPath)) {
            channelSpikes = JSON.parse(fs.readFileSync(channelSpikesPath)).map(channel => {
                return channel.map(spikeEvent => {
                    return cl.events.SpikeEvent.fromObject(spikeEvent);
                });
            });
        } else {
            evaluate['channelSpikes'] = true;
        }

        if (fs.existsSync(allSpikesPath)) {
            allSpikes = JSON.parse(fs.readFileSync(allSpikesPath)).map(spikeEvent => {
                return { channel: spikeEvent.channel, spike: cl.events.SpikeEvent.fromObject(spikeEvent.spike) };
            });
        } else {
            evaluate['allSpikes'] = true;
        }

        if (!stats || !channelSpikes) {

            const lmdb = new cl.io.db.LMDB(dbpath),
                txn = lmdb.begin(dbname),
                cursor = lmdb.cursor(dbname, txn);

            // highest spike, spike count, spike mv sum

            const selectChannels = new Array(64).fill(null).map((v, i) => {
                return i + 1;
            });

            const spikeExtract = new cl.data.analysis.SpikeExtract(64, 0.05, selectChannels),
                statsExtract = new cl.data.analysis.Statistics(65);

            if (!evaluate['stats']) {
                debug('Using existing stats data');
            }

            if (!evaluate['channelSpikes']) {
                debug('Using existing channel spikes data');
            }

            let frame, frames = 0;
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
                stats = statsExtract.stats.splice(1, 64);
                fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'stats.json'),
                    JSON.stringify(stats));
            }

            if (evaluate['channelSpikes']) {
                channelSpikes = spikeExtract.spikes;
                fs.writeFileSync(path.join(__dirname, '..', '..', 'data', 'channelSpikes.json'),
                    JSON.stringify(channelSpikes));
            }

            lmdb.closeCursor(cursor);
            lmdb.commit(txn);
            lmdb.closeEnv();

        }

        if (evaluate['allSpikes'] && channelSpikes) {
            allSpikes = [];

            channelSpikes.forEach((channel, i) => {
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

        stats.forEach((stat, i) => {
            debug(`Channel ${i} - Min: ${Qty(stat.min)} - Max: ${Qty(stat.max)}`);
        });

        let lastTime = Qty('0s'),
            spikeClusters = [],
            currentCluster = [];

        allSpikes.forEach((data, i) => {
            if (currentCluster.length > 0 && data.spike.peak.time.sub(lastTime) >= Qty('0.1 ms')) {
                spikeClusters.push(currentCluster);
                debug(`Extracted Cluster at ${currentCluster[0].spike.time} with ${currentCluster.length} items`);
                currentCluster = [];

            } else {
                currentCluster.push(data);
            }
            //debug(`Spike #${i} delta T ${data.spike.peak.time.sub(lastTime)}`);
            lastTime = data.spike.peak.time;
        });

        const tonalEvents = [];
        spikeClusters.forEach(cluster => {
            cluster.sort((a, b) => {
                if (a.spike.peak.value.gt(b.spike.peak.value)) {
                    return 1;
                } else if (a.spike.peak.value.lt(b.spike.peak.value)) {
                    return -1;
                }
                return 0;
            }).forEach((evt, i) => {
                if (i === 0) {
                    const val = evt.spike.peak.value._scalar,
                        note = new cl.harmonics.Note('C4'),
                        intervalHigh = new cl.harmonics.Interval('5P'),
                        intervalLow = new cl.harmonics.Interval('-5P');
                    if (val > 0) {
                        for (let n = 0; n < Math.round(val / 0.2); n+= 1) {
                            note.transpose(intervalHigh, true);
                        }
                    } else if (val < 0) {
                        for (let n = 0; n < Math.round(Math.abs(val) / 0.2); n += 1) {
                            note.transpose(intervalLow, true);
                        }
                    }
                    const event = new cl.events.TonalEvent(Qty(evt.spike.peak.time), note, Qty('0.25 s'));
                    tonalEvents.push(event);
                }
            });
        });

        const dataChannel = new cl.data.DataChannel(tonalEvents, 'main', 'asdf'),
            song = new cl.data.Song([dataChannel], 120, 'asssddddfffff');
        song.toMidiFile(path.join(__dirname, '..', '..', 'data', 'out.mid'))
            .then(() => {
                setTimeout(cb, 1000);
            });
    });
});
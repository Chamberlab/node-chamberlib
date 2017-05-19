'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _LMDB = require('../io/db/LMDB');

var _LMDB2 = _interopRequireDefault(_LMDB);

var _SpiketrainsOE = require('../io/importers/SpiketrainsOE');

var _SpiketrainsOE2 = _interopRequireDefault(_SpiketrainsOE);

var _SpikeExtract = require('../data/analysis/SpikeExtract');

var _SpikeExtract2 = _interopRequireDefault(_SpikeExtract);

var _Statistics = require('../data/analysis/Statistics');

var _Statistics2 = _interopRequireDefault(_Statistics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DataParsing {
    static parseLMDBFrames(dbname, dbpath, evaluate, lowCut = 0.01, highCut = Number.MAX_SAFE_INTEGER) {
        return new Promise(resolve => {
            const lmdb = new _LMDB2.default(dbpath),
                  txn = lmdb.begin(dbname),
                  cursor = lmdb.cursor(dbname, txn);

            const selectChannels = new Array(64).fill(null).map((v, i) => {
                return i + 1;
            }),
                  spikeExtract = new _SpikeExtract2.default(64, lowCut, selectChannels, highCut),
                  statsExtract = new _Statistics2.default(65);

            if (!evaluate.stats) {
                (0, _debug2.default)('cl:composition:Utilities')('Using existing stats data');
            }

            if (!evaluate.channelSpikes) {
                (0, _debug2.default)('cl:composition:Utilities')('Using existing channel spikes data');
            }

            let frame,
                frames = 0;
            for (let hasnext = lmdb.gotoFirst(cursor); hasnext; hasnext = lmdb.gotoNext(cursor)) {
                frame = lmdb.getCurrentFrame(dbname, cursor);

                if (evaluate.stats) {
                    statsExtract.evaluate(frame);
                }

                if (evaluate.channelSpikes) {
                    spikeExtract.evaluate(frame);
                }

                if (frames % 200000 === 0) {
                    (0, _debug2.default)('cl:composition:Utilities')(`Key position at ${frame.time} (${frames} data frames)`);
                }
                frames += 1;
            }

            if (frame) {
                (0, _debug2.default)('cl:composition:Utilities')(`Key position at ${frame.time} (${frames} data frames)`);
            }

            lmdb.closeCursor(cursor);
            lmdb.commit(txn);
            lmdb.closeEnv();

            resolve([statsExtract.stats, spikeExtract.spikes]);
        });
    }

    static parseSpiketrains(spiketrainFile, evaluate, lowCut = 0.01, highCut = Number.MAX_SAFE_INTEGER) {
        const spikeFile = new _SpiketrainsOE2.default();
        return spikeFile.read(spiketrainFile).then(channels => {
            const spikeExtract = new _SpikeExtract2.default(channels.length, lowCut, highCut),
                  statsExtract = new _Statistics2.default(channels.length);

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

exports.default = DataParsing;
'use strict';

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const memwatch = require('memwatch-next'),
      path = require('path'),
      Qty = require('js-quantities');

memwatch.on('leak', function (info) {
    process.stderr.write(`WARNING: ${info.reason} - Growth: ${info.growth}\n`);
});

const lmdbOut = new _2.default.nodes.storage.LMDBNode(),
      lmdbIn = new _2.default.nodes.storage.LMDBNode(),
      quantize = new _2.default.nodes.transform.QuantizeTime({ steps: Qty(parseFloat(process.env.TIME_SCALE), 's') });

lmdbOut.openDataSet(path.resolve(`../../data/lmdb/${process.env.LMDB_FOLDER}`), process.env.LMDB_DBNAME);
lmdbIn.createDataSet(path.resolve(`../../data/lmdb/${process.env.LMDB_FOLDER}-reduced-${process.env.TIME_SCALE.toString().replace('.', '-')}`), 2.0, process.env.LMDB_DBNAME);

lmdbOut.on('done', () => {
    console.log(lmdbOut.stats);
    lmdbOut.endOutput(outputUuid);
    process.stdout.write('done!\n');
    process.exit(0);
});

lmdbIn.on('done', () => {
    console.log(lmdbIn.stats);
    //lmdbOut.endOutput(outputUuid);
    process.stdout.write('done!\n');
    process.exit(0);
});

lmdbIn.on('error', err => {
    process.stderr.write(`${err.message}\n`);
    process.exit(err.code);
});

const conf = {};
conf[process.env.LMDB_DBNAME] = lmdbOut.meta.DataSet.DataChannels[process.env.LMDB_DBNAME];

const outputUuid = lmdbOut.createOutput(process.env.LMDB_DBNAME),
      inputUuid = lmdbIn.createInput(conf, true);

lmdbOut.outputs[outputUuid].stream.pipe(quantize.stream).pipe(lmdbIn.inputs[inputUuid].stream);

lmdbOut.startOutput(outputUuid);
'use strict';

const memwatch = require('memwatch-next'),
      cl = require('../../dist').default,
      path = require('path'),
      lmdbOut = new cl.nodes.storage.LMDBNode(),
      osc = new cl.nodes.io.OSCNode(52777),
      dataPath = path.resolve('../../data/lmdb/20151208_15h59m12s_nanobrain-reduced');

let outputUuid;

memwatch.on('leak', function (info) {
    process.stderr.write(`WARNING: ${info.reason} - Growth: ${info.growth}\n`);
});

lmdbOut.openDataSet(dataPath, '20151208_15h59m12s_nanobrain');

outputUuid = lmdbOut.createOutput('20151208_15h59m12s_nanobrain', new cl.quantities.Time(0.0), new cl.quantities.Time(0.0));

lmdbOut.outputs[outputUuid].stream.pipe(osc.input);
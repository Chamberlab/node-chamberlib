'use strict';

const memwatch = require('memwatch-next'),
      cl = require('../../src/index').default,
      path = require('path');

memwatch.on('leak', function (info) {
    console.log(`WARNING: ${info.reason} - Growth: ${info.growth}`);
});

const lmdb = new cl.nodes.storage.LMDBNode(),
      graph = new cl.nodes.output.GraphNode(path.resolve('../data/nanobrains-rawdata'));

lmdb.openDataSet(path.resolve('../data/lmdb/20151208_15h59m12s_nanobrain-reduced'), '20151208_15h59m12s_nanobrain');
graph.meta = lmdb.meta;

graph.on('done', () => {
    console.log('done!');
    process.exit(0);
});

graph.on('error', err => {
    console.log(err.message);
    process.exit(err.code);
});

const outputUuid = lmdb.createOutput('20151208_15h59m12s_nanobrain', new cl.quantities.Time(0.0), new cl.quantities.Time(0.0));

lmdb.outputs[outputUuid].stream.pipe(graph.input);
lmdb.startOutput(outputUuid);
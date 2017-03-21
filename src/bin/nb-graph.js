const memwatch = require('memwatch-next'),
    cl = require('../../dist').default,
    path = require('path'),
    Qty = require('js-quantities');

memwatch.on('leak', function(info) {
    process.stderr.write(`WARNING: ${info.reason} - Growth: ${info.growth}\n`);
});

const lmdb = new cl.nodes.storage.LMDBNode(),
    graph = new cl.nodes.output.GraphNode(path.resolve('../data/nanobrains-rawdata'));

lmdb.openDataSet(path.resolve('../data/lmdb/20151208_15h59m12s_nanobrain-reduced'),
    '20151208_15h59m12s_nanobrain');
graph.meta = lmdb.meta;

graph.on('done', () => {
    process.stdout.write('done!\n');
    process.exit(0);
});

graph.on('error', (err) => {
    process.stderr.write(`${err.message}\n`);
    process.exit(err.code);
});

const outputUuid = lmdb.createOutput(
    '20151208_15h59m12s_nanobrain',
    Qty(0.0, 's'),
    Qty(0.0, 's')
);

lmdb.outputs[outputUuid].stream.pipe(graph.input);
lmdb.startOutput(outputUuid);

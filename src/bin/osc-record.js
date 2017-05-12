import cl from '../../src';

const memwatch = require('memwatch-next'),
    path = require('path'),
    lmdbIn = new cl.nodes.storage.LMDBNode(),
    osc = new cl.nodes.io.OSCNode(7000, '0.0.0.0'),
    dataPath = path.resolve('../../data/lmdb/toby-skeleton');

let inputUuid, DataChannels = {};

memwatch.on('leak', function(info) {
    process.stderr.write(`WARNING: ${info.reason} - Growth: ${info.growth}\n`);
});

lmdbIn.createDataSet(dataPath, 2.0, 'toby-skeleton');

lmdbIn.on('stats', (stats) => {
    if (stats.data.in && stats.data.in.DataFrame >= 1000) {
        osc.disable();
    }
});

lmdbIn.on('done', () => {
    process.stdout.write('done!\n');
    process.exit(0);
});

lmdbIn.on('error', (err) => {
    process.stderr.write(`${err.message}\n`);
    process.exit(err.code);
});

osc.on('addchannel', (channel) => {
    lmdbIn.meta.DataSet.DataChannels[channel.uuid] =
        Object.assign({},lmdbIn.meta.DataSet.DataChannels['toby-skeleton']);
    lmdbIn.meta.DataSet.DataChannels[channel.uuid].title = channel.title;
});

DataChannels['toby-skeleton'] = {
    type: {
        class: 'DataFrame',
        type: 'Float32',
        length: 75
    },
    keySize: 16,
    keyPrecision: 6,
    keyUnit: 's',
    units: new Array(75).fill(null),
    labels: new Array(75).fill(null),
    uuids: []
};

inputUuid = lmdbIn.createInput(DataChannels, true);

osc.enableMessageReceive();
osc.output.pipe(lmdbIn.inputs[inputUuid].stream);

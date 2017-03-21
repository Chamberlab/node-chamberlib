'use strict';

const memwatch = require('memwatch-next'),
      cl = require('../../dist').default,
      path = require('path'),
      lmdbIn = new cl.nodes.storage.LMDBNode(),
      osc = new cl.nodes.io.OSCNode(52777),
      dataPath = path.resolve('../data/lmdb/osc-record-test');

let inputUuid,
    DataChannels = {};

memwatch.on('leak', function (info) {
    process.stderr.write(`WARNING: ${info.reason} - Growth: ${info.growth}\n`);
});

lmdbIn.createDataSet(dataPath, 2.0, 'osc-record-test');

lmdbIn.on('stats', stats => {
    if (stats.data.in && stats.data.in.DataEvent >= 1000) {
        osc.disable();
    }
});

lmdbIn.on('done', () => {
    process.stdout.write('done!\n');
    process.exit(0);
});

lmdbIn.on('error', err => {
    process.stderr.write(`${err.message}\n`);
    process.exit(err.code);
});

osc.on('addchannel', channel => {
    lmdbIn.meta.DataSet.DataChannels[channel.uuid] = Object.assign({}, lmdbIn.meta.DataSet.DataChannels['osc-record-test']);
    lmdbIn.meta.DataSet.DataChannels[channel.uuid].title = channel.title;
});

DataChannels['osc-record-test'] = {
    type: {
        class: 'DataEvent',
        type: null,
        length: 0
    },
    keySize: 16,
    keyPrecision: 6,
    keyUnit: null,
    units: [],
    labels: [],
    uuids: []
};

inputUuid = lmdbIn.createInput(DataChannels, false);

osc.enableMessageReceive();
osc.output.pipe(lmdbIn.inputs[inputUuid].stream);
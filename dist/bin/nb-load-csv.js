'use strict';

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _streamTransform = require('stream-transform');

var _streamTransform2 = _interopRequireDefault(_streamTransform);

var _index = require('../index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _assert2.default)(process.argv[2] || process.env.NB_INFILE_PATH, 'Invalid path to Nanobrain CSV file');

const debug = (0, _debug2.default)('cl:import:csv'),
      importers = _index2.default.io.importers,
      LMDB = _index2.default.io.db.LMDB,
      csv = new importers.NanobrainsCSV(),
      infile = process.argv[2] || process.env.NB_INFILE_PATH,
      metaOnly = false,
      dbname = _path2.default.parse(infile).name,
      meta = {
    mapSize: 32 * Math.pow(1024, 3),
    maxDbs: 10,
    DataSet: {
        uuid: (0, _uuid2.default)(),
        title: dbname,
        DataChannels: {}
    }
};

let rows = 0,
    dataSize = 0,
    dataDir = _path2.default.join(__dirname, '..', '..', 'data', 'lmdb'),
    lmdbDir = _path2.default.join(dataDir, _path2.default.parse(infile).name);

if (!_fs2.default.existsSync(dataDir)) {
    _fs2.default.mkdirSync(dataDir);
}
if (!_fs2.default.existsSync(lmdbDir)) {
    _fs2.default.mkdirSync(lmdbDir);
}

meta.DataSet.DataChannels[dbname] = {
    uuid: (0, _uuid2.default)(),
    type: {
        class: 'DataFrame',
        type: 'Float32',
        length: 0
    },
    keySize: 16,
    keyPrecision: 6,
    keyUnit: null,
    units: [],
    labels: [],
    uuids: []
};

const lmdb = new LMDB(lmdbDir, false, meta);

let txnUUID;
if (!metaOnly) {
    txnUUID = lmdb.begin(dbname, false);
}

new Promise(function () {
    const writeStream = (0, _streamTransform2.default)(function lmdbTransform(entry, cb) {
        if (rows > 0 && rows % 200000 === 0) {
            debug(`Parsed ${rows} rows containing ${rows * dataSize} events`);
        }
        let channel = meta.DataSet.DataChannels[dbname];
        if (rows > 3) {
            if (metaOnly) {
                return;
            }

            let ms = _mathjs2.default.number(entry[0]),
                values = new Float32Array(dataSize);

            entry.forEach(function (field, i) {
                values[i] = _mathjs2.default.number(field);
            });

            lmdb.put(dbname, txnUUID, new _index2.default.events.DataFrame((0, _jsQuantities2.default)(ms, channel.units[0]).to(channel.keyUnit), values));
        } else if (rows === 3) {
            channel.keyUnit = 's';
            channel.type.length = entry.length;
            channel.units = new Array(channel.type.length);
            channel.labels = new Array(channel.type.length);
            channel.uuids = new Array(channel.type.length);

            entry.forEach(function (field, i) {
                let label = field.split('_');
                channel.labels[i] = label[0];
                channel.units[i] = label[1];
                channel.uuids[i] = (0, _uuid2.default)();
            });

            dataSize = channel.type.length;
        }
        rows += 1;
        return cb();
    }, function (err) {
        if (err) {
            if (!metaOnly) {
                lmdb.abort(txnUUID);
            }
            throw err;
        }

        lmdb.commit(txnUUID);

        lmdb.closeEnv().then(() => {
            debug(`Parsed ${rows} rows containing ${rows * dataSize} events`);
            process.stdout.write(`Nanobrain LMDB data files are ready at ${dataDir}\n`);
            process.exit(0);
        });
    });

    debug(`Reading Nanobrain DataSet from CSV at ${infile} into LMDB...`);
    csv.read(infile, writeStream);
}).catch(err => {
    process.stderr.write(`Nanobrain data import error: ${err.message} code: ${err.code}\n`);
    process.exit(err.code);
});
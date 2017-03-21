import Qty from 'js-quantities';
import assert from 'assert';
import math from 'mathjs';
import Debug from 'debug';
import path from 'path';
import uuid4 from 'uuid4';
import fs from 'fs';
import transform from 'stream-transform';

import cl from '../index';

assert(process.argv[2] || process.env.NB_INFILE_PATH, 'Invalid path to Nanobrain CSV file');

const debug = Debug('cl:import:csv'),
    importers = cl.io.importers,
    LMDB = cl.io.db.LMDB,
    csv = new importers.NanobrainsCSV(),
    infile = process.argv[2] || process.env.NB_INFILE_PATH,
    metaOnly = false,
    dbname = path.parse(infile).name,
    meta = {
        mapSize: 32 * Math.pow(1024, 3),
        maxDbs: 10,
        DataSet: {
            uuid: uuid4(),
            title: dbname,
            DataChannels: {}
        }
    };

let rows = 0, dataSize = 0,
    dataDir = path.join(__dirname, '..', '..', 'data', 'lmdb'),
    lmdbDir = path.join(dataDir, path.parse(infile).name);

if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
}
if (!fs.existsSync(lmdbDir)) {
    fs.mkdirSync(lmdbDir);
}

meta.DataSet.DataChannels[dbname] = {
    uuid: uuid4(),
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
    const writeStream = transform(function lmdbTransform(entry, cb) {
        if (rows > 0 && rows % 100000 === 0) {
            if (!metaOnly) {
                lmdb.commit(txnUUID);
                txnUUID = lmdb.begin(dbname, false);
            }

            debug(`Parsed ${rows} rows containing ${rows * dataSize} events`);
        }
        if (rows > 3) {
            if (metaOnly) {
                return;
            }

            let ms = math.number(entry[0]),
                values = new Float32Array(dataSize);

            entry.forEach(function (field, i) {
                values[i] = math.bignumber(field);
            });

            lmdb.put(dbname, txnUUID, new cl.events.DataFrame(Qty(ms, 'ms').to('s'), values));
        } else if (rows === 3) {
            let channel = meta.DataSet.DataChannels[dbname];

            channel.keyUnit = 's';
            channel.type.length = entry.length;
            channel.units = new Array(channel.type.length);
            channel.labels = new Array(channel.type.length);
            channel.uuids = new Array(channel.type.length);

            entry.forEach(function (field, i) {
                let label = field.split('_');
                channel.labels[i] = label[0];
                channel.units[i] = label[1];
                channel.uuids[i] = uuid4();
            });

            dataSize = channel.type.length;
        }
        rows += 1;
        return cb();
    }, function (err) {
        if (err) {
            throw(err);
        }
        if (!metaOnly) {
            lmdb.abort(txnUUID);
        }

        lmdb.closeEnv().then(() => {
            debug(`Parsed ${rows} rows containing ${rows * dataSize} events`);
            process.stdout.write(`Nanobrain LMDB data files are ready at ${dataDir}\n`);
            process.exit(0);
        });
    });

    debug(`Reading Nanobrain DataSet from CSV at ${infile} into LMDB...`);
    csv.read(infile, writeStream);
})
.catch((err) => {
    process.stderr.write(`Nanobrain data import error: ${err.message} code: ${err.code}\n`);
    process.exit(err.code);
});

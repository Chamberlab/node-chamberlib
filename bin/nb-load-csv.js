import Promise from 'bluebird';
import path from 'path';
import uuid4 from 'uuid4';
import fs from 'fs';
import transform from 'stream-transform';
import cl from '../src/index';

Promise.coroutine(function* () {
    const tstart = Date.now(),
        importers = cl.data.io.importers,
        LMDB = cl.data.io.LMDB,
        csv = new importers.NanobrainsCSV(),
        infile = process.argv[2] || process.env.NB_INFILE_PATH,
        metaOnly = false;

    let rows = 0,
        dataDir = path.join(__dirname, '..', 'data', 'lmdb');

    if (!fs.existsSync(dataDir)) { fs.mkdirSync(dataDir); }

    console.log(`Reading DataSet from CSV at ${infile} into LMDB...`);

    let lmdbDir = path.join(dataDir, path.parse(infile).name),
        dataSize = 0;

    if (!fs.existsSync(lmdbDir)) { fs.mkdirSync(lmdbDir); }

    const dbname = path.parse(infile).name,
        meta = {
            mapSize: 32 * Math.pow(1024, 3),
            maxDbs: 10,
            DataSet: {
                title: dbname,
                DataChannels: {}
            }
        };

    meta.DataSet.DataChannels[dbname] = {
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

    yield new Promise(function (resolve, reject) {
        const writeStream = transform(function lmdbTransform(entry, cb) {
            if (rows > 0 && rows % 100000 === 0) {
                console.log(`Time spent importing ${rows} rows containing ${rows * dataSize} ` +
                    `events: ${(Date.now() - tstart) * 0.001}s`);
            }
            if (rows > 3) {
                if (metaOnly) {
                    return resolve();
                }
                let ms = parseFloat(entry.shift()),
                    values = new Float32Array(64);
                entry.forEach(function (field, i) {
                    values[i] = parseFloat(field) * 0.001;
                });
                lmdb.put(dbname, txnUUID, new cl.events.DataFrame(
                    new cl.quantities.Time(ms * 0.001, 's'), values));
            } else if (rows === 3) {
                entry.shift();
                let channel = meta.DataSet.DataChannels[dbname];
                channel.keyUnit = 's';
                channel.type.length = entry.length;
                channel.units = new Array(channel.type.length);
                channel.labels = new Array(channel.type.length);
                channel.uuids = new Array(channel.type.length);
                entry.forEach(function (field, i) {
                    let label = field.split('_');
                    channel.labels[i] = label[0];
                    channel.units[i] = 'v';
                    channel.uuids[i] = uuid4();
                });
                dataSize = channel.type.length;
            }
            rows += 1;
            return cb();
        }, function (err) {
            if (err) {
                console.log(err.stack);
                return reject(err);
            }
            lmdb.commit(txnUUID);
            resolve();
        });
        csv.read(infile, writeStream);
    });

    yield lmdb.closeEnv();

    console.log(`Time spent importing ${rows} rows containing ${rows * dataSize} ` +
        `events: ${(Date.now() - tstart) * 0.001}s`);
    console.log(`LMDB files are ready at ${dataDir}`);
    process.exit(0);

})()
.catch((err) => {
    console.log(`DataSet import error: ${err.message} code: ${err.code}`);
    process.exit(err.code);
});
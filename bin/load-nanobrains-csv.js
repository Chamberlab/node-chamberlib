import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import transform from 'stream-transform';
import cl from '../index';

Promise.coroutine(function* () {
    const tstart = Date.now(),
        importers = cl.data.io.importers,
        LMDB = cl.data.io.LMDB,
        csv = new importers.NanobrainsCSV(),
        infile = process.argv[2] || process.env.NB_INFILE_PATH;

    let count = 0,
        dataDir = path.join(__dirname, '..', 'data', 'lmdb');

    if (!fs.existsSync(dataDir)) { fs.mkdirSync(dataDir); }

    console.log(`Reading DataSet from CSV at ${infile} into LMDB...`);

    let lmdbDir = path.join(dataDir, path.parse(infile).name),
        dataSet = new cl.data.DataSet(0, path.parse(infile).name);

    if (!fs.existsSync(lmdbDir)) { fs.mkdirSync(lmdbDir); }

    const lmdb = new LMDB(lmdbDir, 8 * Math.pow(1024, 3));

    const dbname = dataSet.title;
    lmdb.begin(dbname, false);

    yield new Promise(function (resolve, reject) {
        const writeStream = transform(function lmdbTransform(entry, cb) {
            if (count > 0 && count % 100000 === 0) {
                console.log(`Time spent importing ${count} events: ${(Date.now() - tstart) * 0.001}s`);
                lmdb.commit(dbname);
                lmdb.begin(dbname, false);
            }
            if (count > 2) {
                let ms = entry.shift();
                entry.forEach(function (field, i) {
                    if (count === 3) {
                        dataSet.push(new cl.data.DataChannel([], field));
                    } else {
                        lmdb.put(dbname, dataSet.at(i).title, new cl.events.DataEvent(
                            new cl.quantities.Time(parseFloat(ms), 'ms'),
                            new cl.quantities.Voltage(parseFloat(field), 'mv')
                        ));
                    }
                });
            }
            count += 1;
            return cb();
        }, function (err) {
            if (err) {
                console.log(err.stack);
                lmdb.abort(dbname);
                reject(err);
            }
            resolve();
        });
        csv.read(infile, writeStream);
    });

    lmdb.closeEnv();

    console.log(`Time spent importing ${count - 4} events: ${(Date.now() - tstart) * 0.001}s`);
    console.log(`LMDB files are ready at ${dataDir}`);
    process.exit(0);

})()
.catch((err) => {
    console.log(`DataSet import error: ${err.message} code: ${err.code}`);
    process.exit(err.code);
});
import Promise from 'bluebird';
import path from 'path';
import fs from 'fs';
import transform from 'stream-transform';
import cl from '../src/index';

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

    const lmdb = new LMDB(lmdbDir, 8 * Math.pow(1024, 3), 128);

    yield new Promise(function (resolve, reject) {
        const writeStream = transform(function lmdbTransform(entry, cb) {
            if (count > 0 && count % 1000 === 0) {
                console.log(`Processed ${count} entries...`);
            }
            if (count > 2) {
                let ms = entry.shift();
                entry.forEach(function (field, i) {
                    if (count === 3) {
                        dataSet.push(new cl.data.DataChannel([], field));
                    } else {
                        const dbname = dataSet.at(i).title;
                        lmdb.begin(dbname, false);
                        lmdb.put(dbname,
                            new cl.events.DataEvent(
                                new cl.quantities.Time(parseFloat(ms), 'ms'),
                                new cl.quantities.Voltage(parseFloat(field), 'mv')
                            )
                        );
                        lmdb.commit(dbname);
                    }
                });
            }
            count += 1;
            return cb();
        }, function (err) {
            if (err) {
                console.log(err.stack);
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
    console.log(err.message);
    process.exit(err.code);
});
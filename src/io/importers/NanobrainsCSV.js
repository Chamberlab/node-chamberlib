import Promise from 'bluebird';
import transform from 'stream-transform';
import CSVFile from '../file/CSVFile';
import DataSet from '../../data/DataSet';
import DataChannel from '../../data/DataChannel';
import DataEvent from '../../events/DataEvent';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';

class NanobrainsCSV extends CSVFile {
    constructor() {
        super();
    }

    read(file, writeStream = undefined) {
        const _self = this,
            csvOptions = {
                delimiter: ',',
                relax_column_count: true,
                trim: true
            };

        let input = super.read(file, csvOptions);

        if (writeStream) {
            return input.pipe(writeStream);
        }

        return new Promise(function (resolve, reject) {
            let count = 0;
            _self.data = new DataSet();

            writeStream = transform(function csvTransform(entry, cb) {
                if (count > 2) {
                    let ms = entry.shift();
                    entry.forEach(function (field, i) {
                        if (count === 3) {
                            _self.data.push(new DataChannel([], field));
                        } else {
                            _self.data.at(i).push(
                                new DataEvent(
                                    new Time(parseFloat(ms), 'ms'),
                                    new Voltage(parseFloat(field), 'mv')
                                )
                            );
                        }
                    });
                }
                count++;
                return cb();
            }, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });

            input.pipe(writeStream);
        });
    }
}

export default NanobrainsCSV;
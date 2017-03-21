import Promise from 'bluebird';
import transform from 'stream-transform';
import Qty from 'js-quantities';
import math from 'mathjs';

import CSVFile from '../file/CSVFile';
import DataSet from '../../data/DataSet';
import DataChannel from '../../data/DataChannel';
import DataEvent from '../../events/DataEvent';

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
            _self._data = new DataSet();

            writeStream = transform(function csvTransform(entry, cb) {
                if (count > 2) {
                    entry.forEach(function (field, i) {
                        if (count === 3) {
                            _self.data.push(new DataChannel([], field));
                        } else {
                            _self.data.at(i).push(
                                new DataEvent(
                                    Qty(math.number(entry[0]), 'ms'),
                                    Qty(math.number(field), 'mV')
                                )
                            );
                        }
                    });
                }
                count++;
                cb();
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
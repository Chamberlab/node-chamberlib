'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _streamTransform = require('stream-transform');

var _streamTransform2 = _interopRequireDefault(_streamTransform);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _CSVFile = require('../file/CSVFile');

var _CSVFile2 = _interopRequireDefault(_CSVFile);

var _DataSet = require('../../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NanobrainsCSV extends _CSVFile2.default {
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

        return new _bluebird2.default(function (resolve, reject) {
            let count = 0;
            _self.data = new _DataSet2.default();

            writeStream = (0, _streamTransform2.default)(function csvTransform(entry, cb) {
                if (count > 2) {
                    let ms = entry.shift();
                    entry.forEach(function (field, i) {
                        if (count === 3) {
                            _self.data.push(new _DataChannel2.default([], field));
                        } else {
                            _self.data.at(i).push(new _DataEvent2.default((0, _jsQuantities2.default)(parseFloat(ms), 'ms'), (0, _jsQuantities2.default)(parseFloat(field), 'mV')));
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

exports.default = NanobrainsCSV;
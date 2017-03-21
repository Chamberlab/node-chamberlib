'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _JSONFile = require('../file/JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpiketrainsOE extends _JSONFile2.default {
    constructor() {
        super();
    }

    read(file) {
        return super.read(file).then(data => {
            (0, _assert2.default)(Array.isArray(data));
            let channels = [];

            return _bluebird2.default.map(data, function (group) {
                return _bluebird2.default.map(group.units, function (unit) {
                    let channel = new _DataChannel2.default();

                    return _bluebird2.default.map(unit.spiketrains, function (sptr) {
                        (0, _assert2.default)(Array.isArray(sptr.times) && Array.isArray(sptr.waveforms));
                        (0, _assert2.default)(sptr.times.length === sptr.waveforms.length);

                        return _bluebird2.default.map(sptr.waveforms, function (wf, i) {
                            let val_diff = wf.max - wf.min,
                                event = new _DataEvent2.default((0, _jsQuantities2.default)(sptr.times[i], 's'), (0, _jsQuantities2.default)(val_diff, 'mV'));
                            channel.push(event);
                        });
                    }).then(function () {
                        channels.push(channel);
                    });
                });
            }).then(function () {
                return channels;
            });
        });
    }
}

exports.default = SpiketrainsOE;
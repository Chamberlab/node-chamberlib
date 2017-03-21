'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chance = require('chance');

var _chance2 = _interopRequireDefault(_chance);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _BaseNode = require('../BaseNode');

var _BaseNode2 = _interopRequireDefault(_BaseNode);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const chance = new _chance2.default();

class Random extends _BaseNode2.default {
    constructor(eventCount = 100, channelCount = 1, min = -0.02, max = 0.02, tstart = 0.0, tend = 20.0) {
        super();

        this._eventCount = Math.max(eventCount, 0);
        this._stream = (0, _through2.default)();
        this._paused = false;

        this._time = 0.0;
        this._min = min;
        this._max = max;
        this._tstart = tstart;
        this._tend = tend;

        this._channelUUIDs = [];
        for (let i = 0; i < channelCount; i++) {
            this._channelUUIDs.push((0, _uuid2.default)());
        }
    }

    pauseOutput() {
        this._paused = true;
    }

    startOutput() {
        const _self = this;
        while (!this._stream.paused && this._stream.readable) {
            const time = (0, _jsQuantities2.default)(this._time, 's'),
                  value = (0, _jsQuantities2.default)(chance.floating({ min: this._min, max: this._max }), 'mV'),
                  event = new _DataEvent2.default(time, value);
            event.parentUUID = chance.pickone(this._channelUUIDs);

            this._time += chance.floating({ min: this._tstart, max: this._tend });
            this._eventCount -= 1;
            this._stream.queue(event);
            if (this._eventCount < 1) {
                this._stream.end(null);
            }
        }
        if (this._stream.readable) {
            setTimeout(function () {
                _self.startOutput();
            }, 10);
        }
    }

    get stream() {
        return this._stream;
    }
}

exports.default = Random;
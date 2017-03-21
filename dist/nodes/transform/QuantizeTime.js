'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mathjs = require('mathjs');

var _mathjs2 = _interopRequireDefault(_mathjs);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _BaseTransformNode = require('./BaseTransformNode');

var _BaseTransformNode2 = _interopRequireDefault(_BaseTransformNode);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _DataFrame = require('../../events/DataFrame');

var _DataFrame2 = _interopRequireDefault(_DataFrame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class QuantizeTime extends _BaseTransformNode2.default {
    constructor(options) {
        super();
        let lastFrameTime = (0, _jsQuantities2.default)(0.0, 's'),
            values = {},
            _self = this;
        const transformFunction = function (event) {
            _self.addStats('in', event.constructor.name);
            if (event.time.sub(lastFrameTime).gt(options.steps)) {
                lastFrameTime.add(options.steps);
                let evt,
                    frameTime = (0, _jsQuantities2.default)(lastFrameTime);
                if (event instanceof _DataEvent2.default) {
                    Object.keys(values).map(key => {
                        evt = new _DataEvent2.default(frameTime, (0, _jsQuantities2.default)(values[key].length ? _mathjs2.default.mean(values[key]) : 0.0));
                        evt.parentUUID = key;
                        values[key] = [];
                    });
                } else if (event instanceof _DataFrame2.default) {
                    let arr = new Float32Array(event.value.length).fill(0.0);
                    evt = new _DataFrame2.default(frameTime, arr.map((v, i) => {
                        return _mathjs2.default.mean(values[i]);
                    }));
                    evt.parentUUID = event.parentUUID;
                    values = [];
                }
                _self.stream.queue(evt);
                _self.addStats('out', event.constructor.name);
                return event;
            } else {
                if (event instanceof _DataEvent2.default) {
                    if (!Array.isArray(values[event.parentUUID])) {
                        values[event.parentUUID] = [];
                    }
                    values[event.parentUUID].push(event.value);
                } else if (event instanceof _DataFrame2.default) {
                    if (!Array.isArray(values)) {
                        values = new Array(event.value.length).fill([]);
                    }
                    event.value.map((v, i) => {
                        values[i] = v;
                    });
                }
            }
        };
        this.initStream(transformFunction);
    }
}

exports.default = QuantizeTime;
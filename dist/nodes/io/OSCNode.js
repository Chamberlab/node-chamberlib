'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

var _BaseNode = require('../BaseNode');

var _BaseNode2 = _interopRequireDefault(_BaseNode);

var _OSC = require('../../io/net/OSC');

var _OSC2 = _interopRequireDefault(_OSC);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OSCNode extends _BaseNode2.default {
    constructor(localPort, localIp = '127.0.0.1', broadcast = false) {
        super();

        this._inputPort = new _OSC2.default();
        this._inputPort.initUDP(localPort, localIp, broadcast);

        this._channels = {};
    }

    enableMessageReceive() {
        const _self = this;
        this._inputPort.enableMessageReceive(data => {
            this.addStats('in', 'OSCMessage');
            let valueCount = data.args ? data.args.length : 0;
            if (!(_self._channels[data.address] instanceof Object)) {
                _self._channels[data.address] = {
                    title: data.address,
                    uuid: (0, _uuid2.default)(),
                    events: []
                };
                _self.emit('addchannel', _self._channels[data.address]);
            }
            let time = (0, _jsQuantities2.default)(Date.now(), 'ms').to('s');
            if (valueCount === 1) {
                let quantity = (0, _jsQuantities2.default)(data.args[0]),
                    event = new _DataEvent2.default(time, quantity);
                event.parentUUID = _self._channels[data.address].uuid;
                this.addStats('out', event.constructor.name);
                return event;
            } else {
                // TODO: implement n-dimensional values
            }
        });
    }

    disable() {
        this._inputPort.disable();
    }

    get input() {
        return this._inputPort.stream;
    }

    get output() {
        return this._inputPort.stream;
    }

}

exports.default = OSCNode;
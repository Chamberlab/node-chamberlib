import uuid4 from 'uuid4';
import Qty from 'js-quantities';

import BaseNode from '../BaseNode';
import OSC from '../../io/net/OSC';
import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';

class OSCNode extends BaseNode {
    constructor(localPort, localIp = '127.0.0.1', broadcast = false) {
        super();

        this._inputPort = new OSC();
        this._inputPort.initUDP(localPort, localIp, broadcast);

        this._channels = {};
    }

    enableMessageReceive() {
        const _self = this;
        this._inputPort.enableMessageReceive((data) => {
            this.addStats('in', 'OSCMessage');
            let valueCount = data.args ? data.args.length : 0;
            if (!(_self._channels[data.address] instanceof Object)) {
                _self._channels[data.address] = {
                    title: data.address,
                    uuid: uuid4(),
                    events: []
                };
                _self.emit('addchannel', _self._channels[data.address]);
            }
            let time = Qty(Date.now(), 'ms').to('s');
            if (valueCount === 1) {
                let quantity = Qty(data.args[0]),
                    event = new DataEvent(time, quantity);
                event.parentUUID = _self._channels[data.address].uuid;
                this.addStats('out', event.constructor.name);
                return event;
            } else {
                let frame = new DataFrame(time, new Float32Array(data.args));
                frame.parentUUID = _self._channels[data.address].uuid;
                this.addStats('out', frame.constructor.name);
                return frame;
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

export default OSCNode;
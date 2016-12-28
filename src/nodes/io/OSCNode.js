import uuid4 from 'uuid4';

import BaseNode from '../BaseNode';
import OSC from '../../io/net/OSC';
import Time from '../../quantities/Time';
import BaseQuantity from '../../quantities/base/BaseQuantity';
import Unit from '../../quantities/base/Unit';
import DataEvent from '../../events/DataEvent';

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
            let time = new Time(Date.now() * 0.001, 's');
            if (valueCount === 1) {
                let quantity = new BaseQuantity(data.args[0], new Unit()),
                    event = new DataEvent(time, quantity);
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

    get output() {
        return this._inputPort.stream;
    }

}

export default OSCNode;
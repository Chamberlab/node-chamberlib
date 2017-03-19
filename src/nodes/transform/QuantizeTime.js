import math from 'mathjs';
import Qty from 'js-quantities';

import BaseTransformNode from './BaseTransformNode';
import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';

class QuantizeTime extends BaseTransformNode {
    constructor(options) {
        super();
        let lastFrameTime = Qty(0.0, 's'),
            values = {}, _self = this;
        const transformFunction = function (event) {
            _self.addStats('in', event.constructor.name);
            if (event.time.sub(lastFrameTime).gt(options.steps)) {
                lastFrameTime.add(options.steps);
                let evt, frameTime = Qty(lastFrameTime);
                if (event instanceof DataEvent) {
                    Object.keys(values).map((key) => {
                        evt = new DataEvent(
                            frameTime,
                            Qty(values[key].length ? math.mean(values[key]) : 0.0)
                        );
                        evt.parentUUID = key;
                        values[key] = [];
                    });
                } else if (event instanceof DataFrame) {
                    let arr = new Float32Array(event.value.length).fill(0.0);
                    evt = new DataFrame(frameTime, arr.map((v, i) => {
                        return math.mean(values[i]);
                    }));
                    evt.parentUUID = event.parentUUID;
                    values = [];
                }
                _self.stream.queue(evt);
                _self.addStats('out', event.constructor.name);
                return event;
            } else {
                if (event instanceof DataEvent) {
                    if (!Array.isArray(values[event.parentUUID])) {
                        values[event.parentUUID] = [];
                    }
                    values[event.parentUUID].push(event.value);
                } else if (event instanceof DataFrame) {
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

export default QuantizeTime;
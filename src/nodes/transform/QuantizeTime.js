import Promise from 'bluebird';

import BaseTransformNode from './BaseTransformNode';
import DataEvent from '../../events/DataEvent';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';

class QuantizeTime extends BaseTransformNode {
    constructor(options) {
        let lastFrameTime = new Time(0.0, 'ms'),
            values = [];
        const transformFunction = function (event) {
            if (event.time.normalized() - lastFrameTime.normalized() > options.steps.normalized()) {
                lastFrameTime = new Time(lastFrameTime.normalized() + options.steps.normalized());
                let value = values.reduce((aggr, val) => {
                    return aggr + val;
                }, 0);
                const event = new DataEvent(lastFrameTime, new Voltage(value / values.length, 'mV'));
                return Promise.resolve(event);
            } else {
                values.push(event.value.normalized());
                return Promise.resolve({});
            }
        };
        super(transformFunction);
    }
}

export default QuantizeTime;
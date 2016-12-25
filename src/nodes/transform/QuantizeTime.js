import Promise from 'bluebird';

import BaseTransformNode from './BaseTransformNode';
import DataEvent from '../../events/DataEvent';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';

class QuantizeTime extends BaseTransformNode {
    constructor(options) {
        let lastFrameTime = 0.0,
            values = [];
        const transformFunction = function (event) {
            if (event.time.normalized() - lastFrameTime > options.steps) {
                lastFrameTime = new Time(lastFrameTime.normalized() + 1000.0, 'ms');
                let value = new Voltage(values.reduce((aggr, val) => {
                    return aggr + val;
                }, 0));
                const event = new DataEvent(lastFrameTime, new Voltage(value / values.length, 'ms'));
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
import assert from 'assert';
import path from 'path';

import BaseNode from '../BaseNode';
import DataSet from '../../data/DataSet';
import DataEvent from '../../events/DataEvent';
import DataChannel from '../../data/DataChannel';
import DataPlotter from '../../graphs/DataPlotter';
import LineChart from '../../graphs/layouts/LineChart';
import EventInputStream from '../../streams/EventInputStream';

class GraphNode extends BaseNode {
    constructor(filepath) {
        super();

        const _self = this;
        this._dataSet = new DataSet([]);
        this._channels = {};
        this._dataPlotter = null; // new DataPlotter(this._dataSet, filepath);
        this._input = new EventInputStream(this);

        this._input.on('finish', function () {
            Object.keys(_self._channels).forEach((key) => {
                _self._dataSet.push(_self._channels[key]);
            });
            _self._dataPlotter = new DataPlotter(_self._dataSet,
                path.parse(filepath).dir,
                path.parse(filepath).name);
            return _self._dataPlotter.generateChart(LineChart)
                .then(() => {
                    _self.emit('done');
                })
                .catch((err) => {
                    _self.emit('error', err);
                });
        });
    }

    storeInput(event) {
        assert(event instanceof DataEvent);

        if (!this._channels.hasOwnProperty(event.channelRef)) {
            this._channels[event.channelRef] = new DataChannel();
        }
        this._channels[event.channelRef].push(event);
    }

    get input() {
        return this._input;
    }
}

export default GraphNode;
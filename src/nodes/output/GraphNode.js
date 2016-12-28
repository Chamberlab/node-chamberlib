import through from 'through';
import path from 'path';

import BaseNode from '../BaseNode';
import DataSet from '../../data/DataSet';
import Time from '../../quantities/Time';
import Voltage from '../../quantities/Voltage';
import DataEvent from '../../events/DataEvent';
import DataFrame from '../../events/DataFrame';
import DataChannel from '../../data/DataChannel';
import DataPlotter from '../../graphs/DataPlotter';
import LineChart from '../../graphs/layouts/LineChart';

class GraphNode extends BaseNode {
    constructor(filepath) {
        super();

        const _self = this;
        this._dataSet = new DataSet([]);
        this._channels = {};
        this._dataPlotter = null;
        this._input = through();
        this._meta = {};

        this._input.on('data', (data) => {
            if (Array.isArray(data)) {
                data.map((event) => {
                    _self.processEvent(event);
                });
            } else {
                _self.processEvent(data);
            }
        });

        this._input.once('end', function () {
            _self.addStats('out', 'null', 0);
            Object.keys(_self._channels).forEach((key) => {
                if (_self._channels[key].size > 0) {
                    _self._dataSet.push(_self._channels[key]);
                }
            });
            _self._dataPlotter = new DataPlotter(_self._dataSet,
                path.parse(filepath).dir, path.parse(filepath).name);
            return _self._dataPlotter.generateChart(LineChart)
                .then(() => {
                    _self.emit('done');
                })
                .catch((err) => {
                    _self.emit('error', err);
                });
        });

        this._input.once('error', function (err) {
            console.log('graph stream error', err.message);
        });
    }

    processEvent(event) {
        const _self = this;
        _self.addStats('in', event.constructor.name);
        if (event instanceof DataFrame) {
            event.value.map((val, i) => {
                let meta = this.meta.DataSet.DataChannels[event.parentUUID],
                    uuid = meta.uuids[i];
                if (!(_self._channels[uuid] instanceof DataChannel)) {
                    _self._channels[uuid] = new DataChannel([]);
                    _self._channels[uuid].title = meta.labels[i];
                    _self._channels[uuid].uuid = meta.units[i];
                }
                let evt = new DataEvent(
                    new Time(event.time.normalized(), meta.keyUnit),
                    new Voltage(val, meta.units[i]));
                _self._channels[uuid].push(evt);
                _self.addStats('in', evt.constructor.name);
                _self._store += 1;
            });
            return true;
        }
        if (event instanceof DataEvent) {
            if (!(_self._channels[event.parentUUID] instanceof DataChannel)) {
                _self._channels[event.parentUUID] = new DataChannel([]);
                _self._channels[event.parentUUID].uuid = event.parentUUID;
            }
            _self._channels[event.parentUUID].push(event);
            _self._store += 1;
            return true;
        }
        return false;
    }

    get input() {
        return this._input;
    }

    get meta() {
        return this._meta;
    }

    set meta(v) {
        this._meta = v;
    }
}

export default GraphNode;
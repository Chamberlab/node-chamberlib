import path from 'path';

import DataChannel from './DataChannel';
import BaseCollection from './BaseCollection';
import JSONFile from './io/JSONFile';

class DataSet extends BaseCollection {
    constructor(channels, title = undefined, uuid = undefined) {
        super(channels, DataChannel, uuid);
        this.title = title;
    }

    // TODO: move this or make it more general
    loadJson(filepath, importerClass = undefined, title = undefined) {
        let _self = this;
        _self.title = title || path.basename(filepath, '.json');

        if (importerClass) {
            return new importerClass().read(filepath)
                .map(function (channel) {
                    _self.push(channel);
                });
        }

        return new JSONFile().read(filepath)
            .then(function (data) {
                return data;
            });
    }
}

export default DataSet;
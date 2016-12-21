'use strict';

import Promise from 'bluebird';
import fs from 'fs';

class JsonIO {
    static readFile(filepath) {
        return Promise.promisify(fs.readFile)(filepath)
            .then((data) => {
                return Promise.resolve(JSON.parse(data));
            });
    }

    static writeFile(filepath, data) {
        return Promise.promisify(fs.writeFile)(filepath, JSON.stringify(data));
    }
}

export default JsonIO;
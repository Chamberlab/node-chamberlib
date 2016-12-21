'use strict';

import Promise from 'bluebird';
import fs from 'fs';

class JsonIO {
    static readFile(filepath) {
        return Promise.promisify(fs.readFile)(filepath)
            .then((data) => {
                return JSON.parse(data);
            });
    }
}

export default JsonIO;
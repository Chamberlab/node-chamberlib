'use strict';

import BaseCollection from '../data/BaseCollection';
import Track from '../harmonics/Track';

class Song extends BaseCollection {
    constructor(items) {
        super(items, Track);
    }
}

export default Song;
import BaseCollection from './BaseCollection';
import TonalEvent from '../events/TonalEvent';

class Track extends BaseCollection {
    constructor(tracks, title = undefined, uuid = undefined) {
        super(tracks, TonalEvent, uuid);

        this._title = title;
    }
}

export default Track;
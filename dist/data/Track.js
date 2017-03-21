'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseCollection = require('./BaseCollection');

var _BaseCollection2 = _interopRequireDefault(_BaseCollection);

var _TonalEvent = require('../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Track extends _BaseCollection2.default {
    constructor(tracks, title = undefined, uuid = undefined) {
        super(tracks, _TonalEvent2.default, uuid);

        this._title = title;
    }
}

exports.default = Track;
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseNet extends _tinyEmitter2.default {
    constructor() {
        super();
    }
}

exports.default = BaseNet;
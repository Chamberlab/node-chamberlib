'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _BaseNode = require('../BaseNode');

var _BaseNode2 = _interopRequireDefault(_BaseNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseTransformNode extends _BaseNode2.default {
    constructor(transformFunction = undefined) {
        super();

        this._stream = new _through2.default(transformFunction);
    }

    initStream(transformFunction) {
        const _self = this;
        this._stream = new _through2.default(transformFunction, () => {
            _self.addStats('out', 'null', 0);
            _self.stream.queue(null);
        });
    }

    get stream() {
        return this._stream;
    }
}

exports.default = BaseTransformNode;
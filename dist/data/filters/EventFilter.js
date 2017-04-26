'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _BaseEventProcessor = require('../BaseEventProcessor');

var _BaseEventProcessor2 = _interopRequireDefault(_BaseEventProcessor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class EventFilter extends _BaseEventProcessor2.default {
    constructor(matchValueFn, matchTimeFn = undefined, options = undefined) {
        (0, _assert2.default)(typeof matchValueFn === 'function', 'No function supplied to match value');

        super(options);

        this._matchValueFn = matchValueFn;

        if (typeof matchTimeFn === 'function') {
            this._matchTimeFn = matchTimeFn;
        }
    }

    process(event) {
        return super.process(event).then(event => {
            return this._matchValueFn(event) && (typeof this._matchTimeFn === 'function' ? this._matchTimeFn(event) : true);
        });
    }
}

exports.default = EventFilter;
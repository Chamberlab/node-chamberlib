'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _jsQuantities = require('js-quantities');

var _jsQuantities2 = _interopRequireDefault(_jsQuantities);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseEvent {
    constructor(time, value) {
        this.time = time;
        this.value = value;
    }

    get parentUUID() {
        return this._parentUUID;
    }

    set parentUUID(uuid) {
        (0, _assert2.default)(typeof uuid === 'string');

        this._parentUUID = uuid;
    }

    set time(time) {
        (0, _assert2.default)(time instanceof _jsQuantities2.default || typeof time === 'string', `Time value must be Qty or string, is ${typeof time}`);

        this._time = (0, _jsQuantities2.default)(time);
    }

    get time() {
        return this._time;
    }

    set value(value) {
        (0, _assert2.default)(value instanceof _jsQuantities2.default || typeof value === 'string', `Value value must be Qty or string, is ${typeof value}`);

        this._value = (0, _jsQuantities2.default)(value);
    }

    get value() {
        return this._value;
    }
}

exports.default = BaseEvent;
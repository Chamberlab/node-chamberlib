'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _osc = require('osc');

var _osc2 = _interopRequireDefault(_osc);

var _BaseNet = require('./BaseNet');

var _BaseNet2 = _interopRequireDefault(_BaseNet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OSC extends _BaseNet2.default {
    constructor() {
        super();

        this._active = true;
        this._port = null;
        this._inputBuffer = [];
        this._stream = (0, _through2.default)();
    }

    initUDP(localPort, localIP = '127.0.0.1', broadcast = false) {
        (0, _assert2.default)(this._port === null, 'Port already defined.');
        (0, _assert2.default)(typeof localPort === 'number');
        (0, _assert2.default)(typeof localIP === 'string');

        this._port = new _osc2.default.UDPPort({
            localPort: localPort,
            localAddress: localIP,
            broadcast: broadcast
        });
        this._port.on('error', err => {
            // console.log(`OSC UDP port error: ${err.message}`);
            throw err;
        });
    }

    enableSendFromStream() /* targetIp, targetPort */{
        // TODO: complete osc implementation
        this._stream.on('data', data => {
            if (!Array.isArray(data)) {
                data = [data];
            }
            data.map(() => /* data */{
                // TODO: do something here...
            });
        });
    }

    disable() {
        this._active = false;
    }

    enableBundleReceive(transformFunc = undefined) {
        (0, _assert2.default)(this._port !== null, 'Port is undefined.');
        const _self = this;
        this._bundleTransformFunc = transformFunc;
        this._port.on('bundle', function (bundle /* , timeTag, info */) {
            // console.log('An OSC bundle just arrived for time tag', timeTag, ':');
            // console.log('Remote info is: ', info);
            return _bluebird2.default.resolve(_self._bundleTransform(bundle)).then(data => {
                _self._inputBuffer.push(data);
            });
        });
        this._port.open();
    }

    _bundleTransform(bundle) {
        if (typeof this._bundleTransformFunc === 'function') {
            return _bluebird2.default.resolve(this._bundleTransformFunc(bundle));
        }
        return _bluebird2.default.resolve(bundle);
    }

    enableMessageReceive(transformFunc = undefined) {
        (0, _assert2.default)(this._port !== null, 'Port is undefined.');
        const _self = this;
        this._messageTransformFunc = transformFunc;
        this._port.on('message', message => {
            return _bluebird2.default.resolve(_self._messageTransform(message)).then(data => {
                if (_self._active) {
                    _self.stream.write(data);
                } else {
                    _self.stream.write(null);
                }
            });
        });
        this._port.open();
    }

    _messageTransform(message) {
        if (typeof this._messageTransformFunc === 'function') {
            return _bluebird2.default.resolve(this._messageTransformFunc(message));
        }
        return _bluebird2.default.resolve(message);
    }

    _handleInput() {
        const _self = this;
        if (_self._inputActive || _self._inputTimeout) {
            return;
        }
        _self._inputActive = true;
        while (_self._inputBuffer.length > 0 && _self._inputActive) {
            _self._inputActive = _self.stream.write(_self._inputBuffer.shift());
        }
        _self._inputActive = false;
        _self._inputTimeout = setTimeout(() => {
            _self._inputTimeout = null;
            _self._handleInput();
        }, 10);
    }

    get stream() {
        return this._stream;
    }

}

exports.default = OSC;
import Promise from 'bluebird';
import assert from 'assert';
import through from 'through';
import osc from 'osc';

import BaseNet from './BaseNet';

class OSC extends BaseNet {
    constructor() {
        super();

        this._active = true;
        this._port = null;
        this._inputBuffer = [];
        this._stream = through();
    }

    initUDP(localPort, localIP = '127.0.0.1', broadcast = false) {
        assert(this._port === null, 'Port already defined.');
        assert(typeof localPort === 'number');
        assert(typeof localIP === 'string');

        this._port = new osc.UDPPort({
            localPort: localPort,
            localAddress: localIP,
            broadcast: broadcast
        });
        this._port.on('error', (err) => {
            console.log(`OSC UDP port error: ${err.message}`);
        });
    }

    enableSendFromStream(targetIp, targetPort) {
        this._stream.on('data', data => {
            if (!Array.isArray(data)) {
                data = [data];
            }
            data.map(data => {

            });
        });
    }

    disable() {
        this._active = false;
    }

    enableBundleReceive(transformFunc = undefined) {
        assert(this._port !== null, 'Port is undefined.');
        const _self = this;
        this._bundleTransformFunc = transformFunc;
        this._port.on("bundle", function (bundle, timeTag, info) {
            console.log("An OSC bundle just arrived for time tag", timeTag, ":");
            console.log("Remote info is: ", info);
            return Promise.resolve(_self._bundleTransform(bundle))
                .then((data) => {
                    _self._inputBuffer.push(data);
                });
        });
        this._port.open();
    }

    _bundleTransform(bundle) {
        if (typeof this._bundleTransformFunc === 'function') {
            return Promise.resolve(this._bundleTransformFunc(bundle));
        }
        return Promise.resolve(bundle);
    }

    enableMessageReceive(transformFunc = undefined) {
        assert(this._port !== null, 'Port is undefined.');
        const _self = this;
        this._messageTransformFunc = transformFunc;
        this._port.on("message", (message) => {
            return Promise.resolve(_self._messageTransform(message))
                .then((data) => {
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
            return Promise.resolve(this._messageTransformFunc(message));
        }
        return Promise.resolve(message);
    }

    _handleInput() {
        const _self = this;
        if ( _self._inputActive || _self._inputTimeout) {
            return;
        }
        _self._inputActive = true;
        while (_self._inputBuffer.length > 0 &&  _self._inputActive) {
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

export default OSC;
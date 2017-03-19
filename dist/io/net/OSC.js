'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _osc = require('osc');

var _osc2 = _interopRequireDefault(_osc);

var _BaseNet2 = require('./BaseNet');

var _BaseNet3 = _interopRequireDefault(_BaseNet2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OSC = function (_BaseNet) {
    (0, _inherits3.default)(OSC, _BaseNet);

    function OSC() {
        (0, _classCallCheck3.default)(this, OSC);

        var _this = (0, _possibleConstructorReturn3.default)(this, (OSC.__proto__ || (0, _getPrototypeOf2.default)(OSC)).call(this));

        _this._active = true;
        _this._port = null;
        _this._inputBuffer = [];
        _this._stream = (0, _through2.default)();
        return _this;
    }

    (0, _createClass3.default)(OSC, [{
        key: 'initUDP',
        value: function initUDP(localPort) {
            var localIP = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '127.0.0.1';
            var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            (0, _assert2.default)(this._port === null, 'Port already defined.');
            (0, _assert2.default)(typeof localPort === 'number');
            (0, _assert2.default)(typeof localIP === 'string');

            this._port = new _osc2.default.UDPPort({
                localPort: localPort,
                localAddress: localIP,
                broadcast: broadcast
            });
            this._port.on('error', function (err) {
                // console.log(`OSC UDP port error: ${err.message}`);
                throw err;
            });
        }
    }, {
        key: 'enableSendFromStream',
        value: function enableSendFromStream() /* targetIp, targetPort */{
            // TODO: complete osc implementation
            this._stream.on('data', function (data) {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                data.map(function () /* data */{
                    // TODO: do something here...
                });
            });
        }
    }, {
        key: 'disable',
        value: function disable() {
            this._active = false;
        }
    }, {
        key: 'enableBundleReceive',
        value: function enableBundleReceive() {
            var transformFunc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

            (0, _assert2.default)(this._port !== null, 'Port is undefined.');
            var _self = this;
            this._bundleTransformFunc = transformFunc;
            this._port.on('bundle', function (bundle /* , timeTag, info */) {
                // console.log('An OSC bundle just arrived for time tag', timeTag, ':');
                // console.log('Remote info is: ', info);
                return _bluebird2.default.resolve(_self._bundleTransform(bundle)).then(function (data) {
                    _self._inputBuffer.push(data);
                });
            });
            this._port.open();
        }
    }, {
        key: '_bundleTransform',
        value: function _bundleTransform(bundle) {
            if (typeof this._bundleTransformFunc === 'function') {
                return _bluebird2.default.resolve(this._bundleTransformFunc(bundle));
            }
            return _bluebird2.default.resolve(bundle);
        }
    }, {
        key: 'enableMessageReceive',
        value: function enableMessageReceive() {
            var transformFunc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

            (0, _assert2.default)(this._port !== null, 'Port is undefined.');
            var _self = this;
            this._messageTransformFunc = transformFunc;
            this._port.on('message', function (message) {
                return _bluebird2.default.resolve(_self._messageTransform(message)).then(function (data) {
                    if (_self._active) {
                        _self.stream.write(data);
                    } else {
                        _self.stream.write(null);
                    }
                });
            });
            this._port.open();
        }
    }, {
        key: '_messageTransform',
        value: function _messageTransform(message) {
            if (typeof this._messageTransformFunc === 'function') {
                return _bluebird2.default.resolve(this._messageTransformFunc(message));
            }
            return _bluebird2.default.resolve(message);
        }
    }, {
        key: '_handleInput',
        value: function _handleInput() {
            var _self = this;
            if (_self._inputActive || _self._inputTimeout) {
                return;
            }
            _self._inputActive = true;
            while (_self._inputBuffer.length > 0 && _self._inputActive) {
                _self._inputActive = _self.stream.write(_self._inputBuffer.shift());
            }
            _self._inputActive = false;
            _self._inputTimeout = setTimeout(function () {
                _self._inputTimeout = null;
                _self._handleInput();
            }, 10);
        }
    }, {
        key: 'stream',
        get: function get() {
            return this._stream;
        }
    }]);
    return OSC;
}(_BaseNet3.default);

exports.default = OSC;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL25ldC9PU0MuanMiXSwibmFtZXMiOlsiT1NDIiwiX2FjdGl2ZSIsIl9wb3J0IiwiX2lucHV0QnVmZmVyIiwiX3N0cmVhbSIsImxvY2FsUG9ydCIsImxvY2FsSVAiLCJicm9hZGNhc3QiLCJVRFBQb3J0IiwibG9jYWxBZGRyZXNzIiwib24iLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJkYXRhIiwibWFwIiwidHJhbnNmb3JtRnVuYyIsInVuZGVmaW5lZCIsIl9zZWxmIiwiX2J1bmRsZVRyYW5zZm9ybUZ1bmMiLCJidW5kbGUiLCJyZXNvbHZlIiwiX2J1bmRsZVRyYW5zZm9ybSIsInRoZW4iLCJwdXNoIiwib3BlbiIsIl9tZXNzYWdlVHJhbnNmb3JtRnVuYyIsIm1lc3NhZ2UiLCJfbWVzc2FnZVRyYW5zZm9ybSIsInN0cmVhbSIsIndyaXRlIiwiX2lucHV0QWN0aXZlIiwiX2lucHV0VGltZW91dCIsImxlbmd0aCIsInNoaWZ0Iiwic2V0VGltZW91dCIsIl9oYW5kbGVJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTUEsRzs7O0FBQ0YsbUJBQWM7QUFBQTs7QUFBQTs7QUFHVixjQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGNBQUtDLE9BQUwsR0FBZSx3QkFBZjtBQU5VO0FBT2I7Ozs7Z0NBRU9DLFMsRUFBcUQ7QUFBQSxnQkFBMUNDLE9BQTBDLHVFQUFoQyxXQUFnQztBQUFBLGdCQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDekQsa0NBQU8sS0FBS0wsS0FBTCxLQUFlLElBQXRCLEVBQTRCLHVCQUE1QjtBQUNBLGtDQUFPLE9BQU9HLFNBQVAsS0FBcUIsUUFBNUI7QUFDQSxrQ0FBTyxPQUFPQyxPQUFQLEtBQW1CLFFBQTFCOztBQUVBLGlC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LElBQXNCYixNQUFNYyxhQUFqQyxFQUFnRDtBQUM1QztBQUNIO0FBQ0RkLGtCQUFNYSxZQUFOLEdBQXFCLElBQXJCO0FBQ0EsbUJBQU9iLE1BQU1mLFlBQU4sQ0FBbUI4QixNQUFuQixHQUE0QixDQUE1QixJQUFrQ2YsTUFBTWEsWUFBL0MsRUFBNkQ7QUFDekRiLHNCQUFNYSxZQUFOLEdBQXFCYixNQUFNVyxNQUFOLENBQWFDLEtBQWIsQ0FBbUJaLE1BQU1mLFlBQU4sQ0FBbUIrQixLQUFuQixFQUFuQixDQUFyQjtBQUNIO0FBQ0RoQixrQkFBTWEsWUFBTixHQUFxQixLQUFyQjtBQUNBYixrQkFBTWMsYUFBTixHQUFzQkcsV0FBVyxZQUFNO0FBQ25DakIsc0JBQU1jLGFBQU4sR0FBc0IsSUFBdEI7QUFDQWQsc0JBQU1rQixZQUFOO0FBQ0gsYUFIcUIsRUFHbkIsRUFIbUIsQ0FBdEI7QUFJSDs7OzRCQUVZO0FBQ1QsbUJBQU8sS0FBS2hDLE9BQVo7QUFDSDs7Ozs7a0JBSVVKLEciLCJmaWxlIjoiaW8vbmV0L09TQy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCB0aHJvdWdoIGZyb20gJ3Rocm91Z2gnO1xuaW1wb3J0IG9zYyBmcm9tICdvc2MnO1xuXG5pbXBvcnQgQmFzZU5ldCBmcm9tICcuL0Jhc2VOZXQnO1xuXG5jbGFzcyBPU0MgZXh0ZW5kcyBCYXNlTmV0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLl9wb3J0ID0gbnVsbDtcbiAgICAgICAgdGhpcy5faW5wdXRCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5fc3RyZWFtID0gdGhyb3VnaCgpO1xuICAgIH1cblxuICAgIGluaXRVRFAobG9jYWxQb3J0LCBsb2NhbElQID0gJzEyNy4wLjAuMScsIGJyb2FkY2FzdCA9IGZhbHNlKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9wb3J0ID09PSBudWxsLCAnUG9ydCBhbHJlYWR5IGRlZmluZWQuJyk7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgbG9jYWxQb3J0ID09PSAnbnVtYmVyJyk7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgbG9jYWxJUCA9PT0gJ3N0cmluZycpO1xuXG4gICAgICAgIHRoaXMuX3BvcnQgPSBuZXcgb3NjLlVEUFBvcnQoe1xuICAgICAgICAgICAgbG9jYWxQb3J0OiBsb2NhbFBvcnQsXG4gICAgICAgICAgICBsb2NhbEFkZHJlc3M6IGxvY2FsSVAsXG4gICAgICAgICAgICBicm9hZGNhc3Q6IGJyb2FkY2FzdFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcG9ydC5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgT1NDIFVEUCBwb3J0IGVycm9yOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmFibGVTZW5kRnJvbVN0cmVhbSgvKiB0YXJnZXRJcCwgdGFyZ2V0UG9ydCAqLykge1xuICAgICAgICAvLyBUT0RPOiBjb21wbGV0ZSBvc2MgaW1wbGVtZW50YXRpb25cbiAgICAgICAgdGhpcy5fc3RyZWFtLm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YS5tYXAoKC8qIGRhdGEgKi8pID0+IHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBkbyBzb21ldGhpbmcgaGVyZS4uLlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGRpc2FibGUoKSB7XG4gICAgICAgIHRoaXMuX2FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGVuYWJsZUJ1bmRsZVJlY2VpdmUodHJhbnNmb3JtRnVuYyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fcG9ydCAhPT0gbnVsbCwgJ1BvcnQgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2J1bmRsZVRyYW5zZm9ybUZ1bmMgPSB0cmFuc2Zvcm1GdW5jO1xuICAgICAgICB0aGlzLl9wb3J0Lm9uKCdidW5kbGUnLCBmdW5jdGlvbiAoYnVuZGxlLyogLCB0aW1lVGFnLCBpbmZvICovKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnQW4gT1NDIGJ1bmRsZSBqdXN0IGFycml2ZWQgZm9yIHRpbWUgdGFnJywgdGltZVRhZywgJzonKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdSZW1vdGUgaW5mbyBpczogJywgaW5mbyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKF9zZWxmLl9idW5kbGVUcmFuc2Zvcm0oYnVuZGxlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5faW5wdXRCdWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub3BlbigpO1xuICAgIH1cblxuICAgIF9idW5kbGVUcmFuc2Zvcm0oYnVuZGxlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fYnVuZGxlVHJhbnNmb3JtRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9idW5kbGVUcmFuc2Zvcm1GdW5jKGJ1bmRsZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYnVuZGxlKTtcbiAgICB9XG5cbiAgICBlbmFibGVNZXNzYWdlUmVjZWl2ZSh0cmFuc2Zvcm1GdW5jID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9wb3J0ICE9PSBudWxsLCAnUG9ydCBpcyB1bmRlZmluZWQuJyk7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fbWVzc2FnZVRyYW5zZm9ybUZ1bmMgPSB0cmFuc2Zvcm1GdW5jO1xuICAgICAgICB0aGlzLl9wb3J0Lm9uKCdtZXNzYWdlJywgKG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoX3NlbGYuX21lc3NhZ2VUcmFuc2Zvcm0obWVzc2FnZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKF9zZWxmLl9hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLnN0cmVhbS53cml0ZShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLnN0cmVhbS53cml0ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fcG9ydC5vcGVuKCk7XG4gICAgfVxuXG4gICAgX21lc3NhZ2VUcmFuc2Zvcm0obWVzc2FnZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX21lc3NhZ2VUcmFuc2Zvcm1GdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX21lc3NhZ2VUcmFuc2Zvcm1GdW5jKG1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIF9oYW5kbGVJbnB1dCgpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoIF9zZWxmLl9pbnB1dEFjdGl2ZSB8fCBfc2VsZi5faW5wdXRUaW1lb3V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgX3NlbGYuX2lucHV0QWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgd2hpbGUgKF9zZWxmLl9pbnB1dEJ1ZmZlci5sZW5ndGggPiAwICYmICBfc2VsZi5faW5wdXRBY3RpdmUpIHtcbiAgICAgICAgICAgIF9zZWxmLl9pbnB1dEFjdGl2ZSA9IF9zZWxmLnN0cmVhbS53cml0ZShfc2VsZi5faW5wdXRCdWZmZXIuc2hpZnQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgX3NlbGYuX2lucHV0QWN0aXZlID0gZmFsc2U7XG4gICAgICAgIF9zZWxmLl9pbnB1dFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIF9zZWxmLl9pbnB1dFRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgX3NlbGYuX2hhbmRsZUlucHV0KCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBnZXQgc3RyZWFtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBPU0M7Il19
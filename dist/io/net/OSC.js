'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OSC = function (_BaseNet) {
    _inherits(OSC, _BaseNet);

    function OSC() {
        _classCallCheck(this, OSC);

        var _this = _possibleConstructorReturn(this, (OSC.__proto__ || Object.getPrototypeOf(OSC)).call(this));

        _this._active = true;
        _this._port = null;
        _this._inputBuffer = [];
        _this._stream = (0, _through2.default)();
        return _this;
    }

    _createClass(OSC, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL25ldC9PU0MuanMiXSwibmFtZXMiOlsiT1NDIiwiX2FjdGl2ZSIsIl9wb3J0IiwiX2lucHV0QnVmZmVyIiwiX3N0cmVhbSIsImxvY2FsUG9ydCIsImxvY2FsSVAiLCJicm9hZGNhc3QiLCJVRFBQb3J0IiwibG9jYWxBZGRyZXNzIiwib24iLCJlcnIiLCJBcnJheSIsImlzQXJyYXkiLCJkYXRhIiwibWFwIiwidHJhbnNmb3JtRnVuYyIsInVuZGVmaW5lZCIsIl9zZWxmIiwiX2J1bmRsZVRyYW5zZm9ybUZ1bmMiLCJidW5kbGUiLCJyZXNvbHZlIiwiX2J1bmRsZVRyYW5zZm9ybSIsInRoZW4iLCJwdXNoIiwib3BlbiIsIl9tZXNzYWdlVHJhbnNmb3JtRnVuYyIsIm1lc3NhZ2UiLCJfbWVzc2FnZVRyYW5zZm9ybSIsInN0cmVhbSIsIndyaXRlIiwiX2lucHV0QWN0aXZlIiwiX2lucHV0VGltZW91dCIsImxlbmd0aCIsInNoaWZ0Iiwic2V0VGltZW91dCIsIl9oYW5kbGVJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7Ozs7Ozs7SUFFTUEsRzs7O0FBQ0YsbUJBQWM7QUFBQTs7QUFBQTs7QUFHVixjQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGNBQUtDLE9BQUwsR0FBZSx3QkFBZjtBQU5VO0FBT2I7Ozs7Z0NBRU9DLFMsRUFBcUQ7QUFBQSxnQkFBMUNDLE9BQTBDLHVFQUFoQyxXQUFnQztBQUFBLGdCQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDekQsa0NBQU8sS0FBS0wsS0FBTCxLQUFlLElBQXRCLEVBQTRCLHVCQUE1QjtBQUNBLGtDQUFPLE9BQU9HLFNBQVAsS0FBcUIsUUFBNUI7QUFDQSxrQ0FBTyxPQUFPQyxPQUFQLEtBQW1CLFFBQTFCOztBQUVBLGlCQUFLSixLQUFMLEdB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YyxhQUFqQyxFQUFnRDtBQUM1QztBQUNIO0FBQ0RkLGtCQUFNYSxZQUFOLEdBQXFCLElBQXJCO0FBQ0EsbUJBQU9iLE1BQU1mLFlBQU4sQ0FBbUI4QixNQUFuQixHQUE0QixDQUE1QixJQUFrQ2YsTUFBTWEsWUFBL0MsRUFBNkQ7QUFDekRiLHNCQUFNYSxZQUFOLEdBQXFCYixNQUFNVyxNQUFOLENBQWFDLEtBQWIsQ0FBbUJaLE1BQU1mLFlBQU4sQ0FBbUIrQixLQUFuQixFQUFuQixDQUFyQjtBQUNIO0FBQ0RoQixrQkFBTWEsWUFBTixHQUFxQixLQUFyQjtBQUNBYixrQkFBTWMsYUFBTixHQUFzQkcsV0FBVyxZQUFNO0FBQ25DakIsc0JBQU1jLGFBQU4sR0FBc0IsSUFBdEI7QUFDQWQsc0JBQU1rQixZQUFOO0FBQ0gsYUFIcUIsRUFHbkIsRUFIbUIsQ0FBdEI7QUFJSDs7OzRCQUVZO0FBQ1QsbUJBQU8sS0FBS2hDLE9BQVo7QUFDSDs7Ozs7O2tCQUlVSixHIiwiZmlsZSI6ImlvL25ldC9PU0MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcbmltcG9ydCBvc2MgZnJvbSAnb3NjJztcblxuaW1wb3J0IEJhc2VOZXQgZnJvbSAnLi9CYXNlTmV0JztcblxuY2xhc3MgT1NDIGV4dGVuZHMgQmFzZU5ldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcG9ydCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lucHV0QnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHRocm91Z2goKTtcbiAgICB9XG5cbiAgICBpbml0VURQKGxvY2FsUG9ydCwgbG9jYWxJUCA9ICcxMjcuMC4wLjEnLCBicm9hZGNhc3QgPSBmYWxzZSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fcG9ydCA9PT0gbnVsbCwgJ1BvcnQgYWxyZWFkeSBkZWZpbmVkLicpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGxvY2FsUG9ydCA9PT0gJ251bWJlcicpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGxvY2FsSVAgPT09ICdzdHJpbmcnKTtcblxuICAgICAgICB0aGlzLl9wb3J0ID0gbmV3IG9zYy5VRFBQb3J0KHtcbiAgICAgICAgICAgIGxvY2FsUG9ydDogbG9jYWxQb3J0LFxuICAgICAgICAgICAgbG9jYWxBZGRyZXNzOiBsb2NhbElQLFxuICAgICAgICAgICAgYnJvYWRjYXN0OiBicm9hZGNhc3RcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYE9TQyBVRFAgcG9ydCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5hYmxlU2VuZEZyb21TdHJlYW0oLyogdGFyZ2V0SXAsIHRhcmdldFBvcnQgKi8pIHtcbiAgICAgICAgLy8gVE9ETzogY29tcGxldGUgb3NjIGltcGxlbWVudGF0aW9uXG4gICAgICAgIHRoaXMuX3N0cmVhbS5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRhdGEubWFwKCgvKiBkYXRhICovKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETzogZG8gc29tZXRoaW5nIGhlcmUuLi5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVCdW5kbGVSZWNlaXZlKHRyYW5zZm9ybUZ1bmMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX3BvcnQgIT09IG51bGwsICdQb3J0IGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9idW5kbGVUcmFuc2Zvcm1GdW5jID0gdHJhbnNmb3JtRnVuYztcbiAgICAgICAgdGhpcy5fcG9ydC5vbignYnVuZGxlJywgZnVuY3Rpb24gKGJ1bmRsZS8qICwgdGltZVRhZywgaW5mbyAqLykge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0FuIE9TQyBidW5kbGUganVzdCBhcnJpdmVkIGZvciB0aW1lIHRhZycsIHRpbWVUYWcsICc6Jyk7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnUmVtb3RlIGluZm8gaXM6ICcsIGluZm8pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfc2VsZi5fYnVuZGxlVHJhbnNmb3JtKGJ1bmRsZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2lucHV0QnVmZmVyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb3J0Lm9wZW4oKTtcbiAgICB9XG5cbiAgICBfYnVuZGxlVHJhbnNmb3JtKGJ1bmRsZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2J1bmRsZVRyYW5zZm9ybUZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYnVuZGxlVHJhbnNmb3JtRnVuYyhidW5kbGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJ1bmRsZSk7XG4gICAgfVxuXG4gICAgZW5hYmxlTWVzc2FnZVJlY2VpdmUodHJhbnNmb3JtRnVuYyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fcG9ydCAhPT0gbnVsbCwgJ1BvcnQgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VUcmFuc2Zvcm1GdW5jID0gdHJhbnNmb3JtRnVuYztcbiAgICAgICAgdGhpcy5fcG9ydC5vbignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKF9zZWxmLl9tZXNzYWdlVHJhbnNmb3JtKG1lc3NhZ2UpKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfc2VsZi5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdHJlYW0ud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdHJlYW0ud3JpdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub3BlbigpO1xuICAgIH1cblxuICAgIF9tZXNzYWdlVHJhbnNmb3JtKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tZXNzYWdlVHJhbnNmb3JtRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9tZXNzYWdlVHJhbnNmb3JtRnVuYyhtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCBfc2VsZi5faW5wdXRBY3RpdmUgfHwgX3NlbGYuX2lucHV0VGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF9zZWxmLl9pbnB1dEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHdoaWxlIChfc2VsZi5faW5wdXRCdWZmZXIubGVuZ3RoID4gMCAmJiAgX3NlbGYuX2lucHV0QWN0aXZlKSB7XG4gICAgICAgICAgICBfc2VsZi5faW5wdXRBY3RpdmUgPSBfc2VsZi5zdHJlYW0ud3JpdGUoX3NlbGYuX2lucHV0QnVmZmVyLnNoaWZ0KCkpO1xuICAgICAgICB9XG4gICAgICAgIF9zZWxmLl9pbnB1dEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBfc2VsZi5faW5wdXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBfc2VsZi5faW5wdXRUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIF9zZWxmLl9oYW5kbGVJbnB1dCgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmVhbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgT1NDOyJdfQ==
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
                console.log('OSC UDP port error: ' + err.message);
            });
        }
    }, {
        key: 'enableSendFromStream',
        value: function enableSendFromStream(targetIp, targetPort) {
            this._stream.on('data', function (data) {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                data.map(function (data) {});
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
            this._port.on("bundle", function (bundle, timeTag, info) {
                console.log("An OSC bundle just arrived for time tag", timeTag, ":");
                console.log("Remote info is: ", info);
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
            this._port.on("message", function (message) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL25ldC9PU0MuanMiXSwibmFtZXMiOlsiT1NDIiwiX2FjdGl2ZSIsIl9wb3J0IiwiX2lucHV0QnVmZmVyIiwiX3N0cmVhbSIsImxvY2FsUG9ydCIsImxvY2FsSVAiLCJicm9hZGNhc3QiLCJVRFBQb3J0IiwibG9jYWxBZGRyZXNzIiwib24iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsInRhcmdldElwIiwidGFyZ2V0UG9ydCIsIkFycmF5IiwiaXNBcnJheSIsImRhdGEiLCJtYXAiLCJ0cmFuc2Zvcm1GdW5jIiwidW5kZWZpbmVkIiwiX3NlbGYiLCJfYnVuZGxlVHJhbnNmb3JtRnVuYyIsImJ1bmRsZSIsInRpbWVUYWciLCJpbmZvIiwicmVzb2x2ZSIsIl9idW5kbGVUcmFuc2Zvcm0iLCJ0aGVuIiwicHVzaCIsIm9wZW4iLCJfbWVzc2FnZVRyYW5zZm9ybUZ1bmMiLCJfbWVzc2FnZVRyYW5zZm9ybSIsInN0cmVhbSIsIndyaXRlIiwiX2lucHV0QWN0aXZlIiwiX2lucHV0VGltZW91dCIsImxlbmd0aCIsInNoaWZ0Iiwic2V0VGltZW91dCIsIl9oYW5kbGVJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTUEsRzs7O0FBQ0YsbUJBQWM7QUFBQTs7QUFBQTs7QUFHVixjQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGNBQUtDLE9BQUwsR0FBZSx3QkFBZjtBQU5VO0FBT2I7Ozs7Z0NBRU9DLFMsRUFBcUQ7QUFBQSxnQkFBMUNDLE9BQTBDLHVFQUFoQyxXQUFnQztBQUFBLGdCQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDekQsa0NBQU8sS0FBS0wsS0FBTCxLQUFlLElBQXRCLEVBQTRCLHVCQUE1QjtBQUNBLGtDQUFPLE9BQU9HLFNB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QyxFQUFzRDtBQUNsRCx1QkFBTyxtQkFBUUwsT0FBUixDQUFnQixLQUFLSyxxQkFBTCxDQUEyQm5CLE9BQTNCLENBQWhCLENBQVA7QUFDSDtBQUNELG1CQUFPLG1CQUFRYyxPQUFSLENBQWdCZCxPQUFoQixDQUFQO0FBQ0g7Ozt1Q0FFYztBQUNYLGdCQUFNUyxRQUFRLElBQWQ7QUFDQSxnQkFBS0EsTUFBTWMsWUFBTixJQUFzQmQsTUFBTWUsYUFBakMsRUFBZ0Q7QUFDNUM7QUFDSDtBQUNEZixrQkFBTWMsWUFBTixHQUFxQixJQUFyQjtBQUNBLG1CQUFPZCxNQUFNcEIsWUFBTixDQUFtQm9DLE1BQW5CLEdBQTRCLENBQTVCLElBQWtDaEIsTUFBTWMsWUFBL0MsRUFBNkQ7QUFDekRkLHNCQUFNYyxZQUFOLEdBQXFCZCxNQUFNWSxNQUFOLENBQWFDLEtBQWIsQ0FBbUJiLE1BQU1wQixZQUFOLENBQW1CcUMsS0FBbkIsRUFBbkIsQ0FBckI7QUFDSDtBQUNEakIsa0JBQU1jLFlBQU4sR0FBcUIsS0FBckI7QUFDQWQsa0JBQU1lLGFBQU4sR0FBc0JHLFdBQVcsWUFBTTtBQUNuQ2xCLHNCQUFNZSxhQUFOLEdBQXNCLElBQXRCO0FBQ0FmLHNCQUFNbUIsWUFBTjtBQUNILGFBSHFCLEVBR25CLEVBSG1CLENBQXRCO0FBSUg7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUt0QyxPQUFaO0FBQ0g7Ozs7O2tCQUlVSixHIiwiZmlsZSI6ImlvL25ldC9PU0MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcbmltcG9ydCBvc2MgZnJvbSAnb3NjJztcblxuaW1wb3J0IEJhc2VOZXQgZnJvbSAnLi9CYXNlTmV0JztcblxuY2xhc3MgT1NDIGV4dGVuZHMgQmFzZU5ldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcG9ydCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lucHV0QnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHRocm91Z2goKTtcbiAgICB9XG5cbiAgICBpbml0VURQKGxvY2FsUG9ydCwgbG9jYWxJUCA9ICcxMjcuMC4wLjEnLCBicm9hZGNhc3QgPSBmYWxzZSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fcG9ydCA9PT0gbnVsbCwgJ1BvcnQgYWxyZWFkeSBkZWZpbmVkLicpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGxvY2FsUG9ydCA9PT0gJ251bWJlcicpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGxvY2FsSVAgPT09ICdzdHJpbmcnKTtcblxuICAgICAgICB0aGlzLl9wb3J0ID0gbmV3IG9zYy5VRFBQb3J0KHtcbiAgICAgICAgICAgIGxvY2FsUG9ydDogbG9jYWxQb3J0LFxuICAgICAgICAgICAgbG9jYWxBZGRyZXNzOiBsb2NhbElQLFxuICAgICAgICAgICAgYnJvYWRjYXN0OiBicm9hZGNhc3RcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE9TQyBVRFAgcG9ydCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5hYmxlU2VuZEZyb21TdHJlYW0odGFyZ2V0SXAsIHRhcmdldFBvcnQpIHtcbiAgICAgICAgdGhpcy5fc3RyZWFtLm9uKCdkYXRhJywgZGF0YSA9PiB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBkYXRhID0gW2RhdGFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGF0YS5tYXAoZGF0YSA9PiB7XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVCdW5kbGVSZWNlaXZlKHRyYW5zZm9ybUZ1bmMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX3BvcnQgIT09IG51bGwsICdQb3J0IGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9idW5kbGVUcmFuc2Zvcm1GdW5jID0gdHJhbnNmb3JtRnVuYztcbiAgICAgICAgdGhpcy5fcG9ydC5vbihcImJ1bmRsZVwiLCBmdW5jdGlvbiAoYnVuZGxlLCB0aW1lVGFnLCBpbmZvKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFuIE9TQyBidW5kbGUganVzdCBhcnJpdmVkIGZvciB0aW1lIHRhZ1wiLCB0aW1lVGFnLCBcIjpcIik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlbW90ZSBpbmZvIGlzOiBcIiwgaW5mbyk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKF9zZWxmLl9idW5kbGVUcmFuc2Zvcm0oYnVuZGxlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5faW5wdXRCdWZmZXIucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub3BlbigpO1xuICAgIH1cblxuICAgIF9idW5kbGVUcmFuc2Zvcm0oYnVuZGxlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fYnVuZGxlVHJhbnNmb3JtRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9idW5kbGVUcmFuc2Zvcm1GdW5jKGJ1bmRsZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoYnVuZGxlKTtcbiAgICB9XG5cbiAgICBlbmFibGVNZXNzYWdlUmVjZWl2ZSh0cmFuc2Zvcm1GdW5jID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGFzc2VydCh0aGlzLl9wb3J0ICE9PSBudWxsLCAnUG9ydCBpcyB1bmRlZmluZWQuJyk7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fbWVzc2FnZVRyYW5zZm9ybUZ1bmMgPSB0cmFuc2Zvcm1GdW5jO1xuICAgICAgICB0aGlzLl9wb3J0Lm9uKFwibWVzc2FnZVwiLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfc2VsZi5fbWVzc2FnZVRyYW5zZm9ybShtZXNzYWdlKSlcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX3NlbGYuX2FjdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuc3RyZWFtLndyaXRlKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3NlbGYuc3RyZWFtLndyaXRlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb3J0Lm9wZW4oKTtcbiAgICB9XG5cbiAgICBfbWVzc2FnZVRyYW5zZm9ybShtZXNzYWdlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbWVzc2FnZVRyYW5zZm9ybUZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbWVzc2FnZVRyYW5zZm9ybUZ1bmMobWVzc2FnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgX2hhbmRsZUlucHV0KCkge1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICggX3NlbGYuX2lucHV0QWN0aXZlIHx8IF9zZWxmLl9pbnB1dFRpbWVvdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBfc2VsZi5faW5wdXRBY3RpdmUgPSB0cnVlO1xuICAgICAgICB3aGlsZSAoX3NlbGYuX2lucHV0QnVmZmVyLmxlbmd0aCA+IDAgJiYgIF9zZWxmLl9pbnB1dEFjdGl2ZSkge1xuICAgICAgICAgICAgX3NlbGYuX2lucHV0QWN0aXZlID0gX3NlbGYuc3RyZWFtLndyaXRlKF9zZWxmLl9pbnB1dEJ1ZmZlci5zaGlmdCgpKTtcbiAgICAgICAgfVxuICAgICAgICBfc2VsZi5faW5wdXRBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgX3NlbGYuX2lucHV0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgX3NlbGYuX2lucHV0VGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICBfc2VsZi5faGFuZGxlSW5wdXQoKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH1cblxuICAgIGdldCBzdHJlYW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE9TQzsiXX0=
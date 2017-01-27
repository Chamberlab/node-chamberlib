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
        value: function enableSendFromStream() /* targetIp, targetPort */{
            // TODO: complete osc implementation
            this._stream.on('data', function (data) {
                if (!Array.isArray(data)) {
                    data = [data];
                }
                /*
                data.map(data => {
                 });
                */
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
            this._port.on('bundle', function (bundle, timeTag, info) {
                console.log('An OSC bundle just arrived for time tag', timeTag, ':');
                console.log('Remote info is: ', info);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL25ldC9PU0MuanMiXSwibmFtZXMiOlsiT1NDIiwiX2FjdGl2ZSIsIl9wb3J0IiwiX2lucHV0QnVmZmVyIiwiX3N0cmVhbSIsImxvY2FsUG9ydCIsImxvY2FsSVAiLCJicm9hZGNhc3QiLCJVRFBQb3J0IiwibG9jYWxBZGRyZXNzIiwib24iLCJlcnIiLCJjb25zb2xlIiwibG9nIiwibWVzc2FnZSIsIkFycmF5IiwiaXNBcnJheSIsImRhdGEiLCJ0cmFuc2Zvcm1GdW5jIiwidW5kZWZpbmVkIiwiX3NlbGYiLCJfYnVuZGxlVHJhbnNmb3JtRnVuYyIsImJ1bmRsZSIsInRpbWVUYWciLCJpbmZvIiwicmVzb2x2ZSIsIl9idW5kbGVUcmFuc2Zvcm0iLCJ0aGVuIiwicHVzaCIsIm9wZW4iLCJfbWVzc2FnZVRyYW5zZm9ybUZ1bmMiLCJfbWVzc2FnZVRyYW5zZm9ybSIsInN0cmVhbSIsIndyaXRlIiwiX2lucHV0QWN0aXZlIiwiX2lucHV0VGltZW91dCIsImxlbmd0aCIsInNoaWZ0Iiwic2V0VGltZW91dCIsIl9oYW5kbGVJbnB1dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUVBOzs7Ozs7SUFFTUEsRzs7O0FBQ0YsbUJBQWM7QUFBQTs7QUFBQTs7QUFHVixjQUFLQyxPQUFMLEdBQWUsSUFBZjtBQUNBLGNBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsY0FBS0MsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGNBQUtDLE9BQUwsR0FBZSx3QkFBZjtBQU5VO0FBT2I7Ozs7Z0NBRU9DLFMsRUFBcUQ7QUFBQSxnQkFBMUNDLE9BQTBDLHVFQUFoQyxXQUFnQztBQUFBLGdCQUFuQkMsU0FBbUIsdUVBQVAsS0FBTzs7QUFDekQsa0NBQU8sS0FBS0wsS0FBTCxLQUFlLElBQXRCLEVBQTRCLHVCQUE1QjtBQUNBLGtDQUFPLE9BQU9HLFNBQVAsS0FBcUIsUUFBNUI7QUFDQSxrQ0FBTyxPQUFPQyxPQUFQLEtBQW1CLFFBQTFCOztBQUVBLGlCQUFLSixLQUFMLEdBQWEsSUFBSSxjQUFJTSxPQUFSLENBQWdCO0FBQ3pCSCwyQkFBV0EsU0FEYztBQUV6QkksOEJBQWNILE9BRlc7QUFHekJDLDJCQUFXQTtBQUhjLGFBQWhCLENBQWI7QUFLQSxpQkFBS0wsS0FBTCxDQUFXUSxFQUFYLENBQWMsT0FBZCxFQUF1QixVQUFDQyxHQUFELEVBQVM7QUFDNUJDLHdCQUFRQyxHQUFSLDBCQUFtQ0YsSUFBSUcsT0FBdkM7QUFDSCxhQUZEO0FBR0g7OzsrQ0FFb0IsMEJBQTRCO0FBQzdDO0FBQ0EsaUJBQUtWLE9BQUwsQ0FBYU0sRUFBYixDQUFnQixNQUFoQixFQUF3QixnQkFBUTtBQUM1QixvQkFBSSxDQUFDSyxNQUFNQyxPQUFOLENBQWNDLElBQWQsQ0FBTCxFQUEwQjtBQUN0QkEsMkJBQU8sQ0FBQ0EsSUFBRCxDQUFQO0FBQ0g7QUFDRDs7OztBQUtILGFBVEQ7QUFVSDs7O2tDQUVTO0FBQ04saUJBQUtoQixPQUFMLEdBQWUsS0FBZjtBQUNIOzs7OENBRThDO0FBQUEsZ0JBQTNCaUIsYUFBMkIsdUVBQVhDLFNBQVc7O0FBQzNDLGtDQUFPLEtBQUtqQixLQUFMLEtBQWUsSUFBdEIsRUFBNEIsb0JBQTVCO0FBQ0EsZ0JBQU1rQixRQUFRLElBQWQ7QUFDQSxpQkFBS0Msb0JBQUwsR0FBNEJILGFBQTVCO0FBQ0EsaUJBQUtoQixLQUFMLENBQVdRLEVBQVgsQ0FBYyxRQUFkLEVBQXdCLFVBQVVZLE1BQVYsRUFBa0JDLE9BQWxCLEVBQTJCQyxJQUEzQixFQUFpQztBQUNyRFosd0JBQVFDLEdBQVIsQ0FBWSx5Q0FBWixFQUF1RFUsT0FBdkQsRUFBZ0UsR0FBaEU7QUFDQVgsd0JBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ1csSUFBaEM7QUFDQSx1QkFBTyxtQkFBUUMsT0FBUixDQUFnQkwsTUFBTU0sZ0JBQU4sQ0FBdUJKLE1BQXZCLENBQWhCLEVBQ0ZLLElBREUsQ0FDRyxVQUFDVixJQUFELEVBQVU7QUFDWkcsMEJBQU1qQixZQUFOLENBQW1CeUIsSUFBbkIsQ0FBd0JYLElBQXhCO0FBQ0gsaUJBSEUsQ0FBUDtBQUlILGFBUEQ7QUFRQSxpQkFBS2YsS0FBTCxDQUFXMkIsSUFBWDtBQUNIOzs7eUNBRWdCUCxNLEVBQVE7QUFDckIsZ0JBQUksT0FBTyxLQUFLRCxvQkFBWixLQUFxQyxVQUF6QyxFQUFxRDtBQUNqRCx1QkFBTyxtQkFBUUksT0FBUixDQUFnQixLQUFLSixvQkFBTCxDQUEwQkMsTUFBMUIsQ0FBaEIsQ0FBUDtBQUNIO0FBQ0QsbUJBQU8sbUJBQVFHLE9BQVIsQ0FBZ0JILE1BQWhCLENBQVA7QUFDSDs7OytDQUUrQztBQUFBLGdCQUEzQkosYUFBMkIsdUVBQVhDLFNBQVc7O0FBQzVDLGtDQUFPLEtBQUtqQixLQUFMLEtBQWUsSUFBdEIsRUFBNEIsb0JBQTVCO0FBQ0EsZ0JBQU1rQixRQUFRLElBQWQ7QUFDQSxpQkFBS1UscUJBQUwsR0FBNkJaLGFBQTdCO0FBQ0EsaUJBQUtoQixLQUFMLENBQVdRLEVBQVgsQ0FBYyxTQUFkLEVBQXlCLFVBQUNJLE9BQUQsRUFBYTtBQUNsQyx1QkFBTyxtQkFBUVcsT0FBUixDQUFnQkwsTUFBTVcsaUJBQU4sQ0FBd0JqQixPQUF4QixDQUFoQixFQUNGYSxJQURFLENBQ0csVUFBQ1YsSUFBRCxFQUFVO0FBQ1osd0JBQUlHLE1BQU1uQixPQUFWLEVBQW1CO0FBQ2ZtQiw4QkFBTVksTUFBTixDQUFhQyxLQUFiLENBQW1CaEIsSUFBbkI7QUFDSCxxQkFGRCxNQUVPO0FBQ0hHLDhCQUFNWSxNQUFOLENBQWFDLEtBQWIsQ0FBbUIsSUFBbkI7QUFDSDtBQUNKLGlCQVBFLENBQVA7QUFRSCxhQVREO0FBVUEsaUJBQUsvQixLQUFMLENBQVcyQixJQUFYO0FBQ0g7OzswQ0FFaUJmLE8sRUFBUztBQUN2QixnQkFBSSxPQUFPLEtBQUtnQixxQkFBWixLQUFzQyxVQUExQyxFQUFzRDtBQUNsRCx1QkFBTyxtQkFBUUwsT0FBUixDQUFnQixLQUFLSyxxQkFBTCxDQUEyQmhCLE9BQTNCLENBQWhCLENBQVA7QUFDSDtBQUNELG1CQUFPLG1CQUFRVyxPQUFSLENBQWdCWCxPQUFoQixDQUFQO0FBQ0g7Ozt1Q0FFYztBQUNYLGdCQUFNTSxRQUFRLElBQWQ7QUFDQSxnQkFBS0EsTUFBTWMsWUFBTixJQUFzQmQsTUFBTWUsYUFBakMsRUFBZ0Q7QUFDNUM7QUFDSDtBQUNEZixrQkFBTWMsWUFBTixHQUFxQixJQUFyQjtBQUNBLG1CQUFPZCxNQUFNakIsWUFBTixDQUFtQmlDLE1BQW5CLEdBQTRCLENBQTVCLElBQWtDaEIsTUFBTWMsWUFBL0MsRUFBNkQ7QUFDekRkLHNCQUFNYyxZQUFOLEdBQXFCZCxNQUFNWSxNQUFOLENBQWFDLEtBQWIsQ0FBbUJiLE1BQU1qQixZQUFOLENBQW1Ca0MsS0FBbkIsRUFBbkIsQ0FBckI7QUFDSDtBQUNEakIsa0JBQU1jLFlBQU4sR0FBcUIsS0FBckI7QUFDQWQsa0JBQU1lLGFBQU4sR0FBc0JHLFdBQVcsWUFBTTtBQUNuQ2xCLHNCQUFNZSxhQUFOLEdBQXNCLElBQXRCO0FBQ0FmLHNCQUFNbUIsWUFBTjtBQUNILGFBSHFCLEVBR25CLEVBSG1CLENBQXRCO0FBSUg7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUtuQyxPQUFaO0FBQ0g7Ozs7O2tCQUlVSixHIiwiZmlsZSI6ImlvL25ldC9PU0MuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcbmltcG9ydCBvc2MgZnJvbSAnb3NjJztcblxuaW1wb3J0IEJhc2VOZXQgZnJvbSAnLi9CYXNlTmV0JztcblxuY2xhc3MgT1NDIGV4dGVuZHMgQmFzZU5ldCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fcG9ydCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2lucHV0QnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IHRocm91Z2goKTtcbiAgICB9XG5cbiAgICBpbml0VURQKGxvY2FsUG9ydCwgbG9jYWxJUCA9ICcxMjcuMC4wLjEnLCBicm9hZGNhc3QgPSBmYWxzZSkge1xuICAgICAgICBhc3NlcnQodGhpcy5fcG9ydCA9PT0gbnVsbCwgJ1BvcnQgYWxyZWFkeSBkZWZpbmVkLicpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGxvY2FsUG9ydCA9PT0gJ251bWJlcicpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGxvY2FsSVAgPT09ICdzdHJpbmcnKTtcblxuICAgICAgICB0aGlzLl9wb3J0ID0gbmV3IG9zYy5VRFBQb3J0KHtcbiAgICAgICAgICAgIGxvY2FsUG9ydDogbG9jYWxQb3J0LFxuICAgICAgICAgICAgbG9jYWxBZGRyZXNzOiBsb2NhbElQLFxuICAgICAgICAgICAgYnJvYWRjYXN0OiBicm9hZGNhc3RcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYE9TQyBVRFAgcG9ydCBlcnJvcjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5hYmxlU2VuZEZyb21TdHJlYW0oLyogdGFyZ2V0SXAsIHRhcmdldFBvcnQgKi8pIHtcbiAgICAgICAgLy8gVE9ETzogY29tcGxldGUgb3NjIGltcGxlbWVudGF0aW9uXG4gICAgICAgIHRoaXMuX3N0cmVhbS5vbignZGF0YScsIGRhdGEgPT4ge1xuICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IFtkYXRhXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBkYXRhLm1hcChkYXRhID0+IHtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAqL1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCkge1xuICAgICAgICB0aGlzLl9hY3RpdmUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmFibGVCdW5kbGVSZWNlaXZlKHRyYW5zZm9ybUZ1bmMgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgYXNzZXJ0KHRoaXMuX3BvcnQgIT09IG51bGwsICdQb3J0IGlzIHVuZGVmaW5lZC4nKTtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9idW5kbGVUcmFuc2Zvcm1GdW5jID0gdHJhbnNmb3JtRnVuYztcbiAgICAgICAgdGhpcy5fcG9ydC5vbignYnVuZGxlJywgZnVuY3Rpb24gKGJ1bmRsZSwgdGltZVRhZywgaW5mbykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FuIE9TQyBidW5kbGUganVzdCBhcnJpdmVkIGZvciB0aW1lIHRhZycsIHRpbWVUYWcsICc6Jyk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUmVtb3RlIGluZm8gaXM6ICcsIGluZm8pO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShfc2VsZi5fYnVuZGxlVHJhbnNmb3JtKGJ1bmRsZSkpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2lucHV0QnVmZmVyLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wb3J0Lm9wZW4oKTtcbiAgICB9XG5cbiAgICBfYnVuZGxlVHJhbnNmb3JtKGJ1bmRsZSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2J1bmRsZVRyYW5zZm9ybUZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYnVuZGxlVHJhbnNmb3JtRnVuYyhidW5kbGUpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGJ1bmRsZSk7XG4gICAgfVxuXG4gICAgZW5hYmxlTWVzc2FnZVJlY2VpdmUodHJhbnNmb3JtRnVuYyA9IHVuZGVmaW5lZCkge1xuICAgICAgICBhc3NlcnQodGhpcy5fcG9ydCAhPT0gbnVsbCwgJ1BvcnQgaXMgdW5kZWZpbmVkLicpO1xuICAgICAgICBjb25zdCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX21lc3NhZ2VUcmFuc2Zvcm1GdW5jID0gdHJhbnNmb3JtRnVuYztcbiAgICAgICAgdGhpcy5fcG9ydC5vbignbWVzc2FnZScsIChtZXNzYWdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKF9zZWxmLl9tZXNzYWdlVHJhbnNmb3JtKG1lc3NhZ2UpKVxuICAgICAgICAgICAgICAgIC50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfc2VsZi5fYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdHJlYW0ud3JpdGUoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5zdHJlYW0ud3JpdGUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3BvcnQub3BlbigpO1xuICAgIH1cblxuICAgIF9tZXNzYWdlVHJhbnNmb3JtKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9tZXNzYWdlVHJhbnNmb3JtRnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9tZXNzYWdlVHJhbnNmb3JtRnVuYyhtZXNzYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBfaGFuZGxlSW5wdXQoKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgaWYgKCBfc2VsZi5faW5wdXRBY3RpdmUgfHwgX3NlbGYuX2lucHV0VGltZW91dCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIF9zZWxmLl9pbnB1dEFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHdoaWxlIChfc2VsZi5faW5wdXRCdWZmZXIubGVuZ3RoID4gMCAmJiAgX3NlbGYuX2lucHV0QWN0aXZlKSB7XG4gICAgICAgICAgICBfc2VsZi5faW5wdXRBY3RpdmUgPSBfc2VsZi5zdHJlYW0ud3JpdGUoX3NlbGYuX2lucHV0QnVmZmVyLnNoaWZ0KCkpO1xuICAgICAgICB9XG4gICAgICAgIF9zZWxmLl9pbnB1dEFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICBfc2VsZi5faW5wdXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBfc2VsZi5faW5wdXRUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgIF9zZWxmLl9oYW5kbGVJbnB1dCgpO1xuICAgICAgICB9LCAxMCk7XG4gICAgfVxuXG4gICAgZ2V0IHN0cmVhbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmVhbTtcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgT1NDOyJdfQ==
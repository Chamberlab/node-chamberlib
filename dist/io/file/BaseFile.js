'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseFile = function () {
    function BaseFile() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        (0, _classCallCheck3.default)(this, BaseFile);

        this._pathinfo = {
            root: null,
            dir: null,
            base: null,
            ext: null,
            name: null
        };
        this._fullpath = null;
        this._data = data;
    }

    (0, _createClass3.default)(BaseFile, [{
        key: 'write',
        value: function write(file) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var createPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
            var overwrite = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

            this._data = data || this._data;
            (0, _assert2.default)(typeof file === 'string');
            (0, _assert2.default)(typeof this._data !== 'undefined', 'File has no data.');

            // TODO: make this async, lazy bastard

            this._fullpath = _path2.default.resolve(file);
            this._pathinfo = _path2.default.parse(this.fullpath);

            if (!overwrite) {
                (0, _assert2.default)(!_fs2.default.existsSync(_path2.default.join(this.dir, this.base)));
            }
            if (!createPath) {
                (0, _assert2.default)(_fs2.default.existsSync(this.dir));
            } else {
                // TODO: does not work on windows b.c. of path root
                var _p = '',
                    dirs = this.dir.split(_path2.default.sep);
                for (var i in dirs) {
                    _p += i === 0 ? this.root : _path2.default.sep + dirs[i];
                    if (!_fs2.default.existsSync(_p)) {
                        _fs2.default.mkdirSync(_p);
                    }
                }
                (0, _assert2.default)(_fs2.default.existsSync(this.dir), 'Failed to create path at ' + this.dir);
            }

            var writer = _fs2.default.createWriteStream(this.fullpath),
                p = new _bluebird2.default(function (resolve, reject) {
                writer.on('close', resolve);
                writer.on('error', reject);
            });
            writer.end(data);
            return p;
        }
    }, {
        key: 'read',
        value: function read(file) {
            var stream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            (0, _assert2.default)(typeof file === 'string');
            this._fullpath = _path2.default.resolve(file);

            (0, _assert2.default)(_fs2.default.existsSync(this._fullpath));
            this._pathinfo = _path2.default.parse(file);

            var _self = this;
            if (stream) {
                return _fs2.default.createReadStream(this.fullpath);
            } else {
                return _bluebird2.default.promisify(_fs2.default.readFile)(this.fullpath).then(function (data) {
                    _self._data = data;
                    return _self.data;
                });
            }
        }
    }, {
        key: 'data',
        get: function get() {
            return this._data;
        },
        set: function set(value) {
            this._data = value;
        }
    }, {
        key: 'size',
        get: function get() {
            return this.data && this.data.hasOwnProperty('length') ? this.data.length : NaN;
        }
    }, {
        key: 'fullpath',
        get: function get() {
            return this._fullpath;
        }
    }, {
        key: 'root',
        get: function get() {
            return this._pathinfo.root;
        }
    }, {
        key: 'dir',
        get: function get() {
            return this._pathinfo.dir;
        }
    }, {
        key: 'base',
        get: function get() {
            return this._pathinfo.base;
        }
    }, {
        key: 'ext',
        get: function get() {
            return this._pathinfo.ext;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._pathinfo.name;
        }
    }]);
    return BaseFile;
}();

exports.default = BaseFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvQmFzZUZpbGUuanMiXSwibmFtZXMiOlsiQmFzZUZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiX3BhdGhpbmZvIiwicm9vdCIsImRpciIsImJhc2UiLCJleHQiLCJuYW1lIiwiX2Z1bGxwYXRoIiwiX2RhdGEiLCJmaWxlIiwiY3JlYXRlUGF0aCIsIm92ZXJ3cml0ZSIsInJlc29sdmUiLCJwYXJzZSIsImZ1bGxwYXRoIiwiZXhpc3RzU3luYyIsImpvaW4iLCJwIiwiZGlycyIsInNwbGl0Iiwic2VwIiwiaSIsIm1rZGlyU3luYyIsIndyaXRlciIsImNyZWF0ZVdyaXRlU3RyZWFtIiwicmVqZWN0Iiwib24iLCJlbmQiLCJzdHJlYW0iLCJfc2VsZiIsImNyZWF0ZVJlYWRTdHJlYW0iLCJwcm9taXNpZnkiLCJyZWFkRmlsZSIsInRoZW4iLCJ2YWx1ZSIsImhhc093blByb3BlcnR5IiwibGVuZ3RoIiwiTmFOIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsUTtBQUNGLHdCQUE4QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEMsU0FBVztBQUFBOztBQUMxQixhQUFLQyxTQUFMLEdBQWlCO0FBQ2JDLGtCQUFNLElBRE87QUFFYkMsaUJBQUssSUFGUTtBQUdiQyxrQkFBTSxJQUhPO0FBSWJDLGlCQUFLLElBSlE7QUFLYkMsa0JBQU07QUFMTyxTQUFqQjtBQU9BLGFBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxhQUFLQyxLQUFMLEdBQWFULElBQWI7QUFDSDs7Ozs4QkFFS1UsSSxFQUE2RDtBQUFBLGdCQUF2RFYsSUFBdUQsdUVBQWhEQyxTQUFnRDtBQUFBLGdCQUFyQ1UsVUFBcUMsdUVBQXhCLElBQXdCO0FBQUEsZ0JBQWxCQyxTQUFrQix1RUFBTixJQUFNOztBQUMvRCxpQkFBS0gsS0FBTCxHQUFhVCxRQUFRLEtBQUtTLEtBQTFCO0FBQ0Esa0NBQU8sT0FBT0MsSUFBUCxLQUFn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QUwsQ0FBZUMsSUFBdEI7QUFDSDs7OzRCQUVTO0FBQ04sbUJBQU8sS0FBS0QsU0FBTCxDQUFlRSxHQUF0QjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLRixTQUFMLENBQWVHLElBQXRCO0FBQ0g7Ozs0QkFFUztBQUNOLG1CQUFPLEtBQUtILFNBQUwsQ0FBZUksR0FBdEI7QUFDSDs7OzRCQUVVO0FBQ1AsbUJBQU8sS0FBS0osU0FBTCxDQUFlSyxJQUF0QjtBQUNIOzs7OztrQkFHVVIsUSIsImZpbGUiOiJpby9maWxlL0Jhc2VGaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5jbGFzcyBCYXNlRmlsZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSA9IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9wYXRoaW5mbyA9IHtcbiAgICAgICAgICAgIHJvb3Q6IG51bGwsXG4gICAgICAgICAgICBkaXI6IG51bGwsXG4gICAgICAgICAgICBiYXNlOiBudWxsLFxuICAgICAgICAgICAgZXh0OiBudWxsLFxuICAgICAgICAgICAgbmFtZTogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9mdWxscGF0aCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhO1xuICAgIH1cblxuICAgIHdyaXRlKGZpbGUsIGRhdGEgPSB1bmRlZmluZWQsIGNyZWF0ZVBhdGggPSB0cnVlLCBvdmVyd3JpdGUgPSB0cnVlKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBkYXRhIHx8IHRoaXMuX2RhdGE7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpO1xuICAgICAgICBhc3NlcnQodHlwZW9mIHRoaXMuX2RhdGEgIT09ICd1bmRlZmluZWQnLCAnRmlsZSBoYXMgbm8gZGF0YS4nKTtcblxuICAgICAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYXN5bmMsIGxhenkgYmFzdGFyZFxuXG4gICAgICAgIHRoaXMuX2Z1bGxwYXRoID0gcGF0aC5yZXNvbHZlKGZpbGUpO1xuICAgICAgICB0aGlzLl9wYXRoaW5mbyA9IHBhdGgucGFyc2UodGhpcy5mdWxscGF0aCk7XG5cbiAgICAgICAgaWYgKCFvdmVyd3JpdGUpIHtcbiAgICAgICAgICAgIGFzc2VydCghZnMuZXhpc3RzU3luYyhwYXRoLmpvaW4odGhpcy5kaXIsIHRoaXMuYmFzZSkpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNyZWF0ZVBhdGgpIHtcbiAgICAgICAgICAgIGFzc2VydChmcy5leGlzdHNTeW5jKHRoaXMuZGlyKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBkb2VzIG5vdCB3b3JrIG9uIHdpbmRvd3MgYi5jLiBvZiBwYXRoIHJvb3RcbiAgICAgICAgICAgIGxldCBwID0gJycsIGRpcnMgPSB0aGlzLmRpci5zcGxpdChwYXRoLnNlcCk7XG4gICAgICAgICAgICBmb3IgKGxldCBpIGluIGRpcnMpIHtcbiAgICAgICAgICAgICAgICBwICs9IGkgPT09IDAgPyB0aGlzLnJvb3QgOiBwYXRoLnNlcCArIGRpcnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCFmcy5leGlzdHNTeW5jKHApKSB7XG4gICAgICAgICAgICAgICAgICAgIGZzLm1rZGlyU3luYyhwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhc3NlcnQoZnMuZXhpc3RzU3luYyh0aGlzLmRpciksIGBGYWlsZWQgdG8gY3JlYXRlIHBhdGggYXQgJHt0aGlzLmRpcn1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB3cml0ZXIgPSBmcy5jcmVhdGVXcml0ZVN0cmVhbSh0aGlzLmZ1bGxwYXRoKSxcbiAgICAgICAgICAgIHAgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgd3JpdGVyLm9uKCdjbG9zZScsIHJlc29sdmUpO1xuICAgICAgICAgICAgICAgIHdyaXRlci5vbignZXJyb3InLCByZWplY3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHdyaXRlci5lbmQoZGF0YSk7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH1cblxuICAgIHJlYWQoZmlsZSwgc3RyZWFtID0gZmFsc2UpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBmaWxlID09PSAnc3RyaW5nJyk7XG4gICAgICAgIHRoaXMuX2Z1bGxwYXRoID0gcGF0aC5yZXNvbHZlKGZpbGUpO1xuXG4gICAgICAgIGFzc2VydChmcy5leGlzdHNTeW5jKHRoaXMuX2Z1bGxwYXRoKSk7XG4gICAgICAgIHRoaXMuX3BhdGhpbmZvID0gcGF0aC5wYXJzZShmaWxlKTtcblxuICAgICAgICBsZXQgX3NlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICByZXR1cm4gZnMuY3JlYXRlUmVhZFN0cmVhbSh0aGlzLmZ1bGxwYXRoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnByb21pc2lmeShmcy5yZWFkRmlsZSkodGhpcy5mdWxscGF0aClcbiAgICAgICAgICAgICAgICAudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5fZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfc2VsZi5kYXRhO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhO1xuICAgIH1cblxuICAgIHNldCBkYXRhKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuaGFzT3duUHJvcGVydHkoJ2xlbmd0aCcpID8gdGhpcy5kYXRhLmxlbmd0aCA6IE5hTjtcbiAgICB9XG5cbiAgICBnZXQgZnVsbHBhdGgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mdWxscGF0aDtcbiAgICB9XG5cbiAgICBnZXQgcm9vdCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhpbmZvLnJvb3Q7XG4gICAgfVxuXG4gICAgZ2V0IGRpcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhpbmZvLmRpcjtcbiAgICB9XG5cbiAgICBnZXQgYmFzZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhpbmZvLmJhc2U7XG4gICAgfVxuXG4gICAgZ2V0IGV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhpbmZvLmV4dDtcbiAgICB9XG5cbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3BhdGhpbmZvLm5hbWU7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlRmlsZTsiXX0=
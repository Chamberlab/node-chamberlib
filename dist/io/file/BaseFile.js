'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseFile = function () {
    function BaseFile() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, BaseFile);

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

    _createClass(BaseFile, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvQmFzZUZpbGUuanMiXSwibmFtZXMiOlsiQmFzZUZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiX3BhdGhpbmZvIiwicm9vdCIsImRpciIsImJhc2UiLCJleHQiLCJuYW1lIiwiX2Z1bGxwYXRoIiwiX2RhdGEiLCJmaWxlIiwiY3JlYXRlUGF0aCIsIm92ZXJ3cml0ZSIsInJlc29sdmUiLCJwYXJzZSIsImZ1bGxwYXRoIiwiZXhpc3RzU3luYyIsImpvaW4iLCJwIiwiZGlycyIsInNwbGl0Iiwic2VwIiwiaSIsIm1rZGlyU3luYyIsIndyaXRlciIsImNyZWF0ZVdyaXRlU3RyZWFtIiwicmVqZWN0Iiwib24iLCJlbmQiLCJzdHJlYW0iLCJfc2VsZiIsImNyZWF0ZVJlYWRTdHJlYW0iLCJwcm9taXNpZnkiLCJyZWFkRmlsZSIsInRoZW4iLCJ2YWx1ZSIsImhhc093blByb3BlcnR5IiwibGVuZ3RoIiwiTmFOIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVNQSxRO0FBQ0Ysd0JBQThCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYQyxTQUFXOztBQUFBOztBQUMxQixhQUFLQyxTQUFMLEdBQWlCO0FBQ2JDLGtCQUFNLElBRE87QUFFYkMsaUJBQUssSUFGUTtBQUdiQyxrQkFBTSxJQUhPO0FBSWJDLGlCQUFLLElBSlE7QUFLYkMsa0JBQU07QUFMTyxTQUFqQjtBQU9BLGFBQUtDLFNBQUwsR0FBaUIsSUFBakI7QUFDQSxhQUFLQyxLQUFMLEdBQWFULElBQWI7QUFDSDs7Ozs4QkFFS1UsSSxFQUE2RDtBQUFBLGdCQUF2RFYsSUFBdUQsdUVBQWhEQyxTQUFnRDtBQUFBLGdCQUFyQ1UsVUFBcUMsdUVBQXhCLElBQXdCO0FBQUEsZ0JBQWxCQyxTQUFrQix1RUFBTixJQUFNOztBQUMvRCxpQkFBS0gsS0FBTCxHQUFhVCxRQUFRLEtBQUtTLEtBQTFCO0FBQ0Esa0NBQU8sT0FBT0MsSUFBUCxLQUFnQixR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Q0FBZUMsSUFBdEI7QUFDSDs7OzRCQUVTO0FBQ04sbUJBQU8sS0FBS0QsU0FBTCxDQUFlRSxHQUF0QjtBQUNIOzs7NEJBRVU7QUFDUCxtQkFBTyxLQUFLRixTQUFMLENBQWVHLElBQXRCO0FBQ0g7Ozs0QkFFUztBQUNOLG1CQUFPLEtBQUtILFNBQUwsQ0FBZUksR0FBdEI7QUFDSDs7OzRCQUVVO0FBQ1AsbUJBQU8sS0FBS0osU0FBTCxDQUFlSyxJQUF0QjtBQUNIOzs7Ozs7a0JBR1VSLFEiLCJmaWxlIjoiaW8vZmlsZS9CYXNlRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuY2xhc3MgQmFzZUZpbGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcGF0aGluZm8gPSB7XG4gICAgICAgICAgICByb290OiBudWxsLFxuICAgICAgICAgICAgZGlyOiBudWxsLFxuICAgICAgICAgICAgYmFzZTogbnVsbCxcbiAgICAgICAgICAgIGV4dDogbnVsbCxcbiAgICAgICAgICAgIG5hbWU6IG51bGxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fZnVsbHBhdGggPSBudWxsO1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICB3cml0ZShmaWxlLCBkYXRhID0gdW5kZWZpbmVkLCBjcmVhdGVQYXRoID0gdHJ1ZSwgb3ZlcndyaXRlID0gdHJ1ZSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gZGF0YSB8fCB0aGlzLl9kYXRhO1xuICAgICAgICBhc3NlcnQodHlwZW9mIGZpbGUgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB0aGlzLl9kYXRhICE9PSAndW5kZWZpbmVkJywgJ0ZpbGUgaGFzIG5vIGRhdGEuJyk7XG5cbiAgICAgICAgLy8gVE9ETzogbWFrZSB0aGlzIGFzeW5jLCBsYXp5IGJhc3RhcmRcblxuICAgICAgICB0aGlzLl9mdWxscGF0aCA9IHBhdGgucmVzb2x2ZShmaWxlKTtcbiAgICAgICAgdGhpcy5fcGF0aGluZm8gPSBwYXRoLnBhcnNlKHRoaXMuZnVsbHBhdGgpO1xuXG4gICAgICAgIGlmICghb3ZlcndyaXRlKSB7XG4gICAgICAgICAgICBhc3NlcnQoIWZzLmV4aXN0c1N5bmMocGF0aC5qb2luKHRoaXMuZGlyLCB0aGlzLmJhc2UpKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFjcmVhdGVQYXRoKSB7XG4gICAgICAgICAgICBhc3NlcnQoZnMuZXhpc3RzU3luYyh0aGlzLmRpcikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVE9ETzogZG9lcyBub3Qgd29yayBvbiB3aW5kb3dzIGIuYy4gb2YgcGF0aCByb290XG4gICAgICAgICAgICBsZXQgcCA9ICcnLCBkaXJzID0gdGhpcy5kaXIuc3BsaXQocGF0aC5zZXApO1xuICAgICAgICAgICAgZm9yIChsZXQgaSBpbiBkaXJzKSB7XG4gICAgICAgICAgICAgICAgcCArPSBpID09PSAwID8gdGhpcy5yb290IDogcGF0aC5zZXAgKyBkaXJzW2ldO1xuICAgICAgICAgICAgICAgIGlmICghZnMuZXhpc3RzU3luYyhwKSkge1xuICAgICAgICAgICAgICAgICAgICBmcy5ta2RpclN5bmMocCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXNzZXJ0KGZzLmV4aXN0c1N5bmModGhpcy5kaXIpLCBgRmFpbGVkIHRvIGNyZWF0ZSBwYXRoIGF0ICR7dGhpcy5kaXJ9YCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd3JpdGVyID0gZnMuY3JlYXRlV3JpdGVTdHJlYW0odGhpcy5mdWxscGF0aCksXG4gICAgICAgICAgICBwID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgICAgIHdyaXRlci5vbignY2xvc2UnLCByZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB3cml0ZXIub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB3cml0ZXIuZW5kKGRhdGEpO1xuICAgICAgICByZXR1cm4gcDtcbiAgICB9XG5cbiAgICByZWFkKGZpbGUsIHN0cmVhbSA9IGZhbHNlKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgZmlsZSA9PT0gJ3N0cmluZycpO1xuICAgICAgICB0aGlzLl9mdWxscGF0aCA9IHBhdGgucmVzb2x2ZShmaWxlKTtcblxuICAgICAgICBhc3NlcnQoZnMuZXhpc3RzU3luYyh0aGlzLl9mdWxscGF0aCkpO1xuICAgICAgICB0aGlzLl9wYXRoaW5mbyA9IHBhdGgucGFyc2UoZmlsZSk7XG5cbiAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIGZzLmNyZWF0ZVJlYWRTdHJlYW0odGhpcy5mdWxscGF0aCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5wcm9taXNpZnkoZnMucmVhZEZpbGUpKHRoaXMuZnVsbHBhdGgpXG4gICAgICAgICAgICAgICAgLnRoZW4oKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3NlbGYuX2RhdGEgPSBkYXRhO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3NlbGYuZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBkYXRhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YTtcbiAgICB9XG5cbiAgICBzZXQgZGF0YSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9kYXRhID0gdmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IHNpemUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmhhc093blByb3BlcnR5KCdsZW5ndGgnKSA/IHRoaXMuZGF0YS5sZW5ndGggOiBOYU47XG4gICAgfVxuXG4gICAgZ2V0IGZ1bGxwYXRoKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnVsbHBhdGg7XG4gICAgfVxuXG4gICAgZ2V0IHJvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoaW5mby5yb290O1xuICAgIH1cblxuICAgIGdldCBkaXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoaW5mby5kaXI7XG4gICAgfVxuXG4gICAgZ2V0IGJhc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoaW5mby5iYXNlO1xuICAgIH1cblxuICAgIGdldCBleHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoaW5mby5leHQ7XG4gICAgfVxuXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wYXRoaW5mby5uYW1lO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUZpbGU7Il19
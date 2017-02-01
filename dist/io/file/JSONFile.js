'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseFile2 = require('./BaseFile');

var _BaseFile3 = _interopRequireDefault(_BaseFile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JSONFile = function (_BaseFile) {
    (0, _inherits3.default)(JSONFile, _BaseFile);

    function JSONFile() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        (0, _classCallCheck3.default)(this, JSONFile);
        return (0, _possibleConstructorReturn3.default)(this, (JSONFile.__proto__ || (0, _getPrototypeOf2.default)(JSONFile)).call(this, data));
    }

    (0, _createClass3.default)(JSONFile, [{
        key: 'read',
        value: function read(file) {
            var _this2 = this;

            return (0, _get3.default)(JSONFile.prototype.__proto__ || (0, _getPrototypeOf2.default)(JSONFile.prototype), 'read', this).call(this, file).then(function (data) {
                _this2.data = JSON.parse(data);
                return _this2.data;
            });
        }
    }, {
        key: 'write',
        value: function write(file) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return (0, _get3.default)(JSONFile.prototype.__proto__ || (0, _getPrototypeOf2.default)(JSONFile.prototype), 'write', this).call(this, file, (0, _stringify2.default)(data || this.data));
        }
    }]);
    return JSONFile;
}(_BaseFile3.default);

exports.default = JSONFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvSlNPTkZpbGUuanMiXSwibmFtZXMiOlsiSlNPTkZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiZmlsZSIsInRoZW4iLCJKU09OIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRU1BLFE7OztBQUNGLHdCQUE4QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEMsU0FBVztBQUFBO0FBQUEseUlBQ3BCRCxJQURvQjtBQUU3Qjs7Ozs2QkFFSUUsSSxFQUFNO0FBQUE7O0FBQ1AsbUJBQU8sK0hBQVdBLElBQVgsRUFBaUJDLElBQWpCLENBQXNCLGdCQUFRO0FBQ2pDLHVCQUFLSCxJQUFMLEdBQVlJLEtBQUtDLEtBQUwsQ0FBV0wsSUFBWCxDQUFaO0FBQ0EsdUJBQU8sT0FBS0EsSUFBWjtBQUNILGFBSE0sQ0FBUDtBQUlIOzs7OEJBRUtFLEksRUFBd0I7QUFBQSxnQkFBbEJGLElBQWtCLHVFQUFYQyxTQUFXOztBQUMxQixtSkFBbUJDLElBQW5CLEVBQXlCLHlCQUFlRixRQUFRLEtBQUtBLElBQTVCLENBQXpCO0FBQ0g7Ozs7O2tCQUdVRCxRIiwiZmlsZSI6ImlvL2ZpbGUvSlNPTkZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUZpbGUgZnJvbSAnLi9CYXNlRmlsZSc7XG5cbmNsYXNzIEpTT05GaWxlIGV4dGVuZHMgQmFzZUZpbGUge1xuICAgIGNvbnN0cnVjdG9yKGRhdGEgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoZGF0YSk7XG4gICAgfVxuXG4gICAgcmVhZChmaWxlKSB7XG4gICAgICAgIHJldHVybiBzdXBlci5yZWFkKGZpbGUpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgd3JpdGUoZmlsZSwgZGF0YSA9IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gc3VwZXIud3JpdGUoZmlsZSwgSlNPTi5zdHJpbmdpZnkoZGF0YSB8fCB0aGlzLmRhdGEpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEpTT05GaWxlOyJdfQ==
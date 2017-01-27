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
            return (0, _get3.default)(JSONFile.prototype.__proto__ || (0, _getPrototypeOf2.default)(JSONFile.prototype), 'read', this).call(this, file).then(function (data) {
                data = JSON.parse(data);
                return data;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvSlNPTkZpbGUuanMiXSwibmFtZXMiOlsiSlNPTkZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiZmlsZSIsInRoZW4iLCJKU09OIiwicGFyc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7O0lBRU1BLFE7OztBQUNGLHdCQUE4QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEMsU0FBVztBQUFBO0FBQUEseUlBQ3BCRCxJQURvQjtBQUU3Qjs7Ozs2QkFFSUUsSSxFQUFNO0FBQ1AsbUJBQU8sK0hBQVdBLElBQVgsRUFBaUJDLElBQWpCLENBQXNCLFVBQUNILElBQUQsRUFBVTtBQUNuQ0EsdUJBQU9JLEtBQUtDLEtBQUwsQ0FBV0wsSUFBWCxDQUFQO0FBQ0EsdUJBQU9BLElBQVA7QUFDSCxhQUhNLENBQVA7QUFJSDs7OzhCQUVLRSxJLEVBQXdCO0FBQUEsZ0JBQWxCRixJQUFrQix1RUFBWEMsU0FBVzs7QUFDMUIsbUpBQW1CQyxJQUFuQixFQUF5Qix5QkFBZUYsUUFBUSxLQUFLQSxJQUE1QixDQUF6QjtBQUNIOzs7OztrQkFHVUQsUSIsImZpbGUiOiJpby9maWxlL0pTT05GaWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VGaWxlIGZyb20gJy4vQmFzZUZpbGUnO1xuXG5jbGFzcyBKU09ORmlsZSBleHRlbmRzIEJhc2VGaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKGRhdGEpO1xuICAgIH1cblxuICAgIHJlYWQoZmlsZSkge1xuICAgICAgICByZXR1cm4gc3VwZXIucmVhZChmaWxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB3cml0ZShmaWxlLCBkYXRhID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzdXBlci53cml0ZShmaWxlLCBKU09OLnN0cmluZ2lmeShkYXRhIHx8IHRoaXMuZGF0YSkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNPTkZpbGU7Il19
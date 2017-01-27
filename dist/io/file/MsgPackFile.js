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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseFile2 = require('./BaseFile');

var _BaseFile3 = _interopRequireDefault(_BaseFile2);

var _msgpack = require('msgpack');

var _msgpack2 = _interopRequireDefault(_msgpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MsgPackFile = function (_BaseFile) {
    (0, _inherits3.default)(MsgPackFile, _BaseFile);

    function MsgPackFile() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        (0, _classCallCheck3.default)(this, MsgPackFile);
        return (0, _possibleConstructorReturn3.default)(this, (MsgPackFile.__proto__ || (0, _getPrototypeOf2.default)(MsgPackFile)).call(this, data));
    }

    (0, _createClass3.default)(MsgPackFile, [{
        key: 'read',
        value: function read(file) {
            return (0, _get3.default)(MsgPackFile.prototype.__proto__ || (0, _getPrototypeOf2.default)(MsgPackFile.prototype), 'read', this).call(this, file).then(function (data) {
                return _msgpack2.default.unpack(data);
            });
        }
    }, {
        key: 'write',
        value: function write(file) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return (0, _get3.default)(MsgPackFile.prototype.__proto__ || (0, _getPrototypeOf2.default)(MsgPackFile.prototype), 'write', this).call(this, file, _msgpack2.default.pack(data || this.data));
        }
    }]);
    return MsgPackFile;
}(_BaseFile3.default);

exports.default = MsgPackFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvTXNnUGFja0ZpbGUuanMiXSwibmFtZXMiOlsiTXNnUGFja0ZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiZmlsZSIsInRoZW4iLCJ1bnBhY2siLCJwYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsVzs7O0FBQ0YsMkJBQThCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYQyxTQUFXO0FBQUE7QUFBQSwrSUFDcEJELElBRG9CO0FBRTdCOzs7OzZCQUVJRSxJLEVBQU07QUFDUCxtQkFBTyxxSUFBV0EsSUFBWCxFQUFpQkMsSUFBakIsQ0FBc0IsVUFBQ0gsSUFBRCxFQUFVO0FBQ25DLHVCQUFPLGtCQUFRSSxNQUFSLENBQWVKLElBQWYsQ0FBUDtBQUNILGFBRk0sQ0FBUDtBQUdIOzs7OEJBRUtFLEksRUFBd0I7QUFBQSxnQkFBbEJGLElBQWtCLHVFQUFYQyxTQUFXOztBQUMxQix5SkFBbUJDLElBQW5CLEVBQXlCLGtCQUFRRyxJQUFSLENBQWFMLFFBQVEsS0FBS0EsSUFBMUIsQ0FBekI7QUFDSDs7Ozs7a0JBR1VELFciLCJmaWxlIjoiaW8vZmlsZS9Nc2dQYWNrRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRmlsZSBmcm9tICcuL0Jhc2VGaWxlJztcbmltcG9ydCBtc2dwYWNrIGZyb20gJ21zZ3BhY2snO1xuXG5jbGFzcyBNc2dQYWNrRmlsZSBleHRlbmRzIEJhc2VGaWxlIHtcbiAgICBjb25zdHJ1Y3RvcihkYXRhID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKGRhdGEpO1xuICAgIH1cblxuICAgIHJlYWQoZmlsZSkge1xuICAgICAgICByZXR1cm4gc3VwZXIucmVhZChmaWxlKS50aGVuKChkYXRhKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbXNncGFjay51bnBhY2soZGF0YSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHdyaXRlKGZpbGUsIGRhdGEgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLndyaXRlKGZpbGUsIG1zZ3BhY2sucGFjayhkYXRhIHx8IHRoaXMuZGF0YSkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTXNnUGFja0ZpbGU7Il19
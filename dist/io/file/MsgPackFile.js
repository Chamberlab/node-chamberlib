'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseFile2 = require('./BaseFile');

var _BaseFile3 = _interopRequireDefault(_BaseFile2);

var _msgpack = require('msgpack');

var _msgpack2 = _interopRequireDefault(_msgpack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MsgPackFile = function (_BaseFile) {
    _inherits(MsgPackFile, _BaseFile);

    function MsgPackFile() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, MsgPackFile);

        return _possibleConstructorReturn(this, (MsgPackFile.__proto__ || Object.getPrototypeOf(MsgPackFile)).call(this, data));
    }

    _createClass(MsgPackFile, [{
        key: 'read',
        value: function read(file) {
            return _get(MsgPackFile.prototype.__proto__ || Object.getPrototypeOf(MsgPackFile.prototype), 'read', this).call(this, file).then(function (data) {
                return _msgpack2.default.unpack(data);
            });
        }
    }, {
        key: 'write',
        value: function write(file) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return _get(MsgPackFile.prototype.__proto__ || Object.getPrototypeOf(MsgPackFile.prototype), 'write', this).call(this, file, _msgpack2.default.pack(data || this.data));
        }
    }]);

    return MsgPackFile;
}(_BaseFile3.default);

exports.default = MsgPackFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvTXNnUGFja0ZpbGUuanMiXSwibmFtZXMiOlsiTXNnUGFja0ZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiZmlsZSIsInRoZW4iLCJ1bnBhY2siLCJwYWNrIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLFc7OztBQUNGLDJCQUE4QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEMsU0FBVzs7QUFBQTs7QUFBQSx5SEFDcEJELElBRG9CO0FBRTdCOzs7OzZCQUVJRSxJLEVBQU07QUFDUCxtQkFBTywrR0FBV0EsSUFBWCxFQUFpQkMsSUFBakIsQ0FBc0IsVUFBQ0gsSUFBRCxFQUFVO0FBQ25DLHVCQUFPLGtCQUFRSSxNQUFSLENBQWVKLElBQWYsQ0FBUDtBQUNILGFBRk0sQ0FBUDtBQUdIOzs7OEJBRUtFLEksRUFBd0I7QUFBQSxnQkFBbEJGLElBQWtCLHVFQUFYQyxTQUFXOztBQUMxQixtSUFBbUJDLElBQW5CLEVBQXlCLGtCQUFRRyxJQUFSLENBQWFMLFFBQVEsS0FBS0EsSUFBMUIsQ0FBekI7QUFDSDs7Ozs7O2tCQUdVRCxXIiwiZmlsZSI6ImlvL2ZpbGUvTXNnUGFja0ZpbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUZpbGUgZnJvbSAnLi9CYXNlRmlsZSc7XG5pbXBvcnQgbXNncGFjayBmcm9tICdtc2dwYWNrJztcblxuY2xhc3MgTXNnUGFja0ZpbGUgZXh0ZW5kcyBCYXNlRmlsZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihkYXRhKTtcbiAgICB9XG5cbiAgICByZWFkKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlYWQoZmlsZSkudGhlbigoZGF0YSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG1zZ3BhY2sudW5wYWNrKGRhdGEpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB3cml0ZShmaWxlLCBkYXRhID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzdXBlci53cml0ZShmaWxlLCBtc2dwYWNrLnBhY2soZGF0YSB8fCB0aGlzLmRhdGEpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1zZ1BhY2tGaWxlOyJdfQ==
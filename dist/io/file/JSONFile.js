'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseFile2 = require('./BaseFile');

var _BaseFile3 = _interopRequireDefault(_BaseFile2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JSONFile = function (_BaseFile) {
    _inherits(JSONFile, _BaseFile);

    function JSONFile() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, JSONFile);

        return _possibleConstructorReturn(this, (JSONFile.__proto__ || Object.getPrototypeOf(JSONFile)).call(this, data));
    }

    _createClass(JSONFile, [{
        key: 'read',
        value: function read(file) {
            var _this2 = this;

            return _get(JSONFile.prototype.__proto__ || Object.getPrototypeOf(JSONFile.prototype), 'read', this).call(this, file).then(function (data) {
                _this2.data = JSON.parse(data);
                return _this2.data;
            });
        }
    }, {
        key: 'write',
        value: function write(file) {
            var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            return _get(JSONFile.prototype.__proto__ || Object.getPrototypeOf(JSONFile.prototype), 'write', this).call(this, file, JSON.stringify(data || this.data));
        }
    }]);

    return JSONFile;
}(_BaseFile3.default);

exports.default = JSONFile;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvSlNPTkZpbGUuanMiXSwibmFtZXMiOlsiSlNPTkZpbGUiLCJkYXRhIiwidW5kZWZpbmVkIiwiZmlsZSIsInRoZW4iLCJKU09OIiwicGFyc2UiLCJzdHJpbmdpZnkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0lBRU1BLFE7OztBQUNGLHdCQUE4QjtBQUFBLFlBQWxCQyxJQUFrQix1RUFBWEMsU0FBVzs7QUFBQTs7QUFBQSxtSEFDcEJELElBRG9CO0FBRTdCOzs7OzZCQUVJRSxJLEVBQU07QUFBQTs7QUFDUCxtQkFBTyx5R0FBV0EsSUFBWCxFQUFpQkMsSUFBakIsQ0FBc0IsZ0JBQVE7QUFDakMsdUJBQUtILElBQUwsR0FBWUksS0FBS0MsS0FBTCxDQUFXTCxJQUFYLENBQVo7QUFDQSx1QkFBTyxPQUFLQSxJQUFaO0FBQ0gsYUFITSxDQUFQO0FBSUg7Ozs4QkFFS0UsSSxFQUF3QjtBQUFBLGdCQUFsQkYsSUFBa0IsdUVBQVhDLFNBQVc7O0FBQzFCLDZIQUFtQkMsSUFBbkIsRUFBeUJFLEtBQUtFLFNBQUwsQ0FBZU4sUUFBUSxLQUFLQSxJQUE1QixDQUF6QjtBQUNIOzs7Ozs7a0JBR1VELFEiLCJmaWxlIjoiaW8vZmlsZS9KU09ORmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRmlsZSBmcm9tICcuL0Jhc2VGaWxlJztcblxuY2xhc3MgSlNPTkZpbGUgZXh0ZW5kcyBCYXNlRmlsZSB7XG4gICAgY29uc3RydWN0b3IoZGF0YSA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihkYXRhKTtcbiAgICB9XG5cbiAgICByZWFkKGZpbGUpIHtcbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlYWQoZmlsZSkudGhlbihkYXRhID0+IHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB3cml0ZShmaWxlLCBkYXRhID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBzdXBlci53cml0ZShmaWxlLCBKU09OLnN0cmluZ2lmeShkYXRhIHx8IHRoaXMuZGF0YSkpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSlNPTkZpbGU7Il19
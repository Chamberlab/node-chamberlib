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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _Scale = require('../../harmonics/Scale');

var _Scale2 = _interopRequireDefault(_Scale);

var _BaseLUT2 = require('./BaseLUT');

var _BaseLUT3 = _interopRequireDefault(_BaseLUT2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChordLUT = function (_BaseLUT) {
    (0, _inherits3.default)(ChordLUT, _BaseLUT);

    function ChordLUT(scale) {
        (0, _classCallCheck3.default)(this, ChordLUT);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ChordLUT.__proto__ || (0, _getPrototypeOf2.default)(ChordLUT)).call(this));

        if (typeof scale === 'string') {
            scale = new _Scale2.default(scale);
        }

        (0, _assert2.default)(scale instanceof _Scale2.default);
        _this._scale = scale;
        return _this;
    }

    (0, _createClass3.default)(ChordLUT, [{
        key: 'generate',
        value: function generate() {
            (0, _get3.default)(ChordLUT.prototype.__proto__ || (0, _getPrototypeOf2.default)(ChordLUT.prototype), 'generate', this).call(this);
        }
    }]);
    return ChordLUT;
}(_BaseLUT3.default);

exports.default = ChordLUT;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbHV0L0Nob3JkTFVULmpzIl0sIm5hbWVzIjpbIkNob3JkTFVUIiwic2NhbGUiLCJfc2NhbGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0lBRU1BLFE7OztBQUNGLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBR2YsWUFBSSxPQUFPQSxLQUFQLEtBQWlCLFFBQXJCLEVBQStCO0FBQzNCQSxvQkFBUSxvQkFBVUEsS0FBVixDQUFSO0FBQ0g7O0FBRUQsOEJBQU9BLGdDQUFQO0FBQ0EsY0FBS0MsTUFBTCxHQUFjRCxLQUFkO0FBUmU7QUFTbEI7Ozs7bUNBRVU7QUFDUDtBQUVIOzs7OztrQkFHVUQsUSIsImZpbGUiOiJkYXRhL2x1dC9DaG9yZExVVC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcbmltcG9ydCBTY2FsZSBmcm9tICcuLi8uLi9oYXJtb25pY3MvU2NhbGUnO1xuaW1wb3J0IEJhc2VMVVQgZnJvbSAnLi9CYXNlTFVUJztcblxuY2xhc3MgQ2hvcmRMVVQgZXh0ZW5kcyBCYXNlTFVUIHtcbiAgICBjb25zdHJ1Y3RvcihzY2FsZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygc2NhbGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBzY2FsZSA9IG5ldyBTY2FsZShzY2FsZSk7XG4gICAgICAgIH1cblxuICAgICAgICBhc3NlcnQoc2NhbGUgaW5zdGFuY2VvZiBTY2FsZSk7XG4gICAgICAgIHRoaXMuX3NjYWxlID0gc2NhbGU7XG4gICAgfVxuXG4gICAgZ2VuZXJhdGUoKSB7XG4gICAgICAgIHN1cGVyLmdlbmVyYXRlKCk7XG5cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENob3JkTFVUOyJdfQ==
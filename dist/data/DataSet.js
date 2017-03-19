'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _DataChannel = require('./DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _JSONFile = require('../io/file/JSONFile');

var _JSONFile2 = _interopRequireDefault(_JSONFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DataSet = function (_BaseCollection) {
    _inherits(DataSet, _BaseCollection);

    function DataSet(channels) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, DataSet);

        var _this = _possibleConstructorReturn(this, (DataSet.__proto__ || Object.getPrototypeOf(DataSet)).call(this, channels, _DataChannel2.default, uuid));

        _this.title = title;
        return _this;
    }

    // TODO: move this or make it more general


    _createClass(DataSet, [{
        key: 'loadJson',
        value: function loadJson(filepath) {
            var importerClass = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
            var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

            var _self = this;
            _self.title = title || _path2.default.basename(filepath, '.json');

            if (importerClass) {
                return new importerClass().read(filepath).map(function (channel) {
                    _self.push(channel);
                });
            }

            return new _JSONFile2.default().read(filepath).then(function (data) {
                return data;
            });
        }
    }]);

    return DataSet;
}(_BaseCollection3.default);

exports.default = DataSet;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvRGF0YVNldC5qcyJdLCJuYW1lcyI6WyJEYXRhU2V0IiwiY2hhbm5lbHMiLCJ0aXRsZSIsInVuZGVmaW5lZCIsInV1aWQiLCJmaWxlcGF0aCIsImltcG9ydGVyQ2xhc3MiLCJfc2VsZiIsImJhc2VuYW1lIiwicmVhZCIsIm1hcCIsImNoYW5uZWwiLCJwdXNoIiwidGhlbiIsImRhdGEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVNQSxPOzs7QUFDRixxQkFBWUMsUUFBWixFQUEyRDtBQUFBLFlBQXJDQyxLQUFxQyx1RUFBN0JDLFNBQTZCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYRCxTQUFXOztBQUFBOztBQUFBLHNIQUNqREYsUUFEaUQseUJBQzFCRyxJQUQwQjs7QUFFdkQsY0FBS0YsS0FBTCxHQUFhQSxLQUFiO0FBRnVEO0FBRzFEOztBQUVEOzs7OztpQ0FDU0csUSxFQUF3RDtBQUFBLGdCQUE5Q0MsYUFBOEMsdUVBQTlCSCxTQUE4QjtBQUFBLGdCQUFuQkQsS0FBbUIsdUVBQVhDLFNBQVc7O0FBQzdELGdCQUFJSSxRQUFRLElBQVo7QUFDQUEsa0JBQU1MLEtBQU4sR0FBY0EsU0FBUyxlQUFLTSxRQUFMLENBQWNILFFBQWQsRUFBd0IsT0FBeEIsQ0FBdkI7O0FBRUEsZ0JBQUlDLGFBQUosRUFBbUI7QUFDZix1QkFBTyxJQUFJQSxhQUFKLEdBQW9CRyxJQUFwQixDQUF5QkosUUFBekIsRUFDRkssR0FERSxDQUNFLFVBQVVDLE9BQVYsRUFBbUI7QUFDcEJKLDBCQUFNSyxJQUFOLENBQVdELE9BQVg7QUFDSCxpQkFIRSxDQUFQO0FBSUg7O0FBRUQsbUJBQU8seUJBQWVGLElBQWYsQ0FBb0JKLFFBQXBCLEVBQ0ZRLElBREUsQ0FDRyxVQUFVQyxJQUFWLEVBQWdCO0FBQ2xCLHVCQUFPQSxJQUFQO0FBQ0gsYUFIRSxDQUFQO0FBSUg7Ozs7OztrQkFHVWQsTyIsImZpbGUiOiJkYXRhL0RhdGFTZXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IERhdGFDaGFubmVsIGZyb20gJy4vRGF0YUNoYW5uZWwnO1xuaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gJy4vQmFzZUNvbGxlY3Rpb24nO1xuaW1wb3J0IEpTT05GaWxlIGZyb20gJy4uL2lvL2ZpbGUvSlNPTkZpbGUnO1xuXG5jbGFzcyBEYXRhU2V0IGV4dGVuZHMgQmFzZUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGNoYW5uZWxzLCB0aXRsZSA9IHVuZGVmaW5lZCwgdXVpZCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihjaGFubmVscywgRGF0YUNoYW5uZWwsIHV1aWQpO1xuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogbW92ZSB0aGlzIG9yIG1ha2UgaXQgbW9yZSBnZW5lcmFsXG4gICAgbG9hZEpzb24oZmlsZXBhdGgsIGltcG9ydGVyQ2xhc3MgPSB1bmRlZmluZWQsIHRpdGxlID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgIF9zZWxmLnRpdGxlID0gdGl0bGUgfHwgcGF0aC5iYXNlbmFtZShmaWxlcGF0aCwgJy5qc29uJyk7XG5cbiAgICAgICAgaWYgKGltcG9ydGVyQ2xhc3MpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgaW1wb3J0ZXJDbGFzcygpLnJlYWQoZmlsZXBhdGgpXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoY2hhbm5lbCkge1xuICAgICAgICAgICAgICAgICAgICBfc2VsZi5wdXNoKGNoYW5uZWwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBKU09ORmlsZSgpLnJlYWQoZmlsZXBhdGgpXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBEYXRhU2V0OyJdfQ==
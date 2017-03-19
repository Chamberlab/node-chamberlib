'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseTransformNode = function (_BaseNode) {
    _inherits(BaseTransformNode, _BaseNode);

    function BaseTransformNode() {
        var transformFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

        _classCallCheck(this, BaseTransformNode);

        var _this = _possibleConstructorReturn(this, (BaseTransformNode.__proto__ || Object.getPrototypeOf(BaseTransformNode)).call(this));

        _this._stream = new _through2.default(transformFunction);
        return _this;
    }

    _createClass(BaseTransformNode, [{
        key: 'initStream',
        value: function initStream(transformFunction) {
            var _self = this;
            this._stream = new _through2.default(transformFunction, function () {
                _self.addStats('out', 'null', 0);
                _self.stream.queue(null);
            });
        }
    }, {
        key: 'stream',
        get: function get() {
            return this._stream;
        }
    }]);

    return BaseTransformNode;
}(_BaseNode3.default);

exports.default = BaseTransformNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL3RyYW5zZm9ybS9CYXNlVHJhbnNmb3JtTm9kZS5qcyJdLCJuYW1lcyI6WyJCYXNlVHJhbnNmb3JtTm9kZSIsInRyYW5zZm9ybUZ1bmN0aW9uIiwidW5kZWZpbmVkIiwiX3N0cmVhbSIsIl9zZWxmIiwiYWRkU3RhdHMiLCJzdHJlYW0iLCJxdWV1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsaUI7OztBQUNGLGlDQUEyQztBQUFBLFlBQS9CQyxpQkFBK0IsdUVBQVhDLFNBQVc7O0FBQUE7O0FBQUE7O0FBR3ZDLGNBQUtDLE9BQUwsR0FBZSxzQkFBWUYsaUJBQVosQ0FBZjtBQUh1QztBQUkxQzs7OzttQ0FFVUEsaUIsRUFBbUI7QUFDMUIsZ0JBQU1HLFFBQVEsSUFBZDtBQUNBLGlCQUFLRCxPQUFMLEdBQWUsc0JBQVlGLGlCQUFaLEVBQStCLFlBQU07QUFDaERHLHNCQUFNQyxRQUFOLENBQWUsS0FBZixFQUFzQixNQUF0QixFQUE4QixDQUE5QjtBQUNBRCxzQkFBTUUsTUFBTixDQUFhQyxLQUFiLENBQW1CLElBQW5CO0FBQ0gsYUFIYyxDQUFmO0FBSUg7Ozs0QkFFWTtBQUNULG1CQUFPLEtBQUtKLE9BQVo7QUFDSDs7Ozs7O2tCQUdVSCxpQiIsImZpbGUiOiJub2Rlcy90cmFuc2Zvcm0vQmFzZVRyYW5zZm9ybU5vZGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhyb3VnaCBmcm9tICd0aHJvdWdoJztcbmltcG9ydCBCYXNlTm9kZSBmcm9tICcuLi9CYXNlTm9kZSc7XG5cbmNsYXNzIEJhc2VUcmFuc2Zvcm1Ob2RlIGV4dGVuZHMgQmFzZU5vZGUge1xuICAgIGNvbnN0cnVjdG9yKHRyYW5zZm9ybUZ1bmN0aW9uID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc3RyZWFtID0gbmV3IHRocm91Z2godHJhbnNmb3JtRnVuY3Rpb24pO1xuICAgIH1cblxuICAgIGluaXRTdHJlYW0odHJhbnNmb3JtRnVuY3Rpb24pIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9zdHJlYW0gPSBuZXcgdGhyb3VnaCh0cmFuc2Zvcm1GdW5jdGlvbiwgKCkgPT4ge1xuICAgICAgICAgICAgX3NlbGYuYWRkU3RhdHMoJ291dCcsICdudWxsJywgMCk7XG4gICAgICAgICAgICBfc2VsZi5zdHJlYW0ucXVldWUobnVsbCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldCBzdHJlYW0oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHJlYW07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYXNlVHJhbnNmb3JtTm9kZTsiXX0=
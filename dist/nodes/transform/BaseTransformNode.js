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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _BaseNode2 = require('../BaseNode');

var _BaseNode3 = _interopRequireDefault(_BaseNode2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseTransformNode = function (_BaseNode) {
    (0, _inherits3.default)(BaseTransformNode, _BaseNode);

    function BaseTransformNode() {
        var transformFunction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
        (0, _classCallCheck3.default)(this, BaseTransformNode);

        var _this = (0, _possibleConstructorReturn3.default)(this, (BaseTransformNode.__proto__ || (0, _getPrototypeOf2.default)(BaseTransformNode)).call(this));

        _this._stream = new _through2.default(transformFunction);
        return _this;
    }

    (0, _createClass3.default)(BaseTransformNode, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVzL3RyYW5zZm9ybS9CYXNlVHJhbnNmb3JtTm9kZS5qcyJdLCJuYW1lcyI6WyJCYXNlVHJhbnNmb3JtTm9kZSIsInRyYW5zZm9ybUZ1bmN0aW9uIiwidW5kZWZpbmVkIiwiX3N0cmVhbSIsIl9zZWxmIiwiYWRkU3RhdHMiLCJzdHJlYW0iLCJxdWV1ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsaUI7OztBQUNGLGlDQUEyQztBQUFBLFlBQS9CQyxpQkFBK0IsdUVBQVhDLFNBQVc7QUFBQTs7QUFBQTs7QUFHdkMsY0FBS0MsT0FBTCxHQUFlLHNCQUFZRixpQkFBWixDQUFmO0FBSHVDO0FBSTFDOzs7O21DQUVVQSxpQixFQUFtQjtBQUMxQixnQkFBTUcsUUFBUSxJQUFkO0FBQ0EsaUJBQUtELE9BQUwsR0FBZSxzQkFBWUYsaUJBQVosRUFBK0IsWUFBTTtBQUNoREcsc0JBQU1DLFFBQU4sQ0FBZSxLQUFmLEVBQXNCLE1BQXRCLEVBQThCLENBQTlCO0FBQ0FELHNCQUFNRSxNQUFOLENBQWFDLEtBQWIsQ0FBbUIsSUFBbkI7QUFDSCxhQUhjLENBQWY7QUFJSDs7OzRCQUVZO0FBQ1QsbUJBQU8sS0FBS0osT0FBWjtBQUNIOzs7OztrQkFHVUgsaUIiLCJmaWxlIjoibm9kZXMvdHJhbnNmb3JtL0Jhc2VUcmFuc2Zvcm1Ob2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRocm91Z2ggZnJvbSAndGhyb3VnaCc7XG5pbXBvcnQgQmFzZU5vZGUgZnJvbSAnLi4vQmFzZU5vZGUnO1xuXG5jbGFzcyBCYXNlVHJhbnNmb3JtTm9kZSBleHRlbmRzIEJhc2VOb2RlIHtcbiAgICBjb25zdHJ1Y3Rvcih0cmFuc2Zvcm1GdW5jdGlvbiA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3N0cmVhbSA9IG5ldyB0aHJvdWdoKHRyYW5zZm9ybUZ1bmN0aW9uKTtcbiAgICB9XG5cbiAgICBpbml0U3RyZWFtKHRyYW5zZm9ybUZ1bmN0aW9uKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fc3RyZWFtID0gbmV3IHRocm91Z2godHJhbnNmb3JtRnVuY3Rpb24sICgpID0+IHtcbiAgICAgICAgICAgIF9zZWxmLmFkZFN0YXRzKCdvdXQnLCAnbnVsbCcsIDApO1xuICAgICAgICAgICAgX3NlbGYuc3RyZWFtLnF1ZXVlKG51bGwpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXQgc3RyZWFtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RyZWFtO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZVRyYW5zZm9ybU5vZGU7Il19
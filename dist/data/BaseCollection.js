'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseCollection = function () {
    function BaseCollection(items, childClass, uuid) {
        (0, _classCallCheck3.default)(this, BaseCollection);

        (0, _assert2.default)(typeof childClass !== 'undefined');

        this._uuid = uuid || (0, _uuid2.default)();
        this._items = [];
        this._childClass = childClass;

        if (Array.isArray(items)) {
            // TODO: this needs a type check
            this._items = this._items.concat(items);
        }

        if (typeof items === 'number') {
            for (var i = 0; i < items; i++) {
                // TODO: validate this
                var item = new this._childClass();
                this._items.push(item);
            }
        }
    }

    (0, _createClass3.default)(BaseCollection, [{
        key: 'at',
        value: function at() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            if (args.length === 1) {
                (0, _assert2.default)(typeof args[0] === 'number');
                return this._items[args[0]];
            }

            if (args.length === 2) {
                (0, _assert2.default)(typeof args[0] === 'number');
                (0, _assert2.default)((0, _typeof3.default)(args[0]) < this._items.length);
                (0, _assert2.default)(args[1] instanceof this._childClass);
                this._items[args[0]] = args[1];
                this._items[args[0]].parentUUID = this.uuid;
            }
        }
    }, {
        key: 'push',
        value: function push(item) {
            var _this = this;

            var _self = this;
            if (item instanceof this._childClass) {
                item.parentUUID = this.uuid;
                this._items.push(item);
                return;
            }
            if (item instanceof BaseCollection) {
                item = item.all.map(function (it) {
                    it.parentUUID = _self.uuid;
                    return it;
                });
            }
            if (Array.isArray(item)) {
                (function () {
                    var _self = _this;
                    item = item.map(function (it) {
                        (0, _assert2.default)(it instanceof _self._childClass);
                        it.parentUUID = _self.uuid;
                    });
                    _this._items = _this._items.concat(item);
                })();
            }
        }

        //
        //
        // Getters and Setters

    }, {
        key: 'uuid',
        get: function get() {
            return this._uuid;
        },
        set: function set(val) {
            this._uuid = val;
        }
    }, {
        key: 'all',
        get: function get() {
            return this._items;
        }
    }, {
        key: 'size',
        get: function get() {
            return this._items.length;
        }
    }]);
    return BaseCollection;
}();

exports.default = BaseCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvQmFzZUNvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiQmFzZUNvbGxlY3Rpb24iLCJpdGVtcyIsImNoaWxkQ2xhc3MiLCJ1dWlkIiwiX3V1aWQiLCJfaXRlbXMiLCJfY2hpbGRDbGFzcyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsImkiLCJpdGVtIiwicHVzaCIsImFyZ3MiLCJsZW5ndGgiLCJwYXJlbnRVVUlEIiwiX3NlbGYiLCJhbGwiLCJtYXAiLCJpdCIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7O0lBRU1BLGM7QUFDRiw0QkFBWUMsS0FBWixFQUFtQkMsVUFBbkIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQUE7O0FBQ2pDLDhCQUFPLE9BQU9ELFVBQVAsS0FBc0IsV0FBN0I7O0FBRUEsYUFBS0UsS0FBTCxHQUFhRCxRQUFRLHFCQUFyQjtBQUNBLGFBQUtFLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQkosVUFBbkI7O0FBRUEsWUFBSUssTUFBTUMsT0FBTixDQUFjUCxLQUFkLENBQUosRUFBMEI7QUFDdEI7QUFDQSxpQkFBS0ksTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWUksTUFBWixDQUFtQlIsS0FBbkIsQ0FBZDtBQUNIOztBQUVELFlBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQixpQkFBSyxJQUFJUyxJQUFJLENBQWIsRUFBZ0JBLElBQUlULEtBQXBCLEVBQTJCUyxHQUEzQixFQUFnQztBQUM1QjtBQUNBLG9CQUFJQyxPQUFPLElBQUksS0FBS0wsV0FBVCxFQUFYO0FBQ0EscUJBQUtELE1BQUwsQ0FBWU8sSUFBWixDQUFpQkQsSUFBakI7QUFDSDtBQUNKO0FBQ0o7Ozs7NkJBRVc7QUFBQSw4Q0FBTkUsSUFBTTtBQUFOQSxvQkFBTTtBQUFBOztBQUNSLGdCQUFJQSxLQUFLQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLHNDQUFPLE9BQU9ELEtBQUssQ0FBTCxDQUFQLEtBQW1CLFFBQTFCO0FBQ0EsdUJBQU8sS0FBS1IsTUFBTCxDQUFZUSxLQUFLLENBQUwsQ0FBWixDQUFQO0FBQ0g7O0FBRUQsZ0JBQUlBLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsc0NBQU8sT0FBT0QsS0FBSyxDQUFMLENBQVAsS0FBbUIsUUFBMUI7QUFDQSxzQ0FBTyxzQkFBT0EsS0FBSyxDQUFMLENBQVAsSUFBaUIsS0FBS1IsTUFBTCxDQUFZUyxNQUFwQztBQUNBLHNDQUFPRCxLQUFLLENBQUwsYUFBbUIsS0FBS1AsV0FBL0I7QUFDQSxxQkFBS0QsTUFBTCxDQUFZUSxLQUFLLENBQUwsQ0FBWixJQUF1QkEsS0FBSyxDQUFMLENBQXZCO0FBQ0EscUJBQUtSLE1BQUwsQ0FBWVEsS0FBSyxDQUFMLENBQVosRUFBcUJFLFVBQXJCLEdBQWtDLEtBQUtaLElBQXZDO0FBQ0g7QUFDSjs7OzZCQUVJUSxJLEVBQU07QUFBQTs7QUFDUCxnQkFBTUssUUFBUSxJQUFkO0FBQ0EsZ0JBQUlMLGdCQUFnQixLQUFLTCxXQUF6QixFQUFzQztBQUNsQ0sscUJBQUtJLFVBQUwsR0FBa0IsS0FBS1osSUFBdkI7QUFDQSxxQkFBS0UsTUFBTCxDQUFZTyxJQUFaLENBQWlCRCxJQUFqQjtBQUNBO0FBQ0g7QUFDRCxnQkFBSUEsZ0JBQWdCWCxjQUFwQixFQUFvQztBQUNoQ1csdUJBQU9BLEtBQUtNLEdBQUwsQ0FBU0MsR0FBVCxDQUFhLFVBQUNDLEVBQUQsRUFBUTtBQUN4QkEsdUJBQUdKLFVBQUgsR0FBZ0JDLE1BQU1iLElBQXRCO0FBQ0EsMkJBQU9nQixFQUFQO0FBQ0gsaUJBSE0sQ0FBUDtBQUlIO0FBQ0QsZ0JBQUlaLE1BQU1DLE9BQU4sQ0FBY0csSUFBZCxDQUFKLEVBQXlCO0FBQUE7QUFDckIsd0JBQUlLLGFBQUo7QUFDQUwsMkJBQU9BLEtBQUtPLEdBQUwsQ0FBUyxVQUFVQyxFQUFWLEVBQWM7QUFDMUIsOENBQU9BLGNBQWNILE1BQU1WLFdBQTNCO0FBQ0FhLDJCQUFHSixVQUFILEdBQWdCQyxNQUFNYixJQUF0QjtBQUNILHFCQUhNLENBQVA7QUFJQSwwQkFBS0UsTUFBTCxHQUFjLE1BQUtBLE1BQUwsQ0FBWUksTUFBWixDQUFtQkUsSUFBbkIsQ0FBZDtBQU5xQjtBQU94QjtBQUVKOztBQUdEO0FBQ0E7QUFDQTs7Ozs0QkFFVztBQUNQLG1CQUFPLEtBQUtQLEtBQVo7QUFDSCxTOzBCQUVRZ0IsRyxFQUFLO0FBQ1YsaUJBQUtoQixLQUFMLEdBQWFnQixHQUFiO0FBQ0g7Ozs0QkFFUztBQUNOLG1CQUFPLEtBQUtmLE1BQVo7QUFDSDs7OzRCQUVVO0FBQ1AsbUJBQU8sS0FBS0EsTUFBTCxDQUFZUyxNQUFuQjtBQUNIOzs7OztrQkFHVWQsYyIsImZpbGUiOiJkYXRhL0Jhc2VDb2xsZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0IHV1aWQ0IGZyb20gJ3V1aWQ0JztcblxuY2xhc3MgQmFzZUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGl0ZW1zLCBjaGlsZENsYXNzLCB1dWlkKSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgY2hpbGRDbGFzcyAhPT0gJ3VuZGVmaW5lZCcpO1xuXG4gICAgICAgIHRoaXMuX3V1aWQgPSB1dWlkIHx8IHV1aWQ0KCk7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX2NoaWxkQ2xhc3MgPSBjaGlsZENsYXNzO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW1zKSkge1xuICAgICAgICAgICAgLy8gVE9ETzogdGhpcyBuZWVkcyBhIHR5cGUgY2hlY2tcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gdGhpcy5faXRlbXMuY29uY2F0KGl0ZW1zKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgaXRlbXMgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiB2YWxpZGF0ZSB0aGlzXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBuZXcgdGhpcy5fY2hpbGRDbGFzcygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdCguLi5hcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgYXNzZXJ0KHR5cGVvZiBhcmdzWzBdID09PSAnbnVtYmVyJyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbYXJnc1swXV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYXJncy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgIGFzc2VydCh0eXBlb2YgYXJnc1swXSA9PT0gJ251bWJlcicpO1xuICAgICAgICAgICAgYXNzZXJ0KHR5cGVvZiBhcmdzWzBdIDwgdGhpcy5faXRlbXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGFzc2VydChhcmdzWzFdIGluc3RhbmNlb2YgdGhpcy5fY2hpbGRDbGFzcyk7XG4gICAgICAgICAgICB0aGlzLl9pdGVtc1thcmdzWzBdXSA9IGFyZ3NbMV07XG4gICAgICAgICAgICB0aGlzLl9pdGVtc1thcmdzWzBdXS5wYXJlbnRVVUlEID0gdGhpcy51dWlkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVzaChpdGVtKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcztcbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiB0aGlzLl9jaGlsZENsYXNzKSB7XG4gICAgICAgICAgICBpdGVtLnBhcmVudFVVSUQgPSB0aGlzLnV1aWQ7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtIGluc3RhbmNlb2YgQmFzZUNvbGxlY3Rpb24pIHtcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLmFsbC5tYXAoKGl0KSA9PiB7XG4gICAgICAgICAgICAgICAgaXQucGFyZW50VVVJRCA9IF9zZWxmLnV1aWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgICAgICAgIGxldCBfc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBpdGVtID0gaXRlbS5tYXAoZnVuY3Rpb24gKGl0KSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0KGl0IGluc3RhbmNlb2YgX3NlbGYuX2NoaWxkQ2xhc3MpO1xuICAgICAgICAgICAgICAgIGl0LnBhcmVudFVVSUQgPSBfc2VsZi51dWlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9pdGVtcyA9IHRoaXMuX2l0ZW1zLmNvbmNhdChpdGVtKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG5cbiAgICAvL1xuICAgIC8vXG4gICAgLy8gR2V0dGVycyBhbmQgU2V0dGVyc1xuXG4gICAgZ2V0IHV1aWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl91dWlkO1xuICAgIH1cblxuICAgIHNldCB1dWlkKHZhbCkge1xuICAgICAgICB0aGlzLl91dWlkID0gdmFsO1xuICAgIH1cblxuICAgIGdldCBhbGwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtcztcbiAgICB9XG5cbiAgICBnZXQgc2l6ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zLmxlbmd0aDtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VDb2xsZWN0aW9uOyJdfQ==
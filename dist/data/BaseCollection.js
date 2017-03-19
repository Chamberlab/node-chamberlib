'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseCollection = function () {
    function BaseCollection(items, childClass, uuid) {
        _classCallCheck(this, BaseCollection);

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

    _createClass(BaseCollection, [{
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
                (0, _assert2.default)(_typeof(args[0]) < this._items.length);
                (0, _assert2.default)(args[1] instanceof this._childClass);
                this._items[args[0]] = args[1];
                this._items[args[0]].parentUUID = this.uuid;
            }
        }
    }, {
        key: 'push',
        value: function push(item) {
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
                var _self2 = this;
                item = item.map(function (it) {
                    (0, _assert2.default)(it instanceof _self2._childClass);
                    it.parentUUID = _self2.uuid;
                });
                this._items = this._items.concat(item);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvQmFzZUNvbGxlY3Rpb24uanMiXSwibmFtZXMiOlsiQmFzZUNvbGxlY3Rpb24iLCJpdGVtcyIsImNoaWxkQ2xhc3MiLCJ1dWlkIiwiX3V1aWQiLCJfaXRlbXMiLCJfY2hpbGRDbGFzcyIsIkFycmF5IiwiaXNBcnJheSIsImNvbmNhdCIsImkiLCJpdGVtIiwicHVzaCIsImFyZ3MiLCJsZW5ndGgiLCJwYXJlbnRVVUlEIiwiX3NlbGYiLCJhbGwiLCJtYXAiLCJpdCIsInZhbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRU1BLGM7QUFDRiw0QkFBWUMsS0FBWixFQUFtQkMsVUFBbkIsRUFBK0JDLElBQS9CLEVBQXFDO0FBQUE7O0FBQ2pDLDhCQUFPLE9BQU9ELFVBQVAsS0FBc0IsV0FBN0I7O0FBRUEsYUFBS0UsS0FBTCxHQUFhRCxRQUFRLHFCQUFyQjtBQUNBLGFBQUtFLE1BQUwsR0FBYyxFQUFkO0FBQ0EsYUFBS0MsV0FBTCxHQUFtQkosVUFBbkI7O0FBRUEsWUFBSUssTUFBTUMsT0FBTixDQUFjUCxLQUFkLENBQUosRUFBMEI7QUFDdEI7QUFDQSxpQkFBS0ksTUFBTCxHQUFjLEtBQUtBLE1BQUwsQ0FBWUksTUFBWixDQUFtQlIsS0FBbkIsQ0FBZDtBQUNIOztBQUVELFlBQUksT0FBT0EsS0FBUCxLQUFpQixRQUFyQixFQUErQjtBQUMzQixpQkFBSyxJQUFJUyxJQUFJLENBQWIsRUFBZ0JBLElBQUlULEtBQXBCLEVBQTJCUyxHQUEzQixFQUFnQztBQUM1QjtBQUNBLG9CQUFJQyxPQUFPLElBQUksS0FBS0wsV0FBVCxFQUFYO0FBQ0EscUJBQUtELE1BQUwsQ0FBWU8sSUFBWixDQUFpQkQsSUFBakI7QUFDSDtBQUNKO0FBQ0o7Ozs7NkJBRVc7QUFBQSw4Q0FBTkUsSUFBTTtBQUFOQSxvQkFBTTtBQUFBOztBQUNSLGdCQUFJQSxLQUFLQyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ25CLHNDQUFPLE9BQU9ELEtBQUssQ0FBTCxDQUFQLEtBQW1CLFFBQTFCO0FBQ0EsdUJBQU8sS0FBS1IsTUFBTCxDQUFZUSxLQUFLLENBQUwsQ0FBWixDQUFQO0FBQ0g7O0FBRUQsZ0JBQUlBLEtBQUtDLE1BQUwsS0FBZ0IsQ0FBcEIsRUFBdUI7QUFDbkIsc0NBQU8sT0FBT0QsS0FBSyxDQUFMLENBQVAsS0FBbUIsUUFBMUI7QUFDQSxzQ0FBTyxRQUFPQSxLQUFLLENBQUwsQ0FBUCxJQUFpQixLQUFLUixNQUFMLENBQVlTLE1BQXBDO0FBQ0Esc0NBQU9ELEtBQUssQ0FBTCxhQUFtQixLQUFLUCxXQUEvQjtBQUNBLHFCQUFLRCxNQUFMLENBQVlRLEtBQUssQ0FBTCxDQUFaLElBQXVCQSxLQUFLLENBQUwsQ0FBdkI7QUFDQSxxQkFBS1IsTUFBTCxDQUFZUSxLQUFLLENBQUwsQ0FBWixFQUFxQkUsVUFBckIsR0FBa0MsS0FBS1osSUFBdkM7QUFDSDtBQUNKOzs7NkJBRUlRLEksRUFBTTtBQUNQLGdCQUFNSyxRQUFRLElBQWQ7QUFDQSxnQkFBSUwsZ0JBQWdCLEtBQUtMLFdBQXpCLEVBQXNDO0FBQ2xDSyxxQkFBS0ksVUFBTCxHQUFrQixLQUFLWixJQUF2QjtBQUNBLHFCQUFLRSxNQUFMLENBQVlPLElBQVosQ0FBaUJELElBQWpCO0FBQ0E7QUFDSDtBQUNELGdCQUFJQSxnQkFBZ0JYLGNBQXBCLEVBQW9DO0FBQ2hDVyx1QkFBT0EsS0FBS00sR0FBTCxDQUFTQyxHQUFULENBQWEsVUFBQ0MsRUFBRCxFQUFRO0FBQ3hCQSx1QkFBR0osVUFBSCxHQUFnQkMsTUFBTWIsSUFBdEI7QUFDQSwyQkFBT2dCLEVBQVA7QUFDSCxpQkFITSxDQUFQO0FBSUg7QUFDRCxnQkFBSVosTUFBTUMsT0FBTixDQUFjRyxJQUFkLENBQUosRUFBeUI7QUFDckIsb0JBQUlLLFNBQVEsSUFBWjtBQUNBTCx1QkFBT0EsS0FBS08sR0FBTCxDQUFTLFVBQVVDLEVBQVYsRUFBYztBQUMxQiwwQ0FBT0EsY0FBY0gsT0FBTVYsV0FBM0I7QUFDQWEsdUJBQUdKLFVBQUgsR0FBZ0JDLE9BQU1iLElBQXRCO0FBQ0gsaUJBSE0sQ0FBUDtBQUlBLHFCQUFLRSxNQUFMLEdBQWMsS0FBS0EsTUFBTCxDQUFZSSxNQUFaLENBQW1CRSxJQUFuQixDQUFkO0FBQ0g7QUFFSjs7QUFHRDtBQUNBO0FBQ0E7Ozs7NEJBRVc7QUFDUCxtQkFBTyxLQUFLUCxLQUFaO0FBQ0gsUzswQkFFUWdCLEcsRUFBSztBQUNWLGlCQUFLaEIsS0FBTCxHQUFhZ0IsR0FBYjtBQUNIOzs7NEJBRVM7QUFDTixtQkFBTyxLQUFLZixNQUFaO0FBQ0g7Ozs0QkFFVTtBQUNQLG1CQUFPLEtBQUtBLE1BQUwsQ0FBWVMsTUFBbkI7QUFDSDs7Ozs7O2tCQUdVZCxjIiwiZmlsZSI6ImRhdGEvQmFzZUNvbGxlY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgdXVpZDQgZnJvbSAndXVpZDQnO1xuXG5jbGFzcyBCYXNlQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoaXRlbXMsIGNoaWxkQ2xhc3MsIHV1aWQpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBjaGlsZENsYXNzICE9PSAndW5kZWZpbmVkJyk7XG5cbiAgICAgICAgdGhpcy5fdXVpZCA9IHV1aWQgfHwgdXVpZDQoKTtcbiAgICAgICAgdGhpcy5faXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fY2hpbGRDbGFzcyA9IGNoaWxkQ2xhc3M7XG5cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbXMpKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiB0aGlzIG5lZWRzIGEgdHlwZSBjaGVja1xuICAgICAgICAgICAgdGhpcy5faXRlbXMgPSB0aGlzLl9pdGVtcy5jb25jYXQoaXRlbXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtcyA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaXRlbXM7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IHZhbGlkYXRlIHRoaXNcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IG5ldyB0aGlzLl9jaGlsZENsYXNzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF0KC4uLmFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBhc3NlcnQodHlwZW9mIGFyZ3NbMF0gPT09ICdudW1iZXInKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1thcmdzWzBdXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgYXNzZXJ0KHR5cGVvZiBhcmdzWzBdID09PSAnbnVtYmVyJyk7XG4gICAgICAgICAgICBhc3NlcnQodHlwZW9mIGFyZ3NbMF0gPCB0aGlzLl9pdGVtcy5sZW5ndGgpO1xuICAgICAgICAgICAgYXNzZXJ0KGFyZ3NbMV0gaW5zdGFuY2VvZiB0aGlzLl9jaGlsZENsYXNzKTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zW2FyZ3NbMF1dID0gYXJnc1sxXTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zW2FyZ3NbMF1dLnBhcmVudFVVSUQgPSB0aGlzLnV1aWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwdXNoKGl0ZW0pIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoaXRlbSBpbnN0YW5jZW9mIHRoaXMuX2NoaWxkQ2xhc3MpIHtcbiAgICAgICAgICAgIGl0ZW0ucGFyZW50VVVJRCA9IHRoaXMudXVpZDtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0gaW5zdGFuY2VvZiBCYXNlQ29sbGVjdGlvbikge1xuICAgICAgICAgICAgaXRlbSA9IGl0ZW0uYWxsLm1hcCgoaXQpID0+IHtcbiAgICAgICAgICAgICAgICBpdC5wYXJlbnRVVUlEID0gX3NlbGYudXVpZDtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgICAgICAgbGV0IF9zZWxmID0gdGhpcztcbiAgICAgICAgICAgIGl0ZW0gPSBpdGVtLm1hcChmdW5jdGlvbiAoaXQpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQoaXQgaW5zdGFuY2VvZiBfc2VsZi5fY2hpbGRDbGFzcyk7XG4gICAgICAgICAgICAgICAgaXQucGFyZW50VVVJRCA9IF9zZWxmLnV1aWQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gdGhpcy5faXRlbXMuY29uY2F0KGl0ZW0pO1xuICAgICAgICB9XG5cbiAgICB9XG5cblxuICAgIC8vXG4gICAgLy9cbiAgICAvLyBHZXR0ZXJzIGFuZCBTZXR0ZXJzXG5cbiAgICBnZXQgdXVpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3V1aWQ7XG4gICAgfVxuXG4gICAgc2V0IHV1aWQodmFsKSB7XG4gICAgICAgIHRoaXMuX3V1aWQgPSB2YWw7XG4gICAgfVxuXG4gICAgZ2V0IGFsbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zO1xuICAgIH1cblxuICAgIGdldCBzaXplKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXMubGVuZ3RoO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUNvbGxlY3Rpb247Il19
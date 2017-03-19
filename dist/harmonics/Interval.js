'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _tonalDistance = require('tonal-distance');

var td = _interopRequireWildcard(_tonalDistance);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Interval = function () {
    function Interval(name) {
        _classCallCheck(this, Interval);

        this.name = name;
    }

    _createClass(Interval, [{
        key: 'toString',
        value: function toString() {
            return this.name;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            (0, _assert2.default)(typeof name === 'string', 'Interval name should be string, is ' + (typeof name === 'undefined' ? 'undefined' : _typeof(name)));

            this._name = name;
        }
    }, {
        key: 'semitones',
        get: function get() {
            return tonal.ivl.semitones(this.name);
        }
    }], [{
        key: 'fromSemitones',
        value: function fromSemitones(count) {
            (0, _assert2.default)(typeof num !== 'number', 'Semitones count must be number, is ' + (typeof count === 'undefined' ? 'undefined' : _typeof(count)));

            return new Interval(tonal.ivl.fromSemitones(count));
        }
    }, {
        key: 'fromNotes',
        value: function fromNotes(from, to) {
            (0, _assert2.default)(from instanceof _Note2.default, 'From must be instance of type Note, is ' + (typeof from === 'undefined' ? 'undefined' : _typeof(from)));
            (0, _assert2.default)(to instanceof _Note2.default, 'To must be instance of type Note, is ' + (typeof to === 'undefined' ? 'undefined' : _typeof(to)));

            var interval = td.interval(from.toString(), to.toString());
            return new Interval(interval);
        }
    }]);

    return Interval;
}();

exports.default = Interval;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9JbnRlcnZhbC5qcyJdLCJuYW1lcyI6WyJ0b25hbCIsInRkIiwiSW50ZXJ2YWwiLCJuYW1lIiwiX25hbWUiLCJpdmwiLCJzZW1pdG9uZXMiLCJjb3VudCIsIm51bSIsImZyb21TZW1pdG9uZXMiLCJmcm9tIiwidG8iLCJpbnRlcnZhbCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7SUFBWUEsSzs7QUFDWjs7SUFBWUMsRTs7QUFFWjs7Ozs7Ozs7OztJQUVNQyxRO0FBQ0Ysc0JBQVlDLElBQVosRUFBa0I7QUFBQTs7QUFDZCxhQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDSDs7OzttQ0FtQlU7QUFDUCxtQkFBTyxLQUFLQSxJQUFaO0FBQ0g7Ozs0QkFsQlU7QUFDUCxtQkFBTyxLQUFLQyxLQUFaO0FBQ0gsUzswQkFFUUQsSSxFQUFNO0FBQ1gsa0NBQU8sT0FBT0EsSUFBUCxLQUFnQixRQUF2QixrREFBOEVBLElBQTlFLHlDQUE4RUEsSUFBOUU7O0FBRUEsaUJBQUtDLEtBQUwsR0FBYUQsSUFBYjtBQUNIOzs7NEJBR2U7QUFDWixtQkFBT0gsTUFBTUssR0FBTixDQUFVQyxTQUFWLENBQW9CLEtBQUtILElBQXpCLENBQVA7QUFDSDs7O3NDQVFvQkksSyxFQUFPO0FBQ3hCLGtDQUFPLE9BQU9DLEdBQVAsS0FBZSxRQUF0QixrREFBNkVELEtBQTdFLHlDQUE2RUEsS0FBN0U7O0FBRUEsbUJBQU8sSUFBSUwsUUFBSixDQUFhRixNQUFNSyxHQUFOLENBQVVJLGFBQVYsQ0FBd0JGLEtBQXhCLENBQWIsQ0FBUDtBQUNIOzs7a0NBRWdCRyxJLEVBQU1DLEUsRUFBSTtBQUN2QixrQ0FBT0QsOEJBQVAsc0RBQThFQSxJQUE5RSx5Q0FBOEVBLElBQTlFO0FBQ0Esa0NBQU9DLDRCQUFQLG9EQUEwRUEsRUFBMUUseUNBQTBFQSxFQUExRTs7QUFFQSxnQkFBTUMsV0FBV1gsR0FBR1csUUFBSCxDQUFZRixLQUFLRyxRQUFMLEVBQVosRUFBNkJGLEdBQUdFLFFBQUgsRUFBN0IsQ0FBakI7QUFDQSxtQkFBTyxJQUFJWCxRQUFKLENBQWFVLFFBQWIsQ0FBUDtBQUNIOzs7Ozs7a0JBR1VWLFEiLCJmaWxlIjoiaGFybW9uaWNzL0ludGVydmFsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICogYXMgdG9uYWwgZnJvbSAndG9uYWwnO1xuaW1wb3J0ICogYXMgdGQgZnJvbSAndG9uYWwtZGlzdGFuY2UnO1xuXG5pbXBvcnQgTm90ZSBmcm9tICcuL05vdGUnO1xuXG5jbGFzcyBJbnRlcnZhbCB7XG4gICAgY29uc3RydWN0b3IobmFtZSkge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgIH1cblxuXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lKG5hbWUpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiBuYW1lID09PSAnc3RyaW5nJywgYEludGVydmFsIG5hbWUgc2hvdWxkIGJlIHN0cmluZywgaXMgJHt0eXBlb2YgbmFtZX1gKTtcblxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cblxuICAgIGdldCBzZW1pdG9uZXMoKSB7XG4gICAgICAgIHJldHVybiB0b25hbC5pdmwuc2VtaXRvbmVzKHRoaXMubmFtZSk7XG4gICAgfVxuXG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9XG5cblxuICAgIHN0YXRpYyBmcm9tU2VtaXRvbmVzKGNvdW50KSB7XG4gICAgICAgIGFzc2VydCh0eXBlb2YgbnVtICE9PSAnbnVtYmVyJywgYFNlbWl0b25lcyBjb3VudCBtdXN0IGJlIG51bWJlciwgaXMgJHt0eXBlb2YgY291bnR9YCk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBJbnRlcnZhbCh0b25hbC5pdmwuZnJvbVNlbWl0b25lcyhjb3VudCkpO1xuICAgIH1cblxuICAgIHN0YXRpYyBmcm9tTm90ZXMoZnJvbSwgdG8pIHtcbiAgICAgICAgYXNzZXJ0KGZyb20gaW5zdGFuY2VvZiBOb3RlLCBgRnJvbSBtdXN0IGJlIGluc3RhbmNlIG9mIHR5cGUgTm90ZSwgaXMgJHt0eXBlb2YgZnJvbX1gKTtcbiAgICAgICAgYXNzZXJ0KHRvIGluc3RhbmNlb2YgTm90ZSwgYFRvIG11c3QgYmUgaW5zdGFuY2Ugb2YgdHlwZSBOb3RlLCBpcyAke3R5cGVvZiB0b31gKTtcblxuICAgICAgICBjb25zdCBpbnRlcnZhbCA9IHRkLmludGVydmFsKGZyb20udG9TdHJpbmcoKSwgdG8udG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybiBuZXcgSW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgSW50ZXJ2YWw7Il19
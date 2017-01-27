'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _tonal = require('tonal');

var tonal = _interopRequireWildcard(_tonal);

var _Note = require('./Note');

var _Note2 = _interopRequireDefault(_Note);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Scale = function () {
    function Scale(name) {
        var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        (0, _classCallCheck3.default)(this, Scale);

        this.name = name;
        this.key = key;
    }

    (0, _createClass3.default)(Scale, [{
        key: 'name',
        get: function get() {
            return this._name;
        },
        set: function set(name) {
            (0, _assert2.default)(typeof value === 'string');
            // TODO: validate string content
            this._name = name;
        }
    }, {
        key: 'notes',
        get: function get() {
            return tonal.scale(this.name).map(function (name) {
                return new _Note2.default(name);
            });
        }
    }]);
    return Scale;
}();

exports.default = Scale;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhcm1vbmljcy9TY2FsZS5qcyJdLCJuYW1lcyI6WyJ0b25hbCIsIlNjYWxlIiwibmFtZSIsImtleSIsInVuZGVmaW5lZCIsIl9uYW1lIiwidmFsdWUiLCJzY2FsZSIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOztJQUFZQSxLOztBQUVaOzs7Ozs7OztJQUVNQyxLO0FBQ0YsbUJBQVlDLElBQVosRUFBbUM7QUFBQSxZQUFqQkMsR0FBaUIsdUVBQVhDLFNBQVc7QUFBQTs7QUFDL0IsYUFBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0EsYUFBS0MsR0FBTCxHQUFXQSxHQUFYO0FBQ0g7Ozs7NEJBR1U7QUFDUCxtQkFBTyxLQUFLRSxLQUFaO0FBQ0gsUzswQkFFUUgsSSxFQUFNO0FBQ1gsa0NBQU8sT0FBT0ksS0FBUCxLQUFpQixRQUF4QjtBQUNBO0FBQ0EsaUJBQUtELEtBQUwsR0FBYUgsSUFBYjtBQUNIOzs7NEJBR1c7QUFDUixtQkFBT0YsTUFBTU8sS0FBTixDQUFZLEtBQUtMLElBQWpCLEVBQXVCTSxHQUF2QixDQUEyQixVQUFVTixJQUFWLEVBQWdCO0FBQzlDLHVCQUFPLG1CQUFTQSxJQUFULENBQVA7QUFDSCxhQUZNLENBQVA7QUFHSDs7Ozs7a0JBR1VELEsiLCJmaWxlIjoiaGFybW9uaWNzL1NjYWxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICogYXMgdG9uYWwgZnJvbSAndG9uYWwnO1xuXG5pbXBvcnQgTm90ZSBmcm9tICcuL05vdGUnO1xuXG5jbGFzcyBTY2FsZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwga2V5ID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMua2V5ID0ga2V5O1xuICAgIH1cblxuXG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgIH1cblxuICAgIHNldCBuYW1lKG5hbWUpIHtcbiAgICAgICAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpO1xuICAgICAgICAvLyBUT0RPOiB2YWxpZGF0ZSBzdHJpbmcgY29udGVudFxuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICB9XG5cblxuICAgIGdldCBub3RlcygpIHtcbiAgICAgICAgcmV0dXJuIHRvbmFsLnNjYWxlKHRoaXMubmFtZSkubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IE5vdGUobmFtZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2NhbGU7Il19
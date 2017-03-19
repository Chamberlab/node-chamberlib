'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _MidiFile = require('../io/file/MidiFile');

var _MidiFile2 = _interopRequireDefault(_MidiFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Song = function (_BaseCollection) {
    _inherits(Song, _BaseCollection);

    function Song(items) {
        var bpm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

        _classCallCheck(this, Song);

        var _this = _possibleConstructorReturn(this, (Song.__proto__ || Object.getPrototypeOf(Song)).call(this, items, _Track2.default, uuid));

        _this._bpm = bpm;
        return _this;
    }

    _createClass(Song, [{
        key: 'toMidiFile',
        value: function toMidiFile(filename) {
            return _MidiFile2.default.write(this, filename);
        }
    }, {
        key: 'bpm',
        get: function get() {
            return this._bpm;
        },
        set: function set(bpm) {
            this._bpm = bpm;
        }
    }]);

    return Song;
}(_BaseCollection3.default);

exports.default = Song;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvU29uZy5qcyJdLCJuYW1lcyI6WyJTb25nIiwiaXRlbXMiLCJicG0iLCJ1dWlkIiwidW5kZWZpbmVkIiwiX2JwbSIsImZpbGVuYW1lIiwid3JpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsSTs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBZ0Q7QUFBQSxZQUE3QkMsR0FBNkIsdUVBQXZCLEdBQXVCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYQyxTQUFXOztBQUFBOztBQUFBLGdIQUN0Q0gsS0FEc0MsbUJBQ3hCRSxJQUR3Qjs7QUFHNUMsY0FBS0UsSUFBTCxHQUFZSCxHQUFaO0FBSDRDO0FBSS9DOzs7O21DQUVVSSxRLEVBQVU7QUFDakIsbUJBQU8sbUJBQVNDLEtBQVQsQ0FBZSxJQUFmLEVBQXFCRCxRQUFyQixDQUFQO0FBQ0g7Ozs0QkFHUztBQUNOLG1CQUFPLEtBQUtELElBQVo7QUFDSCxTOzBCQUVPSCxHLEVBQUs7QUFDVCxpQkFBS0csSUFBTCxHQUFZSCxHQUFaO0FBQ0g7Ozs7OztrQkFHVUYsSSIsImZpbGUiOiJkYXRhL1NvbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQmFzZUNvbGxlY3Rpb24gZnJvbSAnLi9CYXNlQ29sbGVjdGlvbic7XG5pbXBvcnQgVHJhY2sgZnJvbSAnLi9UcmFjayc7XG5pbXBvcnQgTWlkaUZpbGUgZnJvbSAnLi4vaW8vZmlsZS9NaWRpRmlsZSc7XG5cbmNsYXNzIFNvbmcgZXh0ZW5kcyBCYXNlQ29sbGVjdGlvbiB7XG4gICAgY29uc3RydWN0b3IoaXRlbXMsIGJwbSA9IDEyMCwgdXVpZCA9IHVuZGVmaW5lZCkge1xuICAgICAgICBzdXBlcihpdGVtcywgVHJhY2ssIHV1aWQpO1xuXG4gICAgICAgIHRoaXMuX2JwbSA9IGJwbTtcbiAgICB9XG5cbiAgICB0b01pZGlGaWxlKGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBNaWRpRmlsZS53cml0ZSh0aGlzLCBmaWxlbmFtZSk7XG4gICAgfVxuXG5cbiAgICBnZXQgYnBtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYnBtO1xuICAgIH1cblxuICAgIHNldCBicG0oYnBtKSB7XG4gICAgICAgIHRoaXMuX2JwbSA9IGJwbTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFNvbmc7Il19
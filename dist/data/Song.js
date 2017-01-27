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

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _MidiFile = require('../io/file/MidiFile');

var _MidiFile2 = _interopRequireDefault(_MidiFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Song = function (_BaseCollection) {
    (0, _inherits3.default)(Song, _BaseCollection);

    function Song(items) {
        var bpm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;
        var uuid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        (0, _classCallCheck3.default)(this, Song);

        var _this = (0, _possibleConstructorReturn3.default)(this, (Song.__proto__ || (0, _getPrototypeOf2.default)(Song)).call(this, items, _Track2.default, uuid));

        _this._bpm = bpm;
        return _this;
    }

    (0, _createClass3.default)(Song, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvU29uZy5qcyJdLCJuYW1lcyI6WyJTb25nIiwiaXRlbXMiLCJicG0iLCJ1dWlkIiwidW5kZWZpbmVkIiwiX2JwbSIsImZpbGVuYW1lIiwid3JpdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFTUEsSTs7O0FBQ0Ysa0JBQVlDLEtBQVosRUFBZ0Q7QUFBQSxZQUE3QkMsR0FBNkIsdUVBQXZCLEdBQXVCO0FBQUEsWUFBbEJDLElBQWtCLHVFQUFYQyxTQUFXO0FBQUE7O0FBQUEsc0lBQ3RDSCxLQURzQyxtQkFDeEJFLElBRHdCOztBQUc1QyxjQUFLRSxJQUFMLEdBQVlILEdBQVo7QUFINEM7QUFJL0M7Ozs7bUNBRVVJLFEsRUFBVTtBQUNqQixtQkFBTyxtQkFBU0MsS0FBVCxDQUFlLElBQWYsRUFBcUJELFFBQXJCLENBQVA7QUFDSDs7OzRCQUdTO0FBQ04sbUJBQU8sS0FBS0QsSUFBWjtBQUNILFM7MEJBRU9ILEcsRUFBSztBQUNULGlCQUFLRyxJQUFMLEdBQVlILEdBQVo7QUFDSDs7Ozs7a0JBR1VGLEkiLCJmaWxlIjoiZGF0YS9Tb25nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJhc2VDb2xsZWN0aW9uIGZyb20gJy4vQmFzZUNvbGxlY3Rpb24nO1xuaW1wb3J0IFRyYWNrIGZyb20gJy4vVHJhY2snO1xuaW1wb3J0IE1pZGlGaWxlIGZyb20gJy4uL2lvL2ZpbGUvTWlkaUZpbGUnO1xuXG5jbGFzcyBTb25nIGV4dGVuZHMgQmFzZUNvbGxlY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKGl0ZW1zLCBicG0gPSAxMjAsIHV1aWQgPSB1bmRlZmluZWQpIHtcbiAgICAgICAgc3VwZXIoaXRlbXMsIFRyYWNrLCB1dWlkKTtcblxuICAgICAgICB0aGlzLl9icG0gPSBicG07XG4gICAgfVxuXG4gICAgdG9NaWRpRmlsZShmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gTWlkaUZpbGUud3JpdGUodGhpcywgZmlsZW5hbWUpO1xuICAgIH1cblxuXG4gICAgZ2V0IGJwbSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JwbTtcbiAgICB9XG5cbiAgICBzZXQgYnBtKGJwbSkge1xuICAgICAgICB0aGlzLl9icG0gPSBicG07XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTb25nOyJdfQ==
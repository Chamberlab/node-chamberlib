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

var _jsmidgen = require('jsmidgen');

var midi = _interopRequireWildcard(_jsmidgen);

var _Song = require('../Song');

var _Song2 = _interopRequireDefault(_Song);

var _TonalEvent = require('../../events/TonalEvent');

var _TonalEvent2 = _interopRequireDefault(_TonalEvent);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MidiIO = function () {
    function MidiIO() {
        (0, _classCallCheck3.default)(this, MidiIO);
    }

    (0, _createClass3.default)(MidiIO, null, [{
        key: 'write',
        value: function write(song, filename) {
            (0, _assert2.default)(song instanceof _Song2.default);
            (0, _assert2.default)(typeof filename === 'string');

            var file = new midi.File();
            song.all.map(function (channel) {
                var track = new midi.Track();
                channel.all.map(function (tonalEvent) {
                    (0, _assert2.default)(tonalEvent instanceof _TonalEvent2.default);
                });
                file.addTrack(track);
            });
        }
    }]);
    return MidiIO;
}();

exports.default = MidiIO;
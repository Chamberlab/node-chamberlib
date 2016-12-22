'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var JsonIO = function () {
    function JsonIO() {
        (0, _classCallCheck3.default)(this, JsonIO);
    }

    (0, _createClass3.default)(JsonIO, null, [{
        key: 'readFile',
        value: function readFile(filepath) {
            return _bluebird2.default.promisify(_fs2.default.readFile)(filepath).then(function (data) {
                return _bluebird2.default.resolve(JSON.parse(data));
            });
        }
    }, {
        key: 'writeFile',
        value: function writeFile(filepath, data) {
            return _bluebird2.default.promisify(_fs2.default.writeFile)(filepath, (0, _stringify2.default)(data));
        }
    }]);
    return JsonIO;
}();

exports.default = JsonIO;
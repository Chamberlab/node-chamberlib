"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BaseLUT = function () {
    function BaseLUT() {
        (0, _classCallCheck3.default)(this, BaseLUT);

        this.generate();
    }

    (0, _createClass3.default)(BaseLUT, [{
        key: "generate",
        value: function generate() {
            this._data = {};
            return this;
        }
    }, {
        key: "query",
        value: function query(key) {
            return this._data[key];
        }
    }]);
    return BaseLUT;
}();

exports.default = BaseLUT;
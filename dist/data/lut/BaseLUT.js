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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbHV0L0Jhc2VMVVQuanMiXSwibmFtZXMiOlsiQmFzZUxVVCIsImdlbmVyYXRlIiwiX2RhdGEiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBTUEsTztBQUNGLHVCQUFjO0FBQUE7O0FBQ1YsYUFBS0MsUUFBTDtBQUNIOzs7O21DQUVVO0FBQ1AsaUJBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOzs7OEJBRUtDLEcsRUFBSztBQUNQLG1CQUFPLEtBQUtELEtBQUwsQ0FBV0MsR0FBWCxDQUFQO0FBQ0g7Ozs7O2tCQUdVSCxPIiwiZmlsZSI6ImRhdGEvbHV0L0Jhc2VMVVQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCYXNlTFVUIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlKCkge1xuICAgICAgICB0aGlzLl9kYXRhID0ge307XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHF1ZXJ5KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YVtrZXldO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFzZUxVVDsiXX0=
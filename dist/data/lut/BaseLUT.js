"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseLUT = function () {
    function BaseLUT() {
        _classCallCheck(this, BaseLUT);

        this.generate();
    }

    _createClass(BaseLUT, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGEvbHV0L0Jhc2VMVVQuanMiXSwibmFtZXMiOlsiQmFzZUxVVCIsImdlbmVyYXRlIiwiX2RhdGEiLCJrZXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7SUFBTUEsTztBQUNGLHVCQUFjO0FBQUE7O0FBQ1YsYUFBS0MsUUFBTDtBQUNIOzs7O21DQUVVO0FBQ1AsaUJBQUtDLEtBQUwsR0FBYSxFQUFiO0FBQ0EsbUJBQU8sSUFBUDtBQUNIOzs7OEJBRUtDLEcsRUFBSztBQUNQLG1CQUFPLEtBQUtELEtBQUwsQ0FBV0MsR0FBWCxDQUFQO0FBQ0g7Ozs7OztrQkFHVUgsTyIsImZpbGUiOiJkYXRhL2x1dC9CYXNlTFVULmpzIiwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgQmFzZUxVVCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBxdWVyeShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGFba2V5XTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhc2VMVVQ7Il19
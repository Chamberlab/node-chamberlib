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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _BaseFile2 = require('./BaseFile');

var _BaseFile3 = _interopRequireDefault(_BaseFile2);

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CSVFile = function (_BaseFile) {
    (0, _inherits3.default)(CSVFile, _BaseFile);

    function CSVFile() {
        (0, _classCallCheck3.default)(this, CSVFile);
        return (0, _possibleConstructorReturn3.default)(this, (CSVFile.__proto__ || (0, _getPrototypeOf2.default)(CSVFile)).call(this));
    }

    (0, _createClass3.default)(CSVFile, [{
        key: 'read',
        value: function read(file, options) {
            var fstream = (0, _get3.default)(CSVFile.prototype.__proto__ || (0, _getPrototypeOf2.default)(CSVFile.prototype), 'read', this).call(this, file, true),
                parser = (0, _csvParse2.default)(options);
            return fstream.pipe(parser);
        }
    }, {
        key: 'write',
        value: function write() {
            throw new Error('CSV writing not implemented.');
        }
    }]);
    return CSVFile;
}(_BaseFile3.default);

exports.default = CSVFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvQ1NWRmlsZS5qcyJdLCJuYW1lcyI6WyJDU1ZGaWxlIiwiZmlsZSIsIm9wdGlvbnMiLCJmc3RyZWFtIiwicGFyc2VyIiwicGlwZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7SUFFTUEsTzs7O0FBQ0YsdUJBQWM7QUFBQTtBQUFBO0FBRWI7Ozs7NkJBRUlDLEksRUFBTUMsTyxFQUFTO0FBQ2hCLGdCQUFJQyx1SUFBcUJGLElBQXJCLEVBQTJCLElBQTNCLENBQUo7QUFBQSxnQkFDSUcsU0FBUyx3QkFBTUYsT0FBTixDQURiO0FBRUEsbUJBQU9DLFFBQVFFLElBQVIsQ0FBYUQsTUFBYixDQUFQO0FBQ0g7OztnQ0FFTztBQUNKLGtCQUFNLElBQUlFLEtBQUosQ0FBVSw4QkFBVixDQUFOO0FBQ0g7Ozs7O2tCQUdVTixPIiwiZmlsZSI6ImlvL2ZpbGUvQ1NWRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRmlsZSBmcm9tICcuL0Jhc2VGaWxlJztcbmltcG9ydCBwYXJzZSBmcm9tICdjc3YtcGFyc2UnO1xuXG5jbGFzcyBDU1ZGaWxlIGV4dGVuZHMgQmFzZUZpbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWQoZmlsZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgZnN0cmVhbSA9IHN1cGVyLnJlYWQoZmlsZSwgdHJ1ZSksXG4gICAgICAgICAgICBwYXJzZXIgPSBwYXJzZShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGZzdHJlYW0ucGlwZShwYXJzZXIpO1xuICAgIH1cblxuICAgIHdyaXRlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTViB3cml0aW5nIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENTVkZpbGU7Il19
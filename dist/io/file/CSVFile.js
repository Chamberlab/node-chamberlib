'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _BaseFile2 = require('./BaseFile');

var _BaseFile3 = _interopRequireDefault(_BaseFile2);

var _csvParse = require('csv-parse');

var _csvParse2 = _interopRequireDefault(_csvParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CSVFile = function (_BaseFile) {
    _inherits(CSVFile, _BaseFile);

    function CSVFile() {
        _classCallCheck(this, CSVFile);

        return _possibleConstructorReturn(this, (CSVFile.__proto__ || Object.getPrototypeOf(CSVFile)).call(this));
    }

    _createClass(CSVFile, [{
        key: 'read',
        value: function read(file, options) {
            var fstream = _get(CSVFile.prototype.__proto__ || Object.getPrototypeOf(CSVFile.prototype), 'read', this).call(this, file, true),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ZpbGUvQ1NWRmlsZS5qcyJdLCJuYW1lcyI6WyJDU1ZGaWxlIiwiZmlsZSIsIm9wdGlvbnMiLCJmc3RyZWFtIiwicGFyc2VyIiwicGlwZSIsIkVycm9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0lBRU1BLE87OztBQUNGLHVCQUFjO0FBQUE7O0FBQUE7QUFFYjs7Ozs2QkFFSUMsSSxFQUFNQyxPLEVBQVM7QUFDaEIsZ0JBQUlDLGlIQUFxQkYsSUFBckIsRUFBMkIsSUFBM0IsQ0FBSjtBQUFBLGdCQUNJRyxTQUFTLHdCQUFNRixPQUFOLENBRGI7QUFFQSxtQkFBT0MsUUFBUUUsSUFBUixDQUFhRCxNQUFiLENBQVA7QUFDSDs7O2dDQUVPO0FBQ0osa0JBQU0sSUFBSUUsS0FBSixDQUFVLDhCQUFWLENBQU47QUFDSDs7Ozs7O2tCQUdVTixPIiwiZmlsZSI6ImlvL2ZpbGUvQ1NWRmlsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBCYXNlRmlsZSBmcm9tICcuL0Jhc2VGaWxlJztcbmltcG9ydCBwYXJzZSBmcm9tICdjc3YtcGFyc2UnO1xuXG5jbGFzcyBDU1ZGaWxlIGV4dGVuZHMgQmFzZUZpbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWQoZmlsZSwgb3B0aW9ucykge1xuICAgICAgICBsZXQgZnN0cmVhbSA9IHN1cGVyLnJlYWQoZmlsZSwgdHJ1ZSksXG4gICAgICAgICAgICBwYXJzZXIgPSBwYXJzZShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGZzdHJlYW0ucGlwZShwYXJzZXIpO1xuICAgIH1cblxuICAgIHdyaXRlKCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NTViB3cml0aW5nIG5vdCBpbXBsZW1lbnRlZC4nKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENTVkZpbGU7Il19
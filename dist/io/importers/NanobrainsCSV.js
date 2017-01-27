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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _streamTransform = require('stream-transform');

var _streamTransform2 = _interopRequireDefault(_streamTransform);

var _CSVFile2 = require('../file/CSVFile');

var _CSVFile3 = _interopRequireDefault(_CSVFile2);

var _DataSet = require('../../data/DataSet');

var _DataSet2 = _interopRequireDefault(_DataSet);

var _DataChannel = require('../../data/DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _DataEvent = require('../../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NanobrainsCSV = function (_CSVFile) {
    (0, _inherits3.default)(NanobrainsCSV, _CSVFile);

    function NanobrainsCSV() {
        (0, _classCallCheck3.default)(this, NanobrainsCSV);
        return (0, _possibleConstructorReturn3.default)(this, (NanobrainsCSV.__proto__ || (0, _getPrototypeOf2.default)(NanobrainsCSV)).call(this));
    }

    (0, _createClass3.default)(NanobrainsCSV, [{
        key: 'read',
        value: function read(file) {
            var writeStream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var _self = this,
                csvOptions = {
                delimiter: ',',
                relax_column_count: true,
                trim: true
            };

            var input = (0, _get3.default)(NanobrainsCSV.prototype.__proto__ || (0, _getPrototypeOf2.default)(NanobrainsCSV.prototype), 'read', this).call(this, file, csvOptions);

            if (writeStream) {
                return input.pipe(writeStream);
            }

            return new _bluebird2.default(function (resolve, reject) {
                var count = 0;
                _self.data = new _DataSet2.default();

                writeStream = (0, _streamTransform2.default)(function csvTransform(entry, cb) {
                    if (count > 2) {
                        (function () {
                            var ms = entry.shift();
                            entry.forEach(function (field, i) {
                                if (count === 3) {
                                    _self.data.push(new _DataChannel2.default([], field));
                                } else {
                                    _self.data.at(i).push(new _DataEvent2.default(new _Time2.default(parseFloat(ms), 'ms'), new _Voltage2.default(parseFloat(field), 'mv')));
                                }
                            });
                        })();
                    }
                    count++;
                    return cb();
                }, function (err) {
                    if (err) {
                        reject(err);
                    }
                    resolve();
                });

                input.pipe(writeStream);
            });
        }
    }]);
    return NanobrainsCSV;
}(_CSVFile3.default);

exports.default = NanobrainsCSV;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ltcG9ydGVycy9OYW5vYnJhaW5zQ1NWLmpzIl0sIm5hbWVzIjpbIk5hbm9icmFpbnNDU1YiLCJmaWxlIiwid3JpdGVTdHJlYW0iLCJ1bmRlZmluZWQiLCJfc2VsZiIsImNzdk9wdGlvbnMiLCJkZWxpbWl0ZXIiLCJyZWxheF9jb2x1bW5fY291bnQiLCJ0cmltIiwiaW5wdXQiLCJwaXBlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvdW50IiwiZGF0YSIsImNzdlRyYW5zZm9ybSIsImVudHJ5IiwiY2IiLCJtcyIsInNoaWZ0IiwiZm9yRWFjaCIsImZpZWxkIiwiaSIsInB1c2giLCJhdCIsInBhcnNlRmxvYXQiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVNQSxhOzs7QUFDRiw2QkFBYztBQUFBO0FBQUE7QUFFYjs7Ozs2QkFFSUMsSSxFQUErQjtBQUFBLGdCQUF6QkMsV0FBeUIsdUVBQVhDLFNBQVc7O0FBQ2hDLGdCQUFNQyxRQUFRLElBQWQ7QUFBQSxnQkFDSUMsYUFBYTtBQUNUQywyQkFBVyxHQURGO0FBRVRDLG9DQUFvQixJQUZYO0FBR1RDLHNCQUFNO0FBSEcsYUFEakI7O0FBT0EsZ0JBQUlDLGlKQUFtQlIsSUFBbkIsRUFBeUJJLFVBQXpCLENBQUo7O0FBRUEsZ0JBQUlILFdBQUosRUFBaUI7QUFDYix1QkFBT08sTUFBTUMsSUFBTixDQUFXUixXQUFYLENBQVA7QUFDSDs7QUFFRCxtQkFBTyx1QkFBWSxVQUFVUyxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtBQUMxQyxvQkFBSUMsUUFBUSxDQUFaO0FBQ0FULHNCQUFNVSxJQUFOLEdBQWEsdUJBQWI7O0FBRUFaLDhCQUFjLCtCQUFVLFNBQVNhLFlBQVQsQ0FBc0JDLEtBQXRCLEVBQTZCQyxFQUE3QixFQUFpQztBQUNyRCx3QkFBSUosUUFBUSxDQUFaLEVBQWU7QUFBQTtBQUNYLGdDQUFJSyxLQUFLRixNQUFNRyxLQUFOLEVBQVQ7QUFDQUgsa0NBQU1JLE9BQU4sQ0FBYyxVQUFVQyxLQUFWLEVBQWlCQyxDQUFqQixFQUFvQjtBQUM5QixvQ0FBSVQsVUFBVSxDQUFkLEVBQWlCO0FBQ2JULDBDQUFNVSxJQUFOLENBQVdTLElBQVgsQ0FBZ0IsMEJBQWdCLEVBQWhCLEVBQW9CRixLQUFwQixDQUFoQjtBQUNILGlDQUZELE1BRU87QUFDSGpCLDBDQUFNVSxJQUFOLENBQVdVLEVBQVgsQ0FBY0YsQ0FBZCxFQUFpQkMsSUFBakIsQ0FDSSx3QkFDSSxtQkFBU0UsV0FBV1AsRUFBWCxDQUFULEVBQXlCLElBQXpCLENBREosRUFFSSxzQkFBWU8sV0FBV0osS0FBWCxDQUFaLEVBQStCLElBQS9CLENBRkosQ0FESjtBQU1IO0FBQ0osNkJBWEQ7QUFGVztBQWNkO0FBQ0RSO0FBQ0EsMkJBQU9JLElBQVA7QUFDSCxpQkFsQmEsRUFrQlgsVUFBVVMsR0FBVixFQUFlO0FBQ2Qsd0JBQUlBLEdBQUosRUFBUztBQUNMZCwrQkFBT2MsR0FBUDtBQUNIO0FBQ0RmO0FBQ0gsaUJBdkJhLENBQWQ7O0FBeUJBRixzQkFBTUMsSUFBTixDQUFXUixXQUFYO0FBQ0gsYUE5Qk0sQ0FBUDtBQStCSDs7Ozs7a0JBR1VGLGEiLCJmaWxlIjoiaW8vaW1wb3J0ZXJzL05hbm9icmFpbnNDU1YuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJ3N0cmVhbS10cmFuc2Zvcm0nO1xuaW1wb3J0IENTVkZpbGUgZnJvbSAnLi4vZmlsZS9DU1ZGaWxlJztcbmltcG9ydCBEYXRhU2V0IGZyb20gJy4uLy4uL2RhdGEvRGF0YVNldCc7XG5pbXBvcnQgRGF0YUNoYW5uZWwgZnJvbSAnLi4vLi4vZGF0YS9EYXRhQ2hhbm5lbCc7XG5pbXBvcnQgRGF0YUV2ZW50IGZyb20gJy4uLy4uL2V2ZW50cy9EYXRhRXZlbnQnO1xuaW1wb3J0IFRpbWUgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9UaW1lJztcbmltcG9ydCBWb2x0YWdlIGZyb20gJy4uLy4uL3F1YW50aXRpZXMvVm9sdGFnZSc7XG5cbmNsYXNzIE5hbm9icmFpbnNDU1YgZXh0ZW5kcyBDU1ZGaWxlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICByZWFkKGZpbGUsIHdyaXRlU3RyZWFtID0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IF9zZWxmID0gdGhpcyxcbiAgICAgICAgICAgIGNzdk9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgZGVsaW1pdGVyOiAnLCcsXG4gICAgICAgICAgICAgICAgcmVsYXhfY29sdW1uX2NvdW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIHRyaW06IHRydWVcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgbGV0IGlucHV0ID0gc3VwZXIucmVhZChmaWxlLCBjc3ZPcHRpb25zKTtcblxuICAgICAgICBpZiAod3JpdGVTdHJlYW0pIHtcbiAgICAgICAgICAgIHJldHVybiBpbnB1dC5waXBlKHdyaXRlU3RyZWFtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICBsZXQgY291bnQgPSAwO1xuICAgICAgICAgICAgX3NlbGYuZGF0YSA9IG5ldyBEYXRhU2V0KCk7XG5cbiAgICAgICAgICAgIHdyaXRlU3RyZWFtID0gdHJhbnNmb3JtKGZ1bmN0aW9uIGNzdlRyYW5zZm9ybShlbnRyeSwgY2IpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtcyA9IGVudHJ5LnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LmZvckVhY2goZnVuY3Rpb24gKGZpZWxkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5kYXRhLnB1c2gobmV3IERhdGFDaGFubmVsKFtdLCBmaWVsZCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfc2VsZi5kYXRhLmF0KGkpLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBEYXRhRXZlbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVGltZShwYXJzZUZsb2F0KG1zKSwgJ21zJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgVm9sdGFnZShwYXJzZUZsb2F0KGZpZWxkKSwgJ212JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIHJldHVybiBjYigpO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpbnB1dC5waXBlKHdyaXRlU3RyZWFtKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYW5vYnJhaW5zQ1NWOyJdfQ==
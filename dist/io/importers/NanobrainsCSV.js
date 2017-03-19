'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NanobrainsCSV = function (_CSVFile) {
    _inherits(NanobrainsCSV, _CSVFile);

    function NanobrainsCSV() {
        _classCallCheck(this, NanobrainsCSV);

        return _possibleConstructorReturn(this, (NanobrainsCSV.__proto__ || Object.getPrototypeOf(NanobrainsCSV)).call(this));
    }

    _createClass(NanobrainsCSV, [{
        key: 'read',
        value: function read(file) {
            var writeStream = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var _self = this,
                csvOptions = {
                delimiter: ',',
                relax_column_count: true,
                trim: true
            };

            var input = _get(NanobrainsCSV.prototype.__proto__ || Object.getPrototypeOf(NanobrainsCSV.prototype), 'read', this).call(this, file, csvOptions);

            if (writeStream) {
                return input.pipe(writeStream);
            }

            return new _bluebird2.default(function (resolve, reject) {
                var count = 0;
                _self.data = new _DataSet2.default();

                writeStream = (0, _streamTransform2.default)(function csvTransform(entry, cb) {
                    if (count > 2) {
                        var ms = entry.shift();
                        entry.forEach(function (field, i) {
                            if (count === 3) {
                                _self.data.push(new _DataChannel2.default([], field));
                            } else {
                                _self.data.at(i).push(new _DataEvent2.default(new _Time2.default(parseFloat(ms), 'ms'), new _Voltage2.default(parseFloat(field), 'mv')));
                            }
                        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlvL2ltcG9ydGVycy9OYW5vYnJhaW5zQ1NWLmpzIl0sIm5hbWVzIjpbIk5hbm9icmFpbnNDU1YiLCJmaWxlIiwid3JpdGVTdHJlYW0iLCJ1bmRlZmluZWQiLCJfc2VsZiIsImNzdk9wdGlvbnMiLCJkZWxpbWl0ZXIiLCJyZWxheF9jb2x1bW5fY291bnQiLCJ0cmltIiwiaW5wdXQiLCJwaXBlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvdW50IiwiZGF0YSIsImNzdlRyYW5zZm9ybSIsImVudHJ5IiwiY2IiLCJtcyIsInNoaWZ0IiwiZm9yRWFjaCIsImZpZWxkIiwiaSIsInB1c2giLCJhdCIsInBhcnNlRmxvYXQiLCJlcnIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7SUFFTUEsYTs7O0FBQ0YsNkJBQWM7QUFBQTs7QUFBQTtBQUViOzs7OzZCQUVJQyxJLEVBQStCO0FBQUEsZ0JBQXpCQyxXQUF5Qix1RUFBWEMsU0FBVzs7QUFDaEMsZ0JBQU1DLFFBQVEsSUFBZDtBQUFBLGdCQUNJQyxhQUFhO0FBQ1RDLDJCQUFXLEdBREY7QUFFVEMsb0NBQW9CLElBRlg7QUFHVEMsc0JBQU07QUFIRyxhQURqQjs7QUFPQSxnQkFBSUMsMkhBQW1CUixJQUFuQixFQUF5QkksVUFBekIsQ0FBSjs7QUFFQSxnQkFBSUgsV0FBSixFQUFpQjtBQUNiLHVCQUFPTyxNQUFNQyxJQUFOLENBQVdSLFdBQVgsQ0FBUDtBQUNIOztBQUVELG1CQUFPLHVCQUFZLFVBQVVTLE9BQVYsRUFBbUJDLE1BQW5CLEVBQTJCO0FBQzFDLG9CQUFJQyxRQUFRLENBQVo7QUFDQVQsc0JBQU1VLElBQU4sR0FBYSx1QkFBYjs7QUFFQVosOEJBQWMsK0JBQVUsU0FBU2EsWUFBVCxDQUFzQkMsS0FBdEIsRUFBNkJDLEVBQTdCLEVBQWlDO0FBQ3JELHdCQUFJSixRQUFRLENBQVosRUFBZTtBQUNYLDRCQUFJSyxLQUFLRixNQUFNRyxLQUFOLEVBQVQ7QUFDQUgsOEJBQU1JLE9BQU4sQ0FBYyxVQUFVQyxLQUFWLEVBQWlCQyxDQUFqQixFQUFvQjtBQUM5QixnQ0FBSVQsVUFBVSxDQUFkLEVBQWlCO0FBQ2JULHNDQUFNVSxJQUFOLENBQVdTLElBQVgsQ0FBZ0IsMEJBQWdCLEVBQWhCLEVBQW9CRixLQUFwQixDQUFoQjtBQUNILDZCQUZELE1BRU87QUFDSGpCLHNDQUFNVSxJQUFOLENBQVdVLEVBQVgsQ0FBY0YsQ0FBZCxFQUFpQkMsSUFBakIsQ0FDSSx3QkFDSSxtQkFBU0UsV0FBV1AsRUFBWCxDQUFULEVBQXlCLElBQXpCLENBREosRUFFSSxzQkFBWU8sV0FBV0osS0FBWCxDQUFaLEVBQStCLElBQS9CLENBRkosQ0FESjtBQU1IO0FBQ0oseUJBWEQ7QUFZSDtBQUNEUjtBQUNBLDJCQUFPSSxJQUFQO0FBQ0gsaUJBbEJhLEVBa0JYLFVBQVVTLEdBQVYsRUFBZTtBQUNkLHdCQUFJQSxHQUFKLEVBQVM7QUFDTGQsK0JBQU9jLEdBQVA7QUFDSDtBQUNEZjtBQUNILGlCQXZCYSxDQUFkOztBQXlCQUYsc0JBQU1DLElBQU4sQ0FBV1IsV0FBWDtBQUNILGFBOUJNLENBQVA7QUErQkg7Ozs7OztrQkFHVUYsYSIsImZpbGUiOiJpby9pbXBvcnRlcnMvTmFub2JyYWluc0NTVi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnc3RyZWFtLXRyYW5zZm9ybSc7XG5pbXBvcnQgQ1NWRmlsZSBmcm9tICcuLi9maWxlL0NTVkZpbGUnO1xuaW1wb3J0IERhdGFTZXQgZnJvbSAnLi4vLi4vZGF0YS9EYXRhU2V0JztcbmltcG9ydCBEYXRhQ2hhbm5lbCBmcm9tICcuLi8uLi9kYXRhL0RhdGFDaGFubmVsJztcbmltcG9ydCBEYXRhRXZlbnQgZnJvbSAnLi4vLi4vZXZlbnRzL0RhdGFFdmVudCc7XG5pbXBvcnQgVGltZSBmcm9tICcuLi8uLi9xdWFudGl0aWVzL1RpbWUnO1xuaW1wb3J0IFZvbHRhZ2UgZnJvbSAnLi4vLi4vcXVhbnRpdGllcy9Wb2x0YWdlJztcblxuY2xhc3MgTmFub2JyYWluc0NTViBleHRlbmRzIENTVkZpbGUge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHJlYWQoZmlsZSwgd3JpdGVTdHJlYW0gPSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgX3NlbGYgPSB0aGlzLFxuICAgICAgICAgICAgY3N2T3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBkZWxpbWl0ZXI6ICcsJyxcbiAgICAgICAgICAgICAgICByZWxheF9jb2x1bW5fY291bnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHJpbTogdHJ1ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICBsZXQgaW5wdXQgPSBzdXBlci5yZWFkKGZpbGUsIGNzdk9wdGlvbnMpO1xuXG4gICAgICAgIGlmICh3cml0ZVN0cmVhbSkge1xuICAgICAgICAgICAgcmV0dXJuIGlucHV0LnBpcGUod3JpdGVTdHJlYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDA7XG4gICAgICAgICAgICBfc2VsZi5kYXRhID0gbmV3IERhdGFTZXQoKTtcblxuICAgICAgICAgICAgd3JpdGVTdHJlYW0gPSB0cmFuc2Zvcm0oZnVuY3Rpb24gY3N2VHJhbnNmb3JtKGVudHJ5LCBjYikge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1zID0gZW50cnkuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZW50cnkuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLmRhdGEucHVzaChuZXcgRGF0YUNoYW5uZWwoW10sIGZpZWxkKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9zZWxmLmRhdGEuYXQoaSkucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IERhdGFFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBUaW1lKHBhcnNlRmxvYXQobXMpLCAnbXMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBWb2x0YWdlKHBhcnNlRmxvYXQoZmllbGQpLCAnbXYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNiKCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlucHV0LnBpcGUod3JpdGVTdHJlYW0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hbm9icmFpbnNDU1Y7Il19
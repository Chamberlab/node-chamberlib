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

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _DataChannel = require('./DataChannel');

var _DataChannel2 = _interopRequireDefault(_DataChannel);

var _BaseCollection2 = require('./BaseCollection');

var _BaseCollection3 = _interopRequireDefault(_BaseCollection2);

var _DataEvent = require('../events/DataEvent');

var _DataEvent2 = _interopRequireDefault(_DataEvent);

var _Time = require('../quantities/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Voltage = require('../quantities/Voltage');

var _Voltage2 = _interopRequireDefault(_Voltage);

var _JsonIO = require('./io/JsonIO');

var _JsonIO2 = _interopRequireDefault(_JsonIO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataSet = function (_BaseCollection) {
    (0, _inherits3.default)(DataSet, _BaseCollection);

    function DataSet(channels) {
        var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
        (0, _classCallCheck3.default)(this, DataSet);

        var _this = (0, _possibleConstructorReturn3.default)(this, (DataSet.__proto__ || (0, _getPrototypeOf2.default)(DataSet)).call(this, channels, _DataChannel2.default));

        _this.title = title;
        return _this;
    }

    (0, _createClass3.default)(DataSet, [{
        key: 'loadJson',
        value: function loadJson(filepath) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            var _self = this;
            _self.title = title || _path2.default.basename(filepath, '.json');
            return _JsonIO2.default.readFile(filepath).then(function (data) {
                return _self.fromObject(data);
            });
        }
    }, {
        key: 'fromObject',
        value: function fromObject(data) {
            var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

            (0, _assert2.default)(Array.isArray(data));

            var _self = this;
            _self.title = title || _self.title;

            return _bluebird2.default.map(data, function (group) {
                return _bluebird2.default.map(group.units, function (unit) {
                    var channel = new _DataChannel2.default();

                    return _bluebird2.default.map(unit.spiketrains, function (sptr) {
                        (0, _assert2.default)(Array.isArray(sptr.times) && Array.isArray(sptr.waveforms));
                        (0, _assert2.default)(sptr.times.length === sptr.waveforms.length);

                        return _bluebird2.default.map(sptr.waveforms, function (wf, i) {
                            var val_diff = wf.max - wf.min,
                                event = new _DataEvent2.default(new _Time2.default(sptr.times[i], 's'), new _Voltage2.default(val_diff, 'mv'));
                            channel.push(event);
                        });
                    }).then(function () {
                        _self.push(channel);
                    });
                });
            });
        }
    }, {
        key: 'evaluateRuleSets',
        value: function evaluateRuleSets() {
            var _self = this;
            return _bluebird2.default.each(_self.all, function (channel) {
                return channel.evaluateRuleSet().then(function (res) {
                    // TODO: handle errors and stats later on
                    channel = res[res.length - 1].results;
                });
            });
        }
    }]);
    return DataSet;
}(_BaseCollection3.default);

exports.default = DataSet;
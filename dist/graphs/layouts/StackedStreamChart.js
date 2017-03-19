'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _BaseGraph2 = require('../BaseGraph');

var _BaseGraph3 = _interopRequireDefault(_BaseGraph2);

var _ColourTable = require('../../data/lut/ColourTable');

var _ColourTable2 = _interopRequireDefault(_ColourTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// FIXME: update this to use d3 4.x

var StackedStreamChart = function (_BaseGraph) {
    _inherits(StackedStreamChart, _BaseGraph);

    function StackedStreamChart() {
        _classCallCheck(this, StackedStreamChart);

        var _this = _possibleConstructorReturn(this, (StackedStreamChart.__proto__ || Object.getPrototypeOf(StackedStreamChart)).call(this));

        _this._quantize = require('../../../config/layouts/StackedStreamChart.json').quantize;
        return _this;
    }

    _createClass(StackedStreamChart, [{
        key: 'drawContent',
        value: function drawContent(d3env, layerData, g) {
            _get(StackedStreamChart.prototype.__proto__ || Object.getPrototypeOf(StackedStreamChart.prototype), 'drawContent', this).call(this);

            // TODO: fix stacked stream layout

            d3env.layoutConfig = require('../../../config/layouts/StackedStreamChart.json');

            var stack = d3env.d3.layout.stack().offset('wiggle'),
                layers = stack(d3env.d3.range(layerData.length).map(function (i) {
                return layerData[i];
            }));

            var x = d3env.d3.scale.linear().domain([0, d3env.duration]).range([0, d3env.width]);

            d3env.xAxis = d3env.d3.svg.axis().scale(x).orient('bottom').ticks(d3env.duration * 0.1);

            var ymax = d3env.d3.max(layers, function (layer) {
                return d3env.d3.max(layer, function (d) {
                    return d.y0 + d.y;
                });
            }),
                y = d3env.d3.scale.linear().domain([0, ymax]).range([d3env.height, 0]);

            var area = d3env.d3.svg.area().x(function (d) {
                return x(d.x);
            }).y0(function (d) {
                return y(d.y0);
            }).y1(function (d) {
                return y(d.y0 + d.y);
            });

            var colourList = new _ColourTable2.default(layerData.length, 5);

            g.selectAll('svg:path').data(layers).enter().append('svg:path').attr('d', area).style('stroke', function (d, i) {
                return colourList.colours[i];
            }).style('fill', function (d, i) {
                return colourList.colours[i];
            });

            return _bluebird2.default.resolve([d3env, layerData, g]);
        }
    }]);

    return StackedStreamChart;
}(_BaseGraph3.default);

exports.default = StackedStreamChart;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9sYXlvdXRzL1N0YWNrZWRTdHJlYW1DaGFydC5qcyJdLCJuYW1lcyI6WyJTdGFja2VkU3RyZWFtQ2hhcnQiLCJfcXVhbnRpemUiLCJyZXF1aXJlIiwicXVhbnRpemUiLCJkM2VudiIsImxheWVyRGF0YSIsImciLCJsYXlvdXRDb25maWciLCJzdGFjayIsImQzIiwibGF5b3V0Iiwib2Zmc2V0IiwibGF5ZXJzIiwicmFuZ2UiLCJsZW5ndGgiLCJtYXAiLCJpIiwieCIsInNjYWxlIiwibGluZWFyIiwiZG9tYWluIiwiZHVyYXRpb24iLCJ3aWR0aCIsInhBeGlzIiwic3ZnIiwiYXhpcyIsIm9yaWVudCIsInRpY2tzIiwieW1heCIsIm1heCIsImxheWVyIiwiZCIsInkwIiwieSIsImhlaWdodCIsImFyZWEiLCJ5MSIsImNvbG91ckxpc3QiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZW50ZXIiLCJhcHBlbmQiLCJhdHRyIiwic3R5bGUiLCJjb2xvdXJzIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUE7O0lBRU1BLGtCOzs7QUFDRixrQ0FBYztBQUFBOztBQUFBOztBQUdWLGNBQUtDLFNBQUwsR0FBaUJDLFFBQVEsaURBQVIsRUFBMkRDLFFBQTVFO0FBSFU7QUFJYjs7OztvQ0FFV0MsSyxFQUFPQyxTLEVBQVdDLEMsRUFBRztBQUM3Qjs7QUFFQTs7QUFFQUYsa0JBQU1HLFlBQU4sR0FBcUJMLFFBQVEsaURBQVIsQ0FBckI7O0FBRUEsZ0JBQUlNLFFBQVFKLE1BQU1LLEVBQU4sQ0FBU0MsTUFBVCxDQUFnQkYsS0FBaEIsR0FBd0JHLE1BQXhCLENBQStCLFFBQS9CLENBQVo7QUFBQSxnQkFDSUMsU0FBU0osTUFBTUosTUFBTUssRUFBTixDQUFTSSxLQUFULENBQWVSLFVBQVVTLE1BQXpCLEVBQWlDQyxHQUFqQyxDQUFxQyxVQUFVQyxDQUFWLEVBQWE7QUFDN0QsdUJBQU9YLFVBQVVXLENBQVYsQ0FBUDtBQUNILGFBRmMsQ0FBTixDQURiOztBQUtBLGdCQUFJQyxJQUFJYixNQUFNSyxFQUFOLENBQVNTLEtBQVQsQ0FBZUMsTUFBZixHQUNIQyxNQURHLENBQ0ksQ0FBQyxDQUFELEVBQUloQixNQUFNaUIsUUFBVixDQURKLEVBRUhSLEtBRkcsQ0FFRyxDQUFDLENBQUQsRUFBSVQsTUFBTWtCLEtBQVYsQ0FGSCxDQUFSOztBQUlBbEIsa0JBQU1tQixLQUFOLEdBQWNuQixNQUFNSyxFQUFOLENBQVNlLEdBQVQsQ0FBYUMsSUFBYixHQUFvQlAsS0FBcEIsQ0FBMEJELENBQTFCLEVBQ1RTLE1BRFMsQ0FDRixRQURFLEVBQ1FDLEtBRFIsQ0FDY3ZCLE1BQU1pQixRQUFOLEdBQWlCLEdBRC9CLENBQWQ7O0FBR0EsZ0JBQUlPLE9BQU94QixNQUFNSyxFQUFOLENBQVNvQixHQUFULENBQWFqQixNQUFiLEVBQXFCLFVBQVVrQixLQUFWLEVBQWlCO0FBQ3pDLHVCQUFPMUIsTUFBTUssRUFBTixDQUFTb0IsR0FBVCxDQUFhQyxLQUFiLEVBQW9CLFVBQVVDLENBQVYsRUFBYTtBQUNwQywyQkFBT0EsRUFBRUMsRUFBRixHQUFPRCxFQUFFRSxDQUFoQjtBQUNILGlCQUZNLENBQVA7QUFHSCxhQUpNLENBQVg7QUFBQSxnQkFLSUEsSUFBSTdCLE1BQU1LLEVBQU4sQ0FBU1MsS0FBVCxDQUFlQyxNQUFmLEdBQ0NDLE1BREQsQ0FDUSxDQUFDLENBQUQsRUFBSVEsSUFBSixDQURSLEVBRUNmLEtBRkQsQ0FFTyxDQUFDVCxNQUFNOEIsTUFBUCxFQUFlLENBQWYsQ0FGUCxDQUxSOztBQVNBLGdCQUFJQyxPQUFPL0IsTUFBTUssRUFBTixDQUFTZSxHQUFULENBQWFXLElBQWIsR0FDTmxCLENBRE0sQ0FDSixVQUFVYyxDQUFWLEVBQWE7QUFDWix1QkFBT2QsRUFBRWMsRUFBRWQsQ0FBSixDQUFQO0FBQ0gsYUFITSxFQUlOZSxFQUpNLENBSUgsVUFBVUQsQ0FBVixFQUFhO0FBQ2IsdUJBQU9FLEVBQUVGLEVBQUVDLEVBQUosQ0FBUDtBQUNILGFBTk0sRUFPTkksRUFQTSxDQU9ILFVBQVVMLENBQVYsRUFBYTtBQUNiLHVCQUFPRSxFQUFFRixFQUFFQyxFQUFGLEdBQU9ELEVBQUVFLENBQVgsQ0FBUDtBQUNILGFBVE0sQ0FBWDs7QUFXQSxnQkFBSUksYUFBYSwwQkFBZ0JoQyxVQUFVUyxNQUExQixFQUFrQyxDQUFsQyxDQUFqQjs7QUFFQVIsY0FBRWdDLFNBQUYsQ0FBWSxVQUFaLEVBQ0tDLElBREwsQ0FDVTNCLE1BRFYsRUFFSzRCLEtBRkwsR0FFYUMsTUFGYixDQUVvQixVQUZwQixFQUdLQyxJQUhMLENBR1UsR0FIVixFQUdlUCxJQUhmLEVBSUtRLEtBSkwsQ0FJVyxRQUpYLEVBSXFCLFVBQUNaLENBQUQsRUFBSWYsQ0FBSixFQUFVO0FBQ3ZCLHVCQUFPcUIsV0FBV08sT0FBWCxDQUFtQjVCLENBQW5CLENBQVA7QUFDSCxhQU5MLEVBT0syQixLQVBMLENBT1csTUFQWCxFQU9tQixVQUFDWixDQUFELEVBQUlmLENBQUosRUFBVTtBQUNyQix1QkFBT3FCLFdBQVdPLE9BQVgsQ0FBbUI1QixDQUFuQixDQUFQO0FBQ0gsYUFUTDs7QUFXQSxtQkFBTyxtQkFBUTZCLE9BQVIsQ0FBZ0IsQ0FBQ3pDLEtBQUQsRUFBUUMsU0FBUixFQUFtQkMsQ0FBbkIsQ0FBaEIsQ0FBUDtBQUNIOzs7Ozs7a0JBR1VOLGtCIiwiZmlsZSI6ImdyYXBocy9sYXlvdXRzL1N0YWNrZWRTdHJlYW1DaGFydC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBCYXNlR3JhcGggZnJvbSAnLi4vQmFzZUdyYXBoJztcbmltcG9ydCBDb2xvdXJUYWJsZSBmcm9tICcuLi8uLi9kYXRhL2x1dC9Db2xvdXJUYWJsZSc7XG5cbi8vIEZJWE1FOiB1cGRhdGUgdGhpcyB0byB1c2UgZDMgNC54XG5cbmNsYXNzIFN0YWNrZWRTdHJlYW1DaGFydCBleHRlbmRzIEJhc2VHcmFwaCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fcXVhbnRpemUgPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcvbGF5b3V0cy9TdGFja2VkU3RyZWFtQ2hhcnQuanNvbicpLnF1YW50aXplO1xuICAgIH1cblxuICAgIGRyYXdDb250ZW50KGQzZW52LCBsYXllckRhdGEsIGcpIHtcbiAgICAgICAgc3VwZXIuZHJhd0NvbnRlbnQoKTtcblxuICAgICAgICAvLyBUT0RPOiBmaXggc3RhY2tlZCBzdHJlYW0gbGF5b3V0XG5cbiAgICAgICAgZDNlbnYubGF5b3V0Q29uZmlnID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uZmlnL2xheW91dHMvU3RhY2tlZFN0cmVhbUNoYXJ0Lmpzb24nKTtcblxuICAgICAgICBsZXQgc3RhY2sgPSBkM2Vudi5kMy5sYXlvdXQuc3RhY2soKS5vZmZzZXQoJ3dpZ2dsZScpLFxuICAgICAgICAgICAgbGF5ZXJzID0gc3RhY2soZDNlbnYuZDMucmFuZ2UobGF5ZXJEYXRhLmxlbmd0aCkubWFwKGZ1bmN0aW9uIChpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxheWVyRGF0YVtpXTtcbiAgICAgICAgICAgIH0pKTtcblxuICAgICAgICBsZXQgeCA9IGQzZW52LmQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAuZG9tYWluKFswLCBkM2Vudi5kdXJhdGlvbl0pXG4gICAgICAgICAgICAucmFuZ2UoWzAsIGQzZW52LndpZHRoXSk7XG5cbiAgICAgICAgZDNlbnYueEF4aXMgPSBkM2Vudi5kMy5zdmcuYXhpcygpLnNjYWxlKHgpXG4gICAgICAgICAgICAub3JpZW50KCdib3R0b20nKS50aWNrcyhkM2Vudi5kdXJhdGlvbiAqIDAuMSk7XG5cbiAgICAgICAgbGV0IHltYXggPSBkM2Vudi5kMy5tYXgobGF5ZXJzLCBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDNlbnYuZDMubWF4KGxheWVyLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC55MCArIGQueTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgeSA9IGQzZW52LmQzLnNjYWxlLmxpbmVhcigpXG4gICAgICAgICAgICAgICAgLmRvbWFpbihbMCwgeW1heF0pXG4gICAgICAgICAgICAgICAgLnJhbmdlKFtkM2Vudi5oZWlnaHQsIDBdKTtcblxuICAgICAgICBsZXQgYXJlYSA9IGQzZW52LmQzLnN2Zy5hcmVhKClcbiAgICAgICAgICAgIC54KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHgoZC54KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueTAoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geShkLnkwKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAueTEoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geShkLnkwICsgZC55KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxldCBjb2xvdXJMaXN0ID0gbmV3IENvbG91clRhYmxlKGxheWVyRGF0YS5sZW5ndGgsIDUpO1xuXG4gICAgICAgIGcuc2VsZWN0QWxsKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAuZGF0YShsYXllcnMpXG4gICAgICAgICAgICAuZW50ZXIoKS5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgYXJlYSlcbiAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29sb3VyTGlzdC5jb2xvdXJzW2ldO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG91ckxpc3QuY29sb3Vyc1tpXTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoW2QzZW52LCBsYXllckRhdGEsIGddKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0YWNrZWRTdHJlYW1DaGFydDsiXX0=
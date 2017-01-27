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

var _BaseGraph2 = require('../BaseGraph');

var _BaseGraph3 = _interopRequireDefault(_BaseGraph2);

var _ColourTable = require('../../data/lut/ColourTable');

var _ColourTable2 = _interopRequireDefault(_ColourTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// FIXME: update this to use d3 4.x

var LineChart = function (_BaseGraph) {
    (0, _inherits3.default)(LineChart, _BaseGraph);

    function LineChart() {
        (0, _classCallCheck3.default)(this, LineChart);
        return (0, _possibleConstructorReturn3.default)(this, (LineChart.__proto__ || (0, _getPrototypeOf2.default)(LineChart)).call(this));
    }

    (0, _createClass3.default)(LineChart, [{
        key: 'drawContent',
        value: function drawContent(d3env, layerData, g) {
            (0, _get3.default)(LineChart.prototype.__proto__ || (0, _getPrototypeOf2.default)(LineChart.prototype), 'drawContent', this).call(this);

            d3env.layoutConfig = require('../../../config/layouts/LineChart.json');

            var x = d3env.d3.scale.linear().range([0, d3env.width]),
                y = d3env.d3.scale.linear().range([d3env.height, 0]);

            var line = d3env.d3.svg.line().x(function (d) {
                return x(d.x);
            }).y(function (d) {
                return y(d.y);
            });

            x.domain([d3env.minX, d3env.maxX]);
            y.domain([d3env.minY, d3env.maxY]);

            var colourList = new _ColourTable2.default(layerData.length, 5);

            if (d3env.layoutConfig.xAxis.show) {
                d3env.xAxis = d3env.d3.svg.axis().scale(x).orient('bottom').ticks(d3env.maxX / d3env.layoutConfig.xAxis.scaleTicks);
                g.append('g').attr('class', 'x axis').style('color', d3env.layoutConfig.xAxis.colour).style('fill', 'none').style('stroke', d3env.layoutConfig.xAxis.colour).style('stroke-width', d3env.layoutConfig.xAxis['stroke-width']).attr('transform', 'translate(0,' + d3env.height + ')').call(d3env.xAxis);
            }

            for (var i in layerData) {
                g.append('svg:path').attr('class', 'line').style('stroke', colourList.colours[i]).style('fill', 'none').style('alpha', '0.8').style('stroke-width', '0.8').attr('d', line(layerData[i]));
            }

            // TODO: plotter croaks on very large values because of axis ticks

            if (d3env.layoutConfig.yAxis.show) {
                d3env.yAxis = d3env.d3.svg.axis().scale(y).orient('left').ticks(d3env.maxY / d3env.layoutConfig.yAxis.scaleTicks);
                g.append('g').attr('class', 'y axis').style('color', d3env.layoutConfig.yAxis.colour).style('fill', 'none').style('stroke', d3env.layoutConfig.yAxis.colour).style('stroke-width', d3env.layoutConfig.yAxis['stroke-width']).call(d3env.yAxis);
            }

            return _bluebird2.default.resolve([d3env, layerData, g]);
        }
    }]);
    return LineChart;
}(_BaseGraph3.default);

exports.default = LineChart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9sYXlvdXRzL0xpbmVDaGFydC5qcyJdLCJuYW1lcyI6WyJMaW5lQ2hhcnQiLCJkM2VudiIsImxheWVyRGF0YSIsImciLCJsYXlvdXRDb25maWciLCJyZXF1aXJlIiwieCIsImQzIiwic2NhbGUiLCJsaW5lYXIiLCJyYW5nZSIsIndpZHRoIiwieSIsImhlaWdodCIsImxpbmUiLCJzdmciLCJkIiwiZG9tYWluIiwibWluWCIsIm1heFgiLCJtaW5ZIiwibWF4WSIsImNvbG91ckxpc3QiLCJsZW5ndGgiLCJ4QXhpcyIsInNob3ciLCJheGlzIiwib3JpZW50IiwidGlja3MiLCJzY2FsZVRpY2tzIiwiYXBwZW5kIiwiYXR0ciIsInN0eWxlIiwiY29sb3VyIiwiY2FsbCIsImkiLCJjb2xvdXJzIiwieUF4aXMiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBOztJQUVNQSxTOzs7QUFDRix5QkFBYztBQUFBO0FBQUE7QUFFYjs7OztvQ0FFV0MsSyxFQUFPQyxTLEVBQVdDLEMsRUFBRztBQUM3Qjs7QUFFQUYsa0JBQU1HLFlBQU4sR0FBcUJDLFFBQVEsd0NBQVIsQ0FBckI7O0FBRUEsZ0JBQUlDLElBQUlMLE1BQU1NLEVBQU4sQ0FBU0MsS0FBVCxDQUFlQyxNQUFmLEdBQXdCQyxLQUF4QixDQUE4QixDQUFDLENBQUQsRUFBSVQsTUFBTVUsS0FBVixDQUE5QixDQUFSO0FBQUEsZ0JBQ0lDLElBQUlYLE1BQU1NLEVBQU4sQ0FBU0MsS0FBVCxDQUFlQyxNQUFmLEdBQXdCQyxLQUF4QixDQUE4QixDQUFDVCxNQUFNWSxNQUFQLEVBQWUsQ0FBZixDQUE5QixDQURSOztBQUdBLGdCQUFJQyxPQUFPYixNQUFNTSxFQUFOLENBQVNRLEdBQVQsQ0FBYUQsSUFBYixHQUNOUixDQURNLENBQ0osVUFBQ1UsQ0FBRCxFQUFPO0FBQUUsdUJBQU9WLEVBQUVVLEVBQUVWLENBQUosQ0FBUDtBQUFnQixhQURyQixFQUVOTSxDQUZNLENBRUosVUFBQ0ksQ0FBRCxFQUFPO0FBQUUsdUJBQU9KLEVBQUVJLEVBQUVKLENBQUosQ0FBUDtBQUFnQixhQUZyQixDQUFYOztBQUlBTixjQUFFVyxNQUFGLENBQVMsQ0FBQ2hCLE1BQU1pQixJQUFQLEVBQWFqQixNQUFNa0IsSUFBbkIsQ0FBVDtBQUNBUCxjQUFFSyxNQUFGLENBQVMsQ0FBQ2hCLE1BQU1tQixJQUFQLEVBQWFuQixNQUFNb0IsSUFBbkIsQ0FBVDs7QUFFQSxnQkFBSUMsYUFBYSwwQkFBZ0JwQixVQUFVcUIsTUFBMUIsRUFBa0MsQ0FBbEMsQ0FBakI7O0FBRUEsZ0JBQUl0QixNQUFNRyxZQUFOLENBQW1Cb0IsS0FBbkIsQ0FBeUJDLElBQTdCLEVBQW1DO0FBQy9CeEIsc0JBQU11QixLQUFOLEdBQWN2QixNQUFNTSxFQUFOLENBQVNRLEdBQVQsQ0FBYVcsSUFBYixHQUFvQmxCLEtBQXBCLENBQTBCRixDQUExQixFQUNUcUIsTUFEUyxDQUNGLFFBREUsRUFDUUMsS0FEUixDQUNjM0IsTUFBTWtCLElBQU4sR0FBYWxCLE1BQU1HLFlBQU4sQ0FBbUJvQixLQUFuQixDQUF5QkssVUFEcEQsQ0FBZDtBQUVBMUIsa0JBQUUyQixNQUFGLENBQVMsR0FBVCxFQUNLQyxJQURMLENBQ1UsT0FEVixFQUNtQixRQURuQixFQUVLQyxLQUZMLENBRVcsT0FGWCxFQUVvQi9CLE1BQU1HLFlBQU4sQ0FBbUJvQixLQUFuQixDQUF5QlMsTUFGN0MsRUFHS0QsS0FITCxDQUdXLE1BSFgsRUFHbUIsTUFIbkIsRUFJS0EsS0FKTCxDQUlXLFFBSlgsRUFJcUIvQixNQUFNRyxZQUFOLENBQW1Cb0IsS0FBbkIsQ0FBeUJTLE1BSjlDLEVBS0tELEtBTEwsQ0FLVyxjQUxYLEVBSzJCL0IsTUFBTUcsWUFBTixDQUFtQm9CLEtBQW5CLENBQXlCLGNBQXpCLENBTDNCLEVBTUtPLElBTkwsQ0FNVSxXQU5WLEVBTXVCLGlCQUFpQjlCLE1BQU1ZLE1BQXZCLEdBQWdDLEdBTnZELEVBT0txQixJQVBMLENBT1VqQyxNQUFNdUIsS0FQaEI7QUFRSDs7QUFFRCxpQkFBSyxJQUFJVyxDQUFULElBQWNqQyxTQUFkLEVBQXlCO0FBQ3JCQyxrQkFBRTJCLE1BQUYsQ0FBUyxVQUFULEVBQ0tDLElBREwsQ0FDVSxPQURWLEVBQ21CLE1BRG5CLEVBRUtDLEtBRkwsQ0FFVyxRQUZYLEVBRXFCVixXQUFXYyxPQUFYLENBQW1CRCxDQUFuQixDQUZyQixFQUdLSCxLQUhMLENBR1csTUFIWCxFQUdtQixNQUhuQixFQUlLQSxLQUpMLENBSVcsT0FKWCxFQUlvQixLQUpwQixFQUtLQSxLQUxMLENBS1csY0FMWCxFQUsyQixLQUwzQixFQU1LRCxJQU5MLENBTVUsR0FOVixFQU1lakIsS0FBS1osVUFBVWlDLENBQVYsQ0FBTCxDQU5mO0FBT0g7O0FBRUQ7O0FBRUEsZ0JBQUlsQyxNQUFNRyxZQUFOLENBQW1CaUMsS0FBbkIsQ0FBeUJaLElBQTdCLEVBQW1DO0FBQy9CeEIsc0JBQU1vQyxLQUFOLEdBQWNwQyxNQUFNTSxFQUFOLENBQVNRLEdBQVQsQ0FBYVcsSUFBYixHQUFvQmxCLEtBQXBCLENBQTBCSSxDQUExQixFQUNUZSxNQURTLENBQ0YsTUFERSxFQUNNQyxLQUROLENBQ1kzQixNQUFNb0IsSUFBTixHQUFhcEIsTUFBTUcsWUFBTixDQUFtQmlDLEtBQW5CLENBQXlCUixVQURsRCxDQUFkO0FBRUExQixrQkFBRTJCLE1BQUYsQ0FBUyxHQUFULEVBQ0tDLElBREwsQ0FDVSxPQURWLEVBQ21CLFFBRG5CLEVBRUtDLEtBRkwsQ0FFVyxPQUZYLEVBRW9CL0IsTUFBTUcsWUFBTixDQUFtQmlDLEtBQW5CLENBQXlCSixNQUY3QyxFQUdLRCxLQUhMLENBR1csTUFIWCxFQUdtQixNQUhuQixFQUlLQSxLQUpMLENBSVcsUUFKWCxFQUlxQi9CLE1BQU1HLFlBQU4sQ0FBbUJpQyxLQUFuQixDQUF5QkosTUFKOUMsRUFLS0QsS0FMTCxDQUtXLGNBTFgsRUFLMkIvQixNQUFNRyxZQUFOLENBQW1CaUMsS0FBbkIsQ0FBeUIsY0FBekIsQ0FMM0IsRUFNS0gsSUFOTCxDQU1VakMsTUFBTW9DLEtBTmhCO0FBT0g7O0FBRUQsbUJBQU8sbUJBQVFDLE9BQVIsQ0FBZ0IsQ0FBQ3JDLEtBQUQsRUFBUUMsU0FBUixFQUFtQkMsQ0FBbkIsQ0FBaEIsQ0FBUDtBQUNIOzs7OztrQkFHVUgsUyIsImZpbGUiOiJncmFwaHMvbGF5b3V0cy9MaW5lQ2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgQmFzZUdyYXBoIGZyb20gJy4uL0Jhc2VHcmFwaCc7XG5pbXBvcnQgQ29sb3VyVGFibGUgZnJvbSAnLi4vLi4vZGF0YS9sdXQvQ29sb3VyVGFibGUnO1xuXG4vLyBGSVhNRTogdXBkYXRlIHRoaXMgdG8gdXNlIGQzIDQueFxuXG5jbGFzcyBMaW5lQ2hhcnQgZXh0ZW5kcyBCYXNlR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGRyYXdDb250ZW50KGQzZW52LCBsYXllckRhdGEsIGcpIHtcbiAgICAgICAgc3VwZXIuZHJhd0NvbnRlbnQoKTtcblxuICAgICAgICBkM2Vudi5sYXlvdXRDb25maWcgPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcvbGF5b3V0cy9MaW5lQ2hhcnQuanNvbicpO1xuXG4gICAgICAgIGxldCB4ID0gZDNlbnYuZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIGQzZW52LndpZHRoXSksXG4gICAgICAgICAgICB5ID0gZDNlbnYuZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW2QzZW52LmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGxldCBsaW5lID0gZDNlbnYuZDMuc3ZnLmxpbmUoKVxuICAgICAgICAgICAgLngoKGQpID0+IHsgcmV0dXJuIHgoZC54KTsgfSlcbiAgICAgICAgICAgIC55KChkKSA9PiB7IHJldHVybiB5KGQueSk7IH0pO1xuXG4gICAgICAgIHguZG9tYWluKFtkM2Vudi5taW5YLCBkM2Vudi5tYXhYXSk7XG4gICAgICAgIHkuZG9tYWluKFtkM2Vudi5taW5ZLCBkM2Vudi5tYXhZXSk7XG5cbiAgICAgICAgbGV0IGNvbG91ckxpc3QgPSBuZXcgQ29sb3VyVGFibGUobGF5ZXJEYXRhLmxlbmd0aCwgNSk7XG5cbiAgICAgICAgaWYgKGQzZW52LmxheW91dENvbmZpZy54QXhpcy5zaG93KSB7XG4gICAgICAgICAgICBkM2Vudi54QXhpcyA9IGQzZW52LmQzLnN2Zy5heGlzKCkuc2NhbGUoeClcbiAgICAgICAgICAgICAgICAub3JpZW50KCdib3R0b20nKS50aWNrcyhkM2Vudi5tYXhYIC8gZDNlbnYubGF5b3V0Q29uZmlnLnhBeGlzLnNjYWxlVGlja3MpO1xuICAgICAgICAgICAgZy5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnY29sb3InLCBkM2Vudi5sYXlvdXRDb25maWcueEF4aXMuY29sb3VyKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQzZW52LmxheW91dENvbmZpZy54QXhpcy5jb2xvdXIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBkM2Vudi5sYXlvdXRDb25maWcueEF4aXNbJ3N0cm9rZS13aWR0aCddKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGQzZW52LmhlaWdodCArICcpJylcbiAgICAgICAgICAgICAgICAuY2FsbChkM2Vudi54QXhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpIGluIGxheWVyRGF0YSkge1xuICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBjb2xvdXJMaXN0LmNvbG91cnNbaV0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYWxwaGEnLCAnMC44JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsICcwLjgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZShsYXllckRhdGFbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IHBsb3R0ZXIgY3JvYWtzIG9uIHZlcnkgbGFyZ2UgdmFsdWVzIGJlY2F1c2Ugb2YgYXhpcyB0aWNrc1xuXG4gICAgICAgIGlmIChkM2Vudi5sYXlvdXRDb25maWcueUF4aXMuc2hvdykge1xuICAgICAgICAgICAgZDNlbnYueUF4aXMgPSBkM2Vudi5kMy5zdmcuYXhpcygpLnNjYWxlKHkpXG4gICAgICAgICAgICAgICAgLm9yaWVudCgnbGVmdCcpLnRpY2tzKGQzZW52Lm1heFkgLyBkM2Vudi5sYXlvdXRDb25maWcueUF4aXMuc2NhbGVUaWNrcyk7XG4gICAgICAgICAgICBnLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdjb2xvcicsIGQzZW52LmxheW91dENvbmZpZy55QXhpcy5jb2xvdXIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZDNlbnYubGF5b3V0Q29uZmlnLnlBeGlzLmNvbG91cilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGQzZW52LmxheW91dENvbmZpZy55QXhpc1snc3Ryb2tlLXdpZHRoJ10pXG4gICAgICAgICAgICAgICAgLmNhbGwoZDNlbnYueUF4aXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbZDNlbnYsIGxheWVyRGF0YSwgZ10pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZUNoYXJ0OyJdfQ==
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

var LineChart = function (_BaseGraph) {
    _inherits(LineChart, _BaseGraph);

    function LineChart() {
        _classCallCheck(this, LineChart);

        return _possibleConstructorReturn(this, (LineChart.__proto__ || Object.getPrototypeOf(LineChart)).call(this));
    }

    _createClass(LineChart, [{
        key: 'drawContent',
        value: function drawContent(d3env, layerData, g) {
            _get(LineChart.prototype.__proto__ || Object.getPrototypeOf(LineChart.prototype), 'drawContent', this).call(this);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9sYXlvdXRzL0xpbmVDaGFydC5qcyJdLCJuYW1lcyI6WyJMaW5lQ2hhcnQiLCJkM2VudiIsImxheWVyRGF0YSIsImciLCJsYXlvdXRDb25maWciLCJyZXF1aXJlIiwieCIsImQzIiwic2NhbGUiLCJsaW5lYXIiLCJyYW5nZSIsIndpZHRoIiwieSIsImhlaWdodCIsImxpbmUiLCJzdmciLCJkIiwiZG9tYWluIiwibWluWCIsIm1heFgiLCJtaW5ZIiwibWF4WSIsImNvbG91ckxpc3QiLCJsZW5ndGgiLCJ4QXhpcyIsInNob3ciLCJheGlzIiwib3JpZW50IiwidGlja3MiLCJzY2FsZVRpY2tzIiwiYXBwZW5kIiwiYXR0ciIsInN0eWxlIiwiY29sb3VyIiwiY2FsbCIsImkiLCJjb2xvdXJzIiwieUF4aXMiLCJyZXNvbHZlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7SUFFTUEsUzs7O0FBQ0YseUJBQWM7QUFBQTs7QUFBQTtBQUViOzs7O29DQUVXQyxLLEVBQU9DLFMsRUFBV0MsQyxFQUFHO0FBQzdCOztBQUVBRixrQkFBTUcsWUFBTixHQUFxQkMsUUFBUSx3Q0FBUixDQUFyQjs7QUFFQSxnQkFBSUMsSUFBSUwsTUFBTU0sRUFBTixDQUFTQyxLQUFULENBQWVDLE1BQWYsR0FBd0JDLEtBQXhCLENBQThCLENBQUMsQ0FBRCxFQUFJVCxNQUFNVSxLQUFWLENBQTlCLENBQVI7QUFBQSxnQkFDSUMsSUFBSVgsTUFBTU0sRUFBTixDQUFTQyxLQUFULENBQWVDLE1BQWYsR0FBd0JDLEtBQXhCLENBQThCLENBQUNULE1BQU1ZLE1BQVAsRUFBZSxDQUFmLENBQTlCLENBRFI7O0FBR0EsZ0JBQUlDLE9BQU9iLE1BQU1NLEVBQU4sQ0FBU1EsR0FBVCxDQUFhRCxJQUFiLEdBQ05SLENBRE0sQ0FDSixVQUFDVSxDQUFELEVBQU87QUFBRSx1QkFBT1YsRUFBRVUsRUFBRVYsQ0FBSixDQUFQO0FBQWdC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QUwzQixFQU1LSCxJQU5MLENBTVVqQyxNQUFNb0MsS0FOaEI7QUFPSDs7QUFFRCxtQkFBTyxtQkFBUUMsT0FBUixDQUFnQixDQUFDckMsS0FBRCxFQUFRQyxTQUFSLEVBQW1CQyxDQUFuQixDQUFoQixDQUFQO0FBQ0g7Ozs7OztrQkFHVUgsUyIsImZpbGUiOiJncmFwaHMvbGF5b3V0cy9MaW5lQ2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgQmFzZUdyYXBoIGZyb20gJy4uL0Jhc2VHcmFwaCc7XG5pbXBvcnQgQ29sb3VyVGFibGUgZnJvbSAnLi4vLi4vZGF0YS9sdXQvQ29sb3VyVGFibGUnO1xuXG4vLyBGSVhNRTogdXBkYXRlIHRoaXMgdG8gdXNlIGQzIDQueFxuXG5jbGFzcyBMaW5lQ2hhcnQgZXh0ZW5kcyBCYXNlR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGRyYXdDb250ZW50KGQzZW52LCBsYXllckRhdGEsIGcpIHtcbiAgICAgICAgc3VwZXIuZHJhd0NvbnRlbnQoKTtcblxuICAgICAgICBkM2Vudi5sYXlvdXRDb25maWcgPSByZXF1aXJlKCcuLi8uLi8uLi9jb25maWcvbGF5b3V0cy9MaW5lQ2hhcnQuanNvbicpO1xuXG4gICAgICAgIGxldCB4ID0gZDNlbnYuZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoWzAsIGQzZW52LndpZHRoXSksXG4gICAgICAgICAgICB5ID0gZDNlbnYuZDMuc2NhbGUubGluZWFyKCkucmFuZ2UoW2QzZW52LmhlaWdodCwgMF0pO1xuXG4gICAgICAgIGxldCBsaW5lID0gZDNlbnYuZDMuc3ZnLmxpbmUoKVxuICAgICAgICAgICAgLngoKGQpID0+IHsgcmV0dXJuIHgoZC54KTsgfSlcbiAgICAgICAgICAgIC55KChkKSA9PiB7IHJldHVybiB5KGQueSk7IH0pO1xuXG4gICAgICAgIHguZG9tYWluKFtkM2Vudi5taW5YLCBkM2Vudi5tYXhYXSk7XG4gICAgICAgIHkuZG9tYWluKFtkM2Vudi5taW5ZLCBkM2Vudi5tYXhZXSk7XG5cbiAgICAgICAgbGV0IGNvbG91ckxpc3QgPSBuZXcgQ29sb3VyVGFibGUobGF5ZXJEYXRhLmxlbmd0aCwgNSk7XG5cbiAgICAgICAgaWYgKGQzZW52LmxheW91dENvbmZpZy54QXhpcy5zaG93KSB7XG4gICAgICAgICAgICBkM2Vudi54QXhpcyA9IGQzZW52LmQzLnN2Zy5heGlzKCkuc2NhbGUoeClcbiAgICAgICAgICAgICAgICAub3JpZW50KCdib3R0b20nKS50aWNrcyhkM2Vudi5tYXhYIC8gZDNlbnYubGF5b3V0Q29uZmlnLnhBeGlzLnNjYWxlVGlja3MpO1xuICAgICAgICAgICAgZy5hcHBlbmQoJ2cnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd4IGF4aXMnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnY29sb3InLCBkM2Vudi5sYXlvdXRDb25maWcueEF4aXMuY29sb3VyKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnZmlsbCcsICdub25lJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIGQzZW52LmxheW91dENvbmZpZy54QXhpcy5jb2xvdXIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCBkM2Vudi5sYXlvdXRDb25maWcueEF4aXNbJ3N0cm9rZS13aWR0aCddKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKDAsJyArIGQzZW52LmhlaWdodCArICcpJylcbiAgICAgICAgICAgICAgICAuY2FsbChkM2Vudi54QXhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpIGluIGxheWVyRGF0YSkge1xuICAgICAgICAgICAgZy5hcHBlbmQoJ3N2ZzpwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGluZScpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2UnLCBjb2xvdXJMaXN0LmNvbG91cnNbaV0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYWxwaGEnLCAnMC44JylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsICcwLjgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgbGluZShsYXllckRhdGFbaV0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IHBsb3R0ZXIgY3JvYWtzIG9uIHZlcnkgbGFyZ2UgdmFsdWVzIGJlY2F1c2Ugb2YgYXhpcyB0aWNrc1xuXG4gICAgICAgIGlmIChkM2Vudi5sYXlvdXRDb25maWcueUF4aXMuc2hvdykge1xuICAgICAgICAgICAgZDNlbnYueUF4aXMgPSBkM2Vudi5kMy5zdmcuYXhpcygpLnNjYWxlKHkpXG4gICAgICAgICAgICAgICAgLm9yaWVudCgnbGVmdCcpLnRpY2tzKGQzZW52Lm1heFkgLyBkM2Vudi5sYXlvdXRDb25maWcueUF4aXMuc2NhbGVUaWNrcyk7XG4gICAgICAgICAgICBnLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3kgYXhpcycpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdjb2xvcicsIGQzZW52LmxheW91dENvbmZpZy55QXhpcy5jb2xvdXIpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlJywgZDNlbnYubGF5b3V0Q29uZmlnLnlBeGlzLmNvbG91cilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGQzZW52LmxheW91dENvbmZpZy55QXhpc1snc3Ryb2tlLXdpZHRoJ10pXG4gICAgICAgICAgICAgICAgLmNhbGwoZDNlbnYueUF4aXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShbZDNlbnYsIGxheWVyRGF0YSwgZ10pO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGluZUNoYXJ0OyJdfQ==
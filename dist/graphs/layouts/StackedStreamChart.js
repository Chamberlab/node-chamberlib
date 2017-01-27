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

var StackedStreamChart = function (_BaseGraph) {
    (0, _inherits3.default)(StackedStreamChart, _BaseGraph);

    function StackedStreamChart() {
        (0, _classCallCheck3.default)(this, StackedStreamChart);

        var _this = (0, _possibleConstructorReturn3.default)(this, (StackedStreamChart.__proto__ || (0, _getPrototypeOf2.default)(StackedStreamChart)).call(this));

        _this._quantize = require('../../../config/layouts/StackedStreamChart.json').quantize;
        return _this;
    }

    (0, _createClass3.default)(StackedStreamChart, [{
        key: 'drawContent',
        value: function drawContent(d3env, layerData, g) {
            (0, _get3.default)(StackedStreamChart.prototype.__proto__ || (0, _getPrototypeOf2.default)(StackedStreamChart.prototype), 'drawContent', this).call(this);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyYXBocy9sYXlvdXRzL1N0YWNrZWRTdHJlYW1DaGFydC5qcyJdLCJuYW1lcyI6WyJTdGFja2VkU3RyZWFtQ2hhcnQiLCJfcXVhbnRpemUiLCJyZXF1aXJlIiwicXVhbnRpemUiLCJkM2VudiIsImxheWVyRGF0YSIsImciLCJsYXlvdXRDb25maWciLCJzdGFjayIsImQzIiwibGF5b3V0Iiwib2Zmc2V0IiwibGF5ZXJzIiwicmFuZ2UiLCJsZW5ndGgiLCJtYXAiLCJpIiwieCIsInNjYWxlIiwibGluZWFyIiwiZG9tYWluIiwiZHVyYXRpb24iLCJ3aWR0aCIsInhBeGlzIiwic3ZnIiwiYXhpcyIsIm9yaWVudCIsInRpY2tzIiwieW1heCIsIm1heCIsImxheWVyIiwiZCIsInkwIiwieSIsImhlaWdodCIsImFyZWEiLCJ5MSIsImNvbG91ckxpc3QiLCJzZWxlY3RBbGwiLCJkYXRhIiwiZW50ZXIiLCJhcHBlbmQiLCJhdHRyIiwic3R5bGUiLCJjb2xvdXJzIiwicmVzb2x2ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7SUFFTUEsa0I7OztBQUNGLGtDQUFjO0FBQUE7O0FBQUE7O0FBR1YsY0FBS0MsU0FBTCxHQUFpQkMsUUFBUSxpREFBUixFQUEyREMsUUFBNUU7QUFIVTtBQUliOzs7O29DQUVXQyxLLEVBQU9DLFMsRUFBV0MsQyxFQUFHO0FBQzdCOztBQUVBOztBQUVBRixrQkFBTUcsWUFBTixHQUFxQkwsUUFBUSxpREFBUixDQUFyQjs7QUFFQSxnQkFBSU0sUUFBUUosTUFBTUssRUFBTixDQUFTQyxNQUFULENBQWdCRixLQUFoQixHQUF3QkcsTUFBeEIsQ0FBK0IsUUFBL0IsQ0FBWjtBQUFBLGdCQUNJQyxTQUFTSixNQUFNSixNQUFNSyxFQUFOLENBQVNJLEtBQVQsQ0FBZVIsVUFBVVMsTUFBekIsRUFBaUNDLEdBQWpDLENBQXFDLFVBQVVDLENBQVYsRUFBYTtBQUM3RCx1QkFBT1gsVUFBVVcsQ0FBVixDQUFQO0FBQ0gsYUFGYyxDQUFOLENBRGI7O0FBS0EsZ0JBQUlDLElBQUliLE1BQU1LLEVBQU4sQ0FBU1MsS0FBVCxDQUFlQyxNQUFmLEdBQ0hDLE1BREcsQ0FDSSxDQUFDLENBQUQsRUFBSWhCLE1BQU1pQixRQUFWLENBREosRUFFSFIsS0FGRyxDQUVHLENBQUMsQ0FBRCxFQUFJVCxNQUFNa0IsS0FBVixDQUZILENBQVI7O0FBSUFsQixrQkFBTW1CLEtBQU4sR0FBY25CLE1BQU1LLEVBQU4sQ0FBU2UsR0FBVCxDQUFhQyxJQUFiLEdBQW9CUCxLQUFwQixDQUEwQkQsQ0FBMUIsRUFDVFMsTUFEUyxDQUNGLFFBREUsRUFDUUMsS0FEUixDQUNjdkIsTUFBTWlCLFFBQU4sR0FBaUIsR0FEL0IsQ0FBZDs7QUFHQSxnQkFBSU8sT0FBT3hCLE1BQU1LLEVBQU4sQ0FBU29CLEdBQVQsQ0FBYWpCLE1BQWIsRUFBcUIsVUFBVWtCLEtBQVYsRUFBaUI7QUFDekMsdUJBQU8xQixNQUFNSyxFQUFOLENBQVNvQixHQUFULENBQWFDLEtBQWIsRUFBb0IsVUFBVUMsQ0FBVixFQUFhO0FBQ3BDLDJCQUFPQSxFQUFFQyxFQUFGLEdBQU9ELEVBQUVFLENBQWhCO0FBQ0gsaUJBRk0sQ0FBUDtBQUdILGFBSk0sQ0FBWDtBQUFBLGdCQUtJQSxJQUFJN0IsTUFBTUssRUFBTixDQUFTUyxLQUFULENBQWVDLE1BQWYsR0FDQ0MsTUFERCxDQUNRLENBQUMsQ0FBRCxFQUFJUSxJQUFKLENBRFIsRUFFQ2YsS0FGRCxDQUVPLENBQUNULE1BQU04QixNQUFQLEVBQWUsQ0FBZixDQUZQLENBTFI7O0FBU0EsZ0JBQUlDLE9BQU8vQixNQUFNSyxFQUFOLENBQVNlLEdBQVQsQ0FBYVcsSUFBYixHQUNObEIsQ0FETSxDQUNKLFVBQVVjLENBQVYsRUFBYTtBQUNaLHVCQUFPZCxFQUFFYyxFQUFFZCxDQUFKLENBQVA7QUFDSCxhQUhNLEVBSU5lLEVBSk0sQ0FJSCxVQUFVRCxDQUFWLEVBQWE7QUFDYix1QkFBT0UsRUFBRUYsRUFBRUMsRUFBSixDQUFQO0FBQ0gsYUFOTSxFQU9OSSxFQVBNLENBT0gsVUFBVUwsQ0FBVixFQUFhO0FBQ2IsdUJBQU9FLEVBQUVGLEVBQUVDLEVBQUYsR0FBT0QsRUFBRUUsQ0FBWCxDQUFQO0FBQ0gsYUFUTSxDQUFYOztBQVdBLGdCQUFJSSxhQUFhLDBCQUFnQmhDLFVBQVVTLE1BQTFCLEVBQWtDLENBQWxDLENBQWpCOztBQUVBUixjQUFFZ0MsU0FBRixDQUFZLFVBQVosRUFDS0MsSUFETCxDQUNVM0IsTUFEVixFQUVLNEIsS0FGTCxHQUVhQyxNQUZiLENBRW9CLFVBRnBCLEVBR0tDLElBSEwsQ0FHVSxHQUhWLEVBR2VQLElBSGYsRUFJS1EsS0FKTCxDQUlXLFFBSlgsRUFJcUIsVUFBQ1osQ0FBRCxFQUFJZixDQUFKLEVBQVU7QUFDdkIsdUJBQU9xQixXQUFXTyxPQUFYLENBQW1CNUIsQ0FBbkIsQ0FBUDtBQUNILGFBTkwsRUFPSzJCLEtBUEwsQ0FPVyxNQVBYLEVBT21CLFVBQUNaLENBQUQsRUFBSWYsQ0FBSixFQUFVO0FBQ3JCLHVCQUFPcUIsV0FBV08sT0FBWCxDQUFtQjVCLENBQW5CLENBQVA7QUFDSCxhQVRMOztBQVdBLG1CQUFPLG1CQUFRNkIsT0FBUixDQUFnQixDQUFDekMsS0FBRCxFQUFRQyxTQUFSLEVBQW1CQyxDQUFuQixDQUFoQixDQUFQO0FBQ0g7Ozs7O2tCQUdVTixrQiIsImZpbGUiOiJncmFwaHMvbGF5b3V0cy9TdGFja2VkU3RyZWFtQ2hhcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgQmFzZUdyYXBoIGZyb20gJy4uL0Jhc2VHcmFwaCc7XG5pbXBvcnQgQ29sb3VyVGFibGUgZnJvbSAnLi4vLi4vZGF0YS9sdXQvQ29sb3VyVGFibGUnO1xuXG4vLyBGSVhNRTogdXBkYXRlIHRoaXMgdG8gdXNlIGQzIDQueFxuXG5jbGFzcyBTdGFja2VkU3RyZWFtQ2hhcnQgZXh0ZW5kcyBCYXNlR3JhcGgge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3F1YW50aXplID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uZmlnL2xheW91dHMvU3RhY2tlZFN0cmVhbUNoYXJ0Lmpzb24nKS5xdWFudGl6ZTtcbiAgICB9XG5cbiAgICBkcmF3Q29udGVudChkM2VudiwgbGF5ZXJEYXRhLCBnKSB7XG4gICAgICAgIHN1cGVyLmRyYXdDb250ZW50KCk7XG5cbiAgICAgICAgLy8gVE9ETzogZml4IHN0YWNrZWQgc3RyZWFtIGxheW91dFxuXG4gICAgICAgIGQzZW52LmxheW91dENvbmZpZyA9IHJlcXVpcmUoJy4uLy4uLy4uL2NvbmZpZy9sYXlvdXRzL1N0YWNrZWRTdHJlYW1DaGFydC5qc29uJyk7XG5cbiAgICAgICAgbGV0IHN0YWNrID0gZDNlbnYuZDMubGF5b3V0LnN0YWNrKCkub2Zmc2V0KCd3aWdnbGUnKSxcbiAgICAgICAgICAgIGxheWVycyA9IHN0YWNrKGQzZW52LmQzLnJhbmdlKGxheWVyRGF0YS5sZW5ndGgpLm1hcChmdW5jdGlvbiAoaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYXllckRhdGFbaV07XG4gICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgbGV0IHggPSBkM2Vudi5kMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgLmRvbWFpbihbMCwgZDNlbnYuZHVyYXRpb25dKVxuICAgICAgICAgICAgLnJhbmdlKFswLCBkM2Vudi53aWR0aF0pO1xuXG4gICAgICAgIGQzZW52LnhBeGlzID0gZDNlbnYuZDMuc3ZnLmF4aXMoKS5zY2FsZSh4KVxuICAgICAgICAgICAgLm9yaWVudCgnYm90dG9tJykudGlja3MoZDNlbnYuZHVyYXRpb24gKiAwLjEpO1xuXG4gICAgICAgIGxldCB5bWF4ID0gZDNlbnYuZDMubWF4KGxheWVycywgZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQzZW52LmQzLm1heChsYXllciwgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQueTAgKyBkLnk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHkgPSBkM2Vudi5kMy5zY2FsZS5saW5lYXIoKVxuICAgICAgICAgICAgICAgIC5kb21haW4oWzAsIHltYXhdKVxuICAgICAgICAgICAgICAgIC5yYW5nZShbZDNlbnYuaGVpZ2h0LCAwXSk7XG5cbiAgICAgICAgbGV0IGFyZWEgPSBkM2Vudi5kMy5zdmcuYXJlYSgpXG4gICAgICAgICAgICAueChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB4KGQueCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkwKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHkoZC55MCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnkxKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHkoZC55MCArIGQueSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBsZXQgY29sb3VyTGlzdCA9IG5ldyBDb2xvdXJUYWJsZShsYXllckRhdGEubGVuZ3RoLCA1KTtcblxuICAgICAgICBnLnNlbGVjdEFsbCgnc3ZnOnBhdGgnKVxuICAgICAgICAgICAgLmRhdGEobGF5ZXJzKVxuICAgICAgICAgICAgLmVudGVyKCkuYXBwZW5kKCdzdmc6cGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIGFyZWEpXG4gICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsIChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbG91ckxpc3QuY29sb3Vyc1tpXTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAoZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBjb2xvdXJMaXN0LmNvbG91cnNbaV07XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKFtkM2VudiwgbGF5ZXJEYXRhLCBnXSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTdGFja2VkU3RyZWFtQ2hhcnQ7Il19
'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _uuid = require('uuid4');

var _uuid2 = _interopRequireDefault(_uuid);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _streamTransform = require('stream-transform');

var _streamTransform2 = _interopRequireDefault(_streamTransform);

var _index = require('../src/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_bluebird2.default.coroutine(regeneratorRuntime.mark(function _callee() {
    var tstart, importers, LMDB, csv, infile, metaOnly, rows, dataDir, lmdbDir, dataSize, dbname, meta, lmdb, txnUUID;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    tstart = Date.now(), importers = _index2.default.data.io.importers, LMDB = _index2.default.data.io.LMDB, csv = new importers.NanobrainsCSV(), infile = process.argv[2] || process.env.NB_INFILE_PATH, metaOnly = false;
                    rows = 0, dataDir = _path2.default.join(__dirname, '..', 'data', 'lmdb');


                    if (!_fs2.default.existsSync(dataDir)) {
                        _fs2.default.mkdirSync(dataDir);
                    }

                    console.log('Reading DataSet from CSV at ' + infile + ' into LMDB...');

                    lmdbDir = _path2.default.join(dataDir, _path2.default.parse(infile).name), dataSize = 0;


                    if (!_fs2.default.existsSync(lmdbDir)) {
                        _fs2.default.mkdirSync(lmdbDir);
                    }

                    dbname = _path2.default.parse(infile).name, meta = {
                        mapSize: 32 * Math.pow(1024, 3),
                        maxDbs: 10,
                        DataSet: {
                            title: dbname,
                            DataChannels: {}
                        }
                    };


                    meta.DataSet.DataChannels[dbname] = {
                        type: {
                            class: 'DataFrame',
                            type: 'Float32',
                            length: 0
                        },
                        keySize: 16,
                        keyPrecision: 6,
                        keyUnit: null,
                        units: [],
                        labels: [],
                        uuids: []
                    };

                    lmdb = new LMDB(lmdbDir, false, meta);
                    txnUUID = void 0;


                    if (!metaOnly) {
                        txnUUID = lmdb.begin(dbname, false);
                    }

                    _context.next = 13;
                    return new _bluebird2.default(function (resolve, reject) {
                        var writeStream = (0, _streamTransform2.default)(function lmdbTransform(entry, cb) {
                            if (rows > 0 && rows % 100000 === 0) {
                                console.log('Time spent importing ' + rows + ' rows containing ' + rows * dataSize + ' ' + ('events: ' + (Date.now() - tstart) * 0.001 + 's'));
                            }
                            if (rows > 3) {
                                if (metaOnly) {
                                    return resolve();
                                }
                                var ms = parseFloat(entry.shift()),
                                    values = new Float32Array(64);
                                entry.forEach(function (field, i) {
                                    values[i] = parseFloat(field) * 0.001;
                                });
                                lmdb.put(dbname, txnUUID, new _index2.default.events.DataFrame(new _index2.default.quantities.Time(ms * 0.001, 's'), values));
                            } else if (rows === 3) {
                                entry.shift();
                                var channel = meta.DataSet.DataChannels[dbname];
                                channel.keyUnit = 's';
                                channel.type.length = entry.length;
                                channel.units = new Array(channel.type.length);
                                channel.labels = new Array(channel.type.length);
                                channel.uuids = new Array(channel.type.length);
                                entry.forEach(function (field, i) {
                                    var label = field.split('_');
                                    channel.labels[i] = label[0];
                                    channel.units[i] = 'v';
                                    channel.uuids[i] = (0, _uuid2.default)();
                                });
                                dataSize = channel.type.length;
                            }
                            rows += 1;
                            return cb();
                        }, function (err) {
                            if (err) {
                                console.log(err.stack);
                                return reject(err);
                            }
                            lmdb.commit(txnUUID);
                            resolve();
                        });
                        csv.read(infile, writeStream);
                    });

                case 13:
                    _context.next = 15;
                    return lmdb.closeEnv();

                case 15:

                    console.log('Time spent importing ' + rows + ' rows containing ' + rows * dataSize + ' ' + ('events: ' + (Date.now() - tstart) * 0.001 + 's'));
                    console.log('LMDB files are ready at ' + dataDir);
                    process.exit(0);

                case 18:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}))().catch(function (err) {
    console.log('DataSet import error: ' + err.message + ' code: ' + err.code);
    process.exit(err.code);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5iLWxvYWQtY3N2LmpzIl0sIm5hbWVzIjpbImNvcm91dGluZSIsInRzdGFydCIsIkRhdGUiLCJub3ciLCJpbXBvcnRlcnMiLCJkYXRhIiwiaW8iLCJMTURCIiwiY3N2IiwiTmFub2JyYWluc0NTViIsImluZmlsZSIsInByb2Nlc3MiLCJhcmd2IiwiZW52IiwiTkJfSU5GSUxFX1BBVEgiLCJtZXRhT25seSIsInJvd3MiLCJkYXRhRGlyIiwiam9pbiIsIl9fZGlybmFtZSIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJjb25zb2xlIiwibG9nIiwibG1kYkRpciIsInBhcnNlIiwibmFtZSIsImRhdGFTaXplIiwiZGJuYW1lIiwibWV0YSIsIm1hcFNpemUiLCJNYXRoIiwicG93IiwibWF4RGJzIiwiRGF0YVNldCIsInRpdGxlIiwiRGF0YUNoYW5uZWxzIiwidHlwZSIsImNsYXNzIiwibGVuZ3RoIiwia2V5U2l6ZSIsImtleVByZWNpc2lvbiIsImtleVVuaXQiLCJ1bml0cyIsImxhYmVscyIsInV1aWRzIiwibG1kYiIsInR4blVVSUQiLCJiZWdpbiIsInJlc29sdmUiLCJyZWplY3QiLCJ3cml0ZVN0cmVhbSIsImxtZGJUcmFuc2Zvcm0iLCJlbnRyeSIsImNiIiwibXMiLCJwYXJzZUZsb2F0Iiwic2hpZnQiLCJ2YWx1ZXMiLCJGbG9hdDMyQXJyYXkiLCJmb3JFYWNoIiwiZmllbGQiLCJpIiwicHV0IiwiZXZlbnRzIiwiRGF0YUZyYW1lIiwicXVhbnRpdGllcyIsIlRpbWUiLCJjaGFubmVsIiwiQXJyYXkiLCJsYWJlbCIsInNwbGl0IiwiZXJyIiwic3RhY2siLCJjb21taXQiLCJyZWFkIiwiY2xvc2VFbnYiLCJleGl0IiwiY2F0Y2giLCJtZXNzYWdlIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLG1CQUFRQSxTQUFSLHlCQUFrQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDUkMsMEJBRFEsR0FDQ0MsS0FBS0MsR0FBTCxFQURELEVBRVZDLFNBRlUsR0FFRSxnQkFBR0MsSUFBSCxDQUFRQyxFQUFSLENBQVdGLFNBRmIsRUFHVkcsSUFIVSxHQUdILGdCQUFHRixJQUFILENBQVFDLEVBQVIsQ0FBV0MsSUFIUixFQUlWQyxHQUpVLEdBSUosSUFBSUosVUFBVUssYUFBZCxFQUpJLEVBS1ZDLE1BTFUsR0FLREMsUUFBUUMsSUFBUixDQUFhLENBQWIsS0FBbUJELFFBQVFFLEdBQVIsQ0FBWUMsY0FMOUIsRUFNVkMsUUFOVSxHQU1DLEtBTkQ7QUFRVkMsd0JBUlUsR0FRSCxDQVJHLEVBU1ZDLE9BVFUsR0FTQSxlQUFLQyxJQUFMLENBQVVDLFNBQVYsRUFBcUIsSUFBckIsRUFBMkIsTUFBM0IsRUFBbUMsTUFBbkMsQ0FUQTs7O0FBV2Qsd0JBQUksQ0FBQyxhQUFHQyxVQUFILENBQWNILE9BQWQsQ0FBTCxFQUE2QjtBQUFFLHFDQUFHSSxTQUFILENBQWFKLE9BQWI7QUFBd0I7O0FBRXZESyw0QkFBUUMsR0FBUixrQ0FBMkNiLE1BQTNDOztBQUVJYywyQkFmVSxHQWVBLGVBQUtOLElBQUwsQ0FBVUQsT0FBVixFQUFtQixlQUFLUSxLQUFMLENBQVdmLE1BQVgsRUFBbUJnQixJQUF0QyxDQWZBLEVBZ0JWQyxRQWhCVSxHQWdCQyxDQWhCRDs7O0FBa0JkLHdCQUFJLENBQUMsYUFBR1AsVUFBSCxDQUFjSSxPQUFkLENBQUwsRUFBNkI7QUFBRSxxQ0FBR0gsU0FBSCxDQUFhRyxPQUFiO0FBQXdCOztBQUVqREksMEJBcEJRLEdBb0JDLGVBQUtILEtBQUwsQ0FBV2YsTUFBWCxFQUFtQmdCLElBcEJwQixFQXFCVkcsSUFyQlUsR0FxQkg7QUFDSEMsaUNBQVMsS0FBS0MsS0FBS0MsR0FBTCxDQUFTLElBQVQsRUFBZSxDQUFmLENBRFg7QUFFSEMsZ0NBQVEsRUFGTDtBQUdIQyxpQ0FBUztBQUNMQyxtQ0FBT1AsTUFERjtBQUVMUSwwQ0FBYztBQUZUO0FBSE4scUJBckJHOzs7QUE4QmRQLHlCQUFLSyxPQUFMLENBQWFFLFlBQWIsQ0FBMEJSLE1BQTFCLElBQW9DO0FBQ2hDUyw4QkFBTTtBQUNGQyxtQ0FBTyxXQURMO0FBRUZELGtDQUFNLFNBRko7QUFHRkUsb0NBQVE7QUFITix5QkFEMEI7QUFNaENDLGlDQUFTLEVBTnVCO0FBT2hDQyxzQ0FBYyxDQVBrQjtBQVFoQ0MsaUNBQVMsSUFSdUI7QUFTaENDLCtCQUFPLEVBVHlCO0FBVWhDQyxnQ0FBUSxFQVZ3QjtBQVdoQ0MsK0JBQU87QUFYeUIscUJBQXBDOztBQWNNQyx3QkE1Q1EsR0E0Q0QsSUFBSXZDLElBQUosQ0FBU2lCLE9BQVQsRUFBa0IsS0FBbEIsRUFBeUJLLElBQXpCLENBNUNDO0FBNkNWa0IsMkJBN0NVOzs7QUErQ2Qsd0JBQUksQ0FBQ2hDLFFBQUwsRUFBZTtBQUNYZ0Msa0NBQVVELEtBQUtFLEtBQUwsQ0FBV3BCLE1BQVgsRUFBbUIsS0FBbkIsQ0FBVjtBQUNIOztBQWpEYTtBQUFBLDJCQW1EUix1QkFBWSxVQUFVcUIsT0FBVixFQUFtQkMsTUFBbkIsRUFBMkI7QUFDekMsNEJBQU1DLGNBQWMsK0JBQVUsU0FBU0MsYUFBVCxDQUF1QkMsS0FBdkIsRUFBOEJDLEVBQTlCLEVBQWtDO0FBQzVELGdDQUFJdEMsT0FBTyxDQUFQLElBQVlBLE9BQU8sTUFBUCxLQUFrQixDQUFsQyxFQUFxQztBQUNqQ00sd0NBQVFDLEdBQVIsQ0FBWSwwQkFBd0JQLElBQXhCLHlCQUFnREEsT0FBT1csUUFBdkQsdUJBQ0csQ0FBQ3pCLEtBQUtDLEdBQUwsS0FBYUYsTUFBZCxJQUF3QixLQUQzQixPQUFaO0FBRUg7QUFDRCxnQ0FBSWUsT0FBTyxDQUFYLEVBQWM7QUFDVixvQ0FBSUQsUUFBSixFQUFjO0FBQ1YsMkNBQU9rQyxTQUFQO0FBQ0g7QUFDRCxvQ0FBSU0sS0FBS0MsV0FBV0gsTUFBTUksS0FBTixFQUFYLENBQVQ7QUFBQSxvQ0FDSUMsU0FBUyxJQUFJQyxZQUFKLENBQWlCLEVBQWpCLENBRGI7QUFFQU4sc0NBQU1PLE9BQU4sQ0FBYyxVQUFVQyxLQUFWLEVBQWlCQyxDQUFqQixFQUFvQjtBQUM5QkosMkNBQU9JLENBQVAsSUFBWU4sV0FBV0ssS0FBWCxJQUFvQixLQUFoQztBQUNILGlDQUZEO0FBR0FmLHFDQUFLaUIsR0FBTCxDQUFTbkMsTUFBVCxFQUFpQm1CLE9BQWpCLEVBQTBCLElBQUksZ0JBQUdpQixNQUFILENBQVVDLFNBQWQsQ0FDdEIsSUFBSSxnQkFBR0MsVUFBSCxDQUFjQyxJQUFsQixDQUF1QlosS0FBSyxLQUE1QixFQUFtQyxHQUFuQyxDQURzQixFQUNtQkcsTUFEbkIsQ0FBMUI7QUFFSCw2QkFYRCxNQVdPLElBQUkxQyxTQUFTLENBQWIsRUFBZ0I7QUFDbkJxQyxzQ0FBTUksS0FBTjtBQUNBLG9DQUFJVyxVQUFVdkMsS0FBS0ssT0FBTCxDQUFhRSxZQUFiLENBQTBCUixNQUExQixDQUFkO0FBQ0F3Qyx3Q0FBUTFCLE9BQVIsR0FBa0IsR0FBbEI7QUFDQTBCLHdDQUFRL0IsSUFBUixDQUFhRSxNQUFiLEdBQXNCYyxNQUFNZCxNQUE1QjtBQUNBNkIsd0NBQVF6QixLQUFSLEdBQWdCLElBQUkwQixLQUFKLENBQVVELFFBQVEvQixJQUFSLENBQWFFLE1BQXZCLENBQWhCO0FBQ0E2Qix3Q0FBUXhCLE1BQVIsR0FBaUIsSUFBSXlCLEtBQUosQ0FBVUQsUUFBUS9CLElBQVIsQ0FBYUUsTUFBdkIsQ0FBakI7QUFDQTZCLHdDQUFRdkIsS0FBUixHQUFnQixJQUFJd0IsS0FBSixDQUFVRCxRQUFRL0IsSUFBUixDQUFhRSxNQUF2QixDQUFoQjtBQUNBYyxzQ0FBTU8sT0FBTixDQUFjLFVBQVVDLEtBQVYsRUFBaUJDLENBQWpCLEVBQW9CO0FBQzlCLHdDQUFJUSxRQUFRVCxNQUFNVSxLQUFOLENBQVksR0FBWixDQUFaO0FBQ0FILDRDQUFReEIsTUFBUixDQUFla0IsQ0FBZixJQUFvQlEsTUFBTSxDQUFOLENBQXBCO0FBQ0FGLDRDQUFRekIsS0FBUixDQUFjbUIsQ0FBZCxJQUFtQixHQUFuQjtBQUNBTSw0Q0FBUXZCLEtBQVIsQ0FBY2lCLENBQWQsSUFBbUIscUJBQW5CO0FBQ0gsaUNBTEQ7QUFNQW5DLDJDQUFXeUMsUUFBUS9CLElBQVIsQ0FBYUUsTUFBeEI7QUFDSDtBQUNEdkIsb0NBQVEsQ0FBUjtBQUNBLG1DQUFPc0MsSUFBUDtBQUNILHlCQWxDbUIsRUFrQ2pCLFVBQVVrQixHQUFWLEVBQWU7QUFDZCxnQ0FBSUEsR0FBSixFQUFTO0FBQ0xsRCx3Q0FBUUMsR0FBUixDQUFZaUQsSUFBSUMsS0FBaEI7QUFDQSx1Q0FBT3ZCLE9BQU9zQixHQUFQLENBQVA7QUFDSDtBQUNEMUIsaUNBQUs0QixNQUFMLENBQVkzQixPQUFaO0FBQ0FFO0FBQ0gseUJBekNtQixDQUFwQjtBQTBDQXpDLDRCQUFJbUUsSUFBSixDQUFTakUsTUFBVCxFQUFpQnlDLFdBQWpCO0FBQ0gscUJBNUNLLENBbkRROztBQUFBO0FBQUE7QUFBQSwyQkFpR1JMLEtBQUs4QixRQUFMLEVBakdROztBQUFBOztBQW1HZHRELDRCQUFRQyxHQUFSLENBQVksMEJBQXdCUCxJQUF4Qix5QkFBZ0RBLE9BQU9XLFFBQXZELHVCQUNHLENBQUN6QixLQUFLQyxHQUFMLEtBQWFGLE1BQWQsSUFBd0IsS0FEM0IsT0FBWjtBQUVBcUIsNEJBQVFDLEdBQVIsOEJBQXVDTixPQUF2QztBQUNBTiw0QkFBUWtFLElBQVIsQ0FBYSxDQUFiOztBQXRHYztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxDQUFsQixLQXlHQ0MsS0F6R0QsQ0F5R08sVUFBQ04sR0FBRCxFQUFTO0FBQ1psRCxZQUFRQyxHQUFSLDRCQUFxQ2lELElBQUlPLE9BQXpDLGVBQTBEUCxJQUFJUSxJQUE5RDtBQUNBckUsWUFBUWtFLElBQVIsQ0FBYUwsSUFBSVEsSUFBakI7QUFDSCxDQTVHRCIsImZpbGUiOiJuYi1sb2FkLWNzdi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHV1aWQ0IGZyb20gJ3V1aWQ0JztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgdHJhbnNmb3JtIGZyb20gJ3N0cmVhbS10cmFuc2Zvcm0nO1xuaW1wb3J0IGNsIGZyb20gJy4uL3NyYy9pbmRleCc7XG5cblByb21pc2UuY29yb3V0aW5lKGZ1bmN0aW9uKiAoKSB7XG4gICAgY29uc3QgdHN0YXJ0ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgaW1wb3J0ZXJzID0gY2wuZGF0YS5pby5pbXBvcnRlcnMsXG4gICAgICAgIExNREIgPSBjbC5kYXRhLmlvLkxNREIsXG4gICAgICAgIGNzdiA9IG5ldyBpbXBvcnRlcnMuTmFub2JyYWluc0NTVigpLFxuICAgICAgICBpbmZpbGUgPSBwcm9jZXNzLmFyZ3ZbMl0gfHwgcHJvY2Vzcy5lbnYuTkJfSU5GSUxFX1BBVEgsXG4gICAgICAgIG1ldGFPbmx5ID0gZmFsc2U7XG5cbiAgICBsZXQgcm93cyA9IDAsXG4gICAgICAgIGRhdGFEaXIgPSBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4nLCAnZGF0YScsICdsbWRiJyk7XG5cbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMoZGF0YURpcikpIHsgZnMubWtkaXJTeW5jKGRhdGFEaXIpOyB9XG5cbiAgICBjb25zb2xlLmxvZyhgUmVhZGluZyBEYXRhU2V0IGZyb20gQ1NWIGF0ICR7aW5maWxlfSBpbnRvIExNREIuLi5gKTtcblxuICAgIGxldCBsbWRiRGlyID0gcGF0aC5qb2luKGRhdGFEaXIsIHBhdGgucGFyc2UoaW5maWxlKS5uYW1lKSxcbiAgICAgICAgZGF0YVNpemUgPSAwO1xuXG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGxtZGJEaXIpKSB7IGZzLm1rZGlyU3luYyhsbWRiRGlyKTsgfVxuXG4gICAgY29uc3QgZGJuYW1lID0gcGF0aC5wYXJzZShpbmZpbGUpLm5hbWUsXG4gICAgICAgIG1ldGEgPSB7XG4gICAgICAgICAgICBtYXBTaXplOiAzMiAqIE1hdGgucG93KDEwMjQsIDMpLFxuICAgICAgICAgICAgbWF4RGJzOiAxMCxcbiAgICAgICAgICAgIERhdGFTZXQ6IHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZGJuYW1lLFxuICAgICAgICAgICAgICAgIERhdGFDaGFubmVsczoge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgIG1ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJuYW1lXSA9IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgY2xhc3M6ICdEYXRhRnJhbWUnLFxuICAgICAgICAgICAgdHlwZTogJ0Zsb2F0MzInLFxuICAgICAgICAgICAgbGVuZ3RoOiAwXG4gICAgICAgIH0sXG4gICAgICAgIGtleVNpemU6IDE2LFxuICAgICAgICBrZXlQcmVjaXNpb246IDYsXG4gICAgICAgIGtleVVuaXQ6IG51bGwsXG4gICAgICAgIHVuaXRzOiBbXSxcbiAgICAgICAgbGFiZWxzOiBbXSxcbiAgICAgICAgdXVpZHM6IFtdXG4gICAgfTtcblxuICAgIGNvbnN0IGxtZGIgPSBuZXcgTE1EQihsbWRiRGlyLCBmYWxzZSwgbWV0YSk7XG4gICAgbGV0IHR4blVVSUQ7XG5cbiAgICBpZiAoIW1ldGFPbmx5KSB7XG4gICAgICAgIHR4blVVSUQgPSBsbWRiLmJlZ2luKGRibmFtZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHlpZWxkIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgY29uc3Qgd3JpdGVTdHJlYW0gPSB0cmFuc2Zvcm0oZnVuY3Rpb24gbG1kYlRyYW5zZm9ybShlbnRyeSwgY2IpIHtcbiAgICAgICAgICAgIGlmIChyb3dzID4gMCAmJiByb3dzICUgMTAwMDAwID09PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRpbWUgc3BlbnQgaW1wb3J0aW5nICR7cm93c30gcm93cyBjb250YWluaW5nICR7cm93cyAqIGRhdGFTaXplfSBgICtcbiAgICAgICAgICAgICAgICAgICAgYGV2ZW50czogJHsoRGF0ZS5ub3coKSAtIHRzdGFydCkgKiAwLjAwMX1zYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocm93cyA+IDMpIHtcbiAgICAgICAgICAgICAgICBpZiAobWV0YU9ubHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1zID0gcGFyc2VGbG9hdChlbnRyeS5zaGlmdCgpKSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzID0gbmV3IEZsb2F0MzJBcnJheSg2NCk7XG4gICAgICAgICAgICAgICAgZW50cnkuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzW2ldID0gcGFyc2VGbG9hdChmaWVsZCkgKiAwLjAwMTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsbWRiLnB1dChkYm5hbWUsIHR4blVVSUQsIG5ldyBjbC5ldmVudHMuRGF0YUZyYW1lKFxuICAgICAgICAgICAgICAgICAgICBuZXcgY2wucXVhbnRpdGllcy5UaW1lKG1zICogMC4wMDEsICdzJyksIHZhbHVlcykpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyb3dzID09PSAzKSB7XG4gICAgICAgICAgICAgICAgZW50cnkuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBsZXQgY2hhbm5lbCA9IG1ldGEuRGF0YVNldC5EYXRhQ2hhbm5lbHNbZGJuYW1lXTtcbiAgICAgICAgICAgICAgICBjaGFubmVsLmtleVVuaXQgPSAncyc7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC50eXBlLmxlbmd0aCA9IGVudHJ5Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBjaGFubmVsLnVuaXRzID0gbmV3IEFycmF5KGNoYW5uZWwudHlwZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNoYW5uZWwubGFiZWxzID0gbmV3IEFycmF5KGNoYW5uZWwudHlwZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGNoYW5uZWwudXVpZHMgPSBuZXcgQXJyYXkoY2hhbm5lbC50eXBlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgZW50cnkuZm9yRWFjaChmdW5jdGlvbiAoZmllbGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGxhYmVsID0gZmllbGQuc3BsaXQoJ18nKTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC5sYWJlbHNbaV0gPSBsYWJlbFswXTtcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC51bml0c1tpXSA9ICd2JztcbiAgICAgICAgICAgICAgICAgICAgY2hhbm5lbC51dWlkc1tpXSA9IHV1aWQ0KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGF0YVNpemUgPSBjaGFubmVsLnR5cGUubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcm93cyArPSAxO1xuICAgICAgICAgICAgcmV0dXJuIGNiKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIuc3RhY2spO1xuICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxtZGIuY29tbWl0KHR4blVVSUQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgY3N2LnJlYWQoaW5maWxlLCB3cml0ZVN0cmVhbSk7XG4gICAgfSk7XG5cbiAgICB5aWVsZCBsbWRiLmNsb3NlRW52KCk7XG5cbiAgICBjb25zb2xlLmxvZyhgVGltZSBzcGVudCBpbXBvcnRpbmcgJHtyb3dzfSByb3dzIGNvbnRhaW5pbmcgJHtyb3dzICogZGF0YVNpemV9IGAgK1xuICAgICAgICBgZXZlbnRzOiAkeyhEYXRlLm5vdygpIC0gdHN0YXJ0KSAqIDAuMDAxfXNgKTtcbiAgICBjb25zb2xlLmxvZyhgTE1EQiBmaWxlcyBhcmUgcmVhZHkgYXQgJHtkYXRhRGlyfWApO1xuICAgIHByb2Nlc3MuZXhpdCgwKTtcblxufSkoKVxuLmNhdGNoKChlcnIpID0+IHtcbiAgICBjb25zb2xlLmxvZyhgRGF0YVNldCBpbXBvcnQgZXJyb3I6ICR7ZXJyLm1lc3NhZ2V9IGNvZGU6ICR7ZXJyLmNvZGV9YCk7XG4gICAgcHJvY2Vzcy5leGl0KGVyci5jb2RlKTtcbn0pOyJdfQ==
'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

_bluebird2.default.coroutine(_regenerator2.default.mark(function _callee() {
    var tstart, importers, LMDB, csv, infile, metaOnly, rows, dataDir, lmdbDir, dataSize, dbname, meta, lmdb, txnUUID;
    return _regenerator2.default.wrap(function _callee$(_context) {
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
                                var _ret = function () {
                                    if (metaOnly) {
                                        return {
                                            v: resolve()
                                        };
                                    }
                                    var ms = parseFloat(entry.shift()),
                                        values = new Float32Array(64);
                                    entry.forEach(function (field, i) {
                                        values[i] = parseFloat(field) * 0.001;
                                    });
                                    lmdb.put(dbname, txnUUID, new _index2.default.events.DataFrame(new _index2.default.quantities.Time(ms * 0.001, 's'), values));
                                }();

                                if ((typeof _ret === 'undefined' ? 'undefined' : (0, _typeof3.default)(_ret)) === "object") return _ret.v;
                            } else if (rows === 3) {
                                (function () {
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
                                })();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5iLWxvYWQtY3N2LmpzIl0sIm5hbWVzIjpbImNvcm91dGluZSIsInRzdGFydCIsIkRhdGUiLCJub3ciLCJpbXBvcnRlcnMiLCJkYXRhIiwiaW8iLCJMTURCIiwiY3N2IiwiTmFub2JyYWluc0NTViIsImluZmlsZSIsInByb2Nlc3MiLCJhcmd2IiwiZW52IiwiTkJfSU5GSUxFX1BBVEgiLCJtZXRhT25seSIsInJvd3MiLCJkYXRhRGlyIiwiam9pbiIsIl9fZGlybmFtZSIsImV4aXN0c1N5bmMiLCJta2RpclN5bmMiLCJjb25zb2xlIiwibG9nIiwibG1kYkRpciIsInBhcnNlIiwibmFtZSIsImRhdGFTaXplIiwiZGJuYW1lIiwibWV0YSIsIm1hcFNpemUiLCJNYXRoIiwicG93IiwibWF4RGJzIiwiRGF0YVNldCIsInRpdGxlIiwiRGF0YUNoYW5uZWxzIiwidHlwZSIsImNsYXNzIiwibGVuZ3RoIiwia2V5U2l6ZSIsImtleVByZWNpc2lvbiIsImtleVVuaXQiLCJ1bml0cyIsImxhYmVscyIsInV1aWRzIiwibG1kYiIsInR4blVVSUQiLCJiZWdpbiIsInJlc29sdmUiLCJyZWplY3QiLCJ3cml0ZVN0cmVhbSIsImxtZGJUcmFuc2Zvcm0iLCJlbnRyeSIsImNiIiwibXMiLCJwYXJzZUZsb2F0Iiwic2hpZnQiLCJ2YWx1ZXMiLCJGbG9hdDMyQXJyYXkiLCJmb3JFYWNoIiwiZmllbGQiLCJpIiwicHV0IiwiZXZlbnRzIiwiRGF0YUZyYW1lIiwicXVhbnRpdGllcyIsIlRpbWUiLCJjaGFubmVsIiwiQXJyYXkiLCJsYWJlbCIsInNwbGl0IiwiZXJyIiwic3RhY2siLCJjb21taXQiLCJyZWFkIiwiY2xvc2VFbnYiLCJleGl0IiwiY2F0Y2giLCJtZXNzYWdlIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsbUJBQVFBLFNBQVIsNEJBQWtCO0FBQUE7QUFBQTtBQUFB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bkI7QUFDQU0sZ0RBQVF2QixLQUFSLENBQWNpQixDQUFkLElBQW1CLHFCQUFuQjtBQUNILHFDQUxEO0FBTUFuQywrQ0FBV3lDLFFBQVEvQixJQUFSLENBQWFFLE1BQXhCO0FBZG1CO0FBZXRCO0FBQ0R2QixvQ0FBUSxDQUFSO0FBQ0EsbUNBQU9zQyxJQUFQO0FBQ0gseUJBbENtQixFQWtDakIsVUFBVWtCLEdBQVYsRUFBZTtBQUNkLGdDQUFJQSxHQUFKLEVBQVM7QUFDTGxELHdDQUFRQyxHQUFSLENBQVlpRCxJQUFJQyxLQUFoQjtBQUNBLHVDQUFPdkIsT0FBT3NCLEdBQVAsQ0FBUDtBQUNIO0FBQ0QxQixpQ0FBSzRCLE1BQUwsQ0FBWTNCLE9BQVo7QUFDQUU7QUFDSCx5QkF6Q21CLENBQXBCO0FBMENBekMsNEJBQUltRSxJQUFKLENBQVNqRSxNQUFULEVBQWlCeUMsV0FBakI7QUFDSCxxQkE1Q0ssQ0FuRFE7O0FBQUE7QUFBQTtBQUFBLDJCQWlHUkwsS0FBSzhCLFFBQUwsRUFqR1E7O0FBQUE7O0FBbUdkdEQsNEJBQVFDLEdBQVIsQ0FBWSwwQkFBd0JQLElBQXhCLHlCQUFnREEsT0FBT1csUUFBdkQsdUJBQ0csQ0FBQ3pCLEtBQUtDLEdBQUwsS0FBYUYsTUFBZCxJQUF3QixLQUQzQixPQUFaO0FBRUFxQiw0QkFBUUMsR0FBUiw4QkFBdUNOLE9BQXZDO0FBQ0FOLDRCQUFRa0UsSUFBUixDQUFhLENBQWI7O0FBdEdjO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQWxCLEtBeUdDQyxLQXpHRCxDQXlHTyxVQUFDTixHQUFELEVBQVM7QUFDWmxELFlBQVFDLEdBQVIsNEJBQXFDaUQsSUFBSU8sT0FBekMsZUFBMERQLElBQUlRLElBQTlEO0FBQ0FyRSxZQUFRa0UsSUFBUixDQUFhTCxJQUFJUSxJQUFqQjtBQUNILENBNUdEIiwiZmlsZSI6Im5iLWxvYWQtY3N2LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFByb21pc2UgZnJvbSAnYmx1ZWJpcmQnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgdXVpZDQgZnJvbSAndXVpZDQnO1xuaW1wb3J0IGZzIGZyb20gJ2ZzJztcbmltcG9ydCB0cmFuc2Zvcm0gZnJvbSAnc3RyZWFtLXRyYW5zZm9ybSc7XG5pbXBvcnQgY2wgZnJvbSAnLi4vc3JjL2luZGV4JztcblxuUHJvbWlzZS5jb3JvdXRpbmUoZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCB0c3RhcnQgPSBEYXRlLm5vdygpLFxuICAgICAgICBpbXBvcnRlcnMgPSBjbC5kYXRhLmlvLmltcG9ydGVycyxcbiAgICAgICAgTE1EQiA9IGNsLmRhdGEuaW8uTE1EQixcbiAgICAgICAgY3N2ID0gbmV3IGltcG9ydGVycy5OYW5vYnJhaW5zQ1NWKCksXG4gICAgICAgIGluZmlsZSA9IHByb2Nlc3MuYXJndlsyXSB8fCBwcm9jZXNzLmVudi5OQl9JTkZJTEVfUEFUSCxcbiAgICAgICAgbWV0YU9ubHkgPSBmYWxzZTtcblxuICAgIGxldCByb3dzID0gMCxcbiAgICAgICAgZGF0YURpciA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLicsICdkYXRhJywgJ2xtZGInKTtcblxuICAgIGlmICghZnMuZXhpc3RzU3luYyhkYXRhRGlyKSkgeyBmcy5ta2RpclN5bmMoZGF0YURpcik7IH1cblxuICAgIGNvbnNvbGUubG9nKGBSZWFkaW5nIERhdGFTZXQgZnJvbSBDU1YgYXQgJHtpbmZpbGV9IGludG8gTE1EQi4uLmApO1xuXG4gICAgbGV0IGxtZGJEaXIgPSBwYXRoLmpvaW4oZGF0YURpciwgcGF0aC5wYXJzZShpbmZpbGUpLm5hbWUpLFxuICAgICAgICBkYXRhU2l6ZSA9IDA7XG5cbiAgICBpZiAoIWZzLmV4aXN0c1N5bmMobG1kYkRpcikpIHsgZnMubWtkaXJTeW5jKGxtZGJEaXIpOyB9XG5cbiAgICBjb25zdCBkYm5hbWUgPSBwYXRoLnBhcnNlKGluZmlsZSkubmFtZSxcbiAgICAgICAgbWV0YSA9IHtcbiAgICAgICAgICAgIG1hcFNpemU6IDMyICogTWF0aC5wb3coMTAyNCwgMyksXG4gICAgICAgICAgICBtYXhEYnM6IDEwLFxuICAgICAgICAgICAgRGF0YVNldDoge1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkYm5hbWUsXG4gICAgICAgICAgICAgICAgRGF0YUNoYW5uZWxzOiB7fVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYm5hbWVdID0ge1xuICAgICAgICB0eXBlOiB7XG4gICAgICAgICAgICBjbGFzczogJ0RhdGFGcmFtZScsXG4gICAgICAgICAgICB0eXBlOiAnRmxvYXQzMicsXG4gICAgICAgICAgICBsZW5ndGg6IDBcbiAgICAgICAgfSxcbiAgICAgICAga2V5U2l6ZTogMTYsXG4gICAgICAgIGtleVByZWNpc2lvbjogNixcbiAgICAgICAga2V5VW5pdDogbnVsbCxcbiAgICAgICAgdW5pdHM6IFtdLFxuICAgICAgICBsYWJlbHM6IFtdLFxuICAgICAgICB1dWlkczogW11cbiAgICB9O1xuXG4gICAgY29uc3QgbG1kYiA9IG5ldyBMTURCKGxtZGJEaXIsIGZhbHNlLCBtZXRhKTtcbiAgICBsZXQgdHhuVVVJRDtcblxuICAgIGlmICghbWV0YU9ubHkpIHtcbiAgICAgICAgdHhuVVVJRCA9IGxtZGIuYmVnaW4oZGJuYW1lLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgeWllbGQgbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBjb25zdCB3cml0ZVN0cmVhbSA9IHRyYW5zZm9ybShmdW5jdGlvbiBsbWRiVHJhbnNmb3JtKGVudHJ5LCBjYikge1xuICAgICAgICAgICAgaWYgKHJvd3MgPiAwICYmIHJvd3MgJSAxMDAwMDAgPT09IDApIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVGltZSBzcGVudCBpbXBvcnRpbmcgJHtyb3dzfSByb3dzIGNvbnRhaW5pbmcgJHtyb3dzICogZGF0YVNpemV9IGAgK1xuICAgICAgICAgICAgICAgICAgICBgZXZlbnRzOiAkeyhEYXRlLm5vdygpIC0gdHN0YXJ0KSAqIDAuMDAxfXNgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyb3dzID4gMykge1xuICAgICAgICAgICAgICAgIGlmIChtZXRhT25seSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbXMgPSBwYXJzZUZsb2F0KGVudHJ5LnNoaWZ0KCkpLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgPSBuZXcgRmxvYXQzMkFycmF5KDY0KTtcbiAgICAgICAgICAgICAgICBlbnRyeS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZXNbaV0gPSBwYXJzZUZsb2F0KGZpZWxkKSAqIDAuMDAxO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGxtZGIucHV0KGRibmFtZSwgdHhuVVVJRCwgbmV3IGNsLmV2ZW50cy5EYXRhRnJhbWUoXG4gICAgICAgICAgICAgICAgICAgIG5ldyBjbC5xdWFudGl0aWVzLlRpbWUobXMgKiAwLjAwMSwgJ3MnKSwgdmFsdWVzKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHJvd3MgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBlbnRyeS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGxldCBjaGFubmVsID0gbWV0YS5EYXRhU2V0LkRhdGFDaGFubmVsc1tkYm5hbWVdO1xuICAgICAgICAgICAgICAgIGNoYW5uZWwua2V5VW5pdCA9ICdzJztcbiAgICAgICAgICAgICAgICBjaGFubmVsLnR5cGUubGVuZ3RoID0gZW50cnkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGNoYW5uZWwudW5pdHMgPSBuZXcgQXJyYXkoY2hhbm5lbC50eXBlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC5sYWJlbHMgPSBuZXcgQXJyYXkoY2hhbm5lbC50eXBlLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgY2hhbm5lbC51dWlkcyA9IG5ldyBBcnJheShjaGFubmVsLnR5cGUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBlbnRyeS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgbGFiZWwgPSBmaWVsZC5zcGxpdCgnXycpO1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLmxhYmVsc1tpXSA9IGxhYmVsWzBdO1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnVuaXRzW2ldID0gJ3YnO1xuICAgICAgICAgICAgICAgICAgICBjaGFubmVsLnV1aWRzW2ldID0gdXVpZDQoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkYXRhU2l6ZSA9IGNoYW5uZWwudHlwZS5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByb3dzICs9IDE7XG4gICAgICAgICAgICByZXR1cm4gY2IoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyci5zdGFjayk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbG1kYi5jb21taXQodHhuVVVJRCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjc3YucmVhZChpbmZpbGUsIHdyaXRlU3RyZWFtKTtcbiAgICB9KTtcblxuICAgIHlpZWxkIGxtZGIuY2xvc2VFbnYoKTtcblxuICAgIGNvbnNvbGUubG9nKGBUaW1lIHNwZW50IGltcG9ydGluZyAke3Jvd3N9IHJvd3MgY29udGFpbmluZyAke3Jvd3MgKiBkYXRhU2l6ZX0gYCArXG4gICAgICAgIGBldmVudHM6ICR7KERhdGUubm93KCkgLSB0c3RhcnQpICogMC4wMDF9c2ApO1xuICAgIGNvbnNvbGUubG9nKGBMTURCIGZpbGVzIGFyZSByZWFkeSBhdCAke2RhdGFEaXJ9YCk7XG4gICAgcHJvY2Vzcy5leGl0KDApO1xuXG59KSgpXG4uY2F0Y2goKGVycikgPT4ge1xuICAgIGNvbnNvbGUubG9nKGBEYXRhU2V0IGltcG9ydCBlcnJvcjogJHtlcnIubWVzc2FnZX0gY29kZTogJHtlcnIuY29kZX1gKTtcbiAgICBwcm9jZXNzLmV4aXQoZXJyLmNvZGUpO1xufSk7Il19
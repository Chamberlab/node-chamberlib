'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BaseNode extends _tinyEmitter2.default {
    constructor() {
        super();

        this._stats = {
            data: {
                in: {},
                out: {}
            },
            start: 0,
            lastLog: 0
        };
    }

    addStats(dir, type, count = 1) {
        if (typeof this._stats.data[dir][type] === 'number') {
            this._stats.data[dir][type] += count;
        } else {
            this._stats.data[dir][type] = count;
        }
        let now = Date.now();
        if (this._stats.start === 0) {
            this._stats.start = now;
            // console.log(`${this.constructor.name} -- START ${now}`);
        }
        if (now - this._stats.lastLog > Math.max(1000, process.env.DUMP_STATS_MILLIS)) {
            this._stats.lastLog = now;
            this.emit('stats', this._stats);
            if (process.env.DUMP_STATS_MILLIS) {
                this.printStats();
            }
        } else if (count === 0) {
            if (process.env.DUMP_STATS_MILLIS) {
                // console.log(`${this.constructor.name} -- END ${now}`);
                this.printStats();
            }
        }
    }

    printStats() {
        /* eslint-disable no-console */
        console.log(`${this.constructor.name} -- ${(Date.now() - this._stats.start) * 0.001}s`);
        for (let dir in this._stats.data) {
            for (let key in this._stats.data[dir]) {
                if (this._stats.data[dir][key] > 0) {
                    console.log(`${key} ${dir} ${this._stats.data[dir][key]}`);
                }
            }
        }
        console.log('------\n');
        /* eslint-enable no-console */
    }

    get stats() {
        return this._stats;
    }
}

exports.default = BaseNode;
import Emitter from 'tiny-emitter';

class BaseNode extends Emitter {
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
        if (!process.env.DUMP_STATS_MILLIS) {
            return;
        }
        let now = Date.now();
        if (this._stats.start === 0) {
            this._stats.start = now;
            console.log(`${this.constructor.name} -- START ${now}`);
        }
        if (now - this._stats.lastLog > process.env.DUMP_STATS_MILLIS) {
            this._stats.lastLog = now;
            this.printStats();
        } else if (count === 0) {
            console.log(`${this.constructor.name} -- END ${now}`);
            this.printStats();
        }
    }

    printStats() {
        console.log(`${this.constructor.name} -- ${(Date.now() - this._stats.start) * 0.001}s`);
        for (let dir in this._stats.data) {
            for (let key in this._stats.data[dir]) {
                if (this._stats.data[dir][key] > 0) {
                    console.log(`${key} ${dir} ${this._stats.data[dir][key]}`);
                }
            }
        }
        console.log('------\n');
    }

    get stats() {
        return this._stats;
    }
}


export default BaseNode;
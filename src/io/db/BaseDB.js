import assert from 'assert';
import path from 'path';
import math from 'mathjs';
import Qty from 'js-quantities';
import Emitter from 'tiny-emitter';
import DataEvent from '../../events/DataEvent';
import JSONFile from '../../io/file/JSONFile';

const formatKey = decimals => {
    return function(scalar) {
        const pow = math.pow(10, decimals),
            str = `${(math.round(scalar * pow) / pow).toFixed(decimals)}`;
        return str;
    };
};

class BaseDB extends Emitter {
    constructor() {
        super();

        this._datapath = undefined;
        this._meta = undefined;
    }

    get(key) {
        assert(key instanceof Qty);
    }

    put(key, val) {
        assert(key instanceof Qty);
        assert(val instanceof DataEvent);
    }


    //
    //
    // internals

    _createDB(db, meta) {
        assert(meta instanceof Object, 'Meta object is required');

        const _self = this;
        this._meta.DataSet.DataChannels[db] = meta;
        return this._updateMeta()
            .then(() => {
                _self._open(db);
            });
    }

    _open(dbname) {
        if (Object.keys(this._openDB) > 0) {
            Object.keys(this._openDB).map((name) => {
                if (name !== dbname) {
                    this._close(dbname);
                }
            });
        }
        if (!this._openDB[dbname]) {
            this._openDB[dbname] = this._env.openDbi({
                name: dbname,
                create: true,
                dupSort: true,
                reverseKey: false,
                integerKey: false,
                dupFixed: false,
                integerDup: false
            });
        }
        return this._openDB[dbname];
    }

    _close(dbname) {
        if (this._openDB[dbname]) {
            this._openDB[dbname].close();
            delete this._openDB[dbname];
        }
        return this._openDB[dbname];
    }

    _updateMeta() {
        const _self = this,
            fpath = path.join(this._datapath, 'meta.json'),
            meta = this._meta;
        return new JSONFile(meta).write(fpath + '.bak')
            .then(() => {
                return new JSONFile(meta).write(fpath);
            })
            .then(() => {
                _self.emit('updated');
            });
    }

    _getKey(db, time, channelUUID = undefined) {
        const channel = this._meta.DataSet.DataChannels[db];

        if (typeof time === 'number') {
            time = Qty(time, channel.keyUnit);
        }

        assert(time instanceof Qty, `Key time must be Qty or number, is ${typeof time}`);

        const timeStr = time.format(formatKey(channel.keyPrecision));
        return new Array(channel.keySize - timeStr.length).fill(0).join('') + timeStr +
            (channelUUID ? channelUUID.split('-').pop() : '');
    }

    _getArrayClass(typeString) {
        switch (typeString) {
        case 'Float32':
            return Float32Array;
        case 'Float64':
            return Float32Array;
        case 'Int32':
            return Int32Array;
        case 'Uint32':
            return Uint32Array;
        case 'Int16':
            return Int32Array;
        case 'Uint16':
            return Uint32Array;
        case 'Int8':
            return Int8Array;
        case 'Uint8':
            return Uint8Array;
        }
    }

    _checkAndConvertKey(db, key) {
        if (typeof key === 'number') {
            return this._getKey(db, key);
        } else if (key instanceof Qty) {
            return this._getKey(db, key.to('s').scalar);
        } else if (typeof key === 'string') {
            return this._getKey(db, Qty(key).to('s').scalar);
        }
        return key;
    }

    //
    //
    // Getters / Setters

    get meta() {
        return this._meta;
    }
}

export default BaseDB;
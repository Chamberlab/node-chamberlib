'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _BaseDB = require('./BaseDB');

var _BaseDB2 = _interopRequireDefault(_BaseDB);

var _LMDB = require('./LMDB');

var _LMDB2 = _interopRequireDefault(_LMDB);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    BaseDB: _BaseDB2.default,
    LMDB: _LMDB2.default
};
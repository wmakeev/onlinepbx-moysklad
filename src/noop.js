/**
 * noop
 * Date: 17.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var noop = function (data, cb) {
    cb(new Error('Метод не реализован'));
};

module.exports = noop;
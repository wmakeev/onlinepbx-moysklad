/**
 * noop
 * Date: 17.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

module.exports = function noop(data, cb) {
  cb(new Error('Метод не реализован'));
};
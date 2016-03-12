/**
 * index
 * Date: 16.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var methods = {
  test: 'test',
  contact_info: 'contact-info',
  call_upload: 'noop',
  create_contact: 'noop',
  create_lead: 'noop',
  list_users: 'noop',
  comment_call: 'noop'
};

Object.keys(methods).forEach(function (method) {
  exports[method] = require('./src/' + methods[method]);
});
/**
 * index
 * Date: 16.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

[
    [ 'test'          , 'test' ]
  , [ 'contact_info'  , 'contact-info' ]
  , [ 'call_upload'   , 'noop' ]
  , [ 'create_contact', 'noop' ]
  , [ 'create_lead'   , 'noop' ]
  , [ 'list_users'    , 'noop' ]
  , [ 'comment_call'  , 'noop' ]

].forEach(function (methodMap) {
    exports[methodMap[0]] = require('./src/' + methodMap[1]);
});
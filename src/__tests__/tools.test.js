'use strict'

let test = require('blue-tape')

const {
    normalizePhone, isPhonesCompare, getMoyskladError
} = require('../tools')

test('tools#getMoyskladError', t => {
  let err
  t.ok(getMoyskladError)

  t.comment('array of errors')
  err = getMoyskladError({
    errors: [
      { error: 'Неправильный пароль или имя пользователя' }
    ]
  })
  t.ok(err)
  t.equal(err.message, 'Неправильный пароль или имя пользователя')

  t.comment('single error')
  err = getMoyskladError({
    error: 'Неправильный пароль или имя пользователя',
    code: 1040,
    moreInfo: 'foo'
  })
  t.ok(err)
  t.equal(err.message, 'Неправильный пароль или имя пользователя')
  t.equal(err.code, 1040)
  t.equal(err.moreInfo, 'foo')

  t.end()
})

test('tools#normalizePhone', t => {
  t.ok(normalizePhone)
  t.equal(normalizePhone('+7 (922) 609-07-05'), '507090')
  t.equal(normalizePhone('as744 __-05**'), '50447')
  t.end()
})

test('tools#isPhonesCompare', t => {
  t.ok(isPhonesCompare)
  t.ok(isPhonesCompare('+7 (922) 609-07-05', '89226090705'))
  t.end()
})

'use strict'

const assert = require('assert')
const nodeFetch = require('node-fetch')

const actions = require('../actions')

const { MOYSKLAD_LOGIN, MOYSKLAD_PASSWORD } = process.env
const authHeader = 'Basic ' + Buffer.from(`${MOYSKLAD_LOGIN}:${MOYSKLAD_PASSWORD}`, 'utf8')
  .toString('base64')

const { normalizePhone, getMoyskladError } = require('../tools')

const getSearchUrl = search =>
  'https://online.moysklad.ru/api/remap/1.1/entity/counterparty?expand=contactpersons&search=' +
    encodeURIComponent(search)

const getCompanyUrl = id => 'https://online.moysklad.ru/app/#company/view?id=' + id

module.exports = core => next => action => {
  if (action.type !== actions.GET_CALLER_NAME) {
    return next(action)
  }

  // const { log } = core
  assert(typeof action.payload.callerNumber === 'string',
    'GET_CALLER_NAME action callerNumber must to be string')

  let phone = action.payload.callerNumber
  let normalizedPhone = normalizePhone(phone)

  return nodeFetch(getSearchUrl(phone), {
    method: 'GET',
    headers: { Authorization: authHeader }
  })
    .then(res => res.json())
    .then(res => {
      // Обрабатываем возможную ошибку
      let error = getMoyskladError(res)
      return error
        ? Promise.reject(error)
        : res.rows
    })
    .then(counterparties => {
      let contacts = counterparties.reduce((res, counterparty) => {
        // Для начала, нужно пробовать найти запрошенный номер телефона в связанных контактах
        if (counterparty.contactpersons) {
          let contactperson = counterparty.contactpersons.rows
            .find(contact => contact.phone
              ? contact.phone
                .split(/[;,]/g)
                .map(normalizePhone)
                .some(np => np === normalizedPhone)
              : false)

          if (contactperson) {
            res.push({
              contact: {
                id: contactperson.id,
                url: getCompanyUrl(counterparty.id),
                name: contactperson.name,
                email: contactperson.email || counterparty.email
              },
              company: {
                id: counterparty.id,
                url: getCompanyUrl(counterparty.id),
                title: counterparty.name + (counterparty.code ? ` [${counterparty.code}]` : ''),
                email: counterparty.email
              }
            })
            return res
          }
        }

        // Если контакт не найден, возвращаем компанию
        res.push({
          contact: {
            id: counterparty.id,
            url: getCompanyUrl(counterparty.id),
            title: counterparty.name + (counterparty.code ? ` [${counterparty.code}]` : ''),
            email: counterparty.email
          }
        })

        return res
      }, [])

      return core.dispatch({
        type: actions.CALLER_NAME,
        payload: {
          phone,
          caller: contacts[0]
        }
      })
    })
}

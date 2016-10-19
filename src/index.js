'use strict'

const {
  applyMiddleware //, composeAsync: compose
} = require('scaleflow')

const callerNameMiddleware = require('./middlewares/callerNameMiddleware')

module.exports = {
  callerNameMiddleware,
  onlinepbxMoysklad: applyMiddleware(callerNameMiddleware)
}

const getMoyskladError = res => {
  let createError = error => {
    let err = new Error(error.error)
    if (error.code) { err.code = error.code }
    if (error.moreInfo) { err.moreInfo = error.moreInfo }
    return err
  }
  if (res.errors) {
    return createError(res.errors[0])
  } else if (res.error) {
    return createError(res)
  } else {
    return
  }
}

const normalizePhone = phone =>
    phone.replace(/\D+/g, '').split('').reverse().join('').substring(0, 6)

const isPhonesCompare = (phone1, phone2) =>
    normalizePhone(phone1) === normalizePhone(phone2)

module.exports = { getMoyskladError, normalizePhone, isPhonesCompare }
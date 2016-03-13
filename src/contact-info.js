/**
 * contact-info
 * Date: 17.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var client = require('moysklad-client').createClient();
var PNF = require('google-libphonenumber').PhoneNumberFormat;
var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
var phoneParser = require('phone-parser');

function getCompanyUrl (companyUuid) {
  return 'https://online.moysklad.ru/app/#company/view?id=' + companyUuid
}

module.exports = function contactInfo (data, cb) {
  if (data && data.phone) {
    // 9226227755
    var parsedPhoneNumber = phoneUtil.parse(data.phone, 'RU');
    // +79226227755
    var phoneE164 = phoneUtil.format(parsedPhoneNumber, PNF.E164);
    // +7 (922) 622-77-55
    var phoneNumber = phoneParser(phoneE164, '+x (xxx) xxx-xx-xx');

    client.from('company')
      .filter('contact.phones', phoneNumber)
      .first(function (err, company) {
        if (err) {
          return cb(new Error('Ошибка запроса к серверу МойСклад'));
        }

        if (company) {
          cb(null, {
            'contact': {
              'id': company.uuid,
              'url': getCompanyUrl(company.uuid),
              'name': company.name,
              'email': company.contact ? company.contact.email : null
            }
            //'company': {
            //  'id': company.uuid,
            //  'url': getCompanyUrl(company.uuid),
            //  'title': company.name,
            //  'email': company.contact ? company.contact.email : null
            //}
          })
        } else {
          cb(new Error('Контрагент по номеру ' + data.phone + ' не найден'));
        }
      });
  }
};
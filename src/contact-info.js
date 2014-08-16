/**
 * contact-info
 * Date: 17.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var client = require('moysklad-client').createClient();

const companyUrl = 'https://online.moysklad.ru/app/#company/view?id=';

var contactInfo = function (data, cb) {
    if (data && data.phone) {
        var company = client.from('company')
            .filter('contact.phones', data.phone)
            .first(function (err, company) {
                if (err) {
                    cb(new Error('Ошибка запроса к серверу МойСклад'));

                } else {
                    if (company) {
                        cb(null, {
                            "company" : {
                                "id"    : company.uuid,
                                "url"   : companyUrl + company.uuid,
                                "title" : company.name,
                                "email" : company.contact ? company.contact.email : null
                            }
                        })
                    } else {
                        cb(new Error('Контрагент по номеру ' + data.phone + ' не найден'));
                    }
                }
            });
    }
};

module.exports = contactInfo;
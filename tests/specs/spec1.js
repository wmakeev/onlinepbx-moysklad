/**
 * spec1
 * Date: 17.08.14
 * Vitaliy V. Makeev (w.makeev@gmail.com)
 */

var _           = require('lodash')
  , client      = require('moysklad-client').createClient()
  , pbxMethods  = require('../../')
  , chai        = require('chai')
  , expect      = chai.expect;

chai.should();

describe('PBX api', function () {

    before(function () {

    });

    it('methods should be defined', function () {
        expect(pbxMethods).to.be.ok;
        expect(pbxMethods.test).to.be.ok;
        expect(pbxMethods['contact_info']).to.be.ok;
    });

    it('test should return ok', function (done) {
        pbxMethods.test(null, function (err, data) {
            expect(data).to.be.ok;
            expect(data.status).to.be.equal('1');
            done();
        })
    });

    it('contact_info should return company', function (done) {
        var requestData = { phone: '+7 (922) 609-07-05' };

        pbxMethods['contact_info'](requestData, function (err, data) {
            expect(data).to.be.ok;
            expect(data).to.include.keys('company');
            expect(data.company).to.include.keys(['id', 'url', 'title', 'email']);
            done();
        })
    });
});
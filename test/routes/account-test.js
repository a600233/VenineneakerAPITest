let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Account', function (){
        describe('GET /account',  () => {
            it('should return all the selling in an array', function(done) {
                chai.request(server)
                    .get('/account')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        expect(res.body.length).to.equal(3);
                        let result = _.map(res.body, (account) => {
                            return { account_id: account.account_id,
                                account_name: account.account_name }
                        });
                        expect(result).to.include( { account_id: 100001, account_name: 'JIE_Bao'  } );
                        expect(result).to.include( { account_id: 100002, account_name: 'Yan.Liu'  } );
                        done();
                    });
            });
        });
        describe('POST /account', function () {
            it('should return confirmation message and update db', function(done) {
                let order = {
                    account_name: "ShawnStussy",
                    account_id: 100008,
                    gender: [],
                    selling:[],
                    buying: [],
                    following_sneakers: "555088-610",
                    registration_date:  '2017-10-10'
                };
                chai.request(server)
                    .post('/account')
                    .send(order)
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Account Info Successfully Added!' );
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/account')
                    .end(function(err, res) {
                        let result = _.map(res.body, (account) => {
                            return { account_id: account.account_id,
                                account_name: account.account_name }
                        });
                        expect(result).to.include( { account_id: 'ShawnStussy', account_name: '100008' } );
                        done();
                    });
            });
        });
        describe('DELETE /account/:_id',  function() {
            it('should return confirmation message of deleting and update ', function(done) {
                chai.request(server)
                    .delete('/account/5bd1cf154194a00c8cb16b36')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Account Info Successfully Deleted!' );
                        done();
                    });
            });
            after(function  (done) {
                chai.request(server)
                    .get('/account')
                    .end(function(err, res) {
                        let result = _.map(res.body, (account) => {
                            return { account_id: account.account_id,
                                account_name: account.account_name }
                        });
                        expect(result).to.include( {   account_id: 'ShawnStussy', account_name: '100008'} );
                        done();
                    });
            });
        });

    });

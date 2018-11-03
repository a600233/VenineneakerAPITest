let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
//let datastore = require('mongoose');
//datastore.connect('mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb');
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );	

describe('Account', function (){
  
    describe('GET /account',  () => {
        it('should return all the account in an array', function(done) {
            chai.request(server)
              .get('/account')
             .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body.length).to.equal(3);
    let result = _.map(res.body, (account) => {
        return { account_name: account.account_name,
            account_id: account.account_id } 
        });
    expect(result).to.include( { account_name: 'JIE_Bao', account_id: 2000001 } );
	expect(result).to.include( { account_name: 'Yan.Liu', account_id: 2000002 } );
    done();
});
        });
    });
	
	describe('POST /account', function () {
        it('should return confirmation message and update db', function(done) {
            let account = {            
	 account_name: "Eminem",
    account_id: 2000004,
    gender: "Male",
    selling: [],
    buying: [],
    following_sneakers: [943807-012],
    registration_date:"2017-10-17",
            };
            chai.request(server)
                .post('/account')
                .send(account)
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
                        return { account_name: account.account_name,
                            account_id: account.account_id };
                    }  );
					 expect(res.body.length).to.equal(4);
                    expect(result).to.include( { account_name: 'Eminem', account_id: 2000004 } );
                    done();
                });
        });
    });
});
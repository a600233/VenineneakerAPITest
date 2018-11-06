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
        it('should return all the accounts in an array', function(done) {
            chai.request(server)
              .get('/account')
             .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body.length).to.equal(3);
    let result = _.map(res.body, (account) => {
        return { account_name: account.account_name,
            gender: account.gender } 
        });
    expect(result).to.include( { account_name: 'JIE_Bao', gender: 'Male' } );
	expect(result).to.include( { account_name: 'Yan.Liu', gender: 'Male' } );
    done();
});
        });
    });
	
	describe('POST /account', function () {
        it('should return confirmation message and update db', function(done) {
            let account = {            
		_id: 2000004,
		account_name: "Eminem",
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
                            gender: account.gender };
                    }  );
					 expect(res.body.length).to.equal(4);
                    expect(result).to.include( { account_name: 'Eminem', gender: 'Male' } );
                    done();
                });
        });
    });
	
	describe('DELETE /account/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/account/2000004')
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
                        return {account_name: account.account_name,
                            gender: account.gender  };
                    }  );
						expect(res.body.length).to.equal(3);
						expect(result).to.include( { account_name: 'ZiTing-Wang', gender: 'Male' } );
                    done();
                });
        });
		 });
		 describe('DELETE /account/:_id',  function() {
	  it('should return fault and a message for invalid account id',function(done){
				chai.request(server)
				.delete('/account/b000002')
				.end(function(err, res){
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('message').equal('Account Info NOT DELETED!');
					done();
				});
			});
		});
		
		describe('GET /account/:_id',  () => {
        it('should return one account info by account id in an array', function(done) {
            chai.request(server)
              .get('/account/2000003')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		expect(res.body.length).to.equal(1);
		let result = _.map(res.body, (selling) => {
			return { account_name: selling.account_name,
				gender: selling.gender } 
        });
		expect(res.body.length).to.equal(1);
		expect(result).to.include( { account_name: 'ZiTing-Wang', gender: 'Male' } );
		done();
});
        });
    });
	
	describe('GET /account/an/:account_name',  () => {
        it('should return one specific selling info by fuzzy searching name in an array', function(done) {
            chai.request(server)
              .get('/account/an/zitin')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		let result = _.map(res.body, (selling) => {
			return { account_name: selling.account_name,
				gender: selling.gender } 
        });
		expect(res.body.length).to.equal(1);
		expect(result).to.include( { account_name: 'ZiTing-Wang', gender: 'Male' } );
		done();
});
        });
    });	
	
	describe('GET /account/s_a/show',  () => {
        it('should return THREE aggregated collections with account info in an array', function(done) {
            chai.request(server)
              .get('/account/s_a/show')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		let result = _.map(res.body, (account) => {
			return { account_name: account.account_name,
            account_id: account.account_id } 
        });
		expect(res.body.length).to.equal(3);
		expect(result).to.include( { account_name: 'JIE_Bao', account_id: 2000001  } );
		done();
});
        });
    });
	
	describe('GET /account/b_a/show',  () => {
        it('should return Two aggregated collections with account info in an array', function(done) {
            chai.request(server)
              .get('/account/b_a/show')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		let result = _.map(res.body, (account) => {
			return { account_name: account.account_name,
            gender: account.gender } 
        });
		expect(res.body.length).to.equal(3);
		expect(result).to.include( { account_name: 'JIE_Bao', gender: 'Male'  } );
		done();
});
        });
    });
});
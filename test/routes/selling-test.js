import chai from 'chai';
import chaiHttp from 'chai-http' ;
import server from '../../bin/www';
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));
import _ from 'lodash';

describe('Selling', function (){

    describe('GET /selling',  () => {
        it('should return all the selling in an array', function(done) {
            chai.request(server)
                .get('/selling')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (selling) => {
                        return { size: selling.size,
                            selling_price: selling.selling_price };
                    });
                    expect(result).to.include( { size: 41, selling_price: 280 } );
                    expect(result).to.include( { size: 42, selling_price: 395 } );
                    done();
                });
        });
    });
    describe('POST /selling', function () {
        it('should return confirmation message and update db', function(done) {
            let selling = {
                _id:1000002,
                brand: 'Under Armour',
                series: 'CURRY 4',
                name: 'White Black',
                size: 38,
                article_number: '1298306-102',
                selling_price: 140,
                account_name: 'Yan.Liu',
                selling_amount: 1,
            };
            chai.request(server)
                .post('/selling')
                .send(selling)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Selling Info Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/selling')
                .end(function(err, res) {
                    let result = _.map(res.body, (selling) => {
                        return { size: selling.size,
                            article_number: selling.article_number };
                    }  );
					 expect(res.body.length).to.equal(4);
                    expect(result).to.include( { size: 38, article_number: '1298306-102' } );
                    done();
                });
        });
    });

    describe('PUT /selling/:_id/selling_amount', () => {
        it('should return a message and the selling amount increased by 1', function(done) {
            chai.request(server)
                .put('/selling/1000002/selling_amount')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    let selling = res.body.data ;
                    expect(selling).to.include( { _id: 1000002, selling_amount: 2  } );
                    done();
                });
        });
	 it('should return a 404 and a message for invalid selling id', function(done) {
            chai.request(server)
                .put('/selling/a100001/selling_amount')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message','Selling Info NOT Found!' ) ;
                    done();
                });
        });
    });
    describe('PUT /selling/:_id/', () => {
        it('should return a message ', function(done) {
            let selling = {
                _id:1000002,
                brand: 'Under Armour',
                series: 'CURRY 4',
                name: 'White Black',
                size: 39,
                article_number: '1298306-102',
                selling_price: 140,
                account_name: 'Yan.Liu',
                selling_amount: 2,
            };
            chai.request(server)
                .put('/selling/1000002')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Selling Info Location Successfully Change!' );
                    done();
                });
        });
    });
    describe('DELETE /selling/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/selling/1000002')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Selling Info Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/selling')
                .end(function(err, res) {
                    let result = _.map(res.body, (selling) => {
                        return { size: selling.size,
                            article_number: selling.article_number };
                    }  );
                    expect(res.body.length).to.equal(3);
                    expect(result).to.include( { size: 42, article_number: '555088-403'} );
                    done();
                });
        });
		 });


		 describe('DELETE /selling/:_id',  function() {
	  it('should return fault and a message for invalid selling id',function(done){
            chai.request(server)
                .delete('/selling/a000002')
                .end(function(err, res){
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Selling Info NOT DELETED!');
                    done();
                });
        });
    });

    describe('GET /selling/:_id',  () => {
        it('should return one the selling info in an array', function(done) {
            chai.request(server)
                .get('/selling/1000001')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(1);
                    let result = _.map(res.body, (selling) => {
                        return { size: selling.size,
                            selling_price: selling.selling_price };
                    });
                    expect(res.body.length).to.equal(1);
                    expect(result).to.include( { size: 44, selling_price: 389 } );
                    done();
                });
        });
    });

    describe('GET /selling/sort/price',  () => {
        it('should return all selling info sorted by positive sequence in an array', function(done) {
            chai.request(server)
                .get('/selling/sort/price')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    let result = _.map(res.body, (selling) => {
                        return { size: selling.size,
                            selling_price: selling.selling_price };
                    });
                    expect(res.body.length).to.equal(3);
                    expect(result[0]).to.include( { size: 41, selling_price: 280 } );
                    expect(result[1]).to.include( { size: 44, selling_price: 389 } );
                    expect(result[2]).to.include( { size: 42, selling_price: 395 } );
                    done();
                });
        });
    });
    describe('GET /selling/info/:keyword',  () => {
        it('should return one specific selling info by fuzzy search in an array', function(done) {
            chai.request(server)
                .get('/selling/info/undercov')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    let result = _.map(res.body, (selling) => {
                        return { brand: selling.brand,
                            article_number: selling.article_number };
                    });
                    expect(res.body.length).to.equal(1);
                    expect(result).to.include( { brand: 'Nike', article_number: 'BQ2718-200' } );
                    done();
                });
        });
    });

    describe('GET /selling/s_s/show',  () => {
        it('should return TWO aggregated collections with selling info in an array', function(done) {
            chai.request(server)
                .get('/selling/s_s/show')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    let result = _.map(res.body, (selling) => {
                        return { size: selling.size,
                            account_name: selling.account_name };
                    });
                    expect(res.body.length).to.equal(3);
                    expect(result).to.include( { size: 41, account_name: 'JIE_Bao' } );
                    done();
                });
        });
    });
});

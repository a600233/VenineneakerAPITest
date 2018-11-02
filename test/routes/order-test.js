let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Order', function (){

    describe('GET /order',  () => {
        it('should return all the selling in an array', function(done) {
            chai.request(server)
                .get('/order')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(2);
                    let result = _.map(res.body, (selling) => {
                        return { buyer_account_name: selling.buyer_account_name,
                            seller_account_name: selling.seller_account_name }
                    });
                    expect(result).to.include( { buyer_account_name: 'ZiTing-Wang', seller_account_name: 'JIE_Bao'  } );
                    expect(result).to.include( { buyer_account_name: 'Yan.Liu', seller_account_name: 'JIE_Bao'  } );
                    done();
                });
        });
    });
    describe('POST /order', function () {
        it('should return confirmation message and update db', function(done) {
            let order = {
                buyer_account_name: "MarshallYin",
                seller_account_name: "SNS",
                brand: "Nike",
                series: "Air Jordan 1 Retro High",
                name: "Game Royal",
                size: 42,
                selling_price: 395,
                shipping_address: "Ireland, Waterford, Inner Ring Road, Riverwalk 219A",
                order_time: 2018-9-20
            };
            chai.request(server)
                .post('/order')
                .send(order)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Order Info Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/order')
                .end(function(err, res) {
                    let result = _.map(res.body, (selling) => {
                        return { buyer_account_name: selling.buyer_account_name,
                            seller_account_name: selling.seller_account_name }
                    });
                    expect(result).to.include( { buyer_account_name: 'MarshallYin', seller_account_name: 'SNS' } );
                    done();
                });
        });
    });
    describe('DELETE /order/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/order/5bd1cf154194a00c8cb16b36')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Order Info Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/order')
                .end(function(err, res) {
                    let result = _.map(res.body, (selling) => {
                        return { buyer_account_name: selling.buyer_account_name,
                            seller_account_name: selling.seller_account_name }
                    });
                    expect(result).to.include( {  buyer_account_name: 'MarshallYin', seller_account_name: 'SNS'} );
                    done();
                });
        });
    });

});
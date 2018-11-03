let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
//let datastore = require('mongoose');
//datastore.connect('mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb');
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );	

describe('Order', function (){
  
    describe('GET /order',  () => {
        it('should return all the order in an array', function(done) {
            chai.request(server)
              .get('/order')
             .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body.length).to.equal(2);
    let result = _.map(res.body, (order) => {
        return { buyer_account_name: order.buyer_account_name,
            seller_account_name: order.seller_account_name } 
        });
    expect(result).to.include( { buyer_account_name: 'ZiTing-Wang', seller_account_name: 'JIE_Bao' } );
	expect(result).to.include( { buyer_account_name: 'Yan.Liu', seller_account_name: 'JIE_Bao' } );
    done();
});
        });
    });
	
	describe('POST /order', function () {
        it('should return confirmation message and update db', function(done) {
            let order = {            
	_id:3000003,
    buyer_account_name: "Eminem",
    seller_account_name: "Marshall_Yin",
    brand: "Nike",
    series: "Air Jordan 4 Retro",
    name: "Eminem Carhartt",
    size: 43,
    selling_price: 11240,
	amount: 1,
    shipping_address: "USA, Michigan, Detroit, 8 Mile Street, Trailer Rabbit",
    order_time:'2018-10-17',
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
                    let result = _.map(res.body, (order) => {
                        return { buyer_account_name: order.buyer_account_name,
                            seller_account_name: order.seller_account_name };
                    }  );
					 expect(res.body.length).to.equal(3);
                    expect(result).to.include( { buyer_account_name: 'Eminem', seller_account_name: 'Marshall_Yin' } );
                    done();
                });
        });
    });
	
	describe('PUT /order/:_id/amount', () => {
      it('should return a message and the order amount increased by 1', function(done) {
         chai.request(server)
            .put('/order/3000003/amount')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                let order = res.body.data ;
                expect(order).to.include( { _id: 3000003, amount: 2  } );
                done();
            });
    });
	 it('should return a 404 and a message for invalid order id', function(done) {
        chai.request(server)
            .put('/order/c000004/amount')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message','Order NOT Found!' ) ;
                done();
            });
    });
})

describe('DELETE /order/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/order/3000003')
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
                    let result = _.map(res.body, (order) => {
                        return { buyer_account_name: order.buyer_account_name,
                            seller_account_name: order.seller_account_name };
                    }  );
						expect(res.body.length).to.equal(2);
						expect(result).to.include( { buyer_account_name: 'ZiTing-Wang', seller_account_name: 'JIE_Bao'} );
                    done();
                });
        });
		 });
		 
		 
		 describe('DELETE /order/:_id',  function() {
	  it('should return fault and a message for invalid order id',function(done){
				chai.request(server)
				.delete('/order/c000004')
				.end(function(err, res){
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('message').equal('Order Info NOT DELETED!');
					done();
				});
			});
		});
		
		describe('GET /order/:_id',  () => {
        it('should return one the order info in an array', function(done) {
            chai.request(server)
              .get('/order/3000001')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		expect(res.body.length).to.equal(1);
		let result = _.map(res.body, (order) => {
			return { buyer_account_name: order.buyer_account_name,
                            seller_account_name: order.seller_account_name} 
        });
		expect(res.body.length).to.equal(1);
		expect(result).to.include( {buyer_account_name: 'ZiTing-Wang', seller_account_name: 'JIE_Bao'} );
		done();
});
        });
    });
});
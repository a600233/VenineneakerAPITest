let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
//let datastore = require('mongoose');
//datastore.connect('mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb');
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Donations', function (){
  
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
            selling_price: selling.selling_price } 
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
    brand: "Under Armour",
    series: "CURRY 4",
    name: "White Black",
    size: 38,
    article_number: "1298306-102",
    selling_price: 140,
    account_name: "Yan.Liu",
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
		
		describe('PUT /selling/:_id/selling_amount', () => {
      it('should return a message and the selling amount increased by 1', function(done) {
         chai.request(server)
            .put('/selling/1000001/selling_amount')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                let selling = res.body.data ;
                expect(selling).to.include( { _id: 1000001, selling_amount: 2  } );
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
})

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
				selling_price: selling.selling_price } 
        });
		expect(res.body.length).to.equal(1);
		expect(result).to.include( { size: 42, selling_price: 395 } );
		done();
});
        });
    });
});
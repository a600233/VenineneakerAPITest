let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
//let datastore = require('mongoose');
//datastore.connect('mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb');
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );	

describe('Sneaker', function (){
  
    describe('GET /sneaker',  () => {
        it('should return all the sneaker in an array', function(done) {
            chai.request(server)
              .get('/sneaker')
             .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body.length).to.equal(7);
    let result = _.map(res.body, (sneaker) => {
        return { brand: sneaker.brand,
            article_number: sneaker.article_number } 
        });
    expect(result).to.include( { brand: 'Converse', article_number: '162131C' } );
	expect(result).to.include( { brand: 'Nike', article_number: 'BQ2718-200' } );
    done();
});
        });
    });
	
	describe('POST /sneaker', function () {
        it('should return confirmation message and update db', function(done) {
            let sneaker = {            
		_id: 60000008,
		brand: "Nike",
		series: "Air Jordan 4 Retro",
		name: "Eminem Carharrt",
		color: "Retro Black/Metallic Sliver",
		original_price: 10000,
		article_number: "136863",
		release_date:'2015-11-23',
            };
            chai.request(server)
                .post('/sneaker')
                .send(sneaker)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Sneaker Info Successfully Added!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/sneaker')
                .end(function(err, res) {
                    let result = _.map(res.body, (sneaker) => {
                        return { brand: sneaker.brand,
                            article_number: sneaker.article_number };
                    }  );
					 expect(res.body.length).to.equal(8);
                    expect(result).to.include( { brand: 'Nike', article_number: '136863' } );
                    done();
                });
        });
    });
	
	describe('DELETE /sneaker/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/sneaker/60000008')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Sneaker Info Successfully Deleted!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/sneaker')
                .end(function(err, res) {
                    let result = _.map(res.body, (sneaker) => {
                        return {brand: sneaker.brand,
							article_number: sneaker.article_number   };
                    }  );
						expect(res.body.length).to.equal(7);
						expect(result).to.include( { brand: 'New Balance', article_number: 'M990GL4' } );
                    done();
                });
        });
		 });
		 

		 describe('DELETE /sneaker/:_id',  function() {
	  it('should return fault and a message for invalid sneaker id',function(done){
				chai.request(server)
				.delete('/sneaker/e0000002')
				.end(function(err, res){
					expect(res).to.have.status(200);
					expect(res.body).to.have.property('message').equal('Sneaker Info NOT DELETED!');
					done();
				});
			});
		}); 

		describe('GET /sneaker/find/:keyword',  () => {
        it('should return one specific sneaker info by name in an array', function(done) {
            chai.request(server)
              .get('/sneaker/find/one star')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		let result = _.map(res.body, (sneaker) => {
			return { brand: sneaker.brand,
            article_number: sneaker.article_number } 
        });
		expect(res.body.length).to.equal(1);
		expect(result).to.include( { brand: 'Converse', article_number: '162131C' } );
		done();
});
        });
    });

		
	describe('GET /sneaker/s_t/:keyword1/:keyword2',  () => {
        it('should return sneakers info during in specific TIME in an array', function(done) {
            chai.request(server)
              .get('/sneaker/s_t/2018-06-30/2018-01-01')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		let result = _.map(res.body, (sneaker) => {
			return { brand: sneaker.brand,
            article_number: sneaker.article_number } 
        });
		expect(res.body.length).to.equal(2);
		expect(result).to.include( { brand: 'Converse', article_number: '162131C' } );
		expect(result).to.include( { brand: 'Nike', article_number: '555088-403' } );
		done();
});
        });
    });
	
	describe('GET /sneaker/s_t/:keyword1/:keyword2',  () => {
        it('should return sneakers info just on the boundary test of TIME in an array', function(done) {
            chai.request(server)
              .get('/sneaker/s_t/2018-04-26/2018-03-24')
             .end(function(err, res) {
		expect(res).to.have.status(200);
		expect(res.body).to.be.a('array');
		let result = _.map(res.body, (sneaker) => {
			return { brand: sneaker.brand,
            article_number: sneaker.article_number } 
        });
		expect(res.body.length).to.equal(2);
		expect(result).to.include( { brand: 'Converse', article_number: '162131C' } );
		expect(result).to.include( { brand: 'Nike', article_number: '555088-403' } );
		done();
});
        });
    });
	
	describe('GET /sneaker/s_t/:keyword1/:keyword2',  () => {
        it('should return sneakers info out of the boundary of TIME in an array', function(done) {
            chai.request(server)
              .get('/sneaker/s_t/2018-03-31/2018-03-25')
             .end(function(err, res) {
		expect(res.body.length).to.equal(0);
		done();
});
        });
    });
});
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Sneaker', function (){
    describe('GET /sneaker',  () => {
        it('should return all the selling in an array', function(done) {
            chai.request(server)
                .get('/sneaker  ')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(6);
                    let result = _.map(res.body, (sneaker) => {
                        return { name: sneaker.name,
                            article_number: sneaker.article_number }
                    });
                    expect(result).to.include( { name: 'Undercover Light Beige Chalk', article_number: 'BQ2718-200'  } );
                    expect(result).to.include( { name: 'White Black', article_number: '1298306-102'  } );
                    done();
                });
        });
    });
    describe('POST /sneaker', function () {
        it('should return confirmation message and update db', function(done) {
            let sneaker = {
                brand: "New Balance",
                series: "990v4",
                name: "Kith.Grey",
                color: "Grey/White",
                original_price: 175,
                article_number: "M990GL4.",
                release_date:'2018-8-21'
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
                        return { name: sneaker.name,
                            article_number: sneaker.article_number }
                    });
                    expect(result).to.include( { name: 'Kith.Grey', article_number: 'M990GL4.' } );
                    done();
                });
        });
    });
    describe('DELETE /sneaker/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/sneaker/5bd1cf154194a00c8cb16b36')
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
                        return { name: sneaker.name,
                            article_number: sneaker.article_number }
                    });
                    expect(result).to.include( { name: 'Kith.Grey', article_number: 'M990GL4.' } );
                    done();
                });
        });
    });

});

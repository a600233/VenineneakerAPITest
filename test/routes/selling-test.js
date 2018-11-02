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
    // TODO
  /*beforeEach(function(){
        while(selling.length > 0) {
            datastore.pop();
        }
      datastore.push(
            {brand: 'Nike', series: 'React Element 87', name: 'Undercover Light Beige Chalk', size: 41,article_number:'BQ2718-200',selling_price:280,account_name:'JIE_Bao'}
        );
      datastore.push(
            {brand: 'Nike', series: 'Air Jordan 1 Retro High', name: 'Game Royal', size: 42,article_number:'555088-403',selling_price:395,account_name:'JIE_Bao'}
        );
    });*/
    describe('GET /selling',  () => {
        it('should return all the selling in an array', function(done) {
            chai.request(server)
              .get('/selling')
             .end(function(err, res) {
    expect(res).to.have.status(200);
    expect(res.body).to.be.a('array');
    expect(res.body.length).to.equal(0);
    let result = _.map(res.body, (selling) => {
        return { size: selling.size,
            selling_price: selling.selling_price } 
        });
    expect(result).to.include( { size: 41, selling_price: 280  } );
    expect(result).to.include( { size: 42, selling_price: 395  } );
    done();
});
        });
    });
    describe('POST /selling', function () {
        it('should return confirmation message and update db', function(done) {
            let selling = {
                brand: 'Nike',
                series: 'React Element 87',
                name: 'Undercover Light Beige Chalk',
                size: 42.5,
                article_number:'BQ2718-200',
                selling_price:299,
                account_name:'JIE_Bao'
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
                    expect(result).to.include( { size: 42.5, article_number: 'BQ2718-200' } );
                    done();
                });
        });
    });
    describe('DELETE /selling/:_id',  function() {
        it('should return confirmation message of deleting and update ', function(done) {
            chai.request(server)
                .delete('/selling/5bd1cf154194a00c8cb16b36')
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
                    expect(result).to.include( { size: 42.5, article_number: 'BQ2718-200'  } );
                    done();
                });
        });
    });
});
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
});
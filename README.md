# Assignment 1 - API testing and Source Control.
<br>

## Name:  Wujiuge Yin ##


### Overview ###

**My sneakers system consists by account, order, selling and sneaker. Account model records users’ names, ids, genders, selling information, buying information, following sneakers and registration date. Then, order model is buying information. It records buyers and sellers’ name, sneakers’ information, amount and address. Selling model has similar way. Sneaker model records details of sneaker.**
<br>

**It can get a user’s sneakers which are selling or just have bought in account model. It can provide selling information with detail sneakers’ data. Apart from that, it also can do fuzzy searches and sort price by sequence for details. Fuzzy search is also in sneaker, and show the sneakers are selling.**
<br>

## API endpoints ##
<br>

```javascript
app.get('/selling', selling.findAll);//Show all selling information.

app.get('/selling/:_id', selling.findOneById);//Find a set of selling data by id.

app.get('/selling/info/:keyword', selling.findSellingInfo);//Fuzzy search for selling details by sneakers’ keyword.

app.get('/selling/sort/:selling_price', selling.sortAllPrice);//Sort all selling price.

app.post('/selling',selling.addSelling);//Add a set of selling information.

app.delete('/selling/:_id', selling.deleteSelling);//Delete a set of information by id.

app.get('/selling/s_s/show', selling.findSellingSneakerInfoByPrice);//Selling with sneakers information and sorted by selling price.


app.put('/selling/:_id/selling_amount', selling.incrementSellingAmount);//Using put() to increse selling amount by id

app.get('/account',account.findAllAccount);//Show all accounts information.

app.post('/account',account.addAccount);//Add a set of account information.

app.delete('/account/:_id', account.deleteAccount);//Delete a set of account information by id.

app.get('/account/:_id',account.findOneByAccountId);//Find a set of account information by id.

app.get('/account/an/:account_name',account.findAccountByAccountName);//Fuzzy search for account details by account name.

app.get('/account/s_a/show',account.findSellingInfoByAccount);//Using aggregate() show accounts, selling and orders’ information together. (Hiding users’ account id, following sneakers and registration date.)

app.get('/account/b_a/show',account.findBuyingInfoByAccount);//Using aggregate() show accounts, buying(order) information together. (Hiding users’ account id, following sneakers and registration date.)


app.get('/order',order.findAllOrder);//Show all orders information.

app.post('/order',order.addOrder);//Add a set of order information.

app.delete('/order/:_id', order.deleteOrder);//Delete a set of order information by id.

app.get('/order/:_id',order.findOrderById);//Find a set of order information by Objectid.

app.get('/order/b_n/:buyer_account_name',order.findOrderByBuyerName);//Fuzzy search for account details by buyers’ names.

app.put('/order/:_id/amount',order.incrementAmounts);//Using put() to increase order amount.

app.get('/order/s_o/info',order.findSpecificOrderInfo);//Using aggregate() show order and account information together.

app.get('/sneaker',sneaker.findAllSneaker);//Show all accounts information.

app.post('/sneaker',sneaker.addSneaker);//Add a set of sneaker information.

app.delete('/sneaker/:_id', sneaker.deleteSneaker);//Delete a set of sneaker information by id.

app.get('/sneaker/find/:keyword',sneaker.findSpecificSneakerInfo);//Fuzzy search for account details by sneakers’ keywords.

app.get('/sneaker/s_t/:keyword1/:keyword2',sneaker.findSneakerByTime);//Input the period, and show the sneakers released during that time.
```
## Data storage.
```
//selling collection
let mongoose = require('mongoose');

let SellingSchema = new mongoose.Schema({
        _id: Number,
		brand: String,
        series: String,
        name: String,
        size: Number,
        article_number: String,
        selling_price: Number,
        account_name: String,
        selling_amount:{type: Number, default: 1},
    },
    { collection: 'sellingdb' });

module.exports = mongoose.model('Selling', SellingSchema);
```
<br>

```
//account collection
let mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
        _id: Number,
		account_name: String,
        gender: String,
        selling: Array,
        buying: Array,
        following_sneakers: Array,
        registration_date: Date,
    },
    { collection: 'accountdb' });

module.exports = mongoose.model('Account', AccountSchema);
```
<br>

```
//order collection
let mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
        _id: Number,
		buyer_account_name: String,
        seller_account_name: String,
        brand: String,
        series: String,
        name: String,
        size: Number,
        selling_price: Number,
        amount: {type: Number, default: 1},
        shipping_address: String,
        order_time: Date,
    },
    { collection: 'orderdb' });

module.exports = mongoose.model('Order', OrderSchema);
```
<br>

```
//sneaker collection
let mongoose = require('mongoose');

let SneakerSchema = new mongoose.Schema({
        _id: Number,
		brand: String,
        series: String,
        name: String,
        color: String,
        original_price: Number,
        article_number: String,
        release_date: Date
    },
    { collection: 'sneakerdb' });

module.exports = mongoose.model('Sneaker', SneakerSchema);
```
<br>

## Sample Test execution
```bash
$ npm test
```
<br>

```
 Account
    GET /account
Successfully Connected to [ sellingdb ]
Successfully Connected to [ sellingdb ]
Successfully Connected to [ sellingdb ]
Successfully Connected to [ sellingdb ]
      √ should return all the accounts in an array (100ms)
    POST /account
      √ should return confirmation message and update db (39ms)
    DELETE /account/:_id
(node:16472) DeprecationWarning: collection.findAndModify is deprecated. Use findOneAndUpdate, findOneAndReplace or findOneAndDelete instead.
      √ should return confirmation message of deleting and update
    DELETE /account/:_id
      √ should return fault and a message for invalid account id
    GET /account/:_id
      √ should return one account info by account id in an array
    GET /account/an/:account_name
      √ should return one specific selling info by fuzzy searching name in an array
    GET /account/s_a/show
      √ should return THREE aggregated collections with account info in an array
    GET /account/b_a/show
      √ should return Two aggregated collections with account info in an array

  Order
    GET /order
      √ should return all the orders in an array
    POST /order
      √ should return confirmation message and update db
    PUT /order/:_id/amount
      √ should return a message and the order amount increased by 1
      √ should return a 404 and a message for invalid order id
    DELETE /order/:_id
      √ should return confirmation message of deleting and update
    DELETE /order/:_id
      √ should return fault and a message for invalid order id
    GET /order/:_id
      √ should return one the order info in an array
    GET /order/b_n/:buyer_account_name
      √ should return one specific order info by searching buyer name in an array
    GET /order/s_o/info
      √ should return all orders info with account info in an array

  Selling
    GET /selling
      √ should return all the selling in an array
    POST /selling
      √ should return confirmation message and update db
    PUT /selling/:_id/selling_amount
      √ should return a message and the selling amount increased by 1
      √ should return a 404 and a message for invalid selling id
    DELETE /selling/:_id
      √ should return confirmation message of deleting and update
    DELETE /selling/:_id
      √ should return fault and a message for invalid selling id
    GET /selling/:_id
      √ should return one the selling info in an array
    GET /selling/sort/price
      √ should return all selling info sorted by positive sequence in an array
    GET /selling/info/:keyword
      √ should return one specific selling info by fuzzy search in an array
    GET /selling/s_s/show
      √ should return TWO aggregated collections with selling info in an array

  Sneaker
    GET /sneaker
      √ should return all the sneakers in an array
    POST /sneaker
      √ should return confirmation message and update db
    DELETE /sneaker/:_id
      √ should return confirmation message of deleting and update
    DELETE /sneaker/:_id
      √ should return fault and a message for invalid sneaker id
    GET /sneaker/find/:keyword
      √ should return one specific sneaker info by fuzzy searching in an array
    GET /sneaker/s_t/:keyword1/:keyword2
      √ should return sneakers info IN specific TIME in an array
    GET /sneaker/s_t/:keyword1/:keyword2
      √ should return sneakers info just ON the boundary test of TIME in an array
    GET /sneaker/s_t/:keyword1/:keyword2
      √ should return sneakers info OUT of the boundary of TIME in an array


  35 passing (730ms)
```
<br>

## Extra features
### Testing all get app() with get, put, post and delete, including boundary cases, sophisticated API target and etc.
<br>

##  Part of Code
###  Boundary Test
```
	describe('GET /sneaker/s_t/:keyword1/:keyword2',  () => {
        it('should return sneakers info IN specific TIME in an array', function(done) {
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
        it('should return sneakers info just ON the boundary test of TIME in an array', function(done) {
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
        it('should return sneakers info OUT of the boundary of TIME in an array', function(done) {
            chai.request(server)
              .get('/sneaker/s_t/2018-03-31/2018-03-25')
             .end(function(err, res) {
		expect(res.body.length).to.equal(0);
		done();
});
        });
    });
```
<br>

### Test of get().
```
//Fuzzy search

describe('GET /sneaker/find/:keyword',  () => {
        it('should return one specific sneaker info by fuzzy searching in an array', function(done) {
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
```
<br>

```
//Three collections aggregation query.

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
```
<br>

### Test of post()
```
//Add selling info.
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
})
```
<br>

### Test of delete()
```
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
```

 # Assignment 2 - Web API - Automated development process.

## Name: Wujiuge Yin  ##
## Student No.: 20082255  ##
<br>

## Overview ##

**My sneakers system consists by account, order, selling and sneaker. Account model records users’ names, ids, genders, selling information, buying information, following sneakers and registration date. Then, order model is buying information. It records buyers and sellers’ name, sneakers’ information, amount and address. Selling model has similar way. Sneaker model records details of sneaker.**
<br>

**It can get a user’s sneakers which are selling or just have bought in account model. It can provide selling information with detail sneakers’ data. Apart from that, it also can do fuzzy searches and sort price by sequence for details. Fuzzy search is also in sneaker, and show the sneakers are selling.**
<br>

## API endpoints ##

**+ GET /selling - Show all selling information.**

**+ GET /selling/:_id - Find a set of selling data by id.**

**+ GET /selling/info/:keyword - Fuzzy search for selling details by sneakers’ keyword.**

**+ GET /selling/sort/:selling_price - Sort all selling price.**

**+ POST/selling - Add a set of selling information.**

**+ DELETE/selling/:_id - Delete a set of information by id.**

**+ GET /selling/s_s/show - Selling with sneakers information and sorted by selling price.**


**+ PUT/selling/:_id/selling_amount - Using put() to increse selling amount by id.**

**+ PUT/selling/:_id - Using put() to adding edit fuction for vue.**

**+ GET /account - Show all accounts information.**

**+ POST/account - Add a set of account information.**

**+ DELETE/account/:_id - Delete a set of account information by id.**

**+ GET /account/:_id - Find a set of account information by id.**

**+ GET /account/an/:account_name - Fuzzy search for account details by account name.**

**+ GET /account/s_a/show - Using aggregate() show accounts, selling and orders’ information together. (Hiding users’ account id, following sneakers and registration date.)**

**+ GET /account/b_a/show - Using aggregate() show accounts, buying(order) information together. (Hiding users’ account id, following sneakers and registration date.)**


**+ GET /order - Show all orders information.**

**+ POST/order - Add a set of order information.**

**+ DELETE/order/:_id - Delete a set of order information by id.**

**+ GET /order/:_id - Find a set of order information by Objectid.**

**+ GET /order/b_n/:buyer_account_name - Fuzzy search for account details by buyers’ names.**

**+ PUT/order/:_id/amount - Using put() to increase order amount.**

**+ GET /order/s_o/info - Using aggregate() show order and account information together.**

**+ GET /sneaker - Show all accounts information.**

**+ POST/sneaker - Add a set of sneaker information.**

**+ DELETE/sneaker/:_id - Delete a set of sneaker information by id.**

**+ GET /sneaker/find/:keyword - Fuzzy search for account details by sneakers’ keywords.**

**+ GET /sneaker/s_t/:time1/:time2  - Input the period, and show the sneakers released during that time.** 
<br>
<br>

## Continuous Integration and Test results.


[Travis Build Page for Web API](https://travis-ci.org/a600233/VenineneakerAPITest)
<br><br>
[Test Coverage Results on Coveralls](https://coveralls.io/github/a600233/donationsAPI)
<br>

## Github

### [My Github Link for API Test](https://github.com/a600233/VeninesneakerVueTest)
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
    PUT /selling/:_id/
      √ should return a message  (101ms)
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
    GET /sneaker/s_t/:time1/:time2
      √ should return sneakers info IN specific TIME in an array
    GET /sneaker/s_t/:time1/:time2
      √ should return sneakers info just ON the boundary test of TIME in an array
    GET /sneaker/s_t/:time1/:time2
      √ should return sneakers info OUT of the boundary of TIME in an array


  36 passing (730ms)
```
<br>

## Extra features
### Testing all get app() with get, put, post and delete, including boundary cases, sophisticated API target and etc. Building automation, Continuous Integration and depolying to Heroku. Platform-independence, transpilation by Babel platform, running multiple scripts, pre and Post hooks and watching are use for my api test.
<br>

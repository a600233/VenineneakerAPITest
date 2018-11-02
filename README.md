Wujiuge Yin 20082255

My sneakers system consists by account, order, selling and sneaker. Account model records users¡¯ names, ids, genders, selling information, buying information, following sneakers and registration date. Then, order model is buying information. It records buyers and sellers¡¯ name, sneakers¡¯ information, amount and address. Selling model has similar way. Sneaker model records details of sneakers.

It can get a user¡¯s sneakers which are selling or just have bought in account model. It can provide selling information with detail sneakers¡¯ data. Apart from that, it also can do fuzzy searches and sort price by sequence for details. Fuzzy search is also in sneaker, and show the sneakers are selling.

app.get('/selling', selling.findAll);
Show all selling information.

app.get('/selling/:_id', selling.findOneById);
Find a set of selling data by Objectid.

app.get('/selling/info/:keyword', selling.findSellingInfo);
Fuzzy search for selling details by sneakers¡¯ keyword.

app.get('/selling/sort/:selling_price', selling.sortAllPrice);
Sort all selling price.

app.post('/selling',selling.addSelling);
Add a set of selling information.

app.delete('/selling/:_id', selling.deleteSelling);
Delete a set of information by Objectid.

app.get('/selling/s_s/show', selling.findSellingSneakerInfoByPrice);
Selling with sneakers information and sorted by selling price.

app.put('/donations/:_id/vote', selling.incrementSellingAmount);
Using put() to increase selling amount.

app.get('/account',account.findAllAccount);
Show all accounts information.

app.post('/account',account.addAccount);
Add a set of account information.

app.delete('/account/:_id', account.deleteAccount);
Delete a set of account information by Objectid.

app.get('/account/:account_id',account.findOneByAccountId);
Find a set of account information by Objectid.

app.get('/account/an/:account_name',account.findAccountByAccountName);
Fuzzy search for account details by account name.

app.get('/account/s_a/show',account.findSellingInfoByAccount);
Using aggregate() show accounts, selling and orders¡¯ information together. (Hiding users¡¯ account id, following sneakers and registration date.)

app.get('/account/b_a/show',account.findBuyingInfoByAccount);
Using aggregate() show accounts, buying(order) information together. (Hiding users¡¯ account id, following sneakers and registration date.)

app.get('/order',order.findAllOrder);
Show all orders information.

app.post('/order',order.addOrder);
Add a set of order information.

app.delete('/order/:_id', order.deleteOrder);
Delete a set of order information by Objectid.

app.get('/order/:_id',order.findOrderById);
Find a set of order information by Objectid.

app.get('/order/b_n/:account_name',order.findOrderByBuyerName);
Fuzzy search for account details by buyers¡¯ names.

app.put('/order/:_id/amount',order.incrementAmounts);
Using put() to increase order amount.

app.get('/sneaker',sneaker.findAllSneaker);
Show all accounts information.

app.post('/sneaker',sneaker.addSneaker);
Add a set of sneaker information.

app.delete('/sneaker/:_id', sneaker.deleteSneaker);
Delete a set of sneaker information by Objectid.

app.get('/sneaker/find/:keyword',sneaker.findSpecificSneakerInfo);
Fuzzy search for account details by sneakers¡¯ keywords.

app.get('/sneaker/s_t/:keyword1/:keyword2',sneaker.findSneakerByTime);
Input the period, and show the sneakers released during that time.



YouTube:
https://youtu.be/bTSYGiK3Ac8

Bitbucket:
https://NineYW@bitbucket.org/NineYW/veninesneakers.git

Heroku:
https://veninesnekaer.herokuapp.com/



Reference:
https://stockx.com/
http://www.theduapp.com/website/pc
https://www.csdn.net/


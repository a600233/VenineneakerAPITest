/ eslint no-unused-vars：“off” /
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var cors = require('cors');


const selling = require("./routes/selling");
const account = require("./routes/account");
const order = require("./routes/order");
const sneaker = require("./routes/sneaker");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
if (process.env.NODE_ENV |= 'test') {
    app.use(logger('dev'));
}
//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/selling', selling.findAll);
app.get('/selling/:_id', selling.findOneById);
app.get('/selling/info/:keyword', selling.findSellingInfo);
app.get('/selling/sort/price', selling.sortAllPrice);
app.post('/selling',selling.addSelling);
app.delete('/selling/:_id', selling.deleteSelling);
app.get('/selling/s_s/show', selling.findSellingSneakerInfoByPrice);
app.put('/selling/:_id/selling_amount', selling.incrementSellingAmount);
app.put('/selling/:_id',selling.editSelling)

app.get('/account',account.findAllAccount);
app.post('/account',account.addAccount);
app.delete('/account/:_id', account.deleteAccount);
app.get('/account/:_id',account.findOneByAccountId);
app.get('/account/an/:account_name',account.findAccountByAccountName);
app.get('/account/s_a/show',account.findSellingInfoByAccount);
app.get('/account/b_a/show',account.findBuyingInfoByAccount);

app.get('/order',order.findAllOrder);
app.post('/order',order.addOrder);
app.delete('/order/:_id', order.deleteOrder);
app.get('/order/:_id',order.findOrderById);
app.get('/order/b_n/:buyer_account_name',order.findOrderByBuyerName);
app.put('/order/:_id/amount',order.incrementAmounts);
app.get('/order/s_o/info',order.findSpecificOrderInfo);

app.get('/sneaker',sneaker.findAllSneaker);
app.post('/sneaker',sneaker.addSneaker);
app.delete('/sneaker/:_id', sneaker.deleteSneaker);
app.get('/sneaker/find/:keyword',sneaker.findSpecificSneakerInfo);
app.get('/sneaker/s_t/:keyword1/:keyword2',sneaker.findSneakerByTime);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

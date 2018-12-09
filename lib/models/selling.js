'use strict';

var mongoose = require('mongoose');

var SellingSchema = new mongoose.Schema({
      _id: Number,
      brand: String,
      series: String,
      name: String,
      size: Number,
      article_number: String,
      selling_price: Number,
      account_name: String,
      selling_amount: { type: Number, default: 1 }
}, { collection: 'sellingdb' });

module.exports = mongoose.model('Selling', SellingSchema);
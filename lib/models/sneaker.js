'use strict';

var mongoose = require('mongoose');

var SneakerSchema = new mongoose.Schema({
      _id: Number,
      brand: String,
      series: String,
      name: String,
      color: String,
      original_price: Number,
      article_number: String,
      release_date: Date
}, { collection: 'sneakerdb' });

module.exports = mongoose.model('Sneaker', SneakerSchema);
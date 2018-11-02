let mongoose = require('mongoose');

let OrderSchema = new mongoose.Schema({
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

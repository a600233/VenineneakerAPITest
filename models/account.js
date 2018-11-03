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

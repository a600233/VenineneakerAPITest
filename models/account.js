let mongoose = require('mongoose');

let AccountSchema = new mongoose.Schema({
        account_name: String,
        account_id: Number,
        gender: String,
        selling: Array,
        buying: Array,
        following_sneakers: Array,
        registration_date: Date,
    },
    { collection: 'accountdb' });

module.exports = mongoose.model('Account', AccountSchema);

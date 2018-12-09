'use strict';

var _selling = require('../models/selling');

var _selling2 = _interopRequireDefault(_selling);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
var mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/sellingdb');

var db = mongoose.connection;
var mongodbUri = 'mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb';
mongoose.connect(mongodbUri);
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});
router.findAll = function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    _selling2.default.find(function (err, selling) {
        if (err) res.send(err);

        res.send(JSON.stringify(selling, null, 5));
    });
};
router.findOneById = function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    _selling2.default.find({ '_id': req.params._id }, function (err, selling) {
        if (err) res.json({ message: 'Selling Info NOT Found!', errmsg: err });else res.send(JSON.stringify(selling, null, 5));
    });
};
router.findSellingInfo = function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    var keywrod = req.params.keyword;
    var _filter1 = {
        $or: [{ brand: { $regex: keywrod, $options: '$i' } }, { series: { $regex: keywrod, $options: '$i' } }, { name: { $regex: keywrod, $options: '$i' } }, { article_number: { $regex: keywrod, $options: '$i' } }]
    };
    _selling2.default.find(_filter1).limit(5).sort({ 'selling_price': 1 }).exec(function (err, selling) {
        if (err) res.json({ message: 'Sneakers Selling Info NOT Found!', errmsg: err });else res.send(JSON.stringify(selling, null, 5));
    });
};

router.sortAllPrice = function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    _selling2.default.find().limit(10).sort({ 'selling_price': 1 }).exec(function (err, selling) {
        if (err) res.json({ errmsg: err });else res.send(JSON.stringify(selling, null, 5));
    });
};
router.findSellingSneakerInfoByPrice = function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    // var keyword1 =req.params.keyword1;
    //var keyword2 =req.query.keyword2;
    _selling2.default.aggregate([{
        $lookup: {
            from: 'sneakerdb',
            localField: 'article_number',
            foreignField: 'article_number',
            as: 'Sneakers Info:'
        }
    }, {
        $project: {
            'brand': 0,
            'series': 0,
            'name': 0,
            'article_number': 0
        }
    }, {
        $sort: {
            selling_price: 1
        }
    }], function (err, selling) {
        if (err) res.json({ message: 'Selling Sneakers Info NOT Found!', errmsg: err });else res.send(JSON.stringify(selling, null, 5));
    });
};
router.incrementSellingAmount = function (req, res) {

    _selling2.default.findById(req.params._id, function (err, selling) {
        if (err) res.json({ message: 'Selling Info NOT Found!', errmsg: err });else {
            selling.selling_amount += 1;
            selling.save(function (err) {
                if (err) res.json({ message: 'Selling Amounts are NOT Added!', errmsg: err });else res.json({ message: 'Selling Amounts are Successfully Added!', data: selling });
            });
        }
    });
};
router.addSelling = function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    var selling = new _selling2.default();
    selling._id = req.body._id;
    selling.brand = req.body.brand;
    selling.series = req.body.series;
    selling.name = req.body.name;
    selling.size = req.body.size;
    selling.color = req.body.color;
    selling.article_number = req.body.article_number;
    selling.selling_price = req.body.selling_price;
    selling.account_name = req.body.account_name;

    selling.save(function (err) {
        if (err) res.json({ message: 'Selling Info NOT Added!', errmsg: err });else res.json({ message: 'Selling Info Successfully Added!', data: selling });
    });
};
router.deleteSelling = function (req, res) {

    _selling2.default.findByIdAndRemove(req.params._id, function (err) {
        if (err) res.json({ message: 'Selling Info NOT DELETED!', errmsg: err });else res.json({ message: 'Selling Info Successfully Deleted!' });
    });
};
router.editSelling = function (req, res) {
    _selling2.default.findById(req.params._id, function (err, selling) {
        if (err) res.json({ message: 'Selling Info NOT Found!', errmsg: err });else {
            selling.brand = req.body.brand;
            selling.series = req.body.series;
            selling.name = req.body.name;
            selling.size = req.body.size;
            selling.article_number = req.body.article_number;
            selling.selling_price = req.body.selling_price;
            selling.account_name = req.body.account_name;
            selling.selling_amount = req.body.selling_amount;
            selling.save(function (err) {
                if (err) res.json({ message: 'Selling Info Location NOT Change!', errmsg: err });else res.json({ message: 'Selling Info Location Successfully Change!', data: selling });
            });
        }
    });
};
module.exports = router;
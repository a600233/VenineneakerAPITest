'use strict';

var _sneaker = require('../models/sneaker');

var _sneaker2 = _interopRequireDefault(_sneaker);

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
router.findAllSneaker = function (req, res) {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    _sneaker2.default.find(function (err, sneaker) {
        if (err) res.send(err);

        res.send(JSON.stringify(sneaker, null, 5));
    });
};

router.findSpecificSneakerInfo = function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    var keyword = req.params.keyword;
    var _filter1 = {
        $or: [{ brand: { $regex: keyword, $options: '$i' } }, { series: { $regex: keyword, $options: '$i' } }, { name: { $regex: keyword, $options: '$i' } }, { color: { $regex: keyword, $options: '$i' } }, { article_number: { $regex: keyword, $options: '$i' } }]
    };
    _sneaker2.default.find(_filter1).limit(5).exec(function (err, sneaker) {
        if (err) res.json({ message: 'Sneaker Info NOT Found!', errmsg: err });else res.send(JSON.stringify(sneaker, null, 5));
    });
};
router.findSneakerIsSelling = function (req, res) {

    res.setHeader('Content-Type', 'application/json');
    _sneaker2.default.aggregate([{
        $lookup: {
            from: 'sellingdb',
            localField: 'article_number',
            foreignField: 'article_number',
            as: 'Sneakers are selling:'
        }
    }], function (err, sneaker) {
        if (err) res.json({ errmsg: err });else res.send(JSON.stringify(sneaker, null, 5));
    });
};
router.findSneakerByTime = function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    var keyword1 = req.params.keyword1;
    var keyword2 = req.params.keyword2;
    _sneaker2.default.find({ 'release_date': { '$gte': new Date(keyword2), '$lte': new Date(keyword1) } }, function (err, sneaker) {
        if (err) res.send({ message: 'No Sneaker releases during that time!', errmsg: err });

        res.send(JSON.stringify(sneaker, null, 5));
    });
};
router.addSneaker = function (req, res) {

    res.setHeader('Content-Type', 'application/json');

    var sneaker = new _sneaker2.default();
    sneaker._id = req.body._id;
    sneaker.brand = req.body.brand;
    sneaker.series = req.body.series;
    sneaker.name = req.body.name;
    sneaker.color = req.body.color;
    sneaker.original_price = req.body.original_price;
    sneaker.article_number = req.body.article_number;
    sneaker.release_date = req.body.release_date;

    sneaker.save(function (err) {
        if (err) res.json({ message: 'Sneaker Info NOT Added!', errmsg: err });else res.json({ message: 'Sneaker Info Successfully Added!', data: sneaker });
    });
};
router.deleteSneaker = function (req, res) {

    _sneaker2.default.findByIdAndRemove(req.params._id, function (err) {
        if (err) res.json({ message: 'Sneaker Info NOT DELETED!', errmsg: err });else res.json({ message: 'Sneaker Info Successfully Deleted!' });
    });
};

module.exports = router;
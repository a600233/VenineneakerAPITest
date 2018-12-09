import Account from '../models/account';
import express from 'express';
let router = express.Router();
let mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/sellingdb');

let db = mongoose.connection;
var mongodbUri ='mongodb://a600233:cs748596123@ds225703.mlab.com:25703/sellingdb';
mongoose.connect(mongodbUri);
db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});
router.findAllAccount = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Account.find(function(err, account) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(account,null,5));
    });
};
router.findOneByAccountId = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Account.find({ '_id' : req.params._id },function(err, account) {
        if (err)
            res.json({ message: 'Selling Info NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(account,null,5));
    });
};
router.findAccountByAccountName = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod1 = req.params.account_name;
    var _filter1 = {
        $or:[
            {account_name:{$regex:keywrod1,$options:'$i'}}
        ]
    };
    Account.find(_filter1).limit(5).exec(function (err,account) {
        if(err)
            res.json({message: 'Account Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(account,null,5));
    });
};
router.findSellingInfoByAccount = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Account.aggregate([
        {
            $lookup: {
                from: 'sellingdb',
                localField: 'account_name',
                foreignField: 'account_name',
                as: 'Selling Info:'
            },
        },{
            $lookup:{ from: 'orderdb',
                localField: 'account_name',
                foreignField: 'seller_account_name',
                as: 'Order Info:'
            }
        },{
            $project:{
                '_id':0,
                'selling':0,
                'buying':0,
                'following_sneakers':0,
                'registration_date':0
            }
        }
    ],function (err,account) {
        if(err)
            res.json({errmsg: err});
        else
            res.send(JSON.stringify(account, null, 5));
    });

};
router.findBuyingInfoByAccount = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Account.aggregate([
        {
            $lookup: {
                from: 'orderdb',
                localField: 'account_name',
                foreignField: 'buyer_account_name',
                as: 'Buying Info:'
            },
        },{
            $project:{
                '_id':0,
                'selling':0,
                'buying':0,
                'following_sneakers':0,
                'registration_date':0
            }
        }
    ],function (err,account) {
        if(err)
            res.json({errmsg: err});
        else
            res.send(JSON.stringify(account, null, 5));
    });

};
router.addAccount = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var account = new Account();

    account.account_name = req.body.account_name;
    account._id = req.body._id;
    account.gender = req.body.gender;
    account.color = req.body.color;
    account.selling = req.body.selling;
    account.buying = req.body.buying;
    account.following_sneakers = req.body.following_sneakers;
    account.registration_date = req.body.registration_date;

    account.save(function(err) {
        if (err)
            res.json({ message: 'Account Info NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Account Info Successfully Added!', data: account });
    });
};
router.deleteAccount = (req, res) => {

    Account.findByIdAndRemove(req.params._id, function(err) {
        if (err)
            res.json({ message: 'Account Info NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Account Info Successfully Deleted!'});
    });
};

module.exports = router;

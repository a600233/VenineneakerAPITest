let Order = require('../models/order');
let express = require('express');
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
router.findAllOrder = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Order.find(function(err, order) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(order,null,5));
    });
}
router.findOrderById = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Order.find({ "_id" : req.params._id },function(err, order) {
        if (err)
            res.json({ message: 'Order Info NOT Found!', errmsg : err } );
        else
            res.send(JSON.stringify(order,null,5));
    });
}
router.findOrderByBuyerName = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    var keywrod1 = req.params.buyer_account_name;
    var _filter1 = {
        $or:[
            {buyer_account_name:{$regex:keywrod1,$options:'$i'}}
        ]
    }
    Order.find(_filter1).limit(5).exec(function (err,order) {
        if(err)
            res.json({message: 'Order Info NOT Found!',errmsg: err});
        else
            res.send(JSON.stringify(order,null,5));
    })
}
router.findSpecificOrderInfo = (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    Order.aggregate([{
        $lookup: {
            from: "accountdb",
            localField: "buyer_account_name",
            foreignField: "account_name",
            as: "Buying Info:"
        },
        }],function (err,order) {
        if(err)
            res.json({errmsg: err});
        else
            res.send(JSON.stringify(order, null, 5));
    });

}

router.incrementAmounts = (req, res) => {

    Order.findById(req.params._id, function(err,order) {
        if (err)
            res.json({ message: 'Order NOT Found!', errmsg : err } );
        else {
            order.amount += 1;
            order.save(function (err) {
                if (err)
                    res.json({ message: 'Amount Is NOT Added!', errmsg : err } );
                else
                    res.json({ message: 'Amount Is Successfully Added!', data: order });
            });
        }
    });
}
router.addOrder = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var order = new Order();
	order._id = req.body._id;
    order.buyer_account_name = req.body.buyer_account_name;
    order.seller_account_name = req.body.seller_account_name;
    order.brand = req.body.brand;
    order.series = req.body.series;
    order.name = req.body.name;
    order.size = req.body.size;
    order.selling_price = req.body.selling_price;
    order.amount = req.body.amount;
    order.shipping_address = req.body.shipping_address;
    order.order_time = req.body.order_time;

    order.save(function(err) {
        if (err)
            res.json({ message: 'Order Info NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Order Info Successfully Added!', data: order });
    });
}
router.deleteOrder = (req, res) => {

    Order.findByIdAndRemove(req.params._id, function(err) {
        if (err)
            res.json({ message: 'Order Info NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Order Info Successfully Deleted!'});
    });
}

module.exports = router;
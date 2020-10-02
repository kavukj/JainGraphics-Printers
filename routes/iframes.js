var express= require("express");
var OrderModel = require("../models/order");
var Cart = require("../models/cart")
var router = express.Router();


router.get("/iframeOrder",function(req,res){
	OrderModel.find({user:req.user},function(err,orders){
		if(err){
			console.log(err);
		}
		else{
			var cart;
			orders.forEach(function(order){
				cart = new Cart(order.cart);
				order.items = cart.generateArray();
			})
				
		}
		
		res.render("iframeOrder",{orders:orders});
	});
});

module.exports = router;
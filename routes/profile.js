var express= require("express");
var router = express.Router();
var OrderModel = require("../models/order");
var Cart = require("../models/cart");
var middleware 	= require("../middleware/middleware");

router.get("/order",middleware.isLoggedIn,function(req,res){
	OrderModel.find({user:req.user},function(err,orders){
		if(err){
			req.flash("Error","Failed to Load your orders");
			res.redirect("/home");
		}
		else{
			var cart;
			orders.forEach(function(order){
				cart = new Cart(order.cart);
				order.items = cart.generateArray();
			})
				
		}
		
		res.render("userorder",{orders:orders});
	});
});

router.get("/profile",middleware.isLoggedIn,function(req,res){
	res.render("profile");
});

module.exports = router;
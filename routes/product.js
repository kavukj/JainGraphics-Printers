var express= require("express");
var router = express.Router();
var middleware 	= require("../middleware/middleware"),
	StatModel 	= require("../models/stationery"),
	CertiModel 	= require("../models/certificate"),
	CartFun   	= require("../models/cart.js"),
	orderModel	= require("../models/order.js"),
	fileUpload	= require("express-fileupload"),
	Stripe		= require("stripe");
	

router.use(fileUpload({
	useTempFiles : true,
    tempFileDir : '/tmp/'
}));

router.get("/stationery",middleware.isLoggedIn,function(req,res){
	StatModel.find({},function(err,product){
		if(err){
			console.log(err);
		}
		else{
			res.render("stationery",{products:product});
		}
	})
	
});

router.get("/printing",middleware.isLoggedIn,function(req,res){
	CertiModel.find({},function(err,product){
		if(err){
			console.log(err);
		}
		else{
			res.render("printing",{products:product});
		}
	})
})

router.post("/file",function(req,res){
	if(req.files){
		var file = req.files.doc;
		var filename = file.name;
		console.log(filename);
		
		file.mv('./uploads/',filename,function(err,res){
			if(err){
				console.log(err);
				req.flash("Error","Cannot upload file");
				res.redirect("/printing");
			}else{
				req.flash("Success","File Uploaded");
				res.redirect("/printing");
			}
		})
	}
	else{
		console.log("Cannot find file");
		res.render("printing");
	}
})

router.get("/cart",middleware.isLoggedIn,function(req,res){
	if(!req.session.cart){
		res.render("cart2",{p:null});
		//res.render("cart2");
	}
	else{
		var cart=new CartFun(req.session.cart);
		//res.render("cart2");
		res.render("cart2",{p:cart.generateArray(),totalqty:cart.TotalQty,totalprice:cart.TotalPrice});
	}
});

router.get("/addtocart/:id",function(req,res,next){
	var productId = req.params.id;
	var cart = new CartFun(req.session.cart ? req.session.cart :{}) ;
	StatModel.findById(productId,function(err,prod){
		if(err){
			console.log(err);
			res.render("home");
		}
		else{
			cart.add(prod,prod.id);
			req.session.cart = cart;
			console.log(req.session.cart);
			res.redirect("/stationery"); 
			
		}
	})
});

router.get("/removefromcart/:id",function(req,res){
	var prodId = req.params.id;
	var cart= new CartFun(req.session.cart);
	StatModel.findById(prodId,function(err,product){
		if(err){
			console.log(err);
			req.flash("Error","Unable to remove item");
			res.redirect("/cart");
		}
		else{
			cart.remove(product,product.id);
			if(cart.TotalQty==0){
				delete req.session.cart;
			}else{
				req.session.cart=cart;
			}
			res.redirect("/cart");
		}
	})
})

router.get("/emptycart",function(req,res){
	delete req.session.cart;
	res.redirect("/stationery");
})

router.get("/checkout",function(req,res){
	if(!req.session.cart){
		return res.render("checkout");
	}
	else{
		var cart=new CartFun(req.session.cart);
		res.render("checkout",{totalprice:cart.TotalPrice});
	}
})

router.post("/checkout",middleware.isLoggedIn,function(req,res){
	if(!req.session.cart){
		return redirect("/stationery");
	}
	var cart = new CartFun(req.session.cart);
	var myCurrentDate=new Date();
	var myFutureDate=new Date(myCurrentDate);
    myFutureDate.setDate(myFutureDate.getDate()+ 8);
	var order = new orderModel({
			user:req.user,
			cart:cart,
			house:req.body.house,
			street:req.body.street,
			city:req.body.city,
			pincode:req.body.pincode,
			state:req.body.state,
			name:req.body.name,
			payment:req.body.payment,
			orderDate:myCurrentDate.toLocaleString(),
			delDate:myFutureDate.toLocaleString()
		})
		order.save(function(err,result){
			if(err){
				console.log(err);
				return res.redirect("/cart"); 
			}
			req.session.cart=null;
			req.flash("Success","Order Placed");
			console.log(result);
			res.redirect("/home");
		});
	
});
	/*
	var stripe = Stripe('sk_test_51HRLTCIdaFBNhAviJlBLqbGY572FktXLPeyv4Xo0UxIJYvUaSYssNo7MryVPr0Ct8Khb2ZHBnFcSvbVxq6OrX8Eb00wXqPmpHp');
	stripe.charges.create({
	  amount: cart.TotalPrice * 100, //The amount is stored in smaller unit means paise
	  currency: "inr",
	  source: req.body.stripeToken, // token created by Stripe.js whihc validates credit card details
	  description: "Test Charge"
	},{
  	idempotencyKey: "KmXmfKaDT3ZInxdz"
	},
	function(err, charge) {
	  if(err){
		  req.flash("Error",err.message);
		  console.log(err);
		  return res.redirect("/checkout");
	  }
		var order = new orderModel({
			user:CurrentUser,
			cart:cart,
			address:req.body.address,
			name:req.body.name,
			paymentId: charge.id
		})
		order.save(function(err,res){
			req.flash("Success","Order Placed");
			req.cart=null;
			res.redirect("/stationery");
		})
	  	
});
*/

router.get("/redorder/:id",function(req,res){
	var orderId=req.params.id;
	orderModel.findById(orderId,function(err,order){
		if(err){
			console.log(err);
			req.flash("Error","Cannot find order");
			res.redirect("/order");
		}else{
			var cart=new CartFun(order.cart);
			console.log(cart);
			req.session.cart=cart;
			res.redirect("/cart");
		}
	})
	
});

module.exports = router;
var express		= require("express");
var router 		= express.Router();
var passport	= require("passport");
var UserModel	= require("../models/user");

router.get("/signup",function(req,res){
	res.render("signup");
});

router.post("/signup",function(req,res){
	var fname=req.body.fname,
		lname=req.body.lname,
		username=req.body.username,
		phone=req.body.phone,
		pcode=req.body.pcode,
		address=req.body.address,
		password=req.body.password;
	var mobile=pcode+phone;
	UserModel.register(new UserModel({username,fname,lname,address,mobile}),password,function(err,user){
		if(err){
			req.flash("Error",err.message);
			res.redirect("/signup");
		}
		else{
			passport.authenticate("local")(req,res,function(){
				req.flash("Success","Successfully Registered, Welcome "+user.fname);
				res.redirect("/home");
			})
		}
	});
});

router.get("/login",function(req,res){
	res.render("login");
});
router.post("/login",passport.authenticate("local",{
		successRedirect: '/home',
		failureRedirect: "/login"
	}),function(req,res){
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("Success","You logged out !!")
	res.redirect("/");
})

module.exports= router;
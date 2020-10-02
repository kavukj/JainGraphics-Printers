var express= require("express");
var router = express.Router();
var ContactModel = require("../models/contact");

router.post("/contact",function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var message = req.body.message;
	ContactModel.create({name:name,email:email,message:message},function(err,result){
		if(err){
			console.log(err);
			req.flash("Error","Some error iccurred, Please send message again")
			res.redirect("/home");
		}else{
			req.flash("Success","Message Sent, We will reply as soon as possbile")
			res.redirect("/home");
		}
	})
});

module.exports = router;
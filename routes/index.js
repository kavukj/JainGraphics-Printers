var express= require("express");
var router = express.Router();
var middleware = require("../middleware/middleware");
var StatModel = require("../models/stationery");
var CertiModel = require("../models/certificate");

router.get("/",function(req,res){
	res.render("landing");
});

router.get("/home",middleware.isLoggedIn,function(req,res){
	StatModel.find({},function(err,stat){
		if(err){
			console.log(err);
			res.render("home",{stationery:null,certificate:null});
		}
		else{
			CertiModel.find({},function(err,certi){
				var stationery=[];
				var certificates=[];
				stationery=stat;
				certificates=certi;
				res.render("home",{stationery:stationery,certificate:certificates});
			});
		}
	})
	
});

module.exports = router;
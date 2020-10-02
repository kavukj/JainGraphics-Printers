var CertiModel = require("../models/certificate.js");
var mongoose   = require("mongoose");

mongoose.connect("mongodb://localhost/JGP");

var c = [
	new CertiModel({
		img: "../images/certificate/c13.png",
		title: "Certificate of Merit",
		price: "18/Pc",
		sale: "0",
		desc: ""
	}),
	new CertiModel({
		img: "../images/certificate/c14.png",
		title: "Customize Share certificate",
		price: "11/Pc",
		sale: "0",
		desc: ""
	}),
	new CertiModel({
		img: "../images/certificate/c15.png",
		title: "Food Pleasure Resturant certificate",
		price: "11/Pc",
		sale: "0",
		desc: ""
	}),
	new CertiModel({
		img: "../images/certificate/c16.png",
		title: "Certificate of sportsmanship",
		price: "30/Pc",
		sale: "0",
		desc: ""
	})
	
];

var done=0;
for(var i=0;i< c.length;i++){
	c[i].save(function(err,res){
		done++;
		if(done===c.length){
			exit();
		}
	});
}

function exit(){
	mongoose.disconnect();
}
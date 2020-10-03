var CertiModel = require("../models/certificate");

var c = [
	new CertiModel({
		img: "../images/certificate/c11.png",
		title: "Promotional Achievement Certificate",
		price: "18/Pc",
		sale: "0",
		desc: ""
	}),
	new CertiModel({
		img: "../images/certificate/c12.png",
		title: "Premium & Textured Paper",
		price: "20/Pc",
		sale: "0",
		desc: ""
	})	
];

function seedDB(){
	var done=0;
	for(var i=0;i< c.length;i++){
		c[i].save(function(err,res){
			done++;
			if(done===c.length){
				return;
			}
		});
	}
}

module.exports=seedDB;
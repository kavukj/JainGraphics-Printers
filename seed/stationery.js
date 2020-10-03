var StatModel = require("../models/stationery");

var s = [
	new StatModel({
		img: "../images/stationery/natrajpencil.jpg",
		title: "Natraj 621 Pencil Pack(Pack of 10 pencils)",
		price: "35",
		sale: "0",
		desc: ""
	}),
	new StatModel({
		img: "../images/stationery/camalinpencil.jpg",
		title: "Camlin Drawing Pencil",
		price: "45",
		sale: "0",
		desc: ""
	}),
	
];

function seedDB(){
	var done=0;
	for(var i=0;i< s.length;i++){
		s[i].save(function(err,res){
			done++;
			if(done===s.length){
				exit();
			}
		});
	}	
}

module.exports=seedDB;
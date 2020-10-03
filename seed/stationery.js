var StatModel = require("../models/stationery");

var s = [
	new StatModel({
		img: "../images/stationery/box.jpg",
		title: "Plastic Pencil Box(Purple)",
		price: "120",
		sale: "20",
		desc: ""
	}),
	new StatModel({
		img: "../images/stationery/diary.jpg",
		title: "Black Personal Diary 2020 Year(Weekly Divided)",
		price: "390",
		sale: "10",
		desc: ""
	}),
	new StatModel({
		img: "../images/stationery/pen1.jpg",
		title: "Cello Butterflow Simply Ball Pen Jar",
		price: "190",
		sale: "20",
		desc: ""
	}),
	new StatModel({
		img: "../images/stationery/dp.jpg",
		title: "Diary and Pen gift set",
		price: "500",
		sale: "50",
		desc: ""
	})	
];

function seedDB(){
	var done=0;
	for(var i=0;i< s.length;i++){
		s[i].save(function(err,res){
			done++;
			if(done===s.length){
				return;
			}
		});
	}	
}

module.exports=seedDB;
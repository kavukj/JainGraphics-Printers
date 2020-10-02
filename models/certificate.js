var mongoose = require("mongoose");
var PassLocal = require("passport-local-mongoose");

var CertiSchema = new mongoose.Schema({
	img:String,
	title:String,
	desc:String,
	price:String,
	sale:Number
});

module.exports = mongoose.model("certificate",CertiSchema);
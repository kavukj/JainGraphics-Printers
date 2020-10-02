var mongoose = require("mongoose");
var PassLocal = require("passport-local-mongoose");

var PrintSchema = new mongoose.Schema({
	img:String,
	title:String,
	desc:String,
	price:Number,
	sale:Number,
	sample:String
});

module.exports = mongoose.model("printing",PrintSchema);
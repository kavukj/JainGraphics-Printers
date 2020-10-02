var mongoose = require("mongoose");

var Contact = new mongoose.Schema({
	name:String,
	email:String,
	message:String
});

module.exports = mongoose.model("contact",Contact);
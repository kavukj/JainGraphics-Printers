var mongoose = require("mongoose");
var PassLocal = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	fname:String,
	lname:String,
	username:String,
	password:String,
	mobile:Number,
	address:String
});

UserSchema.plugin(PassLocal);

module.exports = mongoose.model("user",UserSchema);
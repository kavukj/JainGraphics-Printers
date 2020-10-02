var mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
	user : {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user"
	},
	cart : Object,
	city : String,
	state: String,
	pincode: String,
	house : String,
	street: String,
	name: String,
	orderDate: Date,
	delDate: Date,
	payment: String
});

module.exports = mongoose.model("order",orderSchema);
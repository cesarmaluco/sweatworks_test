// IMPORTS /////////////////////////////////////////////////////////////////////
let mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tratamentoItem = null;
if (!mongoose.models["Item"])
	tratamentoItem = mongoose.model("Item", new Schema({
		name: { type: String, required: true } //nome
	}));
else
	tratamentoItem = mongoose.models["Item"]
module.exports = tratamentoItem;

// IMPORTS /////////////////////////////////////////////////////////////////////
let mongoose = require("mongoose");
var Schema = mongoose.Schema;


var tratamentomensagem = mongoose.model("User", new Schema({
	name: { type: String, required: true }, //nome
	email: {type: String, required: true},
	pwd: {type: String, required: true},
	roles: [{
		type: { type: String }
	}],
	token: { type: String, required: true },
	created_date: { type: Date, default: Date },
    update_date: { type: Date, default: Date },
    last_login: { type: Date, default: Date }
}));

/** CONSTRAINTS *******************************************************/

/** validação de que devem haver no minimo um idioma */
tratamentomensagem.schema.path("roles").validate(function (roles) {
	var ret = true;
	if (!roles) {
		ret = false;
	}
	else if (roles.length == 0) {
		ret = false;
	}
	return ret;
}, "Ao menos uma role deve ser informada");

module.exports = tratamentomensagem;

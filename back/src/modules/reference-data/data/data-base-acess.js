
// IMPORTS /////////////////////////////////////////////////////////////////////

let Config = require("../../../util/config");
let mongoose = require("mongoose");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

/**
 * Esbelece acesso ao banco de dados
 */
function connect() {
	
	var promise = mongoose.connect(Config.dbURL, {
		useMongoClient: true,
		/* other options */
		});
}

/**
 *  Desconecta da base de dados 
 */
function disconnect() {
	mongoose.disconnect();
}

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = {
	connect: connect,
	disconnect: disconnect
};

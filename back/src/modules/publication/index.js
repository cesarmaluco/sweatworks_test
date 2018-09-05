// IMPORTS /////////////////////////////////////////////////////////////////////
let createPublication = require("./endpoints/Publication-create");
let searchPublication = require("./endpoints/Publication-search");
let updatePublication = require("./endpoints/Publication-update");
let deletePublication = require("./endpoints/Publication-delete");


let BusPub = require("./Publication");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = {
	createPublication: createPublication,
	searchPublication: searchPublication,
	updatePublication: updatePublication,
	deletePublication: deletePublication,
	BusPublication : BusPub
};
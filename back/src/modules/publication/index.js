// IMPORTS /////////////////////////////////////////////////////////////////////
let createPublication = require("./endpoints/publication-create");
let searchPublication = require("./endpoints/publication-search");
let updatePublication = require("./endpoints/publication-update");
let deletePublication = require("./endpoints/publication-delete");


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
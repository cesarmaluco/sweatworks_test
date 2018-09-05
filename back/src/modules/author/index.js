// IMPORTS /////////////////////////////////////////////////////////////////////
let authorCreate = require("./endpoints/author-create");
let authorSearch = require("./endpoints/author-search");
let authorUpdate = require("./endpoints/author-update");
let authorDelete = require("./endpoints/author-delete");
let authorLogin = require("./endpoints/author-login");

let Busauthor = require("./author");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = {
	createAuthor: authorCreate,
	searchAuthor: authorSearch,
	updateAuthor: authorUpdate,
	deleteAuthor: authorDelete,
	login : authorLogin, 
	Busauthor : Busauthor
};
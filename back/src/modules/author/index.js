// IMPORTS /////////////////////////////////////////////////////////////////////
let authorCreate = require("./endpoints/author-criar");
let authorSearch = require("./endpoints/author-search");
let authorUpdate = require("./endpoints/author-update");
let authorDelete = require("./endpoints/author-delete");
let authorLogin = require("./endpoints/author-login");
let authorModel = require("./model/author");
let Busauthor = require("./author");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = {
	authorCreate: authorCreate,
	authorSearch: authorSearch,
	authorUpdate: authorUpdate,
	authorDelete: authorDelete,
	authorLogin : authorLogin, 
	authorModel : authorModel,
	Busauthor : Busauthor
};
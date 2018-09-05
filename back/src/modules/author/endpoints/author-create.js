//IMPORTS************************************
let Author = require("../Author");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoItem = require("../model/author");

/** Creates a new author */
function createAuthor(req, res, next) {
	let author = new Author();
	var reqItem = req.body.Author;
	author.createAuthor(reqItem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Can´t create author" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/author/create",
	createAuthor);
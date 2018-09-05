//IMPORTS************************************
let Author = require("../Author");
let EndpointDescription = require("../../server/endpoint-description");

/** Consultar  mensagens no banco de dados  */
function searchAuthor(req, res, next,proxyItem) {
	let author = new Author();
	var filters = req.body.filters;
	author.searchAuthor(filters)
		.then((msgs) => {
			return res.json(msgs);
		}).catch((err) => {
			return res.send("parser error" + err);
		});
	return next();
}

module.exports = new EndpointDescription(
	"post",
	"/api/author/search",
	searchAuthor);
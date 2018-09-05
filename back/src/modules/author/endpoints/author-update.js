//IMPORTS************************************
let Author = require("../Author");
let EndpointDescription = require("../../server/endpoint-description");


/** Atualização de Item   */
function updateAuthor(req, res, next,proxyItem) {
	let author = new Author();
	var reqItem = req.body.Author;
	author.updateAuthor(reqItem).then((msgUpdated) => {
		return res.json(msgUpdated);
	}).catch((err) => {
		return res.send("Update failed" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/author/update",
	updateAuthor);
//IMPORTS************************************
let Item = require("../Author");
let EndpointDescription = require("../../server/endpoint-description");

/** Exclusao de uma Item no banco de dados  */
function deleteAuthor(req, res, next,proxyItem) {
	let author = new Author();
	var reqItem = req.body.Item;
	author.deleteAuthor(reqItem).then((msgDeleted) => {
		return res.json(msgDeleted);
	}).catch((err) => {
		return res.send("Erro ao excluir Item" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/excluirItem",
	deleteAuthor);
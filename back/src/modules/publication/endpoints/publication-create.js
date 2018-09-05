//IMPORTS************************************
let Publication = require("../Publication");
let EndpointDescription = require("../../server/endpoint-description");


/** Cria uma mensagem no banco de dados  */
function createPublication(req, res, next,proxyMensagem) {
	let pub = new Publication();
	var reqMensagem = req.body.Publication;
	pub.createPublication(reqMensagem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Publication failed" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/publication/create",
	createPublication);
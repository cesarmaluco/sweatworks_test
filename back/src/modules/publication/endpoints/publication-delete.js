//IMPORTS************************************
let Publication = require("../Publication");
let EndpointDescription = require("../../server/endpoint-description");


function deletePublication(req, res, next,proxyMensagem) {
	let pub = new Publication();
	var reqMensagem = req.body.Publication;
	pub.deletePublication(reqMensagem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Publication delete failed" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/publication/delete",
	deletePublication);
//IMPORTS************************************
let Publication = require("../Publication");
let EndpointDescription = require("../../server/endpoint-description");


function updatePublication(req, res, next,proxyMensagem) {
	let pub = new Publication();
	var reqMensagem = req.body.data;
	pub.updatePublication(reqMensagem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Publication updated failed" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/publication/update",
	updatePublication);
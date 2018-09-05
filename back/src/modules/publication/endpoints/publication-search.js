//IMPORTS************************************
let Publication = require("../Publication");
let EndpointDescription = require("../../server/endpoint-description");


function searchPublication(req, res, next,proxyMensagem) {
	let pub = new Publication();
	var reqMensagem = req.body.filters;
	pub.searchPublication(reqMensagem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Publication search failed" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/publication/search",
	searchPublication);
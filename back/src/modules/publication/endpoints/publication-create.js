//IMPORTS************************************
let Publication = require("../Publication");
let EndpointDescription = require("../../server/endpoint-description");

//CREATES  A NEW PUBLICATION FOR SPECIFIC AUTHOR
function createPublication(req, res, next) {
	let pub = new Publication();
	var reqMensagem = req.body.data;
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
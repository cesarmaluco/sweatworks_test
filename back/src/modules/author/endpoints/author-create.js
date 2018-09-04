//IMPORTS************************************
let Item = require("../Item");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoItem = require("../model/Item");

/** Cria uma Item no banco de dados  */
function criarItem(req, res, next,proxyItem) {
	var msg = null;
	if (!proxyItem)
	{
		msg = new Item(TratamentoItem);
	}
	else
	{
		msg = proxyItem;
	} 	 
	var reqItem = req.body.Item;
	msg.criarItem(reqItem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Erro ao criar Item" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/criarItem",
	criarItem);
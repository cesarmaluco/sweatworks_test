//IMPORTS************************************
let Item = require("../Item");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoItem = require("../model/Item");

/** Atualização de Item   */
function atualizarItem(req, res, next,proxyItem) {
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
	msg.atualizarItem(reqItem).then((msgUpdated) => {
		return res.json(msgUpdated);
	}).catch((err) => {
		return res.send("Erro ao atualizar Item" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"put",
	"/api/atualizarItem",
	atualizarItem);
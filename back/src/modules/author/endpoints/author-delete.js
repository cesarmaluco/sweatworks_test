//IMPORTS************************************
let Item = require("../Item");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoItem = require("../model/Item");

/** Exclusao de uma Item no banco de dados  */
function excluirItem(req, res, next,proxyItem) {
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
	msg.excluirItem(reqItem).then((msgDeleted) => {
		return res.json(msgDeleted);
	}).catch((err) => {
		return res.send("Erro ao excluir Item" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"delete",
	"/api/excluirItem",
	excluirItem);
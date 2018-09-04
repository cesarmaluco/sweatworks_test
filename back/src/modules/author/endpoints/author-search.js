//IMPORTS************************************
let Item = require("../Item");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoItem = require("../model/Item");

/** Consultar  mensagens no banco de dados  */
function consultarItem(req, res, next,proxyItem) {
	var msg = null;
	if (!proxyItem)
	{
		msg = new Item(TratamentoItem);
	}
	else
	{
		msg = proxyItem;
	} 	 
	var filtros = req.body.filtros;
	msg.consultarItem(filtros.name)
		.then((msgs) => {
			return res.json(msgs);
		}).catch((err) => {
			return res.send("Erro ao consultar Item" + err);
		});
	return next();
}

module.exports = new EndpointDescription(
	"post",
	"/api/consultarItem",
	consultarItem);
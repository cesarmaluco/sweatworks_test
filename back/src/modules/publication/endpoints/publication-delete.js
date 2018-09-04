//IMPORTS************************************
let Mensagem = require("../mensagem");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoMensagem = require("../model/mensagem");

/** Exclusao de uma mensagem no banco de dados  */
function excluirMensagem(req, res, next,proxyMensagem) {
	var msg = null;
	if (!proxyMensagem)
	{
		msg = new Mensagem(TratamentoMensagem);
	}
	else
	{
		msg = proxyMensagem;
	} 	 
	var reqMensagem = req.body.mensagem;
	msg.excluirMensagem(reqMensagem).then((msgDeleted) => {
		return res.json(msgDeleted);
	}).catch((err) => {
		return res.send("Erro ao excluir mensagem" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"delete",
	"/api/excluirMensagem",
	excluirMensagem);
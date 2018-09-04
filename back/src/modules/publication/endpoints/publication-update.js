//IMPORTS************************************
let Mensagem = require("../mensagem");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoMensagem = require("../model/mensagem");

/** Atualização de mensagem   */
function atualizarMensagem(req, res, next,proxyMensagem) {
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
	msg.atualizarMensagem(reqMensagem).then((msgUpdated) => {
		return res.json(msgUpdated);
	}).catch((err) => {
		return res.send("Erro ao atualizar mensagem" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"put",
	"/api/atualizarMensagem",
	atualizarMensagem);
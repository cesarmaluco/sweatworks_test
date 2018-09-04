//IMPORTS************************************
let Mensagem = require("../mensagem");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoMensagem = require("../model/mensagem");

/** Cria uma mensagem no banco de dados  */
function criarMensagem(req, res, next,proxyMensagem) {
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
	msg.criarMensagem(reqMensagem).then((msgCreated) => {
		return res.json(msgCreated);
	}).catch((err) => {
		return res.send("Erro ao criar mensagem" + err);
	});
	return next();
}
	
module.exports = new EndpointDescription(
	"post",
	"/api/criarMensagem",
	criarMensagem);
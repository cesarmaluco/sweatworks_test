//IMPORTS************************************
let Mensagem = require("../mensagem");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoMensagem = require("../model/mensagem");

/** Consultar  mensagens no banco de dados  */
function consultarMensagem(req, res, next,proxyMensagem) {
	var msg = null;
	if (!proxyMensagem)
	{
		msg = new Mensagem(TratamentoMensagem);
	}
	else
	{
		msg = proxyMensagem;
	} 	 
	var filtros = req.body.filtros;
	msg.consultarMensagem(filtros.email)
		.then((msgs) => {
			return res.json(msgs);
		}).catch((err) => {
			return res.send("Erro ao consultar mensagem" + err);
		});
	return next();
}

module.exports = new EndpointDescription(
	"post",
	"/api/consultarMensagem",
	consultarMensagem);
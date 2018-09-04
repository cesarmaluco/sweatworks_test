//IMPORTS************************************
let Mensagem = require("../mensagem");
let EndpointDescription = require("../../server/endpoint-description");
var TratamentoMensagem = require("../model/mensagem");
var getHash = require('../../../util/getHash');
var jwt = require('jsonwebtoken');

/** Consultar  mensagens no banco de dados  */
function login(req, res, next,proxyMensagem) {
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
	var login = msg.consultarMensagem(filtros.email)
		.then((user) => {
			user = user[0];
			filtros.senha = getHash(filtros.senha, filtros.senha);
            if (user.pwd !== filtros.senha) {
                return res.status(401).send(mensagem);
            } else {
                user.token = jwt.sign(user, getHash(), {expiresIn: 60});
                user.last_login = new Date();
                user.save(function (err, userCreated) {
                    if (err) {
                        return res.send("Erro ao atualizar login");
                    }
                    return res.json(userCreated);
                });
            }
		}).catch((err) => {
			return res.send("Erro ao consultar mensagem" + err);
		});
	return next();
}

module.exports = new EndpointDescription(
	"post",
	"/api/login",
	login);
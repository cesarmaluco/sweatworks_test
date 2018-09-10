//IMPORTS************************************
let Author = require("../Author");
let EndpointDescription = require("../../server/endpoint-description");

var getHash = require('../../../util/getHash');
var jwt = require('jsonwebtoken');

/** Login author  */
function login(req, res, next,proxyMensagem) {
	
	var data = req.body.data;
	let author = new Author();
	var login = author.searchAuthor(data)
		.then((user) => {
            if (user.pwd !== data.Pwd) {
                return res.status(401).send(mensagem);
            } else {
                user.token = jwt.sign(user, getHash(), {expiresIn: 60});
				user.last_login = new Date();
				return res.send(user);
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
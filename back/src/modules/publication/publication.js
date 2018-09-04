//IMPORTS
let config = require("../../util/config");
var getHash = require('../../util/getHash');
var jwt = require('jsonwebtoken');
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;


/** 
 Classe de tratamento de mensagens de retorno do CICS consultando qual a 
 referência da mesma para retorno ao canal.
*/
class Mensagem {
	/**Construtor e inicializador de banco de dados */
	constructor(Mensagem) {
		if (mongoose.connection.length > 0) {
			mongoose.connect(config.dbURL);
		}
		this._mensagem = Mensagem;
	}

	/**  Cadastro da mensagem no banco de dados de mensagens
	 * @param {object} mensagem
	 * 		Contém uma mensagem JSON para cadastro 
	 * @returns {Promise}
	 * 		mensagem cadastrada 
	*/
	criarMensagem(mensagem) {
		return new Promise((resolve, reject) => {
			var msg =  new this._mensagem();
			msg.name = mensagem.name;
			msg.email = mensagem.email;
			msg.roles = (mensagem.roles ? mensagem.roles : []);
			var hashToken = getHash();
            msg.pwd = getHash(mensagem.pwd, mensagem.pwd);
			msg.token = jwt.sign(mensagem, hashToken, {expiresIn: 60});
			msg.save(function (err, msg) {
				if (err) {
					reject(err);
				}
				else {
					resolve(msg);
				}
			},resolve);
		});
	}
	/**atualização de mensagem 
	 * @param {object} mensagem
	 * 		Objeto de mensagem com informações para serem atualizadas.
	 * @return {Promise} 
	 * 	    Callback para ação do chamador
	*/
	atualizarMensagem(mensagem) {
		return new Promise((resolve, reject) => {
			this._mensagem.findOne({
				_id: new mongoose.Types.ObjectId(mensagem._id)
			},"httpStatusCode endpoints idiomas", function (err, msg) {
				if (msg) {
					msg.name = mensagem.name;
					msg.roles = (mensagem.roles ? mensagem.roles : []);
					msg.token = mensagem.token;
					msg.save(function (err, msg) {
						if (err) {
							reject(err);
						}
						else {
							resolve(msg);
						}
					});
				}
			},resolve);
		});
	}
	/** Consulta de mensagem conforme filtro de seleção
	 * @param {string} canal
	 * 	Nome do canal (identificador) para consulta de dicionário de mensagens
	 * @param {string} idioma (opcional)
	 *  Nome do idioma (identificador) para consulta de dicionário de mensagens.
	 * @param {string} endpoint (opcional)
	 *  Nome do endpoint (identificador) (serviço)  
	 * @param {string} codigoMensagem (opcional)
	 * 	Código da mensagem especifica
	 * @return {objetos}
	 * 	Estrutura de mensagem conforme model/mensagem
	*/
	consultarMensagem(email) {
		return new Promise((resolve, reject) => {
			let query = {};
			if (email)
			{
				query["email"] = email;
			}
			
			this._mensagem.find(
				query
				, function (err, msg) {
					if (err) {
						reject(err);
					}
					else {
						resolve(msg);
					}
			},resolve);
		});
	}

	/** Exclusão de mensagem especifica 
	 * @param {objeto} mensagem
	 * 			mensagem._id
	 			* 	Item selecionado para exclusao. Identificação unica do documento no Mongo 
	*  @returns mensagem removida
	*/
	excluirMensagem(mensagem) {
		return new Promise((resolve, reject) => {
			this._mensagem.findOneAndRemove({
				_id: new mongoose.Types.ObjectId(mensagem._id)
			}, function (err, msg) {
				if (err) {
					reject(err);
				}
				else {
					resolve(msg);
				}
			},resolve);
		});
	}

}

module.exports = Mensagem;

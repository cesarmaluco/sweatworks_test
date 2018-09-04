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
class Item {
	/**Construtor e inicializador de banco de dados */
	constructor(Item) {
		if (mongoose.connection.length > 0) {
			mongoose.connect(config.dbURL);
		}
		this._Item = Item;
	}

	/**  Cadastro da Item no banco de dados de mensagens
	 * @param {object} Item
	 * 		Contém uma Item JSON para cadastro 
	 * @returns {Promise}
	 * 		Item cadastrada 
	*/
	criarItem(Item) {
		return new Promise((resolve, reject) => {
			var msg =  new this._Item();
			msg.name = Item.name;
			
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
	/**atualização de Item 
	 * @param {object} Item
	 * 		Objeto de Item com informações para serem atualizadas.
	 * @return {Promise} 
	 * 	    Callback para ação do chamador
	*/
	atualizarItem(Item) {
		return new Promise((resolve, reject) => {
			this._Item.findOne({
				_id: new mongoose.Types.ObjectId(Item._id)
			},"httpStatusCode endpoints idiomas", function (err, msg) {
				if (msg) {
					msg.name = Item.name;
					
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
	/** Consulta de Item conforme filtro de seleção
	 * @param {string} name
	 * 	Nome do canal (identificador) para consulta de dicionário de mensagens
	 * @return {objetos}
	 * 	Estrutura de Item conforme model/Item
	*/
	consultarItem(name) {
		return new Promise((resolve, reject) => {
			let query = {};
			if (name)
			{
				query["name"] = name;
			}
			
			this._Item.find(
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

	/** Exclusão de Item especifica 
	 * @param {objeto} Item
	 * 			Item._id
	 			* 	Item selecionado para exclusao. Identificação unica do documento no Mongo 
	*  @returns Item removida
	*/
	excluirItem(Item) {
		return new Promise((resolve, reject) => {
			this._Item.findOneAndRemove({
				_id: new mongoose.Types.ObjectId(Item._id)
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

module.exports = Item;

//IMPORTS
let config = require("../../util/config");
let db = require('../reference-data/index');
/** 
 Classe de tratamento de mensagens de retorno do CICS consultando qual a 
 referência da mesma para retorno ao canal.
*/
class Publication {
	constructor() {

	}


	createPublication(publication) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			Params.push(publication.AuthorId);
			Params.push(publication.PubDate);
			Params.push(publication.Body);
			Params.push(publication.Title);
			let prepSQL = new db.dataBaseAcess.Command('INSERT INTO Publications (AuthorId,PubDate,Body,Title) values(?,?,?,?)', Params);
			db.dataBaseAcess.runCommand(prepSQL);
			resolve(publication);
		});
	}

	updatePublication(publication) {
		return new Promise((resolve, reject) => {

		});
	}

	searchPublication(publication) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			var hashToken = getHash();
			let prepSQL = null;
			if (publication && publication.AuthorId){
				Params.push(publication.AuthorId);
			
				 prepSQL = new db.dataBaseAcess.Command('SELECT * FROM Publications where AuthorId = ? order by PubDate desc',Params);
				 db.dataBaseAcess.runQuery(prepSQL).then((rows) => {
					resolve(rows);
				});
			}
		});
	}


	deletePublication(mensagem) {
		return new Promise((resolve, reject) => {

		});
	}

}

module.exports = Publication;

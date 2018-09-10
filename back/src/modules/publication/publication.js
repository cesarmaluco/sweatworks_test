//IMPORTS
let config = require("../../util/config");
let db = require('../reference-data/index');
/** 
 Publication class 
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
			var Params = new Array();
			Params.push(publication.PubDate);
			Params.push(publication.Body);
			Params.push(publication.Title);
			Params.push(publication.Id);
			let prepSQL = new db.dataBaseAcess.Command('UPDATE Publications set PubDate = ? ,Body = ?,Title = ? where Id  = ?', Params);
			db.dataBaseAcess.runCommand(prepSQL);
			resolve(publication);
		});
	}

	searchPublication(publication) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			let prepSQL = null;
			if (publication && publication.AuthorId){
				Params.push(publication.AuthorId);
			
				 prepSQL = new db.dataBaseAcess.Command('SELECT * FROM Publications where AuthorId = ? order by PubDate desc',Params);
				 db.dataBaseAcess.runAll(prepSQL).then((rows) => {
					resolve(rows);
				});
			}
		});
	}


	deletePublication(publication) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			Params.push(publication.Id);
			let prepSQL = null;
			prepSQL = new db.dataBaseAcess.Command('DELETE FROM Publications where Id = ? ',Params);
			db.dataBaseAcess.runCommand(prepSQL);
			resolve(publication);
		});
	}

}

module.exports = Publication;

//IMPORTS
let config = require("../../util/config");
var getHash = require('../../util/getHash');
var jwt = require('jsonwebtoken');
let db = require('../reference-data/index');

class Author {
	/**Construtor e inicializador de banco de dados */
	constructor() {
	
	}

	
	createAuthor(author) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			var hashToken = getHash();
			author.Pwd = getHash(author.Pwd, author.Pwd);
			author.Token = jwt.sign(author, hashToken, {expiresIn: 60});
			Params.push(author.Name);
			Params.push(author.Pwd);
			Params.push(author.User);
			Params.push(author.BirthDate);
			let prepSQL = new db.dataBaseAcess.Command('INSERT INTO AUthors (Name,Pwd,User,BirthDate) values(?,?,?,?)',Params);
			db.dataBaseAcess.runCommand(prepSQL).then((id) => {
				author.Id = id;
				resolve(author);
			});
			
		});
	}
	
	updateAuthor(author) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			var hashToken = getHash();
			author.Pwd = getHash(author.Pwd, author.Pwd);
			author.Token = jwt.sign(author, hashToken, {expiresIn: 60});
			Params.push(author.Name);
			Params.push(author.Pwd);
			Params.push(author.User);
			Params.push(author.BirthDate);
			Params.push(author.Id);
			let prepSQL = new db.dataBaseAcess.Command('Update AUthors set Name = ?, Pwd = ? , User = ? , BirthDate = ?  where Id = ? ',Params);
			db.dataBaseAcess.runCommand(prepSQL).then((id) => {
				resolve(author);
			});
			
		});
	}
	
	searchAuthor(author) {
		return new Promise((resolve, reject) => {
			var Params = new Array();
			var hashToken = getHash();
			let prepSQL = null;
			if (author && author.Email){
				Params.push(author.Email);
				author.Pwd = getHash(author.Pwd, author.Pwd);
				Params.push(author.Pwd);
				 prepSQL = new db.dataBaseAcess.Command('SELECT * FROM Authors where User = ? AND Pwd = ?',Params);
				 db.dataBaseAcess.runQuery(prepSQL).then((rows) => {
					resolve(rows);
				});
			}
			else{
				prepSQL = new db.dataBaseAcess.Command('SELECT * FROM Authors order by name asc',[]);
				db.dataBaseAcess.runAll(prepSQL).then((rows) => {
					resolve(rows);
				});
			}
			
		})
	}

	deleteAuthor(author) {
		return new Promise((resolve, reject) => {
			resolve();
		})
	}

}

module.exports = Author;

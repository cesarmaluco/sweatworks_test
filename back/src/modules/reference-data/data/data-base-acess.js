
// IMPORTS /////////////////////////////////////////////////////////////////////

let Config = require("../../../util/config");
const sqlite3 = require('sqlite3').verbose();
let db = null;
// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

/**
 * Database access
 */
function connect() {

	db = new sqlite3.Database('./db/test.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
		if (err) {
			return console.error(err.message);
		}
		db.serialize(function () {
			db.get("select name from sqlite_master where type='table' and name='Authors'", function (err, table) {
				if (!table)
					db.run('CREATE TABLE Authors(id INTEGER PRIMARY KEY AUTOINCREMENT, name text,pwd text, user text )');
			});

			db.get("select name from sqlite_master where type='table' and name='Publications'", function (err, table) {
				if (!table)
					db.run('CREATE TABLE Publications(id INTEGER PRIMARY KEY AUTOINCREMENT, AuthorId INTEGER, PubDate DateTime, Body text, Title text  )');
			});
		});

		console.log('Connected to database.');
	});

	
}

/**
 *  Desconecta da base de dados 
 */
function disconnect() {
	db.close((err) => {
		if (err) {
			return console.error(err.message);
		}
		console.log('Close the database connection.');
	});
}

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = {
	connect: connect,
	disconnect: disconnect
};

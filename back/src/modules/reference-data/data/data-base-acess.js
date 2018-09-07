
// IMPORTS /////////////////////////////////////////////////////////////////////

let Config = require("../../../util/config");
const sqlite3 = require('sqlite3').verbose();
let db = null;
// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

class Command {
	constructor(command, params) {
		this._command = command;
		this._params = params;
	}
	get Command() { return this._command; }
	get Params() { return this._params; }

}

function runQuery(command) {
	return new Promise((resolve, reject) => {
		var sql = command.Command;
		var params = command.Params;
		connect();
		
		db.get(sql, params, (err, rows) => {
			if (err) {
			  return console.error(err.message);
			}
			resolve(rows);
			disconnect();
		  });

		// close the database connection
		
	})
}

function runAll(command) {
	return new Promise((resolve, reject) => {
		var sql = command.Command;
		var params = command.Params;
		connect();
		
		db.all(sql, params, (err, rows) => {
			if (err) {
			  return console.error(err.message);
			}
			resolve(rows);
			disconnect();
		  });

		// close the database connection
		
	})
}

function runCommand(command) {
	var sql = command.Command;
	var params = command.Params;
	connect();
	db.run(sql, params, function (err) {
		if (err) {
			return console.log(err.message);
		}
		// get the last insert id
		console.log(`A row has been inserted with rowid ${this.lastID}`);
		disconnect();
	});

	// close the database connection
	
}

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
	disconnect: disconnect,
	runCommand: runCommand,
	Command: Command,
	runQuery : runQuery,
	runAll : runAll
};

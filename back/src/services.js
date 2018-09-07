// IMPORTS /////////////////////////////////////////////////////////////////////

let DynamicServer = require("./modules/server/dynamic-server");
let author = require("./modules/author");
let publication = require("./modules/publication");
let Config = require("./util/config");
let referenceData = require("./modules/reference-data");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////
let dataBaseAcess = referenceData.dataBaseAcess;
let createAuthor = author.createAuthor;
let searchAuthor =  author.searchAuthor;
let updateAuthor = author.updateAuthor;
let deleteAuthor = author.deleteAuthor;
let login = author.login;

let createPublication = publication.createPublication;
let searchPublication =  publication.searchPublication;
let updatePublication = publication.updatePublication;
let deletePublication = publication.deletePublication;


// DECLARATIONS ////////////////////////////////////////////////////////////////

const apiServer = new DynamicServer("apiServer", Config.servicePort);

dataBaseAcess.connect();

// IMPLEMENTATION /////////////////////////////////////////////////////////////////////////
apiServer.addEndpoint("createPublication", createPublication);
apiServer.addEndpoint("updatePublication", updatePublication);
apiServer.addEndpoint("deletePublication", deletePublication);
apiServer.addEndpoint("searchPublication", searchPublication);

apiServer.addEndpoint("createAuthor", createAuthor);
apiServer.addEndpoint("updateAuthor", updateAuthor);
apiServer.addEndpoint("deleteAuthor", deleteAuthor);
apiServer.addEndpoint("searchAuthor", searchAuthor);
apiServer.addEndpoint("login", login);



//*******************************************


apiServer.start(() =>{
	console.log("api started");
});


// EXPORTS /////////////////////////////////////////////////////////////////////

// IMPORTS /////////////////////////////////////////////////////////////////////

let DynamicServer = require("./modules/server/dynamic-server");
let Mensagem = require("./modules/mensagem");
let Item = require("./modules/item");
let Config = require("./util/config");
let referenceData = require("./modules/reference-data");



// DERIVED IMPORTS /////////////////////////////////////////////////////////////
let dataBaseAcess = referenceData.dataBaseAcess;
let criarMensagem = Mensagem.criarMensagem;
let consultarMensagem =  Mensagem.consultarMensagem;
let atualizarMensagem = Mensagem.atualizarMensagem;
let excluirMensagem = Mensagem.excluirMensagem;
let login = Mensagem.login;

let criarItem = Item.criarItem;
let consultarItem =  Item.consultarItem;
let atualizarItem = Item.atualizarItem;
let excluirItem = Item.excluirItem;


// DECLARATIONS ////////////////////////////////////////////////////////////////

const apiServer = new DynamicServer("apiServer", Config.portaAplicacao);

dataBaseAcess.connect();


// IMPLEMENTATION /////////////////////////////////////////////////////////////////////////


apiServer.addEndpoint("criarUsuario", criarMensagem);
apiServer.addEndpoint("atualizarUsuario", atualizarMensagem);
apiServer.addEndpoint("excluirUsuario", excluirMensagem);
apiServer.addEndpoint("consultarUsuario", consultarMensagem);
apiServer.addEndpoint("login", login);


apiServer.addEndpoint("criarItem", criarItem);
apiServer.addEndpoint("atualizarItem", atualizarItem);
apiServer.addEndpoint("excluirItem", excluirItem);
apiServer.addEndpoint("consultarItem", consultarItem);
//*******************************************


apiServer.start(() =>{
	
	console.log("inicializado");
});


// EXPORTS /////////////////////////////////////////////////////////////////////

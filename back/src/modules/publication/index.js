// IMPORTS /////////////////////////////////////////////////////////////////////
let criarMensagem = require("./endpoints/mensagem-criar");
let consultarMensagem = require("./endpoints/mensagem-consultar");
let atualizarMensagem = require("./endpoints/mensagem-atualizar");
let excluirMensagem = require("./endpoints/mensagem-excluir");
let login = require("./endpoints/mensagem-login");
let mensagemModel = require("./model/mensagem");
let BusMensagem = require("./mensagem");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = {
	criarMensagem: criarMensagem,
	consultarMensagem: consultarMensagem,
	atualizarMensagem: atualizarMensagem,
	excluirMensagem: excluirMensagem,
	login: login,
	mensagemModel : mensagemModel,
	BusMensagem : BusMensagem
};
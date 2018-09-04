// IMPORTS /////////////////////////////////////////////////////////////////////
let Chai = require("chai");
var MensagemModulo = require("../../../src/modules/mensagem");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////
let expect = Chai.expect;
var Mensagem = MensagemModulo.mensagemModel;
// IMPLEMENTATION //////////////////////////////////////////////////////////////
describe("Tratamento de mesagens ao canal - CRUD", () => {
	it("apresentar erro se token ausente", () => {
		var data = { name: "user 1" };
		var _msg = new Mensagem(data);
		let ret = _msg.validateSync();
		expect(ret).not.to.undefined;
	});
});
// EXPORTS /////////////////////////////////////////////////////////////////////

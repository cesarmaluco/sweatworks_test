// IMPORTS /////////////////////////////////////////////////////////////////////
let country = require("country-list");
let lang = require("language-list");
let ArqControladorBase = require("arq-guard-exceptions");

// DERIVED IMPORTS /////////////////////////////////////////////////////////////

let Guard = ArqControladorBase.Guard;
// IMPLEMENTATION //////////////////////////////////////////////////////////////
/** 
 * Classe com métodos para validação de culturas.
 * TODO: Permite paises com idiomas 
 */
class Globalizacao {
	/** 
	 * Método para validação de culturas (ligua-pais).
	 * @param {string} cultura String que representa a cultura a validada. 
	 * @returns {boolean} True quando a string de cultura é valida. 
	 */
	static validarCultura(cultura) {	
			
			Guard.notNull(cultura, "cultura");
			Guard.notEmptyString(cultura, "cultura");

			if (cultura.indexOf("-") < 0) {
				return false;
			}

			let idiomaPaisArray = cultura.split("-");

			if (idiomaPaisArray.length != 2) {
				return false;
			}

			let idioma = lang.prototype.getLanguageName(idiomaPaisArray[0]);
			if (idioma == null || idioma == undefined) {
				return false;
			}

			let pais = country.prototype.getName(idiomaPaisArray[1]);
			if (pais == null || pais == undefined) {
				return false;
			}
			
			return true;     
	}
}

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = Globalizacao;
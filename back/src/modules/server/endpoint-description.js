/** @module EndpointDescription */
// IMPORTS /////////////////////////////////////////////////////////////////////


// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// IMPLEMENTATION //////////////////////////////////////////////////////////////
/**
 * Indica o resultado de uma validação de path.
 */



/**
 * @class EndpointDescription
 * @desc Describes a endpoint that can be exposed by the DynamicServer. 
 */
class EndpointDescription {
	/**
	 * @desc Creates a new instance of {@EndpointDescription}.
	 * @param {HttpVerbs} verb The type of operation. Should be a instance of HttpVerb.
	 * @param {string} path The path to the endpoint.
	 * @param {function} handler A function that is called when the endpoint receives a request.
	 */
	constructor(verb, path, handler) {
		

	

		

		

		this._operation = verb;		
		this._path = path;
		this._handler = handler;
	}

	/**
	 * @returns {HttpVerbs} Qual o verbo que deve ser acionado para executar esse endpoint.
	 */
	get operation() { return this._operation; }
	/**
	 * @returns {string} O caminho para este endpoint.
	 */
	get path() { return this._path; }
	
	/**
	 * @returns Método executado quando o endpoint recebe uma requisição.
	 */
	get handler() { return this._handler; }
}

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = EndpointDescription;
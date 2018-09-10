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
	 * @returns {HttpVerbs} HTTP Verb
	 */
	get operation() { return this._operation; }
	/**
	 * @returns {string} Path
	 */
	get path() { return this._path; }
	
	/**
	 * @returns handler for rest
	 */
	get handler() { return this._handler; }
}

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = EndpointDescription;
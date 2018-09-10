/** @module DynamicServer */

// IMPORTS /////////////////////////////////////////////////////////////////////
let Restify = require("restify");



// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// DECLARATIONS ////////////////////////////////////////////////////////////////

/**
 * removes restify endpoint.
 * @private
 * @param {Restify.Server} server server.
 * @param {any} route route. 
 */
function removeRoute(server, routeId) {
    var result = server.router.unmount(routeId);

	

    if (result && server.routes[result]) {
        delete server.routes[result];
    }

    return result;
}



/**
 * Restify server.
 */
class DynamicServer {
	
	constructor(name, port) {
		this._port = port;

		let options = {

			name: name
		};

		this._server = Restify.createServer(options);
		Restify.CORS.ALLOW_HEADERS.push('accept');
		Restify.CORS.ALLOW_HEADERS.push('sid');
		Restify.CORS.ALLOW_HEADERS.push('lang');
		Restify.CORS.ALLOW_HEADERS.push('origin');
		Restify.CORS.ALLOW_HEADERS.push('withcredentials');
		Restify.CORS.ALLOW_HEADERS.push('x-requested-with');
		this._server.use(Restify.CORS());
		this._server.use(Restify.queryParser());
		this._server.use(Restify.bodyParser({ mapParams: false }));
		this._endpoints = new Map();
		this._watchers = new Map();
		this._endpointAddedCallbacks = [];
	}

	/**
	 * start the server
	 * @param {function} Função handler
	 */
	start(continuation_ = undefined) {
		this._server.listen(this._port, () => {
			let server = this._server;
			console.log("%s listening at %s.", server.name, server.url);
			if (continuation_ !== undefined) { continuation_(); }
		});
	}

	/**
	 * Closes connection.
	 */
	close() { this._server.close(); }

	/**
	 * Create endpoint.
	 * @param {string} key endpoinit key.
	 * @param {EndpointDescription} description enpoint description
	 */
	addEndpoint(key, description) {
		if (typeof (key) !== "string") {
			throw new Exceptions.ArgumentError("key", "key must be string");
		}

		if (key == null || key == "") {
			throw new Exceptions.NullArgumentError("key");
		}

		

		let id = "";
		switch (description._operation) {
			case "get":
				id = this._server.get(description.path, description.handler);
				break;
			case "put":
				id = this._server.put(description.path, description.handler);
				break;
			case "post":
				id = this._server.post(description.path, description.handler);
				break;
			case "delete":
				id = this._server.del(description.path, description.handler);
				break;

			default: Error(`Unknown operation ${description.operation}.`);
		}

		this._endpoints.set(key, id);

		//Binds the handler
		for (let listener of this._endpointAddedCallbacks) {
			listener(key, description);
		}
	}

	/**
	 * remove endpoint from server
	 * @param {string} key Identificação única de um endpoint.
	 */
	removeEndpoint(key) {
		if (typeof (key) !== "string") {
			throw new Exceptions.ArgumentError("key", "Key must be string");
		}

		if (key == null || key === "") {
			throw new Exceptions.NullArgumentError("key");
		}

		let id = this._endpoints.get(key);
		if (id == undefined) {
			throw new EndpointNaoEncontradoException(key);
		}

		try {
			removeRoute(this._server, id);
			this._endpoints.delete(key);
		} catch (e) {
			throw new Exceptions.CoreException(`Erro ao remover endpoint '${key}'.`, e);
		}
	}	

	/**
	 * @returns endpoint count
	 */
	get numEndpoints() {
		return this._endpoints.size;
	}
}
// IMPLEMENTATION //////////////////////////////////////////////////////////////

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = DynamicServer;
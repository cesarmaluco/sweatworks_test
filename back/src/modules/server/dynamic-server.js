/** @module DynamicServer */

// IMPORTS /////////////////////////////////////////////////////////////////////
let Restify = require("restify");



// DERIVED IMPORTS /////////////////////////////////////////////////////////////

// DECLARATIONS ////////////////////////////////////////////////////////////////

/**
 * Remove uma rota de um server restify.
 * @private
 * @param {Restify.Server} server Servidor do restify.
 * @param {any} route Rota a ser removida. 
 */
function removeRoute(server, routeId) {
    var result = server.router.unmount(routeId);

	

    if (result && server.routes[result]) {
        delete server.routes[result];
    }

    return result;
}

// /**
//  * @param {string} path Caminho para o arquivo que contém os endpoints.
//  * @param {EndpointDescription} server Servidor do qual os endpoints serão removidos.
//  */
// function removeEndpointsFromFile(path, server) {

// }

/**
 * Exceção lançada quando um endpoint não pode ser encontrado.
 */



/**
 * Servidor que carrega os endpoints dinâmicamente.
 */
class DynamicServer {
	/**
	 * Inicializa uma nova instância de {@link DynamicServer}.
	 */
	constructor(name, port) {
		this._port = port;

		let options = {
			// certificate: fs.readFileSync('path/to/server/certificate', 'utf-8'),
			// key: fs.readFileSync('path/to/server/key', 'utf-8'),

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
	 * Inicia o servidor.
	 * @param {function} Função a ser executada após o server ter sido iniciado.
	 */
	start(continuation_ = undefined) {
		this._server.listen(this._port, () => {
			let server = this._server;
			console.log("%s listening at %s.", server.name, server.url);
			if (continuation_ !== undefined) { continuation_(); }
		});
	}

	/**
	 * Finaliza o servidor.
	 */
	close() { this._server.close(); }

	/**
	 * Adiciona um novo endpoint.
	 * @param {string} key Identifica o endpoint unicamente.
	 * @param {EndpointDescription} description Object that describes the endpoint to create.
	 */
	addEndpoint(key, description) {
		if (typeof (key) !== "string") {
			throw new Exceptions.ArgumentError("key", "key deve ser do tipo 'string'.");
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

		// Chama os objetos que estão escutando o evento
		for (let listener of this._endpointAddedCallbacks) {
			listener(key, description);
		}
	}

	/**
	 * Remove um endpoint cadastrado no servidor.
	 * @param {string} key Identificação única de um endpoint.
	 */
	removeEndpoint(key) {
		if (typeof (key) !== "string") {
			throw new Exceptions.ArgumentError("key", "Key deve ser uma 'string'.");
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
	 * @returns Numero de endpoints atualmente ativos.
	 */
	get numEndpoints() {
		return this._endpoints.size;
	}
}
// IMPLEMENTATION //////////////////////////////////////////////////////////////

// EXPORTS /////////////////////////////////////////////////////////////////////
module.exports = DynamicServer;
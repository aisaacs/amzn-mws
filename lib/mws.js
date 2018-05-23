var queryBuilder = require('./query');
var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;
var jsonify = require('./util/jsonify');

var operations = require('./api');

function makeRequestor(operation, credentials) {
	return function(query) {
		return new Promise(function(resolve, reject) {
			var url = queryBuilder(credentials.marketplaceDomain,
									operation.url,
									operation.version,
									operation.action,
									query,
									credentials);
			fetch(url).then(res => res.text()).then(function(body) {
				if (operation.raw) {
					try {
						resolve(operation.responseParser(body));
					} catch (e) {
						reject(e);
					}
				} else {
					parseString(body, function(err, result){
						if (err) {
							reject(err);
						} else {
							try {
								if (result.ErrorResponse) {
									reject(result.ErrorResponse.Error[0].Message);
									return;
								}
								var parsed = jsonify(operation.responseParser(result));
								resolve(parsed);
							} catch (e) {
								reject(e);
							}
						}
					});
				}
			});
		});
	};
}

module.exports = {
	createClient: function(credentials) {
		var client = {};
		operations.forEach(operation => {
			client[operation.action] = makeRequestor(operation, credentials);
		});
		return client;
	}
};

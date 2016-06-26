var queryBuilder = require('./query');
var fetch = require('node-fetch');
var parseString = require('xml2js').parseString;
var jsonify = require('./util/jsonify');

var operations = [
	require('./api/listOrders'),
	require('./api/listOrdersByNextToken'),
	require('./api/listOrderItems')
];

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
				parseString(body, function(err, result){
					try {
						var parsed = jsonify(operation.responseParser(result));
					} catch (e) {
						reject(e);
					}
					if (err) {
						reject(err);
					} else {
						resolve(parsed);
					}
				});
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

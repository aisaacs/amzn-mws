module.exports = {
	action: 'ListOrdersByNextToken',
	url: 'Orders',
	version: '2013-09-01',
	responseParser: function(response) {
		return response.ListOrdersByNextTokenResponse.ListOrdersByNextTokenResult[0];
	}
};

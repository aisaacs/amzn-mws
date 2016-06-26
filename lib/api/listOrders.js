module.exports = {
	action: 'ListOrders',
	url: 'Orders',
	version: '2013-09-01',
	responseParser: function(response) {
		return response.ListOrdersResponse.ListOrdersResult[0];
	}
};
